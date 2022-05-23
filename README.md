# vite-plugin-vue2-hmr

[![npm version](https://badge.fury.io/js/@lancercomet%2Fvite-plugin-vue2-hmr.svg)](https://badge.fury.io/js/@lancercomet%2Fvite-plugin-vue2-hmr)

A Vite plugin enables Vue 2 Composition API component hot reloading.

This plugin is designed for:

 - J/TSX users who use [vue2-jsx-runtime](https://github.com/LancerComet/vue2-jsx-runtime) + Composition API and want to have Vue 2 hot-relaod enabled.
 - Whom uses Composition API without vite-plugin-vue2 (yes it is possible).

> For people who don't use Vue 2 Composition API or vue2-jsx-runtime, you might want to use [vite-plugin-vue2](https://github.com/underfin/vite-plugin-vue2) instead.

## Features

 - Enables hot-reload for components that are created by using `defineComponent`.
 - Supports not only default exports but also named exports.

## Quick start

```
npm install @lancercomet/vite-plugin-vue2-hmr --save-dev
```

```js
import { vue2HMR } from '@lancercomet/vite-plugin-vue2-hmr'

export default {
  plugins: [
    vue2HMR()
  ]  
}
```

## Options

 - `test?: RegExp` - The file type to match. By default it will only deal with .jsx and .tsx files.

## License

Apache-2.0
