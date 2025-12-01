---
id: lesson-001-018
title: Handle a Disconnect
chapterId: chapter-01
order: 18
duration: 5
objectives:
  - Handle a Disconnect
---

# Handle a Disconnect

You may notice that up to now you have only been increasing the user count. Handling a user disconnecting is just as easy as handling the initial connect, except you have to listen for it on each socket instead of on the whole server.

To do this, add another listener inside the existing `'connect'` listener that listens for `'disconnect'` on the socket with no data passed through. You can test this functionality by just logging that a user has disconnected to the console.

```js
socket.on('disconnect', () => {
  /*anything you want to do on disconnect*/
});
```

To make sure clients continuously have the updated count of current users, you should decrease `currentUsers` by 1 when the disconnect happens then emit the `'user count'` event with the updated count.

**Note:** Just like `'disconnect'`, all other events that a socket can emit to the server should be handled within the connecting listener where we have 'socket' defined.

Submit your page when you think you've got it right. If you're running into errors, you can <a href="https://forum.freecodecamp.org/t/advanced-node-and-express/567135#handle-a-disconnect-8" target="_blank" rel="noopener noreferrer nofollow">check out the project completed up to this point</a>.

## Hints

1. Server should handle the event disconnect from a socket.
2. Your client should be listening for `'user count'` event.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 589fc831f9fc0f352b528e76*
