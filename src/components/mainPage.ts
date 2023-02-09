import Cards from './cards';
import Controller from './controller';
import Footer from './footer';
import Menu from './menu';
import mainPageDOM from './templates/mainPageDom';

export default class MainPage {
    controller: Controller;
    menu: Menu;
    cards: Cards;
    footer: Footer;

    constructor() {
        this.controller = new Controller();
        this.menu = new Menu();
        this.cards = new Cards();
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
        this.cards.draw();
        this.footer.draw();
    }
}
