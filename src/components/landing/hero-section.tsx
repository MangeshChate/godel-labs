"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { ArrowRight, Captions, LoaderCircle, Play, Pause, Maximize, Minimize, RefreshCw, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    key: "secure_coding_agent",
    title: "Secure Coding Agents",
    agents: [
      "Claude Code",
      "Codex CLI",
      "Cursor",
      "Gemini CLI",
      "Windsurf",
      "GitHub Copilot"
    ]
  },
  {
    key: "secure_browser_agent",
    title: "Secure Browser Agents",
    agents: [
      "Google Chrome",
      "Microsoft Edge",
      "Brave",
      "Comet",
      "Opera",
      "Opera GX",
      "Chromium",
      "Safari"
    ]
  },
  {
    key: "secure_ai_framework",
    title: "Secure AI Frameworks",
    agents: [
      "LangChain",
      "LangGraph",
      "CrewAI",
      "AutoGen",
      "OpenAI Assistants",
      "OpenAI Swarm",
      "LlamaIndex",
      "Haystack",
      "Semantic Kernel"
    ]
  }
];

const agentLogoMap: Record<string, string> = {
  "Claude Code": "/logos/grayscale/claude.svg",
  "Codex CLI": "/logos/grayscale/openai.svg",
  "Cursor": "/logos/grayscale/cursor.svg",
  "Gemini CLI": "/logos/grayscale/gemini-cli.svg",
  "Windsurf": "/logos/grayscale/windsurf.svg",
  "GitHub Copilot": "/logos/grayscale/github-copilot.svg",
  "Google Chrome": "/logos/grayscale/chrome.svg",
  "Microsoft Edge": "/logos/grayscale/edge.svg",
  "Brave": "/logos/grayscale/brave_lion.svg",
  "Comet": "/logos/grayscale/comet.svg",
  "Opera": "/logos/grayscale/opera.svg",
  "Opera GX": "/logos/grayscale/opera-gx.svg",
  "Chromium": "/logos/grayscale/chromium.svg",
  "Safari": "/logos/grayscale/safari.svg",
  "LangChain": "/logos/grayscale/langchain.svg",
  "LangGraph": "/logos/grayscale/langgraph.svg",
  "CrewAI": "/logos/grayscale/crewai.svg",
  "AutoGen": "/logos/grayscale/autogen.svg",
  "OpenAI Assistants": "/logos/grayscale/openai.svg",
  "OpenAI Swarm": "/logos/grayscale/openai-swarm.svg",
  "LlamaIndex": "/logos/grayscale/llamaindex.svg",
  "Haystack": "/logos/grayscale/haystack.svg",
  "Semantic Kernel": "/logos/grayscale/semantic_kernel.svg",
};

const framedAgentLogos = new Set(["LlamaIndex", "Haystack"]);
const wideAgentLogos = new Set<string>(["OpenAI Swarm"]);

