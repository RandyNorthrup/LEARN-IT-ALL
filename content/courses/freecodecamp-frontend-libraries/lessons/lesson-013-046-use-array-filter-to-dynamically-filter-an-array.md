---
id: lesson-013-046
title: Use Array.filter() to Dynamically Filter an Array
chapterId: chapter-13
order: 46
duration: 5
objectives:
  - Use Array.filter() to Dynamically Filter an Array
---

# Use Array.filter() to Dynamically Filter an Array

The `map` array method is a powerful tool that you will use often when working with React. Another method related to `map` is `filter`, which filters the contents of an array based on a condition, then returns a new array. For example, if you have an array of users that all have a property `online` which can be set to `true` or `false`, you can filter only those users that are online by writing:

```js
let onlineUsers = users.filter(user => user.online);
```

## Instructions

In the code editor, `MyComponent`'s `state` is initialized with an array of users. Some users are online and some aren't. Filter the array so you see only the users who are online. To do this, first use `filter` to return a new array containing only the users whose `online` property is `true`. Then, in the `renderOnline` variable, map over the filtered array, and return a `li` element for each user that contains the text of their `username`. Be sure to include a unique `key` as well, like in the last challenges.

## Starter Code

```html
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          username: 'Jeff',
          online: true
        },
        {
          username: 'Alan',
          online: false
        },
        {
          username: 'Mary',
          online: true
        },
        {
          username: 'Jim',
          online: false
        },
        {
          username: 'Sara',
          online: true
        },
        {
          username: 'Laura',
          online: true
        }
      ]
    };
  }
  render() {
    const usersOnline = null; // Change this line
    const renderOnline = null; // Change this line
    return (
      <div>
        <h1>Current Online Users:</h1>
        <ul>{renderOnline}</ul>
      </div>
    );
  }
}
```

## Hints

1. `MyComponent` should exist and render to the page.
2. `MyComponent`'s state should be initialized to an array of six users.
3. `MyComponent` should return a `div`, an `h1`, and then an unordered list containing `li` elements for every user whose online status is set to `true`.
4. `MyComponent` should render `li` elements that contain the `username` of each online user.
5. Each list item element should have a unique `key` attribute.

## Solution

```html
```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          username: 'Jeff',
          online: true
        },
        {
          username: 'Alan',
          online: false
        },
        {
          username: 'Mary',
          online: true
        },
        {
          username: 'Jim',
          online: false
        },
        {
          username: 'Sara',
          online: true
        },
        {
          username: 'Laura',
          online: true
        }
      ]
    };
  }
  render() {
    const usersOnline = this.state.users.filter(user => {
      return user.online;
    });
    const renderOnline = usersOnline.map(user => {
      return <li key={user.username}>{user.username}</li>;
    });
    return (
      <div>
        <h1>Current Online Users:</h1>
        <ul>{renderOnline}</ul>
      </div>
    );
  }
}
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d403618c*
