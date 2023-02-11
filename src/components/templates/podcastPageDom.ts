const applePodcastPageDOM = `
<div class="podcast">
    <div class="podcast__header">
        <img class="podcast__image" src="./assets/img/tedtalksdaily.png" alt="Podcast image" />
        <div class="podcast__info">
            <h1 class="h1 podcast__title">Ted Talks Daily</h1>
            <h2 class="h2 podcast__owner">Author</h2>
            <div class="podcast__about__rr text-eclipse">
                Every weekday, TED Talks Daily brings you the latest talks in audio. Join host and
                journalist Elise Hu for thought-provoking ideas on every subject imaginable — from
                Artificial Intelligence to Zoology, and everything in between
                <span class="button_more">More</span>
            </div>
            <div class="podcast__subscribe">
                <div class="button button_bright button_latest-episode">Latest episode</div>
                <div>
                    <span class="button button_light button_follow">+ Follow</span>
                    <span class="button button_light button_actions">...</span>
                    <!-- Copy Link/Report a Concern -->
                </div>
            </div>
        </div>
    </div>
    <div class="podcast__data">
        <section class="episodes-list">
            <h3 class="h3 episodes__header">Episodes</h3>
        </section>
    </div>
</div>
`;

const spotifyPodcastPageDOM = `
<div class="podcast">
<div class="podcast__header">
    <img class="podcast__image" src="./assets/img/tedtalksdaily.png" alt="Podcast image" />
    <div class="podcast__info">
        <h1 class="h1 podcast__title">Ted Talks Daily</h1>
        <h2 class="h2 podcast__owner">Ted Talks</h2>
    </div>
</div>
<div class="podcast__subscribe_spoti">
    <div class="button button_spoti button_follow">+ Follow</div>
    <div class="button button_spoti button_actions">...</div>
    <!-- Copy Link/Report a Concern -->
</div>
<div class="podcast__data">
    <section class="podcast__list">
        <h3 class="h3 episodes__header">Episodes</h3>
    </section>

    <section class="podcast__description">
        <h3 class="h3">About</h3>
        <div class="podcast__about__text">
            Every weekday, TED Talks Daily brings you the latest talks in audio. Join host and
            journalist Elise Hu for thought-provoking ideas on every subject imaginable — from
            Artificial Intelligence to Zoology, and everything in between — given by the world's leading
            thinkers and creators. With TED Talks Daily, find some space in your day to change your
            perspectives, ignite your curiosity, and learn something new.
        </div>
    </section>
</div>
</div>
`;

export {spotifyPodcastPageDOM, applePodcastPageDOM };