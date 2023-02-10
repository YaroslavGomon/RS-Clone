import Controller from './controller';
import { EpisodeList } from './episodeList';
import { podcastCard } from './types/type';

export class Podcast {
    private controller: Controller;
    private parent: Element;

    constructor(parent: Element) {
        this.controller = new Controller();
        this.parent = parent;
    }

    public drawPodcast(data: podcastCard): void {
        const podcastWrapper: Element = document.createElement('div');
        podcastWrapper.classList.add('podcast');

        const podcastData: Element = document.createElement('div');
        podcastData.classList.add('podcast__data');

        podcastData.appendChild(new EpisodeList(data.id).createList());
        podcastData.appendChild(this.createPodcastDescription(data.description));

        podcastWrapper.appendChild(this.createPodcastHeader(data.image, data.title, data.title));
        podcastWrapper.appendChild(this.createSubsribeBlock());
        podcastWrapper.appendChild(podcastData);

        this.parent.innerHTML = '';
        this.parent.appendChild(podcastWrapper);
    }

    private createPodcastHeader(image: string, title: string, owner: string): Element {
        const podcastHeader: Element = document.createElement('div');
        podcastHeader.classList.add('podcast__header');

        const podcastImage: HTMLImageElement = document.createElement('img');
        podcastImage.classList.add('podcast__image');
        podcastImage.src = image;

        const podcastInfo: Element = document.createElement('div');
        podcastInfo.classList.add('podcast__info');

        const podcastTitle: Element = document.createElement('h1');
        podcastTitle.classList.add('podcast__title');
        podcastTitle.textContent = title;

        const podcastOwner: Element = document.createElement('h1');
        podcastOwner.classList.add('podcast__owner');
        podcastOwner.textContent = owner;

        podcastInfo.appendChild(podcastTitle);
        podcastInfo.appendChild(podcastOwner);
        podcastHeader.appendChild(podcastImage);
        podcastHeader.appendChild(podcastInfo);

        return podcastHeader;
    }

    private createSubsribeBlock(): Element {
        const subscribeContainer: Element = document.createElement('div');
        subscribeContainer.classList.add('podcast__subscribe_spoti');

        const followButton: Element = document.createElement('div');
        followButton.classList.add('button');
        followButton.classList.add('button_spoti');
        followButton.classList.add('button_follow');
        followButton.textContent = '+ Follow';

        const actionsButton: Element = document.createElement('div');
        actionsButton.classList.add('button');
        actionsButton.classList.add('button_spoti');
        actionsButton.classList.add('button_actions');
        actionsButton.textContent = '...';

        subscribeContainer.appendChild(followButton);
        subscribeContainer.appendChild(actionsButton);

        return subscribeContainer;
    }

    private createPodcastDescription(desription: string): Element {
        const section: Element = document.createElement('section');
        section.classList.add('podcast__description');

        const sectionHeader: Element = document.createElement('h3');
        sectionHeader.classList.add('h3');
        sectionHeader.textContent = 'About';

        const sectionText: Element = document.createElement('div');
        sectionText.classList.add('podcast__about__text');
        sectionText.textContent = desription;

        section.appendChild(sectionHeader);
        section.appendChild(sectionText);

        return section;
    }

    public getPodcastData(id: number): void {
        this.controller.fetchById(id).then((data) => {
            this.drawPodcast(data);
        });
    }
}
