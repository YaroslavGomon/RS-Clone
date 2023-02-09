import Controller from './controller';
import Footer from './footer';
import mainPage from './templates/mainPage';

export default class MainPage {
    controller: Controller;
    footer: Footer;

    constructor() {
        this.controller = new Controller();
        this.footer = new Footer();
    }

    addStructure() {
        const body = document.querySelector('body');
        if (body) {
            body.innerHTML = mainPage;
        }
    }

    draw() {
        this.addStructure();
        this.footer.draw();
    }
}
