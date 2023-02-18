import Controller from './controller';
import { EpisodesListItem } from './episodesListItem';
import { querySelectNonNull } from './utils';

export class LibraryEpisodes {
    private readonly controller: Controller;

    constructor() {
        this.controller = new Controller();
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
        title.textContent = 'Your Episode';

        const creator: Element = document.createElement('div');
        creator.classList.add('creator');
        creator.textContent = `Mikhail • 2 episodes`;

        header.appendChild(imageWrapper);
        info.appendChild(title);
        info.appendChild(creator);
        header.appendChild(info);

        return header;
    }

    private createList(): Element {
        const wrapper: Element = document.createElement('div');

        const array: number[] = [13519920619, 13519920619, 1066003]; //will be delete
        array.forEach(item => {
            this.controller.fetchEpisodeById(item).then(data => new EpisodesListItem(wrapper).createEpisode(data));
        });

        return wrapper;
    }
}
