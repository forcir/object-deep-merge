type MergeableObject = Record<string | number | symbol, any>;

function isMap(input: MapConstructor | SetConstructor): input is MapConstructor {
    return isMapInstance(input);
}

function isMapInstance(input: any): boolean {
    return input instanceof Map;
}

function isSet(input: MapConstructor | SetConstructor): input is SetConstructor {
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

export { isMap, isSet, isObjectLiteral, objectKeys };
export type { MergeableObject };
