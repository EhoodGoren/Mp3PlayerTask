const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {  //logs the info about a song
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${durationToMS(song.duration)}.`)
  },
}

/*
Aiding functions
*/

//Returns info about a song from id (none if unmatched)
function songById(id){
  let playerSongs = player.songs;
  //Loops through the songs array and looks for the id in each element
  for(let tracks of playerSongs){
    if(tracks.id===id) return tracks;
  }
  return "No such song. Try another id";
}

//Changes duration format from seconds to minutes:seconds
function durationToMS(duration){
  let minutes=Math.floor(duration/60);
  let seconds=duration%60;

  if(minutes<10) minutes="0"+minutes;
  if(seconds<10) seconds="0"+seconds;
  return `${minutes}:${seconds}`;
}
/*
Task functions
*/

//Logs a song's info
function playSong(id) {
  player.playSong(songById(id));
}

function removeSong(id) {
  player.songs.splice(player.songs.indexOf(songById(id)), 1);
  for(let lists of player.playlists){
    if(lists.songs.includes(id)){
      lists.songs.splice(lists.songs.indexOf(id),1);
    }
  }
}

function addSong(title, album, artist, duration, id) {
  // your code here
}

function removePlaylist(id) {
  // your code here
}

function createPlaylist(name, id) {
  // your code here
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
