/* 
	rafael.js
	LM: 02-17-2015
	Author: Rafael Gandionco
		
		    __         __
           /.-'       `-.\
          //             \\
         /j_______________j\
        /o.-==-. .-. .-==-.o\
        ||      )) ((      ||
         \\____//   \\____//   
          `-==-'     `-==-'
*/
jQuery(function ($) {
	if (typeof window.IS_IE6 !== "undefined") { // no to ie6
		$('div.page_container').fadeIn('slow');
		return;		
	}
	/** /
	$(document).on('click', function (e) {
		console.log('x='+e.pageX+', '+'y='+e.pageY);
	});
	/**/
	
	// load the dancing chicken right away because 
	// he is awesome!
	$(['images/dancing_chicken.gif']).preload();	
	
	// to disallow navigation key pressing
	$(document).on('keypress', function (e) {
		if (e.which === 0) {
			e.preventDefault();
			return false;
		}
	}); 
	
	var $w = $(window),
		windowWidth = $w.width(),
		windowHeight = $w.height(),
		scrollToOpt = {
			easing:'easeOutCubic'
		},
		$pageContainer = $('div.page_container'),
		$page = {
			_1 : $('#page_1'),
			_2 : $('#page_2'),
			_3 : $('#page_3'),
			_4 : $('#page_4'),
			_5 : $('#page_5')
		},
		hash = $.trim(window.location.hash).replace('#',''),
		$dancingChicken = $('#weapons_loading_con'),
		$contactUsOtherLinksCon = $('#contactus_other_links');
		
	// This function calls the Particles class to do the cool particle animation
	// that starts on site load and also does the calculation for the direction
	// of the animation. It takes a callback fucntion as a parameter, which it 
	// calls when the particle animation is finished.
	var _doOnloadParticleAnimation = function (_f) {
		// LM: 02-02-12 [add particle animation onload]
		//  check if CSS3 transistion is available //
		if (window.supportsTransitions()) {	// See: http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr		
			var w = $pageContainer.width(),
				xpos = Math.floor(w / 30), // divide the page with into 30 positions
				cnt = 1;
			(function loop() {
				var x1 = xpos * cnt, // particle from left to right
					x2 = w-x1, // particle from right to left
					y = 250; // fixed y position
				if (cnt <= 18) {
					// VERY COOL PARTICLE ANIMATION FTW!
					// See: http://joelongstreet.com/blog/tag/css-effects/
					var p1 = new Particles(x1, y), // ltr
						p2 = new Particles(x2, y); // rtl
					cnt++;
					setTimeout(loop, 100);
				}
				else { _f(); } 			
			})();
		}
		else { _f(); } // when browser does not support css3 transitions then execute callback right away	
	};
	
	// set width of the screen to the page container //	
	$pageContainer.css({
		width : windowWidth+'px',
		height : windowHeight+'px'
	});
	
	// do the colorful particle animation on load //
	_doOnloadParticleAnimation(function () {
		$pageContainer.fadeIn('slow');
	});
	
	// show naviation menu //
	$('#main_navigation_con').animate({
		'bottom' : '10px'
	}, 1e3, 'easeInOutElastic');
	
	// set the height for the web projects div container //
	$('div.proj_container').css({			
		height : (windowHeight - 10)+'px'
	});
	
	// This is the function that does the page navigation scroll animation.
	// Expose this function to the global scope, so that it can be used by
	// dirty html inline event handlers
	window.navigate = function (thiss) {
		var page = $.trim(
			(typeof thiss === 'string')
				? thiss
				: thiss.getAttribute('data-raf-page')
		),
		$projMsg = $('#proj_msg');
		$projMsg.stop().hide();
		$dancingChicken.hide();
		$contactUsOtherLinksCon.stop().animate({ // animate out other links from contact us
			right: '-500px'
		},1e3);
		if (page === '_3') { // scroll the projects page to the top for it to start from the top
			$projMsg.fadeIn('slow').delay(4e3).fadeOut('slow'); // show projects message
			$('div.proj_container').scrollTop(0);
		}
		else if (page === '_4') {
			$('#flickr_photos_con').scrollTo(0,800);
		}
		else if (page === '_2') {
			if ($('#weapons').attr('data-raf-showchicken') === 'yes') {
				$dancingChicken.show(); // dance chicken..dance!
			}		
		}
		else if (page === '_5') { // contact us page
			$contactUsOtherLinksCon.stop().animate({ // animate other links in the page
				right: '55px'
			},1e3, 'easeInOutElastic');
		}		
		$w.scrollTo($page[page], 800, scrollToOpt);			
		window.location.hash = page;
	};				
	
	$('a.nav_link').on('mousedown', function (e) {
		e.preventDefault();
		navigate(this);
		$('a.nav_link').removeClass('active_nav');
		$(this).addClass('active_nav');
		return false;
	}).on('click',false);	

	// check hash //
	if (hash !== '') {
		if ($page[hash]) {
			$('a[data-raf-page="'+hash+'"]').trigger('mousedown');
		}
	}
		
	// Load images only when scrolled
	// See: https://github.com/protonet/jquery.inview
	$(document).on('inview', 'img[data-raf-src]', function (e) {
		var $this = $(this);
		$this.attr("src", $this.attr("data-raf-src")).hide().load(function () {
			$(this).fadeIn('slow'); // image fadin effect, just like mashable...				
		});
		// Remove it from the set of matching elements in order to avoid re-executing the handler
		$this.removeAttr("data-raf-src");			
	});	
	
	// preload some images //
	setTimeout(function () {			
		$([
			'images/weapons/jquery.png',
			'images/weapons/html5.png',
			'images/weapons/npp.jpg',
			'images/weapons/bc.jpg',
			'images/weapons/ci.jpg',
			'images/weapons/mysql.jpg',
			'images/social_icons/fb.png',
			'images/social_icons/flickr.png'
		]).preload();
	}, 0);
	
	// WEB PROJECTS PAGE //
	(function () {
		var proj_li_tpl = document.getElementById('proj_tpl').innerHTML,
			html = '',
			$ul = $('#quad'),
			// ie 7 and 8 doesn't seem to cache this images properly so add a cache buster for ie 7 and 8  
			cacheBuster = (typeof IS_OLDIE !== 'undefined') ? ('?'+(new Date()).getTime()) : ''; 
		// get projects data then populate list	
		$.getJSON('js/projects.json', function (data) {				
			$.each(data, function (i, proj) {
				html += t(proj_li_tpl, {
					'header' : proj.header,
					'link' : proj.link,
					'img' : 'images/proj/'+proj.image + cacheBuster
				});
			});
			$ul.html(html);											
		});
		// See: http://www.jcargoo.org/2009/08/overlay-text-over-image-with-very.html
		$ul.on('mouseenter mouseleave', 'div.wrap', function (e) {
			var $this = $(this);
			if (e.type === 'mouseenter') {
				if ($this.children('img').is(':visible')) {
					$this.children('.comment').stop().css({
						"top" : '0px',
						"opacity" : 0.9
					});
				}					
			}
			else {
				$this.children('.comment').stop().animate({
					"top": '400px',
					"opacity" : 0.1
				}, 800, 'easeOutBounce');
			}				
		});			
	})();
	
	// PHOTOGRAPHY PAGE //
	(function () {
		// LM: 02-17-2015
		// Removed flickr API script
	})();		
	
	// WEAPONS PAGE //
	(function () {
		var cnt = 1; // Lechon :9
		$('#weapons').find('img').load(function () {
			if (cnt === 6) {
				$dancingChicken.hide();
				$('#weapons').attr('data-raf-showchicken', 'no');
				return;
			}
			cnt++;
		});
	})();

	// CONTACT ME PAGE //
	var origSize = '118px';
	$('div.social').find('img').css({width:origSize,height:origSize}).on('mouseenter mouseleave', function (e) {
		var $me = $(this);
		if (e.type === 'mouseenter') {
			$me.stop().animate({
				width: '+=10px',
				height: '+=10px'
			}, 400, 'easeOutElastic');
		}
		else {
			$me.stop().animate({
				width: origSize,
				height: origSize
			}, 800, 'easeOutElastic');
		}
	});
	
	// make external links open in a new tab/window
	$('a[rel=external]').attr('target','_blank');
	// remove the annoying dashed border on a link after it is clicked
	$(document).on('focus', 'a', function () {this.blur();});
	document.documentElement.className = 'desktop';	
});