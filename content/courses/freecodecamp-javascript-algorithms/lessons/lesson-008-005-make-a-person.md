---
id: lesson-008-005
title: Make a Person
chapterId: chapter-08
order: 5
duration: 5
objectives:
  - Make a Person
---

# Make a Person

Fill in the object constructor with the following methods below:

```js
getFirstName()
getLastName()
getFullName()
setFirstName(first)
setLastName(last)
setFullName(first, last)
```

Run the tests to see the expected output for each method. These methods must be the only available means of interacting with the object. Each test will declare a new `Person` instance as `new Person('Bob', 'Ross')`.

## Starter Code

```html
const Person = function(first, last) {
  this.getFullName = function() {
    return "";
  };
  return "";
};
```

## Hints

1. You should not change the function signature.
2. You should not reassign the `first` parameter.
3. You should not reassign the `last` parameter.
4. No properties should be added. `Object.keys(Person).length` should always return 6.
5. You should be able to instantiate your `Person` object.
6. Your `Person` object should not have a `firstName` property.
7. Your `Person` object should not have a `lastName` property.
8. The `.getFirstName()` method should return the string `Bob`.
9. The `.getLastName()` should return the string `Ross`.
10. The `.getFullName()` method should return the string `Bob Ross`.
11. The `.getFullName()` method should return the string `Haskell Ross` after calling `.setFirstName('Haskell')`.
12. The `.getFullName()` method should return the string `Bob Curry` after calling `.setLastName('Curry')`.
13. The `.getFullName()` method should return the string `Haskell Curry` after calling `.setFullName('Haskell', 'Curry')`.
14. The `.getFirstName()` method should return the string `Haskell` after calling `.setFullName('Haskell', 'Curry')`.
15. The `.getLastName()` method should return the string `Curry` after calling `.setFullName('Haskell', 'Curry')`.
16. The `.getFullName()` method should return the string `Emily Martinez de la Rosa` after calling `.setFullName('Emily Martinez', 'de la Rosa')`.
17. The `.getFirstName()` property should return the string `Emily Martinez` after calling `.setFullName('Emily Martinez', 'de la Rosa')`.
18. The `.getLastName()` property should return the string `de la Rosa` after calling `.setFullName('Emily Martinez', 'de la Rosa')`.

## Solution

```html
```js
const Person = function(first, last) {
  let firstName = first;
  let lastName = last;

  this.getFirstName = function(){
    return firstName;
  };

  this.getLastName = function(){
    return lastName;
  };

  this.getFullName = function(){
    return firstName + " " + lastName;
  };

  this.setFirstName = function(str){
    firstName = str;
  };


  this.setLastName = function(str){
    lastName = str;
  };

  this.setFullName = function(first, last){
    firstName = first;
    lastName = last;
  };
};
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: a2f1d72d9b908d0bd72bb9f6*
