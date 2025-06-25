import json
from string import Template
from pathlib import Path
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

def generate_nav_links(nav_items: List[Dict[str, str]]) -> str:
    """Generates HTML anchor tags for navigation links."""
    return "\n    ".join(f'<a href="{item["href"]}">{item["text"]}</a>' for item in nav_items)

def main() -> None:
    """Main function to generate the navigation HTML."""
    nav_items_path: Path = ROOT_PATH / 'scripts' / 'nav_items.json'
    nav_items: List[Dict[str, str]] = load_json_file(nav_items_path)

    nav_template_path: Path = ROOT_PATH / 'scripts' / 'nav_template.html'
    template_content: str = read_file_content(nav_template_path)
    nav_template: Template = Template(template_content)

    nav_links_html: str = generate_nav_links(nav_items)
    output_html: str = nav_template.substitute(links=nav_links_html)

    output_file_path: Path = ROOT_PATH / 'nav.html'
    write_file_content(output_file_path, output_html)
    print(f"Generated {output_file_path.name} with {len(nav_items)} links")

if __name__ == "__main__":
    main()
