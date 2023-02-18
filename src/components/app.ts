import { Header } from './header';
import MainPage from './mainPage';
import { Player } from './player';
import { PlayerButtons } from './types/type';
import { requiresNonNull } from './utils';
import PodcastPage from './podcastPage';
import { Router } from './router';
import { EpisodeComponent } from './episode';
import Cards from './cards';
import Menu from './menu';
import Footer from './footer';
import { LibraryPage } from './libraryPage';
import { LibraryEpisodes } from './libraryEpisodes';

export class App {
    private readonly player: Player;
    private readonly router: Router;
    private readonly mainPage: MainPage;
    private readonly menu: Menu;
    private readonly footer: Footer;
    private readonly cards: Cards;

    constructor() {
        this.player = new Player(
            (event) => this.onRangeInput(event),
            (event) => this.onClickPlayerButton(event)
        );

        this.router = new Router();
        this.mainPage = new MainPage();
        this.menu = new Menu((inputValue: string) => this.onChangeSearchValue(inputValue), (path: string) => this.onClickLink(path));
        this.footer = new Footer();
        this.cards = new Cards((id: number) => this.onClickPodcastCard(id));
    }

    public start(): void {
        this.mainPage.draw();
        new Header().draw();
        this.player.draw();
        this.menu.drawMenu();
        this.footer.draw();

        this.createBasicRoutes();
        this.router.handleLocation();

        window.addEventListener('popstate', () => this.router.handleLocation());
    }

    private createBasicRoutes() {
        this.router.addRoute('/', () => this.onLoadMainPage());
        this.router.addRoute('podcast', (id: number) => this.onLoadPodcastPage(id));
        this.router.addRoute('episode', (id: number) => this.onLoadEpisodePage(id));
        this.router.addRoute('library', () => this.onLoadLibraryPage());
        this.router.addRoute('saved', () => this.onLoadLibraryEpisodes());
    }

    private onRangeInput(event: Event): void {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        const value: number = Number(target.value);
        const duration: number = Number(target.max);
        const percent: number = (value / duration) * 100;
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
        this.cards.draw();
    }

    private onChangeSearchValue(searchString: string): void {
        this.cards.draw(searchString);
    }

    private onClickPodcastCard(podcastId: number): void {
        this.router.updateUrl(`/#podcast/${podcastId}`);
    }

    private onLoadPodcastPage(podcastId: number): void {
        new PodcastPage(podcastId, (id: number) => this.onClickEpisodeCard(id)).drawPodcastPage('spotify');
    }

    private onClickEpisodeCard(episodeId: number): void {
        this.router.updateUrl(`/#episode/${episodeId}`);
    }

    private onLoadEpisodePage(episodeId: number): void {
        new EpisodeComponent((id: number) => this.onClickPodcastCard(id)).fetchEpisode(episodeId);
    }

    private onClickLink(path: string): void {
        console.log('here');
        console.log(path);

        this.router.updateUrl(`/#${path}`);
    }

    private onLoadLibraryPage(): void {
        new LibraryPage((path: string) => this.onClickLink(path)).draw();
    }

    private onLoadLibraryEpisodes(): void {
        new LibraryEpisodes((episodeId: number) => this.onClickEpisodeCard(episodeId)).draw();
    }
}
