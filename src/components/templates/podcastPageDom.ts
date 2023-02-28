const applePodcastPageDOM = `
<div class="podcast">
    <div class="podcast__header">
        <img class="podcast__image"/>
        <div class="podcast__info">
            <h1 class="h1 podcast__title"></h1>
            <h2 class="h2 podcast__owner"></h2>
            <div class="podcast__about__rr text-eclipse">
                <span class="button_more"></span>
            </div>
            <div class="podcast__subscribe">
                <div class="button button_bright button_latest-episode"></div>
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
    <img class="podcast__image"/>
    <div class="podcast__info">
        <h1 class="h1 podcast__title"></h1>
        <h2 class="h2 podcast__owner"></h2>
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
        </div>
    </section>
</div>
</div>
`;

export {spotifyPodcastPageDOM, applePodcastPageDOM };
