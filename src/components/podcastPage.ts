import { applePodcastPageDOM, spotifyPodcastPageDOM } from './templates/podcastPageDom';
import Controller from './controller';
import { episode } from './types/type';

export default class PodcastPage {
    private podcastId: number;
    private controller: Controller;
    private data: Promise<episode[]>;

    constructor(id: number) {
        this.podcastId = id;
        this.controller = new Controller();
        this.data = this.controller.fetchEpisodesById(id);
    }

    public drawPodcastPage(layout = 'apple'): void {
        const mainDOM = document.querySelector('.main__container') as HTMLElement;
        const appleEpisodesListDOM = document.querySelector('.episodes-list') as HTMLElement;
        const spotifyEpisodesListDOM = document.querySelector('.podcast__list') as HTMLElement;
        let spotifyEpisodeElement = ``;
        let appleEpisodeElement = ``;
        switch (layout) {
            case 'apple':
                mainDOM.innerHTML = applePodcastPageDOM;
                this.addGeneralDescription(this.podcastId);
                this.data.then(episodes => {
                    episodes.forEach(episode => {
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
                          <div class="duration">${Math.floor(episode.duration / 60)} min ${episode.duration % 60} sec</div>
                          </div>
                          </div>
                          <div class="actions">
                          <div class="button_action save"></div>
                          <div class="button_action download"></div>
                          <div class="button_action add"></div>
                          </div>
                          </div>
                          `;
                        appleEpisodesListDOM.innerHTML += appleEpisodeElement;
                    });
                });
                break;
            case 'spotify':
                mainDOM.innerHTML = spotifyPodcastPageDOM;
                this.addGeneralDescription(this.podcastId);
                this.data.then(episodes => {
                    episodes.forEach(episode => {
                        spotifyEpisodeElement = `
                          <div class="episode">
                              <img
                                  class="episode__image_spoti"
                                  src="${episode.image}"
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
                                      <div class="duration">${Math.floor(episode.duration / 60)} min ${episode.duration % 60} sec</div>
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
                        spotifyEpisodesListDOM.innerHTML += spotifyEpisodeElement;
                    });
                });
                break;
        }
    }
    private addGeneralDescription(id: number) {
        this.controller.fetchById(id)
        .then(podcastData => {
            const podcastImg = document.querySelector('.podcast__image') as HTMLImageElement;
            const podcastTitle = document.querySelector('.podcast__title') as HTMLElement;
            const podcastDesctiption = document.querySelector('.podcast__about__rr') as HTMLElement || undefined;
            podcastImg.src = podcastData.image;
            podcastTitle.innerText = podcastData.title;
            if (podcastDesctiption != undefined){
                podcastDesctiption.innerText = podcastData.description;
            }
        });
    }
    // private addListeners():void {
    //     const mainDOM = document.querySelector('.main__container') as HTMLElement;
    // }
}
