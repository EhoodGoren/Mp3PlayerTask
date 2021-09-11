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

//Returns the song object that matches the id (error if unmatched)
function songById(id){
  let playerSongs = player.songs;
  //Loops through the songs array and looks for the id in each element
  for(let tracks of playerSongs){
    if(tracks.id===id) return tracks;
  }
  throw "No such id!";
}

//Returns the playlist object that matches the id (error if unmatched)
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

//Changes duration format from minutes:seconds to seconds
function durationToSec(duration){
  duration.split("");
  let secDuration=0;
  secDuration+=parseInt(duration[0]*600)+parseInt(duration[1]*60)+parseInt(duration[3])*10+parseInt(duration[4])
  return secDuration;
}

//Checks if a song with the given id already exists in the songs array. Error if there is.
function isIdTakenSongs(id){
  for(let song of player.songs){
    if(song.id===id) throw "Id taken";
  }
}

//Checks if a playlist with the given id already exists in the playlists array. Error if there is.
function isIdTakenPlaylists(id){
  for(let list of player.playlists){
    if(list.id===id) throw "Id taken";
  }
}

/*
Task functions
*/

//Logs a song's info
function playSong(id) {
  player.playSong(songById(id));
}

//Removes a song from the songs array. Will throw an error if the id doesn't exist.
function removeSong(id) {
  songById(id); // Tries to reach the song with id.
  player.songs.splice(player.songs.indexOf(songById(id)), 1);
  for(let list of player.playlists){
    if(list.songs.includes(id)){
      list.songs.splice(list.songs.indexOf(id),1);
    }
  }
}

function addSong(title, album, artist, duration, id) {
  if(id>0){
    isIdTakenSongs(id);
  }
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
  player.songs.push({"id":id,"title":title,"album":album,"artist":artist,"duration":durationToSec(duration)});
  return id;
}

function removePlaylist(id) {
  let playerPlaylists=player.playlists;
  try{
    playerPlaylists.splice(playerPlaylists.indexOf(playlistById(id)), 1);
  }
  catch{
    throw "Invalid id";
  }
}

function createPlaylist(name, id) {
  if(id>0){
      isIdTakenPlaylists(id);
  }
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
  }
  player.playlists.push({"id":id,"name":name,"songs":[]});
    return id;
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
  let chosenPlaylist=playlistById(playlistId).songs;
  try{
    if(chosenPlaylist.includes(songId)){
      chosenPlaylist.splice(chosenPlaylist.indexOf(songId),1);
      if(chosenPlaylist.length===0){
          removePlaylist(playlistId);
      }
    }
    else{
      chosenPlaylist.push(songId);
    }
  }
  catch{
    throw "Invalid id";
  }
}

function playlistDuration(id) {
  let chosenPlaylist=playlistById(id).songs
  let sum=0;
  for(let song of chosenPlaylist){
    if(typeof(songById(song).duration)==='number'){
      sum+=songById(song).duration;
    }
    else{
      sum+=durationToSec(songById(song).duration);
    }
  }
  return sum;
}

function searchByQuery(query) {
  let songs=[];
  let playlists=[];
  for(let song of player.songs){
    if(song.title.includes(query) || song.album.includes(query) || song.artist.includes(query)){
      songs.push(song);
    }
  }
  songs.sort(function(a,b){if(a.title.toLowerCase()<b.title.toLowerCase())return -1; else return 1;});
  for(let playlist of player.playlists){
    if(playlist.name.includes(query)){
      playlists.push(playlist);
    }
  }
  playlists.sort(function(a,b){if(a.name.toLowerCase()<b.name.toLowerCase())return -1; else return 1;});
  const results = {"songs":songs, "playlists":playlists};
  return results;
}

function searchByDuration(duration) {
  givenDuration=durationToSec(duration);
  let closestTime=Math.abs(player.songs[0].duration-givenDuration);
  let closestElement=player.songs[0];
  for(let song of player.songs){
    if(Math.abs(givenDuration-song.duration)<closestTime){
      closestTime=Math.abs(givenDuration-song.duration);
      closestElement=song;
    }
  }
  for(let playlist of player.playlists){
    if(Math.abs(givenDuration-playlistDuration(playlist.id))<closestTime){
      closestTime=Math.abs(givenDuration-playlistDuration(playlist.id));
      closestElement=playlist;
    }
  }
  return closestElement;
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
