from pathlib import Path

# ==========================================================
# PanFlow - Estrutura Inicial do Projeto
# ==========================================================

PROJECT_NAME = "panflow"

directories = [
    "docs",

    "src",
    "src/assets",

    "src/components",
    "src/components/ui",
    "src/components/feedback",
    "src/components/layout",
    "src/components/data-display",

    "src/config",

    "src/hooks",

    "src/layouts",

    "src/lib",

    "src/pages",
    "src/pages/auth",
    "src/pages/dashboard",
    "src/pages/produtos",
    "src/pages/funcionarios",
    "src/pages/producao",
    "src/pages/vendas",
    "src/pages/consumo",
    "src/pages/perdas",
    "src/pages/configuracoes",

    "src/routes",

    "src/services",

    "src/types",

    "src/utils",
]

files = [
    "docs/banco.md",
    "docs/roadmap.md",

    "src/App.tsx",
    "src/index.css",
    "src/main.tsx",

    "tailwind.config.js",
    "tsconfig.json",
    "vite.config.ts",
]

README = """# PanFlow

Sistema Inteligente de Gestão da Produção Diária para Padarias

## Tecnologias

- React
- TypeScript
- Vite
- TailwindCSS
- Shadcn/UI
- TanStack Router
- TanStack Query
- Supabase

"""

GITIGNORE = """node_modules
dist
.env
.env.local
.vscode
"""

VSCODE_SETTINGS = """{
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll": "explicit"
    },
    "typescript.tsdk": "node_modules/typescript/lib"
}
"""


def create_directory(path: Path):
    path.mkdir(parents=True, exist_ok=True)
    print(f"📁 {path}")


def create_file(path: Path, content=""):
    path.parent.mkdir(parents=True, exist_ok=True)

    if not path.exists():
        path.write_text(content, encoding="utf-8")
        print(f"📄 {path}")


def main():

    root = Path(PROJECT_NAME)

    print("=" * 60)
    print("Criando estrutura do projeto PanFlow")
    print("=" * 60)

    root.mkdir(exist_ok=True)

    # Diretórios
    for d in directories:
        create_directory(root / d)

    # Arquivos vazios
    for f in files:
        create_file(root / f)

    # Arquivos úteis
    create_file(root / "README.md", README)
    create_file(root / ".gitignore", GITIGNORE)

    # VSCode
    create_directory(root / ".vscode")
    create_file(
        root / ".vscode/settings.json",
        VSCODE_SETTINGS
    )

    print("\n✅ Estrutura criada com sucesso!")
    print(f"\nProjeto disponível em: {root.resolve()}")


if __name__ == "__main__":
    main()