import { Library } from './api/libraryController';
import Controller from './controller';
import { OnClickPlayButton, OnClickPodcastCard, UserLibrary } from './types/type';
import { replaceTags, requiresNonNull } from './utils';

export default class SubscriptionPage {
    private readonly controller: Controller;
    private readonly onClickPodcastCard: OnClickPodcastCard;
    private readonly onClickPlayButton: OnClickPlayButton;
    private readonly library: Library;

    constructor(onClickPodcastCard: OnClickPodcastCard, onClickPlayButton: OnClickPlayButton) {
        this.onClickPodcastCard = onClickPodcastCard;
        this.onClickPlayButton = onClickPlayButton;
        this.library = new Library('ivanov@gmail.com');
        this.controller = new Controller();
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

    private changeTitle() {
        const title: HTMLElement | null = document.querySelector('.h3.podcast__cards--title');
        if (title) {
            title.textContent = `Subscriptions`;
        }
    }

    private drawCard(id: number) {
        this.controller.fetchById(id).then((data) => {
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
                event.stopPropagation();
                const target: Element = event.currentTarget as Element;
                const podcastId: number = Number(target.getAttribute('data-id'));
                this.controller.fetchEpisodesById(podcastId).then((res) => this.onClickPlayButton(res[0].id, event));
            });
            card.appendChild(playButton);
            podcastCards.appendChild(card);
        });
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

    public draw() {
        this.addStructure();
        this.changeTitle();
        this.library.userLibrary().then(data=>{
            const subscriptions = (data as UserLibrary).subscribedPodcasts;
            subscriptions.forEach((elem) => {
                this.drawCard(Number(elem.id));
                this.setDefaultImage();
            });
        });
    }
}
