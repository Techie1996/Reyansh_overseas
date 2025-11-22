"use client";
import { useState, useEffect, useRef } from 'react';

export default function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [volume, setVolume] = useState(0.12);
    const audioRef = useRef(null);
    const hasAutoPlayed = useRef(false);

    // Calming nature ambience - rain and forest sounds
    const audioUrl = "https://www.soundjay.com/misc/sounds/rain-01.mp3";

    // Fallback nature sound URLs if primary fails
    const fallbackUrls = [
        "https://cdn.pixabay.com/download/audio/2022/10/25/audio_8a5f07c42c.mp3?filename=rain-ambient-111975.mp3",
        "https://www.zapsplat.com/wp-content/uploads/2015/sound-effects-one/rain_forest_ambience.mp3"
    ];

    // Auto-play on mount (after a short delay)
    useEffect(() => {
        const autoPlayTimer = setTimeout(() => {
            if (audioRef.current && !hasAutoPlayed.current) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                            hasAutoPlayed.current = true;
                        })
                        .catch(err => {
                            console.log("Auto-play blocked, waiting for user interaction");
                        });
                }
            }
        }, 1500);

        return () => clearTimeout(autoPlayTimer);
    }, []);

    useEffect(() => {
        if (audioRef.current) {
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

    if (!isVisible) {
        return null;
    }

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
                onError={(e) => {
                    console.log("Audio load error, trying fallback...");
                    const currentSrc = e.target?.src || audioUrl;
                    const fallbackIndex = fallbackUrls.findIndex(url => url !== currentSrc);
                    if (e.target && fallbackIndex >= 0) {
                        e.target.src = fallbackUrls[fallbackIndex];
                    }
                }}
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
                aria-label={isPlaying ? "Pause nature sounds" : "Play nature sounds"}
                title={isPlaying ? "Pause nature sounds" : "Play nature sounds"}
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
                aria-label="Volume control for nature sounds"
                title={`Nature sounds volume: ${Math.round(volume * 60)}%`}
            />
            <button
                onClick={() => setIsVisible(false)}
                style={{
                    background: 'rgba(0, 0, 0, 0.05)',
                    border: 'none',
                    fontSize: 'clamp(14px, 1.8vw, 18px)',
                    cursor: 'pointer',
                    padding: 'clamp(4px, 0.8vw, 6px) clamp(6px, 1vw, 8px)',
                    borderRadius: '6px',
                    color: '#666',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    flexShrink: 0,
                    minWidth: 'clamp(24px, 3vw, 28px)',
                    minHeight: 'clamp(24px, 3vw, 28px)'
                }}
                onMouseEnter={(e) => {
                    if (e.currentTarget) {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.1)';
                        e.currentTarget.style.color = '#333';
                    }
                }}
                onMouseLeave={(e) => {
                    if (e.currentTarget) {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                        e.currentTarget.style.color = '#666';
                    }
                }}
                aria-label="Close nature sounds player"
                title="Close nature sounds"
            >
                ×
            </button>
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
