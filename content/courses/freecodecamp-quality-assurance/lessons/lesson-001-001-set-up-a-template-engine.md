---
id: lesson-001-001
title: Set up a Template Engine
chapterId: chapter-01
order: 1
duration: 5
objectives:
  - Set up a Template Engine
---

# Set up a Template Engine

Working on these challenges will involve you writing your code using one of the following methods:

- Clone <a href="https://github.com/freeCodeCamp/boilerplate-advancednode/" target="_blank" rel="noopener noreferrer nofollow">this GitHub repo</a> and complete these challenges locally.
- Use a site builder of your choice to complete the project. Be sure to incorporate all the files from our GitHub repo.

A template engine enables you to use static template files (such as those written in *Pug*) in your app. At runtime, the template engine replaces variables in a template file with actual values which can be supplied by your server. Then it transforms the template into a static HTML file that is sent to the client. This approach makes it easier to design an HTML page and allows for displaying variables on the page without needing to make an API call from the client.

`pug@~3.0.0` has already been installed, and is listed as a dependency in your `package.json` file.

Express needs to know which template engine you are using. Use the `set` method to assign `pug` as the `view engine` property's value:

```javascript
app.set('view engine', 'pug');
```

After that, add another `set` method that sets the `views` property of your `app` to point to the `./views/pug` directory. This tells Express to render all views relative to that directory.

Finally, use `res.render()` in the route for your home page, passing `index` as the first argument. This will render the `pug` template.

If all went as planned, your app home page will no longer be blank. Instead, it will display a message indicating you've successfully rendered the Pug template!

Submit your page when you think you've got it right. If you're running into errors, you can <a href="https://forum.freecodecamp.org/t/advanced-node-and-express/567135#set-up-a-template-engine-1" target="_blank" rel="noopener noreferrer nofollow">check out the project completed up to this point</a>.

## Hints

1. Pug should be a dependency.
2. View engine should be Pug.
3. You should set the `views` property of the application to `./views/pug`.
4. Use the correct ExpressJS method to render the index page from the response.
5. Pug should be working.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 5895f700f9fc0f352b528e63*
