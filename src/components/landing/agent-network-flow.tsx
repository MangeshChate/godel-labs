"use client";

import Image from "next/image";
import { Bot, Database, FolderCheck, Laptop, ShieldCheck, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const WIDTH = 1160;
const HEIGHT = 650;

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

// Section Header Colors corresponding to headers:
// Users: #7258e8
// Platform: #3977eb
// Agents: #079c8a
// Taxonomy: #12b981
// Data Source: #258fcf
// Decisions: Allowed (#1aa775), Warned (#d98a19), Blocked (#e3554f)

const paths: FlowPath[] = [
  // Users (x=72) to Platform (x=260)
  { from: { x: 72, y: 166 }, to: { x: 260, y: 210 }, fromColor: "#7258e8", toColor: "#3977eb", width: 5, delay: 0 },
  { from: { x: 72, y: 270 }, to: { x: 260, y: 320 }, fromColor: "#7258e8", toColor: "#3977eb", width: 4, delay: .17 },
  { from: { x: 72, y: 395 }, to: { x: 260, y: 430 }, fromColor: "#7258e8", toColor: "#3977eb", width: 4, delay: .34 },
  { from: { x: 72, y: 510 }, to: { x: 260, y: 320 }, fromColor: "#7258e8", toColor: "#3977eb", width: 3, delay: .5 },

  // Platform (x=260) to Agents (x=445)
  { from: { x: 260, y: 210 }, to: { x: 445, y: 190 }, fromColor: "#3977eb", toColor: "#079c8a", width: 6, delay: .1 },
  { from: { x: 260, y: 210 }, to: { x: 445, y: 310 }, fromColor: "#3977eb", toColor: "#079c8a", width: 3, delay: .3 },
  { from: { x: 260, y: 320 }, to: { x: 445, y: 310 }, fromColor: "#3977eb", toColor: "#079c8a", width: 5, delay: .25 },
  { from: { x: 260, y: 320 }, to: { x: 445, y: 440 }, fromColor: "#3977eb", toColor: "#079c8a", width: 3, delay: .45 },
  { from: { x: 260, y: 430 }, to: { x: 445, y: 190 }, fromColor: "#3977eb", toColor: "#079c8a", width: 4, delay: .2 },
  { from: { x: 260, y: 430 }, to: { x: 445, y: 440 }, fromColor: "#3977eb", toColor: "#079c8a", width: 4, delay: .55 },

  // Agents (x=445) to Taxonomy (x=635)
  { from: { x: 445, y: 190 }, to: { x: 635, y: 150 }, fromColor: "#079c8a", toColor: "#12b981", width: 3, delay: .2 },
  { from: { x: 445, y: 190 }, to: { x: 635, y: 390 }, fromColor: "#079c8a", toColor: "#12b981", width: 6, delay: .43 },
  { from: { x: 445, y: 190 }, to: { x: 635, y: 510 }, fromColor: "#079c8a", toColor: "#12b981", width: 4, delay: .63 },
  { from: { x: 445, y: 310 }, to: { x: 635, y: 150 }, fromColor: "#079c8a", toColor: "#12b981", width: 3, delay: .32 },
  { from: { x: 445, y: 310 }, to: { x: 635, y: 270 }, fromColor: "#079c8a", toColor: "#12b981", width: 4, delay: .55 },
  { from: { x: 445, y: 310 }, to: { x: 635, y: 390 }, fromColor: "#079c8a", toColor: "#12b981", width: 3, delay: .7 },
  { from: { x: 445, y: 440 }, to: { x: 635, y: 390 }, fromColor: "#079c8a", toColor: "#12b981", width: 3, delay: .48 },
  { from: { x: 445, y: 440 }, to: { x: 635, y: 510 }, fromColor: "#079c8a", toColor: "#12b981", width: 5, delay: .77 },

  // Taxonomy (x=635) to Data Source (x=825)
  { from: { x: 635, y: 150 }, to: { x: 825, y: 160 }, fromColor: "#12b981", toColor: "#258fcf", width: 4, delay: .2 },
  { from: { x: 635, y: 150 }, to: { x: 825, y: 410 }, fromColor: "#12b981", toColor: "#258fcf", width: 2, delay: .7 },
  { from: { x: 635, y: 270 }, to: { x: 825, y: 285 }, fromColor: "#12b981", toColor: "#258fcf", width: 4, delay: .38 },
  { from: { x: 635, y: 390 }, to: { x: 825, y: 160 }, fromColor: "#12b981", toColor: "#258fcf", width: 3, delay: .56 },
  { from: { x: 635, y: 390 }, to: { x: 825, y: 410 }, fromColor: "#12b981", toColor: "#258fcf", width: 5, delay: .28 },
  { from: { x: 635, y: 510 }, to: { x: 825, y: 160 }, fromColor: "#12b981", toColor: "#258fcf", width: 3, delay: .76 },
  { from: { x: 635, y: 510 }, to: { x: 825, y: 285 }, fromColor: "#12b981", toColor: "#258fcf", width: 4, delay: .62 },
  { from: { x: 635, y: 510 }, to: { x: 825, y: 520 }, fromColor: "#12b981", toColor: "#258fcf", width: 7, delay: .18 },

  // Data Source (x=825) to Decision (x=1045)
  { from: { x: 825, y: 160 }, to: { x: 1045, y: 230 }, fromColor: "#258fcf", toColor: "#1aa775", width: 5, delay: .2 },
  { from: { x: 825, y: 160 }, to: { x: 1045, y: 355 }, fromColor: "#258fcf", toColor: "#d98a19", width: 3, delay: .62 },
  { from: { x: 825, y: 285 }, to: { x: 1045, y: 230 }, fromColor: "#258fcf", toColor: "#1aa775", width: 4, delay: .36 },
  { from: { x: 825, y: 410 }, to: { x: 1045, y: 470 }, fromColor: "#258fcf", toColor: "#e3554f", width: 5, delay: .48 },
  { from: { x: 825, y: 520 }, to: { x: 1045, y: 230 }, fromColor: "#258fcf", toColor: "#1aa775", width: 4, delay: .72 },
];

function bezierPoint(path: FlowPath, t: number) {
  const distance = path.to.x - path.from.x;
  const bend = path.bend ?? .48;
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

// Compute all active path indices representing complete end-to-end chains from Column 0 to Column 5 that pass through the hovered node coordinate
function getActivePathIndices(hovered: Point | null, pathsList: FlowPath[]): Set<number> {
  const activeIndices = new Set<number>();
  if (!hovered) {
    for (let i = 0; i < pathsList.length; i++) {
      activeIndices.add(i);
    }
    return activeIndices;
  }

  // Group path indices by their starting column for route lookup
  const col0: number[] = []; // x = 72
  const col1: number[] = []; // x = 260
  const col2: number[] = []; // x = 445
  const col3: number[] = []; // x = 635
  const col4: number[] = []; // x = 825
  
  pathsList.forEach((p, idx) => {
    if (p.from.x === 72) col0.push(idx);
    else if (p.from.x === 260) col1.push(idx);
    else if (p.from.x === 445) col2.push(idx);
    else if (p.from.x === 635) col3.push(idx);
    else if (p.from.x === 825) col4.push(idx);
  });

  const eq = (p1: Point, p2: Point) => p1.x === p2.x && p1.y === p2.y;

  // Search all combinations of segments connecting from Column 0 through Column 5
  for (const i0 of col0) {
    const p0 = pathsList[i0];
    for (const i1 of col1) {
      const p1 = pathsList[i1];
      if (!eq(p0.to, p1.from)) continue;
      
      for (const i2 of col2) {
        const p2 = pathsList[i2];
        if (!eq(p1.to, p2.from)) continue;
        
        for (const i3 of col3) {
          const p3 = pathsList[i3];
          if (!eq(p2.to, p3.from)) continue;
          
          for (const i4 of col4) {
            const p4 = pathsList[i4];
            if (!eq(p3.to, p4.from)) continue;
            
            // Reached a complete chain from first section to decision end.
            // Check if this route contains the hovered node.
            const routePoints = [
              p0.from,
              p0.to,
              p1.to,
              p2.to,
              p3.to,
              p4.to
            ];
            
            if (routePoints.some(pt => eq(pt, hovered))) {
              activeIndices.add(i0);
              activeIndices.add(i1);
              activeIndices.add(i2);
              activeIndices.add(i3);
              activeIndices.add(i4);
            }
          }
        }
      }
    }
  }
  
  return activeIndices;
}

interface NetworkCanvasProps {
  hoveredNode: Point | null;
}

function NetworkCanvas({ hoveredNode }: NetworkCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const opacityRef = useRef<number[]>(paths.map(() => 1.0));

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
    const start = performance.now();

    // Cache the active path indices for this hover node
    const activePathIndices = hoveredNode ? getActivePathIndices(hoveredNode, paths) : null;

    const draw = (now: number) => {
      if (!reduceMotion && coarsePointer && now - lastDraw < 32) {
        frame = requestAnimationFrame(draw);
        return;
      }
      lastDraw = now;
      context.clearRect(0, 0, WIDTH, HEIGHT);
      context.save();
      context.setLineDash([3, 7]);
      context.strokeStyle = "rgba(255, 255, 255, .08)";
      context.lineWidth = 1;
      [166, 350, 540, 730, 920].forEach((x) => {
        context.beginPath();
        context.moveTo(x, 64);
        context.lineTo(x, 610);
        context.stroke();
      });
      context.restore();

      paths.forEach((path, index) => {
        const isActive = !activePathIndices || activePathIndices.has(index);

        // Smoothly slide current opacity toward target state (lerp)
        const targetOpacity = isActive ? 1.0 : 0.05;
        opacityRef.current[index] += (targetOpacity - opacityRef.current[index]) * 0.12;
        const currentOpacity = opacityRef.current[index];

        const distance = path.to.x - path.from.x;
        const bend = path.bend ?? .48;

        // Apply path gradient according to source and target columns
        const gradient = context.createLinearGradient(path.from.x, path.from.y, path.to.x, path.to.y);
        const opacityHex = Math.round(currentOpacity * 255).toString(16).padStart(2, '0');
        gradient.addColorStop(0, `${path.fromColor}${opacityHex}`);
        gradient.addColorStop(1, `${path.toColor}${opacityHex}`);

        context.beginPath();
        context.moveTo(path.from.x, path.from.y);
        context.bezierCurveTo(
          path.from.x + distance * bend, path.from.y,
          path.to.x - distance * bend, path.to.y,
          path.to.x, path.to.y
        );
        context.strokeStyle = gradient;
        context.lineWidth = path.width;
        context.lineCap = "round";
        context.stroke();

        // Draw animated glowing bubble only if path is active enough
        if (currentOpacity > 0.15) {
          const progress = reduceMotion ? .58 : (((now - start) / 2900 + path.delay + index * .011) % 1);
          const point = bezierPoint(path, progress);
          context.save();
          context.shadowBlur = 12;
          context.shadowColor = path.toColor;
          context.beginPath();
          context.arc(point.x, point.y, Math.max(2.5, path.width * .62), 0, Math.PI * 2);
          context.fillStyle = "#ffffff";
          context.fill();
          context.lineWidth = 2;
          context.strokeStyle = path.toColor;
          context.stroke();
          context.restore();
        }
      });

      if (!reduceMotion) frame = requestAnimationFrame(draw);
    };

    draw(start);
    return () => cancelAnimationFrame(frame);
  }, [hoveredNode]);

  return <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}

