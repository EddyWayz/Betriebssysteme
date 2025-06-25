import glob
import json
import re
from pathlib import Path
from typing import List, Dict, Any, Pattern

# Define root path for the project
ROOT_PATH: Path = Path(__file__).resolve().parent.parent

# Pre-compile regex patterns for efficiency
HEADING_PARA_PATTERN: Pattern[str] = re.compile(r'<(h[1-3]|p)[^>]*>(.*?)<', re.IGNORECASE | re.DOTALL)
TITLE_PATTERN: Pattern[str] = re.compile(r'<title>(.*?)<\/title>', re.IGNORECASE | re.DOTALL)
HTML_TAG_PATTERN: Pattern[str] = re.compile('<[^<]+?>')

def read_file_content(file_path: Path) -> str:
    """Reads a file and returns its content."""
    try:
        with open(file_path, encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        print(f"Error: File not found - {file_path}")
        # Return empty string or handle as appropriate for your use case
        return ""
    except Exception as e:
        print(f"An error occurred while reading {file_path}: {e}")
        return ""

def extract_text_from_html(html_content: str) -> str:
    """Extracts relevant text from HTML content."""
    texts: List[str] = [match.group(2) for match in HEADING_PARA_PATTERN.finditer(html_content)]
    # Remove HTML tags from extracted texts and join
    cleaned_text: str = ' '.join(HTML_TAG_PATTERN.sub('', text_content) for text_content in texts)
    return cleaned_text.strip()

def extract_title_from_html(html_content: str, default_title: str) -> str:
    """Extracts the title from HTML content."""
    match = TITLE_PATTERN.search(html_content)
    return match.group(1).strip() if match else default_title

def write_json_file(file_path: Path, data: Any) -> None:
    """Writes data to a JSON file."""
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2) # Added indent for readability
    except IOError:
        print(f"Error: Could not write to file - {file_path}")
        raise

def main() -> None:
    """Main function to build the search index."""
    search_index: List[Dict[str, str]] = []
    # Define specific HTML files to include in the index
    html_files_to_index: List[str] = glob.glob('0*_*.html') + glob.glob('index.html') + glob.glob('uebungen.html')

    for file_name_str in html_files_to_index:
        file_path: Path = Path(file_name_str) # Convert to Path object
        html_content: str = read_file_content(file_path)

        if not html_content: # Skip if file could not be read
            continue

        text_content: str = extract_text_from_html(html_content)
        # Use file name as default title if <title> tag is not found
        title: str = extract_title_from_html(html_content, file_path.stem)

        search_index.append({'title': title, 'href': str(file_path), 'text': text_content})

    search_index_file_path: Path = ROOT_PATH / 'search_index.json'
    write_json_file(search_index_file_path, search_index)
    print(f"Generated {search_index_file_path.name} with {len(search_index)} entries")

if __name__ == "__main__":
    main()
