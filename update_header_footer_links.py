import os
import re

# Nom de votre dépôt GitHub Pages
REPO_NAME = "journal_de_bord"

# Préfixe de racine pour GitHub Pages
BASE_PATH = f"/{REPO_NAME}/" if REPO_NAME else "/"

FILES_TO_FIX = ["header.html", "footer.html"]

def fix_header_footer_links(file_path):
    if not os.path.exists(file_path):
        print(f"⚠️ Fichier introuvable : {file_path}")
        return 0

    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    changes = 0

    def replace_link(match):
        nonlocal changes
        attr = match.group(1)  # href ou src
        quote = match.group(2) # " ou '
        path = match.group(3)  # valeur du chemin

        # Ignorer les liens externes, ancres, tél, mailto
        if path.startswith(('http://', 'https://', '#', 'mailto:', 'tel:', '//')):
            return f'{attr}={quote}{path}{quote}'

        # Nettoyer les slashes, points initiaux et le nom du dépôt s'il y est déjà
        clean_path = re.sub(r'^\.?/+', '', path)
        if REPO_NAME and clean_path.startswith(f"{REPO_NAME}/"):
            clean_path = clean_path[len(REPO_NAME)+1:]

        # Créer le nouveau chemin absolu avec la racine
        new_path = f"{BASE_PATH}{clean_path}"

        if new_path != path:
            changes += 1

        return f'{attr}={quote}{new_path}{quote}'

    # Regex corrigée : \2 correspond au guillemet ouvrant (" ou ')
    new_content = re.sub(r'(href|src)=(["\'])(.*?)\2', replace_link, content, flags=re.IGNORECASE)

    if changes > 0:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"✅ {file_path} mis à jour ({changes} lien(s) modifié(s)).")
    else:
        print(f"ℹ️ Aucun changement nécessaire pour {file_path}.")

    return changes

def main():
    print("--- Correction des liens dans header.html et footer.html ---\n")
    print(f"Préfixe de racine configuré : {BASE_PATH}\n")
    total = 0
    for file in FILES_TO_FIX:
        total += fix_header_footer_links(file)
    
    print(f"\nTotal des liens corrigés : {total}")

if __name__ == "__main__":
    main()