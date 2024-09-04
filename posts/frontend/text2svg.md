---
date: 2024-09-05
title: text-to-svg 使用
category: vite
tags:
    - svg
    - 混淆
description: text-to-svg 使用
---

# text-to-svg 使用

::: code-group 
```javascript [tsconfig.json]
{
  "compilerOptions": {
    /* Modules */
    "module": "CommonJS" /* Specify what module code is generated. */,
    "esModuleInterop": true,
    "skipLibCheck": true /* Skip type checking all .d.ts files. */
  }
}
```

``` typescript [testFont.ts]
const TextToSVG = require("text-to-svg");
const textToSVG = TextToSVG.loadSync();

const attributes = { fill: "red", stroke: "black" };
const options = {
  x: 0,
  y: 0,
  fontSize: 72,
  anchor: "top",
  attributes: attributes,
};

const svg = textToSVG.getSVG("hello你好", options);

console.log(svg);
```
:::

但是这个示例是 node 环境使用，官网写着
> An example for loading default font synchronously. The default font is IPA font. This method only works on Node.js.

```javascript
const textToSVG = TextToSVG.loadSync();
const svg = textToSVG.getSVG('hello');
console.log(svg);
```

可尝试如下
```javaacript
// An example for loading font asynchronously.

// First argument is URL on web browsers, but it is file path on Node.js.
TextToSVG.load('/fonts/Noto-Sans.otf', function(err, textToSVG) {
    const svg = textToSVG.getSVG('hello');
    console.log(svg);
});
```

string-to-svg 这个包用 ts 写，但是用于node的代码有点问题，__dirname ? -_-||
```javascript
function loadFont(fontPath) {
  const path = join(__dirname, fontPath);
  return loadSync(path);
}
```
