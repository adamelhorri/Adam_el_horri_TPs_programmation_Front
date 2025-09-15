#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pathlib import Path
import argparse
import os

DEFAULT_EXCLUDES = {"node_modules", ".git", "dist", "build", ".next", ".turbo"}

def iter_jsx_files(root: Path, excludes: set[str]):
    excludes_lower = {e.lower() for e in excludes}
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [d for d in dirnames if d.lower() not in excludes_lower]
        for name in filenames:
            if name.lower().endswith(".jsx"):
                yield Path(dirpath) / name

def main():
    p = argparse.ArgumentParser(description="Concaténer tous les .jsx d'un répertoire en Markdown.")
    p.add_argument("root", nargs="?", default=".", help="Répertoire racine (par défaut: .)")
    p.add_argument("-o", "--output", default="all_jsx.md", help="Fichier Markdown de sortie")
    p.add_argument("--no-exclude", dest="no_exclude", action="store_true",
                   help="Ne rien exclure (inclut node_modules, etc.)")
    p.add_argument("--exclude", nargs="*", default=[], help="Dossiers à exclure en plus")
    args = p.parse_args()

    root = Path(args.root).resolve()
    excludes = set() if args.no_exclude else (DEFAULT_EXCLUDES | set(args.exclude))

    files = sorted(iter_jsx_files(root, excludes), key=lambda p: str(p).lower())
    out_path = Path(args.output).resolve()

    with out_path.open("w", encoding="utf-8", newline="\n") as out:
        for f in files:
            rel = f.relative_to(root)
            out.write(f"### {rel.as_posix()}\n\n")
            out.write("```jsx\n")
            try:
                content = f.read_text(encoding="utf-8", errors="replace")
            except Exception as e:
                content = f"<<Erreur de lecture: {e}>>"
            out.write(content)
            if not content.endswith("\n"):
                out.write("\n")
            out.write("```\n\n")

    print(f"OK ✅  Fichier généré: {out_path}")

if __name__ == "__main__":
    main()
