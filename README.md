#Bouncies

A tiny jQuery plugin to make dom elements bounce around the window.

No license. Do what you want with this.
Creator: [Tim Farland](https://github.com/twfarland)


### Basic usage

Html:
```html
<div id="items">
    <a href="/bleh">bleh</a>
    <a href="/blah">blah</a>
    <a href="/yo">yo</a>
</div>
```

Css:
```css    
/* items must be absolutely positioned, and have width and height */
#items a {
    position: absolute;
    display: block;
    border: 1px solid #ff0000;
    width: 100px;
    height: 100px;
}
```    

Js:
```html
<script src="jQuery.js"></script>
<script src="bouncies.js"></script>
<script>
(function ($) {
    $('#items a').bouncies(); // each item selected will become bouncy
})(jQuery);
</script>  
```     

If the user resizes or scrolls the window, the bounce boundaries will change. Any elements outside the bounds will bounce back.

See `bouncies.html` in this repo for a full example;


### Custom config

Pass an options object to customise the behaviour:

```javascript
$('#items a').bouncies({

    // The frame rate in milliseconds
    rate: 40, 

    // The minimum/maximum pixels moved per frame
    minSpeed: 2, 
    maxSpeed: 5,

    /* 
    Triggered when an element bounces. Receives the bouncing object, e.g:
       { 
           el: jQuery object, 
           l:  left offset in pixels, 
           t:  top offset in pixels,
           r:  right extent in pixels, 
           b:  bottom extent in pixels, 
           vx: x velocity in pixels per frame,
           vy: y velocity in pixels per frame
       }
    */   
    onBounce: function (i) { 
        i.el.css({ background: 'rgba(0, 255, 0, 0.5)'});
        window.setTimeout(function () { i.el.css({ background: 'none'}) }, 1000);
    }
});
```    


### Control after initialisation

The `bouncies` method returns some useful access points:

```javascript
var bouncyObj = $(selector).bouncies();

// Stop and resume animation
bouncyObj.stop();
bouncyObj.start();

// Access an array of all items
console.log(bouncyObj.items);

// The jQuery selector
console.log(bouncyObj.el);

```