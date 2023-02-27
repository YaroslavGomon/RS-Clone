import Controller from './controller';
import { EpisodesListItem } from './episodesListItem';
import { UserLibrary, onClickEpisodeCard, OnClickPlayButton } from './types/type';
import { querySelectNonNull, requiresNonNull } from './utils';
import { Library } from './api/libraryController';
import { EMAIL } from './constants';

export class LibraryEpisodes {
    private readonly controller: Controller;
    private readonly onClickEpisodeCard: onClickEpisodeCard;
    private readonly onClickPlayButton: OnClickPlayButton;
    private readonly library: Library;
    private readonly playlistName: string;

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
        setTimeout(()=>this.addListeners(), 1000);
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
        this.library
            .userLibrary()
            .then((res) => {
                const userLibraryObj = res as UserLibrary;
                const array: Array<{ id: number }> = userLibraryObj[this.playlistName];
                creator.innerText = array.length === 1 ? `UserName • 1 episode` : `UserName • ${array.length} episodes`;
                array.forEach((item) => {
                    this.controller
                        .fetchEpisodeById(item.id)
                        .then((data) => {
                           return new EpisodesListItem(wrapper, (episodeId: number) =>
                                this.onClickEpisodeCard(episodeId)
                            ).createEpisode(data);}
                        );
                        // .then(() => {
                        //     if (index === array.length - 1){
                        //         this.addListeners();
                        //     }
                        // });
                });
            });
        return wrapper;
    }
    private addListeners() {
        const buttonsPlay: NodeListOf<Element> = document.querySelectorAll('.button-play');
        console.log(buttonsPlay);
        buttonsPlay.forEach((button) =>
            button.addEventListener('click', (event: Event) => {
                event.stopPropagation();
                this.onClickPlayButton(
                    Number(requiresNonNull<Element>(button.closest('.episode')).getAttribute('data-id')),
                    event
                );
            })
        );
    }
}
