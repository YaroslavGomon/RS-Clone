import { episode } from './types/type';

export class Episode {

    public createEpisode(data: episode): Element {
        const episode: Element = document.createElement('div');
        episode.classList.add('episode');

        episode.appendChild(this.createEpisodeImage(data.image));
        episode.appendChild(this.createEpisodeInfo(data));

        return episode;
    }

    private createEpisodeImage(image: string): Element {
        const episodeImage: HTMLImageElement = document.createElement('img');
        episodeImage.classList.add('episode__image_spoti');
        episodeImage.src = image;
        episodeImage.alt = 'Episode Image';

        return episodeImage;
    }

    private createEpisodeInfo(data: episode): Element {
        const episodeInfo: Element = document.createElement('div');

        const episodeTitle: Element = document.createElement('h4');
        episodeTitle.classList.add('episode__title_spoti');
        episodeTitle.innerHTML = `${data.title} | <span class="episode__author">Marins</span>`; // ???

        const episodeDescription: Element = document.createElement('div');
        episodeDescription.classList.add('episode__description');
        episodeDescription.textContent = data.description;

        episodeInfo.appendChild(episodeTitle);
        episodeInfo.appendChild(episodeDescription);
        episodeInfo.appendChild(this.createEpisodePlayer(data.duration));
        episodeInfo.appendChild(this.createActionsButton());

        return episodeInfo;
    }

    private createEpisodePlayer(duration: number): Element {
        const player: Element = document.createElement('div');
        player.classList.add('player_small');

        const playButton: Element = document.createElement('div');
        playButton.classList.add('button');
        playButton.classList.add('button-play');

        const episodeTime: Element = document.createElement('div');
        episodeTime.classList.add('episode__time_spoti');

        const episodeDuration: Element = document.createElement('div');
        episodeDuration.classList.add('duration');
        episodeDuration.textContent = this.getTime(duration);

        const episodeProgress: HTMLInputElement = document.createElement('input');
        episodeProgress.type = 'range';
        episodeProgress.classList.add('progress_small');
        episodeProgress.classList.add('unvisible');

        player.appendChild(playButton);
        player.appendChild(episodeTime);
        player.appendChild(episodeDuration);
        player.appendChild(episodeProgress);

        return player;
    }

    private createActionsButton(): Element {
        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('actions_spoti');

        const shareButton: Element = document.createElement('div');
        shareButton.classList.add('button_action');
        shareButton.classList.add('share');

        const saveButton: Element = document.createElement('div');
        saveButton.classList.add('button_action');
        saveButton.classList.add('save');

        const moreButton: Element = document.createElement('div');
        moreButton.classList.add('button_action');
        moreButton.classList.add('more_spoti');

        wrapper.appendChild(shareButton);
        wrapper.appendChild(saveButton);
        wrapper.appendChild(moreButton);

        return wrapper;

    }

    private getTime(duration: number): string {
        let result = '';
        let hour = 0;
        if (duration >= 3600) {
            hour = Math.floor(duration / 3600);
            result += `${hour} hr `;
        }
        const minutes = Math.floor((duration - hour * 3600) / 60);
        const seconds = Math.floor(duration - hour * 3600 - minutes * 60);

        result += `${minutes} min ${seconds} sec`;

        return result;
    }

    //Will be delete or use later
    // private getEpisodeData(id: number): void {
    //     this.controller.fetchEpisodeById(id).then((data) => this.createEpisode(data));
    // }
}
