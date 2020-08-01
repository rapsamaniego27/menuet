<!-- Heading -->
# :musical_score: Menuet

<!-- Description -->
**Menuet** is a Navigation Menu Factory I made to handle Website Navigations much easier. The goal of this factory is to make it completely customizable from the front and under the hood.

This is also taken from [html-webpack](https://github.com/rapsamaniego27/html-webpack) in making Micro Front End Projects. I'm currently using **Laravel Mix** and **Webpack**. 


## :notes: Getting Started
Run the npm install command on your command prompt
```
npm install
```

## :notes: Running the Command
```
npm run watch
```
### :skull: Default structure
This boilerplate default setup uses the id `#wrapper` to wrap the `#main` which contains the content and `footer` for site additional info.

<!-- Markup -->
```HTML
<div id="main">
  <div id="wrapper">
    <header>
      <!--Navigaiton menu goes here  -->
    </header>

    <div class="content">
      <!--Dynamic Content goes here  -->
    </div>
  </div>

  <footer>
    <!--Footer info goes here  -->
  </footer>
</div>
```

I'm using flex to have a sticky footer at the bottom. 
Making `#wrapper` as the flex container, `#main` to have a flex 1 and `footer` to shrink.

If you're going to put a `navigation menu` make sure put it inside the wrapper followed by the `dynamic content`.

If you want to make some edits, you may find this in `4-layout/default-structure.scss`.

## :notes: Initializing Menuet
When initializing the Menuet library, there are 4 core elements to consider.

* **nav** -  the whole *navigation body*.
* **openTrigger** - the element that triggers the navigation to *open*.
* **closeTrigger** - the element that triggers the navigation to *close*.
* **overlay** - the *overlay* of the navigation body.
* **subMenus** - the *menu parent* that contains sub menus.

Once you figured out these 4 elements.
You declare now the variables for it.

```Javascript
//Declaration
const navOpen = document.querySelector('#navOpen');
const navOverlay = document.querySelector('#navOverlay');
const nav = document.querySelector('.menu-nav-container');
const subMenus = document.querySelectorAll('.menu-item-has-children');

```

After that call or instantiate the Menuet class object, and insert the parameters for `nav`, `openTrigger`, `closeTrigger`, `overlay` and `subMenus`.

```Javascript
//Instantiate
const menuet = new Menuet({
 nav: nav,
 openTrigger: navOpen,
 closeTrigger: navOverlay,
 overlay: navOverlay,
 subMenus: subMenus
});
```
## :skull: Menuet Structure
```Javascript
class Menuet {
 constructor({nav, openTrigger, closeTrigger, overlay, subMenus}) {
   //Declaration of Variables

   //Declaration of Automatic Functions
 }

 // Properties
 
 open(){
  this.openTrigger.addEventListener('click', (e)=> {
    //Action to do when menu is opened
  }, false);
 }

 close(){
  this.closeTrigger.addEventListener('click', (e) => {
    //Action to do when menu is closed
  });
 }

 stick(){
   window.addEventListener('scroll', () => {
    //Sticky header when scrolled down

   });
 }

 checkIfSubmenu() {
   /* Checks if theres a submenu */
 }

 toggleSubmenu(e, action){
   //The action of the Submenu Toggle
 }


 isMobile(){
   //Set of if conditions to check if it is a mobile device
 }

}

```

## :notes: Under the hood of Menuet

### :musical_note: Constructor
Menuet has a constructor that passes the 4 vital elements from your front end. We also declare the `header` element and `body` for future use.

```Javascript
class Menuet {
 constructor({nav, openTrigger, closeTrigger, overlay, subMenus}) {
   this.nav = nav;
   this.openTrigger = openTrigger;
   this.overlay = overlay;
   this.closeTrigger = closeTrigger;
   this.subMenus = subMenus
   this.header = document.querySelector('header');
   this.body = document.querySelector('body');
   
 }
}
```
These are Menuet functions that automatically runs when instantiated, because it is run in the **constructor** function.
```Javascript
//Automatic runs these functions
   this.open();
   this.close();
   this.checkIfSubmenu();
```
### :musical_note: Close / Open Functions
You can modify your code in opening and closing the menu bar here.
```Javascript
 open(){
  this.openTrigger.addEventListener('click', (e)=> {
    this.nav.classList.add('menu--show');
    this.overlay.classList.add('menu-overlay--show');
    this.body.style.overflowY = 'hidden';
  }, false);
 }

 close(){
  this.closeTrigger.addEventListener('click', (e) => {
    if(e.target.classList.contains('menu-overlay')){
      this.nav.classList.remove('menu--show');
      this.closeTrigger.classList.remove('menu-overlay--show');
      this.body.style.overflowY = 'auto';
    }
    
  });
 }
```

### :musical_note: stick Function
This is optional when you choose to add a sticky navigation on top. Its completely customizable as well.

```Javascript
 stick(){
   window.addEventListener('scroll', () => {
     let fromTop = window.scrollY;
     let screenWidth = document.body.clientWidth;
     const TRIGGER_HEIGHT = 30;

    console.table([TRIGGER_HEIGHT, fromTop]);

     if (fromTop >= TRIGGER_HEIGHT) {
      this.header.classList.add('header--sticky');
     }else{
       this.header.classList.remove('header--sticky');
     }

   });
 }
```

### :musical_note: checkifSubmenu Function
This function checks if there the menu parent elements contains submenus. If there are submenus, it runs the `toggleSubmenu` function I created. 

The `action` variable detects if its mobile. If its mobile it uses the `touchstart` event which is more practical on mobile devices, or else it uses the `click` event.

You can customize the behaviour of this as well.
```Javascript
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
```

### :musical_note: toggleSubmenu Function
The action to be done when a menu that contains submenus is clicked. It toggles a hide/show class.


```Javascript
 toggleSubmenu(e, action){
    /* Assuming <a> is the clicked Element */
    const clickedElement = e.target;
    const parent = clickedElement.offsetParent;

    e.preventDefault();

    if (parent.classList.contains('menu-item-has-children')) {
      const ul = clickedElement.nextElementSibling;
      ul.classList.toggle('sub-menu--show');
    }
 }
 
```

### :musical_note: isMobile Function
Checks to see if the device/client is Mobile, then it returns `true`.
```Javascript
 /* Checks if device is mobile */
 isMobile(){
   if (navigator.userAgent.match(/Android/i) ||
     navigator.userAgent.match(/webOS/i) ||
     navigator.userAgent.match(/iPhone/i) ||
     navigator.userAgent.match(/iPad/i) ||
     navigator.userAgent.match(/iPod/i) ||
     navigator.userAgent.match(/BlackBerry/i) ||
     navigator.userAgent.match(/Windows Phone/i))

     return true;
 }
```