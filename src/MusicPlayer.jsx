import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar"; // Import Sidebar component
import dreams from "./assets/music/dreams.mp3";
import earthly_delights from "./assets/music/earthly_delights.mp3";
import starvation from "./assets/music/starvation.mp3";

function MusicPlayer() {
    const [songs] = useState([
        { title: "Dreams", artist: "Aurora", src: dreams },
        { title: "Earthly Delights", artist: "Aurora", src: earthly_delights },
        { title: "Starvation", artist: "Aurora", src: starvation },
    ]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume , setVolume] = useState(1) // 1 means 100% volume
    const audioRef = useRef(null);

    const playSong = () => {
        setIsPlaying(true);
        audioRef.current.play();
    };

    const pauseSong = () => {
        setIsPlaying(false);
        audioRef.current.pause();
    };

    const nextSong = () => {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextIndex);
        setIsPlaying(true);
    };

    const prevSong = () => {
        const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        setCurrentSongIndex(prevIndex);
        setIsPlaying(true);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleSliderChange = (e) => {
        const newTime = e.target.value;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value / 100; // Convert the slider value to a range of 0 to 1
        setVolume(newVolume);
        audioRef.current.volume = newVolume;
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener("loadedmetadata", () => {
            setDuration(audio.duration);
        });
        audio.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            audio.removeEventListener("loadedmetadata", () => {});
            audio.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        }
    }, [currentSongIndex, isPlaying]);

    return (
        <div className="relative flex">
            {/* Sidebar */}
            <Sidebar
                songs={songs}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
            />

            {/* Main Music Player */}
            <div className="music-player bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8 rounded-2xl shadow-2xl w-96 mx-auto ml-64">
                <h1 className="text-3xl font-bold mb-6 text-center">Music Player</h1>
                <div className="current-song mb-6 text-center">
                    <h2 className="text-2xl font-semibold mb-1">{songs[currentSongIndex].title}</h2>
                    <p className="text-lg text-purple-300">{songs[currentSongIndex].artist}</p>
                </div>
                <audio
                    ref={audioRef}
                    src={songs[currentSongIndex].src}
                    onEnded={nextSong}
                ></audio>
                <div className="slider mb-4">
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleSliderChange}
                        className="w-full hover:cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-purple-300 mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>
                <div className="controls flex justify-center items-center space-x-4">
                    <button
                        onClick={prevSong}
                        className="bg-white text-purple-900 px-4 py-2 rounded-full hover:bg-purple-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
                         </svg>
                        {/* previous / back button*/}
                    </button>
                    {isPlaying ? (
                        <button
                            onClick={pauseSong}
                            className="bg-white text-purple-900 px-6 py-3 rounded-full hover:bg-purple-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                            </svg>
                            {/* Pause */}
                        </button>
                    ) : (
                        <button
                            onClick={playSong}
                            className="bg-white text-purple-900 px-6 py-3 rounded-full hover:bg-purple-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                        </svg>
                        {/*Play */}
                        </button>
                    )}
                    <button
                        onClick={nextSong}
                        className="bg-white text-purple-900 px-4 py-2 rounded-full hover:bg-purple-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                        </svg>

                    </button>
                    <div className="volume-control mb-6">
                <label htmlFor="volume" className="text-sm">Volume</label>
                <input
                    type="range"
                    id="volume"
                    value={volume * 100} // Convert volume back to a 0-100 range
                    onChange={handleVolumeChange}
                    className="w-16 hover:cursor-pointer"
                    max="100"
                />
            </div>
                </div>
            </div>
        </div>
    );
}

function formatTime(seconds) {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export default MusicPlayer;
