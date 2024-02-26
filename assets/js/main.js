/**
 * Abidon - 
 * @author Webestica (https:)
 * File Description : Main JS file of the template 
 **/

(function($) {

	"use strict";

	$(window).on('load', function() {
		$(".preloader .preloader-wrap").animate({
			opacity: 0,
			top:-100,
		}, 400, function() { 
			$(".preloader").slideUp(800, "easeInOutExpo");
		});
	});		

	// IMAGE ADD FROM DATA SRC
	$('[data-img-src]').each(function() {
		var Url = $(this).data('img-src');
		$(this).css('background-image', 'url('+Url+')');
	});


    /*═════HEADER SCRIPTS═════*/
    $(".nav_toggle_btn").on("click", function() {
        var ToggleWrap = $(this).data('toggle');
        $(ToggleWrap).slideToggle("500", "easeInOutExpo");
        $(this).toggleClass('open');
    });

    $(window).on('resize', function() {
        var WinWidth = $(this).width();
        $(".nav_toggle_btn").removeClass('open');
        $('.nav_toggle_btn').each(function() {
            var ToggleWrap = $(this).data('toggle');
            if (WinWidth < 991) {
                $(ToggleWrap).css('display', 'none');
                $('.navbar-nav ul').css('display', 'none');
            } else {
                $(ToggleWrap).css('display', '');
                $('.navbar-nav ul').css('display', '');
            }
        });
    });

    $('.header-area .navbar-nav ul').each(function(){
        var HasDropDown = $(this).parent('li');
        if ($(this).find('.dropdown-arrow').length === 0){
            HasDropDown.append('<button class="dropdown-btn"></button>');
            $(this).prev('.nav-link').addClass('dropdown-link');
        }
    });

    $('.navbar-nav .dropdown-btn').on("click", function() {
	    var dropDown = $(this).parent('li').children('ul');
	    dropDown.slideToggle("500", "easeInOutExpo");
	    $(this).toggleClass('active-dropdown');
    });


    $(".toggle-lg-search").on('click', function() {
    	$('.search-box-wrap').slideToggle(600, "easeInOutExpo"); 
    });


	/*═════HERO SLIDE SCRIPTS═════*/
	var interleaveOffset = 0.4;
	new Swiper('.hero-slide-container', {
		loop: true,
		speed:1200,     
		grabCursor: true,
		watchSlidesProgress: true,
		mousewheelControl: true,  
		keyboardControl: true,
		resistance : true, 
		resistanceRatio : 0.5, 
		parallax:true,
		pagination: {
          el: ".hero-pagination",
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '" data-index="0'+(index + 1)+'">0' + (index + 1) + "</span>";
          },
        },
		on: { 
			progress: function() {
			  var swiper = this;
			  for (var i = 0; i < swiper.slides.length; i++) {
			    var slideProgress = swiper.slides[i].progress;
			    var innerOffset = swiper.width * interleaveOffset;
			    var innerTranslate = slideProgress * innerOffset;
			    swiper.slides[i].querySelector(".slide_bg").style.transform =
			      "translate3d(" + innerTranslate + "px, 0, 0)";
			  }      
			},
			touchStart: function() {
			  var swiper = this;
			  for (var i = 0; i < swiper.slides.length; i++) {
			    swiper.slides[i].style.transition = "";
			  }
			},
			setTransition: function(speed) {
			  var swiper = this;
			  for (var i = 0; i < swiper.slides.length; i++) {
			    swiper.slides[i].style.transition = speed + "ms"; 
			    swiper.slides[i].querySelector(".slide_bg").style.transition = speed + "ms";   
			  }
			}
		}
	}); 


	// Accourdion

    $('.accordion-wrapper').each(function() {
    	$(this).find('.accordion-item:eq(0) .accordion-title').addClass('active').next().slideDown(); 
    });

    $('.accordion-wrapper .accordion-title').click(function(j) {
	    var dropDown = $(this).closest('.accordion-item').find('.accordion-body');

	    $(this).closest('.accordion-wrapper').find('.accordion-body').not(dropDown).slideUp();

	    if ($(this).hasClass('active')) {
	        $(this).removeClass('active');
	    } else {
	        $(this).closest('.accordion-wrapper').find('.accordion-title.active').removeClass('active');
	        $(this).addClass('active');
	    }

	    dropDown.stop(false, true).slideToggle();

	    j.preventDefault();
    });


	/* Progress bar scripts */

   // Remove svg.radial-progress .complete inline styling
    $('svg.radial-progress').each(function( index, value ) {
        $(this).find($('circle.complete')).removeAttr( 'style' );
    });

    // Activate progress animation on scroll
    $(window).on("scroll", function(){ 
        $('svg.radial-progress').each(function( index, value ) { 
            if ( 
                $(window).scrollTop() > $(this).offset().top - ($(window).height() * 0.75) &&
                $(window).scrollTop() < $(this).offset().top + $(this).height() - ($(window).height() * 0.25)
            ) {
                // Get percentage of progress
                var percent = $(this).parent('.circle-progress').data('percentage');
                // Get radius of the svg's circle.complete
                var radius = $(this).find($('circle.complete')).attr('r');
                // Get circumference (2πr)
                var circumference = 2 * Math.PI * radius;
                // Get stroke-dashoffset value based on the percentage of the circumference
                var strokeDashOffset = circumference - ((percent * circumference) / 100);
                // Transition progress for 1.25 seconds
                $(this).find($('circle.complete')).animate({'stroke-dashoffset': strokeDashOffset}, 1250);
            }

        });
    }).trigger('scroll'); 


    $('.circle-progress').each(function() {
    	$(this).append('<span class="percentage">'+$(this).data('percentage')+'<small>%</small></span>');
    });



	// isotop
	$(".portfolio-list").imagesLoaded(function () { 
		// init Isotope
		var $grid = $(".portfolio-list").isotope({
			itemSelector: ".grid-item",
			percentPosition: true,
			masonry: {
				columnWidth: '.grid-item'
			}
		});
		// filter items on button click
		$(".portfolio-menu").on("click", "button", function () {
			var filterValue = $(this).attr("data-filter");
			$grid.isotope({ filter: filterValue });
		});

		//for menu active class
		$(".portfolio-menu button").on("click", function (event) {
			$(this)
				.siblings(".active")
				.removeClass("active");
			$(this).addClass("active");
			event.preventDefault();
		});
	});


	// PORTFOLIO-SLIDE
	new Swiper(".portfolio-slide", {
		slidesPerView: 4,
		spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            600: {
                slidesPerView: 2,
                spaceBetween: 10
            },
            990: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1400: {
                slidesPerView: 4,
                spaceBetween: 30
            }

        }
	});


	/*-----SLIDE SCRIPS-----*/
	new Swiper(".testimonial-slide", {
		slidesPerView: 1,
	});

	/*-----SLIDE SCRIPS-----*/
	new Swiper(".testimonial-slide-2", {
		slidesPerView: 3,
		spaceBetween: 20,
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            1200: {
                slidesPerView: 3,
                spaceBetween: 20
            }

        }
	});

	// PARALLAX SCRIPTS
	$(".parallax-bg").each(function() {
		jarallax($(this),{
			speed: 0.2
		})
	});
	$(".parallax-img").each(function() {
		jarallax($(this),{
			speed: 0.7
		})
	});


	// Custom Tabs

	$('.custom-tab-nav a').on('click', function(event) {

		event.preventDefault();

		$('.custom-tab-wrapper .tab-item').removeClass('active');
		$('.custom-tab-nav a').removeClass('active');

		var getID = $(this).attr('href');

		$(this).addClass('active');
		$(getID).addClass('active');
		
	});


})(jQuery); 

