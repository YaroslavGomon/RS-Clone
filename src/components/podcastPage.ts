import { applePodcastPageDOM, spotifyPodcastPageDOM } from './templates/podcastPageDom';
import Controller from './controller';
import { episode, requiresNonNull } from './types/type';

type OnClickCard = (id: number) => void;

export default class PodcastPage {
    private podcastId: number;
    private controller: Controller;
    private data: Promise<episode[]>;
    private onClickEpisodeCard: OnClickCard;

    constructor(id: number, onClickEpisodeCard: OnClickCard) {
        this.podcastId = id;
        this.controller = new Controller();
        this.data = this.controller.fetchEpisodesById(id);
        this.onClickEpisodeCard = onClickEpisodeCard;
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
                          <div class="episode">
                          <div class="episode__info">
                          <div class="episode__time">${episode.datePublishedPretty}</div>
                          <h4 class="episode__title">
                          ${episode.title}
                          <span class="episode__author">Authors</span>
                          </h4>
                          <div class="episode__description">
                          ${episode.description}
                          </div>
                          <div class="player_small">
                          <div class="button button-play"></div>
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
                                  ${episode.description}
                                  </div>
                                  <div class="player_small">
                                      <div class="button button-play"></div>
                                      <div class="episode__time_spoti">${episode.datePublishedPretty}</div>
                                      <div class="duration">${Math.floor(episode.duration / 60)} min ${
                            episode.duration % 60
                        } sec</div>
                                      <div class="progress_small unvisible"></div>
                                  </div>
                                  <div class="actions_spoti">
                                      <div class="button_action share"></div>
                                      <div class="button_action save"></div>
                                      <div class="button_action more_spoti"></div>
                                  </div>
                              </div>
                          </div>
                         `;
                        (document.querySelector('.podcast__list') as HTMLElement).innerHTML += spotifyEpisodeElement;
                        const episodeWrapper = requiresNonNull(document.querySelector('.episode'));
                        episodeWrapper.addEventListener('click', () => this.onClickEpisodeCard(episode.id));
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
                podcastDescription.innerText = podcastData.description;
            }
        });
    }
    // TO DO
    // private addListeners():void {
    //     const mainDOM = document.querySelector('.main__container') as HTMLElement;
    // }
}
