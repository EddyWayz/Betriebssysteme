import json
from pathlib import Path
from string import Template
from typing import Any, Dict, List

# Define root path for the project
ROOT_PATH: Path = Path(__file__).resolve().parent.parent

def load_json_file(file_path: Path) -> Any:
    """Loads a JSON file and returns its content."""
    try:
        with open(file_path, encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found - {file_path}")
        raise
    except json.JSONDecodeError:
        print(f"Error: Could not decode JSON from - {file_path}")
        raise

def read_file_content(file_path: Path) -> str:
    """Reads a file and returns its content."""
    try:
        with open(file_path, encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: File not found - {file_path}")
        raise

def write_file_content(file_path: Path, content: str) -> None:
    """Writes content to a file."""
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    except IOError:
        print(f"Error: Could not write to file - {file_path}")
        raise

def main() -> None:
    """Main function to build HTML pages."""
    pages_data_path: Path = ROOT_PATH / 'pages.json'
    pages: List[Dict[str, Any]] = load_json_file(pages_data_path)

    base_template_path: Path = ROOT_PATH / 'templates' / 'base.html'
    base_template_content: str = read_file_content(base_template_path)
    base_tpl: Template = Template(base_template_content)

    for page_config in pages:
        source_file_path: Path = ROOT_PATH / page_config['source']
        page_body: str = read_file_content(source_file_path)

        html_content: str = base_tpl.substitute(
            title=page_config['title'],
            description=page_config['description'],
            body=page_body,
            extra_head=page_config.get('extra_head', '')
        )

        target_file_path: Path = ROOT_PATH / page_config['target']
        write_file_content(target_file_path, html_content)
        print(f"Generated {target_file_path.name}")

if __name__ == "__main__":
    main()
