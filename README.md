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

## Typed Usage

### `merge` Type Signature

```ts
function merge<TData extends MergeableObject = MergeableObject, TResult extends MergeableObject = TData>(
    source: TData,
    target: TData,
    ...targets: Array<TData>
): TResult;
```

> [!NOTE]  
> The `Merge` and `DeepMerge` types from `type-fest` are shipped from this library as a convenience. It is not unreasonable to use those types directly instead.

The `merge` function accepts two optional type generics. `TData` and `TResult`.

Without explicitly passing in types the function will infer the shape of the object(s) passed in.

Passing in `TData` will validate the shape of the objects passed in. Passing in `TResult` will override the output type. While this should be used sparingly, it provides a convenient approach for correctly typing partial types into complete types.

### Simple Example w/o Generics

```ts
type Data = {
    name: string;
    description: string;
};

const base: Data = { name: "object-deep-merge", description: "merge objects" };

const overrides: Partial<Data> = { description: "merge objects, deeply" };

const merged = merge(base, overrides);
// function merge<Partial<Data>, Partial<Data>>(source: Partial<Data>, target: Partial<Data>, ...targets: Partial<Data>[]): Partial<Data>

console.log({ merged });
```

<details><summary>Output</summary>

```json
{
    "merged": {
        "name": "object-deep-merge",
        "description": "merge objects, deeply"
    }
}
```

</details>

### Simple Example w/ `TData` Generic

> Passing in TData will validate the shape of the objects passed in.

```ts
type Data = {
    name: string;
    description: string;
};

const base: Data = { name: "object-deep-merge", description: "merge objects" };

const overrides: Partial<Data> = { description: "merge objects, deeply" };

const merged: Partial<Data> = merge<Partial<Data>>(base, overrides);
// function merge<Partial<Data>, Partial<Data>>(source: Partial<Data>, target: Partial<Data>, ...targets: Partial<Data>[]): Partial<Data>

console.log({ merged });
```

<details><summary>Output</summary>

```json
{
    "merged": {
        "name": "object-deep-merge",
        "description": "merge objects, deeply"
    }
}
```

</details>

### Simple Example w/ `TData` and `TResult` Generics

> Passing in `TResult` will override the output type. While this should be used sparingly, it provides a convenient approach for correctly typing partial types into complete types.

```ts
type Data = {
    name: string;
    description: string;
};

const base: Data = { name: "object-deep-merge", description: "merge objects" };

const overrides: Partial<Data> = { description: "merge objects, deeply" };

const merged: Data = merge<Partial<Data>, Data>(base, overrides);
// function merge<Partial<Data>, Data>(source: Partial<Data>, target: Partial<Data>, ...targets: Partial<Data>[]): Data

console.log({ merged });
```

<details><summary>Output</summary>

```json
{
    "merged": {
        "name": "object-deep-merge",
        "description": "merge objects, deeply"
    }
}
```

</details>
