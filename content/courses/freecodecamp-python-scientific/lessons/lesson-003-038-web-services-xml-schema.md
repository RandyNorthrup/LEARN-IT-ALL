---
id: lesson-003-038
title: Web Services: XML Schema
chapterId: chapter-03
order: 38
duration: 5
objectives:
  - Understand the purpose of XML Schema (XSD)
  - Define structure, data types, and constraints with XSD
  - Explain why schemas matter for API contracts
  - Understand XML namespaces and validation
---

# Web Services: XML Schema

When two systems exchange XML data, they need a way to agree on what that data should look like. **XML Schema (XSD)** provides a formal contract that defines the structure, data types, and constraints of an XML document.

## Why Schemas Matter

Imagine you build a system that receives order data from partners. Without a schema, one partner might send:

```xml
<order><item>Widget</item><qty>5</qty></order>
```

While another sends:

```xml
<ORDER><Item name="Widget" quantity="five"/></ORDER>
```

A schema prevents this chaos by establishing a **contract**: "Here is exactly what valid data looks like." This is essential for:

- **Validation** — Automatically reject malformed data before processing
- **Documentation** — The schema itself describes the expected format
- **Interoperability** — Multiple systems can independently implement the same contract
- **Code Generation** — Tools can generate parser code directly from schemas

## XSD Basics

An XML Schema Definition (XSD) is itself an XML document that describes other XML documents:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">

  <xs:element name="bookstore">
    <xs:complexType>
      <xs:sequence>
        <xs:element name="book" maxOccurs="unbounded">
          <xs:complexType>
            <xs:sequence>
              <xs:element name="title" type="xs:string"/>
              <xs:element name="author" type="xs:string"/>
              <xs:element name="year" type="xs:integer"/>
              <xs:element name="price" type="xs:decimal"/>
            </xs:sequence>
            <xs:attribute name="category" type="xs:string" use="required"/>
          </xs:complexType>
        </xs:element>
      </xs:sequence>
    </xs:complexType>
  </xs:element>

</xs:schema>
```

This schema enforces that a `<bookstore>` must contain one or more `<book>` elements, each with a `title` (string), `author` (string), `year` (integer), `price` (decimal), and a required `category` attribute.

## Common XSD Data Types

| XSD Type | Description | Example |
|----------|-------------|----------|
| `xs:string` | Text data | `"Hello World"` |
| `xs:integer` | Whole numbers | `42` |
| `xs:decimal` | Decimal numbers | `19.99` |
| `xs:boolean` | True/false | `true` |
| `xs:date` | Calendar date | `2025-03-15` |
| `xs:dateTime` | Date and time | `2025-03-15T10:30:00` |

## Simple vs. Complex Types

**Simple types** contain only text content with no child elements or attributes:
```xml
<xs:element name="age" type="xs:integer"/>
```

**Complex types** can contain child elements, attributes, or both:
```xml
<xs:element name="person">
  <xs:complexType>
    <xs:sequence>
      <xs:element name="name" type="xs:string"/>
      <xs:element name="age" type="xs:integer"/>
    </xs:sequence>
    <xs:attribute name="id" type="xs:integer" use="required"/>
  </xs:complexType>
</xs:element>
```

## Constraints and Occurrence

Schemas can specify how many times elements may appear:

```xml
<xs:element name="phone" type="xs:string" 
            minOccurs="0" maxOccurs="3"/>
```

This says a person can have zero to three phone numbers. The default is `minOccurs="1"` and `maxOccurs="1"` — exactly one occurrence.

## XML Namespaces

Namespaces prevent naming conflicts when combining XML from different sources. They use URIs as unique identifiers:

```xml
<root xmlns:store="http://example.com/store"
      xmlns:inv="http://example.com/inventory">
  <store:item>Widget</store:item>
  <inv:item>SKU-12345</inv:item>
</root>
```

Here, `store:item` and `inv:item` are different elements despite sharing the local name `item`. The namespace URI does not need to point to a real web page — it is simply a unique identifier.

## Validating XML in Python

Python's standard library does not include XSD validation, but the `lxml` library does:

```python
from lxml import etree

# Load the schema
with open('schema.xsd', 'r') as f:
    schema_doc = etree.parse(f)
schema = etree.XMLSchema(schema_doc)

# Parse and validate XML
with open('data.xml', 'r') as f:
    xml_doc = etree.parse(f)

if schema.validate(xml_doc):
    print("XML is valid!")
else:
    print("Validation errors:")
    for error in schema.error_log:
        print(f"  Line {error.line}: {error.message}")
```

## Schemas as API Contracts

In web services, schemas define the contract between client and server. When an API publishes its schema, clients know exactly what to send and what to expect back. SOAP-based web services use **WSDL** (Web Services Description Language), which incorporates XML Schema to describe the service interface. Even in REST APIs, schemas (whether XSD, JSON Schema, or OpenAPI) serve the same purpose — establishing clear expectations between systems.

Understanding XML Schema helps you work with enterprise systems, validate data integrity, and appreciate why modern formats like JSON Schema and OpenAPI specifications exist.

---

*Based on the [freeCodeCamp Scientific Computing with Python Certification](https://www.freecodecamp.org/learn/scientific-computing-with-python/) — Python for Everybody by Dr. Charles Severance*
