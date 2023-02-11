import menuDOM from './templates/menuDom';

class Menu {
    private menuLayout: string;
    constructor() {
      this.menuLayout = menuDOM;
    }
    public drawMenu(): void {
        const menuSection = (document.querySelector('.menu') || document.body) as HTMLElement;
        menuSection.innerHTML += this.menuLayout;
        this.addListeners();
    }
    private addListeners(): void {
        const menuInner = document.querySelector('.menu__inner') as HTMLElement;
        const menuSearch = document.querySelector('.menu__search') as HTMLInputElement;
        let delay = setTimeout(()=>{
          // TO DO
          // redraw cards
          console.log("Redraw cards");
        }, 500);
        menuSearch.addEventListener('keyup', (event) => {
          if (event.code === 'Enter') {
            // TO DO
            // redraw cards
            console.log("Redraw cards");
          }
          else {
            clearTimeout(delay);
            delay = setTimeout(()=>{
              // TO DO
              // redraw cards
              console.log("Redraw cards");
            }, 500);
          }
        });
        menuInner.addEventListener('click', (event) => {
            if ((event.target as HTMLElement).innerText === 'Your Library') {
              // TO DO
              // go to library
              console.log("Go to Library");
            } else if ((event.target as HTMLElement).innerText === 'Home') {
              // TO DO
              // go to home
              console.log("Go to Home");
            }
        });
    }
}

export default Menu;
