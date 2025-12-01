---
id: lesson-013-019
title: Step 22
chapterId: chapter-13
order: 19
duration: 5
objectives:
  - Step 22
---

# Step 22

When your `if` condition is true, you need to swap the two elements, "bubbling" the larger element up toward the end of the array.

To do this, declare a `temp` variable and assign it the value of `array[j]`. Then assign `array[j]` the value of `array[j + 1]`. Finally, assign `array[j + 1]` the value of `temp`.

## Starter Code

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="./styles.css" />
    <title>Number Sorter</title>
  </head>
  <body>
    <main>
      <h1>Number Sorter</h1>
      <form id="form" class="form">
        <h2>Input:</h2>
        <fieldset>
          <span class="bracket">[</span>
          <div>
            <select
              name="values"
              class="values-dropdown"
              aria-label="first number"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8" selected>8</option>
              <option value="9">9</option>
            </select>
            <span class="comma">,</span>
          </div>
          <div>
            <select
              name="values"
              class="values-dropdown"
              aria-label="second number"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2" selected>2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            <span class="comma">,</span>
          </div>
          <div>
            <select
              name="values"
              class="values-dropdown"
              aria-label="third number"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4" selected>4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            <span class="comma">,</span>
          </div>
          <div>
            <select
              name="values"
              class="values-dropdown"
              aria-label="fourth number"
            >
              <option value="0">0</option>
              <option value="1" selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            <span class="comma">,</span>
          </div>
          <div>
            <select
              name="values"
              class="values-dropdown"
              aria-label="fifth number"
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3" selected>3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </div>
          <span class="bracket">]</span>
        </fieldset>
        <button id="sort">Sort</button>
      </form>
      <div class="output-container">
        <h2>Output:</h2>
        <div class="output-array">
          <span class="bracket">[</span>
          <div>
            <span class="output-value" id="output-value-0">0</span>
            <span class="comma">,</span>
          </div>
          <div>
            <span class="output-value" id="output-value-1">0</span>
            <span class="comma">,</span>
          </div>
          <div>
            <span class="output-value" id="output-value-2">0</span>
            <span class="comma">,</span>
          </div>
          <div>
            <span class="output-value" id="output-value-3">0</span>
            <span class="comma">,</span>
          </div>
          <div>
            <span class="output-value" id="output-value-4">0</span>
          </div>
            <span class="bracket">]</span>
        </div>
      </div>
    </main>
    <script src="./script.js"></script>
  </body>
</html>
```

## Hints

1. Within your `if` statement, you should declare a `temp` variable.
2. You should assign `temp` the value of `array[j]`.
3. You should assign `array[j]` the value of `array[j + 1]`.
4. You should assign `array[j + 1]` the value of `temp`.

---

*Source: [freeCodeCamp](https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/)*
*Original Challenge ID: 6410edb33eeaf50dd9a22ab4*
