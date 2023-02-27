import { Library } from './api/libraryController';
import { OnClickLink, UserLibrary, onClickSavedPlaylist } from './types/type';
import { querySelectNonNull } from './utils';
import { EMAIL } from './constants';

export class LibraryPage {
    private readonly onClickLink: OnClickLink;
    private library: Library;
    private readonly onClickSavedPlaylist: onClickSavedPlaylist;

    constructor(onClickLink: OnClickLink, onClickSavedPlaylist: onClickSavedPlaylist) {
        this.onClickLink = onClickLink;
        this.library = new Library(EMAIL);
        this.onClickSavedPlaylist = onClickSavedPlaylist;
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

    private createAddButton(): Element {
        const library = this.library;
        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('playlist');
        const image: HTMLImageElement = document.createElement('img');
        image.src =
            'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1024px-OOjs_UI_icon_add.svg.png';
        image.alt = 'ADD PLAYLIST';
        image.classList.add('playlist__image');

        const wrapperName: Element = document.createElement('div');
        wrapperName.classList.add('playlist__name__wrapper');
        const owner: HTMLElement = document.createElement('div');
        owner.textContent = 'User';
        const playlistName: Element = document.createElement('h3');
        playlistName.textContent = `Add playlist`;

        wrapperName.appendChild(playlistName);
        wrapperName.appendChild(owner);
        wrapper.appendChild(image);
        wrapper.appendChild(wrapperName);
        image.addEventListener('click', addPlaylist);

        function addPlaylist(event: Event) {
            event.stopPropagation();
            const inputElem: HTMLInputElement = document.createElement('input');
            inputElem.placeholder = 'playlist';
            inputElem.classList.add('input-rename');
            playlistName.innerHTML = '';
            playlistName.append(inputElem);
            inputElem.addEventListener('keyup', (event) => {
                event.stopPropagation();
                if (event.key === 'Enter') {
                    playlistName.innerHTML = '';
                    if (inputElem.value != '' && Number.isNaN(Number(inputElem.value)) === true) {
                        playlistName.innerHTML = inputElem.value;
                        library.addNewPlaylist(inputElem.value).then(() => {
                            setTimeout(()=>{
                                window.location.href = '/#library';
                            }, 1000);
                        });
                    } else {
                        alert('Error: wrong name');
                    }
                }
            });
        }
        return wrapper;
    }

    private createPlaylist(playlist: string): Element {
        const library = this.library;
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
        const owner: HTMLElement = document.createElement('div');
        owner.classList.add('owner');
        owner.textContent = 'User';
        const deletePlaylist: Element = document.createElement('div');
        deletePlaylist.classList.add('delete');
        const renamePlaylist: Element = document.createElement('div');
        renamePlaylist.classList.add('rename');
        owner.append(deletePlaylist, renamePlaylist);

        deletePlaylist.addEventListener('click', (event) => {
            event.stopPropagation();
            library.removePlaylist(playlist).then(() => {
                setTimeout(()=>{
                    window.location.href = '/#library';
                }, 1000);
            });
        });
        renamePlaylist.addEventListener('click', rename);
       function rename(event: Event) {
            event.stopPropagation();
            const inputElem: HTMLInputElement = document.createElement('input');
            inputElem.placeholder = playlist;
            inputElem.classList.add('input-rename');
            playlistName.innerHTML = '';
            playlistName.append(inputElem);
            inputElem.addEventListener('keyup', async (event) => {
                if (event.key === 'Enter') {
                    playlistName.innerHTML = '';
                    if (inputElem.value != '') {
                        playlistName.innerHTML = inputElem.value;
                        await library.renamePlaylist(playlist, inputElem.value);
                        setTimeout(()=>{
                            window.location.href = '/#library';
                        }, 1000);
                    } else {
                        playlistName.innerHTML = playlist;
                    }
                }
            });
        }
        //TO DO
        //will be change
        wrapper.addEventListener('click', (event) => {
            const target = event.target as HTMLElement;
            if (target.tagName === 'INPUT') {
                event.stopPropagation();
            } else {
                this.onClickSavedPlaylist(playlist);
            }
        });

        wrapperName.appendChild(playlistName);
        wrapperName.appendChild(owner);
        wrapper.appendChild(image);
        wrapper.appendChild(wrapperName);

        return wrapper;
    }

    private updateLibrary() {
        const amountEpisodes = document.querySelector('.amount-episodes') as HTMLElement;
        const playlistWrapper = document.querySelector('.playlists') as HTMLElement;
        this.library
            .userLibrary()
            .then((res) => {
                const result = res as UserLibrary;
                const usersPlaylistsKeysArray = Object.keys(res);
                for (let i = 0; i < usersPlaylistsKeysArray.length; i += 1) {
                    if (
                        usersPlaylistsKeysArray[i] != '_id' &&
                        usersPlaylistsKeysArray[i] != 'email' &&
                        usersPlaylistsKeysArray[i] != 'subscribedPodcasts' &&
                        usersPlaylistsKeysArray[i] != 'likedPodcasts'
                    ) {
                        playlistWrapper.appendChild(this.createPlaylist(`${usersPlaylistsKeysArray[i]}`));
                    }
                }
                playlistWrapper.appendChild(this.createAddButton());
                amountEpisodes.innerText = result.likedPodcasts.length.toString() + ' episodes';
            })
            .catch((err) => {
                const mainContainer = document.querySelector('.main__container') as HTMLElement;
                mainContainer.innerHTML = `${err}`;
            });
    }
}
