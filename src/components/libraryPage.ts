import { Library } from './api/libraryController';
import { OnClickLink, UserLibrary } from './types/type';
import { querySelectNonNull } from './utils';

export class LibraryPage {
    private readonly onClickLink: OnClickLink;
    private library: Library;

    constructor(onClickLink: OnClickLink) {
        this.onClickLink = onClickLink;
        this.library = new Library('ivanov@gmail.com');
    }

    public draw(): void {
        const mainContainer: Element = querySelectNonNull<Element>('.main__container');
        mainContainer.innerHTML = '';
        const header: Element = document.createElement('h2');
        header.classList.add('h2');
        header.textContent = 'Playlists';

        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('playlists');

        mainContainer.appendChild(this.createLibraryNavigation());
        mainContainer.appendChild(header);
        wrapper.appendChild(this.createBlockEpisodes());

        mainContainer.appendChild(wrapper);
        this.updateLibrary();
    }

    private createLibraryNavigation(): Element {
        const nav = document.createElement('nav');
        nav.classList.add('library__navigation');
        const list = document.createElement('ul');
        list.classList.add('navigation__list');

        list.appendChild(this.createNavItem('playlists'));
        list.appendChild(this.createNavItem('subscriptions'));
        nav.appendChild(list);

        return nav;
    }

    private createNavItem(name: string): Element {
        const item: Element = document.createElement('li');
        item.classList.add('nav__item');
        item.classList.add(`item_${name}`);
        //TO DO
        //will be change for active link
        if (name === 'playlists') {
            item.classList.add('active');
        }
        const link: HTMLAnchorElement = document.createElement('a');
        link.classList.add('link');
        name === 'episodes' ? (link.href = `/#saved`) : (link.href = `/#${name}List`);
        link.textContent = `${name}`;
        item.appendChild(link);

        return item;
    }

    private createBlockEpisodes(): Element {
        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('save-episodes');
        const header: Element = document.createElement('h2');
        header.textContent = 'Your liked episodes';
        const amount: Element = document.createElement('div');
        amount.classList.add('amount-episodes');
        amount.textContent = `2 episodes`;
        wrapper.appendChild(header);
        wrapper.appendChild(amount);

        wrapper.addEventListener('click', () => this.onClickLink('saved'));

        return wrapper;
    }

    private createPlaylist(playlist: string): Element {
        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('playlist');

        const image: HTMLImageElement = document.createElement('img');
        image.src = './assets/img/fav-icon.png';
        image.alt = 'Playlist Image';
        image.classList.add('playlist__image');

        const wrapperName: Element = document.createElement('div');
        wrapperName.classList.add('playlist__name__wrapper');

        const playlistName: Element = document.createElement('h3');
        playlistName.textContent = `${playlist}`;
        const owner: Element = document.createElement('div');
        owner.textContent = 'User playlist';

        //TO DO
        //will be change
        wrapper.addEventListener('click', () => console.log('Go To Playlist Page'));

        wrapperName.appendChild(playlistName);
        wrapperName.appendChild(owner);
        wrapper.appendChild(image);
        wrapper.appendChild(wrapperName);

        return wrapper;
    }

    private updateLibrary() {
        const amountEpisodes = document.querySelector('.amount-episodes') as HTMLElement;
        const playlistWrapper = document.querySelector('.playlists') as HTMLElement;
        console.log("df");
        this.library
            .userLibrary()
            .then((res) => {
                const result = res as UserLibrary;
                const usersPlaylistsKeysArray = Object.keys(res);
                for (let i = 0; i < usersPlaylistsKeysArray.length; i += 1){
                    if (usersPlaylistsKeysArray[i] != "_id" && usersPlaylistsKeysArray[i] != "email" && usersPlaylistsKeysArray[i] != "subscribedPodcasts" && usersPlaylistsKeysArray[i] != "likedPodcasts"){
                        playlistWrapper.appendChild(this.createPlaylist(`${usersPlaylistsKeysArray[i]}`));
                    }
                }
                amountEpisodes.innerText = result.likedPodcasts.length.toString() + ' episodes';
                console.log(res);
            })
            .catch((err) => {
                const mainContainer = document.querySelector('.main__container') as HTMLElement;
                mainContainer.innerHTML = `${err}`;
            });
    }
}
