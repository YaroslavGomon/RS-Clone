import { OnRangeInput } from './types/type';

export class Player {
    private parent: Element;
    private playerLayout: string;
    private onRangeInput: OnRangeInput;

    constructor(parent: Element, onRangeInput: OnRangeInput) {
        this.parent = parent;
        this.onRangeInput = onRangeInput;
        this.playerLayout = `
            <audio class="track" src=""></audio>
            <div class="player__podcast-data">
                <img class="player__image" src="./assets/img/tedtalksdaily.png" alt="Episode image">
                <div class="player__info">
                    <div class="player__title">The secret to making friends as an adult | Marisa</span></div>
                    <div class="player__podcast">Ted Talks Daily</div>
                </div>
                <div class="player__button player_save"></div>
            </div>
            <div class="player__wrapper">
                <div class="buttons__wrapper">
                    <p class="player__button skip-back"></p>
                    <p class="player__button previous"></p>
                    <p class="player__button play"></p>
                    <p class="player__button next"></p>
                    <p class="player__button skip-forward"></p>
                </div>
                <div class="progress__wrapper">
                    <p class="time time_current">0:11</p>
                    <input type="range" class="progress progress_track" min="0" max="" value="0" step="1"/>
                    <p class="time time_duration">3:22</p>
                </div>
            </div>
            <div class="player-volume__wrapper">
                <input type="range" class="progress progress_volume" min="0" max="" value="0" step="1"/>
            </div>
        </div> `;
    }

    public drawPlayer() {
        const player: Element = document.createElement('div');
        player.classList.add('player');
        player.innerHTML = this.playerLayout;
        this.parent.appendChild(player);

        this.addListenersForRange();
    }

    private addListenersForRange(): void {
        console.log('hjhjh');

        const progressTrack: Element | null = document.querySelector('.progress_track');
        if (progressTrack !== null) {
            progressTrack.addEventListener('input', (event: Event) => this.onRangeInput(event));
        }
        const progressVolume: Element | null = document.querySelector('.progress_volume');
        if (progressVolume !== null) {
            progressVolume.addEventListener('input', (event: Event) => this.onRangeInput(event));
        }
    }
}
