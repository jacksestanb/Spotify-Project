"use client";

import React, { useState } from 'react';

export default function Playlist() {
    const [playlist, setPlaylist] = useState(["Playlist1", "Playlist2", "Playlist3"]);
    const [newPlaylist, setNewPlaylist] = useState("");
    const [editingIndex, setEditingIndex] = useState(null); // Track which playlist is being renamed
    const [renameValue, setRenameValue] = useState(""); // Store the new name while renaming

    function handleInputChange(event) {
        setNewPlaylist(event.target.value);
    }

    function addPlaylist() {
        if (newPlaylist.trim() !== "") {
            setPlaylist((prev) => [...prev, newPlaylist]);
            setNewPlaylist("");
        }
    }

    function deletePlaylist(index) {
        const updatedPlaylists = playlist.filter((_, i) => i !== index);
        setPlaylist(updatedPlaylists);
    }

    function reNamePlaylist(index) {
        setEditingIndex(index); // Set the playlist being renamed
        setRenameValue(playlist[index]); // Set the current name in input
    }

    function handleRenameSave(index) {
        if (!renameValue.trim()) return; // Prevent empty names

        const updatedPlaylists = [...playlist];
        updatedPlaylists[index] = renameValue; // Update the name
        setPlaylist(updatedPlaylists);
        setEditingIndex(null); // Exit editing mode
    }

    return (
        <div className="max-w-[320px] mx-auto bg-gray-200 text-center block justify-center">
            <h1 className="p-2 text-2xl">Playlists</h1>
            <input
                className="px-2 mx-2 bg-gray-50"
                type="text"
                placeholder="Playlist Name..."
                value={newPlaylist}
                onChange={handleInputChange}
            />

            <button onClick={addPlaylist}>ADD</button>

            <ol>
                {playlist.map((playlist, index) => (
                    <li key={index} className="p-2 m-2">
                        {editingIndex === index ? (
                            <>
                                <input
                                    className="bg-gray-50 p-2 m-2"
                                    type="text"
                                    value={renameValue}
                                    onChange={(e) => setRenameValue(e.target.value)}
                                />
                                <button
                                    onClick={() => handleRenameSave(index)}
                                    className="px-2">
                                    Save
                                </button>
                                <button onClick={() => setEditingIndex(null)}>❌</button>
                            </>
                        ) : (
                            <>
                                <span>{playlist}</span>
                                <button
                                    onClick={() => deletePlaylist(index)}
                                    className="px-2">
                                    ❌
                                </button>
                                <button onClick={() => reNamePlaylist(index)}>✏️</button>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}
