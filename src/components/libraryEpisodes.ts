import Controller from './controller';
import { EpisodesListItem } from './episodesListItem';
import { UserLibrary, onClickEpisodeCard, OnClickPlayButton, StorageEpisode } from './types/type';
import { querySelectNonNull, requiresNonNull } from './utils';
import { Library } from './api/libraryController';
import { EMAIL } from './constants';
import { PodcastStorage } from './storage';

export class LibraryEpisodes {
    private readonly controller: Controller;
    private readonly onClickEpisodeCard: onClickEpisodeCard;
    private readonly onClickPlayButton: OnClickPlayButton;
    private readonly library: Library;
    private readonly playlistName: string;
    public storage = new PodcastStorage();

    constructor(
        onClickEpisodeCard: onClickEpisodeCard,
        onClickPlayButton: OnClickPlayButton,
        playlistName = 'likedPodcasts'
    ) {
        this.controller = new Controller();
        this.onClickEpisodeCard = onClickEpisodeCard;
        this.library = new Library(EMAIL);
        this.playlistName = playlistName;
        this.onClickPlayButton = onClickPlayButton;
    }

    public async draw() {
        const mainContainer: Element = querySelectNonNull<Element>('.main__container');
        mainContainer.innerHTML = '';

        mainContainer.appendChild(this.createHeader());
        mainContainer.appendChild(this.createList());
    }

    private createHeader(): Element {
        const header: Element = document.createElement('div');
        header.classList.add('library__episodes__header');

        const imageWrapper: Element = document.createElement('div');
        imageWrapper.classList.add('library__episodes__wrapper');

        const image: Element = document.createElement('div');
        image.classList.add('library__episodes__image');
        imageWrapper.appendChild(image);

        const info: Element = document.createElement('div');
        info.classList.add('episodeContent__header__info');
        const title: Element = document.createElement('h1');
        title.classList.add('episodeContent__title');
        title.classList.add('h1');
        title.textContent = this.playlistName === 'likedPodcasts' ? 'Your Liked Episodes' : this.playlistName;

        const creator: Element = document.createElement('div');
        creator.classList.add('creator');
        creator.textContent = `UserName • 2 episodes`;

        header.appendChild(imageWrapper);
        info.appendChild(title);
        info.appendChild(creator);
        header.appendChild(info);

        return header;
    }

    private createList(): Element {
        const wrapper: Element = document.createElement('div');
        const creator = document.querySelector('.creator') as HTMLElement;
        this.library.userLibrary().then((res) => {
            const userLibraryObj = res as UserLibrary;
            console.log(userLibraryObj.email);
            const array: Array<{ id: number }> = userLibraryObj[this.playlistName];
            creator.innerText = array.length === 1 ? `${userLibraryObj.email} • 1 episode` : `${userLibraryObj.email} • ${array.length} episodes`;
            const episodeOrder: StorageEpisode[] = [];
            array.forEach((item) => {
                this.controller.fetchEpisodeById(item.id).then((data) => {
                    episodeOrder.push({ id: data.id, currentDuration: 0 });
                    this.storage.setEpisodeOrder(episodeOrder);
                    return new EpisodesListItem(
                        wrapper,
                        (episodeId: number) => this.onClickEpisodeCard(episodeId),
                        (episodeId: number, event: Event) => this.onClickPlayButton(episodeId, event)
                    ).createEpisode(data);
                });
            });
        });
        return wrapper;
    }
}
