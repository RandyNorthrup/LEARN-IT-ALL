---
id: lesson-007-003
title: How Do You Render Lists in React?
chapterId: chapter-07
order: 3
duration: 5
objectives:
  - How Do You Render Lists in React?
---

# How Do You Render Lists in React?

Rendering lists is a fundamental task in React web apps, and is used for displaying data to users. In React, the `map` method is used to transform an array of data into an array of JSX elements that can be rendered in the UI.

Here is an example of a component called `FruitList` that displays a list of fruits:

```jsx
function FruitList() {
  const fruits = ['Apple', 'Banana', 'Cherry', 'Date'];
  return (
    <ul>
      {fruits.map(fruit => <li>{fruit}</li>)}
    </ul>
  );
}
```

In this example, the `map` function iterates over each item in the `fruits` array. For each fruit, it creates a new `li` element containing the fruit's name. The newly created array of `li` elements is then displayed inside the `ul` parent tags.

However, when rendering lists in React, it is important not to forget the `key` prop for each element in the list. The key must always be unique and it helps React identify which items have changed, been added, or been removed, which is essential for efficient rendering and updating the list. 

Let's modify our example to include keys:

```jsx
function FruitList() {
  const fruits = ["Apple", "Banana", "Cherry", "Date"];
  return (
    <ul>
      {fruits.map((fruit, index) => (
        <li key={`${fruit}-${index}`}>{fruit}</li>
      ))}
    </ul>
  );
}
```

In this refactored example, we are creating a unique key for each list item by concatenating the fruit name with its index. This ensures that each list item has a distinct key, which helps React efficiently manage and update the list when items are added, removed, or reordered.

React also allows you to render more complex structures. For instance, you might have an array of objects representing users, each with multiple properties that you want to display:

```jsx
function UserList() {
  const users = [
    { id: "user-001-employee", name: "Alice", email: "alice@example.com" },
    { id: "user-002-employee", name: "Bob", email: "bob@example.com" },
    { id: "user-003-employee", name: "John", email: "john@example.com" },
  ];
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
}
```

In this example, we're creating a more complex JSX structure for each user, displaying both their name and email address. We're using the user's `id` as the `key`, which is a good practice.

In conclusion, rendering lists in React involves converting arrays of data into JSX elements, typically using the `map` function.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 673500b41af8500191febedc*
