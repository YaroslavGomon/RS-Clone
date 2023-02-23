import Controller from './controller';
import { EpisodesListItem } from './episodesListItem';
import { UserLibrary, onClickEpisodeCard } from './types/type';
import { querySelectNonNull } from './utils';
import { Library } from './api/libraryController';

export class LibraryEpisodes {
    private readonly controller: Controller;
    private readonly onClickEpisodeCard: onClickEpisodeCard;
    private readonly library: Library;

    constructor(onClickEpisodeCard: onClickEpisodeCard) {
        this.controller = new Controller();
        this.onClickEpisodeCard = onClickEpisodeCard;
        this.library = new Library('ivanov@gmail.com');
    }

    public draw(): void {
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

        const info : Element = document.createElement('div');
        info.classList.add('episodeContent__header__info');
        const title: Element = document.createElement('h1');
        title.classList.add('episodeContent__title');
        title.classList.add('h1');
        title.textContent = 'Your Liked Episodes';

        const creator: Element = document.createElement('div');
        creator.classList.add('creator');
        creator.textContent = `Mikhail • 2 episodes`;

        header.appendChild(imageWrapper);
        info.appendChild(title);
        // info.appendChild(creator);
        header.appendChild(info);

        return header;
    }

    private createList(): Element {
        const wrapper: Element = document.createElement('div');
        this.library.userLibrary()
        .then(res=> {
            const userLibraryObj = res as UserLibrary;
            const array: Array<{id:number}> = userLibraryObj.likedPodcasts;
            array.forEach(item => {
                this.controller.fetchEpisodeById(item.id).then(data => new EpisodesListItem(wrapper, (episodeId: number) => this.onClickEpisodeCard(episodeId)).createEpisode(data));
            });
        });
        return wrapper;
    }
}
