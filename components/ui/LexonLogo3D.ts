import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export const LEXON_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="290 235 710 230">
  <path fill-rule="evenodd" d="M 329 292 L 360 264 L 360 356 L 329 385 Z" />
  <path fill-rule="evenodd" d="M 369 264 L 400 292 L 400 356 L 369 385 Z" />
  <path fill-rule="evenodd" d="M 329 395 L 360 366 L 360 400 L 436 400 C 441 411 447 420 455 428 L 356 428 L 329 404 Z" />
  <path fill-rule="evenodd" d="M 379 391 L 407 362 L 449 362 C 452 329 476 308 510 308 C 546 308 570 332 570 369 L 570 380 L 478 380 C 481 396 494 405 512 405 C 525 405 535 400 542 392 L 564 407 C 552 422 534 431 511 431 C 476 431 452 411 449 380 L 449 391 Z M 478 356 L 540 356 C 537 340 526 331 510 331 C 493 331 481 340 478 356 Z" />
  <path fill-rule="evenodd" d="M 573 312 L 609 312 L 639 351 L 669 312 L 704 312 L 657 369 L 706 428 L 670 428 L 639 387 L 607 428 L 572 428 L 621 369 Z" />
  <path fill-rule="evenodd" d="M 768 308 C 805 308 832 334 832 370 C 832 406 805 431 768 431 C 731 431 704 406 704 370 C 704 334 731 308 768 308 Z M 768 334 C 748 334 735 349 735 370 C 735 391 748 405 768 405 C 788 405 801 391 801 370 C 801 349 788 334 768 334 Z" />
  <path fill-rule="evenodd" d="M 847 312 L 877 312 L 877 327 C 886 314 900 308 917 308 C 944 308 960 325 960 354 L 960 428 L 929 428 L 929 360 C 929 342 920 334 905 334 C 889 334 878 344 878 362 L 878 428 L 847 428 Z" />
</svg>`

export const LEXON_LOGO_PATH = LEXON_LOGO_SVG

const LOGO_VS = `#version 300 es
precision highp float;

layout(location = 0) in vec3 aPos;
layout(location = 1) in vec3 aNormal;
layout(location = 2) in vec2 aUv;

uniform mat4 uProjection;
uniform mat4 uView;
uniform mat4 uModel;
uniform mat3 uNormalMatrix;
uniform vec3 uCameraPos;

out vec3 vWorldPos;
out vec3 vNormal;
out vec2 vUv;
out vec3 vViewDir;
out float vLocalX;

void main() {
    vec4 worldPos = uModel * vec4(aPos, 1.0);
    vWorldPos = worldPos.xyz;
    vNormal = normalize(uNormalMatrix * aNormal);
    vUv = aUv;
    vViewDir = normalize(uCameraPos - worldPos.xyz);
    vLocalX = aPos.x;
    gl_Position = uProjection * uView * worldPos;
}
`

const LOGO_FS = `#version 300 es
precision highp float;

in vec3 vWorldPos;
in vec3 vNormal;
in vec2 vUv;
in vec3 vViewDir;
in float vLocalX;

uniform vec3 uLightPosMouse;
uniform vec2 uMouseNorm;
uniform float uTime;
uniform float uAlpha;
uniform vec3 uBaseColor;

out vec4 fragColor;

const float PI = 3.14159265359;

float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

float brushedNoise(vec2 p) {
    vec2 st1 = vec2(p.x * 3.2, p.y * 0.025);
    float n1 = hash12(floor(st1));
    float n2 = hash12(floor(st1 + vec2(1.0, 0.0)));
    float g1 = mix(n1, n2, smoothstep(0.0, 1.0, fract(st1.x)));

    vec2 st2 = vec2(p.x * 6.5, p.y * 0.05);
    float n3 = hash12(floor(st2));
    float n4 = hash12(floor(st2 + vec2(1.0, 0.0)));
    float g2 = mix(n3, n4, smoothstep(0.0, 1.0, fract(st2.x)));

    return (g1 * 0.70 + g2 * 0.30) - 0.5;
}

