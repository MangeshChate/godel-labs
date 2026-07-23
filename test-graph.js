type Point = { x: number; y: number };
type FlowPath = { from: Point; to: Point };

const paths = [
  { from: { x: 110, y: 140 }, to: { x: 400, y: 160 } },
  { from: { x: 400, y: 160 }, to: { x: 700, y: 160 } },
  { from: { x: 700, y: 160 }, to: { x: 990, y: 160 } }
];

function getActivePathIndices(hovered: Point | null, pathsList: FlowPath[]) {
  const activeIndices = new Set<number>();
  if (!hovered) return activeIndices;

  pathsList.forEach((p, idx) => {
    if ((p.from.x === hovered.x && p.from.y === hovered.y) || (p.to.x === hovered.x && p.to.y === hovered.y)) {
      activeIndices.add(idx);
    }
  });

  // 2nd pass
  let connectedNodes = new Set<string>();
  activeIndices.forEach((idx) => {
    const p = pathsList[idx];
    connectedNodes.add(`${p.from.x},${p.from.y}`);
    connectedNodes.add(`${p.to.x},${p.to.y}`);
  });

  pathsList.forEach((p, idx) => {
    if (connectedNodes.has(`${p.from.x},${p.from.y}`) || connectedNodes.has(`${p.to.x},${p.to.y}`)) {
      activeIndices.add(idx);
    }
  });

  return activeIndices;
}

console.log([...getActivePathIndices({ x: 110, y: 140 }, paths)]); // Should be [0, 1, 2]
