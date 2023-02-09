import { Player } from './player';

const headerContainer: Element | null = document.querySelector('.header__container');

export class App {
    public start(): void {
        if (headerContainer !== null) {
            new Player(headerContainer, this.onRangeInput).drawPlayer();
        }
    }

    private onRangeInput(event: Event): void {
        const target = event.target as HTMLInputElement;
        const value: string = target.value;
        target.style.background = `linear-gradient(to right, #993aed 0%, #993aed ${value}%, #8a8a8a ${value}%, #8a8a8a 100%)`;
    }
}
