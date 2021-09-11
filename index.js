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
  //logs the info about a song
  playSong(song) {
    console.log(`Playing ${song.title} from ${song.album} by ${song.artist} | ${durationToMS(song.duration)}.`)
  },
}


/*
 * Aiding functions
 */

// Returns the song object that matches the id (error if unmatched)
function songById(id){
  let playerSongs = player.songs;
  //Loops through the songs array and looks for the id in each element
  for(let tracks of playerSongs){
    if(tracks.id===id) return tracks;
  }
  throw "ID doesn't exist!";
}

// Returns the playlist object that matches the id (error if unmatched)
function playlistById(id){
  let playerPlaylists = player.playlists;
  //Loops through the playlists array and looks for the id in each element
  for(let lists of playerPlaylists){
    if(lists.id===id) return lists;
  }
  throw "ID doesn't exist!";
}

// Changes duration format from seconds to minutes:seconds
function durationToMS(duration){
  let minutes=Math.floor(duration/60);
  let seconds=duration%60;
  if(minutes<10) minutes="0"+minutes;
  if(seconds<10) seconds="0"+seconds;
  return `${minutes}:${seconds}`;
}

// Changes duration format from minutes:seconds to seconds
function durationToSec(duration){
  duration.split("");
  let secDuration=0;
  secDuration+=(
    parseInt(duration[0]*600)+
    parseInt(duration[1]*60)+
    parseInt(duration[3])*10+
    parseInt(duration[4])
  );
  return secDuration;
}

// Throws an error if a song with the given id already exists in the songs array.
function isIdTakenSongs(id){
  for(let song of player.songs){
    if(song.id===id) throw "Id taken";
  }
}

// Throws an error if a playlist with the given id already exists in the playlists array.
function isIdTakenPlaylists(id){
  for(let list of player.playlists){
    if(list.id===id) throw "Id taken";
  }
}

// Creates a new song id, the first one from 1 (included) that isn't taken yet.
function songIdGenerator(){
  id=0;
  let taken=false;
  // Increases id by 1 every time. Loops through the songs array, trying to find a non-occupied id.
  do {
    taken=false;
    id++;
    for(let song of player.songs){
      if(song.id===id){
        taken=true;
        break;
      }
    }
  } while(taken);
  return id;
}

// Creates a new playlist id, the first one from 1 (included) that isn't taken yet.
function playlistIdGenerator(){
  id=0;
  let taken=false;
  // Increases id by 1 every time. Loops through the playlists array, trying to find a non-occupied id.
  do {
    taken=false;
    id++;
    for(let list of player.playlists){
      if(list.id===id){
        taken=true;
        break;
      }
    }
  } while(taken);
  return id;
}


/*
 * Task functions
 */

// Logs a song's info
function playSong(id) {
  player.playSong(songById(id));
}

// Removes a song from the songs and playlists arrays. Will throw an error if the id doesn't exist.
function removeSong(id) {
  // Checks if the song id exists.
  let currentSong=songById(id);

  player.songs.splice(player.songs.indexOf(currentSong), 1);
  for(let list of player.playlists){
    if(list.songs.includes(id)){
      list.songs.splice(list.songs.indexOf(id),1);
    }
  }
}

// Adds a new song with the given properties. Generates a new id if not provided one. Error if id is taken or not a number
function addSong(title, album, artist, duration, id) {
  if(id===undefined){
    id=songIdGenerator();
  } else if(id>0){
    isIdTakenSongs(id);
  } else{
    throw "Id should be a number!"
  }
  player.songs.push({
    "id":id,
    "title":title,
    "album":album,
    "artist":artist,
    "duration":durationToSec(duration)
  });

  return id;
}

// Removes a playlist from the playlists arrays. Will throw an error if the id doesn't exist.
function removePlaylist(id) {
  // Checks if the playlist id exists.
  let currentPlaylist=playlistById(id);

  let playerPlaylists=player.playlists;
  playerPlaylists.splice(playerPlaylists.indexOf(currentPlaylist), 1);
}

// Creates a new playlist with the given properties. Generates a new id if not provided one. Error if id is taken or not a number.
function createPlaylist(name, id) {
  if(id===undefined){
    id=playlistIdGenerator();
  }else if(id>0){
    isIdTakenPlaylists(id);
  }else{
    throw "Id should be a number!";
  }
  player.playlists.push({"id":id,"name":name,"songs":[]});
    return id;
}

// Logs a playlist's songs info.
function playPlaylist(id) {
  // Checks if the playlist id exists.
  let currentPlaylist=playlistById(id);

  for(let song of currentPlaylist.songs){
    playSong(song);
  }
}

/*
 * Removes a song if the song id exists in the playlist with the given id.
 * If the playlist is then left empty it's deleted.
 * If the song id didn't exist it is added to that playlist.
 */
