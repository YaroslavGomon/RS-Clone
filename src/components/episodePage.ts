import Controller from './controller';
import { episode, OnClickPlayButton, OnClickPodcastCard } from './types/type';
import { replaceTags, requiresNonNull } from './utils';

export class EpisodePage {
    private readonly controller: Controller;
    private readonly onClickPodcastCard: OnClickPodcastCard;
    private readonly onClickPlayButton: OnClickPlayButton;
    private readonly currentEpisodeId: number;
    private readonly isPlay: boolean;

    constructor(currentEpisodeId: number, isPlay: boolean, onClickPodcastCard: OnClickPodcastCard, onClickPlayButton: OnClickPlayButton) {
        this.controller = new Controller();
        this.onClickPodcastCard = onClickPodcastCard;
        this.onClickPlayButton = onClickPlayButton;
        this.currentEpisodeId = currentEpisodeId;
        this.isPlay = isPlay;
    }

    public draw(data: episode): void {
        const episode: Element = document.createElement('div');
        episode.classList.add('episodeContent');

        episode.appendChild(this.createEpisodeHeader(data.image || data.feedImage, data.title, data.title));
        episode.appendChild(this.createButtonsBlock(data.id));
        episode.appendChild(this.createEpisodeDescription(replaceTags(data.description)));
        episode.appendChild(this.createButtonSeeAll(data.feedId));

        const mainContainer = requiresNonNull(document.querySelector('.main__container'));
        mainContainer.innerHTML = ``;
        mainContainer.appendChild(episode);
    }

    private createEpisodeHeader(image: string, title: string, owner: string): Element {
        const episodeHeader: Element = document.createElement('div');
        episodeHeader.classList.add('episodeContent__header');

        const episodeImage: HTMLImageElement = document.createElement('img');
        episodeImage.classList.add('episodeContent__image');
        episodeImage.src = image;

        const episodeInfo: Element = document.createElement('div');
        episodeInfo.classList.add('episodeContent__header__info');

        const episodeTitle: Element = document.createElement('h1');
        episodeTitle.classList.add('episodeContent__title');
        episodeTitle.classList.add('h1');
        episodeTitle.textContent = title;

        const episodeOwner: Element = document.createElement('h3');
        episodeOwner.classList.add('episodeContent__owner');
        episodeOwner.classList.add('h3');
        episodeOwner.textContent = owner;

        episodeInfo.appendChild(episodeTitle);
        episodeInfo.appendChild(episodeOwner);
        episodeHeader.appendChild(episodeImage);
        episodeHeader.appendChild(episodeInfo);

        return episodeHeader;
    }

    private createButtonsBlock(episodeId: number): Element {
        const buttonsContainer: Element = document.createElement('div');
        buttonsContainer.classList.add('episodeContent__buttons');

        const playButton: Element = document.createElement('div');
        playButton.classList.add('button');
        playButton.classList.add('button_big');
        playButton.classList.add('play');
        playButton.setAttribute('id', `${episodeId}`);
        if (episodeId === this.currentEpisodeId && this.isPlay) {
            playButton.classList.add('pause');
        }
        playButton.addEventListener('click', (event: Event) => {
            this.onClickPlayButton(episodeId, event);
        });

        const libraryButton: Element = document.createElement('div');
        libraryButton.classList.add('button');
        libraryButton.classList.add('button_big');
        libraryButton.classList.add('save');

        const actionsButton: Element = document.createElement('div');
        actionsButton.classList.add('button');
        actionsButton.classList.add('button_big');
        actionsButton.classList.add('button_actions');
        actionsButton.textContent = '...';

        buttonsContainer.appendChild(playButton);
        // buttonsContainer.appendChild(libraryButton);
        // buttonsContainer.appendChild(actionsButton);

        return buttonsContainer;
    }

    private createEpisodeDescription(desription: string): Element {
        const section: Element = document.createElement('section');
        section.classList.add('episodeContent__description');

        const sectionHeader: Element = document.createElement('h2');
        sectionHeader.classList.add('h2');
        sectionHeader.textContent = 'Episode Description';

        const sectionText: Element = document.createElement('div');
        sectionText.classList.add('episode__text');
        sectionText.textContent = replaceTags(desription);

        section.appendChild(sectionHeader);
        section.appendChild(sectionText);

        return section;
    }

    private createButtonSeeAll(podcastId: number): Element {
        const seeAllButton: Element = document.createElement('div');
        seeAllButton.classList.add('button');
        seeAllButton.classList.add('button_light');
        seeAllButton.classList.add('button_see-all');
        seeAllButton.textContent = 'See All Episodes';

        seeAllButton.addEventListener('click', () => this.fetchAllEpisode(podcastId));

        return seeAllButton;
    }

    public fetchEpisode(id: number): void {
        this.controller.fetchEpisodeById(id).then((data) => this.draw(data));
    }

    public fetchAllEpisode(podcastId: number): void {
        this.onClickPodcastCard(podcastId);
    }
}
