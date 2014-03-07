// BOUNCIES jQuery plugin by Tim Farland https://github.com/twfarland
// Git repo: https://github.com/twfarland/bouncies
// Makes selected elements bounce around the screen
// Usage: 
// $(selector).bouncies();
// $(selector).bouncies({ rate: 30, minSpeed: 5, maxSpeed: 10, onBounce: function (el) { }}});

(function ($) {


	var $w = $(window), $d = $(document),
		top = 0, left = 0, btm = 0, right = 0;
	

	function setBounds () {
        top   = $d.scrollTop(); 
        btm   = top + $w.outerHeight();
        right = $w.outerWidth();
    }


    // update bounds when window resized or scrolled
    $w.on({ resize: setBounds, scroll: setBounds });


	// plugin
	$.fn.bouncies = function (o) {

		var o = o || {}, items = [], k, len, loop, self;
		var speed = (o.maxSpeed || 8) - (o.minSpeed || 2), rate = o.rate || 30, bounce = o.onBounce;


		// initial bounds setup
		setBounds();	


		// generate initial items and their states
		this.each(function (k, e) { 

			var el = $(e);
			var w  = el.outerWidth(),
				h  = el.outerHeight(),
				l  = Math.floor(Math.random() * (right - w)),
				t  = Math.floor(Math.random() * (btm - h));

			items.push({
				el: el,
				l:  l, t: t, r: l + w, b: t + h, 
				vx: Math.ceil(Math.random() * speed), // x velocity
				vy: Math.ceil(Math.random() * speed) // y velocity
			}); 

			len = items.length;
		});


		// move items
		function move () {

			for (k = 0; k < len; k++) {

				i = items[k];

	    		// if past or passing bounds and moving further out of bounds, bounce item back and trigger onBounce() if it exists
	    		if ((i.t + i.vy < top  && i.vy < 0) || (i.b + i.vy > btm   && i.vy > 0)) i.vy = -i.vy, bounce && bounce(i);
	    		if ((i.l + i.vx < left && i.vx < 0) || (i.r + i.vx > right && i.vx > 0)) i.vx = -i.vx, bounce && bounce(i);

	    		// change position by velocity in item object and in dom
	    		i.l += i.vx; i.r += i.vx; i.t += i.vy; i.b += i.vy;
	    		i.el.css({ left: i.l, top: i.t });
	    	}

	    }
		

		self = {
			el:    this,
			items: items,
			stop:  function () { window.clearInterval(loop); return self; },
			start: function () { loop = window.setInterval(move, rate); return self; }
		};

		return self.start();
	};


})(jQuery);