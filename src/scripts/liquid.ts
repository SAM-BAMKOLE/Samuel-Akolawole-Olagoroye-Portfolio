/**
 * 3D liquid background — raw WebGL fragment shader (no dependencies).
 *
 * A domain-warped fbm noise field is treated as a height map of a viscous
 * liquid surface. Normals are derived from the height field and lit with a
 * light that follows the cursor (diffuse + specular + fresnel), which is what
 * gives the "glossy 3D liquid" look instead of a flat gradient.
 * The pointer pushes the surface and sends ripples out, scaled by velocity.
 * `state.dark` (0→1) cross-fades to a dark palette for the contact section.
 */
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }`;

const FRAG = `
precision highp float;
uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uVel; uniform float uDark;

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1.,0.)), f.x), mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), f.x), f.y);
}
float fbm(vec2 p){ float v = 0., a = .5; for(int i=0;i<5;i++){ v += a*noise(p); p = p*2.02 + vec2(1.7,9.2); a *= .5; } return v; }

void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  float asp = uRes.x / uRes.y;
  vec2 p = vec2(uv.x * asp, uv.y);
  vec2 m = vec2(uMouse.x * asp, uMouse.y);

  // pointer pushes the liquid away
  vec2 dv = p - m;
  float d = length(dv);
  float push = exp(-d * 3.6);
  p += dv / (d + 1e-3) * push * (0.05 + uVel * 0.28);

  float t = uTime * 0.075;
  vec2 q = vec2(fbm(p*1.25 + t), fbm(p*1.25 + vec2(5.2,1.3) - t));
  vec2 r = vec2(fbm(p*1.25 + 3.*q + vec2(1.7,9.2) + t*1.5), fbm(p*1.25 + 3.*q + vec2(8.3,2.8) - t*1.2));
  vec2 base = p*1.25 + 3.5*r;

  // ripples radiating from the pointer while it moves
  float ripple = sin(d*30. - uTime*3.2) * exp(-d*5.5) * uVel * 0.12;

  // height field + finite-difference normal
  float e = 0.012;
  float h  = fbm(base) + ripple;
  float hx = fbm(base + vec2(e, 0.)) + ripple;
  float hy = fbm(base + vec2(0., e)) + ripple;
  vec3 n = normalize(vec3((h - hx) / e * 0.55, (h - hy) / e * 0.55, 1.));

  // light follows the cursor, sits above the surface
  vec3 L = normalize(vec3(m - p + vec2(0.18, 0.22), 0.42));
  vec3 V = vec3(0., 0., 1.);
  vec3 H = normalize(L + V);
  float diff = clamp(dot(n, L), 0., 1.);
  float spec = pow(max(dot(n, H), 0.), 48.);
  float fres = pow(1. - max(n.z, 0.), 2.5);

  // ---- light palette: paper -> sand -> peach -> vermilion
  vec3 paper = vec3(.949,.941,.922), sand = vec3(.89,.86,.80), peach = vec3(1.,.74,.60), brand = vec3(1.,.353,.122);
  vec3 col = mix(paper, sand, smoothstep(.25,.7,length(q)));
  col = mix(col, peach, smoothstep(.40,.72,h) * .9);
  col = mix(col, brand, smoothstep(.60,.86,h) * .85);
  col *= .78 + .38 * diff;                 // shading
  col += spec * .55;                       // glossy highlight
  col = mix(col, vec3(1.), fres * .22);    // rim light

  // ---- dark palette: ink -> ember
  vec3 ink = vec3(.067,.067,.063);
  vec3 dcol = mix(ink, vec3(.20,.09,.05), smoothstep(.25,.7,length(q)));
  dcol = mix(dcol, vec3(.48,.17,.06), smoothstep(.42,.74,h) * .9);
  dcol = mix(dcol, brand * .95, smoothstep(.64,.88,h) * .8);
  dcol *= .55 + .75 * diff;
  dcol += spec * vec3(.55,.42,.36);
  dcol += fres * vec3(.10,.04,.02);

  col = mix(col, dcol, uDark);
  col += (hash(gl_FragCoord.xy + uTime) - .5) * .02;   // film grain
  gl_FragColor = vec4(col, 1.);
}`;

export function initLiquid(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
  const state = { dark: 0, active: true };
  if (!gl) {
    console.warn("[liquid] WebGL unavailable — falling back to the plain background");
    return { state, setActive() {}, destroy() {} };
  }

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error("[liquid] shader error:", gl.getShaderInfoLog(s));
    return s;
  };
  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) console.error("[liquid] link error:", gl.getProgramInfoLog(prog));
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u = (n: string) => gl.getUniformLocation(prog, n);
  const uRes = u("uRes"), uTime = u("uTime"), uMouse = u("uMouse"), uVel = u("uVel"), uDark = u("uDark");

  // Render at ~60% resolution: the surface is soft, so it stays crisp-looking and cheap.
  const SCALE = 0.6;
  const resize = () => {
    canvas.width = Math.max(2, Math.floor(innerWidth * SCALE));
    canvas.height = Math.max(2, Math.floor(innerHeight * SCALE));
    gl.viewport(0, 0, canvas.width, canvas.height);
  };
  resize();
  addEventListener("resize", resize);

  const target = { x: 0.62, y: 0.55 };
  const mouse = { x: 0.62, y: 0.55 };
  let vel = 0;
  const onMove = (e: PointerEvent) => {
    target.x = e.clientX / innerWidth;
    target.y = 1 - e.clientY / innerHeight;
  };
  addEventListener("pointermove", onMove, { passive: true });

  let raf = 0;
  const start = performance.now();
  const frame = () => {
    raf = requestAnimationFrame(frame);
    if (!state.active) return;
    const px = mouse.x, py = mouse.y;
    mouse.x += (target.x - mouse.x) * 0.07;
    mouse.y += (target.y - mouse.y) * 0.07;
    vel += (Math.min(Math.hypot(mouse.x - px, mouse.y - py) * 40, 1) - vel) * 0.08;
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, (performance.now() - start) / 1000);
    gl.uniform2f(uMouse, mouse.x, mouse.y);
    gl.uniform1f(uVel, vel);
    gl.uniform1f(uDark, state.dark);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  frame();

  return {
    state,
    setActive(v: boolean) { state.active = v; },
    destroy() {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
      removeEventListener("pointermove", onMove);
    },
  };
}
