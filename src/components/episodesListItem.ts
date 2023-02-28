import { episode, onClickEpisodeCard, OnClickPlayButton } from './types/type';
import { formatTime, replaceTags } from './utils';
import { Library } from './api/libraryController';
import { EMAIL } from './constants';

export class EpisodesListItem {
    private readonly parent: Element;
    private readonly onClickEpisodeCard: onClickEpisodeCard;
    private readonly library: Library;
    private readonly onClickPlayButton: OnClickPlayButton;

    constructor(parent: Element, onClickEpisodeCard: onClickEpisodeCard, onClickPlayButton: OnClickPlayButton) {
        this.parent = parent;
        this.onClickEpisodeCard = onClickEpisodeCard;
        this.library = new Library(EMAIL);
        this.onClickPlayButton = onClickPlayButton;
    }

    public createEpisode(data: episode): Element {
        const episode: HTMLElement = document.createElement('div');
        episode.classList.add('episode');
        episode.dataset.id = data.id.toString();

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
        episodeTitle.innerHTML = data.title;

        const episodeDescription: Element = document.createElement('div');
        episodeDescription.classList.add('episode__description');
        episodeDescription.textContent = replaceTags(data.description);

        episodeInfo.appendChild(episodeTitle);
        episodeInfo.appendChild(episodeDescription);
        episodeInfo.appendChild(this.createEpisodePlayer(data.duration, data.id));
        episodeInfo.appendChild(this.createActionsButton(data.id));

        return episodeInfo;
    }

    private createEpisodePlayer(duration: number, id: number): Element {
        const player: Element = document.createElement('div');
        player.classList.add('player_small');

        const playButton: Element = document.createElement('div');
        playButton.classList.add('button');
        playButton.classList.add('button-play');
        playButton.setAttribute('id', `${id}`);

        playButton.addEventListener('click', (event: Event) => {
            event.stopPropagation();
            this.onClickPlayButton(id, event);
        });

        const episodeTime: Element = document.createElement('div');
        episodeTime.classList.add('episode__time_spoti');

        const episodeDuration: Element = document.createElement('div');
        episodeDuration.classList.add('duration');
        episodeDuration.textContent = formatTime(duration);

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
        moreButton.classList.add('download');

        wrapper.appendChild(shareButton);
        wrapper.appendChild(saveButton);
        wrapper.appendChild(moreButton);

        return wrapper;
    }

//     private getTime(duration: number): string {
//         const hours: number =  duration >= 3600 ? Math.floor(duration / 3600) : 0;
//         const hoursStr: string = hours !== 0 ? `${hours} hr ` : ``;
//         const minutes: number = Math.floor((duration - hours * 3600) / 60);
//         const seconds: number = Math.floor(duration - hours * 3600 - minutes * 60);
//
//         return `${hoursStr} ${minutes} min ${seconds} sec`;
//     }
}
