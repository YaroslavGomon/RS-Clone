export function requiresNonNull<Type>(object: Type | null | undefined): Type {
    if (object === null || object == undefined) throw new Error('Element not found');

    return object;
}

export function querySelectNonNull<Type>(selector: string): Type {
    return requiresNonNull(document.querySelector(selector) as Type | null);
}

export function replaceTags(str: string): string {
    const regexForStripHTML = /<.*?>.*?/gi;
    return str.replace(regexForStripHTML, '').toLowerCase();
}

export function changeRangeBackground(range: HTMLInputElement): void {
    const duration: number = Number(range.max);
    const percent: number = (Number(range.value) / duration) * 100;
    range.style.background = `linear-gradient(to right, #993aed 0%, #993aed ${percent}%, #dddddd ${percent}%, #dddddd 100%)`;
}
