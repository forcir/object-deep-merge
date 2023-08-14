type MergeableObject = Record<string | number | symbol, any>;

const initialValue: MergeableObject = {};

function isMap<TKey = unknown, TValue = unknown>(input: any): input is Map<TKey, TValue> {
    return isMapInstance(input);
}

function isMapInstance(input: any): boolean {
    return input instanceof Map;
}

function isSet<T = unknown>(input: any): input is Set<T> {
    return isSetInstance(input);
}

function isSetInstance(input: any): boolean {
    return input instanceof Set;
}

function isObjectLiteral(input: any): boolean {
    return !!input && input.constructor === Object;
}

function objectKeys<T extends object>(object: T): Array<keyof T> {
    return Object.keys(object) as Array<keyof T>;
}

export { initialValue, isMap, isMapInstance, isSet, isSetInstance, isObjectLiteral, objectKeys };
export type { MergeableObject };
