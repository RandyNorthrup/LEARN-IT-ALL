---
id: "171-markdown-to-html"
title: "Markdown to HTML Converter"
chapterId: ch13-practice
order: 8
duration: 30
objectives:
  - Parse Markdown syntax
  - Generate HTML output
  - Handle nested structures
  - Implement formatting rules
---

# Markdown to HTML Converter

Build a Markdown parser that converts Markdown syntax to HTML.

## Project Overview

Create converter that supports:
- Headers (h1-h6)
- Emphasis (bold, italic)
- Lists (ordered, unordered)
- Links and images
- Code blocks
- Blockquotes
- Horizontal rules

## Core Parser

### Markdown Parser

```python
# markdown_parser.py
import re
from typing import List
from html import escape

class MarkdownParser:
    """Parse Markdown and convert to HTML"""
    
    def __init__(self):
        self.in_code_block = False
        self.code_block_lines = []
        self.in_list = False
        self.list_type = None
        self.list_items = []
    
    def parse(self, markdown: str) -> str:
        """Convert Markdown text to HTML"""
        lines = markdown.split('\n')
        html_lines = []
        
        i = 0
        while i < len(lines):
            line = lines[i]
            html = self.parse_line(line)
            
            if html is not None:
                html_lines.append(html)
            
            i += 1
        
        # Close any open tags
        if self.in_list:
            html_lines.append(self._close_list())
        
        return '\n'.join(html_lines)
    
    def parse_line(self, line: str) -> str:
        """Parse a single line of Markdown"""
        # Code blocks
        if line.strip().startswith('```'):
            return self._handle_code_block(line)
        
        if self.in_code_block:
            self.code_block_lines.append(escape(line))
            return None
        
        # Empty lines
        if not line.strip():
            if self.in_list:
                html = self._close_list()
                return html
            return '<br>'
        
        # Headers
        if line.startswith('#'):
            if self.in_list:
                html = self._close_list()
                return html + '\n' + self._parse_header(line)
            return self._parse_header(line)
        
        # Horizontal rule
        if re.match(r'^(\*\*\*|---|___)$', line.strip()):
            return '<hr>'
        
        # Blockquotes
        if line.startswith('>'):
            return self._parse_blockquote(line)
        
        # Lists
        if re.match(r'^(\d+\.|\*|-)\s', line):
            return self._parse_list_item(line)
        
        # Close list if no longer in list context
        if self.in_list:
            html = self._close_list()
            return html + '\n' + self._parse_paragraph(line)
        
        # Regular paragraph
        return self._parse_paragraph(line)
    
    def _parse_header(self, line: str) -> str:
        """Parse header (# - ######)"""
        match = re.match(r'^(#{1,6})\s+(.+)$', line)
        if match:
            level = len(match.group(1))
            content = self._parse_inline(match.group(2))
            return f'<h{level}>{content}</h{level}>'
        return line
    
    def _parse_inline(self, text: str) -> str:
        """Parse inline formatting (bold, italic, code, links)"""
        # Bold: **text** or __text__
        text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
        text = re.sub(r'__(.+?)__', r'<strong>\1</strong>', text)
        
        # Italic: *text* or _text_
        text = re.sub(r'\*(.+?)\*', r'<em>\1</em>', text)
        text = re.sub(r'_(.+?)_', r'<em>\1</em>', text)
        
        # Inline code: `code`
        text = re.sub(r'`(.+?)`', r'<code>\1</code>', text)
        
        # Links: [text](url)
        text = re.sub(r'\[([^\]]+)\]\(([^)]+)\)', r'<a href="\2">\1</a>', text)
        
        # Images: ![alt](url)
        text = re.sub(r'!\[([^\]]*)\]\(([^)]+)\)', r'<img src="\2" alt="\1">', text)
        
        return text
    
    def _parse_paragraph(self, line: str) -> str:
        """Parse paragraph"""
        content = self._parse_inline(line)
        return f'<p>{content}</p>'
    
    def _parse_blockquote(self, line: str) -> str:
        """Parse blockquote"""
        content = line.lstrip('> ').strip()
        content = self._parse_inline(content)
        return f'<blockquote>{content}</blockquote>'
    
    def _handle_code_block(self, line: str) -> str:
        """Handle code block start/end"""
        if not self.in_code_block:
            # Starting code block
            self.in_code_block = True
            self.code_block_lines = []
            
            # Extract language if specified
            lang_match = re.match(r'```(\w+)', line)
            self.code_lang = lang_match.group(1) if lang_match else ''
            
            return None
        else:
            # Ending code block
            self.in_code_block = False
            code = '\n'.join(self.code_block_lines)
            
            if self.code_lang:
                html = f'<pre><code class="language-{self.code_lang}">{code}</code></pre>'
            else:
                html = f'<pre><code>{code}</code></pre>'
            
            self.code_block_lines = []
            return html
    
    def _parse_list_item(self, line: str) -> str:
        """Parse list item"""
        # Determine list type
        if re.match(r'^\d+\.', line):
            list_type = 'ol'
            content = re.sub(r'^\d+\.\s+', '', line)
        else:
            list_type = 'ul'
            content = re.sub(r'^[*-]\s+', '', line)
        
        content = self._parse_inline(content)
        
        # Check if starting new list
        if not self.in_list:
            self.in_list = True
            self.list_type = list_type
            self.list_items = [content]
            return f'<{list_type}>\n  <li>{content}</li>'
        
        # Check if switching list type
        if self.list_type != list_type:
            html = self._close_list()
            self.in_list = True
            self.list_type = list_type
            self.list_items = [content]
            return html + f'\n<{list_type}>\n  <li>{content}</li>'
        
        # Continue current list
        self.list_items.append(content)
        return f'  <li>{content}</li>'
    
    def _close_list(self) -> str:
        """Close current list"""
        if not self.in_list:
            return ''
        
        html = f'</{self.list_type}>'
        self.in_list = False
        self.list_type = None
        self.list_items = []
        return html

