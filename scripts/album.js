var setSong = function(songNumber) {
    if (currentSoundFile) {
        currentSoundFile.stop();
    }
    
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
    
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
    
    setVolume(currentVolume);
};

var setVolume = function(volume) {
    if (currentSoundFile) {
        currentSoundFile.setVolume(volume);
    }
};

var getSongNumberCell = function(number) {
    return $('.song-item-number[data-song-number="' + number + '"]');
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
        var songNumber = parseInt($(this).attr('data-song-number'));
          
        if (currentlyPlayingSongNumber !== null) {
            var currentlyPlayingSongElement = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingSongElement.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) {
            $(this).html(pauseButtonTemplate);
            setSong(songNumber);
            currentSoundFile.play();
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
            if (currentSoundFile.isPaused()) {
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton); 
                currentSoundFile.play();
            } else {
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton); 
                currentSoundFile.pause();
            }
        } 
        
     }; 

     var onHover = function(event) {
         var songItem = $(this).find('.song-item-number');
         var songItemNumber = parseInt(songItem.attr('data-song-number'));
         if (songItemNumber !== currentlyPlayingSongNumber) {
             songItem.html(playButtonTemplate);
         }
     };
     var offHover = function(event) {
         var songItem = $(this).find('.song-item-number');
         var songItemNumber = parseInt(songItem.attr('data-song-number'));
         if (songItemNumber !== currentlyPlayingSongNumber) {
             songItem.html(songItemNumber);
         }
         console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
     };
    
     // similar to querySelector()
     $row.find('.song-item-number').click(clickHandler);
    
     // combines mouseover and mouseleave functions
     $row.hover(onHover, offHover);
    
     // created with the event listeners attached
     return $row;
 };

 var setCurrentAlbum = function(album) {
     currentAlbum = album;
     
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

var trackIndex = function(album, song) {
    return album.songs.indexOf(song);
};

var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
};

var nextSong = function() {
    
    // know what previous song is and wrap around
    var getLastSongNumber = function(i) {
        if (i == 0) {
            return currentAlbum.songs.length;
        } else {
            return i;
        }
    };
    
    // use trackIndex to get index of current song, then increment
    var index = trackIndex(currentAlbum, currentSongFromAlbum);
    index++;
    
    // wrap songs - control for last song in list
    if (index >= currentAlbum.songs.length) {
        index = 0;
    }
    
    // set a new CurrentlyPlayingSongNumber and currentSongFromAlbum
    setSong(index + 1);
    
    currentSoundFile.play();
    
    // update player bar
    updatePlayerBarSong();
    
    // update HTML of previous song to number and current song to pause button
    var lastSongNumber = getLastSongNumber(index);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};

var previousSong = function() {
    
    // know what previous song is and wrap around
    var getLastSongNumber = function(i) {
        if (i == (currentAlbum.songs.length - 1)) {
            return 1;
        } else {
            return i + 2;
        }
    };
    
    // decrement in this case
    var index = trackIndex(currentAlbum, currentSongFromAlbum);
    index--;
    
    if (index < 0) {
        index = currentAlbum.songs.length - 1;
    }

    setSong(index + 1);
    
    currentSoundFile.play();

    updatePlayerBarSong();
    
    var lastSongNumber = getLastSongNumber(index);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
};


// album button
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

 $(document).ready(function() {
     setCurrentAlbum(albumPicasso);  
     $previousButton.click(previousSong);
     $nextButton.click(nextSong);
 });