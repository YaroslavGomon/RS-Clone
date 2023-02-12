import { Header } from './header';
import MainPage from './mainPage';
import { Player } from './player';
import Controller from './controller';
import PodcastPage from './podcastPage';
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
        this.player.drawPlayer();
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

function addEventListener(){
    const mainDOM = document.querySelector('main') as HTMLElement;
    const track = document.querySelector('.track') as HTMLAudioElement;
    const controller = new Controller;
    mainDOM.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.dataset.id && target.classList.contains("card__play") === false){
            const podcastPage = new PodcastPage(Number(target.dataset.id));
            podcastPage.drawPodcastPage("spotify");
        }
        else if (target.dataset.id && target.classList.contains("card__play") === true){
            controller.fetchEpisodesById(Number(target.dataset.id))
            .then(data => {
                track.src = data[0].enclosureUrl;
                track.play();
            });
        }
    });
}
