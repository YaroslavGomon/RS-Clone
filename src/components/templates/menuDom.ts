const menuDOM = `
    <div class="menu__inner">
      <a class="menu__link" href="/#home">
        <span class="menu__logo"></span>
        <h1 class="h1 menu__title">Podcasts</h1>
      </a>
      <input class="menu__search search" type="search" placeholder="Search">
      <nav class="menu__nav">
        <ul class="menu__list">
          <a class="menu__item active" href="/#home">
            <span class="menu__item-logo home"></span>
            <p class="menu__item-text">Home</p>
          </a>
          <a class="menu__item" href="/#library">
            <span class="menu__item-logo library"></span>
            <p class="menu__item-text">Library</p>
          </a>
        </ul>
      </nav>
    </div>
`;

export default menuDOM;
