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

# string-to-svg 使用, browser 环境

::: code-group

```javascript [index.vue]
<template>
    <div class="mt-[50px] w-[80%]">
        <ElButton @click="click2">test</ElButton>
        <span v-html="svgHtml" />
    </div>
</template>

<script>
import { getSVG, loadFont } from "string-to-svg"

import font2 from "./ipag.ttf"
const svgHtml = ref()

const click2 = async () => {
  console.log("check2")

  fetch(font2)
    .then((response) => response.arrayBuffer())
    .then(async (font) => {
      console.log("Font loaded:", font)
      const fontParse = await loadFont(font)
      console.log("Font loaded:", font)
      const attributes = { fill: "red", stroke: "black" }
      const options = { font: fontParse, x: 0, y: 0, fontSize: 72, anchor: "top", attributes }
      svgHtml.value = getSVG("hello", options)
      console.log(svgHtml.value)
    })
    .catch((error) => console.error("Error loading font:", error))
}
</script>
```

:::
