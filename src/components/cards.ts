import Controller from './controller';
import { podcastCard } from './types/type';

export default class Cards {
    controller: Controller;

    constructor() {
        this.controller = new Controller();
    }

    addStructure() {
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = `
                <h3 class="h3 podcast__cards--title">Recent Podcasts</h3>
                <ul class="podcast__cards"></ul>
                `;
        }
    }

    drawCard(data: podcastCard) {
        const podcastCards = document.querySelector('.podcast__cards');
        if (podcastCards) {
            podcastCards.innerHTML += `
                <li class="card" data-id=${data.id.toString()}>
                <div class="card__image-container" data-id=${data.id.toString()}>
                <img data-id=${data.id.toString()} class="card__image" src=${data.image} alt="Podcast logo">
                </div>
                <h3 data-id=${data.id.toString()} class="card__title">${data.title}</h3>
                <p data-id=${data.id.toString()} class="card__descr">${this.replaceTags(data.description)}</p>
                <div class="card__play" data-id=${data.id.toString()}></div>
                </li>
                `;
        }
    }

    replaceTags(str: string) {
        const regexForStripHTML = /<.*>.*?/gi;
        return str.replace(regexForStripHTML, '').toLowerCase();
    }

    setDefaultImage() {
        const images = document.getElementsByClassName('card__image');
        Array.from(images).forEach((val) => {
            val.addEventListener('error', () => {
                if (val instanceof HTMLImageElement) {
                    val.src = './assets/img/fav-icon.png';
                }
            });
        });
    }

    draw() {
        this.addStructure();
        this.controller.fetchRecent().then((res) => {
            res.forEach((val) => this.drawCard(val));
            this.setDefaultImage();
        });
    }
}