function ProductPreview() {
  const reduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [captionsEnabled, setCaptionsEnabled] = useState(false);
  const [activeCaption, setActiveCaption] = useState("");
  const [isBuffering, setIsBuffering] = useState(false);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [mediaError, setMediaError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const captionTrackRef = useRef<HTMLTrackElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryTimeRef = useRef<number | null>(null);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const toggleCaptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCaptionsEnabled((enabled) => !enabled);
  };

  useEffect(() => {
    const textTrack = captionTrackRef.current?.track;
    if (!textTrack) return;

    textTrack.mode = "hidden";
    const handleCueChange = () => {
      const cue = textTrack.activeCues?.[0] as VTTCue | undefined;
      setActiveCaption(cue?.text ?? "");
    };

    textTrack.addEventListener("cuechange", handleCueChange);
    return () => textTrack.removeEventListener("cuechange", handleCueChange);
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
    setHasStarted(true);
    setHasEnded(false);
    setMediaError(null);
    setIsBuffering((videoRef.current?.readyState ?? 0) < HTMLMediaElement.HAVE_FUTURE_DATA);
    resetControlsTimeout();
    // Capture duration dynamically if not set yet
    if (videoRef.current && videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setIsBuffering(false);
    // Only pause the audio if the video hasn't ended.
    // If the video ended, let the audio finish playing during the outro.
    if (audioRef.current && (!videoRef.current || !videoRef.current.ended)) {
      audioRef.current.pause();
    }
  };

  const handleWaiting = () => {
    setIsBuffering(true);
    if (audioRef.current && (!videoRef.current || !videoRef.current.ended)) {
      audioRef.current.pause();
    }
  };

  const handlePlaying = () => {
    setIsBuffering(false);
    setMediaError(null);
    setIsPlaying(true);
    if (audioRef.current && videoRef.current && !videoRef.current.paused) {
      audioRef.current.currentTime = videoRef.current.currentTime;
      audioRef.current.play().catch((err) => {
        if (err.name !== "AbortError") console.error("Failed to play audio:", err);
      });
    }
  };

  const handleCanPlay = () => {
    if ((videoRef.current?.readyState ?? 0) >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      setIsBuffering(false);
    }
  };

  const handleStalled = () => {
    if (hasStarted && videoRef.current && !videoRef.current.paused) {
      setIsBuffering(true);
      audioRef.current?.pause();
    }
  };

  const handleSeeking = () => {
    if (hasStarted) {
      setIsBuffering(true);
      audioRef.current?.pause();
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video) return;

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      setIsBuffering(false);
    }
    if (audio) {
      audio.currentTime = video.currentTime;
      if (!video.paused) {
        audio.play().catch((err) => {
          if (err.name !== "AbortError") console.error("Failed to resume audio:", err);
        });
      }
    }
  };

  const handleProgress = () => {
    const video = videoRef.current;
    if (!video || video.buffered.length === 0) return;

    setBufferedEnd(video.buffered.end(video.buffered.length - 1));
  };

  const handleMediaError = () => {
    setIsBuffering(false);
    setIsPlaying(false);
    setShowControls(true);
    audioRef.current?.pause();
    setMediaError("The video stopped loading. Check your connection and try again.");
  };

  const retryPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video) return;

    setMediaError(null);
    setHasEnded(false);
    setIsBuffering(true);
    retryTimeRef.current = video.currentTime;
    if (audio) {
      audio.load();
    }
    video.load();
    video.play().catch((err) => {
      if (err.name !== "AbortError") handleMediaError();
    });
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setIsBuffering(false);
    setHasEnded(true);
    setShowControls(true);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (hasEnded) {
      setHasEnded(false);
      videoRef.current.currentTime = 0;
      if (audioRef.current) audioRef.current.currentTime = 0;
      videoRef.current.play().catch((err) => {
        if (err.name !== "AbortError") console.error("Failed to replay video:", err);
      });
      return;
    }
    if (videoRef.current.paused) {
      videoRef.current.play().catch((err) => {
        if (err.name !== "AbortError") console.error("Failed to play video:", err);
      });
    } else {
      videoRef.current.pause();
    }
  };

  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying || (videoRef.current && !videoRef.current.paused)) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    if (isPlaying) {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      setShowControls(false);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable full-screen mode:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      // Capture duration dynamically if not set yet
      if (duration === 0 && videoRef.current.duration) {
        setDuration(videoRef.current.duration);
      }
      // Strictly sync audio to video
      if (audioRef.current) {
        const diff = Math.abs(videoRef.current.currentTime - audioRef.current.currentTime);
        if (diff > 0.25) {
          audioRef.current.currentTime = videoRef.current.currentTime;
        }
      }
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    setDuration(video.duration);
    if (retryTimeRef.current !== null) {
      const retryAt = Math.min(retryTimeRef.current, video.duration);
      video.currentTime = retryAt;
      if (audioRef.current) {
        audioRef.current.currentTime = retryAt;
      }
      retryTimeRef.current = null;
    }
    handleProgress();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const videoDuration = duration || videoRef.current.duration;
    if (videoDuration > 0) {
      const newTime = (parseFloat(e.target.value) / 100) * videoDuration;
      videoRef.current.currentTime = newTime;
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
      setCurrentTime(newTime);
      if (duration === 0) {
        setDuration(videoDuration);
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const percentage = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration ? Math.min((bufferedEnd / duration) * 100, 100) : 0;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 46, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.05, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 mx-auto mt-12 w-full max-w-[1090px] sm:mt-14"
    >
      <motion.div
        animate={reduceMotion || isPlaying ? { y: 0 } : { y: [0, -6, 0] }}
        transition={reduceMotion || isPlaying ? undefined : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-[23px] border border-white/70 bg-white/30 p-2 shadow-[0_34px_100px_rgba(62,36,150,.24),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-xl sm:rounded-[31px] sm:p-3 group/video"
      >
        <div
          ref={containerRef}
          onMouseMove={resetControlsTimeout}
          onMouseLeave={handleMouseLeave}
          className={`relative overflow-hidden bg-white/70 border border-white/80 cursor-pointer transition-all duration-300 ${isFullscreen
            ? "w-screen h-screen rounded-none border-none bg-black flex items-center justify-center p-0"
            : "aspect-[2924/1596] rounded-[17px] sm:rounded-[25px]"
            }`}
        >
          <video
            ref={videoRef}
            src="https://dl.godel-labs.ai/website/hero-page-video-godel-gate.mp4"
            poster="https://dl.godel-labs.ai/website/video-thumbnail.png"
            className={`w-full h-full ${isFullscreen ? "object-contain" : "object-cover object-top"}`}
            playsInline
            preload="auto"
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onCanPlay={handleCanPlay}
            onWaiting={handleWaiting}
            onPlaying={handlePlaying}
            onStalled={handleStalled}
            onSeeking={handleSeeking}
            onSeeked={handleSeeked}
            onProgress={handleProgress}
            onError={handleMediaError}
            onClick={togglePlay}
          >
            <track
              ref={captionTrackRef}
              kind="captions"
              src="/captions/hero-video.en.vtt"
              srcLang="en"
              label="English"
            />
          </video>
          <audio
            ref={audioRef}
            src="https://dl.godel-labs.ai/website/britteny-voiceover-godel-gate.mp3"
            preload="auto"
            muted={isMuted}
            onError={handleMediaError}
          />

          <AnimatePresence>
            {isBuffering && hasStarted && !hasEnded && !mediaError && (
              <motion.div
                key="hero-video-buffering"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { delay: 0.18, duration: 0.16 } }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-black/10"
                role="status"
                aria-label="Loading video"
              >
                <div className="flex items-center gap-2.5 rounded-full border border-white/15 bg-[#0d0b14]/75 px-4 py-2.5 text-xs font-medium text-white shadow-[0_10px_32px_rgba(0,0,0,.28)] backdrop-blur-md">
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  <span>Loading video</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {mediaError && (
              <motion.div
                key="hero-video-error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-[#0d0b14]/65 px-6 backdrop-blur-sm"
              >
                <div className="max-w-sm text-center text-white">
                  <p className="text-sm font-medium sm:text-base">{mediaError}</p>
                  <button
                    type="button"
                    onClick={retryPlayback}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#171320] shadow-lg transition hover:bg-white/90 active:scale-95"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Try again
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {hasStarted && captionsEnabled && activeCaption && !hasEnded && (
              <motion.div
                key="hero-caption"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 2 }}
                transition={{ duration: 0.12 }}
                className={`pointer-events-none absolute inset-x-0 z-30 flex justify-center px-3 transition-[bottom] duration-200 sm:px-6 ${
                  showControls ? "bottom-16 sm:bottom-20" : "bottom-3 sm:bottom-4"
                }`}
                aria-live="off"
              >
                <p className="max-w-[92%] whitespace-pre-line rounded-md bg-[rgba(13,11,20,.88)] px-3.5 py-2 text-center text-[11px] font-medium leading-[1.4] text-white shadow-[0_8px_28px_rgba(0,0,0,.32)] backdrop-blur-md sm:max-w-[78%] sm:px-5 sm:py-2.5 sm:text-sm lg:max-w-[70%] lg:text-[15px]">
                  {activeCaption}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Initial Crisp Unblurred Video Thumbnail Overlay before play */}
          {!hasStarted && (
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={togglePlay}
            >
              <img
                src="https://dl.godel-labs.ai/website/video-thumbnail.png"
                alt="Gödel's Gate Video Thumbnail"
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}

          {/* Outro Image Screen with Fade Effect in Last 3 Seconds */}
          <AnimatePresence>
            {((hasStarted && duration > 3 && duration - currentTime <= 3) || hasEnded) && (
              <motion.div
                key="hero-outro-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                onClick={togglePlay}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black cursor-pointer"
              >
                <img
                  src="https://dl.godel-labs.ai/website/godel-gate-video-outro.png"
                  alt="Gödel's Gate Outro"
                  className="w-full h-full object-cover"
                />
                {hasEnded && (
                  <div className="absolute flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/25 backdrop-blur-md border border-white/50 text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] hover:bg-black/40 hover:scale-105 transition-all duration-200 z-30">
                    <Play className="h-10 w-10 sm:h-12 sm:w-12 fill-white translate-x-0.5" />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div
            onClick={togglePlay}
            className={`absolute inset-0 z-10 flex items-center justify-center bg-transparent transition-all duration-300 ${isPlaying && !showControls ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
              }`}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AnimatePresence>
                {!isPlaying && (
                  <motion.div
                    key="play-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/25 backdrop-blur-md border border-white/50 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-black/40 hover:scale-105 active:scale-95 transition-all duration-200 pointer-events-auto cursor-pointer"
                  >
                    <Play className="h-10 w-10 sm:h-12 sm:w-12 fill-white translate-x-0.5" />
                  </motion.div>
                )}
                {isPlaying && showControls && (
                  <motion.div
                    key="pause-btn"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black/25 backdrop-blur-md border border-white/50 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-black/40 hover:scale-105 active:scale-95 transition-all duration-200 pointer-events-auto cursor-pointer"
                  >
                    <Pause className="h-10 w-10 sm:h-12 sm:w-12 fill-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {hasStarted && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/80 via-black/45 to-transparent flex items-center gap-3 transition-opacity duration-300 z-20 ${showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
            >
              <button
                onClick={togglePlay}
                className="text-white/90 hover:text-white hover:scale-110 active:scale-95 transition-all duration-150 focus:outline-none"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white translate-x-0.5" />}
              </button>

              <div className="relative flex-1 group/slider flex items-center h-6 cursor-pointer">
                {/* Thin background track */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden relative group-hover/slider:h-1.5 transition-all duration-150">
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-white/30"
                    style={{ width: `${bufferedPercentage}%` }}
                  />
                  {/* Accent filled track */}
                  <div
                    className="h-full bg-[#6d49fd] rounded-full absolute left-0 top-0 transition-all duration-75"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Thumb dot */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.5)] border border-white/10 opacity-0 scale-75 group-hover/slider:opacity-100 group-hover/slider:scale-100 transition-all duration-150 -translate-x-1.5 pointer-events-none"
                  style={{ left: `${percentage}%` }}
                />

                {/* Invisible range input for native event scrub capture */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={percentage}
                  onChange={handleSeek}
                  className="w-full h-full opacity-0 absolute inset-0 cursor-pointer z-30"
                />
              </div>

              <div className="text-[11px] font-semibold text-white/90 tracking-wider select-none tabular-nums">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              <button
                onClick={toggleMute}
                className="text-white/90 hover:text-white hover:scale-110 active:scale-95 transition-all duration-150 focus:outline-none ml-2 cursor-pointer"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-4.5 w-4.5" /> : <Volume2 className="h-4.5 w-4.5" />}
              </button>

              <button
                onClick={toggleCaptions}
                className={`ml-2 cursor-pointer rounded-md p-1 transition-all duration-150 focus:outline-none hover:scale-110 active:scale-95 ${
                  captionsEnabled ? "bg-white/20 text-white" : "text-white/55 hover:text-white"
                }`}
                aria-label={captionsEnabled ? "Turn captions off" : "Turn captions on"}
                aria-pressed={captionsEnabled}
              >
                <Captions className="h-4.5 w-4.5" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="text-white/90 hover:text-white hover:scale-110 active:scale-95 transition-all duration-150 focus:outline-none ml-2 cursor-pointer"
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize className="h-4.5 w-4.5" /> : <Maximize className="h-4.5 w-4.5" />}
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

const mobileAgentShortNameMap: Record<string, string> = {
  "Claude Code": "Claude",
  "Codex CLI": "Codex",
  "Gemini CLI": "Gemini",
  "GitHub Copilot": "Copilot",
  "Google Chrome": "Chrome",
  "Microsoft Edge": "Edge",
  "OpenAI Assistants": "Assistants",
  "OpenAI Swarm": "Swarm",
  "Semantic Kernel": "SKernel",
};

function GuardedAgents() {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentCategory = categories[activeIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative z-20 mx-auto mt-8 max-w-[1040px] px-2 sm:mt-12">
      <div className="relative flex flex-col items-center">
        {/* Category Header */}
        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="text-xs font-bold uppercase tracking-[0.16em] text-white sm:text-sm"
            >
              {currentCategory.title}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Bullet indicators */}
        <div className="mt-2 flex items-center gap-1.5">
          {categories.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? "bg-white w-6" : "bg-white/40 hover:bg-white/70 w-2"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Agents carousel container — fixed height to prevent layout shift & overflow */}
        <div className="relative mt-5 h-[145px] w-full sm:h-[96px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.98, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -6 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute inset-x-0 top-0 mx-auto grid w-full max-w-[980px] grid-cols-3 gap-x-2 gap-y-3.5 px-2 sm:flex sm:flex-wrap sm:content-start sm:justify-center sm:gap-x-3 sm:gap-y-5 sm:px-0"
            >
              {currentCategory.agents.map((agentName) => {
                const logoSrc = agentLogoMap[agentName];
                const needsFrame = framedAgentLogos.has(agentName);
                const isWideLogo = wideAgentLogos.has(agentName);
                const mobileName = mobileAgentShortNameMap[agentName] || agentName;
                return (
                  <div
                    key={agentName}
                    className="group flex min-w-0 items-center justify-center gap-2 text-[11px] font-bold tracking-[0.02em] text-white transition sm:w-[18.5%] sm:text-xs"
                  >
                    <span
                      className={`relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-[9px] transition-transform duration-200 group-hover:scale-110 sm:h-8 ${
                        isWideLogo ? "sm:w-[70px]" : "sm:w-8"
                      } ${
                        needsFrame
                          ? "border border-white/60 bg-white/30 shadow-sm"
                          : ""
                      }`}
                    >
                      <Image
                        src={logoSrc}
                        alt=""
                        fill
                        sizes={isWideLogo ? "(min-width: 640px) 70px, 32px" : "(min-width: 640px) 32px, 28px"}
                        className={`rounded-[8px] object-contain opacity-100 ${needsFrame ? "p-1" : ""}`}
                      />
                    </span>
                    <span className="truncate font-bold text-white drop-shadow-sm">
                      <span className="inline sm:hidden">{mobileName}</span>
                      <span className="hidden sm:inline">{agentName}</span>
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function HeroEmailForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      router.push(`/demo?email=${encodeURIComponent(email.trim())}`);
    } else {
      router.push("/demo");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="group/form relative flex w-full max-w-[460px] items-center rounded-full border border-[#ddd7eb] bg-white/90 p-1.5 shadow-[0_10px_30px_rgba(109,73,253,0.08)] backdrop-blur-md transition-all duration-300 focus-within:border-[#6d49fd] focus-within:shadow-[0_12px_36px_rgba(109,73,253,0.18)] hover:border-[#b9a9ed]"
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your work email"
        className="w-full flex-1 bg-transparent px-5 py-2.5 text-sm text-[#111322] placeholder:text-[#918a9e] outline-none"
      />
      <button
        type="submit"
        className="group relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#6d49fd] px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_20px_rgba(109,73,253,0.25)] transition-all duration-200 hover:bg-[#5e32ff] hover:shadow-[0_8px_25px_rgba(109,73,253,0.35)] active:scale-[0.98] cursor-pointer"
      >
        <span>Book a demo</span>
        <ArrowRight className="h-4 w-4 rotate-45 transition-transform duration-300 ease-out group-hover:rotate-0" />
      </button>
    </form>
  );
}

function ZigzagUnderline() {
  return (
    <svg aria-hidden="true" className="absolute -bottom-2.5 left-0 h-2.5 w-full" viewBox="0 0 100 10" preserveAspectRatio="none" fill="none">
      <path d="M0 8 2.5 2 5 8 7.5 2 10 8 12.5 2 15 8 17.5 2 20 8 22.5 2 25 8 27.5 2 30 8 32.5 2 35 8 37.5 2 40 8 42.5 2 45 8 47.5 2 50 8 52.5 2 55 8 57.5 2 60 8 62.5 2 65 8 67.5 2 70 8 72.5 2 75 8 77.5 2 80 8 82.5 2 85 8 87.5 2 90 8 92.5 2 95 8 97.5 2 100 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion ? false : { opacity: 0, y: 18 };

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-32 sm:px-6 sm:pb-16 sm:pt-40 lg:pb-20">
      <div className="hero-grid absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_25%,rgba(109,73,253,0.3)_65%,#6d49fd_100%)]" />

      <div className="relative z-10 mx-auto max-w-[1180px] text-center">
        <motion.div initial={enter} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#dcd5f7] bg-white/75 px-4.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#554f65] shadow-sm backdrop-blur sm:text-[11px]">
          AI agent security · enforced at runtime
        </motion.div>

        <motion.h1 initial={enter} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }} className="mx-auto max-w-4xl text-balance text-[clamp(2.55rem,5.7vw,5.25rem)] font-semibold leading-[0.97] tracking-[-0.065em] text-[#111322]">
          Every agent.<br />Every action. <span className="relative inline-block text-[#6d49fd]">Secured.<ZigzagUnderline /></span>
        </motion.h1>

        <motion.p initial={enter} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.18 }} className="mx-auto mt-6 max-w-2xl text-balance text-[15px] font-normal leading-7 text-[#5e5a6e] sm:text-base">
          Gödel&apos;s Gate governs what AI agents actually do at runtime — every action taken, every piece of data touched — and stops unsafe ones before they execute.
        </motion.p>

        <motion.div initial={enter} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28 }} className="mt-9 flex justify-center">
          <HeroEmailForm />
        </motion.div>

        <ProductPreview />
        <GuardedAgents />
      </div>
    </section>
  );
}
