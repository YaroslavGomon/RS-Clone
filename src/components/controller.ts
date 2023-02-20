import { podcastCard, episode } from "./types/type";
import { IController } from "./types/interfaces";


class Loader {
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

    async fetchRecent(apiKey: string, apiSecret: string): Promise<podcastCard[]>  {
        const url: string = 'https://api.podcastindex.org/api/1.0/recent/feeds?max=12';
        const apiHeaderTime: string = '' + Math.round(Date.now() / 1_000);
        return this.getAuthorizationHeaderValue(apiKey, apiSecret, apiHeaderTime)
            .then((authorization: string) => this.getHeaders(apiHeaderTime, apiKey, authorization))
            .then((headers: HeadersInit) => ({ method: 'GET', headers }))
            .then((requestInit) => fetch(url, requestInit))
            .then((res) => res.json())
            .then((json) => json.feeds);
    }

    async fetchSearchCall(qString: string, apiKey: string, apiSecret: string): Promise<podcastCard[]>  {
        const url: string = `https://api.podcastindex.org/api/1.0/search/byterm?q=${qString}&pretty`;
        const apiHeaderTime: string = '' + Math.round(Date.now() / 1_000);
        return this.getAuthorizationHeaderValue(apiKey, apiSecret, apiHeaderTime)
                .then((authorization: string) => this.getHeaders(apiHeaderTime, apiKey, authorization))
                .then((headers: HeadersInit) => ({ method: 'GET', headers }))
                .then((requestInit) => fetch(url, requestInit))
                .then((res) => res.json())
                .then((json) => json.feeds);
    }
    fetchById(id: number, apiKey: string, apiSecret: string): Promise<podcastCard>  {
        const url: string = `https://api.podcastindex.org/api/1.0/podcasts/byfeedid?id=${id}&pretty`;
        const apiHeaderTime: string = '' + Math.round(Date.now() / 1_000);
        return this.getAuthorizationHeaderValue(apiKey, apiSecret, apiHeaderTime)
            .then((authorization: string) => this.getHeaders(apiHeaderTime, apiKey, authorization))
            .then((headers: HeadersInit) => ({ method: 'GET', headers }))
            .then((requestInit) => fetch(url, requestInit))
            .then((res) => res.json())
            .then((json) => json.feed);
    }

    fetchEpisodesById(id: number, apiKey: string, apiSecret: string): Promise<episode[]>  {
        const url: string = `https://api.podcastindex.org/api/1.0/episodes/byfeedid?id=${id}&pretty`;
        const apiHeaderTime: string = '' + Math.round(Date.now() / 1_000);
        return this.getAuthorizationHeaderValue(apiKey, apiSecret, apiHeaderTime)
            .then((authorization: string) => this.getHeaders(apiHeaderTime, apiKey, authorization))
            .then((headers: HeadersInit) => ({ method: 'GET', headers }))
            .then((requestInit) => fetch(url, requestInit))
            .then((res) => res.json())
            .then(res => res.items);
    }

    fetchEpisodeById(id: number, apiKey: string, apiSecret: string): Promise<episode>  {
        const url: string = `https://api.podcastindex.org/api/1.0/episodes/byid?id=${id}&pretty`;
        const apiHeaderTime: string = '' + Math.round(Date.now() / 1_000);
        return this.getAuthorizationHeaderValue(apiKey, apiSecret, apiHeaderTime)
            .then((authorization: string) => this.getHeaders(apiHeaderTime, apiKey, authorization))
            .then((headers: HeadersInit) => ({ method: 'GET', headers }))
            .then((requestInit) => fetch(url, requestInit))
            .then((res) => res.json())
            .then(res => res.episode);
    }
}