float D_GGX_Aniso(float roughnessX, float roughnessY, float NoH, float ToH, float BoH) {
    float aX = roughnessX * roughnessX;
    float aY = roughnessY * roughnessY;
    float d = (ToH * ToH) / (aX * aX) + (BoH * BoH) / (aY * aY) + NoH * NoH;
    return 1.0 / max(PI * aX * aY * d * d, 0.0001);
}

vec3 fresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (vec3(1.0) - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

vec3 studioEnvironment(vec3 R, float rough) {
    float horizon = smoothstep(-0.25, 0.30, R.y);
    vec3 ground = vec3(0.12, 0.09, 0.07); // Deep warm bronze ground shadow
    vec3 sky = vec3(0.72, 0.66, 0.60); // Warm champagne studio overhead
    vec3 env = mix(ground, sky, horizon);
    
    // Top softbox reflection (studio light source)
    float softboxTop = smoothstep(0.60, 0.98, R.y) * 1.20;
    // Lateral strip lights (reflection lines on letter curves and chamfers)
    float stripLight = smoothstep(0.72, 0.98, abs(R.x)) * smoothstep(-0.25, 0.45, R.y) * 1.05;
    // Dynamic horizon glint line
    float horizonGlint = smoothstep(0.04, 0.0, abs(R.y - 0.05)) * 0.38;
    
    env += vec3(1.08, 1.00, 0.92) * softboxTop + vec3(0.98, 0.90, 0.80) * stripLight + vec3(1.08, 1.00, 0.92) * horizonGlint;
    return env;
}

void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);

    vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
    vec3 T = normalize(cross(up, N));
    vec3 B = cross(N, T);

    // Subtle satin micro-grain (soft, silky brushed effect)
    float grain = brushedNoise(vWorldPos.xy);
    N = normalize(N + T * (grain * 0.009));

    // Reference-Matched Champagne Bronze / Desert Titanium Palette
    // Sampled mathematically from reference image across L, e, x, o, n
    // L & e: champagne bronze / warm titanium
    // x & o: luminous champagne platinum/gold
    // n: warm satin champagne gold
    float gradT = clamp((vLocalX + 315.5) / 631.0, 0.0, 1.0);
    vec3 goldLeft  = vec3(0.28, 0.23, 0.18);
    vec3 goldMid   = vec3(0.42, 0.36, 0.29);
    vec3 goldRight = vec3(0.46, 0.38, 0.30);
    vec3 rawAlbedo = gradT < 0.52
        ? mix(goldLeft, goldMid, gradT / 0.52)
        : mix(goldMid, goldRight, (gradT - 0.52) / 0.48);

    // Deep 3D side extrusions & bevel shading:
    // Perpendicular side walls receive strong ambient occlusion and deep shadowed sepia-bronze depth
    float frontFacing = abs(N.z);
    float isSide = smoothstep(0.85, 0.18, frontFacing);
    vec3 sideColor = rawAlbedo * vec3(0.18, 0.16, 0.14);
    vec3 albedo = mix(rawAlbedo, sideColor, isSide);
    vec3 F0 = albedo * 0.95;

    // Polished satin anisotropic specular roughness (clean, lustrous metallic reflection)
    float rx = clamp(0.09 + grain * 0.008, 0.02, 1.0);
    float ry = clamp(0.26 + grain * 0.008, 0.02, 1.0);

    vec3 totalSpecular = vec3(0.0);

    // 1. Key Light (Warm top-left studio key)
    {
        vec3 L = normalize(vec3(-130.0, 180.0, 150.0));
        vec3 H = normalize(V + L);
        float NoL = max(dot(N, L), 0.0);
        float NoH = max(dot(N, H), 0.0);
        float D = D_GGX_Aniso(rx, ry, NoH, dot(T, H), dot(B, H));
        vec3 F = fresnelSchlick(max(dot(H, V), 0.0), F0);
        totalSpecular += D * F * NoL * vec3(0.95, 0.88, 0.80) * 1.3;
    }

    // 2. Rim Light (Golden champagne grazing light on chamfers)
    {
        vec3 L = normalize(vec3(160.0, -90.0, 80.0));
        vec3 H = normalize(V + L);
        float NoL = max(dot(N, L), 0.0);
        float NoH = max(dot(N, H), 0.0);
        float D = D_GGX_Aniso(rx, ry, NoH, dot(T, H), dot(B, H));
        vec3 F = fresnelSchlick(max(dot(H, V), 0.0), F0);
        totalSpecular += D * F * NoL * vec3(0.90, 0.84, 0.76) * 1.4;
    }

    // 3. Dynamic Cursor Light (runs champagne gleam across metal with mouse)
    {
        vec3 lightPos = vec3(uLightPosMouse.xy, 90.0);
        vec3 toLight = lightPos - vWorldPos;
        float dist = length(toLight);
        vec3 L = normalize(toLight);
        vec3 H = normalize(V + L);
        float atten = 1.0 / (1.0 + 0.00030 * dist * dist);
        float NoL = max(dot(N, L), 0.0);
        float NoH = max(dot(N, H), 0.0);
        float D = D_GGX_Aniso(rx, ry, NoH, dot(T, H), dot(B, H));
        vec3 F = fresnelSchlick(max(dot(H, V), 0.0), F0);
        totalSpecular += D * F * NoL * vec3(1.05, 0.98, 0.88) * atten * 2.2;
    }

    // 4. Sharp 45° Bevel Chamfer Shading:
    // Top bevel catches crisp champagne specular rim, bottom falls into bronze shadow
    float isBevel = smoothstep(0.30, 0.65, frontFacing) * smoothstep(0.94, 0.72, frontFacing);
    vec3 bevelLightDir = normalize(vec3(-0.30, 0.90, 0.35));
    float bevelDot = dot(N, bevelLightDir);
    float bevelSpec = pow(max(bevelDot, 0.0), 16.0);
    vec3 bevelGleam = isBevel * smoothstep(-0.1, 0.6, N.y) * vec3(0.95, 0.88, 0.80) * bevelSpec * 1.6;

    vec3 R = reflect(-V, N);
    vec3 envSpecular = studioEnvironment(R, (rx + ry) * 0.5) * fresnelSchlick(max(dot(N, V), 0.0), F0);

    // Warm ambient base with vertical ambient occlusion (darker underneath like reference)
    float vertAO = clamp(N.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 ambient = mix(albedo * 0.35, albedo * 0.85, vertAO * (1.0 - isSide * 0.45));
    vec3 col = ambient + totalSpecular + bevelGleam + envSpecular * albedo * 0.65;

    // ACES Tone mapping for realistic photographic film response
    col = (col * (2.51 * col + vec3(0.03))) / (col * (2.43 * col + vec3(0.59)) + vec3(0.14));
    col = pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2));

    fragColor = vec4(col * uAlpha, uAlpha);
}
`

export interface Logo3DMesh {
  vao: WebGLVertexArrayObject
  posBuffer: WebGLBuffer
  normBuffer: WebGLBuffer
  uvBuffer: WebGLBuffer
  ibo: WebGLBuffer
  indexCount: number
  indexType: number
  program: WebGLProgram
  uniforms: {
    uProjection: WebGLUniformLocation | null
    uView: WebGLUniformLocation | null
    uModel: WebGLUniformLocation | null
    uNormalMatrix: WebGLUniformLocation | null
    uCameraPos: WebGLUniformLocation | null
    uLightPosMouse: WebGLUniformLocation | null
    uMouseNorm: WebGLUniformLocation | null
    uTime: WebGLUniformLocation | null
    uAlpha: WebGLUniformLocation | null
    uBaseColor: WebGLUniformLocation | null
  }
}

export function createLexonLogo3D(gl: WebGL2RenderingContext): Logo3DMesh | null {
  if (typeof window === 'undefined' || !window.DOMParser) return null

  try {
    const loader = new SVGLoader()
    const svgData = loader.parse(LEXON_LOGO_SVG)

    const geometries: THREE.BufferGeometry[] = []
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 22,
      bevelEnabled: true,
      bevelSegments: 1, // 45 degree industrial chamfer
      bevelSize: 1.5,
      bevelThickness: 1.6,
    }

    for (const path of svgData.paths) {
      const shapes = SVGLoader.createShapes(path)
      console.log('SVGLoader path shapes count:', shapes.length)
      for (const shape of shapes) {
        geometries.push(new THREE.ExtrudeGeometry(shape, extrudeSettings))
      }
    }
    console.log('Total geometries created:', geometries.length)

    if (geometries.length === 0) return null

    const merged = BufferGeometryUtils.mergeGeometries(geometries, false)
    geometries.forEach((g) => g.dispose())

    merged.scale(1, -1, 1)
    merged.computeBoundingBox()
    merged.center()
    merged.computeVertexNormals()

    const positions = merged.attributes.position.array as Float32Array
    const normals = merged.attributes.normal.array as Float32Array
    const uvs = merged.attributes.uv
      ? (merged.attributes.uv.array as Float32Array)
      : new Float32Array((positions.length / 3) * 2)

    const count = merged.attributes.position.count
    let indices: Uint16Array | Uint32Array
    let isIndex32 = false
    if (merged.index) {
      indices = merged.index.array as (Uint16Array | Uint32Array)
      isIndex32 = indices instanceof Uint32Array
    } else {
      if (count > 65535) {
        indices = new Uint32Array(count)
        isIndex32 = true
      } else {
        indices = new Uint16Array(count)
        isIndex32 = false
      }
      for (let i = 0; i < count; i++) indices[i] = i
    }

    const vao = gl.createVertexArray()!
    gl.bindVertexArray(vao)

    const posBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(0)
    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 0, 0)

    const normBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(1)
    gl.vertexAttribPointer(1, 3, gl.FLOAT, false, 0, 0)

    const uvBuffer = gl.createBuffer()!
    gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW)
    gl.enableVertexAttribArray(2)
    gl.vertexAttribPointer(2, 2, gl.FLOAT, false, 0, 0)

    const ibo = gl.createBuffer()!
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo)
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

    gl.bindVertexArray(null)
    merged.dispose()

    // Compile native WebGL2 program
    const makeShader = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error('Logo shader error:', gl.getShaderInfoLog(sh))
      }
      return sh
    }

    const program = gl.createProgram()!
    const vs = makeShader(gl.VERTEX_SHADER, LOGO_VS)
    const fs = makeShader(gl.FRAGMENT_SHADER, LOGO_FS)
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Logo program link error:', gl.getProgramInfoLog(program))
    }
    gl.deleteShader(vs)
    gl.deleteShader(fs)

    const uniforms = {
      uProjection: gl.getUniformLocation(program, 'uProjection'),
      uView: gl.getUniformLocation(program, 'uView'),
      uModel: gl.getUniformLocation(program, 'uModel'),
      uNormalMatrix: gl.getUniformLocation(program, 'uNormalMatrix'),
      uCameraPos: gl.getUniformLocation(program, 'uCameraPos'),
      uLightPosMouse: gl.getUniformLocation(program, 'uLightPosMouse'),
      uMouseNorm: gl.getUniformLocation(program, 'uMouseNorm'),
      uTime: gl.getUniformLocation(program, 'uTime'),
      uAlpha: gl.getUniformLocation(program, 'uAlpha'),
      uBaseColor: gl.getUniformLocation(program, 'uBaseColor'),
    }

    return {
      vao,
      posBuffer,
      normBuffer,
      uvBuffer,
      ibo,
      indexCount: indices.length,
      indexType: isIndex32 ? gl.UNSIGNED_INT : gl.UNSIGNED_SHORT,
      program,
      uniforms,
    }
  } catch (err) {
    console.error('Failed to create LexonLogo3D:', err)
    return null
  }
}
