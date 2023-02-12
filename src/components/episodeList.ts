import Controller from './controller';
import { EpisodesListItem } from './episodesListItem';

export class EpisodeList {
    private podcastId: number;

    private controller: Controller;

    constructor(podcatId: number) {
        this.podcastId = podcatId;
        this.controller = new Controller();
    }

    public createList(): Element {
        const section: Element = document.createElement('section');
        section.classList.add('podcast__list');

        const latestHeader: Element = document.createElement('div');
        latestHeader.classList.add('title_up-next');
        latestHeader.textContent = 'Latest Episode';

        section.appendChild(latestHeader);
        this.getEpisodeListData(section);

        return section;
    }

    private getEpisodeListData(parent: Element): void {
        this.controller.fetchEpisodesById(this.podcastId).then((data) =>
            data.forEach((item, index) => {
                if (index === 0) {
                    const episode: Element = new EpisodesListItem().createEpisode(item);
                    episode.classList.add('episode_latest');
                    parent.appendChild(episode);

                    const listHeader: Element = document.createElement('h3');
                    listHeader.classList.add('h3');
                    listHeader.classList.add('episodes__header');
                    listHeader.textContent = 'Episodes';
                    parent.appendChild(listHeader);
                } else {
                    const episode: Element = new EpisodesListItem().createEpisode(item);
                    parent.appendChild(episode);
                }
            })
        );
    }
}
