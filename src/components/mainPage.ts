import mainPageDOM from './templates/mainPageDom';

export default class MainPage {

    private addStructure() {
        const body = document.querySelector('body');
        if (body) {
            body.innerHTML = mainPageDOM;
        }
    }

    public draw() {
        this.addStructure();
    }
}
