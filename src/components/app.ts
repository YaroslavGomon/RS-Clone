import { Header } from './header';
import MainPage from './mainPage';
import { Player } from './player';
import { PlayerButtons } from './types/type';
import { changeRangeBackground, requiresNonNull } from './utils';
import PodcastPage from './podcastPage';
import { Router } from './router';
import { EpisodePage } from './episodePage';
import Cards from './cards';
import Menu from './menu';
import Footer from './footer';
import { LibraryPage } from './libraryPage';
import { LibraryEpisodes } from './libraryEpisodes';
import AccountBtns from './accountBtns';
import Popups from './popups';

export class App {
    private readonly player: Player;
    private readonly router: Router;
    private readonly mainPage: MainPage;
    private readonly menu: Menu;
    private readonly accountBtns: AccountBtns;
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
        this.accountBtns = new AccountBtns((btnText: string) => this.onCLickAccountsBtn(btnText));
        this.footer = new Footer();
        this.cards = new Cards((id: number) => this.onClickPodcastCard(id), (id: number, event: Event) => this.onClickPlayButton(id, event));
    }

    public start(): void {
        this.mainPage.draw();
        new Header().draw();
        this.player.draw();
        this.menu.drawMenu();
        this.accountBtns.draw();
        this.footer.draw();

        this.createBasicRoutes();
        this.router.handleLocation();

        window.addEventListener('popstate', () => this.router.handleLocation());
    }

    private createBasicRoutes() {
        this.router.addRoute('/', () => this.onLoadMainPage());
        this.router.addRoute('podcast', (podcastId: number) => this.onLoadPodcastPage(podcastId));
        this.router.addRoute('episode', (episodeId: number) => this.onLoadEpisodePage(episodeId));
        this.router.addRoute('library', this.onLoadLibraryPage.bind(this));
        this.router.addRoute('saved', this.onLoadLibraryEpisodes.bind(this));
    }

    private onRangeInput(event: Event): void {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        changeRangeBackground(target);
    }

    public onClickPlayerButton(event: Event): void {
        const target: Element = requiresNonNull(event.target) as Element;
        switch (target.id) {
            case PlayerButtons.Play:
                if (!this.player.isPlay) {
                    this.player.playAudio();
                    break;
                }
                this.player.pauseAudio();
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
                throw new Error(`Unknown target ID: ${target.id}`);
        }
    }

    private onLoadMainPage(): void {
        this.cards.draw();
    }

    private onChangeSearchValue(searchString: string): void {
        this.cards.draw(searchString);
    }

    private onCLickAccountsBtn(btnText: string): void {
      new Popups(btnText).draw();
    }

    private onClickPodcastCard(podcastId: number): void {
        this.router.updateUrl(`/#podcast/${podcastId}`);
    }

    private onLoadPodcastPage(podcastId: number): void {
        new PodcastPage(
            podcastId,
            (episodeId: number) => this.onClickEpisodeCard(episodeId),
            (episodeId: number, event: Event) => this.onClickPlayButton(episodeId, event)
        ).drawPodcastPage('spotify');
    }

    private onClickEpisodeCard(episodeId: number): void {
        this.router.updateUrl(`/#episode/${episodeId}`);
    }

    private onLoadEpisodePage(episodeId: number): void {
        new EpisodePage(
            (id: number) => this.onClickPodcastCard(id),
            (id: number, event: Event) => this.onClickPlayButton(id, event)
        ).fetchEpisode(episodeId);
    }

    public onClickPlayButton(episodeId: number, event: Event): void {
        const playButtons: NodeListOf<Element> = requiresNonNull(document.querySelectorAll('.button-play'));
        const target: Element = event.target as Element;
        playButtons.forEach(button => {
            if (button !== target && button.classList.value.includes('pause')) {
                button.classList.toggle('pause');
            }
        });
        this.player.updatePlayerSource(episodeId, event);
    }

    private onClickLink(path: string): void {
        this.router.updateUrl(`/#${path}`);
    }

    private onLoadLibraryPage(): void {
        new LibraryPage((path: string) => this.onClickLink(path)).draw();
    }

    private onLoadLibraryEpisodes(): void {
        new LibraryEpisodes((episodeId: number) => this.onClickEpisodeCard(episodeId)).draw();
    }
}
