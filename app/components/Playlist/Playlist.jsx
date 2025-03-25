"use client";

import React, { useState } from 'react';

export default function Playlist({
  playlists,
  setPlaylists,
  selectedPlaylistId,
  setSelectedPlaylistId
}) {
  const [newPlaylist, setNewPlaylist] = useState("");

  function handleInputChange(event) { // Updates the newPlaylist state with the current value of the input field as the user types
    setNewPlaylist(event.target.value); // This function is set to be called 'onChange' in the input element
  }

  function addNewPlaylist() {
    if (newPlaylist.trim() !== "") { // .trim() removes any white space at the front or back of the element
      const newId = Math.max(...playlists.map(p => p.id), 0) + 1; // Creates a newId by mapping through each item in the playlist array, takes the highest number Id & incremenets it by 1. If the highest id is 5 the new id becomes 6. 
      setPlaylists(prev => [...prev, { // Sets a new playlist by taking prev as a parameter, using the spread operator it creates 
        id: newId,                     // A new array containting all previous items from any previous array or object added to playlists
        name: newPlaylist,
        songs: []
      }]);
      setNewPlaylist(""); // Resets the input element to an empty string
    }
  }

  function deletePlaylist(id) { // Takes 1 parameter which is the current playlist id
    setPlaylists(playlists.filter(playlist => playlist.id !== id));
    // Filters the playlist array to exclude any playlist not matching the given ID
  }

  function removeSongFromPlaylist(playlistId, songId) {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          songs: playlist.songs.filter(song => song.id !== songId)
        };
      }
      return playlist;
    }));
  }

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <div className="mb-4">
        <input
          className="px-3 py-2 border rounded mr-2"
          type="text"
          placeholder="New Playlist Name..."
          value={newPlaylist} //
          onChange={handleInputChange} // Handles any changes to the input area
        />
        <button
          onClick={addNewPlaylist}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Playlist
        </button>
      </div>

      <div className="space-y-4">
        {playlists.map((playlist) => (
          <div
            key={playlist.id} // Sets the Id of each mapped playlist
            className={`p-4 rounded ${selectedPlaylistId === playlist.id ? 'bg-blue-100' : 'bg-white'
              }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{playlist.name}</h3>
              <div className="space-x-2">
                <button
                  onClick={() => setSelectedPlaylistId(playlist.id)} // Sets id / index of current playlist onClick
                  className={`px-3 py-1 rounded ${selectedPlaylistId === playlist.id // Sets the color of the selected playlist using the ternary operator or conditional ternary expression
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                  {selectedPlaylistId === playlist.id ? 'Selected' : 'Select'}
                </button>
                <button
                  onClick={() => deletePlaylist(playlist.id)} // onClick calls the deletePlaylist function with the index of the button clicked
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>

            {playlist.songs.length > 0 ? ( // Ternary operator which maps any selected songs, if there are less than 0 prints 'no songs in this playlist'
              <ul className="space-y-2">
                {playlist.songs.map((song) => (
                  <li key={song.id} className="flex justify-between items-center text-sm">
                    <span>{song.name} - {song.artist}</span>
                    <button
                      onClick={() => removeSongFromPlaylist(playlist.id, song.id)} // On click provides the function with the current playlist id & song id to be deleted
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-sm">No songs in this playlist</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
