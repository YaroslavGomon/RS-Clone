import { podcastCard, episode, PodcastsJson, SearchJson, PodcastJson, EpisodesJson, EpisodeJson, StorageEpisode } from './types/type';
import { IController } from './types/interfaces';
import { PodcastStorage } from './storage';

class Loader {
    public storage = new PodcastStorage();

    private async getAuthorizationHeaderValue(
        apiKey: string,
        apiSecret: string,
        apiHeaderTime: string
    ): Promise<string> {
        const arrayBuffer: ArrayBuffer = new TextEncoder().encode(apiKey + apiSecret + apiHeaderTime);
        const digest: ArrayBuffer = await crypto.subtle.digest('SHA-1', arrayBuffer);
        return [...new Uint8Array(digest)].map((x) => x.toString(16).padStart(2, '0')).join('');
    }

    private getHeaders(apiHeaderTime: string, apiKey: string, authorization: string): HeadersInit {
        const requestHeaders: HeadersInit = new Headers();
        requestHeaders.set('Accept', 'application/json');
        requestHeaders.set('Content-Type', 'application/json; utf-8');
        requestHeaders.set('X-Auth-Date', apiHeaderTime);
        requestHeaders.set('X-Auth-Key', apiKey);
        requestHeaders.set('Authorization', authorization);
        requestHeaders.set('User-Agent', 'my-amazing-podcast-player');
        return requestHeaders;
    }

    async fetchRecent(apiKey: string, apiSecret: string): Promise<podcastCard[]> {
        const url: string = 'https://api.podcastindex.org/api/1.0/recent/feeds?max=12';

        const apiHeaderTime: string = '' + Math.round(Date.now() / 1_000);
        return this.getAuthorizationHeaderValue(apiKey, apiSecret, apiHeaderTime)
            .then((authorization: string) => this.getHeaders(apiHeaderTime, apiKey, authorization))
            .then((headers: HeadersInit) => ({ method: 'GET', headers }))
            .then((requestInit: RequestInit) => fetch(url, requestInit))
            .then((res: Response) => res.json())
            .then((json: PodcastsJson) => json.feeds);
    }

    async fetchSearchCall(qString: string, apiKey: string, apiSecret: string): Promise<podcastCard[]> {
        const url: string = `https://api.podcastindex.org/api/1.0/search/byterm?q=${qString}&pretty`;
        const apiHeaderTime: string = '' + Math.round(Date.now() / 1_000);
        return this.getAuthorizationHeaderValue(apiKey, apiSecret, apiHeaderTime)
            .then((authorization: string) => this.getHeaders(apiHeaderTime, apiKey, authorization))
            .then((headers: HeadersInit) => ({ method: 'GET', headers }))
            .then((requestInit: RequestInit) => fetch(url, requestInit))
            .then((res: Response) => res.json())
            .then((json: SearchJson) => json.feeds);
    }
    fetchById(id: number, apiKey: string, apiSecret: string): Promise<podcastCard> {
        const url: string = `https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=${id}&pretty`;
        const apiHeaderTime: string = '' + Math.round(Date.now() / 1_000);
        return this.getAuthorizationHeaderValue(apiKey, apiSecret, apiHeaderTime)
            .then((authorization: string) => this.getHeaders(apiHeaderTime, apiKey, authorization))
            .then((headers: HeadersInit) => ({ method: 'GET', headers }))
            .then((requestInit: RequestInit) => fetch(url, requestInit))
            .then((res: Response) => res.json())
            .then((json: PodcastJson) => json.feed);
    }

    fetchEpisodesById(id: number, apiKey: string, apiSecret: string): Promise<episode[]> {
        const url: string = `https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=${id}&pretty`;
        const apiHeaderTime: string = '' + Math.round(Date.now() / 1_000);
        return this.getAuthorizationHeaderValue(apiKey, apiSecret, apiHeaderTime)
            .then((authorization: string) => this.getHeaders(apiHeaderTime, apiKey, authorization))
            .then((headers: HeadersInit) => ({ method: 'GET', headers }))
            .then((requestInit: RequestInit) => fetch(url, requestInit))
            .then((res: Response) => res.json())
            .then((json: EpisodesJson) => {
                const episodeOrder: StorageEpisode[] = [];
                json.items.forEach((item) => {
                    episodeOrder.push({ 'id': item.id, 'currentDuration': 0 });
                });
                this.storage.setEpisodeOrder(episodeOrder);
                return json.items;
            });
    }

    fetchEpisodeById(id: number, apiKey: string, apiSecret: string): Promise<episode> {
        const url: string = `https://api.podcastindex.org/api/1.0/episodes/byid?id=${id}&pretty`;
        const apiHeaderTime: string = '' + Math.round(Date.now() / 1_000);
        return this.getAuthorizationHeaderValue(apiKey, apiSecret, apiHeaderTime)
            .then((authorization: string) => this.getHeaders(apiHeaderTime, apiKey, authorization))
            .then((headers: HeadersInit) => ({ method: 'GET', headers }))
            .then((requestInit: RequestInit) => fetch(url, requestInit))
            .then((res: Response) => res.json())
            .then((json: EpisodeJson) => json.episode);
    }

    async fetchDataForUpdatePlayer(apiKey: string, apiSecret: string): Promise<episode> {
        const apiHeaderTime: string = '' + Math.round(Date.now() / 1_000);
        const authorization: string = await this.getAuthorizationHeaderValue(apiKey, apiSecret, apiHeaderTime);
        const headers: HeadersInit = this.getHeaders(apiHeaderTime, apiKey, authorization);
        const requestInit: RequestInit = { method: 'GET', headers };
        const recentPodcast: PodcastsJson = await (await fetch('https://api.podcastindex.org/api/1.0/recent/feeds?max=12', requestInit)).json();
        const episodesList: EpisodesJson = await (await fetch(`https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=${recentPodcast.feeds[0].id}&pretty`, requestInit)).json();
        const episodeJson: EpisodeJson = await (await fetch( `https://api.podcastindex.org/api/1.0/episodes/byid?id=${episodesList.items[0].id}&pretty`, requestInit)).json();

        return episodeJson.episode;
    }
}

class Controller implements IController {
    apiKey: string;
    apiSecret: string;
    constructor() {
        this.apiKey = 'JYJTF9FGRUAZ4CCJAYKF';
        this.apiSecret = 'zCYDzHZjM8u$rkyqTUHTVbHKUTgw88B8htJpmz#$';
    }
    fetchById(id: number): Promise<podcastCard> {
        return new Loader().fetchById(id, this.apiKey, this.apiSecret);
    }
    fetchEpisodesById(id: number): Promise<episode[]> {
        return new Loader().fetchEpisodesById(id, this.apiKey, this.apiSecret);
    }
    fetchEpisodeById(id: number): Promise<episode> {
        return new Loader().fetchEpisodeById(id, this.apiKey, this.apiSecret);
    }
    fetchSearchCall(qString: string): Promise<podcastCard[]> {
        return new Loader().fetchSearchCall(qString, this.apiKey, this.apiSecret);
    }
    fetchRecent(): Promise<podcastCard[]> {
        return new Loader().fetchRecent(this.apiKey, this.apiSecret);
    }
    fetchDataForUpdatePlayer(): Promise<episode> {
        return new Loader().fetchDataForUpdatePlayer(this.apiKey, this.apiSecret);
    }
}

export default Controller;
