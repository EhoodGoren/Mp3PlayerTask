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
  throw "No such id!";
}

function playlistById(id){
  let playerPlaylists = player.playlists;
  //Loops through the playlists array and looks for the id in each element
  for(let lists of playerPlaylists){
    if(lists.id===id) return lists;
  }
  throw "No such id!";
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
  try{
    player.playSong(songById(id));
  }
  catch{
    throw "Invalid id";
  }
}

function removeSong(id) {
  try{
    player.songs.splice(player.songs.indexOf(songById(id)), 1);
    for(let list of player.playlists){
      if(list.songs.includes(id)){
        list.songs.splice(list.songs.indexOf(id),1);
      }
    }
  }
  catch{
    throw "Invalid id";
  }
}

function addSong(title, album, artist, duration, id) {
  if(!id>0){
    id=0;
    let taken=false;
    do {
      taken=false;
      id++;
      for(let song of player.songs){
        if(song.id===id){
          taken=true;
          break;
        }
      }
    } while(taken===true);
  }

  player.songs.push({"id":id,"title":title,"album":album,"artist":artist,"duration":durationToMS(duration)});
  return id;
}

function removePlaylist(id) {
  playerPlaylists=player.playlists;
  try{
    playerPlaylists.splice(playerPlaylists.indexOf(playlistById(id)), 1);
  }
  catch{
    throw "Invalid id";
  }
}

function createPlaylist(name, id) {
  if(!id>0){
    id=0;
    let taken=false;
    do {
      taken=false;
      id++;
      for(let list of player.playlists){
        if(list.id===id){
          taken=true;
          break;
        }
      }
    } while(taken===true);

    player.playlists.push({"id":id,"name":name,"songs":[]});
    return id;
  }
}

function playPlaylist(id) {
  try{
    for(let song of playlistById(id).songs){
      playSong(song);
    }
  }
  catch{
    throw "Invalid id";
  }
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
