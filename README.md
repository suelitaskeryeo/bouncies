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
```javascript
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

    $('#items a').bouncies({

        rate: 40, // The frame rate in milliseconds

        minSpeed: 2, // The minimum pixels moved per frame
        maxSpeed: 5, // The maxiumum pixels moved per frame

        onBounce: function (i) { // Triggered when an element bounces. Receives the bouncing object
            i.el.css({ background: 'rgba(0, 255, 0, 0.5)'});
            window.setTimeout(function () { i.el.css({ background: 'none'}) }, 1000);
        }
    });