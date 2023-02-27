import { StorageEpisode } from './types/type';

export class PodcastStorage {

    public setEpisodeOrder(episodeOrder: StorageEpisode[]): void {
        localStorage.setItem('episodeOrder', JSON.stringify(episodeOrder));
    }

    public getEpisodeOrder(): StorageEpisode[] {
        return JSON.parse(localStorage.getItem('episodeOrder') || '[]');
    }

    public setLastListened(lastListened: StorageEpisode): void {
        localStorage.setItem('lastListened', JSON.stringify(lastListened));
    }

    public getLastListened(): StorageEpisode {
        return JSON.parse(localStorage.getItem('lastListened') || '{"id":0,"currentDuration":0}');
    }
}
