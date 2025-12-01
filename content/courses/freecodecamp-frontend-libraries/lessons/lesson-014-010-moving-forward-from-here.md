---
id: lesson-014-010
title: Moving Forward From Here
chapterId: chapter-14
order: 10
duration: 5
objectives:
  - Moving Forward From Here
---

# Moving Forward From Here

Congratulations! You finished the lessons on React and Redux. There's one last item worth pointing out before you move on. Typically, you won't write React apps in a code editor like this. This challenge gives you a glimpse of what the syntax looks like if you're working with a file system on your own machine. The code should look similar, except for the use of `import` statements (these pull in all of the dependencies that have been provided for you in the challenges).

Finally, writing React and Redux code generally requires some configuration. This can get complicated quickly. If you are interested in experimenting on your own machine, the <a href="https://www.freecodecamp.org/news/install-react-with-create-react-app/" target="_blank" rel="noopener noreferrer nofollow">Create React App</a> comes configured and ready to go.

Alternatively, you can enable Babel as a JavaScript Preprocessor in CodePen, add React and ReactDOM as external JavaScript resources, and work there as well.

## Instructions

Log the message `'Now I know React and Redux!'` to the console.

## Starter Code

```html
/*
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './redux/reducers'
import App from './components/App'

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
*/

// Only change code below this line
```

## Hints

1. The message `Now I know React and Redux!` should be logged to the console.

## Solution

```html
```jsx
console.log('Now I know React and Redux!');
```
```

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/front-end-development-libraries/)*
*Original Challenge ID: 5a24c314108439a4d403614a*
