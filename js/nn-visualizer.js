const NODE_COLOR        = '#3b82f6';
const NODE_STROKE       = '#1d4ed8';
const EDGE_COLOR        = 'rgba(148, 163, 184, 0.25)';
const SKIP_EDGE_COLOR   = 'rgba(251, 191, 36, 0.7)';
const RECURRENT_COLOR   = 'rgba(34, 197, 94, 0.8)';
const ATTENTION_COLOR   = 'rgba(168, 85, 247, 0.45)';
const LABEL_COLOR       = '#94a3b8';
const BG_COLOR          = '#0f172a';
const DOT_COLOR         = '#1e3a5f';

const MIN_NODE_RADIUS = 5;
const MAX_NODE_RADIUS = 16;

function drawNetwork(canvas, info) {
  const ctx = canvas.getContext('2d');
  const W   = canvas.width;
  const H   = canvas.height;

  ctx.clearRect(0, 0, W, H);
  _drawBackground(ctx, W, H);

  const layers = info.defaultLayers;
  if (!layers || layers.length === 0) return;

  const positions = _computePositions(layers, W, H);
  _drawEdges(ctx, positions, layers, info);
  _drawNodes(ctx, positions, layers);
  _drawLabels(ctx, positions, layers, H);
}

function _drawBackground(ctx, W, H) {
  ctx.fillStyle = BG_COLOR;
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = DOT_COLOR;
  for (let x = 40; x < W; x += 40) {
    for (let y = 40; y < H; y += 40) {
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function _computePositions(layers, W, H) {
  const LABEL_H  = 28;
  const PAD_X    = 60;
  const PAD_Y    = 40;
  const usableH  = H - PAD_Y * 2 - LABEL_H;
  const usableW  = W - PAD_X * 2;

  const xStep = layers.length > 1 ? usableW / (layers.length - 1) : 0;

  // Compute radius that keeps nodes from overlapping
  const maxLayerSize = Math.max(...layers.map(l => l.size));
  const radius = Math.min(
    MAX_NODE_RADIUS,
    Math.max(MIN_NODE_RADIUS, Math.floor(usableH / (maxLayerSize * 2.8)))
  );

  return layers.map((layer, li) => {
    const x = layers.length === 1 ? W / 2 : PAD_X + li * xStep;
    const yStep = layer.size > 1 ? usableH / (layer.size - 1) : 0;
    const nodes = Array.from({ length: layer.size }, (_, ni) => ({
      x,
      y: layer.size === 1
        ? PAD_Y + usableH / 2
        : PAD_Y + ni * yStep,
    }));
    return { x, nodes, radius };
  });
}

function _drawEdges(ctx, positions, layers, info) {
  const type = info.connectionType;

  if (type === 'dense' || type === 'recurrent') {
    _drawDenseEdges(ctx, positions);
  } else if (type === 'local') {
    _drawLocalEdges(ctx, positions);
  } else if (type === 'skip') {
    _drawDenseEdges(ctx, positions);
    _drawSkipEdges(ctx, positions, info);
  } else if (type === 'attention') {
    _drawDenseEdges(ctx, positions);
    _drawAttentionEdges(ctx, positions);
  }

  if (type === 'recurrent') {
    const ri = info.recurrentLayer ?? 1;
    if (positions[ri]) _drawSelfLoop(ctx, positions[ri]);
  }
}

function _drawDenseEdges(ctx, positions) {
  ctx.strokeStyle = EDGE_COLOR;
  ctx.lineWidth   = 0.8;
  ctx.beginPath();
  for (let li = 0; li < positions.length - 1; li++) {
    for (const a of positions[li].nodes) {
      for (const b of positions[li + 1].nodes) {
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
      }
    }
  }
  ctx.stroke();
}

function _drawLocalEdges(ctx, positions) {
  const KERNEL = 2; // each node connects to ±KERNEL nodes in the next layer
  ctx.strokeStyle = EDGE_COLOR;
  ctx.lineWidth   = 0.9;
  ctx.beginPath();
  for (let li = 0; li < positions.length - 1; li++) {
    const srcNodes  = positions[li].nodes;
    const dstNodes  = positions[li + 1].nodes;
    const dstCount  = dstNodes.length;
    for (let si = 0; si < srcNodes.length; si++) {
      // Map source index to approximate center in dest layer
      const center = Math.round((si / (srcNodes.length - 1 || 1)) * (dstCount - 1));
      const lo     = Math.max(0, center - KERNEL);
      const hi     = Math.min(dstCount - 1, center + KERNEL);
      for (let di = lo; di <= hi; di++) {
        ctx.moveTo(srcNodes[si].x, srcNodes[si].y);
        ctx.lineTo(dstNodes[di].x, dstNodes[di].y);
      }
    }
  }
  ctx.stroke();
}

function _drawSkipEdges(ctx, positions, info) {
  // Draw skip connections: pairs of [fromLayerIdx, toLayerIdx]
  const pairs = info.skipConnections ?? [];
  ctx.strokeStyle = SKIP_EDGE_COLOR;
  ctx.lineWidth   = 2;
  ctx.setLineDash([5, 4]);
  for (const [from, to] of pairs) {
    const src = positions[from];
    const dst = positions[to];
    if (!src || !dst) continue;
    // Draw a single curved arrow from the centroid of src to dst
    const sx = src.x;
    const sy = src.nodes[Math.floor(src.nodes.length / 2)].y;
    const ex = dst.x;
    const ey = dst.nodes[Math.floor(dst.nodes.length / 2)].y;
    const cpx = (sx + ex) / 2;
    const cpy = Math.min(sy, ey) - 48;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(cpx, cpy, ex, ey);
    ctx.stroke();
    _drawArrowHead(ctx, cpx, cpy, ex, ey, SKIP_EDGE_COLOR);
  }
  ctx.setLineDash([]);
}

function _drawAttentionEdges(ctx, positions) {
  // Draw all-to-all connections within each interior layer (attention within sequence)
  ctx.strokeStyle = ATTENTION_COLOR;
  ctx.lineWidth   = 0.7;
  ctx.setLineDash([3, 3]);
  for (let li = 1; li < positions.length - 1; li++) {
    const nodes = positions[li].nodes;
    ctx.beginPath();
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        ctx.moveTo(nodes[a].x - 2, nodes[a].y);
        ctx.lineTo(nodes[b].x - 2, nodes[b].y);
      }
    }
    ctx.stroke();
  }
  ctx.setLineDash([]);
}

function _drawSelfLoop(ctx, layerPos) {
  const topNode = layerPos.nodes[0];
  const r       = layerPos.radius;
  const cx      = topNode.x;
  const cy      = topNode.y - r - 18;
  const loopR   = 14;

  ctx.strokeStyle = RECURRENT_COLOR;
  ctx.lineWidth   = 1.8;
  ctx.beginPath();
  ctx.arc(cx, cy, loopR, 0.3, Math.PI * 2 - 0.3);
  ctx.stroke();
  _drawArrowHead(ctx, cx + loopR * Math.cos(0.3), cy + loopR * Math.sin(0.3),
    cx + loopR * Math.cos(-0.1), cy + loopR * Math.sin(-0.1), RECURRENT_COLOR);
}

function _drawArrowHead(ctx, fromX, fromY, toX, toY, color) {
  const angle  = Math.atan2(toY - fromY, toX - fromX);
  const size   = 7;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(toX - size * Math.cos(angle - Math.PI / 6), toY - size * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(toX - size * Math.cos(angle + Math.PI / 6), toY - size * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fill();
}

function _drawNodes(ctx, positions, layers) {
  for (let li = 0; li < positions.length; li++) {
    const { nodes, radius } = positions[li];
    for (const node of nodes) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle   = NODE_COLOR;
      ctx.fill();
      ctx.strokeStyle = NODE_STROKE;
      ctx.lineWidth   = 1.5;
      ctx.stroke();
    }
  }
}

function _drawLabels(ctx, positions, layers, H) {
  ctx.fillStyle  = LABEL_COLOR;
  ctx.font       = '11px "Segoe UI", system-ui, sans-serif';
  ctx.textAlign  = 'center';
  const bottomY  = H - 10;
  for (let li = 0; li < positions.length; li++) {
    ctx.fillText(layers[li].label, positions[li].x, bottomY);
  }
}
