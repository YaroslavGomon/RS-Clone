import Controller from './controller';
import { OnClickPlayButton, OnClickPodcastCard, podcastCard } from './types/type';
import { replaceTags, requiresNonNull } from './utils';

export default class Cards {
    private readonly controller: Controller;
    private readonly onClickPodcastCard: OnClickPodcastCard;
    private readonly onClickPlayButton: OnClickPlayButton;

    constructor(onClickPodcastCard: OnClickPodcastCard, onClickPlayButton: OnClickPlayButton) {
        this.controller = new Controller();
        this.onClickPodcastCard = onClickPodcastCard;
        this.onClickPlayButton = onClickPlayButton;
    }

    private addStructure(): void {
        const main = document.querySelector('main');
        if (main) {
            main.innerHTML = '';
            main.innerHTML = `
                <h3 class="h3 podcast__cards--title"></h3>
                <ul class="podcast__cards"></ul>
                `;
        }
    }

    private changeTitle(str: string) {
        const title: HTMLElement | null = document.querySelector('.h3.podcast__cards--title');
        if (title) {
            title.textContent = `${str ? str : 'Recent'} Podcasts`;
        }
    }

    private drawCard(data: podcastCard) {
        const podcastCards: Element = requiresNonNull(document.querySelector('.podcast__cards'));
        const card: Element = document.createElement('li');
        card.classList.add('card');
        card.setAttribute('data-id', data.id.toString());
        card.innerHTML = `
            <div class="card__image-container" data-id=${data.id}>
            <img data-id=${data.id} class="card__image" src=${data.image} alt="Podcast logo">
            </div>
            <h3 data-id=${data.id} class="card__title">${data.title}</h3>
            <p data-id=${data.id} class="card__descr">${replaceTags(data.description)}</p>
            `;
        card.addEventListener('click', () => this.onClickPodcastCard(data.id));

        const playButton: Element = document.createElement('div');
        playButton.classList.add('card__play');
        playButton.setAttribute('data-id', data.id.toString());
        playButton.addEventListener('click', (event) => {
            event.stopImmediatePropagation();
            const target: Element = event.currentTarget as Element;
            const podcastId: number = Number(target.getAttribute('data-id'));
            this.controller.fetchEpisodesById(podcastId).then((res) => this.onClickPlayButton(res[0].id));
        });
        card.appendChild(playButton);
        podcastCards.appendChild(card);
    }

    private setDefaultImage(): void {
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
        this.changeTitle(searchString);
        if (searchString === '') {
            this.controller.fetchRecent().then((res) => {
                res.forEach((val) => this.drawCard(val));
                this.setDefaultImage();
            });
        } else {
            this.controller.fetchSearchCall(searchString).then((res) => {
                res.forEach((val) => this.drawCard(val));
                this.setDefaultImage();
            });
        }
    }
}
