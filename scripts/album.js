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

var albumEdison = {
     title: 'The Lightbulb',
     artist: 'Thomas Edison',
     label: 'Electric',
     year: '1879',
     albumArtUrl: 'assets/images/album_covers/06.png',
     songs: [
         { title: 'Electric Avenue', duration: '3:51' },
         { title: 'All of the Lights', duration: '4:21' },
         { title: 'Electric Feel', duration: '3:11'},
         { title: 'Blinded by the Light', duration: '5:15' },
         { title: 'She\'s Electric', duration: '2:45'}
     ]
 };

var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
     return template;
 };

 var setCurrentAlbum = function(album) {
     
     // select all HTML elements required to display album page
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 
     // assign corresponding values of album objects' properties to those HTML elements
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // clear the album song list HTML to prevent interference
     albumSongList.innerHTML = '';
 
     // loops through all the songs from an album and inserts them into the HTML
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };
 
var albumCover = document.getElementsByClassName('album-cover-art')[0];

 window.onload = function() {
     setCurrentAlbum(albumPicasso);
     albumCover.addEventListener('click', function(event) {
         var albumTitle = document.getElementsByClassName('album-view-title')[0];
         if (albumTitle.firstChild.nodeValue === "The Colors") {
             setCurrentAlbum(albumMarconi);
         } else if (albumTitle.firstChild.nodeValue === "The Telephone") {
             setCurrentAlbum(albumEdison);
         } else if (albumTitle.firstChild.nodeValue === "The Lightbulb") {
             setCurrentAlbum(albumPicasso);
         }
     });
 };