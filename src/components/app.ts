import { Header } from './header';
import MainPage from './mainPage';
import { Player } from './player';
import { PlayerButtons, requiresNonNull } from './types/type';

export class App {
    private player: Player;

    constructor() {
        this.player = new Player(
            (event) => this.onRangeInput(event),
            (event) => this.onClickPlayerButton(event)
        );
    }

    public start(): void {
        new MainPage().draw();
        new Header().draw();
        this.player.draw();
    }

    private onRangeInput(event: Event): void {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const value = Number(target.value);
        const duration = Number(target.max);
        const percent = value / duration * 100;
        target.style.background = `linear-gradient(to right, #993aed 0%, #993aed ${percent}%, #dddddd ${percent}%, #dddddd 100%)`;
    }

    public onClickPlayerButton(event: Event): void {
        const target: Element = requiresNonNull(event.target) as Element;
        switch (target.id) {
            case PlayerButtons.Play:
                this.player.playAudio();
                break;
            case PlayerButtons.Next:
                this.player.nextEpisode();
                break;
            case PlayerButtons.Previous:
                this.player.previousEpisode();
                break;
            case PlayerButtons.Skipback:
                this.player.skipBack();
                break;
            case PlayerButtons.Skipforward:
                this.player.skipForward();
                break;
            case PlayerButtons.Save:
                console.log('save to library');
                break;
            default:
                console.log('button');
        }
    }
}
