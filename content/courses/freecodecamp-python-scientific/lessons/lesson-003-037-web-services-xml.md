---
id: lesson-003-037
title: Web Services: XML
chapterId: chapter-03
order: 37
duration: 5
objectives:
  - Understand XML elements, attributes, and nesting
  - Parse XML in Python using xml.etree.ElementTree
  - Use find, findall, text, and attrib to extract data
  - Build a working XML parser for structured data
---

# Web Services: XML

**XML (eXtensible Markup Language)** was designed to store and transport data in a format that is both human-readable and machine-readable. While JSON has overtaken XML for many modern APIs, XML remains heavily used in enterprise systems, RSS feeds, configuration files, and document formats like DOCX and SVG.

## XML Fundamentals

XML uses a tag-based structure similar to HTML, but you define your own tag names:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
  <book category="fiction">
    <title lang="en">The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price>10.99</price>
  </book>
  <book category="science">
    <title lang="en">A Brief History of Time</title>
    <author>Stephen Hawking</author>
    <year>1988</year>
    <price>14.95</price>
  </book>
</bookstore>
```

### Key Concepts

- **Elements** are the building blocks: `<title>The Great Gatsby</title>`. An element has an opening tag, content, and a closing tag.
- **Attributes** provide additional information inside the opening tag: `category="fiction"`. Use attributes for metadata, elements for data.
- **Nesting** creates hierarchy: `<bookstore>` contains `<book>` elements, which contain `<title>`, `<author>`, etc.
- **Well-formed XML** means every opening tag has a closing tag, tags are properly nested, and there is exactly one root element.

### Self-Closing Tags

Elements with no content can self-close:
```xml
<image src="photo.jpg" />
```

## Parsing XML in Python

Python's built-in `xml.etree.ElementTree` module provides a straightforward way to parse and navigate XML:

```python
import xml.etree.ElementTree as ET

xml_data = '''<bookstore>
  <book category="fiction">
    <title lang="en">The Great Gatsby</title>
    <author>F. Scott Fitzgerald</author>
    <year>1925</year>
    <price>10.99</price>
  </book>
  <book category="science">
    <title lang="en">A Brief History of Time</title>
    <author>Stephen Hawking</author>
    <year>1988</year>
    <price>14.95</price>
  </book>
</bookstore>'''

tree = ET.fromstring(xml_data)
```

### Finding Elements

**`find()`** returns the first matching element:
```python
first_book = tree.find('book')
print(first_book.find('title').text)  # The Great Gatsby
```

**`findall()`** returns a list of all matching elements:
```python
books = tree.findall('book')
print(f"Found {len(books)} books")

for book in books:
    title = book.find('title').text
    author = book.find('author').text
    year = book.find('year').text
    print(f"  {title} by {author} ({year})")
```

### Accessing Attributes

Use the `.attrib` dictionary to read attributes:
```python
for book in tree.findall('book'):
    category = book.attrib['category']
    lang = book.find('title').attrib['lang']
    title = book.find('title').text
    print(f"[{category}] {title} (language: {lang})")
```

Output:
```
[fiction] The Great Gatsby (language: en)
[science] A Brief History of Time (language: en)
```

### Using `.get()` for Safe Attribute Access

```python
for book in tree.findall('book'):
    isbn = book.attrib.get('isbn', 'N/A')
    print(f"ISBN: {isbn}")  # ISBN: N/A (attribute doesn't exist)
```

## Parsing from a File

For XML stored in files, use `ET.parse()` instead of `ET.fromstring()`:

```python
import xml.etree.ElementTree as ET

tree = ET.parse('books.xml')
root = tree.getroot()

print(f"Root tag: {root.tag}")  # bookstore

for book in root.findall('book'):
    price = float(book.find('price').text)
    title = book.find('title').text
    print(f"  {title}: ${price:.2f}")
```

## Extracting Data with Iteration

You can iterate over child elements directly:

```python
for child in root:
    print(f"Tag: {child.tag}, Attributes: {child.attrib}")
    for subchild in child:
        print(f"  {subchild.tag}: {subchild.text}")
```

## Practical Example: Processing a Catalog

```python
import xml.etree.ElementTree as ET

xml_data = '''<catalog>
  <product id="P001" status="active">
    <name>Widget A</name>
    <price currency="USD">29.99</price>
    <stock>150</stock>
  </product>
  <product id="P002" status="discontinued">
    <name>Widget B</name>
    <price currency="USD">19.99</price>
    <stock>0</stock>
  </product>
</catalog>'''

root = ET.fromstring(xml_data)

# Find only active products with stock
for product in root.findall('product'):
    if product.attrib['status'] == 'active':
        name = product.find('name').text
        price = float(product.find('price').text)
        stock = int(product.find('stock').text)
        if stock > 0:
            print(f"{name}: ${price} ({stock} in stock)")
```

XML parsing is a foundational skill for working with many web services, configuration systems, and data feeds you will encounter as a Python developer.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
