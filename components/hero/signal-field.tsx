"use client";

import { useEffect, useRef } from "react";
import { useMotionPreferences } from "@/components/motion/motion-provider";

const VERTEX = `#version 300 es
in vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;

// Flowing topographic contours over a domain-warped noise field.
// uFocus tilts the ember (automation) / mint (engineering) split; the pointer bends the field like a lens.
const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uFocus;
uniform float uReveal;
uniform float uHover;
out vec4 outColor;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

float fbm(vec3 p) {
  float amplitude = 0.5;
  float sum = 0.0;
  for (int i = 0; i < 4; i++) {
    sum += amplitude * snoise(p);
    p = p * 2.03 + vec3(1.7, 9.2, 3.1);
    amplitude *= 0.5;
  }
  return sum;
}

float contour(float h, float width) {
  float f = fract(h);
  float w = fwidth(h) * width;
  return 1.0 - smoothstep(0.0, w, min(f, 1.0 - f));
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uRes;
  vec2 p = (frag - 0.5 * uRes) / uRes.y;
  vec2 m = (uMouse - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.045;

  vec2 toMouse = p - m;
  float md = length(toMouse);
  float lens = exp(-md * md * 7.0) * uHover;

  vec2 q = p * 1.1;
  q += 0.38 * vec2(fbm(vec3(q * 0.75, t)), fbm(vec3(q * 0.75 + 4.3, t + 2.0)));
  q -= toMouse * lens * 0.42;
  float n = fbm(vec3(q, t * 1.3));

  float h = n * 8.5 + t * 2.4;
  float minor = contour(h, 1.35);
  float major = contour(h / 5.0, 1.8);

  vec3 ember = vec3(1.0, 0.47, 0.24);
  vec3 mint = vec3(0.36, 0.95, 0.77);
  float split = smoothstep(-0.95, 0.95, p.x * 1.05 + 0.28 * sin(p.y * 2.2 + t * 6.0) + n * 0.55);
  vec3 tint = mix(ember, mint, clamp(split + uFocus, 0.0, 1.0));

  vec2 vc = (uv - vec2(0.66, 0.52)) * vec2(1.25, 1.0);
  float vignette = smoothstep(1.05, 0.12, length(vc));
  float glow = 0.32 + 1.15 * exp(-md * 1.7) * uHover;

  vec3 base = vec3(0.031, 0.035, 0.043);
  vec3 color = base;
  color += tint * smoothstep(-0.1, 0.9, n + 0.2) * 0.065 * vignette;
  color += tint * (minor * 0.16 + major * 0.38) * vignette * glow;
  color += tint * lens * 0.05;

  float r = length((uv - vec2(0.68, 0.5)) * vec2(uRes.x / uRes.y, 1.0));
  float reveal = smoothstep(uReveal * 2.4, uReveal * 2.4 - 0.45, r);
  color = mix(base, color, reveal);
  color = mix(color, base, smoothstep(0.32, 0.0, uv.y));

  color += (fract(sin(dot(frag, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
  outColor = vec4(color, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export type SignalFocus = "automation" | "engineering" | null;

export function SignalField({ focus }: { focus: SignalFocus }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusRef = useRef(0);
  const { ready, reducedMotion } = useMotionPreferences();

  useEffect(() => {
    focusRef.current = focus === "automation" ? -0.42 : focus === "engineering" ? 0.42 : 0;
  }, [focus]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ready || typeof WebGL2RenderingContext === "undefined") return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, depth: false, powerPreference: "high-performance" });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uRes = uniform("uRes"), uTime = uniform("uTime"), uMouse = uniform("uMouse");
    const uFocus = uniform("uFocus"), uReveal = uniform("uReveal"), uHover = uniform("uHover");

    let width = 0, height = 0, scale = 1;
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      scale = Math.min(window.devicePixelRatio || 1, bounds.width < 760 ? 1.25 : 1.5);
      width = Math.max(1, Math.round(bounds.width * scale));
      height = Math.max(1, Math.round(bounds.height * scale));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };
    resize();

    const pointer = { x: width * 0.72, y: height * 0.55 };
    const eased = { ...pointer, focus: focusRef.current, hover: 0.35 };
    let hoverTarget = 0.35;
    const start = performance.now();
    const introDelay = document.documentElement.classList.contains("intro") ? 1500 : 150;
    let frame = 0;
    let visible = true;

    const draw = (now: number) => {
      const elapsed = reducedMotion ? 40_000 : now - start;
      eased.x += (pointer.x - eased.x) * 0.06;
      eased.y += (pointer.y - eased.y) * 0.06;
      eased.focus += (focusRef.current - eased.focus) * 0.05;
      eased.hover += (hoverTarget - eased.hover) * 0.05;
      const reveal = reducedMotion ? 1 : Math.min(Math.max((elapsed - introDelay) / 1900, 0), 1);
      gl.uniform2f(uRes, width, height);
      gl.uniform1f(uTime, 40 + elapsed / 1000);
      gl.uniform2f(uMouse, eased.x, eased.y);
      gl.uniform1f(uFocus, eased.focus);
      gl.uniform1f(uReveal, 1 - Math.pow(1 - reveal, 3));
      gl.uniform1f(uHover, eased.hover);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now: number) => {
      draw(now);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const resume = () => { if (!frame && visible && !document.hidden && !reducedMotion) frame = requestAnimationFrame(loop); };

    const onPointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - bounds.left) * scale;
      pointer.y = (bounds.bottom - event.clientY) * scale;
      hoverTarget = event.clientY < bounds.bottom ? 1 : 0.35;
    };
    const onLeave = () => { hoverTarget = 0.35; };
    const onResize = () => { resize(); if (reducedMotion) draw(performance.now()); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });

    canvas.dataset.live = "true";
    if (reducedMotion) {
      draw(performance.now());
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", resume);
      observer.observe(canvas);
      resume();
    }
    window.addEventListener("resize", onResize);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("resize", onResize);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", resume);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      delete canvas.dataset.live;
    };
  }, [ready, reducedMotion]);

  return (
    <div className="signal-field" aria-hidden="true">
      <div className="signal-field-fallback" />
      <canvas ref={canvasRef} />
    </div>
  );
}
