import React, { useState } from "react";

const Sidebar = ({ songs, setSongs, currentSongIndex, setCurrentSongIndex }) => {
    const [draggedIndex, setDraggedIndex] = useState(null);

    const handleDragStart = (index) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (droppedIndex) => {
        if (draggedIndex === null || draggedIndex === droppedIndex) return;

        const reorderedSongs = [...songs];
        const [draggedSong] = reorderedSongs.splice(draggedIndex, 1); // Remove dragged item
        reorderedSongs.splice(droppedIndex, 0, draggedSong); // Insert at drop position

        setSongs(reorderedSongs); // Update playlist
        setDraggedIndex(null);
    };

    return (
        <div className="sidebar bg-purple-800 text-white w-64 h-full p-4 shadow-xl fixed left-0 top-0">
            <h2 className="text-2xl font-bold mb-6">Playlist</h2>
            <ul className="space-y-4">
                {songs.map((song, index) => (
                    <li
                        key={index}
                        draggable // Enable drag
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(index)}
                        onClick={() => setCurrentSongIndex(index)}
                        className={`p-3 rounded-lg cursor-pointer hover:bg-purple-700 transition ${
                            currentSongIndex === index ? "bg-purple-600" : ""
                        }`}
                    >
                        <div className="font-semibold">{song.title}</div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
