var animatePoints = function() {
    var points = document.getElementsByClassName('point');
            
    var revealPoint = function(i) {
        points[i].style.opacity = 1;
        points[i].style.transform = "scaleX(1) translateY(0)";
        points[i].style.mstransform = "scaleX(1) translateY(0)";
        points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
    }
    
    for (var j = 0; j < points.length; j++) {
        revealPoint(j);
    }
                
};
            