class Controller implements IController {
    apiKey: string;
    apiSecret: string;
    constructor() {
        this.apiKey = 'JYJTF9FGRUAZ4CCJAYKF';
        this.apiSecret = 'zCYDzHZjM8u$rkyqTUHTVbHKUTgw88B8htJpmz#$';
    }
    test() {
        controllerTest();
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
    fetchRecent(): Promise<podcastCard[]>  {
        return new Loader().fetchRecent(this.apiKey, this.apiSecret);
    }
}

// !!!!!!!!!!BELOW CODE SHOULD BE DELETED!!!!!!!!
// EXAMPLE OF USE
// For instance, I made test method with some functions and DOM constants

const PODCAST_EPISODES_LIST_DOM = `
<div class="podcast_wrapper"
style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
<div class="podcast_items" style="display: grid; grid-template-columns: 1fr; row-gap: 15px;">
  <h1 class="podcast_items__title" style="font-size: 30px;">Name</h1>
</div>
</div>
`;

const PODCAST_LIST_DOM = `
<div class="podcast_wrapper"
style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%;">
<h1 style="font-size: 30px;">RECENT PODCASTS</h1>
<input type="text" class="search_input">
<button class="search_button">Search</button>
<div class="podcast_items" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 70px;">
</div>
</div>
`;





function controllerTest() {
    document.body.innerHTML = PODCAST_LIST_DOM;
    generateRecantPodcastCards();
    // controller.fetchById(5876356);
    // controller.fetchSearchCall('CTO+Morning+Coffee');
}

function generateRecantPodcastCards() {
    const PODCAST_ITEMS = document.querySelector('.podcast_items') as HTMLElement;
    const controller = new Controller();
    controller.fetchRecent()
    .then(res => {
        res.forEach(elem => {
            const PODCAST_CARD = `
            <div data-id="${elem.id}" data-title="${elem.title}" class="podcast_items__item" style="width: 350px; height: 350px; background-color: aqua;">
            <img data-id="${elem.id}" data-title="${elem.title}" src="${elem.image}" alt="podcast-icon" style="height: 100%;">
            <h2 data-id="${elem.id}" data-title="${elem.title}" style="font-size: 25px;">${elem.title}</h2>
            </div>
            `;
            PODCAST_ITEMS.innerHTML += PODCAST_CARD;
        });
    });
    // Listeners should be in appView class
    document.body.addEventListener("click", (event) => {
        if (((event.target) as HTMLElement).dataset.id && ((event.target) as HTMLElement).dataset.title){
            generateEpisodesList(Number(((event.target) as HTMLElement).dataset.id), (((event.target as HTMLElement).dataset.title) as string) );
        }
    });
    const SEARCH_INPUT = document.querySelector('.search_input') as HTMLInputElement;
    const SEARCH_BUTTON = document.querySelector('.search_button') as HTMLElement;
    SEARCH_BUTTON.addEventListener('click', () => {
        generatePodcastSearchList(SEARCH_INPUT.value);
    });
}

function generatePodcastSearchList(search: string){
    const PODCAST_ITEMS = document.querySelector('.podcast_items') as HTMLElement;
    const controller = new Controller();
    const qstring = search.split(' ').join('+');
    PODCAST_ITEMS.innerHTML = '';
    controller.fetchSearchCall(qstring)
    .then(res => {
        res.forEach(elem => {
            const PODCAST_CARD = `
            <div data-id="${elem.id}" data-title="${elem.title}" class="podcast_items__item" style="width: 350px; height: 350px; background-color: aqua;">
            <img data-id="${elem.id}" data-title="${elem.title}" src="${elem.image}" alt="podcast-icon" style="height: 100%;">
            <h2 data-id="${elem.id}" data-title="${elem.title}" style="font-size: 25px;">${elem.title}</h2>
            </div>
            `;
            PODCAST_ITEMS.innerHTML += PODCAST_CARD;
        });
    });
}

function generateEpisodesList(id: number, title: string){
    document.body.innerHTML = PODCAST_EPISODES_LIST_DOM;
    const PODCAST_ITEMS = document.querySelector('.podcast_items') as HTMLElement;
    const PODCAST_NAME = document.querySelector('.podcast_items__title') as HTMLElement;
    const controller = new Controller();
    controller.fetchEpisodesById(id)
    .then(res => {
        PODCAST_NAME.innerText = title;
        res.forEach(elem => {
            const PODCAST_ITEM = `
            <div class="podcast_items__item" style="display: grid; grid-template-columns:  3fr 1fr 1fr 1fr 2fr; width: 100vw; height: 350px; background-color: aqua;">
            <img src="${elem.image}" alt="podcast-icon" height="350px">
            <h2 style="font-size: 25px;">${elem.title}</h2>
            <div style="font-size: 20px;">${elem.description}</div>
            <div style="font-size: 20px;">${elem.datePublishedPretty}</div>
            <audio src="${elem.enclosureUrl}" controls></audio>
            </div>
            `;
            PODCAST_ITEMS.innerHTML += PODCAST_ITEM;
        });
    });
}



export default Controller;
