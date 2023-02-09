import footerDOM from './templates/footerDom';

export default class Footer {
    draw() {
        const footer = document.querySelector('.footer');
        if (footer) {
            footer.innerHTML = footerDOM;
        }
    }
}
