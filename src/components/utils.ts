export function requiresNonNull<Type>(object: Type | null | undefined): Type {
    if (object === null || object == undefined) throw new Error('Element not found');

    return object;
}

export function replaceTags(str: string): string {
    const regexForStripHTML = /<.*>.*?/gi;
    return str.replace(regexForStripHTML, '').toLowerCase();
}
