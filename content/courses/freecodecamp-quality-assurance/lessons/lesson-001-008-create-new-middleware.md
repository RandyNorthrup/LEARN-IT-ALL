---
id: lesson-001-008
title: Create New Middleware
chapterId: chapter-01
order: 8
duration: 5
objectives:
  - Create New Middleware
---

# Create New Middleware

As is, any user can just go to `/profile` whether they have authenticated or not by typing in the URL. You want to prevent this by checking if the user is authenticated first before rendering the profile page. This is the perfect example of when to create a middleware.

The challenge here is creating the middleware function `ensureAuthenticated(req, res, next)`, which will check if a user is authenticated by calling Passport's `isAuthenticated` method on the `request` which checks if `req.user` is defined. If it is, then `next()` should be called. Otherwise, you can just respond to the request with a redirect to your homepage to login.

An implementation of this middleware is:

```javascript
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
};
```

Create the above middleware function, then pass `ensureAuthenticated` as middleware to requests for the profile page before the argument to the GET request:

```javascript
app
 .route('/profile')
 .get(ensureAuthenticated, (req,res) => {
    res.render('profile');
 });
```

Submit your page when you think you've got it right. If you're running into errors, you can <a href="https://forum.freecodecamp.org/t/advanced-node-and-express/567135#create-new-middleware-8" target="_blank" rel="noopener noreferrer nofollow">check out the project completed up to this point</a>.

## Hints

1. The middleware `ensureAuthenticated` should be implemented and attached to the `/profile` route.
2. An unauthenticated GET request to `/profile` should correctly redirect to `/`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/quality-assurance/)*
*Original Challenge ID: 5895f70df9fc0f352b528e6a*
