import { requiresNonNull } from './utils';

export class Header {
    public draw(): void {
        const header: Element = document.createElement('header');
        header.classList.add('header');
        header.classList.add('header__container');

        const body: Element = requiresNonNull(document.querySelector('body'));
        body.appendChild(header);
    }
}
