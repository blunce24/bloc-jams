var buildCollectionItemTemplate = function() {
   var template =
     '<div class="collection-album-container column fourth">'
   + '  <img src="assets/images/album_covers/01.png"/>'
   + '  <div class="collection-album-info caption">'
   + '    <p>'
   + '      <a class="album-name" href="/album.html"> The Colors </a>'
   + '      <br/>'
   + '      <a href="/album.html"> Pablo Picasso </a>'
   + '      <br/>'
   + '      X songs'
   + '      <br/>'
   + '    </p>'
   + '  </div>'
   + '</div>'
   ;
    
   // wrap template in a jQuery object to future-proof it
   return $(template);
};

// change window.onload to jQuery equivalent
$(window).load(function() {
    
    var $collectionContainer = $('.album-covers');
    
    // jQuery empty() method removes text and elements
    $collectionContainer.empty();
    
    for (var i = 0; i < 12; i++) {
        
        var $newThumbnail = buildCollectionItemTemplate();
        
        // jQuery append() method
        $collectionContainer.append($newThumbnail);
    }
});