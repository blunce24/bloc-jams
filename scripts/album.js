// Examples of albums

var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21' },
        { title: 'Magenta', duration: '2:15' }
    ]
};

var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     var $row = $(template);
    
      var clickHandler = function() {
        var $songItemNumber = $(this).attr('data-song-number');
         
        if (currentlyPlayingSong === null) {
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = $songItemNumber;
        } else if (currentlyPlayingSong === $songItemNumber) {
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        } else if (currentlyPlayingSong !== $songItemNumber) {
            var $currentlyPlayingSongElement = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            $currentlyPlayingSongElement.html(currentlyPlayingSong);
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = $songItemNumber;
        }
     }; 

     var onHover = function(event) {
         var $songItem = $(this).find('.song-item-number');
         if ($songItem.attr('data-song-number') !== currentlyPlayingSong) {
             $songItem.html(playButtonTemplate);
         }
     };
     var offHover = function(event) {
         var $songItem = $(this).find('.song-item-number');
         var $songItemNumber = $songItem.attr('data-song-number');
         if ($songItemNumber !== currentlyPlayingSong) {
             $songItem.html($songItemNumber);
         }
     };
    
     // similar to querySelector()
     $row.find('.song-item-number').click(clickHandler);
    
     // combines mouseover and mouseleave functions
     $row.hover(onHover, offHover);
    
     // created with the event listeners attached
     return $row;
 };

 var setCurrentAlbum = function(album) {
     
     // select all HTML elements required to display album page
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
 
     // assign corresponding values of album objects' properties to those HTML elements
     // jQuery text() method replaces content of text nodes
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     // jQuery's attr() method changes element attribute
     $albumImage.attr('src', album.albumArtUrl);
 
     // clear the album song list HTML to prevent interference
     $albumSongList.empty();
 
     // loops through all the songs from an album and inserts them into the HTML
     for (var i = 0; i < album.songs.length; i++) {
         var $newRow = createSongRow(i+1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };

// album button
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

// set currently playing song to null to start
var currentlyPlayingSong = null;

// events
 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);  
 });