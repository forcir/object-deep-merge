<p align="center"></p>
<div align="center">
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://cdn.forcir.com/oss/forcir-object-deep-merge/assets/images/logos/dark.png" height="64">
        <source media="(prefers-color-scheme: light)" srcset="https://cdn.forcir.com/oss/forcir-object-deep-merge/assets/images/logos/light.png" height="64">
        <img alt="Forcir Object Deep Merge Logo" src="https://cdn.forcir.com/oss/forcir-object-deep-merge/assets/images/logos/light.png" height="64">
    </picture>
</div>
<p align="center"><strong>Strongly-typed deep and recursive object merging with support for all value types.</strong></p>
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
