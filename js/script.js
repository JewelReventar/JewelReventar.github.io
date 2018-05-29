$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) { 
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  

  var piesiteFired = 0;
$(document).ready(function() {
    var $win = $(window),
        $win_height = $(window).height(),
        // - A multiple of viewport height - The higher this number the sooner triggered.
        windowPercentage = $(window).height() * 0.9;
    $win.on("scroll", scrollReveal);
    function scrollReveal() {
        var scrolled = $win.scrollTop();

        ///////////////////////////////////////
        // Bar Charts scroll activate, looking for .trigger class to fire.
        $(".trigger").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (
                scrolled + windowPercentage > offsetTop ||
                $win_height > offsetTop
            ) {
                $(this).each(function(key, bar) {
                    var percentage = $(this).data("percentage");
                    $(this).css("height", percentage + "%");

                    ///////////////////////////////////////
                    //        Animated numbers
                    $(this)
                        .prop("Counter", 0)
                        .animate(
                            {
                                Counter: $(this).data("percentage")
                            },
                            {
                                duration: 2000,
                                easing: "swing",
                                step: function(now) {
                                    $(this).text(Math.ceil(now));
                                }
                            }
                        );
                    //        Animated numbers
                    ///////////////////////////////////////
                });
            } else {
                ///////////////////////////////////////
                // To keep them triggered, lose this block.
                $(this).each(function(key, bar) {
                    $(this).css("height", 0);
                });
            }
        });

        ///////////////////////////////////////
        // Horizontal Chart
        $(".chartBarsHorizontal .bar").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (
                scrolled + windowPercentage > offsetTop ||
                $win_height > offsetTop
            ) {
                $(this).each(function(key, bar) {
                    var percentage = $(this).data("percentage");
                    $(this).css("width", percentage + "%");
                    ///////////////////////////////////////
                    //        Animated numbers
                    $(this)
                        .prop("Counter", 0)
                        .animate(
                            {
                                Counter: $(this).data("percentage")
                            },
                            {
                                duration: 2000,
                                easing: "swing",
                                step: function(now) {
                                    $(this).text(Math.ceil(now));
                                }
                            }
                        );
                    //        Animated numbers
                    ///////////////////////////////////////
                });
            } else {
                ///////////////////////////////////////
                // To keep them triggered, lose this block.
                $(this).each(function(key, bar) {
                    $(this).css("width", 0);
                });
            }
        });

        ///////////////////////////////////////
        // Pie Charts - scroll activate
        $(".piesite").each(function() {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (
                scrolled + windowPercentage > offsetTop ||
                $win_height > offsetTop
            ) {
                if (piesiteFired == 0) {
                    timerSeconds = 3;
                    timerFinish = new Date().getTime() + timerSeconds * 1000;
                    $(".piesite").each(function(a) {
                        pie = $("#pie_" + a).data("pie");
                        timer = setInterval(
                            "stoppie(" + a + ", " + pie + ")",
                            0
                        );
                    });
                    piesiteFired = 1;
                }
            } else {
                // To keep them triggered, lose this block.
                $(".piesite").each(function() {
                    piesiteFired = 0;
                });
            }
        });
    }
    scrollReveal();
});
  


