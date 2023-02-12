import Footer from './footer';
import Menu from './menu';
import mainPageDOM from './templates/mainPageDom';

export default class MainPage {
    menu: Menu;
    footer: Footer;

    constructor() {
        this.menu = new Menu();
        this.footer = new Footer();
    }

    addStructure() {
        const body = document.querySelector('body');
        if (body) {
            body.innerHTML = mainPageDOM;
        }
    }

    draw() {
        this.addStructure();
        this.menu.drawMenu();
        this.footer.draw();
    }
}
