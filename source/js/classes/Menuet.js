/* Notes:
  <a> should always be the one clickable having a full height and width

  always use max-height to transition height
*/

class Menuet {
 constructor({nav, openTrigger, closeTrigger, overlay, subMenus}) {
   this.nav = nav;
   this.openTrigger = openTrigger;
   this.overlay = overlay;
   this.closeTrigger = closeTrigger;
   this.subMenus = subMenus
   this.header = document.querySelector('header');
   this.body = document.querySelector('body');
   
   //Automatic runs these functions
   this.open();
   this.close();
   this.checkIfSubmenu();
 }

 // Properties
 
 open(){
  this.openTrigger.addEventListener('click', (e)=> {
    this.nav.classList.add('menu--show');
    this.overlay.classList.add('menu-overlay--show');
    this.body.style.overflowY = 'hidden';
    
  }, false);
 }

 close(){
  this.overlay.addEventListener('click', (e) => {
    if(e.target.classList.contains('menu-overlay')){
      this.nav.classList.remove('menu--show');
      this.overlay.classList.remove('menu-overlay--show');
      this.body.style.overflowY = 'auto';
    }
    
  });
 }

stick() {
  window.addEventListener('scroll', () => {
    let fromTop = window.scrollY;
    let screenWidth = document.body.clientWidth;
    const TRIGGER_HEIGHT = 30;

    console.table([TRIGGER_HEIGHT, fromTop]);

    if (fromTop >= TRIGGER_HEIGHT) {
      this.header.classList.add('header--sticky');
    } else {
      this.header.classList.remove('header--sticky');
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
   if(this.subMenus.length){
     this.subMenus.forEach(submenu => {
       submenu = submenu.children[0];

       /* attach submenu action here */
       submenu.addEventListener(action, (e) => {
         this.toggleSubmenu(e);
       });

     });

    console.log('Theres Submenus');
   }else{
     console.warn('No Submenus');
   }

 }

 toggleSubmenu(e, action) {
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


