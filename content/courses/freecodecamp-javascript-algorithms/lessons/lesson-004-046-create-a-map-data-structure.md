---
id: lesson-004-046
title: Create a Map Data Structure
chapterId: chapter-04
order: 46
duration: 5
objectives:
  - Create a Map Data Structure
---

# Create a Map Data Structure

The next few challenges will cover maps and hash tables. Maps are data structures that store key-value pairs. In JavaScript, these are available to us as objects. Maps provide rapid lookup of stored items based on key values and are very common and useful data structures.

## Instructions

Let's get some practice creating our own map. Because JavaScript objects provide a much more efficient map structure than anything we could write here, this is intended primarily as a learning exercise. However, JavaScript objects only provide us with certain operations. What if we wanted to define custom operations? Use the `Map` object provided here as a wrapper around a JavaScript `object`. Create the following methods and operations on the Map object:

<ul>
<li><code>add</code> accepts a <code>key, value</code> pair to add to the map.</li>
<li><code>remove</code> accepts a key and removes the associated <code>key, value</code> pair</li>
<li><code>get</code> accepts a <code>key</code> and returns the stored <code>value</code></li>
<li><code>has</code> accepts a <code>key</code> and returns <dfn>true</dfn> if the key exists or <dfn>false</dfn> if it doesn't.</li>
<li><code>values</code> returns an array of all the values in the map</li>
<li><code>size</code> returns the number of items in the map</li>
<li><code>clear</code> empties the map</li>
</ul>

## Starter Code

```html
var Map = function() {
  this.collection = {};
  // Only change code below this line
  
  // Only change code above this line
};
```

## Hints

1. The `Map` data structure should exist.
2. The `Map` object should have the following methods: `add`, `remove`, `get`, `has`, `values`, `clear`, and `size`.
3. The `add` method should add items to the map.
4. The `has` method should return `true` for added items and `false` for absent items.
5. The `get` method should accept keys as input and should return the associated values.
6. The `values` method should return all the values stored in the map as strings in an array.
7. The `clear` method should empty the map and the `size` method should return the number of items present in the map.

## Solution

```html
```js
var Map = function() {
    this.collection = {};
    // Only change code below this line

    this.add = function(key,value) {
      this.collection[key] = value;
    }

    this.remove = function(key) {
      delete this.collection[key];
    }

    this.get = function(key) {
      return this.collection[key];
    }

    this.has = function(key) {
      return this.collection.hasOwnProperty(key)
    }

    this.values = function() {
      return Object.values(this.collection);
    }

    this.size = function() {
      return Object.keys(this.collection).length;
    }

    this.clear = function() {
      for(let item of Object.keys(this.collection)) {
        delete this.collection[item];
      }
    }
    // Only change code above this line
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 8d5823c8c441eddfaeb5bdef*
