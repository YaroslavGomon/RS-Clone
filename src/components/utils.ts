export function requiresNonNull<Type>(object: Type | null | undefined): Type {
    if (object === null || object == undefined) throw new Error('Element not found');

    return object;
}
