class SideNav {
  constructor() {
    this.showButtonEl = document.querySelector('.js-menu-show');
    this.hideButtonEl = document.querySelector('.js-menu-hide');
    this.sideNavEl = document.querySelector('.js-side-nav');
    this.sideNavContainerEl = document.querySelector('.js-side-nav-container')

    this.showSideNav = this.showSideNav.bind(this);
    this.hideSideNav = this.hideSideNav.bind(this);
    this.blockClicks = this.blockClicks.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTransitionEnd = this.onTransitionEnd.bind(this);

    this.startX = 0;
    this.currentX = 0;

    this.addEventListeners();
  }

  addEventListeners() {
    this.showButtonEl.addEventListener('click', this.showSideNav);
    this.showButtonEl.addEventListener('click', this.showSideNav);
    this.sideNavEl.addEventListener('click', this.hideSideNav);
    this.sideNavContainerEl.addEventListener('click', this.blockClicks);

    this.sideNavEl.addEventListener('touchstart', this.onTouchStart);
    this.sideNavEl.addEventListener('touchmove', this.onTouchMove);
    this.sideNavEl.addEventListener('touchend', this.onTouchEnd);
  }

  onTouchStart(e) {
    if(!this.sideNavEl.classList.contains('side-nav--visible'))
      return;

    this.startX = e.touches[0].pageX;
    this.currentX = this.startX;
  }

  onTouchMove(e) {
    this.currentX = e.touches[0].pagex;
    const translateX = Math.min(0, this.currentX - this.startX);

    if (translateX < 0) {
      console.log("touched!");  //this conditional is not being reached...why?
      e.preventDefault();
    }

    this.sideNavContainerEl.style.transform = `translateX(${translateX}px)`;
  }

  onTouchEnd(e) {
    const translateX = Math.min(0, this.currentX - this.startX);
    this.sideNavContainerEl.style.transform = '';

    if (translateX < 0) {
      this.hideSideNav();
    }
  }

  blockClicks(e) {
    e.stopPropagation();
  }

  onTransitionEnd(e) {
    this.sideNavEl.classList.remove('side-nav--animatable');
    this.sideNavEl.removeEventListener('transitionend', this.onTransitionEnd);
  }

  showSideNav() {
    this.sideNavEl.classList.add('side-nav--animatable');
    this.sideNavEl.classList.add('side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
  }

  hideSideNav() {
    this.sideNavEl.classList.add('side-nav--animatable');
    this.sideNavEl.classList.remove('side-nav--visible');
    this.sideNavEl.addEventListener('transitionend', this.onTransitionEnd);
  }
}

new SideNav();
