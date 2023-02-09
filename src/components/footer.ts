import FOOTER from './templates/footer';

export default class Footer {
    draw() {
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.innerHTML = FOOTER;
        }
    }
}
