import React from 'react';
import { songs } from '../Track/Track'

export default function Tracklist({ addSongToPlaylist, selectedPlaylistId }) {
    return (
      <div className="bg-gray-100 p-4 rounded-lg">
        {songs.map((song) => (
          <div key={song.id} className="flex justify-between items-center mb-2 p-2 bg-white rounded">
            <div>
              <h1 className="text-lg font-semibold">{song.name}</h1>
              <p className="text-sm text-gray-600">{song.artist} - {song.album}</p>
            </div>
            <button
              onClick={() => addSongToPlaylist(song)} // On click calls the addSongToPlaylist function with the song parameter that is passed down to Track using props in page.js
              className={`px-4 py-2 rounded ${
                !selectedPlaylistId  // If no playlist is selected this button become gray and unclickable
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Add to Playlist
            </button>
          </div>
        ))}
      </div>
    );
  }