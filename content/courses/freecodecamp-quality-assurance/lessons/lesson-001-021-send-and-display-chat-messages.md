---
id: lesson-001-021
title: Send and Display Chat Messages
chapterId: chapter-01
order: 21
duration: 5
objectives:
  - Send and Display Chat Messages
---

# Send and Display Chat Messages

It's time you start allowing clients to send a chat message to the server to emit to all the clients! In your `client.js` file, you should see there is already a block of code handling when the message form is submitted.

```js
$('form').submit(function() {
  /*logic*/
});
```

Within the form submit code, you should emit an event after you define `messageToSend` but before you clear the text box `#m`. The event should be named `'chat message'` and the data should just be `messageToSend`.

```js
socket.emit('chat message', messageToSend);
```

Now, on your server, you should be listening to the socket for the event `'chat message'` with the data being named `message`. Once the event is received, it should emit the event `'chat message'` to all sockets using `io.emit`, sending a data object containing the `username` and `message`.

In `client.js`, you should now listen for event `'chat message'` and, when received, append a list item to `#messages` with the username, a colon, and the message!

At this point, the chat should be fully functional and sending messages across all clients!

Submit your page when you think you've got it right. If you're running into errors, you can <a href="https://forum.freecodecamp.org/t/advanced-node-and-express/567135#send-and-display-chat-messages-11" target="_blank" rel="noopener noreferrer nofollow">check out the project completed up to this point</a>.

## Hints

1. Server should listen for `'chat message'` and then emit it properly.
2. Client should properly handle and display the new data from event `'chat message'`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 589fc832f9fc0f352b528e79*
