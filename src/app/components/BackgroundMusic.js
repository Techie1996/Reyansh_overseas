"use client";
import { useState, useEffect, useRef } from 'react';

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.12); // Very subtle volume for ASMR-like experience
    const audioRef = useRef(null);

    // Calming rain and nature ambience - creates a mesmerizing ASMR-like experience
    // This gentle, continuous rain sound is perfect for relaxation and focus
    // The sound is very subtle and ambient, creating a peaceful atmosphere

    // Using a calming ambient sound - replace with your preferred ASMR source
    // For best results, use a long-duration track (10+ minutes) that loops seamlessly
    // 
    // Recommended free sources for rain/nature sounds:
    // - Pixabay: https://pixabay.com/music/search/rain%20ambient/
    // - Freesound: https://freesound.org/ (search: "rain ambient", "nature sounds")
    // - YouTube Audio Library (download and host your own)
    // 
    // To use your own audio file, replace the URL below with your hosted file
    // Example: "https://your-domain.com/audio/calming-rain-nature.mp3"
    const audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3";

    useEffect(() => {
        if (audioRef.current) {
            // Keep volume very subtle for ASMR-like experience (max 30% actual volume)
            // This ensures the calming sounds are background ambience, not distracting
            audioRef.current.volume = Math.min(volume * 0.6, 0.3);
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
        <div
            className="background-music-player"
            style={{
                position: 'fixed',
                bottom: 'clamp(1rem, 3vw, 2rem)',
                right: 'clamp(1rem, 3vw, 2rem)',
                zIndex: 1000,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'clamp(30px, 4vw, 50px)',
                padding: 'clamp(8px, 1.5vw, 12px) clamp(12px, 2vw, 20px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(8px, 1.5vw, 12px)',
                transition: 'all 0.3s ease',
                minWidth: 'fit-content',
                flexShrink: 0,
                maxWidth: 'calc(100vw - 8rem)'
            }}
        >
            <audio
                ref={audioRef}
                src={audioUrl}
                loop
                preload="auto"
            />
            <button
                onClick={togglePlay}
                style={{
                    background: 'linear-gradient(135deg, #4285f4 0%, #2563eb 100%)',
                    border: 'none',
                    fontSize: 'clamp(16px, 2vw, 24px)',
                    cursor: 'pointer',
                    padding: 0,
                    width: 'clamp(28px, 3vw, 36px)',
                    height: 'clamp(28px, 3vw, 36px)',
                    minWidth: 'clamp(28px, 3vw, 36px)',
                    minHeight: 'clamp(28px, 3vw, 36px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s ease',
                    borderRadius: '8px',
                    color: '#ffffff',
                    flexShrink: 0
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
                aria-label={isPlaying ? "Pause calming sounds" : "Play calming sounds"}
                title={isPlaying ? "Pause nature sounds" : "Play calming rain & nature sounds"}
            >
                {isPlaying ? '🌧️' : '🌿'}
            </button>
            <input
                type="range"
                min="0"
                max="0.5"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                style={{
                    width: 'clamp(60px, 8vw, 100px)',
                    minWidth: '60px',
                    maxWidth: '100px',
                    flexShrink: 1
                }}
                aria-label="Volume control for calming sounds"
                title={`Nature sounds volume: ${Math.round(volume * 60)}%`}
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
                @media (max-width: 768px) {
                    .background-music-player {
                        bottom: 1rem !important;
                        right: 1rem !important;
                    }
                }
                @media (max-width: 480px) {
                    .background-music-player {
                        bottom: 1rem !important;
                        right: 1rem !important;
                        padding: 8px 12px !important;
                    }
                    .background-music-player input[type="range"] {
                        width: 50px !important;
                        min-width: 50px !important;
                    }
                }
            `}</style>
        </div>
    );
}