def markdown_to_html(markdown: str, add_wrapper: bool = True) -> str:
    """Convert Markdown to HTML"""
    parser = MarkdownParser()
    body = parser.parse(markdown)
    
    if add_wrapper:
        return f"""<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Markdown Document</title>
    <style>
        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }}
        code {{
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }}
        pre {{
            background-color: #f4f4f4;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }}
        pre code {{
            background-color: transparent;
            padding: 0;
        }}
        blockquote {{
            border-left: 4px solid #ddd;
            padding-left: 15px;
            color: #666;
            margin: 15px 0;
        }}
        img {{
            max-width: 100%;
            height: auto;
        }}
        hr {{
            border: none;
            border-top: 2px solid #ddd;
            margin: 20px 0;
        }}
    </style>
</head>
<body>
{body}
</body>
</html>"""
    
    return body
```

### Enhanced Features

```python
# enhanced_parser.py

class EnhancedMarkdownParser(MarkdownParser):
    """Extended Markdown parser with additional features"""
    
    def parse_line(self, line: str) -> str:
        """Parse line with enhanced features"""
        # Check for tables
        if '|' in line and not self.in_code_block:
            return self._parse_table_row(line)
        
        # Check for task lists
        if re.match(r'^[-*]\s+\[[ x]\]', line):
            return self._parse_task_list_item(line)
        
        return super().parse_line(line)
    
    def _parse_inline(self, text: str) -> str:
        """Enhanced inline parsing"""
        text = super()._parse_inline(text)
        
        # Strikethrough: ~~text~~
        text = re.sub(r'~~(.+?)~~', r'<del>\1</del>', text)
        
        # Highlight: ==text==
        text = re.sub(r'==(.+?)==', r'<mark>\1</mark>', text)
        
        # Superscript: ^text^
        text = re.sub(r'\^(.+?)\^', r'<sup>\1</sup>', text)
        
        # Subscript: ~text~
        text = re.sub(r'~(.+?)~', r'<sub>\1</sub>', text)
        
        return text
    
    def _parse_table_row(self, line: str) -> str:
        """Parse table row"""
        cells = [cell.strip() for cell in line.split('|')[1:-1]]
        
        # Check if header separator
        if all(re.match(r'^:?-+:?$', cell) for cell in cells):
            return None
        
        # Determine if header or data row
        if not hasattr(self, '_in_table'):
            self._in_table = True
            self._table_rows = []
            # This is the header row
            cells_html = ''.join(f'<th>{self._parse_inline(cell)}</th>' for cell in cells)
            return f'<table>\n<thead>\n<tr>{cells_html}</tr>\n</thead>\n<tbody>'
        
        # Data row
        cells_html = ''.join(f'<td>{self._parse_inline(cell)}</td>' for cell in cells)
        return f'<tr>{cells_html}</tr>'
    
    def _parse_task_list_item(self, line: str) -> str:
        """Parse task list item (checkbox)"""
        checked = '[x]' in line.lower()
        content = re.sub(r'^[-*]\s+\[[ x]\]\s+', '', line, flags=re.IGNORECASE)
        content = self._parse_inline(content)
        
        checkbox = '<input type="checkbox" checked disabled>' if checked else '<input type="checkbox" disabled>'
        
        if not self.in_list:
            self.in_list = True
            self.list_type = 'ul'
            return f'<ul class="task-list">\n  <li>{checkbox} {content}</li>'
        
        return f'  <li>{checkbox} {content}</li>'
```

### File Converter

```python
# converter.py
from pathlib import Path

class MarkdownConverter:
    """Convert Markdown files to HTML"""
    
    def __init__(self, parser_class=MarkdownParser):
        self.parser_class = parser_class
    
    def convert_file(self, input_file: str, output_file: str = None):
        """Convert Markdown file to HTML"""
        # Read input
        markdown = Path(input_file).read_text(encoding='utf-8')
        
        # Convert
        html = markdown_to_html(markdown, add_wrapper=True)
        
        # Determine output filename
        if not output_file:
            output_file = str(Path(input_file).with_suffix('.html'))
        
        # Write output
        Path(output_file).write_text(html, encoding='utf-8')
        
        return output_file
    
    def convert_directory(self, input_dir: str, output_dir: str = None):
        """Convert all Markdown files in directory"""
        input_path = Path(input_dir)
        output_path = Path(output_dir) if output_dir else input_path
        
        output_path.mkdir(exist_ok=True)
        
        converted = []
        for md_file in input_path.glob('*.md'):
            output_file = output_path / md_file.with_suffix('.html').name
            self.convert_file(str(md_file), str(output_file))
            converted.append(str(output_file))
        
        return converted
