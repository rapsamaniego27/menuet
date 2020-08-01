const navOpen = document.querySelector('#navOpen');
const navOverlay = document.querySelector('#navOverlay');
const nav = document.querySelector('.menu-nav-container');
const subMenus = document.querySelectorAll('.menu-item-has-children');

//Instantiate
const menuet = new Menuet({
 nav: nav,
 openTrigger: navOpen,
 closeTrigger: navOverlay,
 overlay: navOverlay,
 subMenus: subMenus
});

//Display output
