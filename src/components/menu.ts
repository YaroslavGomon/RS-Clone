import menuDOM from './templates/menuDom';
import { OnChangeSearchValue } from './types/type';

class Menu {
    private menuLayout: string;
    private onChangeSearchValue: OnChangeSearchValue;

    constructor(onChangeSearchValue: OnChangeSearchValue) {
        this.menuLayout = menuDOM;
        this.onChangeSearchValue = onChangeSearchValue;
    }

    public drawMenu(): void {
        const menuSection = (document.querySelector('.menu') || document.body) as HTMLElement;
        menuSection.innerHTML += this.menuLayout;
        this.addListeners();
    }

    private addListeners(): void {
        const menuInner = document.querySelector('.menu__inner') as HTMLElement;
        const menuSearch = document.querySelector('.menu__search') as HTMLInputElement;
        let delay = setTimeout(() => {
            // this.onChangeSearchValue(menuSearch.value);
            // menuSearch.value = '';
            console.log('Redraw cards 1');
        }, 500);
        menuSearch.addEventListener('keyup', (event) => {
            if (event.code === 'Enter') {
                this.onChangeSearchValue(menuSearch.value);
                menuSearch.value = '';
                console.log('Redraw cards 2');
            } else {
                clearTimeout(delay);
                delay = setTimeout(() => {
                    this.onChangeSearchValue(menuSearch.value);
                    menuSearch.value = '';
                    console.log('Redraw cards 3');
                }, 500);
            }
        });
        menuInner.addEventListener('click', (event) => {
            if ((event.target as HTMLElement).innerText === 'Your Library') {
                // TO DO
                // go to library
                console.log('Go to Library');
            } else if ((event.target as HTMLElement).innerText === 'Home') {
                // TO DO
                // go to home
                console.log('Go to Home');
            }
        });
    }
}

export default Menu;
