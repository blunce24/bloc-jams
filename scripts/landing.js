var animatePoints = function() {
    
    var revealPoint = function() {
        // jQuery selection of .point and use of css() method
        $(this).css({
            opacity: 1,
            // jQuery compatible with most browsers
            transform: 'scaleX(1) translateY(0)'
        });
    };
    
    // revealPoint doesn't need an argument and replace for loop with $.each()
    $.each($('.point'), revealPoint);
};
 

// add $() to convert window to jQuery object
$(window).load(function() {
    // for large screens
    // update .innerheight to jQuery height()
    if ($(window).height() > 950) {
        animatePoints();
    }
    
    // replace getBoundingClientRect() with jQuery offset()
    var scrollDistance = $('.selling-points').offset().top - $(window).height() + 200;
    
    $(window).scroll(function(event) {
        if ($(window).scrollTop() >= scrollDistance) {
            animatePoints();
        }
    });
});