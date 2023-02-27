type podcastCard = {
    categories: object;
    description: string;
    id: number;
    itunesId: number | null;
    image: string;
    language: string;
    newestItemPublishTime: number;
    oldestItemPublishTime: number;
    title: string;
    url: string;
};

type episode = {
    // chaptersUrl: null,
    dateCrawled: number;
    datePublished: number;
    datePublishedPretty: string;
    description: string;
    duration: number;
    enclosureLength: number;
    enclosureType: string;
    enclosureUrl: string;
    episode: number;
    // episodeType: "full",
    // explicit: 0,
    // feedDead: 0,
    // feedDuplicateOf: null,
    feedId: number;
    feedImage: string;
    feedItunesId: null | number;
    feedLanguage: string;
    // guid: "8b226f9e-b2d8-4604-9095-ab1facb93581",
    id: number;
    image: string;
    link: string;
    persons: Array<object>;
    // season: 0,
    title: string;
    // transcriptUrl: null,
};

export type OnRangeInput = (event: Event) => void;

export { podcastCard, episode };

export enum PlayerButtons {
    Play = 'play',
    Pause = 'pause',
    Previous = 'previous',
    Next = 'next',
    Skipback = 'skip-back',
    Skipforward = 'skip-forward',
    Save = 'save'
}

export type OnClickPlayerButton = (event: Event) => void;
export type OnReloadPage = (id: number | string) => void;
export type OnClickPodcastCard = (podcastId: number) => void;
export type onClickEpisodeCard = (episodeId: number) => void;
export type onClickSavedPlaylist = (playlistName: string) => void;
export type OnChangeSearchValue = (value: string) => void;
export type OnClickPlayButton = (episodeId: number, event: Event) => void;
export type OnClickLink = (path: string) => void;
export type OnClickAccountsBtn = (btnText: string) => void;
export type OnClickAction = (type: ActionsButtons, event: Event) => void;


export type user = {
    userName: string;
    userPassword: string;
    email: string;
    phone: string;
};

export type PodcastsJson = {
    count: number,
    description: string,
    feeds: podcastCard[],
    max: string,
    since: string,
    status: string,
};

export type SearchJson = {
    count: number,
    description: string,
    feeds: podcastCard[],
    query: string,
    status: string,
}

export type PodcastJson = {
    description: string,
    feed: podcastCard,
    query: {id: string},
    status: string,
}

export type EpisodesJson = {
    count: number,
    description: string,
    items: episode[],
    liveItems: episode[],
    query: string,
    status: string,
};

export type EpisodeJson = {
    description: string,
    episode: episode,
    id: string,
    status: string,
};

export type UserLibrary = {
    [key: string]: Array<{id:number}>
    likedPodcasts: Array<{id:number}>
    subscribedPodcasts: Array<{id:number}>
}

export type StorageEpisode = {
    id: number,
    currentDuration: number
};

export enum ActionsButtons {
    Share = 'share',
    Save = 'save',
    More = 'more',
}
