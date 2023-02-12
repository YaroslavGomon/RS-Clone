import { Header } from './header';
import MainPage from './mainPage';
import { Player } from './player';
import PodcastPage from './podcastPage';
import { PlayerButtons, requiresNonNull } from './types/type';
import { Router } from './router';
import { Episode } from './episode';
import Cards from './cards';

export class App {
    private player: Player;
    private router: Router;

    constructor() {
        this.player = new Player(
            (event) => this.onRangeInput(event),
            (event) => this.onClickPlayerButton(event)
        );

        this.router = new Router();
    }

    public start(): void {
        new MainPage().draw();
        new Header().draw();
        this.player.draw();

        this.createBasicRoutes();
        this.router.handleLocation();

        window.addEventListener('popstate', () => this.router.handleLocation());
    }

    private createBasicRoutes() {
        this.router.addRoute('/', () => this.onLoadMainPage());
        this.router.addRoute('podcast', (id: number) => this.onLoadPodcastPage(id));
        this.router.addRoute('episode', (id: number) => this.onLoadEpisodePage(id));
    }

    private onRangeInput(event: Event): void {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const value = Number(target.value);
        const duration = Number(target.max);
        const percent = (value / duration) * 100;
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

    private onLoadMainPage(): void {
        new Cards((id: number) => this.onClickPodcastCard(id)).draw();
    }

    private onClickPodcastCard(id: number): void {
        this.router.updateUrl(`/#podcast/${id}`);
    }

    private onLoadPodcastPage(id: number): void {
        new PodcastPage(id, () => this.onClickEpisodeCard(id)).drawPodcastPage('spotify');
    }

    private onClickEpisodeCard(id: number): void {
        console.log('onclickEpisode');

        this.router.updateUrl(`/#episode/${id}`);
    }

    private onLoadEpisodePage(id: number): void {
        new Episode(() => this.onClickPodcastCard(id)).getEpisodeData(id);
    }
}
