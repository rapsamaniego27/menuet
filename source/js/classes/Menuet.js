/* Notes:
  <a> should always be the one clickable having a full height and width

  always use max-height to transition height
*/

class Menuet {
  constructor({
    nav,
    openTrigger,
    closeTrigger,
    overlay,
    subMenus
  }) {
    /* Arguments */
    this.nav = nav;
    this.openTrigger = openTrigger;
    this.overlay = overlay;
    this.closeTrigger = closeTrigger;
    this.subMenus = subMenus

    /* Parents */
    this.header = document.querySelector('header');
    this.body = document.querySelector('body');
    this.header = document.querySelector('.header');
    this.wrapper = document.querySelector('#wrapper');
    this.main = document.querySelector('#main');

    //Automatic runs these functions
    this.open();
    this.close();
    this.checkIfSubmenu();
    this.stick();
  }

  // Properties

  open() {
    this.openTrigger.addEventListener('click', (e) => {
      this.nav.classList.add('menu--show');
      this.closeTrigger.classList.add('menu-overlay--show');
      this.wrapper.style.overflowY = 'hidden';

    }, false);
  }

  close() {
    this.overlay.addEventListener('click', (e) => {
      if (e.target.classList.contains('menu-overlay')) {
        this.nav.classList.remove('menu--show');
        this.closeTrigger.classList.remove('menu-overlay--show');
        this.wrapper.style.overflowY = 'auto';
      }

    });
  }

  stick() {
    /* The scrollbar is in the wrapper div */
    this.wrapper.addEventListener('scroll', () => {
      let fromTop = this.wrapper.scrollTop;
      let screenWidth = document.body.clientWidth;
      const headerHeight = this.header.clientHeight;


      /* Detects if screen width is mobile or not
         then it declares a height trigger when scrolled.
      */
      const TRIGGER_HEIGHT = screenWidth > 800 ? 30 : 5;

      /* Adds fixed head and a dynamic top 
         padding for main content */
      if (fromTop >= TRIGGER_HEIGHT) {
        this.header.classList.add('header--sticky');
        /* this.main.style.paddingTop = `${headerHeight}px`; */
      } else {
        this.header.classList.remove('header--sticky');
        /* this.main.style.paddingTop = `0`; */
      }

    });
  }

  /* Check if Mobile to see what event listener to use */
  checkIfSubmenu() {
    /* Use touchstart event for Mobile,
       otherwise, use click event
    */
    const action = this.isMobile() ? 'touchstart' : 'click';

    /* Checks if theres a submenu */
    if (this.subMenus.length) {
      this.subMenus.forEach(submenu => {
        submenu = submenu.children[0];

        /* attach submenu action here */
        submenu.addEventListener(action, (e) => {
          this.toggleSubmenu(e);
        });

      });

      console.log('Theres Submenus');
    } else {
      console.warn('No Submenus');
    }

  }

  toggleSubmenu(e) {
    /* Assuming <a> is the clicked Element */
    const clickedElement = e.target;
    const parent = clickedElement.offsetParent;

    e.preventDefault();

    if (parent.classList.contains('menu-item-has-children')) {
      const ul = clickedElement.nextElementSibling;
      ul.classList.toggle('sub-menu--show');
    }
  }

  /* Checks if device is mobile */
  isMobile() {
    if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i))

      return true;
  }

}