"use client";

import React, { useState } from 'react';

export default function Tracklist() {

    const songs =
        [{
            name: 'Desire',
            artist: 'DBE',
            album: 'Rockstar Life',
            id: 1,
        },
        {
            name: 'Dont',
            artist: 'Ed Sheeran',
            album: '+',
            id: 2,
        },
        {
            name: 'Pump 101',
            artist: 'Digga D',
            album: 'unknown',
            id: 3,
        }
        ];

    return (
        <>
            <div className='bg-gray-100 py-10'>
                <ul className='bg-gray-100'>
                    {songs.map((song) => (
                        <li key={song.id} className="max-w-[315px] my-2 pl-5 mx-auto flex justify-between items-center bg-blue-800 rounded-2xl">
                            <div className="p-1">
                                <h1 className="text-white">{song.name} - {song.artist}</h1>
                                <h3 className='text-white'>{song.album}</h3>
                            </div>
                            <div className='mx-5 px-5 font-medium bg-blue-200 hover:bg-blue-50 rounded-3xl'>
                                <button>ADD</button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )


}
