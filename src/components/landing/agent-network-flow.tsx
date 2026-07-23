"use client";

import Image from "next/image";
import { Bot, Database, ShieldCheck, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SETTLED = 0.004;

const WIDTH = 1160;
const HEIGHT = 660;

type Point = { x: number; y: number };
type FlowPath = { 
  from: Point; 
  to: Point; 
  fromColor: string; 
  toColor: string; 
  width: number; 
  delay: number; 
  bend?: number 
};

// Colors matching the diagram screenshot:
// Data Source: #258fcf (Blue)
// Agent: #12b981 (Teal Green)
// Action: #8f79f4 (Purple)
// Effect (Allowed): #1aa775 (Green)
// Effect (Blocked): #e3554f (Red)
// Effect (Warned): #d98a19 (Amber)

const paths: FlowPath[] = [
  // -------------------------------------------------------------
  // Stage 1: DATA SOURCE (x=110) -> AGENT (x=400)
  // -------------------------------------------------------------
  // GitHub issue -> Claude Code
  { from: { x: 110, y: 135 }, to: { x: 400, y: 175 }, fromColor: "#e3554f", toColor: "#e3554f", width: 6, delay: 0 },
  // Jira PROJ-1421 -> Claude Code
  { from: { x: 110, y: 220 }, to: { x: 400, y: 175 }, fromColor: "#12b981", toColor: "#12b981", width: 3, delay: 0.15 },
  // MCP tool output -> Codex
  { from: { x: 110, y: 305 }, to: { x: 400, y: 285 }, fromColor: "#d98a19", toColor: "#d98a19", width: 3, delay: 0.3 },
  // Slack #eng -> Cursor
  { from: { x: 110, y: 390 }, to: { x: 400, y: 395 }, fromColor: "#258fcf", toColor: "#258fcf", width: 3, delay: 0.45 },
  // malicious npm -> Gemini CLI
  { from: { x: 110, y: 475 }, to: { x: 400, y: 505 }, fromColor: "#e3554f", toColor: "#e3554f", width: 4, delay: 0.6 },
  // web page -> Gemini CLI
  { from: { x: 110, y: 560 }, to: { x: 400, y: 505 }, fromColor: "#12b981", toColor: "#12b981", width: 3, delay: 0.75 },

  // -------------------------------------------------------------
  // Stage 2: AGENT (x=400) -> ACTION (x=700)
  // -------------------------------------------------------------
  // Claude Code -> Shell execution
  { from: { x: 400, y: 175 }, to: { x: 700, y: 135 }, fromColor: "#e3554f", toColor: "#e3554f", width: 5, delay: 0.1 },
  // Claude Code -> Mutate config
  { from: { x: 400, y: 175 }, to: { x: 700, y: 220 }, fromColor: "#e3554f", toColor: "#e3554f", width: 3, delay: 0.25 },
  // Codex -> Launch MCP server
  { from: { x: 400, y: 285 }, to: { x: 700, y: 305 }, fromColor: "#12b981", toColor: "#12b981", width: 3, delay: 0.35 },
  // Codex -> Network connect
  { from: { x: 400, y: 285 }, to: { x: 700, y: 390 }, fromColor: "#d98a19", toColor: "#d98a19", width: 3, delay: 0.5 },
  // Cursor -> Install package
  { from: { x: 400, y: 395 }, to: { x: 700, y: 475 }, fromColor: "#258fcf", toColor: "#258fcf", width: 3, delay: 0.6 },
  // Gemini CLI -> Write persistence
  { from: { x: 400, y: 505 }, to: { x: 700, y: 560 }, fromColor: "#e3554f", toColor: "#e3554f", width: 4, delay: 0.7 },

  // -------------------------------------------------------------
  // Stage 3: ACTION (x=700) -> EFFECT (x=990)
  // -------------------------------------------------------------
  // Shell execution -> Code execution (denied)
  { from: { x: 700, y: 135 }, to: { x: 990, y: 135 }, fromColor: "#e3554f", toColor: "#e3554f", width: 5, delay: 0.2 },
  // Mutate config -> Config change (denied)
  { from: { x: 700, y: 220 }, to: { x: 990, y: 305 }, fromColor: "#e3554f", toColor: "#e3554f", width: 3, delay: 0.35 },
  // Launch MCP server -> MCP server (allowed)
  { from: { x: 700, y: 305 }, to: { x: 990, y: 475 }, fromColor: "#12b981", toColor: "#12b981", width: 3, delay: 0.45 },
  // Network connect -> Network egress (allowed)
  { from: { x: 700, y: 390 }, to: { x: 990, y: 390 }, fromColor: "#d98a19", toColor: "#d98a19", width: 3, delay: 0.55 },
  // Install package -> Installed artifact (allowed)
  { from: { x: 700, y: 475 }, to: { x: 990, y: 220 }, fromColor: "#258fcf", toColor: "#12b981", width: 3, delay: 0.65 },
  // Write persistence -> Persistence (allowed)
  { from: { x: 700, y: 560 }, to: { x: 990, y: 560 }, fromColor: "#e3554f", toColor: "#e3554f", width: 4, delay: 0.8 },
];

function bezierPoint(path: FlowPath, t: number) {
  const distance = path.to.x - path.from.x;
  const bend = path.bend ?? 0.48;
  const p0 = path.from;
  const p1 = { x: p0.x + distance * bend, y: p0.y };
  const p2 = { x: path.to.x - distance * bend, y: path.to.y };
  const p3 = path.to;
  const u = 1 - t;
  return {
    x: u ** 3 * p0.x + 3 * u ** 2 * t * p1.x + 3 * u * t ** 2 * p2.x + t ** 3 * p3.x,
    y: u ** 3 * p0.y + 3 * u ** 2 * t * p1.y + 3 * u * t ** 2 * p2.y + t ** 3 * p3.y,
  };
}

// Compute active path indices representing complete end-to-end chains from Data Source to Effect
function getActivePathIndices(hovered: Point | null, pathsList: FlowPath[]): Set<number> {
  const activeIndices = new Set<number>();
  if (!hovered) {
    for (let i = 0; i < pathsList.length; i++) {
      activeIndices.add(i);
    }
    return activeIndices;
  }

  const col0: number[] = []; // x = 110
  const col1: number[] = []; // x = 400
  const col2: number[] = []; // x = 700

  pathsList.forEach((p, idx) => {
    if (p.from.x === 110) col0.push(idx);
    else if (p.from.x === 400) col1.push(idx);
    else if (p.from.x === 700) col2.push(idx);
  });

  const eq = (p1: Point, p2: Point) => p1.x === p2.x && p1.y === p2.y;

  for (const i0 of col0) {
    const p0 = pathsList[i0];
    for (const i1 of col1) {
      const p1 = pathsList[i1];
      if (!eq(p0.to, p1.from)) continue;

      for (const i2 of col2) {
        const p2 = pathsList[i2];
        if (!eq(p1.to, p2.from)) continue;

        const routePoints = [p0.from, p0.to, p1.to, p2.to];

        if (routePoints.some((pt) => eq(pt, hovered))) {
          activeIndices.add(i0);
          activeIndices.add(i1);
          activeIndices.add(i2);
        }
      }
    }
  }

  return activeIndices;
}

function bubbleSprite(color: string, radius: number, dpr: number) {
  const size = (radius + 16) * 2;
  const sprite = document.createElement("canvas");
  sprite.width = sprite.height = Math.ceil(size * dpr);
  const context = sprite.getContext("2d");
  if (!context) return null;
  context.scale(dpr, dpr);
  context.shadowBlur = 12;
  context.shadowColor = color;
  context.beginPath();
  context.arc(size / 2, size / 2, radius, 0, Math.PI * 2);
  context.fillStyle = "#ffffff";
  context.fill();
  context.lineWidth = 2;
  context.strokeStyle = color;
  context.stroke();
  return { canvas: sprite, size };
}

interface NetworkCanvasProps {
  hoveredNode: Point | null;
}

function NetworkCanvas({ hoveredNode }: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const opacityRef = useRef<number[]>(paths.map(() => 1.0));
  const activeRef = useRef<Set<number> | null>(null);
  const wakeRef = useRef<() => void>(() => {});

  useEffect(() => {
    activeRef.current = hoveredNode ? getActivePathIndices(hoveredNode, paths) : null;
    wakeRef.current();
  }, [hoveredNode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const dpr = coarsePointer ? 1 : Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = WIDTH * dpr;
    canvas.height = HEIGHT * dpr;
    context.scale(dpr, dpr);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let lastDraw = 0;
    let visible = false;
    const start = performance.now();

    const gradients = paths.map((path) => {
      const gradient = context.createLinearGradient(path.from.x, path.from.y, path.to.x, path.to.y);
      gradient.addColorStop(0, path.fromColor);
      gradient.addColorStop(1, path.toColor);
      return gradient;
    });
    const bubbles = paths.map((path) => bubbleSprite(path.toColor, Math.max(2.5, path.width * 0.62), dpr));

    const draw = (now: number) => {
      if (!visible) {
        frame = 0;
        return;
      }
      if (!reduceMotion && coarsePointer && now - lastDraw < 32) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastDraw = now;
      const activePathIndices = activeRef.current;
      let settled = true;
      context.clearRect(0, 0, WIDTH, HEIGHT);
      context.save();
      context.setLineDash([3, 7]);
      context.strokeStyle = "rgba(255, 255, 255, .08)";
      context.lineWidth = 1;
      [255, 550, 845].forEach((x) => {
        context.beginPath();
        context.moveTo(x, 60);
        context.lineTo(x, 620);
        context.stroke();
      });
      context.restore();

      paths.forEach((path, index) => {
        const isActive = !activePathIndices || activePathIndices.has(index);

        const targetOpacity = isActive ? 1.0 : 0.05;
        if (Math.abs(targetOpacity - opacityRef.current[index]) < SETTLED) opacityRef.current[index] = targetOpacity;
        else {
          opacityRef.current[index] += (targetOpacity - opacityRef.current[index]) * 0.12;
          settled = false;
        }
        const currentOpacity = opacityRef.current[index];

        const distance = path.to.x - path.from.x;
        const bend = path.bend ?? 0.48;

        context.save();
        context.globalAlpha = currentOpacity;
        context.beginPath();
        context.moveTo(path.from.x, path.from.y);
        context.bezierCurveTo(
          path.from.x + distance * bend,
          path.from.y,
          path.to.x - distance * bend,
          path.to.y,
          path.to.x,
          path.to.y
        );
        context.strokeStyle = gradients[index];
        context.lineWidth = path.width;
        context.lineCap = "round";
        context.stroke();
        context.restore();

        const bubble = bubbles[index];
        if (currentOpacity > 0.15 && bubble) {
          const progress = reduceMotion ? 0.58 : ((now - start) / 2900 + path.delay + index * 0.011) % 1;
          const point = bezierPoint(path, progress);
          context.drawImage(bubble.canvas, point.x - bubble.size / 2, point.y - bubble.size / 2, bubble.size, bubble.size);
        }
      });

      frame = reduceMotion && settled ? 0 : requestAnimationFrame(draw);
    };

    wakeRef.current = () => {
      if (visible && !frame) frame = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) wakeRef.current();
        else if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      wakeRef.current = () => {};
      cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

const columnHeaders = [
  { x: 50, label: "data source", color: "#258fcf", Icon: Database },
  { x: 350, label: "agent", color: "#12b981", Icon: Bot },
  { x: 655, label: "action", color: "#8f79f4", Icon: Zap },
  { x: 940, label: "effect", color: "#1aa775", Icon: ShieldCheck },
];

function HeaderLabels() {
  return (
    <>
      {columnHeaders.map(({ x, label, color, Icon }) => (
        <div key={label} className="absolute top-6 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider" style={{ left: x, color }}>
          <Icon className="h-4 w-4" />
          {label}
        </div>
      ))}
    </>
  );
}

interface FlowNodeProps {
  x: number;
  y: number;
  title: string;
  detail: string;
  icon?: string;
  tone?: "blue" | "teal" | "purple" | "green" | "red";
  faded?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function FlowNode({ x, y, title, detail, icon, tone = "blue", faded = false, onMouseEnter, onMouseLeave }: FlowNodeProps) {
  const tones = {
    blue: "border-[#4aa8df]/60 bg-[#258fcf]/25 text-white",
    teal: "border-[#28bba8]/60 bg-[#079c8a]/25 text-white",
    purple: "border-[#8f79f4]/60 bg-[#7258e8]/25 text-white",
    green: "border-[#39d29c]/60 bg-[#12b981]/25 text-white",
    red: "border-[#f07a74]/60 bg-[#e3554f]/25 text-white",
  };

  return (
    <div
      className={`absolute flex w-[190px] -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-[16px] border border-white/15 bg-[#171526]/80 p-2 shadow-[0_10px_28px_rgba(0,0,0,.22)] backdrop-blur-md transition-all duration-300 ${
        faded ? "opacity-25 scale-95 blur-[0.5px]" : "opacity-100 scale-100 z-20"
      } hover:scale-105 cursor-pointer`}
      style={{ left: x, top: y }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${tones[tone]}`}>
        {icon === "zap" ? (
          <Zap className="h-4.5 w-4.5 text-[#a58fff]" />
        ) : icon === "database" ? (
          <Database className="h-4.5 w-4.5 text-[#38bdf8]" />
        ) : icon ? (
          <Image src={`/integration-icons/${icon}.svg`} alt="" width={18} height={18} className="brightness-0 invert" />
        ) : (
          <Database className="h-4.5 w-4.5 text-white/80" />
        )}
      </span>
      <div className="min-w-0 text-left">
        <strong className="block truncate text-[11px] font-semibold text-white/90">{title}</strong>
        <span className="block text-[9.5px] font-medium text-white/45">{detail}</span>
      </div>
    </div>
  );
}

interface DecisionNodeProps {
  x: number;
  y: number;
  label: string;
  count: string;
  tone: "green" | "red";
  faded?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function DecisionNode({ x, y, label, count, tone, faded = false, onMouseEnter, onMouseLeave }: DecisionNodeProps) {
  const style = tone === "green" ? "border-emerald-400/40 bg-emerald-950/40 text-emerald-200" : "border-red-400/40 bg-red-950/40 text-red-200";
  const iconBg = tone === "green" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/50" : "bg-red-500/20 text-red-400 border border-red-400/50";

  return (
    <div
      className={`absolute flex w-[190px] -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-[16px] border border-white/15 bg-[#171526]/80 p-2 shadow-[0_10px_28px_rgba(0,0,0,.22)] backdrop-blur-md transition-all duration-300 ${style} ${
        faded ? "opacity-25 scale-95 blur-[0.5px]" : "opacity-100 scale-100 z-20"
      } hover:scale-105 cursor-pointer`}
      style={{ left: x, top: y }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${iconBg}`}>
        <ShieldCheck className="h-4.5 w-4.5" />
      </span>
      <div className="min-w-0 text-left">
        <strong className="block truncate text-[11px] font-semibold text-white/90">{label}</strong>
        <span className="block text-[9.5px] font-medium opacity-65">{count} events</span>
      </div>
    </div>
  );
}

export default function AgentNetworkFlow() {
  const [hoveredNode, setHoveredNode] = useState<Point | null>(null);

  const activePathIndices = hoveredNode ? getActivePathIndices(hoveredNode, paths) : null;

  const isNodeActive = (x: number, y: number) => {
    if (!hoveredNode || !activePathIndices) return true;
    if (x === hoveredNode.x && y === hoveredNode.y) return true;

    for (const idx of activePathIndices) {
      const p = paths[idx];
      if ((p.from.x === x && p.from.y === y) || (p.to.x === x && p.to.y === y)) {
        return true;
      }
    }
    return false;
  };

  const renderFlowNode = (x: number, y: number, title: string, detail: string, icon?: string, tone?: FlowNodeProps["tone"]) => {
    const isFaded = !isNodeActive(x, y);
    return (
      <FlowNode
        x={x}
        y={y}
        title={title}
        detail={detail}
        icon={icon}
        tone={tone}
        faded={isFaded}
        onMouseEnter={() => setHoveredNode({ x, y })}
        onMouseLeave={() => setHoveredNode(null)}
      />
    );
  };

  const renderDecisionNode = (x: number, y: number, label: string, count: string, tone: "green" | "red") => {
    const isFaded = !isNodeActive(x, y);
    return (
      <DecisionNode
        x={x}
        y={y}
        label={label}
        count={count}
        tone={tone}
        faded={isFaded}
        onMouseEnter={() => setHoveredNode({ x, y })}
        onMouseLeave={() => setHoveredNode(null)}
      />
    );
  };

  return (
    <div className="relative mx-auto mt-12 w-full max-w-[1160px] sm:mt-14">
      <div className="absolute inset-x-[8%] -bottom-10 h-44 rounded-[50%] bg-[#7455f6]/28 blur-[95px]" />
      <div className="relative mx-auto overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative h-[660px] w-[1160px] rounded-[24px] border border-white/10 bg-[#12101d]/90 p-4 shadow-2xl backdrop-blur-xl">
          <NetworkCanvas hoveredNode={hoveredNode} />
          <HeaderLabels />

          {/* Stage 0: Data Source column (x = 110) */}
          {renderFlowNode(110, 135, "GitHub issue #4821...", "6 events", "github", "blue")}
          {renderFlowNode(110, 220, "Jira PROJ-1421 des...", "2 events", "jira", "blue")}
          {renderFlowNode(110, 305, "MCP tool output (jira)", "2 events", "jira", "blue")}
          {renderFlowNode(110, 390, "Slack #eng message", "2 events", "slack", "blue")}
          {renderFlowNode(110, 475, "malicious npm posti...", "2 events", "database", "blue")}
          {renderFlowNode(110, 560, "web page (docs.evil...", "2 events", "database", "blue")}

          {/* Stage 1: Agent column (x = 400) */}
          {renderFlowNode(400, 175, "Claude Code", "6 events", "anthropic", "teal")}
          {renderFlowNode(400, 285, "Codex", "4 events", "openai", "teal")}
          {renderFlowNode(400, 395, "Cursor", "4 events", "cursor", "teal")}
          {renderFlowNode(400, 505, "Gemini CLI", "4 events", "googlegemini", "teal")}

          {/* Stage 2: Action column (x = 700) */}
          {renderFlowNode(700, 135, "Shell execution", "4 events", "zap", "purple")}
          {renderFlowNode(700, 220, "Mutate config", "2 events", "zap", "purple")}
          {renderFlowNode(700, 305, "Launch MCP server", "2 events", "zap", "purple")}
          {renderFlowNode(700, 390, "Network connect", "2 events", "zap", "purple")}
          {renderFlowNode(700, 475, "Install package", "2 events", "zap", "purple")}
          {renderFlowNode(700, 560, "Write persistence", "2 events", "zap", "purple")}
          <div className="absolute top-[604px] left-[700px] -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[10px] font-medium text-white/50">
            +1 more
          </div>

          {/* Stage 3: Effect column (x = 990) */}
          {renderDecisionNode(990, 135, "Code execution (de...", "4", "red")}
          {renderDecisionNode(990, 220, "Installed artifact (all...", "2", "green")}
          {renderDecisionNode(990, 305, "Config change (deni...", "2", "red")}
          {renderDecisionNode(990, 390, "Network egress (all...", "2", "green")}
          {renderDecisionNode(990, 475, "MCP server (allowed)", "2", "green")}
          {renderDecisionNode(990, 560, "Persistence (allowed)", "2", "green")}
          <div className="absolute top-[604px] left-[990px] -translate-x-1/2 rounded-full border border-white/10 bg-white/5 px-3 py-0.5 text-[10px] font-medium text-white/50">
            +1 more
          </div>

          {/* Bottom Footer Legend */}
          <div className="absolute bottom-3 inset-x-6 flex items-center justify-between border-t border-white/10 pt-2.5 text-[10px] font-medium text-white/50">
            <div className="flex items-center gap-4">
              <span className="font-bold uppercase tracking-wider text-white/40">DECISION</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#12b981]" /> allow</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#258fcf]" /> allow and taint</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#d98a19]" /> ask</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#e3554f]" /> block</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#b91c1c]" /> kill</span>
            </div>
            <span>Hover a node to trace its paths · select one or more nodes to filter the events below.</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-[10px] font-medium text-white/45 lg:hidden">Swipe to explore the complete audit flow →</p>
    </div>
  );
}
