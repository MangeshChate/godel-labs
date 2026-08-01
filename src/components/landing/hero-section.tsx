"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Captions,
  Check,
  LoaderCircle,
  Play,
  Pause,
  Maximize,
  Minimize,
  RefreshCw,
  Settings2,
  Volume2,
  VolumeX,
  Link2,
} from "lucide-react";
import Image from "next/image";
import type Hls from "hls.js";
import EmailCaptureForm from "@/components/landing/email-capture-form";

type VideoQuality = "auto" | "2k" | "1080p" | "720p";

const HLS_MASTER_URL = "/video/hls/master.m3u8";
const MP4_FALLBACK_URL = "/video/godel-gate-hero-combined.mp4";
const AUDIO_END_SECONDS = 70.217;
const PLAYBACK_END_SECONDS = AUDIO_END_SECONDS + 1;
const OUTRO_VISIBLE_SECONDS = 6;
const qualityOptions: Array<{
  value: VideoQuality;
  label: string;
  description?: string;
  height?: number;
  nativeUrl: string;
}> = [
  { value: "auto", label: "Auto", description: "High quality", nativeUrl: HLS_MASTER_URL },
  {
    value: "2k",
    label: "1440p",
    description: "Original",
    height: 1440,
    nativeUrl: "/video/hls/2k/index.m3u8",
  },
  { value: "1080p", label: "1080p", height: 1080, nativeUrl: "/video/hls/1080p/index.m3u8" },
  { value: "720p", label: "720p", height: 720, nativeUrl: "/video/hls/720p/index.m3u8" },
];

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
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality>("auto");
  const [activeAutoQuality, setActiveAutoQuality] = useState("");
  const [isQualityMenuOpen, setIsQualityMenuOpen] = useState(false);
  const [isAdaptiveReady, setIsAdaptiveReady] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const videoRef = useRef<HTMLVideoElement>(null);
  const captionTrackRef = useRef<HTMLTrackElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const qualityMenuRef = useRef<HTMLDivElement>(null);
  const copyResetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const usesNativeHlsRef = useRef(false);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryTimeRef = useRef<number | null>(null);
  const qualitySwitchRef = useRef<{ time: number; shouldResume: boolean } | null>(null);
  const lastPlaybackTimeRef = useRef(0);

  const getBufferedEndAtCurrentTime = (video: HTMLVideoElement) => {
    const currentTime = video.currentTime;

    for (let index = 0; index < video.buffered.length; index += 1) {
      const start = video.buffered.start(index);
      const end = video.buffered.end(index);
      if (currentTime >= start - 0.05 && currentTime <= end + 0.05) {
        return end;
      }
    }

    return null;
  };

  const getPlaybackDuration = (video: HTMLVideoElement) =>
    Math.min(video.duration || PLAYBACK_END_SECONDS, PLAYBACK_END_SECONDS);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const loadMp4Fallback = (time = 0, shouldResume = false) => {
      if (cancelled) return;

      hlsRef.current?.destroy();
      hlsRef.current = null;
      usesNativeHlsRef.current = false;
      setIsAdaptiveReady(false);
      setSelectedQuality("auto");
      setActiveAutoQuality("1080p");
      qualitySwitchRef.current = { time, shouldResume };
      video.src = MP4_FALLBACK_URL;
      video.load();
    };

    const setupPlayback = async () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        usesNativeHlsRef.current = true;
        setIsAdaptiveReady(true);
        video.src = HLS_MASTER_URL;
        video.load();
        return;
      }

      try {
        const hlsModule = await import("hls.js");
        if (cancelled) return;

        const HlsPlayer = hlsModule.default;
        if (!HlsPlayer.isSupported()) {
          loadMp4Fallback();
          return;
        }

        const hls = new HlsPlayer({
          startLevel: -1,
          capLevelToPlayerSize: true,
          maxBufferLength: 20,
          maxMaxBufferLength: 40,
          backBufferLength: 12,
          enableWorker: true,
        });
        let networkRecoveryAttempts = 0;
        let mediaRecoveryAttempts = 0;

        hlsRef.current = hls;
        hls.attachMedia(video);
        hls.on(HlsPlayer.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(HLS_MASTER_URL);
        });
        hls.on(HlsPlayer.Events.MANIFEST_PARSED, () => {
          setIsAdaptiveReady(true);
        });
        hls.on(HlsPlayer.Events.LEVEL_SWITCHED, (_, data) => {
          const height = hls.levels[data.level]?.height;
          if (height) setActiveAutoQuality(`${height}p`);
        });
        hls.on(HlsPlayer.Events.FRAG_LOADED, () => {
          networkRecoveryAttempts = 0;
          mediaRecoveryAttempts = 0;
        });
        hls.on(HlsPlayer.Events.FRAG_BUFFERED, () => {
          const bufferedThrough = getBufferedEndAtCurrentTime(video);
          if (!video.paused && bufferedThrough !== null && bufferedThrough > video.currentTime + 0.2) {
            setIsBuffering(false);
          }
        });
        hls.on(HlsPlayer.Events.ERROR, (_, data) => {
          if (!data.fatal) return;

          if (
            data.type === hlsModule.ErrorTypes.NETWORK_ERROR &&
            networkRecoveryAttempts < 2
          ) {
            networkRecoveryAttempts += 1;
            hls.startLoad();
            return;
          }

          if (
            data.type === hlsModule.ErrorTypes.MEDIA_ERROR &&
            mediaRecoveryAttempts < 2
          ) {
            mediaRecoveryAttempts += 1;
            hls.recoverMediaError();
            return;
          }

          loadMp4Fallback(video.currentTime, !video.paused);
        });
      } catch {
        loadMp4Fallback();
      }
    };

    setupPlayback();

    return () => {
      cancelled = true;
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isQualityMenuOpen) return;

    const closeQualityMenu = (event: PointerEvent) => {
      if (!qualityMenuRef.current?.contains(event.target as Node)) {
        setIsQualityMenuOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeQualityMenu);
    return () => document.removeEventListener("pointerdown", closeQualityMenu);
  }, [isQualityMenuOpen]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => !prev);
  };

  const toggleCaptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCaptionsEnabled((enabled) => !enabled);
  };

  const selectQuality = (quality: VideoQuality) => {
    const video = videoRef.current;
    if (!video) return;

    setSelectedQuality(quality);
    setIsQualityMenuOpen(false);
    setMediaError(null);

    const hls = hlsRef.current;
    if (hls) {
      if (quality === "auto") {
        hls.currentLevel = -1;
        hls.nextLevel = -1;
        hls.loadLevel = -1;
        return;
      }

      const option = qualityOptions.find((item) => item.value === quality);
      const levelIndex = hls.levels.findIndex((level) => level.height === option?.height);
      if (levelIndex >= 0) {
        // Switch on the next aligned segment to avoid interrupting playback.
        hls.nextLevel = levelIndex;
      }
      return;
    }

    if (!usesNativeHlsRef.current) return;

    const option = qualityOptions.find((item) => item.value === quality);
    if (!option) return;

    qualitySwitchRef.current = {
      time: video.currentTime,
      shouldResume: !video.paused,
    };
    setIsBuffering(!video.paused);
    video.src = option.nativeUrl;
    video.load();
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
    const video = videoRef.current;

    setIsPlaying(true);
    setHasStarted(true);
    setHasEnded(false);
    setMediaError(null);
    setIsBuffering((video?.readyState ?? 0) < HTMLMediaElement.HAVE_FUTURE_DATA);
    lastPlaybackTimeRef.current = video?.currentTime ?? 0;
    resetControlsTimeout();
    // Capture duration dynamically if not set yet
    if (video?.duration) {
      setDuration(getPlaybackDuration(video));
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setIsBuffering(false);
  };

  const handleWaiting = () => {
    setIsBuffering(true);
  };

  const handlePlaying = () => {
    setIsBuffering(false);
    setMediaError(null);
    setIsPlaying(true);
  };

  const handleCanPlay = () => {
    if ((videoRef.current?.readyState ?? 0) >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      setIsBuffering(false);
    }
  };

  const handleStalled = () => {
    const video = videoRef.current;
    if (!hasStarted || !video || video.paused) return;

    const bufferedThrough = getBufferedEndAtCurrentTime(video);
    if (bufferedThrough === null || bufferedThrough <= video.currentTime + 0.2) {
      setIsBuffering(true);
    }
  };

  const handleSeeking = () => {
    const video = videoRef.current;
    if (hasStarted && video && !video.paused) {
      setIsBuffering(true);
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) return;

    lastPlaybackTimeRef.current = video.currentTime;
    if (!video.paused || video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      setIsBuffering(false);
    }
  };

  const handleProgress = () => {
    const video = videoRef.current;
    if (!video || video.buffered.length === 0) return;

    const furthestBufferedEnd = video.buffered.end(video.buffered.length - 1);
    const bufferedThrough = getBufferedEndAtCurrentTime(video);

    setBufferedEnd(furthestBufferedEnd);
    if (!video.paused && bufferedThrough !== null && bufferedThrough > video.currentTime + 0.2) {
      setIsBuffering(false);
    }
  };

  const handleMediaError = () => {
    const video = videoRef.current;
    if (video && usesNativeHlsRef.current) {
      const time = video.currentTime;
      const shouldResume = hasStarted && !video.paused;

      usesNativeHlsRef.current = false;
      setSelectedQuality("auto");
      setActiveAutoQuality("1080p");
      setIsAdaptiveReady(false);
      qualitySwitchRef.current = { time, shouldResume };
      video.src = MP4_FALLBACK_URL;
      video.load();
      return;
    }

    setIsBuffering(false);
    setIsPlaying(false);
    setShowControls(true);
    setMediaError("The video stopped loading. Check your connection and try again.");
  };

  const retryPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    setMediaError(null);
    setHasEnded(false);
    setIsBuffering(true);
    retryTimeRef.current = video.currentTime;

    if (hlsRef.current) {
      hlsRef.current.startLoad();
    } else {
      video.load();
    }

    video.play().catch((err) => {
      if (err.name !== "AbortError") handleMediaError();
    });
  };

  const completePlayback = () => {
    const video = videoRef.current;
    const finalDuration = video ? getPlaybackDuration(video) : PLAYBACK_END_SECONDS;

    if (video && !video.paused) {
      video.pause();
    }
    setIsPlaying(false);
    setIsBuffering(false);
    setHasEnded(true);
    setShowControls(true);
    setDuration(finalDuration);
    setCurrentTime(finalDuration);
  };

  const handleEnded = () => completePlayback();

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (hasEnded) {
      setHasEnded(false);
      videoRef.current.currentTime = 0;
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
    const video = videoRef.current;
    if (!video) return;

    const nextTime = video.currentTime;
    const playbackDuration = getPlaybackDuration(video);

    if (!hasEnded && nextTime >= playbackDuration) {
      lastPlaybackTimeRef.current = playbackDuration;
      completePlayback();
      return;
    }

    if (!video.paused && !video.seeking && nextTime > lastPlaybackTimeRef.current + 0.01) {
      setIsBuffering(false);
      setMediaError(null);
      setIsPlaying(true);
    }
    lastPlaybackTimeRef.current = nextTime;
    setCurrentTime(nextTime);

    // Capture duration dynamically if not set yet
    if (duration === 0 && video.duration) {
      setDuration(playbackDuration);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;

    const playbackDuration = getPlaybackDuration(video);
    setDuration(playbackDuration);
    lastPlaybackTimeRef.current = video.currentTime;

    if (qualitySwitchRef.current) {
      const { time, shouldResume } = qualitySwitchRef.current;
      qualitySwitchRef.current = null;
      video.currentTime = Math.min(time, playbackDuration);
      if (shouldResume) {
        video.play().catch((err) => {
          if (err.name !== "AbortError") handleMediaError();
        });
      }
    }

    if (retryTimeRef.current !== null) {
      const retryAt = Math.min(retryTimeRef.current, playbackDuration);
      video.currentTime = retryAt;
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

  const handleCopyVideoLink = async () => {
    const videoUrl = `${window.location.origin}${MP4_FALLBACK_URL}`;

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(videoUrl);
      } else {
        const tempInput = document.createElement("input");
        tempInput.value = videoUrl;
        tempInput.style.position = "fixed";
        tempInput.style.left = "-9999px";
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy");
        document.body.removeChild(tempInput);
      }

      setCopyState("copied");
      if (copyResetTimeoutRef.current) clearTimeout(copyResetTimeoutRef.current);
      copyResetTimeoutRef.current = setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("failed");
      if (copyResetTimeoutRef.current) clearTimeout(copyResetTimeoutRef.current);
      copyResetTimeoutRef.current = setTimeout(() => setCopyState("idle"), 1800);
    }
  };

  const percentage = duration ? (currentTime / duration) * 100 : 0;
  const bufferedPercentage = duration ? Math.min((bufferedEnd / duration) * 100, 100) : 0;
  const selectedQualityLabel =
    qualityOptions.find((option) => option.value === selectedQuality)?.label ?? "Auto";

  return (
    <motion.div
      id="godel-gate-video"
      initial={reduceMotion ? false : { opacity: 0, y: 46, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.05, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-10 mx-auto mt-12 w-full max-w-[1090px] scroll-mt-24 sm:mt-14"
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
            poster="https://dl.godel-labs.ai/website/video-thumbnail.png"
            className={`w-full h-full ${isFullscreen ? "object-contain" : "object-cover object-top"}`}
            playsInline
            preload="auto"
            muted={isMuted}
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

          <div
            onClick={togglePlay}
            className={`absolute inset-0 z-10 flex items-center justify-center bg-transparent transition-all duration-300 ${isPlaying && !showControls ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto"
              }`}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {(!isPlaying || showControls) && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    togglePlay();
                  }}
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                  className="absolute flex h-20 w-20 transform-gpu cursor-pointer items-center justify-center rounded-full border border-white/50 bg-black/25 text-white shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md transition-[background-color,transform] duration-200 [-webkit-backface-visibility:hidden] [backface-visibility:hidden] hover:scale-105 hover:bg-black/40 active:scale-95 pointer-events-auto sm:h-24 sm:w-24"
                >
                  <Play
                    aria-hidden="true"
                    className={`absolute h-10 w-10 translate-x-0.5 fill-white sm:h-12 sm:w-12 ${
                      isPlaying ? "invisible" : "visible"
                    }`}
                  />
                  <Pause
                    aria-hidden="true"
                    className={`absolute h-10 w-10 fill-white sm:h-12 sm:w-12 ${
                      isPlaying ? "visible" : "invisible"
                    }`}
                  />
                </button>
              )}
            </div>
          </div>

          {hasStarted && (
            <div
              onClick={(e) => e.stopPropagation()}
              className={`absolute bottom-0 left-0 right-0 flex flex-wrap items-center gap-2 bg-gradient-to-t from-black/80 via-black/45 to-transparent p-3 transition-opacity duration-300 z-20 sm:flex-nowrap sm:gap-3 sm:p-5 ${
                showControls ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  togglePlay();
                }}
                className="relative h-4 w-4 shrink-0 transform-gpu text-white/90 transition-[color,transform] duration-150 [-webkit-backface-visibility:hidden] [backface-visibility:hidden] hover:scale-110 hover:text-white active:scale-95 focus:outline-none sm:h-4.5 sm:w-4.5"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                <Play
                  aria-hidden="true"
                  className={`absolute inset-0 h-4 w-4 translate-x-0.5 fill-white sm:h-4.5 sm:w-4.5 ${
                    isPlaying ? "invisible" : "visible"
                  }`}
                />
                <Pause
                  aria-hidden="true"
                  className={`absolute inset-0 h-4 w-4 fill-white sm:h-4.5 sm:w-4.5 ${
                    isPlaying ? "visible" : "invisible"
                  }`}
                />
              </button>

              <div className="relative min-w-0 flex-1 group/slider flex items-center h-6 cursor-pointer order-1 sm:order-none sm:min-w-[180px]">
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

              <div className="hidden text-[11px] font-semibold text-white/90 tracking-wider select-none tabular-nums sm:block">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>

              <button
                onClick={toggleMute}
                className="cursor-pointer text-white/90 transition-all duration-150 focus:outline-none hover:text-white hover:scale-110 active:scale-95 sm:ml-2"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="h-4 w-4 sm:h-4.5 sm:w-4.5" /> : <Volume2 className="h-4 w-4 sm:h-4.5 sm:w-4.5" />}
              </button>

              <div ref={qualityMenuRef} className="relative ml-0 sm:ml-1">
                <button
                  type="button"
                  onClick={() => setIsQualityMenuOpen((open) => !open)}
                  disabled={!isAdaptiveReady}
                  className="flex cursor-pointer items-center gap-1 rounded-md px-1 py-1 text-[10px] font-semibold text-white/80 transition hover:bg-white/15 hover:text-white disabled:cursor-default disabled:opacity-40 sm:px-1.5 sm:text-[11px]"
                  aria-label={`Video quality: ${selectedQualityLabel}`}
                  aria-expanded={isQualityMenuOpen}
                >
                  <Settings2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">{selectedQualityLabel}</span>
                </button>

                <AnimatePresence>
                  {isQualityMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.98 }}
                      transition={{ duration: 0.14 }}
                      className="absolute bottom-9 right-0 z-50 w-40 overflow-hidden rounded-xl border border-white/15 bg-[#0d0b14]/95 p-1.5 text-white shadow-[0_16px_40px_rgba(0,0,0,.4)] backdrop-blur-xl"
                    >
                      {qualityOptions.map((option) => {
                        const isSelected = option.value === selectedQuality;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => selectQuality(option.value)}
                            className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs transition ${
                              isSelected
                                ? "bg-white/15 text-white"
                                : "text-white/70 hover:bg-white/10 hover:text-white"
                            }`}
                          >
                            <span className="flex flex-col gap-0.5">
                              <span className="font-semibold">{option.label}</span>
                              {option.description && (
                                <span className="text-[9px] font-medium text-white/45">
                                  {option.description}
                                  {option.value === "auto" && activeAutoQuality
                                    ? ` - ${activeAutoQuality}`
                                    : ""}
                                </span>
                              )}
                            </span>
                            {isSelected && <Check className="h-3.5 w-3.5" />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={toggleCaptions}
                className={`ml-0 cursor-pointer rounded-md p-1 transition-all duration-150 focus:outline-none hover:scale-110 active:scale-95 sm:ml-1 ${
                  captionsEnabled ? "bg-white/20 text-white" : "text-white/55 hover:text-white"
                }`}
                aria-label={captionsEnabled ? "Turn captions off" : "Turn captions on"}
                aria-pressed={captionsEnabled}
              >
                <Captions className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="ml-1 cursor-pointer text-white/90 transition-all duration-150 focus:outline-none hover:text-white hover:scale-110 active:scale-95 sm:ml-2"
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? <Minimize className="h-4 w-4 sm:h-4.5 sm:w-4.5" /> : <Maximize className="h-4 w-4 sm:h-4.5 sm:w-4.5" />}
              </button>
            </div>
          )}

          {showControls && (
            <div className="absolute right-3 top-3 z-30 sm:right-4 sm:top-4">
              {copyState !== "idle" && (
                <div
                  role="status"
                  aria-live="polite"
                  className="absolute right-0 top-full mt-2 whitespace-nowrap rounded-full border border-white/15 bg-black/40 px-2.5 py-1 text-[10px] font-medium text-white shadow-[0_10px_28px_rgba(0,0,0,.24)] backdrop-blur-md"
                >
                  {copyState === "copied" ? "Copied URL" : "Copy failed"}
                </div>
              )}
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleCopyVideoLink();
                }}
                className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/40 text-white shadow-[0_10px_28px_rgba(0,0,0,.24)] backdrop-blur-md transition hover:bg-black/55 active:scale-95 sm:h-9 sm:w-9"
                aria-label="Copy direct MP4 link"
                title="Copy direct MP4 link"
              >
                {copyState === "copied" ? <Check className="h-3.5 w-3.5" /> : <Link2 className="h-3.5 w-3.5" />}
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
                        isWideLogo ? "sm:w-[54px]" : "sm:w-8"
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
                        sizes={isWideLogo ? "(min-width: 640px) 54px, 32px" : "(min-width: 640px) 32px, 28px"}
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
  return (
    <div className="w-full max-w-[460px]">
      <EmailCaptureForm source="hero" buttonLabel="Book a demo" />
    </div>
  );
}

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const enter = reduceMotion ? false : { opacity: 0, y: 18 };

  const [copyIndex, setCopyIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCopyIndex((prev) => (prev === 0 ? 1 : 0));
    }, 7000); // Toggle every 7 seconds
    return () => clearInterval(timer);
  }, []);

  const titles = [
    <>Every agent.<br />Every action. <span className="text-[#6d49fd]">Secured.</span></>,
    <>Deploy <span className="text-[#6d49fd]">AI agents</span> without<br />surrendering <span className="text-[#6d49fd]">control.</span></>
  ];

  const subtitles = [
    "Gödel's Gate governs what AI agents actually do at runtime — every action taken, every piece of data touched — and stops unsafe ones before they execute.",
    "See who and what every agent acts for, enforce data and action policy across the full workflow, and stop unsafe behaviour before it reaches company systems."
  ];

  return (
    <section className="relative overflow-hidden px-4 pb-12 pt-32 sm:px-6 sm:pb-16 sm:pt-40 lg:pb-20">
      <div className="hero-grid absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_25%,rgba(109,73,253,0.3)_65%,#6d49fd_100%)]" />

      <div className="relative z-10 mx-auto max-w-[1180px] text-center">
        <motion.div initial={enter} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#dcd5f7] bg-white/75 px-4.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#554f65] shadow-sm backdrop-blur sm:text-[11px]">
          AI agent security · enforced at runtime
        </motion.div>

        <div className="flex flex-col items-center justify-center sm:min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={copyIndex}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              <h1 className="mx-auto max-w-[1040px] text-[clamp(1.85rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-[#111322] sm:leading-[0.97]">
                {titles[copyIndex]}
              </h1>
              <p className="mx-auto mt-4 sm:mt-6 max-w-[780px] text-[13px] leading-6 text-[#625d6e] sm:text-[14px] sm:leading-7 lg:text-[15px]">
                {subtitles[copyIndex]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div initial={enter} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.28 }} className="mt-9 flex justify-center">
          <HeroEmailForm />
        </motion.div>

        <ProductPreview />
        <GuardedAgents />
      </div>
    </section>
  );
}
