import { isMap, isObjectLiteral, isSet, objectKeys, type MergeableObject } from "./objects.js";

const initialValue: MergeableObject = {};

function merge<S extends MergeableObject = MergeableObject, R extends MergeableObject = S>(
    source: S,
    target: S,
    ...targets: Array<S>
): R {
    return [source, target, ...targets].reduce((source, target) => {
        if (!isObjectLiteral(target)) {
            throw new TypeError(`Expected all arguments to be object literals.`);
        }

        const output = { ...source };
        const keys = objectKeys(target);

        keys.forEach((key) => {
            const outputValue = output[key];
            const targetValue = target[key];

            /**
             * The source object already contains this EXACT key value pair.
             * We can return early, nothing further to be done.
             */
            if (outputValue === targetValue) {
                return;
            }

            /**
             * This is where we enter recursion.
             * Both mergable values are object literals, we must go deeper.
             * Another invocation of this function will occur, with a nested subset object.
             * When it is done and returns it's merged object value, we will assign it to our own output at that key.
             */
            if (isObjectLiteral(outputValue) && isObjectLiteral(targetValue)) {
                output[key] = merge(outputValue, targetValue);
                return;
            }

            /**
             * Both values are arrays, so we're going to:
             *    - concatenate the values together
             *    - dedupe using a Set
             *    - Rebuild a new array from the set
             */
            if (Array.isArray(outputValue) && Array.isArray(targetValue)) {
                output[key] = Array.from(new Set(outputValue.concat(targetValue)));
                return;
            }

            /**
             * Merge Map
             */
            if (isMap(outputValue) && isMap(targetValue)) {
                output[key] = new Map([...outputValue, ...targetValue]);
                return;
            }

            /**
             * Merge Set
             */
            if (isSet(outputValue) && isSet(targetValue)) {
                output[key] = new Set([...outputValue, ...targetValue]);
                return;
            }

            // TODO: Set + Map merging maybe???

            /**
             * Not an object, not an array,
             * We KNOW the key exists in the current target given we're in a loop.
             * We do not care what the previous value was (if even set at all) we're going to overwrite it.
             */
            output[key] = targetValue;
            return;
        });

        return { ...output };
    }, initialValue) satisfies R;
}

export { merge };
export type { MergeableObject };
