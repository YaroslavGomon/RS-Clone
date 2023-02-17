import { querySelectNonNull } from './utils';

export class LibraryPage {
    public draw(): void {
        const mainContainer: Element = querySelectNonNull<Element>('.main__container');

        const header: Element = document.createElement('h2');
        header.classList.add('h2');
        header.textContent = 'Playlists';

        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('playlists');

        mainContainer.appendChild(this.createLibraryNavigation());
        mainContainer.appendChild(header);
        wrapper.appendChild(this.createBlockEpisodes());
        wrapper.appendChild(this.createPlaylist());
        wrapper.appendChild(this.createPlaylist());

        mainContainer.appendChild(wrapper);
    }

    private createLibraryNavigation(): Element {
        const nav = document.createElement('nav');
        nav.classList.add('library__navigation');
        const list = document.createElement('ul');
        list.classList.add('navigation__list');

        list.appendChild(this.createNavItem('playlists'));
        list.appendChild(this.createNavItem('podcasts'));
        nav.appendChild(list);

        return nav;
    }

    private createNavItem(name: string): Element {
        const item: Element = document.createElement('li');
        item.classList.add('nav__item');
        item.classList.add(`item_${name}`);
        //will be change for active link
        if (name === 'playlists') {
            item.classList.add('active');
        }
        const link: HTMLAnchorElement = document.createElement('a');
        link.classList.add('link');
        link.href = `/#${name}List`;
        link.textContent = `${name}`;
        item.appendChild(link);

        return item;
    }

    private createBlockEpisodes(): Element {
        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('save-episodes');
        const header: Element = document.createElement('h2');
        header.textContent = 'Your Episode';
        const amount: Element = document.createElement('div');
        amount.textContent = `2 episodes`;
        wrapper.appendChild(header);
        wrapper.appendChild(amount);

        //TO DO
        //will be change
        wrapper.addEventListener('click', () => console.log('Go To Episodes Page'));

        return wrapper;
    }

    private createPlaylist(): Element {
        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('playlist');

        const image: HTMLImageElement = document.createElement('img');
        image.src = './assets/img/tedtalksdaily.png';
        image.alt = 'Playlist Image';
        image.classList.add('playlist__image');

        const wrapperName: Element = document.createElement('div');
        wrapperName.classList.add('playlist__name__wrapper');

        const playlistName: Element = document.createElement('h3');
        playlistName.textContent = 'Playlist';
        const owner: Element = document.createElement('div');
        owner.textContent = 'By UserName';

        //TO DO
        //will be change
        wrapper.addEventListener('click', () => console.log('Go To Playlist Page'));

        wrapperName.appendChild(playlistName);
        wrapperName.appendChild(owner);
        wrapper.appendChild(image);
        wrapper.appendChild(wrapperName);

        return wrapper;
    }
}