function editPlaylist(playlistId, songId) {
  // Checks if the playlist and song id exist.
  songById(songId);
  let chosenPlaylistSongs=playlistById(playlistId).songs;

  // if the song is in the playlist removes the song from the playlist.
  if(chosenPlaylistSongs.includes(songId)){
    chosenPlaylistSongs.splice(chosenPlaylistSongs.indexOf(songId),1);
    //if the playlist is left empty removes the playlist.
    if(chosenPlaylistSongs.length===0){
        removePlaylist(playlistId);
    }
  } else{
    // if the song id didn't exist in the playlist, adds it
    chosenPlaylistSongs.push(songId);
  }
}

// Sums the total duration of all the songs in a playlist
function playlistDuration(id) {
  // Checks if the playlist id exists.
  let currentPlaylist=playlistById(id);

  let chosenPlaylistSongs=currentPlaylist.songs;
  let sum=0;
  for(let song of chosenPlaylistSongs){
    sum+=songById(song).duration;
  }
  return sum;
}

/*
 * Returns an object with:
 * 1) an array with all songs' title/album/artist which contains a given query, sorted by title.
 * 2) an array of playlists' name which contains the given query, sorted by name.
*/
function searchByQuery(query) {
  let songs=[];
  let playlists=[];
  query=query.toLowerCase();
  // Searches the query in songs' attributes.
  for(let song of player.songs){
    if(song.title.toLowerCase().includes(query) || 
      song.album.toLowerCase().includes(query) || 
      song.artist.toLowerCase().includes(query) )
    {
      songs.push(song);
    }
  }
  // sorts by title
  songs.sort(function(a,b){
    if(a.title.toLowerCase()<b.title.toLowerCase()) return -1; 
    else return 1;
  });

  // Searches the query in playlists' attributes.
  for(let playlist of player.playlists){
    if(playlist.name.toLowerCase().includes(query)){
      playlists.push(playlist);
    }
  }
  // sorts by name
  playlists.sort(function(a,b){
    if(a.name.toLowerCase()<b.name.toLowerCase())return -1;
    else return 1;
  });

  const results = {"songs":songs, "playlists":playlists};
  return results;
}

// Returns the song/playlist with the closest duration to what was given
function searchByDuration(duration) {
  // Converts duraiton from mm:ss format to seconds.
  givenDuration=durationToSec(duration);

  let closestTime;
  let closestElement;
  //Checks that songs array isn't empty

  for(let song of player.songs){
    let currentDiff=Math.abs(givenDuration-song.duration);
    // if a checked song is closer in duration than the closest element yet, it is now the closest element
    if(closestElement===undefined || currentDiff<closestTime){
      closestTime=currentDiff;
      closestElement=song;
    }
  }

  for(let playlist of player.playlists){
    let currentDiff=Math.abs(givenDuration-playlistDuration(playlist.id));
    // if a checked playlist is closer in duration than the closest element yet, it is now the closest element
    if(closestElement===undefined || currentDiff<closestTime){
      closestTime=currentDiff;
      closestElement=playlist;
    }
  }

  return closestElement;
}


/*
 * Bonus functions
 */


// Sorts a playlist by id, ascending.
function sortPlaylistById(id){
  currentPlaylistSongs=playlistById(id).songs;
  currentPlaylistSongs.sort((a,b) => a-b)
  return currentPlaylistSongs;
}

// Sorts the songs array by id, ascending.
function sortSongsById(){
  let newArr=[];

  // Pushes songs' id and sorts them ascending.
  for(let song of player.songs){
    newArr.push(song.id);
  }
  newArr.sort((a,b) => a-b);

  // Converts the id to song.
  newArr=newArr.map(songById);
  return newArr;
}

// Returns a random song
function randomSong(){
  let playerSongs=player.songs;
  return playerSongs[Math.floor(Math.random()*playerSongs.length)];
}

/*
 * Creates a new playlist, with random songs from the songs array.
 * Each song can't be repeated twice in a row.
 * Duration doesn't exceed one hour.
 */
function dailyPlaylist(){
  let newPlaylist=[];
  let totalDuration=0;
  while(totalDuration<3600){
    let currentRandomSong = randomSong();

    // Checks that the last song isn't the same one as the one to put.
    if(currentRandomSong != newPlaylist[newPlaylist.length-1]){
      newPlaylist.push(currentRandomSong);
      totalDuration += currentRandomSong.duration;
    }
  }
  return newPlaylist;
}

// Plays a song for as many times as can fit in an hour, without exceeding.
function hourSongLoop(id){
  currentSong=songById(id);
  loopCount=Math.floor(3600/currentSong.duration);
  console.log(`Playing ${currentSong.title} for ${loopCount} times.`)
  for(let i=1; i<=loopCount; i++){
    playSong(id);
  }
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
