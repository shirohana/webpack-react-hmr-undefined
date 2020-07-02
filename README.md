> Fixed in [v5.0.0-beta.18](https://github.com/webpack/webpack/releases/tag/v5.0.0-beta.18)

webpack-react-hmr-undefined
===========================
> This is the minimal reproducible repo for an issue in [webpack](https://github.com/webpack/webpack)

UPDATE
------

The main reason was found from `react-hot-loader`, no need React to reproduce
the error now.

How to Reproduce Error
----------------------
1. Clone repo and cd

    ```
    git clone https://github.com/shirohana/webpack-react-hmr-undefined

    cd webpack-react-hmr-undefined
    ```

2. Install dependencies

    ```
    yarn install
    ```

3. Launch the dev server

    ```
    make start
    ```

    or

    ```
    node ./server/index.js
    ```

4. Open browser with url (default: http://127.0.0.1:3000) and open DevTools

5. Edit file `src/app/index.js` like:


    ```diff
      ...

      import hot from './hot'
    - // import IndexPage from '../pages/index'
    + import IndexPage from '../pages/index'

      ...
    ```

6. You'll see the Error in Console

![The Error in Console](./screenshots/01.png)

Error Stack
-----------
You can see there's no corresponding `moduleId` in ModuleCache.

![Error Stack](./screenshots/02.png)

Seems the cache had be invalidated in unexpect. I have no idea how it happened
in actual, but there's a simplest way to **do a quickfix** (´・ω・｀)

##### `webpack/lib/hmr/JavascriptHotModuleReplacement.runtime.js`

```diff
  207  if (
  208    $moduleCache$[outdatedModuleId] &&
  209    $moduleCache$[outdatedModuleId].hot._selfAccepted &&
  210    // removed self-accepted modules should not be required
  211    appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
  212    // when called invalidate self-accepting is not possible
- 213    !$moduleCache$[moduleId].hot._selfInvalidated
+        !$moduleCache$[outdatedModuleId].hot._selfInvalidated
  214  ) {
```

---
#### Patch

```
curl -s https://raw.githubusercontent.com/shirohana/webpack-react-hmr-undefined/master/bin/patch-webpack-11035 | node
```