```

### CLI Application

```python
# cli.py
import sys
from pathlib import Path

def main():
    """Command-line interface"""
    if len(sys.argv) < 2:
        print("Usage: python cli.py <input.md> [output.html]")
        print("   or: python cli.py --dir <input_dir> [output_dir]")
        sys.exit(1)
    
    if sys.argv[1] == '--dir':
        # Directory mode
        if len(sys.argv) < 3:
            print("Error: Input directory required")
            sys.exit(1)
        
        input_dir = sys.argv[2]
        output_dir = sys.argv[3] if len(sys.argv) > 3 else None
        
        converter = MarkdownConverter(EnhancedMarkdownParser)
        files = converter.convert_directory(input_dir, output_dir)
        
        print(f"✓ Converted {len(files)} files:")
        for file in files:
            print(f"  - {file}")
    
    else:
        # Single file mode
        input_file = sys.argv[1]
        output_file = sys.argv[2] if len(sys.argv) > 2 else None
        
        if not Path(input_file).exists():
            print(f"Error: File '{input_file}' not found")
            sys.exit(1)
        
        converter = MarkdownConverter(EnhancedMarkdownParser)
        output = converter.convert_file(input_file, output_file)
        
        print(f"✓ Converted: {output}")

if __name__ == "__main__":
    main()
```

## Example Markdown

```markdown
# Sample Document

This is a paragraph with **bold** and *italic* text.

## Lists

### Unordered List
* Item 1
* Item 2
* Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Code

Inline `code` looks like this.

```python
def hello():
    print("Hello, World!")
```

## Links and Images

[Visit GitHub](https://github.com)

![Example Image](https://example.com/image.jpg)

## Blockquote

> This is a blockquote.
> It can span multiple lines.

## Horizontal Rule

---

## Task List

- [x] Completed task
- [ ] Pending task
```

## Testing

```python
# test_markdown_parser.py
import pytest

def test_header_parsing():
    parser = MarkdownParser()
    html = parser.parse('# Header 1')
    assert '<h1>Header 1</h1>' in html

def test_bold_parsing():
    parser = MarkdownParser()
    html = parser.parse('This is **bold** text')
    assert '<strong>bold</strong>' in html

def test_italic_parsing():
    parser = MarkdownParser()
    html = parser.parse('This is *italic* text')
    assert '<em>italic</em>' in html

def test_link_parsing():
    parser = MarkdownParser()
    html = parser.parse('[GitHub](https://github.com)')
    assert '<a href="https://github.com">GitHub</a>' in html

def test_code_block():
    markdown = """```python
def hello():
    print("Hello")
```"""
    parser = MarkdownParser()
    html = parser.parse(markdown)
    assert '<pre><code' in html
    assert 'def hello():' in html

def test_list_parsing():
    markdown = """* Item 1
* Item 2
* Item 3"""
    parser = MarkdownParser()
    html = parser.parse(markdown)
    assert '<ul>' in html
    assert '<li>Item 1</li>' in html
    assert '</ul>' in html

def test_blockquote():
    parser = MarkdownParser()
    html = parser.parse('> This is a quote')
    assert '<blockquote>This is a quote</blockquote>' in html
```

## Advanced Features

### Table of Contents Generator

```python
# toc.py

class TOCGenerator:
    """Generate table of contents from headers"""
    
    def generate(self, markdown: str) -> str:
        """Generate TOC"""
        lines = markdown.split('\n')
        toc_items = []
        
        for line in lines:
            match = re.match(r'^(#{1,6})\s+(.+)$', line)
            if match:
                level = len(match.group(1))
                title = match.group(2)
                slug = self._slugify(title)
                
                indent = '  ' * (level - 1)
                toc_items.append(f'{indent}* [{title}](#{slug})')
        
        return '\n'.join(toc_items)
    
    def _slugify(self, text: str) -> str:
        """Convert text to URL slug"""
        slug = text.lower()
        slug = re.sub(r'[^\w\s-]', '', slug)
        slug = re.sub(r'[-\s]+', '-', slug)
        return slug
```

## Summary

Built complete Markdown to HTML converter with:
- Header parsing (h1-h6)
- Inline formatting (bold, italic, code)
- Lists (ordered, unordered, tasks)
- Code blocks with syntax highlighting
- Links and images
- Blockquotes
- Horizontal rules
- Tables
- File and directory conversion

**Skills Applied:**
- Regular expressions
- Text parsing
- HTML generation
- File I/O
- String manipulation
- Command-line tools
