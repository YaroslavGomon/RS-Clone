import Controller from './controller';
import { OnClickPodcastCard, podcastCard } from './types/type';
import { requiresNonNull } from './utils';

export default class Cards {
    private readonly controller: Controller;
    private onClickPodcastCard: OnClickPodcastCard;

    constructor(onClickPodcastCard: OnClickPodcastCard) {
        this.controller = new Controller();
        this.onClickPodcastCard = onClickPodcastCard;
    }

    private addStructure() {
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = '';
            main.innerHTML = `
                <h3 class="h3 podcast__cards--title">Podcasts</h3>
                <ul class="podcast__cards"></ul>
                `;
        }
    }

    private changeTitle(str: string = 'Recent') {
        const title: HTMLElement | null = document.querySelector('.h3.podcast__cards--title');
        if (title) {
            title.textContent = `${str} Podcasts`;
        }
    }

    private drawCard(data: podcastCard) {
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
        const listCards: NodeListOf<Element> = requiresNonNull(document.querySelectorAll('.card'));
        listCards.forEach((card) => {
            const id = Number(card.getAttribute('data-id'));
            card.addEventListener('click', () => this.onClickPodcastCard(id));
        });
    }

    private replaceTags(str: string) {
        const regexForStripHTML = /<.*>.*?/gi;
        return str.replace(regexForStripHTML, '').toLowerCase();
    }

    private setDefaultImage() {
        const images = document.getElementsByClassName('card__image');
        Array.from(images).forEach((val) => {
            val.addEventListener('error', () => {
                if (val instanceof HTMLImageElement) {
                    val.src = './assets/img/fav-icon.png';
                }
            });
        });
    }

    public draw(searchString: string = '') {
        this.addStructure();
        if (searchString === '') {
            this.controller.fetchRecent().then((res) => {
                res.forEach((val) => this.drawCard(val));
                this.setDefaultImage();
                this.changeTitle();
            });
        } else {
            this.controller.fetchSearchCall(searchString).then((res) => {
                res.forEach((val) => this.drawCard(val));
                this.setDefaultImage();
                this.changeTitle(searchString);
            });
        }
    }
}
