import { Header } from './header';
import MainPage from './mainPage';
import { Player } from './player';
import { PlayerButtons, StorageEpisode } from './types/type';
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
import SubscriptionPage from './subscriptionsPage';
import { PodcastStorage } from './storage';


export class App {
    private readonly player: Player;
    private readonly router: Router;
    private readonly mainPage: MainPage;
    private readonly menu: Menu;
    private readonly accountBtns: AccountBtns;
    private readonly footer: Footer;
    private readonly cards: Cards;
    private readonly subscriptionPage: SubscriptionPage;

    constructor() {
        this.player = new Player(
            (event) => this.onRangeInput(event),
            (event) => this.onClickPlayerButton(event),
            (id: string, isPlay: boolean) => this.changeStatusPlayButton(id, isPlay)
        );
        this.subscriptionPage = new SubscriptionPage((id: number) => this.onClickPodcastCard(id), (id: number, event: Event) => this.onClickPlayButton(id, event));
        this.router = new Router();
        this.mainPage = new MainPage();

        this.menu = new Menu((inputValue: string) => this.onChangeSearchValue(inputValue), (path: string) => this.onClickLink(path));
        this.accountBtns = new AccountBtns((btnText: string) => this.onCLickAccountsBtn(btnText));
        this.footer = new Footer();
        this.cards = new Cards(
            (id: number) => this.onClickPodcastCard(id),
            (id: number, event: Event) => this.onClickPlayButton(id, event)
        );
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
        this.router.addRoute('subscriptionsList', () => this.onLoadSubscriptionsPage());
        this.router.addRoute('podcast', (podcastId: number | string) => this.onLoadPodcastPage(podcastId));
        this.router.addRoute('episode', (episodeId: number | string) => this.onLoadEpisodePage(episodeId));
        this.router.addRoute('library', this.onLoadLibraryPage.bind(this));
        this.router.addRoute('saved', this.onLoadLibraryEpisodes.bind(this));
        this.router.addRoute('savedPodcast', (playlistName: string | number) => this.onLoadSavedPlaylist(playlistName));
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

    private onLoadSubscriptionsPage():void {
        this.subscriptionPage.draw();
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

    private onLoadPodcastPage(podcastId: number | string): void {
        const podcastID = podcastId as number;
        new PodcastPage(
            podcastID,
            Number(this.player.audio.getAttribute('data-id')),
            this.player.isPlay,
            (episodeId: number) => this.onClickEpisodeCard(episodeId),
            (episodeId: number, event: Event) => this.onClickPlayButton(episodeId, event)
        ).drawPodcastPage('spotify');
    }

    private onClickEpisodeCard(episodeId: number): void {
        this.router.updateUrl(`/#episode/${episodeId}`);
    }

    private onLoadEpisodePage(episodeId: number | string): void {
        const episodeID = episodeId as number;
        new EpisodePage(
            Number(this.player.audio.getAttribute('data-id')),
            this.player.isPlay,
            (id: number) => this.onClickPodcastCard(id),
            (id: number, event: Event) => this.onClickPlayButton(id, event)
        ).fetchEpisode(episodeID);
    }

    public onClickPlayButton(episodeId: number, event: Event): void {
        const target: Element = event.target as Element;
        if (!target.classList.value.includes('card__play')) {
            const playButtons: NodeListOf<Element> = requiresNonNull(document.querySelectorAll('.button-play'));

            playButtons.forEach((button) => {
                if (button !== target && button.classList.value.includes('pause')) {
                    button.classList.toggle('pause');
                }
            });
            target.classList.toggle('pause');
        }

        const storage: PodcastStorage = new PodcastStorage();
        const arrayStart: StorageEpisode[] = storage.getEpisodeOrder();
        const arrayPrevs: StorageEpisode[] = [];
        const arrayNexts: StorageEpisode[] = [];
        const currentIndex = arrayStart.findIndex((item) => item.id === episodeId);
        arrayStart.forEach((item, index) => {
            index <= currentIndex ? arrayNexts.push(item) : arrayPrevs.push(item);
        });
        arrayNexts.pop();
        const resultArray: StorageEpisode[] = [];
        resultArray.push(arrayStart[currentIndex]);
        resultArray.push(...arrayPrevs);
        resultArray.push(...arrayNexts);
        storage.setEpisodeOrder(resultArray);

        this.player.updatePlayerSource(episodeId, event);
    }

    private onClickLink(path: string): void {
        this.router.updateUrl(`/#${path}`);
    }

    private onClickSavedPlaylist(playlist: string): void {
        this.router.updateUrl(`/#savedPodcast/${playlist}`);
    }

    private onLoadLibraryPage(): void {
        new LibraryPage(
            (path: string) => this.onClickLink(path),
            (playlist: string) => this.onClickSavedPlaylist(playlist)
        ).draw();
    }

    private onLoadLibraryEpisodes(): void {
        new LibraryEpisodes((episodeId: number) => this.onClickEpisodeCard(episodeId), (episodeId: number, event: Event) => this.onClickPlayButton(episodeId, event)).draw();
    }

    private onLoadSavedPlaylist(playlistName: string | number): void {
        const playlistNAME = (playlistName as string).replace(/(%20)/g, ' ');
        new LibraryEpisodes((episodeId: number) => this.onClickEpisodeCard(episodeId), (episodeId: number, event: Event) => this.onClickPlayButton(episodeId, event), playlistNAME).draw();

    }

    private changeStatusPlayButton(id: string, isPlay: boolean): void {
        const playButtons: NodeListOf<Element> = requiresNonNull(document.querySelectorAll('.button-play'));
        for (const button of playButtons) {
            if (button.classList.value.includes('pause')) {
                button.classList.toggle('pause');
                break;
            }
        }
        const playButton: Element = requiresNonNull(document.getElementById(id));
        isPlay ? playButton.classList.add('pause') : playButton.classList.remove('pause');
    }
}
