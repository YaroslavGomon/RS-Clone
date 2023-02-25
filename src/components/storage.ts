import { StorageEpisode } from './types/type';

export class PodcastStorage {

    public setEpisodeOrder(episodeOrder: string): void {
        localStorage.setItem('episodeOrder', episodeOrder);
    }

    public getEpisodeOrder(): StorageEpisode[] {
        return JSON.parse(localStorage.getItem('episodeOrder') || '[]');
    }

    public setLastListened(lastListened: string): void {
        localStorage.setItem('lastListened', lastListened);
    }

    public getLastListened(): StorageEpisode {
        return JSON.parse(localStorage.getItem('lastListened') || '{"id":0,"currentTime":0}');
    }
}