// Back to Top progress
!(function (s) { 
    "use strict"; 
    	if(s(".btt-progress-wrap").length){
	        s(document).ready(function () {
	            var e = document.querySelector(".btt-progress-wrap path"),
	                t = e.getTotalLength();
	            (e.style.transition = e.style.WebkitTransition = "none"),
	                (e.style.strokeDasharray = t + " " + t),
	                (e.style.strokeDashoffset = t),
	                e.getBoundingClientRect(),
	                (e.style.transition = e.style.WebkitTransition = "stroke-dashoffset 10ms linear");
	            var o = function () {
	                var o = s(window).scrollTop(),
	                    r = s(document).height() - s(window).height(),
	                    i = t - (o * t) / r;
	                e.style.strokeDashoffset = i;
	            };
	            o(), s(window).scroll(o);
	            jQuery(window).on("scroll", function () {
	                jQuery(this).scrollTop() > 600 ? jQuery(".btt-progress-wrap").addClass("active-progress") : jQuery(".btt-progress-wrap").removeClass("active-progress");
	            }),
	                jQuery(".btt-progress-wrap").on("click", function (s) {
	                    return s.preventDefault(), jQuery("html, body").animate({ scrollTop: 0 },1500, "easeInOutExpo"), !1;
	                });
	        });
        } 
})(jQuery); 