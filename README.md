<a name="readme-top"></a>

<!-- PROJECT SHIELDS -->
![npm](https://img.shields.io/npm/v/@pontem/liquidswap-widget?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/pontem-network/liquidswap-widget?style=for-the-badge)
![GitHub Repo stars](https://img.shields.io/github/stars/pontem-network/liquidswap-widget?style=for-the-badge)
![GitHub contributors](https://img.shields.io/github/contributors/pontem-network/liquidswap-widget?style=for-the-badge)

# Liquidswap Widget

A web component custom element which can be embedded to any frontend application or even plain html / js / css.
Using full strength of [@pontem/liquidswap-sdk](https://www.npmjs.com/package/@pontem/liquidswap-sdk) widget can provide
swap operations with multiple wallets.

## Installation

```bash
yarn add @pontem/liquidswap-widget
```
or
```bash
npm install @pontem/liquidswap-widget
```

## Usage
Function `loadWidget` accepts widgets HTML tag name. It can be custom name but should be in kebab case. 
We recommend to use 'liquidswap-widget' name. Passed name should be exactly the same as tag name.

<details>
  <summary>React</summary>

```typescript
import React, { useLayoutEffect } from 'react';
import { loadWidget } from '@pontem/liquidswap-widget';

export const Widget = () => {
  useLayoutEffect(() => {
    loadWidget('liquidswap-widget');
  }, []);
  return (
    <div className="'Your Wrapper className'">
      <liquidswap-widget/>
    </div>
  );
};
```
</details>


<details>
  <summary>Vue</summary>

```vue
<template>
  <div class="'Your Wrapper class name'">
    <liquidswap-widget>
  </div>
</template>

<script setup lang="ts">
  import { loadWidget } from '@pontem/liquidswap-widget';
  
  loadWidget('liquidswap-widget');
</script> 
```
</details>

<details>
  <summary>Any other framework / lib</summary>

1) Make sure you added html tag `liquidswap-widget` into app.  
```html
<liquidswap-widget></liquidswap-widget>
```

2) Import `loadWidget` function from npm and run with passing html tag name in kebab case;

```js
import { loadWidget } from '@pontem/liquidswap-widget';
  
loadWidget('liquidswap-widget');
```
</details>


<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] Integrate widget to Pontem Wallet.
- [ ] Add theme support.
- [ ] Add example with plain JS.
- [x] Expand token list. 
- [ ] Add MSafe wallet support.

See the [open issues](https://github.com/pontem-network/liquidswap-widget/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>
