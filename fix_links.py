import os
import re

IGNORED_DIRS = {'.git', '.github', 'node_modules', '.vscode'}

# Liste de tous les dossiers principaux situés à la racine de votre projet
ROOT_FOLDERS = [
    'assets', 'autre', 'data', 'images', 'pays', 
    'template', 'volcan-html-files', 'voyage-rando-trail'
]

# Liste de tous les fichiers HTML isolés situés à la racine
ROOT_FILES = ['index.html', 'galerie.html', 'header.html', 'footer.html']

def get_prefix(file_path):
    """Calcule si le fichier doit remonter d'un niveau ('../') ou pas ('')."""
    depth = len(os.path.normpath(file_path).split(os.sep)) - 1
    return "../" * depth if depth > 0 else ""

def fix_content(content, file_path):
    prefix = get_prefix(file_path)
    changes_count = 0
    all_targets = ROOT_FOLDERS + ROOT_FILES

    def adjust_path(path_str):
        if path_str.startswith(('http://', 'https://', '#', 'mailto:', 'tel:', '//')):
            return path_str
        
        # Si le lien pointe vers un dossier/fichier de la racine
        for target in all_targets:
            if path_str.startswith(target) or path_str.startswith('./' + target) or path_str.startswith('/' + target):
                cleaned = re.sub(r'^\.?/', '', path_str)
                return prefix + cleaned
        return path_str

    # 1. Correction des attributs HTML href="..." et src="..."
    def fix_html_attr(match):
        nonlocal changes_count
        attr, quote, path = match.group(1), match.group(2), match.group(3)
        new_path = adjust_path(path)
        if new_path != path:
            changes_count += 1
        return f'{attr}={quote}{new_path}{quote}'

    content = re.sub(r'(src|href)=(["\'])(.*?)\2', fix_html_attr, content, flags=re.IGNORECASE)

    # 2. Correction des appels fetch("...") dans le JS
    def fix_fetch(match):
        nonlocal changes_count
        quote, path = match.group(1), match.group(2)
        new_path = adjust_path(path)
        if new_path != path:
            changes_count += 1
        return f'fetch({quote}{new_path}{quote})'

    content = re.sub(r'fetch\((["\'])(.*?)\1\)', fix_fetch, content, flags=re.IGNORECASE)

    # 3. Correction des styles inline CSS : url('...') ou url(...)
    def fix_css_url(match):
        nonlocal changes_count
        quote = match.group(1) or ""
        path = match.group(2)
        new_path = adjust_path(path)
        if new_path != path:
            changes_count += 1
        return f'url({quote}{new_path}{quote})'

    content = re.sub(r'url\((["\']?)(.*?)\1\)', fix_css_url, content, flags=re.IGNORECASE)

    return content, changes_count

def main():
    print("Analyse et correction automatique de tous les liens du projet...\n")
    modified_files_count = 0
    total_links_corrected = 0

    for root, dirs, files in os.walk("."):
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]
        for file in files:
            if file.lower().endswith('.html'):
                file_path = os.path.relpath(os.path.join(root, file))
                
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    original_content = f.read()

                updated_content, file_changes = fix_content(original_content, file_path)

                if file_changes > 0:
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(updated_content)
                    print(f"✅ {file_path} : {file_changes} lien(s) corrigé(s)")
                    modified_files_count += 1
                    total_links_corrected += file_changes

    print("\n--------------------------------------------------")
    print(f"🎉 Opération terminée !")
    print(f"Fichiers modifiés  : {modified_files_count}")
    print(f"Total des liens corrigés : {total_links_corrected}")
    print("--------------------------------------------------")

if __name__ == "__main__":
    main()