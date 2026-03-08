---
id: lesson-003-033
title: Networking: Text Processing
chapterId: chapter-03
order: 33
duration: 5
objectives:
  - Decode bytes to strings for text processing
  - Parse HTML content using basic string methods
  - Extract links from web pages
  - Count words in web page content
  - Handle character encodings including UTF-8
---

# Networking: Text Processing

After retrieving web content over a network, you need to **process** it — decode the bytes, parse the HTML, extract useful data, and handle different character encodings. This lesson covers the essential text processing techniques for working with web data.

## Decoding Bytes to Strings

Network data arrives as **bytes**, not strings. You must decode it before processing:

```python
raw_data = b'Hello, World!'
text = raw_data.decode('utf-8')
print(text)       # Hello, World!
print(type(text)) # <class 'str'>
```

When reading data from a socket, you'll typically accumulate bytes and decode the complete response:

```python
data = b''
while True:
    chunk = mysock.recv(512)
    if len(chunk) < 1:
        break
    data += chunk

text = data.decode('utf-8')
```

## Character Encodings

A **character encoding** maps bytes to characters. The most common encodings are:

| Encoding | Description |
|----------|-------------|
| **UTF-8** | Universal encoding supporting all languages. The web standard. |
| **ASCII** | English characters only (0-127). Subset of UTF-8. |
| **Latin-1** (ISO-8859-1) | Western European characters |

UTF-8 is the dominant encoding on the web. When in doubt, try UTF-8 first:

```python
# Try UTF-8 first, fall back to Latin-1
try:
    text = data.decode('utf-8')
except UnicodeDecodeError:
    text = data.decode('latin-1')
```

You can also use the `errors` parameter to handle problematic characters:

```python
text = data.decode('utf-8', errors='replace')  # replaces bad chars with ?
text = data.decode('utf-8', errors='ignore')   # skips bad chars
```

## Parsing HTML with String Methods

While dedicated HTML parsers exist (like BeautifulSoup), you can extract basic information using string methods:

```python
html = '''<html>
<head><title>My Page</title></head>
<body>
<h1>Welcome</h1>
<p>This is a paragraph.</p>
</body>
</html>'''

# Extract the title
start = html.find('<title>') + len('<title>')
end = html.find('</title>')
title = html[start:end]
print(title)  # My Page
```

## Extracting Links from HTML

Links in HTML use the `<a>` tag with an `href` attribute. You can extract them with regex:

```python
import re

html = '''
<a href="https://www.example.com">Example</a>
<a href="https://www.python.org">Python</a>
<a href="/about">About</a>
'''

links = re.findall(r'href="([^"]+)"', html)
print(links)
# ['https://www.example.com', 'https://www.python.org', '/about']
```

A more robust approach for real web scraping:

```python
import re

def extract_links(html):
    """Extract all href values from anchor tags."""
    pattern = r'<a\s+[^>]*href=["\']([^"\']+)["\'][^>]*>'
    return re.findall(pattern, html, re.IGNORECASE)

links = extract_links(html)
for link in links:
    print(link)
```

## Counting Words in Web Content

To count words on a web page, first strip out the HTML tags:

```python
import re

html = '<h1>Hello World</h1><p>This is a simple page with some text.</p>'

# Remove HTML tags
text = re.sub(r'<[^>]+>', ' ', html)
print(text)  #  Hello World  This is a simple page with some text.

# Count words
words = text.split()
print(f'Word count: {len(words)}')  # Word count: 10

# Word frequency
counts = {}
for word in words:
    word = word.lower().strip('.,!?')
    counts[word] = counts.get(word, 0) + 1

for word, count in sorted(counts.items(), key=lambda x: x[1], reverse=True):
    print(f'{word}: {count}')
```

## Processing Web Data Line by Line

When processing large web responses, work line by line to save memory:

```python
response_text = data.decode('utf-8')
lines = response_text.split('\n')

# Skip headers (everything before the blank line)
in_body = False
body_lines = []
for line in lines:
    if not in_body:
        if line.strip() == '':
            in_body = True
        continue
    body_lines.append(line)

body = '\n'.join(body_lines)
print(f'Body has {len(body_lines)} lines')
```

## Handling Mixed Content

Web pages sometimes include both text and binary data references. Always check the `Content-Type` header:

```python
headers_text = headers.decode('utf-8')
if 'text/html' in headers_text:
    body_text = body.decode('utf-8')
    # Process as text
elif 'image/' in headers_text:
    # Save as binary file
    with open('image.png', 'wb') as f:
        f.write(body)
```

## Key Takeaways

- Network data arrives as **bytes**; use `.decode('utf-8')` to convert to strings
- **UTF-8** is the standard web encoding; handle errors with `errors='replace'`
- Extract data from HTML using string methods or `re.findall()` with regex
- Strip HTML tags with `re.sub(r'<[^>]+>', ' ', html)` before counting words
- Always check the `Content-Type` header to know how to process the response

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
