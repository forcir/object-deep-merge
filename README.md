<p align="center"></p>
<div align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://cdn.forcir.com/oss/forcir-object-deep-merge/assets/images/logos/dark.png" height="64">
        <img alt="Object Deep Merge Title Image (Logo)" src="https://cdn.forcir.com/oss/forcir-object-deep-merge/assets/images/logos/light.png" height="64">
    </picture>
</div>
<p align="center"><strong>Intelligently merge together two objects and an unlimited amount of nested fields. Maintain type-safety and/or enforce type definitions.</strong></p>

<p align="center"></p>

## Install

```bash
pnpm add object-deep-merge
```

```bash
yarn add object-deep-merge
```

```bash
npm install object-deep-merge
```

## Basic Usage

```ts
import { merge } from "object-deep-merge";
```

### Simply merge two objects, with no nested properties

```ts
const merged = merge({ foo: false }, { bar: true });

console.log({ merged });
```

<details><summary>Output</summary>

```json
{
  "merged": {
    "foo": false,
    "bar": true
  }
}
```

</details>
