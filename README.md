# Liquidswap Widget

This library ships a web component custom element which can be embedded to any frontend application or even plain html / js / css.  

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

### React

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

### Vue

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

### Any other framework / lib.

1) Make sure you added html tag `liquidswap-widget` into app.  
```html
<liquidswap-widget></liquidswap-widget>
```

2) Import `loadWidget` function from npm and run with passing html tag name in kebab case;

```js
import { loadWidget } from '@pontem/liquidswap-widget';
  
loadWidget('liquidswap-widget');
```

