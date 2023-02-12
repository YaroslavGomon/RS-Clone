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

export function requiresNonNull<Type>(object: Type | null | undefined): Type {
    if (object === null || object == undefined) throw new Error('Element not found');

    return object;
}

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
export type OnReloadPage = (id: number) => void;
export type OnClickPodcastCard = (id: number) => void;
