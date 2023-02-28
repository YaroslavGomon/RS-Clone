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

export function formatTime(duration: number): string {
    const hours: number =  duration >= 3600 ? Math.floor(duration / 3600) : 0;
    const hoursStr: string = hours !== 0 ? `${hours} hr ` : ``;
    const minutes: number = Math.floor((duration - hours * 3600) / 60);
    const seconds: number = Math.floor(duration - hours * 3600 - minutes * 60);

    return `${hoursStr} ${minutes} min ${seconds} sec`;
}
