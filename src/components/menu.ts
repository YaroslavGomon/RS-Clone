import menuDOM from './templates/menuDom';
import { OnChangeSearchValue, OnClickLink } from './types/type';

class Menu {
    private menuLayout: string;
    private onChangeSearchValue: OnChangeSearchValue;
    private readonly onClickLink: OnClickLink;

    constructor(onChangeSearchValue: OnChangeSearchValue, onClickLink: OnClickLink) {
        this.menuLayout = menuDOM;
        this.onChangeSearchValue = onChangeSearchValue;
        this.onClickLink = onClickLink;
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
        }, 1000);

        menuSearch.addEventListener('keyup', (event) => {
            if (event.code === 'Enter' || event.code === 'NumpadEnter') {
                this.onChangeSearchValue(menuSearch.value);
                clearTimeout(delay);
            }
        });

        menuSearch.addEventListener('input', () => {
            clearTimeout(delay);
            delay = setTimeout(() => {
                this.onChangeSearchValue(menuSearch.value);
            }, 1000);
        });

        menuInner.addEventListener('click', (event) => {
            if ((event.target as HTMLElement).innerText === 'Your Library') {
                this.onClickLink('library');
            } else if ((event.target as HTMLElement).innerText === 'Home') {
                // TO DO
                // go to home
                console.log('Go to Home');
            }
        });
    }
}

export default Menu;
