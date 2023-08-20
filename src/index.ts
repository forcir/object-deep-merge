import { initialValue, isMap, isObjectLiteral, isSet, objectKeys, type MergeableObject } from "./objects.js";

function merge<TData extends MergeableObject = MergeableObject, TResult extends MergeableObject = TData>(
    source: TData,
    target: TData,
    ...targets: Array<TData>
): TResult {
    let output = initialValue;

    for (const item of [source, target, ...targets]) {
        if (!isObjectLiteral(item)) {
            throw new TypeError(`Expected all arguments to be object literals.`);
        }

        const interimOutput = { ...output };
        const keys = objectKeys(item);

        for (const key of keys) {
            const outputValue = interimOutput[key];
            const targetValue = item[key];

            /**
             * The source object already contains this EXACT key value pair.
             * We can return early, nothing further to be done.
             */
            if (outputValue === targetValue) {
                continue;
            }

            /**
             * This is where we enter recursion.
             * Both mergable values are object literals, we must go deeper.
             * Another invocation of this function will occur, with a nested subset object.
             * When it is done and returns it's merged object value, we will assign it to our own output at that key.
             */
            if (isObjectLiteral(outputValue) && isObjectLiteral(targetValue)) {
                interimOutput[key] = merge(outputValue, targetValue);
                continue;
            }

            /**
             * Both values are arrays, so we're going to:
             *    - join the arrays together
             *    - dedupe the array values using a set
             *    - Rebuild a new array from the deduped set
             */
            if (Array.isArray(outputValue) && Array.isArray(targetValue)) {
                interimOutput[key] = [...new Set([...outputValue, ...targetValue])];
                continue;
            }

            /**
             * Merge Map
             */
            if (isMap(outputValue) && isMap(targetValue)) {
                interimOutput[key] = new Map([...outputValue, ...targetValue]);
                continue;
            }

            /**
             * Merge Set
             */
            if (isSet(outputValue) && isSet(targetValue)) {
                interimOutput[key] = new Set([...outputValue, ...targetValue]);
                continue;
            }

            /**
             * Not an object, not an array,
             * We KNOW the key exists in the current target given we're in a loop.
             * We do not care what the previous value was (if even set at all) we're going to overwrite it.
             */
            interimOutput[key] = targetValue;
            continue;
        }

        output = interimOutput;
    }

    return output satisfies TResult;
}

export type { Merge, MergeDeep } from "type-fest";
export * from "./objects.js";
export { merge };
