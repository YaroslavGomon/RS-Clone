import MainPage from './mainPage';
import { Player } from './player';
import Controller from './controller';
import PodcastPage from './podcastPage';

export class App {
    public start(): void {
        new MainPage().draw();
        const headerContainer: Element | null = document.querySelector('.header__container');
        if (headerContainer !== null) {
            new Player(headerContainer, this.onRangeInput).drawPlayer();
        }
        addEventListener();
    }

    private onRangeInput(event: Event): void {
        const target = event.target as HTMLInputElement;
        const value: string = target.value;
        target.style.background = `linear-gradient(to right, #993aed 0%, #993aed ${value}%, #8a8a8a ${value}%, #8a8a8a 100%)`;
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
