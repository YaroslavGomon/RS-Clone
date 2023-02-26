import { applePodcastPageDOM, spotifyPodcastPageDOM } from './templates/podcastPageDom';
import Controller from './controller';
import { episode, onClickEpisodeCard, OnClickPlayButton } from './types/type';
import { replaceTags, requiresNonNull } from './utils';

export default class PodcastPage {
    private readonly podcastId: number;
    private readonly controller: Controller;
    private readonly data: Promise<episode[]>;
    private readonly onClickEpisodeCard: onClickEpisodeCard;
    private readonly onClickPlayButton: OnClickPlayButton;
    private readonly currentEpesodeId: number;
    private readonly isPlay: boolean;

    constructor(podcastId: number, currentEpesodeId: number, isPlay: boolean, onClickEpisodeCard: onClickEpisodeCard, onClickPlayButton: OnClickPlayButton) {
        this.podcastId = podcastId;
        this.controller = new Controller();
        this.data = this.controller.fetchEpisodesById(podcastId);
        this.onClickEpisodeCard = onClickEpisodeCard;
        this.onClickPlayButton = onClickPlayButton;
        this.currentEpesodeId = currentEpesodeId;
        this.isPlay = isPlay;
    }

    public drawPodcastPage(layout = 'apple'): void {
        const mainDOM = document.querySelector('.main__container') as HTMLElement;
        let spotifyEpisodeElement = ``;
        let appleEpisodeElement = ``;
        switch (layout) {
            case 'apple':
                mainDOM.innerHTML = applePodcastPageDOM;
                this.addGeneralDescription(this.podcastId);
                this.data.then((episodes) => {
                    episodes.forEach((episode) => {
                        appleEpisodeElement = `
                          <div class="episode" data-id=${episode.id}>
                          <div class="episode__info">
                          <div class="episode__time">${episode.datePublishedPretty}</div>
                          <h4 class="episode__title">
                          ${episode.title}
                          <span class="episode__author">Authors</span>
                          </h4>
                          <div class="episode__description">
                          ${replaceTags(episode.description)}
                          </div>
                          <div class="player_small">
                          <div id=${episode.id} class="button button-play"></div>
                          <div class="progress_small unvisible"></div>
                          <div class="duration">${Math.floor(episode.duration / 60)} min ${
                            episode.duration % 60
                        } sec</div>
                          </div>
                          </div>
                          <div class="actions">
                          <div class="button_action save"></div>
                          <div class="button_action download"></div>
                          <div class="button_action add"></div>
                          </div>
                          </div>
                          `;
                        (document.querySelector('.episodes-list') as HTMLElement).innerHTML += appleEpisodeElement;
                        this.addListeners();
                    });
                });
                break;
            case 'spotify':
                mainDOM.innerHTML = spotifyPodcastPageDOM;
                this.addGeneralDescription(this.podcastId);
                this.data.then((episodes) => {
                    episodes.forEach((episode) => {
                        const episodeImg =
                            episode.image || (document.querySelector('.podcast__image') as HTMLImageElement).src;
                        const player = this.createSmallPlayer(episode);
                        spotifyEpisodeElement = `
                          <div class="episode" data-id=${episode.id}>
                              <img
                                  class="episode__image_spoti"
                                  src="${episodeImg}"
                                  alt="Episode image"
                              />
                              <div class="episode__info">
                                  <h4 class="episode__title_spoti">
                                  ${episode.title}
                                      <span class="episode__author">Author</span>
                                  </h4>
                                  <div class="episode__description">
                                  ${replaceTags(episode.description)}
                                  </div>
                                      <div class="progress_small unvisible"></div>
                                  <div class="actions_spoti">
                                      <div class="button_action share"></div>
                                      <div class="button_action save"></div>
                                      <div class="button_action more_spoti"></div>
                                  </div>
                              </div>
                          </div>
                         `;
                        (document.querySelector('.podcast__list') as HTMLElement).innerHTML += spotifyEpisodeElement;
                        document.querySelector('.podcast__list')?.append(player);
                        this.addListeners();
                    });
                });
                break;
        }
    }
    private addGeneralDescription(id: number) {
        this.controller.fetchById(id).then((podcastData) => {
            const podcastImg = document.querySelector('.podcast__image') as HTMLImageElement;
            const podcastTitle = document.querySelector('.podcast__title') as HTMLElement;
            const podcastDescription = (document.querySelector('.podcast__about__text') as HTMLElement) || undefined;
            if (podcastData.image != '') {
                podcastImg.src = podcastData.image;
            } else {
                podcastImg.src = `../assets/img/fav-icon.png`;
            }
            podcastTitle.innerText = podcastData.title;
            if (podcastDescription != undefined) {
                podcastDescription.innerText = replaceTags(podcastData.description);
            }
        });
    }

    private addListeners(): void {
        const episodesWrapper: NodeListOf<Element> = requiresNonNull(document.querySelectorAll('.episode'));
        episodesWrapper.forEach((episodeWrapper) =>
            episodeWrapper.addEventListener('click', () =>
                this.onClickEpisodeCard(Number(episodeWrapper.getAttribute('data-id')))
            )
        );

        const buttonsPlay: NodeListOf<Element> = requiresNonNull(document.querySelectorAll('.button-play'));
        buttonsPlay.forEach((button) =>
            button.addEventListener('click', (event: Event) => {
                event.stopPropagation();
                this.onClickPlayButton(Number(button.getAttribute('id')),event);
            })
        );
    }

    private createSmallPlayer(episode: episode): Element {
        const playerSmall: Element = document.createElement('div');
        playerSmall.classList.add('player_small');

        const playButton: Element = document.createElement('div');
        playButton.classList.add('button');
        playButton.classList.add('button-play');
        playButton.classList.add('play');
        playButton.setAttribute('id', `${episode.id}`);

        if (episode.id === this.currentEpesodeId && this.isPlay) {
            playButton.classList.add('pause');
        }

        const date: Element = document.createElement('div');
        date.classList.add('episode__time_spoti');
        date.textContent = episode.datePublishedPretty;

        const duration: Element = document.createElement('div');
        duration.classList.add('duration');
        duration.textContent = `${Math.floor(episode.duration / 60)} min ${episode.duration % 60} sec`;

        playerSmall.append(playButton);
        playerSmall.append(date);
        playerSmall.append(duration);

        return playerSmall;
    }
}