const columnHeaders = [
  { x: 34, label: "Users", color: "#7258e8", Icon: UserRound },
  { x: 218, label: "Platform", color: "#3977eb", Icon: Laptop },
  { x: 405, label: "Agents", color: "#079c8a", Icon: Bot },
  { x: 590, label: "Taxonomy", color: "#12b981", Icon: FolderCheck },
  { x: 775, label: "Data source", color: "#258fcf", Icon: Database },
  { x: 982, label: "Decision", color: "#1aa775", Icon: ShieldCheck },
];

function HeaderLabels() {
  return (
    <>
      {columnHeaders.map(({ x, label, color, Icon }) => (
        <div key={label} className="absolute top-7 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em]" style={{ left: x, color }}>
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
  tone?: "purple" | "blue" | "teal" | "green" | "red" | "amber";
  faded?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function FlowNode({ 
  x, 
  y, 
  title, 
  detail, 
  icon, 
  tone = "purple", 
  faded = false,
  onMouseEnter,
  onMouseLeave
}: FlowNodeProps) {
  const tones = {
    purple: "border-[#8f79f4]/60 bg-[#7258e8]/25",
    blue: "border-[#4aa8df]/60 bg-[#258fcf]/25",
    teal: "border-[#28bba8]/60 bg-[#079c8a]/25",
    green: "border-[#39d29c]/60 bg-[#12b981]/25",
    red: "border-[#f07a74]/60 bg-[#e3554f]/25",
    amber: "border-[#efaa45]/60 bg-[#d98a19]/25",
  };
  return (
    <div 
      className={`absolute w-[132px] -translate-x-1/2 -translate-y-[28px] text-center transition-all duration-300 ${faded ? "opacity-25 scale-95 blur-[0.5px]" : "opacity-100 scale-100 z-20"}`} 
      style={{ left: x, top: y }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={`mx-auto grid h-12 w-12 place-items-center rounded-[15px] border text-white shadow-[0_10px_25px_rgba(0,0,0,.18)] backdrop-blur-md transition-all duration-300 ${tones[tone]} hover:scale-115 cursor-pointer`}>
        {icon === "folder" ? <FolderCheck className="h-5 w-5" /> : icon ? <Image src={`/integration-icons/${icon}.svg`} alt="" width={20} height={20} className="brightness-0 invert" /> : <UserRound className="h-5 w-5" />}
      </span>
      <strong className="mt-2 block truncate text-[11px] font-semibold text-white/85">{title}</strong>
      <span className="mt-1 block text-[9px] text-white/42">{detail}</span>
    </div>
  );
}

interface DecisionNodeProps {
  x: number;
  y: number;
  label: string;
  count: string;
  tone: "green" | "red" | "amber";
  faded?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function DecisionNode({ 
  x, 
  y, 
  label, 
  count, 
  tone, 
  faded = false,
  onMouseEnter,
  onMouseLeave
}: DecisionNodeProps) {
  const style = tone === "green" ? "border-emerald-400/45 bg-emerald-400/10 text-emerald-200" : tone === "red" ? "border-red-400/45 bg-red-400/10 text-red-200" : "border-amber-400/45 bg-amber-400/10 text-amber-200";
  const dot = tone === "green" ? "bg-emerald-600" : tone === "red" ? "bg-red-500" : "bg-amber-600";
  return (
    <div 
      className={`absolute flex h-[72px] w-[156px] -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-[24px] border px-4 shadow-[0_12px_32px_rgba(0,0,0,.14)] backdrop-blur-md transition-all duration-300 ${style} ${faded ? "opacity-25 scale-95 blur-[0.5px]" : "opacity-100 scale-100 z-20"} hover:scale-105 cursor-pointer`} 
      style={{ left: x, top: y }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-white ${dot}`}><ShieldCheck className="h-4 w-4" /></span>
      <span className="text-left">
        <strong className="block text-[11px] font-bold uppercase tracking-[.08em]">{label}</strong>
        <span className="mt-1 block text-[9px] opacity-70">{count} events</span>
      </span>
    </div>
  );
}

export default function AgentNetworkFlow() {
  const [hoveredNode, setHoveredNode] = useState<Point | null>(null);

  // Compute active path indices for the hovered node
  const activePathIndices = hoveredNode ? getActivePathIndices(hoveredNode, paths) : null;

  const isNodeActive = (x: number, y: number) => {
    if (!hoveredNode || !activePathIndices) return true;
    if (x === hoveredNode.x && y === hoveredNode.y) return true;
    
    // Check if (x,y) is an endpoint of any active path
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

  const renderDecisionNode = (x: number, y: number, label: string, count: string, tone: "green" | "red" | "amber") => {
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
    <div className="relative mx-auto mt-14 w-full max-w-[1160px] sm:mt-16">
      <div className="absolute inset-x-[8%] -bottom-10 h-44 rounded-[50%] bg-[#7455f6]/28 blur-[95px]" />
      <div className="relative mx-auto overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="relative h-[650px] w-[1160px] bg-[radial-gradient(circle_at_50%_48%,rgba(108,79,242,.11),transparent_46%)]">
          <NetworkCanvas hoveredNode={hoveredNode} />
          <HeaderLabels />
          
          {/* Users column */}
          {renderFlowNode(72, 166, "maya@acme.dev", "96 events")}
          {renderFlowNode(72, 270, "sam@acme.dev", "45 events")}
          {renderFlowNode(72, 395, "ci-bot@acme.dev", "36 events")}
          {renderFlowNode(72, 510, "ivy@acme.dev", "28 events")}
          
          {/* Platform column (added Windows and Linux icons) */}
          {renderFlowNode(260, 210, "macOS", "110 events", "apple", "purple")}
          {renderFlowNode(260, 320, "Windows", "65 events", "windows", "purple")}
          {renderFlowNode(260, 430, "Linux", "40 events", "linux", "purple")}
          
          {/* Agents column */}
          {renderFlowNode(445, 190, "Claude Code", "112 events", "anthropic", "teal")}
          {renderFlowNode(445, 310, "Cursor", "78 events", "cursor", "teal")}
          {renderFlowNode(445, 440, "Gemini CLI", "45 events", "googlegemini", "teal")}
          
          {/* Taxonomy column */}
          {renderFlowNode(635, 150, "Engineering", "86 events", "folder", "green")}
          {renderFlowNode(635, 270, "Operations", "52 events", "folder", "green")}
          {renderFlowNode(635, 390, "Sensitive", "31 events", "folder", "green")}
          {renderFlowNode(635, 510, "Unclassified", "66 events", "folder", "green")}
          
          {/* Data Source column */}
          {renderFlowNode(825, 160, "GitHub", "103 events", "github", "blue")}
          {renderFlowNode(825, 285, "Slack", "58 events", "slack", "blue")}
          {renderFlowNode(825, 410, ".env secrets", "14 events", "dotenv", "blue")}
          {renderFlowNode(825, 520, "MCP tools", "60 events", "modelcontextprotocol", "blue")}
          
          {/* Decision column */}
          {renderDecisionNode(1045, 230, "Allowed", "214", "green")}
          {renderDecisionNode(1045, 355, "Warned", "10", "amber")}
          {renderDecisionNode(1045, 470, "Blocked", "11", "red")}
        </div>
      </div>
      <p className="mt-4 text-center text-[10px] font-medium text-white/45 lg:hidden">Swipe to explore the complete policy network →</p>
    </div>
  );
}
