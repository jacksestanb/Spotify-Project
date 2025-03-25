"use client";
import React, { useState } from 'react';
import Tracklist from './components/Tracklist/Tracklist';
import Playlist from './components/Playlist/Playlist';

export default function Home() {
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "playlist1", songs: [] },
    { id: 2, name: "Playlist2", songs: [] },
    { id: 3, name: "playlist3", songs: [] }
  ]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  const addSongToPlaylist = (song) => { // Track.jsx contains and onClick attribute that takes the parameter song
    if (selectedPlaylistId === null) { // For this code to work it checks a playlist has been selected which is set in playlist.jsx by the onClick attribute containing setSelectedPlaylistId
      alert('Please select a playlist first'); // Returns an alert if no playlist has been selected
      return; // Prevents the rest of the code from running  
    }
    setPlaylists(playlists.map(playlist => {   // Maps each indivual item in the playlist array
      if (playlist.id === selectedPlaylistId) { // if both ids are equal...
        // Check if song already exists in playlist
        if (playlist.songs.some(s => s.id === song.id)) { // .some() method test weather an array returns true to a specific condition.
          alert('Song already exists in playlist'); // alert that has message
          return playlist; // returns the unalterd playlist
        }
        return { // else
          ...playlist, // ... spread operator creates a new array contating all the previous items or objects in playlist
          songs: [...playlist.songs, song] // Then using the same operator adds the newly added song to the playlist
        };
      } // else
      return playlist; // return un altered playlist
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Songs</h2>
          <Tracklist 
            addSongToPlaylist={addSongToPlaylist}
            selectedPlaylistId={selectedPlaylistId}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">My Playlists</h2>
          <Playlist 
            playlists={playlists}
            setPlaylists={setPlaylists}
            selectedPlaylistId={selectedPlaylistId}
            setSelectedPlaylistId={setSelectedPlaylistId}
          />
        </div>
      </div>
    </div>
  );
}
