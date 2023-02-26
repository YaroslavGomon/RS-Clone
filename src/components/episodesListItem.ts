import { episode, onClickEpisodeCard } from './types/type';
import { replaceTags } from './utils';
import { Library } from './api/libraryController';

export class EpisodesListItem {
    private readonly parent: Element;
    private readonly onClickEpisodeCard: onClickEpisodeCard;
    private readonly library: Library;

    constructor(parent: Element, onClickEpisodeCard: onClickEpisodeCard) {
        this.parent = parent;
        this.onClickEpisodeCard = onClickEpisodeCard;
        this.library = new Library('ivanov@gmail.com');
    }

    public createEpisode(data: episode): Element {
        const episode: Element = document.createElement('div');
        episode.classList.add('episode');

        episode.appendChild(this.createEpisodeImage(data.image));
        episode.appendChild(this.createEpisodeInfo(data));
        episode.addEventListener('click', this.onClickEpisodeCard.bind(this, data.id));
        this.parent.appendChild(episode);
        return episode;
    }

    private createEpisodeImage(image: string): Element {
        const episodeImage: HTMLImageElement = document.createElement('img');
        episodeImage.classList.add('episode__image_spoti');
        episodeImage.src = image || `../assets/img/fav-icon.png`;
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
        episodeDescription.textContent = replaceTags(data.description);

        episodeInfo.appendChild(episodeTitle);
        episodeInfo.appendChild(episodeDescription);
        episodeInfo.appendChild(this.createEpisodePlayer(data.duration));
        episodeInfo.appendChild(this.createActionsButton(data.id));

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

    private createActionsButton(episodeId: number): Element {
        const wrapper: Element = document.createElement('div');
        wrapper.classList.add('actions_spoti');

        const shareButton: Element = document.createElement('div');
        shareButton.classList.add('button_action');
        shareButton.classList.add('share');

        const saveButton: HTMLElement = document.createElement('div');
        saveButton.classList.add('button_action');
        const path = window.location.hash.split('/');
        if (path[0] === '#saved' || path[0] === '#savedPodcast')
        {
            saveButton.dataset.id = episodeId.toString();
            saveButton.classList.add('saved');
            saveButton.addEventListener('click', (event) => {
                event.stopPropagation();
                const playlistName = path[0] === '#saved' ? 'likedPodcasts' : (path[1] as string).replace(/(%20)/g, ' ');
                this.library.removeItemFromPlaylist(playlistName, saveButton.dataset.id as string)
                .then(()=>{
                    setTimeout(()=> {
                        window.location.href = path.join('/');
                    }, 1000);
                })
                ;
            });
        }
        else 
        {
            saveButton.classList.add('save');
        }


        const moreButton: Element = document.createElement('div');
        moreButton.classList.add('button_action');
        moreButton.classList.add('more_spoti');

        wrapper.appendChild(shareButton);
        wrapper.appendChild(saveButton);
        wrapper.appendChild(moreButton);

        return wrapper;
    }

    private getTime(duration: number): string {
        const hoursStr = duration >= 3600 ? `${Math.floor(duration / 3600)} hr ` : ``;
        const minutes = Math.floor((duration - Number(hoursStr) * 3600) / 60);
        const seconds = Math.floor(duration - Number(hoursStr) * 3600 - minutes * 60);

        return `${hoursStr} ${minutes} min ${seconds} sec`;
    }
}
