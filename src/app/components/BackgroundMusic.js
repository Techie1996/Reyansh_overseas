"use client";
import { useState, useEffect, useRef } from 'react';

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.2);
    const audioRef = useRef(null);

    // Using a very smooth, calming ASMR-like ambient sound for anxiety relief
    // Soft, gentle background music that's barely noticeable but calming
    // This is a very gentle, ambient track perfect for relaxation and focus
    const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3";

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(err => {
                    console.log("Audio play failed:", err);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            zIndex: 1000,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: 50,
            padding: '12px 20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            transition: 'all 0.3s ease'
        }}>
            <audio
                ref={audioRef}
                src={audioUrl}
                loop
                preload="auto"
            />
            <button
                onClick={togglePlay}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: 24,
                    cursor: 'pointer',
                    padding: 0,
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => {
                    if (e.currentTarget) {
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (e.currentTarget) {
                        e.currentTarget.style.transform = 'scale(1)';
                    }
                }}
                aria-label={isPlaying ? "Pause music" : "Play music"}
            >
                {isPlaying ? '⏸️' : '▶️'}
            </button>
            <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{ width: 80 }}
                aria-label="Volume control"
            />
            <style>{`
                input[type="range"] {
                    -webkit-appearance: none;
                    appearance: none;
                    height: 4px;
                    background: #ddd;
                    border-radius: 2px;
                    outline: none;
                }
                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 14px;
                    height: 14px;
                    background: #4285f4;
                    border-radius: 50%;
                    cursor: pointer;
                }
                input[type="range"]::-moz-range-thumb {
                    width: 14px;
                    height: 14px;
                    background: #4285f4;
                    border-radius: 50%;
                    cursor: pointer;
                    border: none;
                }
            `}</style>
        </div>
    );
}

