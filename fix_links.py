import os
import re

# Dossiers à ignorer lors du parcours
IGNORED_DIRS = {'.git', '.github', 'node_modules', '.vscode'}

def get_relative_prefix(file_path):
    """
    Calcule le préfixe relatif (ex: "../" ou "../../")
    selon la profondeur du fichier par rapport à la racine.
    """
    depth = len(os.path.normpath(file_path).split(os.sep)) - 1
    return "../" * depth if depth > 0 else ""

def fix_html_file(file_path):
    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()

    prefix = get_relative_prefix(file_path)

    # Expression régulière pour cibler src="..." ou href="..."
    # qui commencent par un / (sauf s'il s'agit d'un lien externe http/https)
    def replace_link(match):
        attr = match.group(1)  # src ou href
        quote = match.group(2) # " ou '
        path = match.group(3)  # le chemin du lien

        # On ignore les liens absolus web (http://, https://, //) ou les ancres (#)
        if path.startswith(('http://', 'https://', '//', '#', 'mailto:', 'tel:')):
            return match.group(0)

        # Si le lien commence par /
        if path.startswith('/'):
            new_path = prefix + path.lstrip('/')
            return f'{attr}={quote}{new_path}{quote}'

        return match.group(0)

    # Remplace les attributs href et src
    pattern = r'(src|href)=(["\'])(.*?)\2'
    new_content = re.sub(pattern, replace_link, content, flags=re.IGNORECASE)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Modifié : {file_path}")

def main():
    print("Début du traitement des fichiers HTML...\n")
    for root, dirs, files in os.walk("."):
        # Ignorer les dossiers cachés et spéciaux
        dirs[:] = [d for d in dirs if d not in IGNORED_DIRS]

        for file in files:
            if file.lower().endswith('.html'):
                file_path = os.path.relpath(os.path.join(root, file))
                fix_html_file(file_path)

    print("\nTerminé ! Vos liens ont été mis à jour.")

if __name__ == "__main__":
    main()