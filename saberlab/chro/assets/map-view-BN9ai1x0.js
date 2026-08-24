import{B as ml,o as wn,aa as vl,q as ef,T as tf,E as of,a8 as Ci,ap as gl,aq as yl,a6 as nf,ar as qr,as as bl,L as Vo,U as zo,at as rf,Q as Ne}from"./index-5oGlar6o.js";import{s as Sl,e as Rr,q as Sn,S as Pi,O as Ai,B as _t,V as Be,M as be,a as xe,C as Ke,T as Li,L as Ve,b as Ee,c as Me,Z as St,A as Ae,d as ot,f as Ue,g as De,D as Zt,h as Jo,R as Wt,i as Nt,j as Jt,k as nt,l as Yo,W as En,H as _l,m as Ti,F as ao,P as qe,n as Cn,o as Tl,p as sf,r as af,t as H,Q as ge,E as Ri,u as Eo,N as lf,v as Ot,w as $n,x as ut,G as it,y as Dt,z as cf,I as xl,J as Kr,K as uo,U as mn,X as Ml,Y as Gt,_ as ff,$ as wl,a0 as El,a1 as Cl,a2 as Pl,a3 as Al,a4 as Ll,a5 as uf,a6 as hf,a7 as df,a8 as pf,a9 as mf,aa as vf,ab as gf,ac as yf,ad as bf,ae as Sf,af as _f,ag as Tf,ah as xf,ai as Mf,aj as wf,ak as Ef,al as Jr,am as Oi,an as Is,ao as Cf,ap as Pf,aq as Af,ar as Lf,as as Rf,at as ks,au as Of,av as Df,aw as Or,ax as yt,ay as Ff,az as qt,aA as Ns,aB as Bs,aC as If,aD as kf,aE as Us,aF as Gs,aG as Nf,aH as Bf,aI as Uf,aJ as Gf,aK as Wf,aL as zf,aM as jf,aN as Hf,aO as lo,aP as Vf,aQ as ci,aR as Yi,aS as Ws,aT as zs,aU as js,aV as Hs,aW as Do,aX as er,aY as Xf,aZ as Vs,a_ as Xs,a$ as Yf,b0 as Ys,b1 as jo,b2 as _n,b3 as Zf,b4 as qf,b5 as Kf,b6 as Jf,b7 as Qf,b8 as $f,b9 as eu,ba as Rl,bb as Ol,bc as Dr,bd as tu,be as ou,bf as Zs,bg as tr,bh as qs,bi as Ks,bj as iu,bk as Fr,bl as Dl,bm as nu,bn as xi,bo as Fl,bp as zt,bq as Qt,br as ru,bs as su,bt as au,bu as Qe,bv as lu,bw as cu,bx as Il,by as fu,bz as uu,bA as hu,bB as du,bC as pu,bD as or,bE as mu,bF as kl,bG as vu,bH as gu,bI as yu,bJ as bu,bK as Su,bL as _u,bM as Tu,bN as xu,bO as Mu,bP as Nl,bQ as wu,bR as Js,bS as Qs,bT as $s,bU as ea,bV as Eu,bW as ir,bX as Cu,bY as ho,bZ as Pu,b_ as Au,b$ as Lu,c0 as Ru}from"./index.lazy-B44HGgpa.js";class Ou{constructor(e,i){this.raw=e,this.secondsAt=i}raw;secondsAt;smooth=new Map;baseProvider(e,i){const[r="",...o]=e.split("."),t=this.raw(r,i);if(t===void 0)return;let s=[...t],a=r,l=r.endsWith("Rotation");for(const c of o){if(a+=`.${c}`,c.startsWith("s")){const f=Number.parseFloat(c.slice(1).replace("_","."));if(!Number.isFinite(f))continue;s=this.smoothed(a,s,i,f,l);continue}s=Array.from(c).map(f=>s["xyzw".indexOf(f)]??0),l=!1}return s}reset(){this.smooth.clear()}smoothed(e,i,r,o,t){const s=this.smooth.get(e);if(s===void 0||r<s.songBpmTime||s.values.length!==i.length){const c=[...i];return this.smooth.set(e,{songBpmTime:r,values:c}),c}if(r===s.songBpmTime)return s.values;const a=this.secondsAt(r)-this.secondsAt(s.songBpmTime),l=Math.min(Math.max(a*o,0),1);if(t&&s.values.length===3&&i.length===3){const c=[s.values[0]??0,s.values[1]??0,s.values[2]??0],f=[i[0]??0,i[1]??0,i[2]??0],u=Sl([{value:Sn(c),time:0},{value:Sn(f),time:1}],l);s.values=u===void 0?[...i]:[...Rr(u)]}else s.values=s.values.map((c,f)=>c+((i[f]??0)-c)*l);return s.songBpmTime=r,s.values}}const yo={autoExposureLimit:1e3,offset:0,height:10,startY:-300,attenuation:.002},Qr=.06,Du=.35,dt=`
vec3 chroToneMap(vec3 color) {
  vec3 numerator = color * (2.505 * color + 0.031);
  vec3 denominator = color * (2.425 * color + 0.592) + 0.141;
  return clamp(numerator / denominator, 0.0, 1.0);
}
`,Bl=`
vec2 chroDxt5NormalXY(vec4 packedNormal) {
  return vec2(packedNormal.r * packedNormal.a, packedNormal.g) * 2.0 - 1.0;
}
`,ze=`
uniform sampler2D _BloomPrePassTexture;
uniform vec2 _CustomFogTextureToScreenRatio;
uniform float _CustomFogOffset;
uniform float _CustomFogAttenuation;
uniform float _CustomFogHeightFogStartY;
uniform float _CustomFogHeightFogHeight;
uniform float _FogEnabled;
uniform float _HeightFogEnabled;
uniform float _FogHeightOffset;
uniform float _FogHeightScale;

float chroDistanceFog(vec3 worldPos, float fogStartOffset, float fogScale) {
  vec3 delta = worldPos - cameraPosition;
  float result = max(dot(delta, delta) - fogStartOffset, 0.0);
  result = max(result * fogScale - _CustomFogOffset, 0.0);
  return 1.0 - 1.0 / (result * _CustomFogAttenuation + 1.0);
}

float chroHeightFog(vec3 worldPos) {
  float result = worldPos.y * _FogHeightScale + _FogHeightOffset
    - (_CustomFogHeightFogHeight + _CustomFogHeightFogStartY);
  result = clamp(result / _CustomFogHeightFogHeight, 0.0, 1.0);
  return result * result * (3.0 - 2.0 * result);
}

float chroFogAmount(vec3 worldPos, float fogStartOffset, float fogScale) {
  if (_FogEnabled == 0.0) return 0.0;
  float fogFactor = chroDistanceFog(worldPos, fogStartOffset, fogScale);
  if (_HeightFogEnabled != 0.0) {
    fogFactor = 1.0 - chroHeightFog(worldPos) * (1.0 - fogFactor);
  }
  return clamp(fogFactor, 0.0, 1.0);
}

vec4 chroFogColor(vec4 screenPos) {
  vec2 uv = (screenPos.xy / screenPos.w - 0.5) * _CustomFogTextureToScreenRatio + 0.5;
  return vec4(texture2D(_BloomPrePassTexture, uv).rgb, 0.0);
}

vec4 applyChroFog(vec4 col, vec4 screenPos, vec3 worldPos, float fogStartOffset, float fogScale) {
  float fogFactor = chroFogAmount(worldPos, fogStartOffset, fogScale);
  if (fogFactor == 0.0) return col;
  return mix(col, chroFogColor(screenPos), fogFactor);
}

vec4 applyOpaqueLightFog(
  vec4 col,
  vec4 screenPos,
  vec3 worldPos,
  float fogStartOffset,
  float fogScale
) {
  float fogFactor = chroFogAmount(worldPos, fogStartOffset, fogScale);
  col *= 1.0 - fogFactor;
  col.rgb = col.rgb * 2.0 + fogFactor * (chroFogColor(screenPos).rgb - col.rgb);
  return col;
}

vec4 applyTransparentLightFog(vec4 col, vec3 worldPos, float fogStartOffset, float fogScale) {
  return col * (1.0 - chroFogAmount(worldPos, fogStartOffset, fogScale));
}

float chroEmissiveAlpha(float alpha, vec3 worldPos, float fogStartOffset, float fogScale) {
  float fogFactor = chroFogAmount(worldPos, fogStartOffset, fogScale);
  return smoothstep(${Qr}, ${Du}, abs(alpha) * (1.0 - fogFactor));
}
`,Pn=`
vec3 noodleCutoutOffset(float seed) {
  vec3 offset = fract(sin(seed * vec3(12.9898, 78.233, 37.719)) * 43758.5453) * 2.0 - 1.0;
  return normalize(offset) * 10.0;
}
`,jt=`
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vViewPos;
varying vec3 vViewNormal;
varying vec3 vCutoutPos;
varying vec2 vUv;
varying vec4 vScreenPos;
#ifdef USE_VERTEX_COLOR
attribute vec4 color;
varying vec4 vVertexColor;
#endif
#ifdef USE_INSTANCING_COLOR
varying vec3 vInstanceColor;
#endif
#ifdef INSTANCED_COLOR_ALPHA
attribute float instanceColorAlpha;
varying float vColorAlpha;
#endif
varying float vDissolve;
#ifdef REFLECTIVE_SURFACE
varying vec3 vReflectionDirection;
varying float vCameraDistance;
#endif
#ifdef REFLECTION_RIM
uniform float _EdgeStrength;
uniform float _EdgeBias;
uniform float _EdgeDistanceStart;
uniform float _EdgeDistanceGain;
varying float vReflectionEdge;
#endif
#ifdef USE_INSTANCING
attribute float instanceDissolve;
attribute float instanceCutoutSeed;
#endif
${Pn}

vec3 chroTransformNormal(mat3 basis, vec3 normal) {
  vec3 x = basis[0];
  vec3 y = basis[1];
  vec3 z = basis[2];
  vec3 cofactorX = cross(y, z);
  vec3 cofactorY = cross(z, x);
  vec3 cofactorZ = cross(x, y);
  vec3 transformed = cofactorX * normal.x + cofactorY * normal.y + cofactorZ * normal.z;
  float orientation = dot(x, cofactorX);
  return normalize(transformed * (orientation < 0.0 ? -1.0 : 1.0));
}

void main() {
  vDissolve = 1.0;
  #ifdef INSTANCED_COLOR_ALPHA
  vColorAlpha = 1.0;
  #endif
  vec4 localPos = vec4(position, 1.0);
  mat3 instanceBasis = mat3(1.0);
  vec3 cutoutPos = position;
  vec3 cutoutOffset = vec3(0.0);
  #ifdef USE_INSTANCING
  localPos = instanceMatrix * localPos;
  instanceBasis = mat3(instanceMatrix);
  cutoutPos = instanceBasis * cutoutPos;
  cutoutOffset = noodleCutoutOffset(instanceCutoutSeed);
  vDissolve = instanceDissolve;
  #ifdef INSTANCED_COLOR_ALPHA
  vColorAlpha = instanceColorAlpha;
  #endif
  #endif
  #ifdef USE_INSTANCING_COLOR
  vInstanceColor = instanceColor;
  #endif
  #ifdef USE_VERTEX_COLOR
  vVertexColor = color;
  #endif
  vec4 worldPos = modelMatrix * localPos;
  vec4 viewPos = viewMatrix * worldPos;
  vWorldPos = worldPos.xyz;
  vWorldNormal = chroTransformNormal(mat3(modelMatrix) * instanceBasis, normal);
  vCutoutPos = mat3(modelMatrix) * cutoutPos + cutoutOffset;
  vViewPos = viewPos.xyz;
  vViewNormal = normalize(mat3(viewMatrix) * vWorldNormal);
  vUv = uv;
  #ifdef REFLECTIVE_SURFACE
  vec3 viewDirection = normalize(cameraPosition - vWorldPos);
  vec3 reflectionDirection = reflect(-viewDirection, vWorldNormal);
  vReflectionDirection = vec3(-reflectionDirection.x, reflectionDirection.y, -reflectionDirection.z);
  vCameraDistance = distance(vWorldPos, cameraPosition);
  #ifdef REFLECTION_RIM
  vReflectionEdge = clamp(
    (1.0 + _EdgeBias - dot(viewDirection, vWorldNormal)) * _EdgeStrength
      + max(vCameraDistance - _EdgeDistanceStart, 0.0) * _EdgeDistanceGain,
    0.0,
    1.0
  );
  #endif
  #endif
  gl_Position = projectionMatrix * viewMatrix * worldPos;
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
}
`;function Ul(n,e){return`
const float noiseSliceCount = 16.0;
const float noiseAtlasTiles = 4.0;
const float noiseSliceSize = 16.0;
const float noiseSliceGutter = 1.0;
const float noiseTileSize = noiseSliceSize + noiseSliceGutter * 2.0;
const float noiseAtlasSize = noiseTileSize * noiseAtlasTiles;

float ${e}Slice(vec2 position, float slice) {
  float wrappedSlice = mod(mod(slice, noiseSliceCount) + noiseSliceCount, noiseSliceCount);
  vec2 tile = vec2(mod(wrappedSlice, noiseAtlasTiles), floor(wrappedSlice / noiseAtlasTiles));
  vec2 atlasUv = (tile * noiseTileSize + noiseSliceGutter + fract(position) * noiseSliceSize) / noiseAtlasSize;
  return texture2D(${n}, atlasUv).r;
}

float ${e}(vec3 position) {
  float slicePosition = position.z * noiseSliceCount - 0.5;
  float slice = floor(slicePosition);
  float blend = fract(slicePosition);
  float nearNoise = ${e}Slice(position.xy, slice);
  float farNoise = ${e}Slice(position.xy, slice + 1.0);
  return mix(nearNoise, farNoise, blend);
}
`}const Gl=`
float noodleNoiseHash(vec3 point) {
  return fract(sin(dot(point, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

float noodleCutoutNoise(vec3 point) {
  point *= 8.0;
  vec3 cell = floor(point);
  vec3 offset = fract(point);
  offset = offset * offset * (3.0 - 2.0 * offset);
  return mix(
    mix(
      mix(noodleNoiseHash(cell), noodleNoiseHash(cell + vec3(1.0, 0.0, 0.0)), offset.x),
      mix(noodleNoiseHash(cell + vec3(0.0, 1.0, 0.0)), noodleNoiseHash(cell + vec3(1.0, 1.0, 0.0)), offset.x),
      offset.y
    ),
    mix(
      mix(noodleNoiseHash(cell + vec3(0.0, 0.0, 1.0)), noodleNoiseHash(cell + vec3(1.0, 0.0, 1.0)), offset.x),
      mix(noodleNoiseHash(cell + vec3(0.0, 1.0, 1.0)), noodleNoiseHash(cell + vec3(1.0, 1.0, 1.0)), offset.x),
      offset.y
    ),
    offset.z
  );
}
`,Co=`
varying float vDissolve;
varying vec3 vCutoutPos;
uniform float _CutoutSize;
uniform float _CutoutEdgeWidth;
uniform float _CutoutSoftening;
${Gl}
float applyNoodleDissolve() {
  float visibility = vDissolve;
  float cutout = 1.0 - visibility;
  cutout -= _CutoutSoftening * 4.0 * visibility * (1.0 - visibility);
  float cutoutDistance = noodleCutoutNoise(vCutoutPos * 0.25 * _CutoutSize) - cutout;
  if (cutoutDistance < 0.0) discard;
  return cutoutDistance < _CutoutEdgeWidth * cutout ? 1.0 : 0.0;
}
`,Wl=`
varying float vDissolve;
varying vec3 vCutoutPos;
uniform sampler2D _CutoutNoiseTex;
uniform float _CutoutTexScale;
${Ul("_CutoutNoiseTex","nativeCutoutNoise")}
float applyNativeCutoutDissolve() {
  float cutout = 1.0 - vDissolve;
  float cutoutDistance = nativeCutoutNoise(vCutoutPos * _CutoutTexScale) - cutout * 1.1 + 0.1;
  if (cutoutDistance < 0.0) discard;
  return cutoutDistance < 0.05 ? 1.0 : 0.0;
}
`,pt=`
uniform vec3 _Color;
#ifdef INSTANCED_COLOR
varying vec3 vInstanceColor;
#endif

vec3 baseColor() {
  #ifdef INSTANCED_COLOR
  return vInstanceColor;
  #else
  return _Color;
  #endif
}
`,Fu=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Iu=`
uniform sampler2D _SourceTex;
uniform vec2 _SourceTexelSize;
varying vec2 vUv;
void main() {
  vec2 d = _SourceTexelSize * 0.997;
  vec4 color = texture2D(_SourceTex, vUv + d);
  color += texture2D(_SourceTex, vUv - d);
  color += texture2D(_SourceTex, vUv + vec2(-d.x, d.y));
  color += texture2D(_SourceTex, vUv + vec2(d.x, -d.y));
  gl_FragColor = color * 0.25;
}
`,zl=`
uniform sampler2D _SourceTex;
uniform sampler2D _BloomTex;
uniform vec2 _SourceTexelSize;
uniform float _SampleScale;
uniform float _CombineSrc;
uniform float _CombineDst;

vec4 bloomfogUpsample() {
  vec4 d = _SourceTexelSize.xyxy * vec4(1.0, 1.0, -1.0, 0.0) * _SampleScale;
  vec4 color = texture2D(_SourceTex, vUv - d.xy);
  color += texture2D(_SourceTex, vUv - d.wy) * 2.0;
  color += texture2D(_SourceTex, vUv - d.zy);
  color += texture2D(_SourceTex, vUv + d.zw) * 2.0;
  color += texture2D(_SourceTex, vUv) * 4.0;
  color += texture2D(_SourceTex, vUv + d.xw) * 2.0;
  color += texture2D(_SourceTex, vUv + d.zy);
  color += texture2D(_SourceTex, vUv + d.wy) * 2.0;
  color += texture2D(_SourceTex, vUv + d.xy);
  vec4 upsampled = color / 16.0;
  return texture2D(_BloomTex, vUv) * _CombineSrc + upsampled * _CombineDst;
}
`,ku=`
varying vec2 vUv;
${zl}
void main() {
  gl_FragColor = bloomfogUpsample();
}
`,Nu=`
uniform sampler2D _GlobalIntensityTex;
uniform float _AutoExposureLimit;
varying vec2 vUv;
${zl}
${dt}
const vec3 BLOOMFOG_LUMINANCE_WEIGHTS = vec3(0.301, 0.588, 0.111);
const float BLOOMFOG_EXPOSURE_SCALE = 0.1;
const float BLOOMFOG_EXPOSURE_LIMIT_SCALE = 0.004;
void main() {
  vec4 color = bloomfogUpsample();
  vec3 globalIntensity = texture2D(_GlobalIntensityTex, vec2(0.5)).rgb;
  float luminance = dot(globalIntensity, BLOOMFOG_LUMINANCE_WEIGHTS);
  float exposure = min(
    BLOOMFOG_EXPOSURE_SCALE * inversesqrt(max(luminance, 1e-12)),
    _AutoExposureLimit * BLOOMFOG_EXPOSURE_LIMIT_SCALE
  );
  color.rgb *= exposure;
  color.rgb = chroToneMap(color.rgb);
  gl_FragColor = clamp(color, 0.0, 1.0);
}
`,Bu=`
uniform mat4 _InverseProjectionMatrix;
uniform mat4 _CameraToWorldMatrix;
varying vec3 vWorldDir;
void main() {
  gl_Position = vec4(position.xy, 1.0, 1.0);
  vec4 viewDir = _InverseProjectionMatrix * vec4(position.xy, 1.0, 1.0);
  vWorldDir = mat3(_CameraToWorldMatrix) * viewDir.xyz;
}
`,Uu=`
uniform sampler2D _GradientTex;
uniform vec4 _Color;
varying vec3 vWorldDir;
${dt}
void main() {
  float t = normalize(vWorldDir).y * 0.5 + 0.5;
  vec3 skyColor = texture2D(_GradientTex, vec2(t, 0.5)).rgb * _Color.rgb;
  gl_FragColor = vec4(chroToneMap(skyColor), 0.0);
}
`,Gu=`
attribute vec3 viewPos;
attribute vec4 quadColor;
attribute vec3 uv3;
varying vec4 vTangent;
varying vec4 vColor;
varying vec3 vUv3;
vec3 captureGammaToLinear(vec3 color) {
  return color * (color * (color * 0.305 + 0.683) + 0.012);
}
void main() {
  gl_Position = vec4(position.xy * 2.0 - 1.0, 0.0, 1.0);
  vTangent = vec4(viewPos / viewPos.z, 1.0 / viewPos.z);
  vec3 color = captureGammaToLinear(quadColor.rgb);
  vColor = vec4(color, quadColor.a);
  vUv3 = uv3;
}
`,Wu=`
uniform sampler2D _BloomfogAlphaMask;
uniform float _CaptureFalloff;
uniform float _CaptureOffset;
varying vec4 vTangent;
varying vec4 vColor;
varying vec3 vUv3;
void main() {
  vec3 viewPos = vTangent.xyz / vTangent.w;
  float travel = max(dot(viewPos, viewPos) / max(vColor.a, 1.0) - _CaptureOffset, 0.0);
  float response = 1.0 / (1.0 + travel * _CaptureFalloff);
  vec4 lineMask = texture2D(_BloomfogAlphaMask, vec2(vUv3.x / vUv3.z, vUv3.y));
  float weight = response * lineMask.a * vColor.a * vColor.a;
  gl_FragColor = vec4(vColor.rgb * lineMask.rgb * weight, weight);
}
`,Ho=512,zu=129.8,ju=.0201,Hu=10,Vu=.748,Xu=1,Yu=.997,Zu=1.198,qu=.251;function Ku(){let n=Ho/2,e=Ho/2;const i=Math.log2(Math.max(n,e))+Math.min(Hu,10)-10,r=Math.floor(i),o=Math.min(Math.max(r,1),16),t=[];for(let s=0;s<o;s++)t.push({width:n,height:e}),n=Math.max(Math.floor(n/2),1),e=Math.max(Math.floor(e/2),1);return{levels:t,sampleScale:.5+i-r}}function Ju(n,e){const i=Math.min(1,(Vu*(n+1)/(e-1))**Yu),r=Math.min(1,1+Xu-i),o=n===0?qu:n===e-2?Zu:1;return{currentLevel:i*o,upsampled:r*o}}function Qu(){return{startClip:[0,0,0,0],endClip:[0,0,0,0],startView:[0,0,0],endView:[0,0,0]}}function ta(n,e,i){i[0]=n[0]*e[0]+n[4]*e[1]+n[8]*e[2]+n[12],i[1]=n[1]*e[0]+n[5]*e[1]+n[9]*e[2]+n[13],i[2]=n[2]*e[0]+n[6]*e[1]+n[10]*e[2]+n[14]}function oa(n,e,i){i[0]=n[0]*e[0]+n[4]*e[1]+n[8]*e[2]+n[12],i[1]=n[1]*e[0]+n[5]*e[1]+n[9]*e[2]+n[13],i[2]=n[2]*e[0]+n[6]*e[1]+n[10]*e[2]+n[14],i[3]=n[3]*e[0]+n[7]*e[1]+n[11]*e[2]+n[15]}const Zi=(n,e,i)=>n+(e-n)*i;function $u(n){return n<=0?0:n<=.0031308?n*12.92:n<1?1.055*n**(1/2.4)-.055:n**(1/2.2)}function eh(n,e,i){const{startClip:r,endClip:o,startView:t,endView:s}=n;if(e){for(let a=0;a<4;a++)o[a]=Zi(r[a]??0,o[a]??0,i);for(let a=0;a<3;a++)s[a]=Zi(t[a]??0,s[a]??0,i)}else{for(let a=0;a<4;a++)r[a]=Zi(r[a]??0,o[a]??0,i);for(let a=0;a<3;a++)t[a]=Zi(t[a]??0,s[a]??0,i)}}function Fo(n,e,i,r=0){const o=n.startClip,t=n.endClip,s=i>0?o[e]>=-o[3]-r:o[e]<=o[3],a=i>0?t[e]>=-t[3]-r:t[e]<=t[3];if(!s&&!a)return!1;if(s!==a){const l=i>0?(-o[3]-o[e])/(t[e]-o[e]+t[3]-o[3]):(o[3]-o[e])/(t[e]-o[e]-t[3]+o[3]);eh(n,s,l)}return!0}function th(n,e,i,r,o,t,s,a,l,c){if(n.alpha<.01)return!1;ta(e,n.start,c.startView),ta(e,n.end,c.endView),oa(i,c.startView,c.startClip),oa(i,c.endView,c.endClip);const f=c;if(!Fo(f,0,1)||!Fo(f,0,-1)||!Fo(f,1,1)||!Fo(f,1,-1)||!Fo(f,2,-1)||!Fo(f,2,1,1e-4))return!1;const{startClip:u,endClip:h}=f;let d=u[0]/u[3]*.5+.5,p=u[1]/u[3]*.5+.5,m=h[0]/h[3]*.5+.5,v=h[1]/h[3]*.5+.5,g=m-d,y=v-p,S=Math.sqrt(g*g+y*y);S===0&&(S=1e-6),g/=S,y/=S;const b=1/64;m+=g*b,v+=y*b,d-=g*b,p-=y*b;const T=r*(n.widthMultiplier??1),C=-y*T,x=g*T,P=n.startWidth??1,O=n.endWidth??1,E=n.startAlpha??1,k=n.endAlpha??1,_=n.boostToWhite??0,L=n.color[0]+_,A=n.color[1]+_,W=n.color[2]+_;let B=n.alpha*(n.intensityMultiplier??1);n.limitAlpha&&(B=Math.min(Math.max(B,n.minAlpha??0),n.maxAlpha??1));const Z=$u(B),K=C*P,U=x*P,I=C*O,w=x*O,M=l*12;o[M]=d-K,o[M+1]=p-U,o[M+2]=0,o[M+3]=d+K,o[M+4]=p+U,o[M+5]=0,o[M+6]=m+I,o[M+7]=v+w,o[M+8]=0,o[M+9]=m-I,o[M+10]=v-w,o[M+11]=0;const R=f.startView,F=f.endView;t[M]=R[0],t[M+1]=R[1],t[M+2]=R[2],t[M+3]=R[0],t[M+4]=R[1],t[M+5]=R[2],t[M+6]=F[0],t[M+7]=F[1],t[M+8]=F[2],t[M+9]=F[0],t[M+10]=F[1],t[M+11]=F[2];const D=E*L,z=E*A,N=E*W,G=E*Z,q=k*L,Q=k*A,X=k*W,V=k*Z,ue=l*16;for(let ee=0;ee<8;ee+=4)s[ue+ee]=D,s[ue+ee+1]=z,s[ue+ee+2]=N,s[ue+ee+3]=G;for(let ee=8;ee<16;ee+=4)s[ue+ee]=q,s[ue+ee+1]=Q,s[ue+ee+2]=X,s[ue+ee+3]=V;return a[M]=0,a[M+1]=0,a[M+2]=P,a[M+3]=P,a[M+4]=0,a[M+5]=P,a[M+6]=O,a[M+7]=1,a[M+8]=O,a[M+9]=0,a[M+10]=1,a[M+11]=O,!0}function qi(n,e,i){if(i>n.length||i>e.length)return!1;for(let r=0;r<i;r++)if(n[r]!==e[r])return!1;return!0}const oh=[0,0,11,27,44,65,87,109,134,156,180,201,219,236,250,255,255,255,250,236,220,201,180,157,134,110,87,64,44,27,11,0],ih=n=>n===0||n===31?0:n===1?134:n===30?186:255;function nh(){const n=new Uint8Array(4096);for(let i=0;i<32;i++)for(let r=0;r<32;r++){const o=(i*32+r)*4;n[o]=n[o+1]=n[o+2]=255,n[o+3]=Math.round((oh[r]??0)*ih(i)/255)}const e=new Jo(n,32,32,Wt);return e.minFilter=Ve,e.magFilter=Ve,e.needsUpdate=!0,e}const ia=n=>Math.min(Math.max(n,0),1);function rh(){const n=new _t;return n.setAttribute("position",new De(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),n.setAttribute("uv",new De(new Float32Array([0,0,2,0,0,2]),2)),n}function Ki(n,e){return new En(n,e,{type:_l,format:Wt,minFilter:Ve,magFilter:Ve,wrapS:Jt,wrapT:Jt,depthBuffer:!1})}function nr(n,e){return new Ee({vertexShader:Fu,fragmentShader:n,uniforms:e,depthTest:!1,depthWrite:!1})}const Ji=Ku();class sh{fogUniforms;raw=Ki(Ho,Ho);downs=Ji.levels.map(({width:e,height:i})=>Ki(e,i));ups=Ji.levels.map(({width:e,height:i})=>Ki(e,i));prepass=Ki(Ho,Ho);captureScene=new Pi;passScene=new Pi;passCamera=new Ai(-1,1,1,-1,0,1);fsMesh;captureMesh;quadGeometry=new _t;alphaMask=nh();captureUniforms={_BloomfogAlphaMask:{value:this.alphaMask},_CaptureFalloff:{value:yo.attenuation},_CaptureOffset:{value:yo.offset}};capacity=0;quadAttributes=[];positionsArray=new Float32Array(0);viewPosArray=new Float32Array(0);colorsArray=new Float32Array(0);uvsArray=new Float32Array(0);positionsBits=new Uint32Array(0);viewPosBits=new Uint32Array(0);colorsBits=new Uint32Array(0);uvsBits=new Uint32Array(0);nextPositionsArray=new Float32Array(0);nextViewPosArray=new Float32Array(0);nextColorsArray=new Float32Array(0);nextUvsArray=new Float32Array(0);nextPositionsBits=new Uint32Array(0);nextViewPosBits=new Uint32Array(0);nextColorsBits=new Uint32Array(0);nextUvsBits=new Uint32Array(0);addCaptureMaterial;maxCaptureMaterial;downsampleMaterial;upsampleMaterial;finalUpsampleMaterial;gradientMaterial;gradientTexture=null;gradientTextureUniform={value:null};gradientUniforms={_GradientTex:this.gradientTextureUniform,_InverseProjectionMatrix:{value:new be},_CameraToWorldMatrix:{value:new be},_Color:{value:new Be(1,1,1,1)}};cachedGradientCamera=new Float64Array(32);nextGradientCamera=new Float64Array(32);downsampleUniforms={_SourceTex:{value:this.raw.texture},_SourceTexelSize:{value:new xe}};upsampleUniforms={_SourceTex:{value:this.raw.texture},_BloomTex:{value:this.raw.texture},_SourceTexelSize:{value:new xe},_SampleScale:{value:Ji.sampleScale},_CombineSrc:{value:1},_CombineDst:{value:1}};finalUpsampleUniforms={_SourceTex:{value:this.raw.texture},_BloomTex:{value:this.raw.texture},_SourceTexelSize:{value:new xe},_SampleScale:{value:Ji.sampleScale},_CombineSrc:{value:1},_CombineDst:{value:1},_GlobalIntensityTex:{value:this.downs.at(-1)?.texture??this.raw.texture},_AutoExposureLimit:{value:yo.autoExposureLimit}};clearColorTmp=new Ke;captureProjection=new be;lightQuadScratch=Qu();cachedRenderer=null;cachedQuadCount=-1;cachedAdditiveQuadCount=-1;cachedAutoExposureLimit=Number.NaN;cacheValid=!1;disposed=!1;constructor(){new Li().load("/chro/environments/textures/bloomfog-alpha-mask.png",i=>{if(this.disposed){i.dispose();return}i.minFilter=Ve,i.magFilter=Ve;const r=this.alphaMask;this.alphaMask=i,this.captureUniforms._BloomfogAlphaMask.value=i,r.dispose(),this.invalidate()}),this.fogUniforms={_BloomPrePassTexture:{value:this.prepass.texture},_CustomFogTextureToScreenRatio:{value:new xe(1,1)},_CustomFogOffset:{value:yo.offset},_CustomFogAttenuation:{value:yo.attenuation},_CustomFogHeightFogStartY:{value:yo.startY},_CustomFogHeightFogHeight:{value:yo.height}};const e=i=>new Ee({vertexShader:Gu,fragmentShader:Wu,uniforms:this.captureUniforms,side:nt,depthTest:!1,depthWrite:!1,transparent:!0,blending:ot,blendEquation:i,blendSrc:Me,blendDst:Me,blendEquationAlpha:i,blendSrcAlpha:St,blendDstAlpha:St});this.addCaptureMaterial=e(Ae),this.maxCaptureMaterial=e(Yo),this.downsampleMaterial=nr(Iu,this.downsampleUniforms),this.upsampleMaterial=nr(ku,this.upsampleUniforms),this.finalUpsampleMaterial=nr(Nu,this.finalUpsampleUniforms),this.gradientMaterial=new Ee({vertexShader:Bu,fragmentShader:Uu,uniforms:this.gradientUniforms,depthTest:!1,depthWrite:!1,transparent:!0,blending:ot,blendEquation:Ae,blendSrc:Me,blendDst:Me,blendEquationAlpha:Ae,blendSrcAlpha:St,blendDstAlpha:Me}),this.ensureCapacity(1),this.captureMesh=new Ue(this.quadGeometry,[this.addCaptureMaterial,this.maxCaptureMaterial]),this.captureMesh.frustumCulled=!1,this.captureScene.add(this.captureMesh),this.fsMesh=new Ue(rh(),this.downsampleMaterial),this.fsMesh.frustumCulled=!1,this.passScene.add(this.fsMesh)}ensureCapacity(e){let i=Math.max(this.capacity,256);for(;i<e;)i*=2;if(i===this.capacity)return;this.quadGeometry.dispose(),this.capacity=i,this.positionsArray=new Float32Array(i*12),this.viewPosArray=new Float32Array(i*12),this.colorsArray=new Float32Array(i*16),this.uvsArray=new Float32Array(i*12),this.nextPositionsArray=new Float32Array(i*12),this.nextViewPosArray=new Float32Array(i*12),this.nextColorsArray=new Float32Array(i*16),this.nextUvsArray=new Float32Array(i*12),this.positionsBits=new Uint32Array(this.positionsArray.buffer),this.viewPosBits=new Uint32Array(this.viewPosArray.buffer),this.colorsBits=new Uint32Array(this.colorsArray.buffer),this.uvsBits=new Uint32Array(this.uvsArray.buffer),this.nextPositionsBits=new Uint32Array(this.nextPositionsArray.buffer),this.nextViewPosBits=new Uint32Array(this.nextViewPosArray.buffer),this.nextColorsBits=new Uint32Array(this.nextColorsArray.buffer),this.nextUvsBits=new Uint32Array(this.nextUvsArray.buffer);const r=new Uint32Array(i*6);for(let t=0;t<i;t++){const s=t*4;r.set([s,s+1,s+2,s+2,s+3,s],t*6)}const o=[["position",this.positionsArray,3],["viewPos",this.viewPosArray,3],["quadColor",this.colorsArray,4],["uv3",this.uvsArray,3]];this.quadAttributes=o.map(([t,s,a])=>{const l=new De(s,a);return l.setUsage(Zt),this.quadGeometry.setAttribute(t,l),l}),this.quadGeometry.setIndex(new De(r,1)),this.quadGeometry.setDrawRange(0,0),this.invalidate()}writeQuads(e,i,r){this.ensureCapacity(e.length);let o=0,t=0;for(const s of["add","max"]){for(const a of e){if((a.blendMode??"max")!==s)continue;th(a,i,r,ju,this.nextPositionsArray,this.nextViewPosArray,this.nextColorsArray,this.nextUvsArray,o,this.lightQuadScratch)&&o++}s==="add"&&(t=o)}return{quadCount:o,additiveQuadCount:t}}outputMatches(e,i){if(!this.cacheValid||e!==this.cachedQuadCount||i!==this.cachedAdditiveQuadCount||!Object.is(Math.fround(this.finalUpsampleUniforms._AutoExposureLimit.value),this.cachedAutoExposureLimit))return!1;if(this.gradientTexture!==null){for(let r=0;r<32;r++)if(this.nextGradientCamera[r]!==this.cachedGradientCamera[r])return!1}return qi(this.positionsBits,this.nextPositionsBits,e*12)&&qi(this.viewPosBits,this.nextViewPosBits,e*12)&&qi(this.colorsBits,this.nextColorsBits,e*16)&&qi(this.uvsBits,this.nextUvsBits,e*12)}uploadQuadOutput(e,i){[this.positionsArray,this.nextPositionsArray]=[this.nextPositionsArray,this.positionsArray],[this.viewPosArray,this.nextViewPosArray]=[this.nextViewPosArray,this.viewPosArray],[this.colorsArray,this.nextColorsArray]=[this.nextColorsArray,this.colorsArray],[this.uvsArray,this.nextUvsArray]=[this.nextUvsArray,this.uvsArray],[this.positionsBits,this.nextPositionsBits]=[this.nextPositionsBits,this.positionsBits],[this.viewPosBits,this.nextViewPosBits]=[this.nextViewPosBits,this.viewPosBits],[this.colorsBits,this.nextColorsBits]=[this.nextColorsBits,this.colorsBits],[this.uvsBits,this.nextUvsBits]=[this.nextUvsBits,this.uvsBits];const r=[this.positionsArray,this.viewPosArray,this.colorsArray,this.uvsArray];for(const t of this.quadAttributes){const s=r.shift();s!==void 0&&(t.array=s,t.clearUpdateRanges(),t.addUpdateRange(0,e*4*t.itemSize),t.needsUpdate=!0)}this.quadGeometry.setDrawRange(0,e*6),this.quadGeometry.clearGroups(),i>0&&this.quadGeometry.addGroup(0,i*6,0);const o=e-i;o>0&&this.quadGeometry.addGroup(i*6,o*6,1)}commitOutput(e,i,r){this.cachedRenderer=e,this.cachedQuadCount=i,this.cachedAdditiveQuadCount=r,this.cachedAutoExposureLimit=Math.fround(this.finalUpsampleUniforms._AutoExposureLimit.value),this.cachedGradientCamera.set(this.nextGradientCamera),this.cacheValid=!0}renderGradientPass(e){const i=e.getRenderTarget(),r=e.autoClear;e.autoClear=!1,this.fsMesh.material=this.gradientMaterial,e.setRenderTarget(this.prepass),e.render(this.passScene,this.passCamera),e.autoClear=r,e.setRenderTarget(i)}clearPrepass(e){const i=e.getRenderTarget();e.getClearColor(this.clearColorTmp);const r=e.getClearAlpha();e.setClearColor(0,0),e.setRenderTarget(this.prepass),e.clear(!0,!1,!1),e.setRenderTarget(i),e.setClearColor(this.clearColorTmp,r)}setBackgroundGradient(e){if(this.gradientTexture?.dispose(),this.gradientTexture=null,this.gradientUniforms._GradientTex.value=null,e!==null){const i=new Jo(new Uint8Array(e.ramp),e.ramp.length/4,1,Wt);i.colorSpace=Nt,i.minFilter=Ve,i.magFilter=Ve,i.wrapS=Jt,i.wrapT=Jt,i.needsUpdate=!0,this.gradientTexture=i,this.gradientUniforms._GradientTex.value=i;const r=new Ke(e.tint[0],e.tint[1],e.tint[2]).convertSRGBToLinear();this.gradientUniforms._Color.value.set(r.r,r.g,r.b,e.tint[3])}this.invalidate()}setFogParams(e){this.fogUniforms._CustomFogOffset.value=e.offset,this.fogUniforms._CustomFogAttenuation.value=e.attenuation,this.fogUniforms._CustomFogHeightFogStartY.value=e.startY,this.fogUniforms._CustomFogHeightFogHeight.value=e.height,this.captureUniforms._CaptureOffset.value=e.offset,this.captureUniforms._CaptureFalloff.value=e.attenuation,this.finalUpsampleUniforms._AutoExposureLimit.value=e.autoExposureLimit,this.invalidate()}invalidate(){this.cachedRenderer=null,this.cacheValid=!1}render(e,i,r){e!==this.cachedRenderer&&this.invalidate(),i.updateMatrixWorld();const o=this.captureProjection.copy(i.projectionMatrix),t=o.elements,s=Math.tan(zu*.5*(Math.PI/180)),a=ia(1/(s*t[0])),l=ia(1/(s*t[5]));t[0]*=a,t[8]*=a,t[5]*=l,t[9]*=l,this.fogUniforms._CustomFogTextureToScreenRatio.value.set(a,l),this.gradientTexture!==null&&(this.gradientUniforms._InverseProjectionMatrix.value.copy(o).invert(),this.gradientUniforms._CameraToWorldMatrix.value.copy(i.matrixWorld),this.nextGradientCamera.set(i.matrixWorld.elements),this.nextGradientCamera.set(t,16));const{quadCount:c,additiveQuadCount:f}=this.writeQuads(r,i.matrixWorldInverse.elements,t);if(this.outputMatches(c,f))return;if(c===0){this.clearPrepass(e),this.gradientTexture!==null&&this.renderGradientPass(e),this.commitOutput(e,c,f);return}this.uploadQuadOutput(c,f);const u=e.getRenderTarget();e.getClearColor(this.clearColorTmp);const h=e.getClearAlpha();e.setClearColor(0,0),e.setRenderTarget(this.raw),e.render(this.captureScene,this.passCamera),this.fsMesh.material=this.downsampleMaterial;let d=this.raw;for(const m of this.downs)this.downsampleUniforms._SourceTex.value=d.texture,this.downsampleUniforms._SourceTexelSize.value.set(1/d.width,1/d.height),e.setRenderTarget(m),e.render(this.passScene,this.passCamera),d=m;const p=this.downs.at(-1);p!==void 0&&(this.finalUpsampleUniforms._GlobalIntensityTex.value=p.texture);for(let m=this.downs.length-2;m>=0;m--){const v=this.downs[m];if(v===void 0)continue;const g=m===0?this.prepass:this.ups[m];if(g===void 0)continue;const y=Ju(m,this.downs.length),S=m===0?this.finalUpsampleUniforms:this.upsampleUniforms;S._SourceTex.value=d.texture,S._BloomTex.value=v.texture,S._SourceTexelSize.value.set(1/d.width,1/d.height),S._CombineSrc.value=y.currentLevel,S._CombineDst.value=y.upsampled,this.fsMesh.material=m===0?this.finalUpsampleMaterial:this.upsampleMaterial,e.setRenderTarget(g),e.render(this.passScene,this.passCamera),d=g}this.gradientTexture!==null&&this.renderGradientPass(e),e.setRenderTarget(u),e.setClearColor(this.clearColorTmp,h),this.commitOutput(e,c,f)}dispose(){this.disposed=!0,this.raw.dispose();for(const e of[...this.downs,...this.ups])e.dispose();this.prepass.dispose(),this.addCaptureMaterial.dispose(),this.maxCaptureMaterial.dispose(),this.downsampleMaterial.dispose(),this.upsampleMaterial.dispose(),this.finalUpsampleMaterial.dispose(),this.gradientMaterial.dispose(),this.gradientTexture?.dispose(),this.quadGeometry.dispose(),this.fsMesh.geometry.dispose(),this.alphaMask.dispose()}}const jl=5e3,ah=2;function To(n){return[0,1.7,n-Ti]}const lh="support/chroma-materials";function ch(n){return`__chroma_preset_${n}`}function fh(n,e){return{...n,materials:{...e.materials,...n.materials}}}function Ze(n,e,i,r){return n.objects[e]?.components?.[i]?.[r]}function at(n){return`${String(n.obj)}:${n.component??""}:${String(n.componentIndex??0)}`}function Zo(n,e){const i=n.objects[e.obj]?.components?.MaterialPropertyBlockController?.[e.componentIndex??0];return i?.Renderers.length===0?[e.obj]:i?.Renderers.map(r=>r.obj)??[]}function Hl(n,e,i){return Zo(n,i).flatMap(r=>e[r]??[])}function uh(n,e,i){const r=e.componentIndex??0;switch(i){case"FloatFxGroupEffect":return Ze(n,e.obj,"FloatFxGroupEffect",r);case"LightColorGroupEffect":return Ze(n,e.obj,"LightColorGroupEffect",r);case"LightRotationGroupEffect":return Ze(n,e.obj,"LightRotationGroupEffect",r);case"LightTranslationGroupEffect":return Ze(n,e.obj,"LightTranslationGroupEffect",r)}}function An(n,e,i){const r=[];for(const o of n.objects){const t=o.components?.[e];for(const s of t??[])if(s.enabled)for(const a of s.effectEntries){if(a.Effect.component!==i)continue;const l=uh(n,a.Effect,i);l!==void 0&&r.push({groupId:a.Group,effect:l})}}return r}const hh=.6,$r=[0,0,0,1],es=[1,1,1],Vl="__chroma_track_",dh=new Set(["OpaqueLight","TransparentLight","BillieWater"]);function Xl(n,e){const i=e===2?hh:1;return[n[0]*i,n[1]*i,-n[2]*i]}function Yl(n){const e=new ge().setFromEuler(new Ri(-n[0]*Math.PI/180,-n[1]*Math.PI/180,n[2]*Math.PI/180,"YXZ"));return[e.x,e.y,e.z,e.w]}function ts(n,e){const i=n.objects[e];if(i===void 0)return new be;const r=new be().compose(new H().fromArray(i.position),new ge().fromArray(i.rotation),new H().fromArray(i.scale));return i.parent<0?r:ts(n,i.parent).multiply(r)}function ph(n,e,i,r){const o=n.objects[e];if(o===void 0)return;const t=Xl(i,r),s=new H().fromArray(t);o.parent>=0&&s.applyMatrix4(ts(n,o.parent).invert()),o.position=Number.isFinite(s.x+s.y+s.z)?[s.x,s.y,s.z]:t}function mh(n,e,i){const r=n.objects[e];if(r===void 0)return;const o=new ge().fromArray(Yl(i));if(r.parent>=0){const t=new ge;ts(n,r.parent).decompose(new H,t,new H),o.premultiply(t.invert())}r.rotation=[o.x,o.y,o.z,o.w]}function Ir(n,e,i,r){const o=n.objects[e];o!==void 0&&(i.scale!==void 0&&(o.scale=[...i.scale]),i.localPosition!==void 0?o.position=Xl(i.localPosition,r):i.position!==void 0&&ph(n,e,i.position,r),i.localRotation!==void 0?o.rotation=Yl(i.localRotation):i.rotation!==void 0&&mh(n,e,i.rotation))}function vh(n){const e=n.id??"";switch(n.lookupMethod){case"Exact":return i=>i===e;case"StartsWith":return i=>i.startsWith(e);case"EndsWith":return i=>i.endsWith(e);case"Regex":try{const i=new RegExp(e);return r=>i.test(r)}catch{return()=>!1}default:return i=>i.includes(e)}}function gh(n,e){const i=[...new Set(n.objects.flatMap(s=>(s.components?.TrackLaneRingsManager??[]).flatMap(a=>a.SpawnAsChildren===0?a.Rings.map(l=>l.obj):[])))];if(i.length===0)return;i.sort((s,a)=>{const l=e.find(h=>h.index===s)?.id,c=e.find(h=>h.index===a)?.id,f=Number(/^.*\.\[(\d+)]/.exec(l??"")?.[1]??Number.MAX_SAFE_INTEGER),u=Number(/^.*\.\[(\d+)]/.exec(c??"")?.[1]??Number.MAX_SAFE_INTEGER);return f-u||s-a});const r=Math.max(-1,...e.flatMap(s=>{if(n.objects[s.index]?.parent!==-1)return[];const a=new RegExp(`^${n.id}\\.\\[(\\d+)]`).exec(s.id);return a?.[1]===void 0?[]:[Number(a[1])]}))+1,o=[...e],t=new Set(e.map(s=>`${s.index}:${s.id}`));i.forEach((s,a)=>{const l=n.objects[s],c=o.find(u=>u.index===s)?.id;if(l===void 0||c===void 0)return;const f=`${n.id}.[${String(r+a)}]${l.name}`;for(const u of os(n.objects,s))for(const h of o.filter(d=>d.index===u)){if(!h.id.startsWith(c))continue;const d=`${f}${h.id.slice(c.length)}`,p=`${u}:${d}`;t.has(p)||(t.add(p),e.push({id:d,index:u}))}})}function os(n,e){const i=new Set([e]);for(let r=0;r<n.length;r++){let o=n[r]?.parent??-1;for(;o>=0;){if(o===e){i.add(r);break}o=n[o]?.parent??-1}}return[...i].sort((r,o)=>r-o)}function is(n,e){const i=structuredClone(n),r=JSON.stringify(n,(o,t)=>{const s=ml().safeParse(t);return o==="obj"&&s.success?e.get(s.data)??s.data:t});return Object.assign(i,JSON.parse(r)),i}function ft(n,e){const i=n.filter(r=>e.has(r.obj)).map(r=>is(r,e));n.push(...i)}function fi(n,e,i){const r=n.filter(o=>{const t=e(o);return t!==void 0&&i.has(t.obj)}).map(o=>is(o,i));n.push(...r)}function yh(n,e){for(const i of n.TrackLaneRingsManager??[])ft(i.Rings,e);for(const i of n.DirectionalLightsController??[])ft(i.LightIntensityData,e);for(const i of n.MaterialLightsController??[])ft(i.LightIntensityData,e);for(const i of n.MaterialPropertyBlockController??[])ft(i.Renderers,e);for(const i of n.LightColorGroupEffect??[])ft(i.lightEntries,e);for(const i of n.LocalScaleFx??[])ft(i.TargetTransforms,e);for(const i of n.MpbArrayFx??[])ft(i.MpbControllers,e);for(const i of n.AlphaFx??[])ft(i.MpbControllers,e);for(const i of n.CollectionFx??[])ft(i.Targets,e);for(const i of n.GameObjectSwitch??[])ft(i.NormalGameObjects,e),ft(i.BoostGameObjects,e);for(const i of n.GameObjectIntSwitch??[])for(const r of i.GameObjectsValueContainers)ft(r.GameObjects,e);for(const i of n.LightRotationGroupEffect??[])for(const r of i.transformEntries)ft(r.Transforms,e);for(const i of n.LightTranslationGroupEffect??[])for(const r of i.transformEntries)ft(r.Transforms,e);for(const i of n.FloatFxGroupEffect??[])for(const r of i.fxEntries)ft(r.Targets,e);for(const i of n.LightPairRotation??[])fi(i.Transforms,r=>r.Transform,e);for(const i of n.SwitchGameObjectArrayFx??[])fi(i.GameObjects,r=>r.GameObject,e);for(const i of n.PositionConstraint??[])fi(i.m_Sources,r=>r.sourceTransform,e);for(const i of[...n.LightColorGroupEffectManager??[],...n.LightRotationGroupEffectManager??[],...n.LightTranslationGroupEffectManager??[],...n.FloatFxGroupEffectManager??[]])fi(i.effectEntries,r=>r.Effect,e);for(const i of n.LightReflection??[])fi(i.ParametricLightReflection,r=>r.Light,e)}function bh(n,e){return n.objects[e]?.components?.ChromaIDMarker?.find(i=>i.enabled)}function Sh(n,e){const i=e.lastIndexOf(".[");if(i<0)return`${e}(Clone)`;const r=e.slice(0,i),o=e.slice(i+1),t=/^\[(\d+)\](.*)$/.exec(o);if(t===null)return`${e}(Clone)`;const s=t[1];if(s===void 0)return`${e}(Clone)`;let a=Number(s);const l=`${r}.[`;for(const c of n){if(!c.id.startsWith(l))continue;const f=c.id.slice(r.length+1);if(f.includes("."))continue;const u=/^\[(\d+)\]/.exec(f);u!==null&&(a=Math.max(a,Number(u[1])))}return`${r}.[${String(a+1)}]${t[2]??""}(Clone)`}function _h(n,e,i,r,o){const t=e.find(a=>a.index===o)?.id;if(t===void 0)return;const s=Sh(e,t);for(const a of i){const l=r.get(a);if(l!==void 0)for(const c of e.filter(f=>f.index===a)){const f=c.id.startsWith(t)?`${s}${c.id.slice(t.length)}`:`${c.id}(Clone)`,u=bh(n,l);u!==void 0&&(u.ChromaID=f),e.push({id:f,index:l})}}}function Th(n,e,i){const r=e[0]?.id.split(".[")[0]??n.id,o=`${r}.[`;let t=-1;for(const s of e){if(!s.id.startsWith(o))continue;const a=s.id.slice(r.length+1);if(a.includes("."))continue;const l=/^\[(\d+)\]/.exec(a);l!==null&&(t=Math.max(t,Number(l[1])))}return`${r}.[${String(t+1)}]${i}`}function xh(n,e){const i=new ge().fromArray(e.rotation),r=new H().fromArray(n.position).multiply(new H().fromArray(e.scale)).applyQuaternion(i).add(new H().fromArray(e.position)),o=i.multiply(new ge().fromArray(n.rotation));n.position=[r.x,r.y,r.z],n.rotation=[o.x,o.y,o.z,o.w],n.scale=[e.scale[0]*n.scale[0],e.scale[1]*n.scale[1],e.scale[2]*n.scale[2]]}function Mh(n,e,i){const r=n.objects.length,o=os(n.objects,i),t=new Map;for(const a of o)t.set(a,n.objects.length+t.size);for(const a of o){const l=n.objects[a];if(l===void 0)continue;const c=is(l,t);if(c.chromaGenerated=!0,a===i){c.name=`${c.name}(Clone)`;let f=l.parent;for(;;){const u=f>=0?n.objects[f]:void 0;if(!u?.name.startsWith(Vl))break;xh(c,u),f=u.parent}c.parent=f}else c.parent=t.get(l.parent)??l.parent;n.objects.push(c)}_h(n,e,o,t,i);const s=[];for(let a=0;a<r;a++){if(t.has(a))continue;const l=n.objects[a],c=(l?.components?.BasicLightEffect??[]).flatMap(f=>{const u=f.lightEntries.filter(h=>t.has(h.obj)).map(h=>({...h,obj:t.get(h.obj)??h.obj}));return u.length===0?[]:[{...structuredClone(f),lightEntries:u}]});c.length>0&&(s.push(n.objects.length),n.objects.push({name:"__chroma_light_effect",parent:-1,active:!0,position:[0,0,0],rotation:[...$r],scale:[...es],components:{BasicLightEffect:c}})),l?.components!==void 0&&yh(l.components,t)}return{root:t.get(i)??i,indices:[...o.flatMap(a=>t.get(a)??[]),...s]}}function wh(n,e,i,r){for(const o of e){const t=n.objects[o]?.components;if(i!==void 0){for(const s of t?.ParametricBloomFogLightController??[])s.ID=i;for(const s of t?.InstancedMaterialLightController??[])s.ID=i;for(const s of t?.MaterialLightController??[])s.ID=i;for(const s of t?.SpriteLightController??[])s.ID=i;for(const s of t?.LightIntensityController??[])s.ID=i}if(r!==void 0){for(const s of t?.BasicLightEffect??[])s.ID=r;for(const s of t?.LightRotationEffect??[])s.ID=r}}}function Eh(n,e){const i=n.objects[e.obj]?.components,r=e.componentIndex??0;switch(e.component){case"ParametricBloomFogLightController":return i?.ParametricBloomFogLightController?.[r]?.ID;case"InstancedMaterialLightController":return i?.InstancedMaterialLightController?.[r]?.ID;case"MaterialLightController":return i?.MaterialLightController?.[r]?.ID;case"SpriteLightController":return i?.SpriteLightController?.[r]?.ID;case"LightIntensityController":return i?.LightIntensityController?.[r]?.ID;default:return}}function Ch(n){const e=new Map;for(const i of n.objects)for(const r of i.components?.BasicLightEffect??[]){let o=e.get(r.ID);o===void 0&&(o=new Set,e.set(r.ID,o));for(const[t]of r.LightIdRemapEntries)o.add(t);for(const t of r.lightEntries){const s=Eh(n,t);s!==void 0&&!r.LightIdRemapEntries.some(([,a])=>a===s)&&o.add(s)}}return e}function kr(n,e,i){let r=i??Math.max(-1,...e.flatMap(o=>[...n.get(o)??[]]))+1;for(;e.some(o=>n.get(o)?.has(r)===!0);)r++;for(const o of e){const t=n.get(o);t===void 0?n.set(o,new Set([r])):t.add(r)}return r}function Ph(n,e,i,r,o){const t=new Map;for(const c of e)for(const f of n.objects[c]?.components?.BasicLightEffect??[]){o!==void 0&&(f.ID=o);for(const u of f.lightEntries){const h=at(u),d=t.get(h);d===void 0?t.set(h,[f.ID]):d.includes(f.ID)||d.push(f.ID)}}const s=[...new Set([...t.values()].flat())],a=r===void 0||s.length===0?void 0:kr(i,s,r);function l(c,f,u){for(const[h,d]of u.entries()){const p=t.get(at({obj:c,component:f,componentIndex:h}))??[];p.length>0&&(d.ID=a??kr(i,p))}}for(const c of e){const f=n.objects[c]?.components;l(c,"ParametricBloomFogLightController",f?.ParametricBloomFogLightController??[]),l(c,"InstancedMaterialLightController",f?.InstancedMaterialLightController??[]),l(c,"MaterialLightController",f?.MaterialLightController??[]),l(c,"SpriteLightController",f?.SpriteLightController??[]),l(c,"LightIntensityController",f?.LightIntensityController??[])}}function Ah(n,e,i,r,o){const t=n.objects[e]?.components,s=t?.BasicLightEffect??[];if(o!==void 0)for(const c of s)c.ID=o;const a=[...new Set(s.map(c=>c.ID))];if(a.length===0)return;const l=kr(i,a,r);for(const c of t?.ParametricBloomFogLightController??[])c.ID=l;for(const c of t?.MaterialLightController??[])c.ID=l}function rr(n,e,i,r,o=!0){const t=i.components?.ILightWithId,s=r!==2||i.duplicate!==void 0;o&&wh(n,e,s?t?.lightId??i.lightId:void 0,s?t?.type??i.lightType:void 0);const a=i.components?.BloomFogEnvironment;a!==void 0&&(a.attenuation!==void 0&&(n.fogParams.attenuation=a.attenuation),a.offset!==void 0&&(n.fogParams.offset=a.offset),a.startY!==void 0&&(n.fogParams.startY=a.startY),a.height!==void 0&&(n.fogParams.height=a.height));const l=i.components?.TubeBloomPrePassLight;if(l!==void 0)for(const c of e){const f=n.objects[c]?.components;for(const u of f?.ParametricBloomFogLightController??[])l.colorAlphaMultiplier!==void 0&&(u.ColorAlphaMultiplier=l.colorAlphaMultiplier),l.bloomFogIntensityMultiplier!==void 0&&(u.BloomFogIntensityMultiplier=l.bloomFogIntensityMultiplier);for(const u of f?.MaterialLightController??[])l.colorAlphaMultiplier!==void 0&&(u.AlphaIntensity=l.colorAlphaMultiplier)}}function Lh(n,e,i,r){const o={};return r&&(o.MeshCollider=[{Mesh:i,enabled:!0}]),dh.has(n)&&(o.MaterialLightController=[{ID:0,Renderer:{obj:e},SetAlphaOnly:0,AlphaIntensity:1,AlphaIntoColor:0,SetColorOnly:0,MultiplyColorWithAlpha:n==="OpaqueLight"?0:1,MultiplyColor:0,ColorMultiplier:1,Alpha:1,Property:"_Color",enabled:!0}],o.ParametricBloomFogLightController=[{ID:0,Length:1,Center:.5,BloomFogIntensityMultiplier:1,LightWidthMultiplier:1,StartWidth:1,EndWidth:1,StartAlpha:1,EndAlpha:1,BoostToWhite:0,ColorAlphaMultiplier:1,FakeBloomIntensityMultiplier:1,Width:1,OverrideChildrenLength:0,AddWidthToLength:0,BakedGlowWidthScale:1,ThickenWithDistance:0,ThickenCurve:{keys:[]},MinDistance:30,MaxDistance:200,MinWidthMultiplier:1,MaxWidthMultiplier:10,DisableRenderersOnZeroAlpha:0,MultiplyLengthByAlpha:0,AlphaToLengthCurve:{keys:[]},AlphaToLengthBloomFogCurve:{keys:[]},LimitAlpha:0,MinAlpha:0,MaxAlpha:1,OverrideChildrenAlpha:1,OverrideChildrenWidth:0,BoxLight:null,SpriteLight:null,enabled:!0}],o.BasicLightEffect=[{ID:0,OffIntensity:0,LightOnStart:0,InvertColorScheme:0,LightIdRemapEntries:[],lightEntries:[{obj:e,component:"MaterialLightController"},{obj:e,component:"ParametricBloomFogLightController"}],enabled:!0}]),o}function sr(n,e){return Array.from(n.getAttribute(e).array)}function Rh(n){const e=sr(n,"position"),i=n.index===null?Array.from({length:e.length/3},(r,o)=>o):Array.from(n.index.array);return{positions:e,normals:sr(n,"normal"),uvs:sr(n,"uv"),indices:i,groups:n.groups.map(({start:r,count:o,materialIndex:t})=>({start:r,count:o,materialIndex:t??0}))}}function Oh(n){let e;switch(n){case"Sphere":e=new af(.5,24,16);break;case"Capsule":e=new sf(.5,1,8,24);break;case"Cylinder":e=new Tl(.5,.5,2,20);break;case"Cube":e=new Cn(1,1,1);break;case"Plane":e=new qe(10,10,10,10).rotateX(-Math.PI/2);break;case"Quad":e=new qe(1,1);break;case"Triangle":e=new _t,e.setAttribute("position",new ao([-.5,-.5,0,.5,-.5,0,0,.5,0],3)),e.setAttribute("uv",new ao([0,0,1,0,.5,1],2)),e.setIndex([0,2,1]),e.computeVertexNormals();break;default:return}const i=Rh(e);return e.dispose(),i}function na(n){return{name:"__chroma_standard",shader:"ChroMapper/Lit",family:"lit",colors:{_Color:[...n??[0,0,0,0]]},floats:{_AmbientMinimalValue:0,_AmbientMultiplier:1,_EnableDiffuse:1,_EnableSpecular:1,_Smoothness:.5,_SpecularIntensity:1,_EnableFog:1,_CullMode:2,_ZWrite:1},keywords:["FOG","DIFFUSE","SPECULAR","REFLECTION_PROBE_BOX_PROJECTION","MULTIPLY_REFLECTIONS"]}}function Dh(n,e){const i=n==="OpaqueLight";return{name:`__chroma_${n}`,shader:i?"ChroMapper/Parametric Box Opaque":"ChroMapper/Parametric Box Transparent",family:i?"lightTubeOpaque":"lightTubeTransparent",colors:{_AlphaWidth:[1,1,1,1],_Color:[...e??[0,0,0,i?0:1]],_SizeParams:[.2,1,0,0],_WorldNoiseScrolling:[0,0,0,1]},floats:{_BloomBoost:1,_BloomWhite:0,_CullMode:i?0:2,_EnableFog:0,_EnableHeightFog:1,_FogHeightOffset:0,_FogHeightScale:1,_FogScale:1,_FogStartOffset:0,_MultiplyColorWithAlpha:i?0:1,_ZWrite:i?1:0},keywords:["ENABLE_HEIGHT_FOG"]}}function Fh(n){return{name:"__chroma_BaseWater",shader:"ChroMapper/Water Lit",family:"lit",colors:{_Color:[...n??[0,0,0,0]]},floats:{_CullMode:2,_EnableFog:1,_EnableHeightFog:1,_ZWrite:1},keywords:["FOG","HEIGHT_FOG","INVERT_RIMLIGHT","MASK_RED_IS_ALPHA","NOISE_DITHERING","NORMAL_MAP","REFLECTION_PROBE","REFLECTION_PROBE_BOX_PROJECTION","_DECALBLEND_ALPHABLEND","_DISSOLVEAXIS_LOCALX","_EMISSIONCOLORTYPE_FLAT","_EMISSIONTEXTURE_NONE","_RIMLIGHT_NONE","_ROTATE_UV_NONE","_VERTEXMODE_NONE","_WHITEBOOSTTYPE_NONE","_ZWRITE_ON"]}}function ra(n){return{name:"__chroma_Glowing",shader:"ChroMapper/Glowing",family:"fakeGlow",colors:{_Color:[...n??[0,0,0,0]]},floats:{_BloomType:0,_BloomWhiteMultiplier:1,_CullMode:2,_EnableFog:0,_FogStartOffset:Number.POSITIVE_INFINITY,_FogScale:1,_ZTest:4,_ZWrite:1},keywords:[]}}function Ih(n,e){const i=(e.shader==="Standard"||e.shader==="BTSPillar")&&e.keywords?.length===0,r=i&&e.color!==void 0?[e.color[0],e.color[1],e.color[2],0]:e.color,o=n.materials[ch(e.shader)];let t;if(i)t=ra(r);else if(o!==void 0)t=structuredClone(o);else switch(e.shader){case"Standard":t=na(r);break;case"OpaqueLight":case"TransparentLight":t=Dh(e.shader,r);break;case"BaseWater":t=Fh(r);break;case"Glowing":t=ra(r);break;case"Obstacle":return;default:t=na(r)}return r!==void 0&&(t.colors._Color=[...r]),e.keywords!==void 0&&e.keywords.length>0&&(t.keywords=[...e.keywords]),t}function kh(n,e,i){const r=n.get(e);r===void 0?n.set(e,[i]):r.includes(i)||r.push(i)}function Nh(n,e,i,r,o){const t=r instanceof Object?`inline_${String(o)}`:r,s=r instanceof Object?r:e.materials[r];if(s===void 0)return;const a=`__chroma_material_${t}`,l=Ih(n,s);if(l!==void 0){n.materials[a]??={...l,name:a};for(const c of s.tracks)kh(i,c,a);return a}}function Nr(n,e,i){const r=n.get(e);r===void 0?n.set(e,[i]):r.includes(i)||r.push(i)}function bi(n){return n.track}function Bh(n,e){for(const i of e)for(const r of n.objects[i]?.components?.ParametricBoxLight??[])r.UpdateTransform=0}function Uh(n,e){for(const i of e)for(const r of n.objects[i]?.components?.ParametricBoxLight??[])r.UpdateTransform=1}function Gh(n,e,i,r,o){const t=n.objects[i],s=bi(r);if(t===void 0||s.length===0)return i;const a=n.objects.length,l={name:`${Vl}${s.join("_")}`,parent:t.parent,active:!0,position:[...t.position],rotation:[...t.rotation],scale:[...t.scale]};n.objects.push(l),t.parent=a,t.position=[0,0,0],t.rotation=[...$r],t.scale=[...es],Ir(n,a,r,o);for(const c of s)Nr(e,c,a);return a}function Wh(n,e){const i=structuredClone(n),r=new Map,o=new Map,t=new Set,s=new Map,a=Ch(i),l=new Set(e.componentAnimations.flatMap(h=>h.components.BloomFogEnvironment===void 0?[]:h.track)),c=new Set(e.componentAnimations.flatMap(h=>h.components.TubeBloomPrePassLight===void 0?[]:h.track)),f=i.objects.flatMap((h,d)=>(h.components?.ChromaIDMarker??[]).flatMap(p=>p.enabled?[{id:p.ChromaID,index:d}]:[]));gh(i,f);function u(h,d){for(const p of bi(h))if((l.has(p)||h.components?.BloomFogEnvironment!==void 0)&&t.add(p),!(!c.has(p)&&h.components?.TubeBloomPrePassLight===void 0))for(const m of d)Nr(s,p,m)}for(const[h,d]of e.enhancements.entries()){if(d.geometry!==void 0){const v=`__chroma_geometry_${d.geometry.type}`,g=i.meshes[v]??Oh(d.geometry.type),y=d.geometry.material instanceof Object?d.geometry.material:e.materials[d.geometry.material],S=Nh(i,e,o,d.geometry.material,h);if(g===void 0||y===void 0||S===void 0)continue;i.meshes[v]=g;const b=i.objects.length,T=`${d.geometry.type}${y.shader}`;i.objects.push({name:T,parent:-1,active:d.active??!0,chromaGenerated:!0,position:[0,0,0],rotation:[...$r],scale:[...es],mesh:v,materials:[S],components:Lh(y.shader,b,v,d.geometry.collision)}),f.push({id:Th(i,f,T),index:b}),Ir(i,b,d,e.version),rr(i,[b],d,e.version,!1);const C=d.components?.ILightWithId;Ah(i,b,a,C?.lightId??d.lightId,C?.type??d.lightType),u(d,[b]);for(const x of bi(d))Nr(r,x,b);continue}const p=vh(d),m=[...new Set(f.filter(v=>p(v.id)).map(v=>v.index))];for(const v of m){const g=[];if(d.duplicate===void 0)g.push({root:v,indices:os(i.objects,v)});else for(let y=0;y<Math.max(d.duplicate,0);y++)g.push(Mh(i,f,v));for(const y of g){const S=i.objects[y.root];if(S!==void 0){if(d.active!==void 0&&(S.active=d.active),bi(d).length>0&&Bh(i,y.indices),d.duplicate!==void 0&&Uh(i,y.indices),d.duplicate===void 0)rr(i,y.indices,d,e.version);else{const b=d.components?.ILightWithId;Ph(i,y.indices,a,b?.lightId??d.lightId,b?.type??d.lightType),rr(i,y.indices,d,e.version,!1)}u(d,y.indices),bi(d).length===0?Ir(i,y.root,d,e.version):Gh(i,r,y.root,d,e.version)}}}}return{data:i,tracks:r,materialTracks:o,fogTracks:t,tubeTracks:s,source:e}}const zh=wn(n=>vl({version:tf(1),id:ef()}).safeParse(n).success);async function jh(n,e){const i=`/chro/environments/${n}.json`,r=new Promise((s,a)=>{setTimeout(()=>a(new Error(`environment ${n} load timed out`)),5e3)}),o=await Promise.race([fetch(i,{signal:e}),r]);if(!o.ok)throw new Error(`environment ${n} failed to load (${o.status})`);const t=zh.parse(await o.json());if(t.id!==n)throw new Error(`environment ${n} has invalid metadata`);return t}const Hh=`
uniform float _BillboardScale;
uniform sampler2D _DisplacementTex;
uniform vec2 _DisplacementTexScale;
uniform vec2 _DisplacementTexOffset;
uniform float _DisplacementStrength;
uniform vec3 _DisplacementAxes;
uniform vec2 _DisplacementPanning;
uniform float _DisplacementPanningSpeed;
uniform float _TimeSeconds;
uniform float _SongTime;
uniform float _TimeOffset;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec2 vUv;
varying vec4 vScreenPos;
#ifdef USE_VERTEX_COLOR
attribute vec4 color;
varying vec4 vVertexColor;
#endif
void main() {
  vec3 localPosition = position;
  #ifdef VERTEX_DISPLACEMENT
  float displacementTime = _TimeSeconds;
    #ifdef CUSTOM_TIME_SONG
    displacementTime = _SongTime;
    #elif defined(CUSTOM_TIME_FREEZE)
    displacementTime = _TimeOffset;
    #endif
  vec2 displacementUv = uv * _DisplacementTexScale + _DisplacementTexOffset;
  displacementUv += _DisplacementPanning * displacementTime * _DisplacementPanningSpeed * _DisplacementTexScale;
  vec3 sampledDisplacement = texture2D(_DisplacementTex, displacementUv).rgb * 2.0 - 1.0;
  vec3 displacementOffset;
    #ifdef SPATIAL_DISPLACEMENT
    vec3 displacementDirection = vec3(sampledDisplacement.x, -sampledDisplacement.y, -sampledDisplacement.z);
    displacementDirection *= inversesqrt(max(dot(displacementDirection, displacementDirection), 0.000001));
    displacementOffset = displacementDirection * _DisplacementAxes * _DisplacementStrength;
    #else
    displacementOffset = vec3(0.0, 0.0, -sampledDisplacement.x * _DisplacementStrength);
    #endif
  localPosition += displacementOffset;
  #endif
  vec3 worldPosition;
  #ifdef BILLBOARD_CAMERA
  vec3 worldOrigin = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vec3 cameraRight = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
  vec3 cameraUp = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
  vec3 cameraForward = vec3(viewMatrix[0][2], viewMatrix[1][2], viewMatrix[2][2]);
  worldPosition = worldOrigin + (
    cameraRight * localPosition.x + cameraUp * localPosition.y + cameraForward * localPosition.z
  ) * _BillboardScale;
  vWorldNormal = normalize(cameraForward);
  #elif defined(BILLBOARD_Y_AXIS)
  vec3 worldOrigin = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vec3 localUp = normalize(mat3(modelMatrix) * vec3(0.0, 1.0, 0.0));
  vec3 towardCamera = cameraPosition - worldOrigin;
  vec3 look = normalize(towardCamera - localUp * dot(towardCamera, localUp));
  vec3 right = -normalize(cross(localUp, look));
  worldPosition = worldOrigin + (right * localPosition.x + localUp * localPosition.y) * _BillboardScale;
  vWorldNormal = look;
  #else
  worldPosition = (modelMatrix * vec4(localPosition, 1.0)).xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * normal);
  #endif
  #ifdef USE_VERTEX_COLOR
  vVertexColor = color;
  #endif
  vWorldPos = worldPosition;
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * vec4(worldPosition, 1.0);
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
}
`,Vh=`
uniform vec3 _Color;
uniform float _ColorMultiplier;
uniform sampler2D _MainTex;
uniform vec2 _MainTexScale;
uniform vec2 _MainTexOffset;
uniform sampler2D _MaskTex;
uniform vec2 _MaskTexScale;
uniform vec2 _MaskTexOffset;
uniform float _MaskStrength;
uniform sampler2D _Mask2Tex;
uniform vec2 _Mask2TexScale;
uniform vec2 _Mask2TexOffset;
uniform float _Mask2Strength;
uniform float _BaseLayer;
uniform float _Intensity;
uniform float _AlphaMultiplier;
uniform float _WhiteBoostStart;
uniform float _BloomType;
uniform float _BloomMultiplier;
uniform float _BloomWhite;
uniform float _TimeSeconds;
uniform float _SongTime;
uniform float _TimeOffset;
uniform float _FlipbookColumns;
uniform float _FlipbookRows;
uniform float _FlipbookSpeed;
uniform sampler2D _ColorGradient;
uniform vec2 _ColorGradientScale;
uniform vec2 _ColorGradientOffset;
uniform float _GradientPosition;
uniform float _GradientPanningSpeed;
uniform vec2 _UvPanning;
uniform vec2 _MaskPanning;
uniform vec2 _Mask2Panning;
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec2 vUv;
varying vec4 vScreenPos;
#ifdef USE_VERTEX_COLOR
varying vec4 vVertexColor;
#endif
${dt}
${ze}
void main() {
  float materialTime = _TimeSeconds;
  #ifdef CUSTOM_TIME_SONG
  materialTime = _SongTime;
  #elif defined(CUSTOM_TIME_FREEZE)
  materialTime = _TimeOffset;
  #endif
  vec4 sourceColor = vec4(_Color, _ColorMultiplier);
  #ifdef USE_VERTEX_COLOR
    #ifdef VERTEX_RED_IS_ALPHA
    sourceColor.a *= vVertexColor.r;
    #else
    sourceColor.a *= vVertexColor.a;
    #endif
    #ifndef VERTEX_CHANNELS_A
    sourceColor.rgb *= vVertexColor.rgb;
    #endif
    #ifdef VERTEX_SQUARE_ALPHA
    sourceColor.a *= vVertexColor.a;
    #endif
  #endif

  vec4 albedo = sourceColor;
  #ifdef MAIN_TEXTURE
  vec2 mainUv = vUv;
    #ifdef TEXTURE_FLIPBOOK
    vec2 atlasSize = max(vec2(_FlipbookColumns, _FlipbookRows), vec2(1.0));
    float frame = floor(materialTime * _FlipbookSpeed);
    mainUv = (mainUv + vec2(
      mod(frame, atlasSize.x),
      mod(floor(frame / atlasSize.x), atlasSize.y)
    )) / atlasSize;
    #endif
  vec4 mainSample = texture2D(
    _MainTex,
    (mainUv + _UvPanning * materialTime) * _MainTexScale + _MainTexOffset
  );
    #ifdef TEXTURE_COLOR
    albedo *= mainSample * _BaseLayer;
    #elif defined(ALPHA_CHANNEL_RED)
    albedo.a *= mainSample.r * _BaseLayer;
    #else
    albedo.a *= mainSample.a * _BaseLayer;
    #endif
  #endif
  albedo.rgb *= _Intensity;
  #ifdef COLOR_GRADIENT
  vec2 gradientUv = vUv * _ColorGradientScale + _ColorGradientOffset;
  gradientUv += vec2(materialTime * (_GradientPosition + _GradientPanningSpeed));
  albedo.rgb += texture2D(_ColorGradient, gradientUv).rgb;
  #endif

  #ifdef MASK
  vec4 mask = texture2D(
    _MaskTex,
    (vUv + _MaskPanning * materialTime) * _MaskTexScale + _MaskTexOffset
  );
    #ifdef MASK_RED_IS_ALPHA
    mask.a = mask.r;
    #endif
    #ifdef MASK_BLEND_ADD
    albedo.rgb += mask.rgb * _MaskStrength;
    albedo.a *= mix(1.0, mask.a, _MaskStrength);
    #elif defined(MASK_BLEND_MASKED_ADD)
      #ifdef MASK_RED_IS_ALPHA
      albedo.a *= 1.0 + mask.a * _MaskStrength;
      #else
      albedo *= 1.0 + mask * _MaskStrength;
      #endif
    #elif defined(MASK_RED_IS_ALPHA)
    albedo.a *= mix(1.0, mask.a, _MaskStrength);
    #else
    albedo *= mix(vec4(1.0), mask, _MaskStrength);
    #endif
  #endif
  #ifdef MASK2
  vec4 mask2 = texture2D(
    _Mask2Tex,
    (vUv + _Mask2Panning * materialTime) * _Mask2TexScale + _Mask2TexOffset
  );
    #ifdef MASK2_RED_IS_ALPHA
    mask2.a = mask2.r;
    #endif
    #ifdef MASK2_BLEND_ADD
    albedo.rgb += mask2.rgb * _Mask2Strength;
    albedo.a *= mix(1.0, mask2.a, _Mask2Strength);
    #elif defined(MASK2_BLEND_MASKED_ADD)
      #ifdef MASK2_RED_IS_ALPHA
      albedo.a *= 1.0 + mask2.a * _Mask2Strength;
      #else
      albedo *= 1.0 + mask2 * _Mask2Strength;
      #endif
    #elif defined(MASK2_RED_IS_ALPHA)
    albedo.a *= mix(1.0, mask2.a, _Mask2Strength);
    #else
    albedo *= mix(vec4(1.0), mask2, _Mask2Strength);
    #endif
  #endif

  albedo.a *= _AlphaMultiplier;
  #ifdef FOG_LERP
  albedo = applyChroFog(albedo, vScreenPos, vWorldPos, _FogStartOffset, _FogScale);
  #endif
  #ifdef FORCED_WHITE_BOOST
  float whiteMix = clamp(
    (abs(albedo.a) - _WhiteBoostStart) / max(1.0 - _WhiteBoostStart, 0.0001),
    0.0,
    1.0
  );
  albedo.rgb = mix(albedo.rgb, vec3(1.0), whiteMix);
  #endif
  #ifdef SQUARE_ALPHA
  albedo.a *= clamp(albedo.a, 0.0, 1.0);
  #endif
  #ifdef FOG_ALPHA
  albedo.a *= 1.0 - chroFogAmount(vWorldPos, _FogStartOffset, _FogScale);
  #endif

  float bloomMagnitude = abs(albedo.a);
  if (_BloomType < 0.5) {
    albedo.rgb *= bloomMagnitude;
    albedo.a = clamp(bloomMagnitude, 0.0, 1.0);
  } else if (_BloomType < 1.5) {
    albedo.rgb *= bloomMagnitude;
    albedo.a = clamp(bloomMagnitude * _BloomMultiplier, 0.0, 1.0);
  } else {
    float whiteInput = bloomMagnitude * _BloomWhite;
    float whiteEnergy = whiteInput * whiteInput;
    albedo.rgb = clamp(albedo.rgb * bloomMagnitude + vec3(whiteEnergy), 0.0, 1.0);
    albedo.a = clamp(bloomMagnitude * _BloomMultiplier, 0.0, 1.0);
  }
  // game writes to a unorm target: blend sources clamp to [0,1] per draw
  albedo.rgb = clamp(albedo.rgb, 0.0, 1.0);
  gl_FragColor = albedo;
  #include <colorspace_fragment>
}
`,Xh=`
uniform float _TimeSeconds;
uniform float _Height;
uniform float _Speed;
uniform float _BottomFadeScale;
uniform float _TopFadeScale;
uniform float _BottomEnd;
uniform float _TopEnd;
attribute vec4 color;
varying vec2 vUv;
varying vec4 vVertexColor;
varying vec4 vScreenPos;
void main() {
  float fall = fract(color.r - _TimeSeconds * _Speed) * _Height;
  vec3 localPosition = position - normal * fall;
  vec4 worldPosition = modelMatrix * vec4(localPosition, 1.0);
  float bottomFade = smoothstep(
    0.0,
    1.0,
    clamp((worldPosition.y - _BottomEnd) / _BottomFadeScale, 0.0, 1.0)
  );
  float topFade = clamp((worldPosition.y - _TopEnd) / -_TopFadeScale, 0.0, 1.0);
  vVertexColor = vec4(color.rgb, color.a * bottomFade * topFade);
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
}
`,Yh=`
uniform vec3 _Color;
uniform float _ColorMultiplier;
uniform float _Intensity;
uniform float _AlphaMultiplier;
uniform float _AlphaFromFog;
varying vec2 vUv;
varying vec4 vVertexColor;
varying vec4 vScreenPos;
${ze}
void main() {
  vec3 fogColor = chroFogColor(vScreenPos).rgb;
  float fogAlpha = (max(max(fogColor.r, fogColor.g), fogColor.b) * 3.0 - 0.1) * _AlphaFromFog;
  float textureAlpha = 1.0;
  float greenAlpha = mix(0.7, 1.1, vVertexColor.g);
  float sourceAlpha = greenAlpha * textureAlpha;
  sourceAlpha *= vVertexColor.a * vVertexColor.a;
  float alpha = fogAlpha + sourceAlpha * _AlphaMultiplier * _ColorMultiplier;
  gl_FragColor = vec4(0.0, 0.0, 0.0, alpha);
  #include <colorspace_fragment>
}
`,Zh=`
uniform vec4 _TargetPoint;
uniform float _Width;
uniform float _Jitter;
uniform float _Speed;
uniform float _TimeSeconds;
uniform vec2 _MainTexScale;
uniform vec2 _MainTexOffset;
varying vec3 vWorldPos;
varying vec2 vUv;
varying vec4 vScreenPos;
float lightningNoise(float value, float time) {
  float result = sin(value * 10.08 - time * 14.93);
  result += sin(value * 24.87 + time * 22.11) * 0.503;
  result += sin(value * 49.72 - time * 35.18) * 0.247;
  return result;
}
void main() {
  vec3 worldOrigin = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  vec3 worldTarget = _TargetPoint.xyz;
  vec3 beamDirection = worldOrigin - worldTarget;
  vec3 side = cross(beamDirection, vec3(1.0, 0.0, 0.0));
  if (dot(side, side) < 0.00001) side = cross(beamDirection, vec3(0.0, 1.0, 0.0));
  side = normalize(side) * _Width;
  float jump = (fract(sin(floor(_TimeSeconds * 8.03 * _Speed)) * 43741.289) - 0.5) * 2.0;
  float mask = uv.x * (1.0 - uv.x);
  float noise = (lightningNoise(uv.x + _Width, _TimeSeconds * _Speed) + jump) * _Jitter * mask;
  float offset = (uv.y - 0.5) * 2.0;
  vec3 finalWorldPosition = mix(worldOrigin, worldTarget, uv.x) + side * (offset + noise);
  vWorldPos = finalWorldPosition;
  vUv = uv * _MainTexScale + _MainTexOffset;
  gl_Position = projectionMatrix * viewMatrix * vec4(finalWorldPosition, 1.0);
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
}
`,qh=`
uniform vec3 _Color;
uniform float _ColorMultiplier;
uniform sampler2D _MainTex;
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec2 vUv;
varying vec4 vScreenPos;
${dt}
${ze}
void main() {
  float mask = clamp(sin(vUv.x * 3.14159265) * 4.0, 0.0, 1.0);
  vec4 albedo = vec4(_Color, _ColorMultiplier) * mask;
  #ifdef MAIN_TEXTURE
  albedo *= texture2D(_MainTex, vUv);
  #endif
  albedo.a = abs(albedo.a);
  albedo.rgb += albedo.a * albedo.a;
  albedo.rgb *= albedo.a;
  albedo.a = 0.0;
  albedo.rgb = chroToneMap(albedo.rgb);
  albedo = applyChroFog(albedo, vScreenPos, vWorldPos, _FogStartOffset, _FogScale);
  gl_FragColor = albedo;
  #include <colorspace_fragment>
}
`,Kh=`
uniform float _Speed;
uniform float _WorldNoiseIntensityOffset;
uniform float _WorldNoiseIntensityScale;
uniform vec2 _WorldNoiseScrolling;
uniform float _TimeSeconds;
uniform sampler2D _NoiseTex;
uniform vec2 _NoiseTexScale;
uniform vec2 _NoiseTexOffset;
attribute vec4 color;
varying vec3 vWorldPos;
varying vec3 vCloudNormal;
varying vec2 vUv;
varying vec4 vVertexColor;
varying vec4 vScreenPos;
void main() {
  float radius = -position.z;
  float wave = sin(radius * 12.345);
  float angularSpeed = (wave * 0.5 - 1.0) * _Speed * sign(wave);
  // intentional divide by zero: z=0 verts go NaN like the game, culling their triangles
  float angle = (position.x + _TimeSeconds * angularSpeed) / radius;
  vec3 wrappedPosition = vec3(sin(angle) * radius, position.y, -cos(angle) * radius);
  vec4 baseWorldPosition = modelMatrix * vec4(wrappedPosition, 1.0);
  float noise = 1.0;
  #ifdef NOISE_TEXTURE
  vec2 noiseUv = vec2(baseWorldPosition.x, -baseWorldPosition.z) * _NoiseTexScale + _NoiseTexOffset;
  noiseUv += _WorldNoiseScrolling * (_TimeSeconds * 0.05);
  noise = texture2D(_NoiseTex, noiseUv).r;
  #endif
  wrappedPosition.y += noise * _WorldNoiseIntensityScale + _WorldNoiseIntensityOffset;
  vec4 worldPosition = modelMatrix * vec4(wrappedPosition, 1.0);
  vWorldPos = baseWorldPosition.xyz;
  vCloudNormal = normalize(baseWorldPosition.xyz);
  vUv = uv;
  vVertexColor = color;
  gl_Position = projectionMatrix * viewMatrix * worldPosition;
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
}
`,Jh=`
uniform sampler2D _MainTex;
uniform vec2 _MainTexScale;
uniform vec2 _MainTexOffset;
uniform vec3 _DirectionalLightDirections[5];
uniform vec3 _DirectionalLightColors[5];
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec3 vCloudNormal;
varying vec2 vUv;
varying vec4 vVertexColor;
varying vec4 vScreenPos;
${dt}
${ze}
void main() {
  vec3 atlas = vec3(1.0);
  #ifdef MAIN_TEXTURE
  atlas = texture2D(_MainTex, vUv * _MainTexScale + _MainTexOffset).rgb;
  #endif
  vec3 diffuseLight = vec3(0.0);
  for (int index = 0; index < 5; index++) {
    float amount = max(dot(vCloudNormal, normalize(_DirectionalLightDirections[index])), 0.0);
    diffuseLight += _DirectionalLightColors[index] * amount;
  }
  vec4 albedo = vec4(clamp(diffuseLight * atlas * vVertexColor.rgb, 0.0, 1.0), 0.0);
  albedo.rgb = chroToneMap(albedo.rgb);
  albedo = applyChroFog(albedo, vScreenPos, vWorldPos, _FogStartOffset, _FogScale);
  gl_FragColor = albedo;
  #include <colorspace_fragment>
}
`,Zl=`
uniform vec4 _AlphaWidth;
varying vec3 vWorldPos;
varying vec4 vScreenPos;
varying float vLengthFactor;
#ifdef USE_INSTANCING_COLOR
varying vec3 vInstanceColor;
#endif
void main() {
  vec4 localPos = vec4(position, 1.0);
  #ifdef OPAQUE_LENGTH_FACTOR
  vLengthFactor = position.y * 0.5;
  #else
  vLengthFactor = (position.y + 1.0) * 0.5;
  #endif
  float width = mix(_AlphaWidth.z, _AlphaWidth.w, vLengthFactor);
  localPos.xz *= width;
  #ifdef USE_INSTANCING
  localPos = instanceMatrix * localPos;
  #endif
  #ifdef USE_INSTANCING_COLOR
  vInstanceColor = instanceColor;
  #endif
  vec4 worldPos = modelMatrix * localPos;
  vWorldPos = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
}
`,Qh=`
uniform float _ColorMultiplier;
uniform float _FogStartOffset;
uniform float _FogScale;
uniform vec4 _AlphaWidth;
varying vec3 vWorldPos;
varying vec4 vScreenPos;
varying float vLengthFactor;
${pt}
${ze}
void main() {
  float sourceAlpha = abs(_ColorMultiplier * mix(_AlphaWidth.x, _AlphaWidth.y, vLengthFactor));
  float sourceVisibility = 1.0 - chroFogAmount(
    vWorldPos,
    _FogStartOffset,
    _FogScale / max(sourceAlpha, 1.0)
  );
  float emission = sourceAlpha * sourceAlpha * sourceVisibility;
  float fogFactor = chroFogAmount(
    vWorldPos,
    _FogStartOffset,
    _FogScale / max(emission, 1.0)
  );
  vec3 light = baseColor() * emission;
  vec4 albedo = vec4(
    light * 2.0 + fogFactor * (chroFogColor(vScreenPos).rgb - light),
    emission
  );
  gl_FragColor = albedo;
  #include <colorspace_fragment>
}
`,$h=`
uniform float _ColorMultiplier;
uniform float _FogStartOffset;
uniform float _FogScale;
uniform vec4 _AlphaWidth;
varying vec3 vWorldPos;
varying vec4 vScreenPos;
varying float vLengthFactor;
${pt}
${dt}
${ze}
void main() {
  float alphaWidth = abs(mix(_AlphaWidth.x, _AlphaWidth.y, vLengthFactor));
  float sourceAlpha = _ColorMultiplier * alphaWidth * alphaWidth * alphaWidth;
  float emission = sourceAlpha * sourceAlpha;
  vec4 albedo = applyTransparentLightFog(
    vec4(baseColor() * emission, emission),
    vWorldPos,
    _FogStartOffset,
    _FogScale / max(sourceAlpha, 1.0)
  );
  albedo.rgb = chroToneMap(albedo.rgb);
  gl_FragColor = albedo;
  #include <colorspace_fragment>
}
`,ed=`
uniform float _ColorMultiplier;
uniform float _BloomType;
uniform float _BloomMultiplier;
uniform float _BloomWhiteMultiplier;
uniform float _SquareAlpha;
uniform float _UseFogForLights;
uniform vec4 _AlphaWidth;
uniform sampler2D _MainTex;
uniform vec2 _MainTexScale;
uniform vec2 _MainTexOffset;
uniform float _FogStartOffset;
uniform float _FogScale;
#ifdef WORLD_NOISE
uniform float _TimeSeconds;
uniform sampler2D _WorldNoiseTex;
uniform float _WorldNoiseScale;
uniform float _WorldNoiseIntensityOffset;
uniform float _WorldNoiseIntensityScale;
uniform vec3 _WorldNoiseScrolling;
#endif
#ifdef WORLD_SPACE_FADE
uniform float _WorldSpaceFadePos;
uniform float _WorldSpaceFadeSlope;
#endif
varying vec3 vWorldPos;
varying vec2 vUv;
varying vec3 vSliceUv;
varying vec4 vScreenPos;
#ifdef PARAMETRIC_SLICE
varying float vLengthFactor;
#endif
${pt}
${dt}
${ze}
#ifdef WORLD_NOISE
${Ul("_WorldNoiseTex","fakeGlowWorldNoise")}
#endif
vec4 shapeChroGlow(vec4 color, float mainAlpha) {
  #ifdef PARAMETRIC_SLICE
  #ifdef ALPHA_WIDTH_SCALE
  float alphaFactor = mix(_AlphaWidth.x, _AlphaWidth.y, vLengthFactor);
  float signal = mainAlpha * mainAlpha * _ColorMultiplier
    * alphaFactor * alphaFactor * alphaFactor;
  #else
  float signal = mainAlpha * mainAlpha * _ColorMultiplier
    * vLengthFactor * vLengthFactor * vLengthFactor;
  #endif
  if (_BloomType < 0.5) return vec4(color.rgb * signal, 0.0);
  if (_BloomType < 1.5) return vec4(color.rgb * signal, signal * _BloomMultiplier);
  float whiteEnergy = signal * signal * _BloomWhiteMultiplier;
  return vec4((color.rgb + vec3(whiteEnergy)) * signal, 0.0);
  #else
  if (_SquareAlpha != 0.0) color.a *= color.a;
  float alphaFactor = mix(_AlphaWidth.x, _AlphaWidth.y, vUv.y);
  if (_SquareAlpha != 0.0) alphaFactor *= alphaFactor;
  color *= alphaFactor;
  float magnitude = abs(color.a);
  if (_BloomType < 0.5) {
    color.rgb *= magnitude;
    color.a = 0.0;
  } else if (_BloomType < 1.5) {
    color.rgb *= magnitude * _BloomMultiplier;
    color.a = clamp(magnitude, 0.0, 1.0);
  } else {
    float whiteEnergy = magnitude * magnitude * _BloomWhiteMultiplier;
    color.rgb = (color.rgb + vec3(whiteEnergy)) * magnitude;
    color.a = 0.0;
  }
  return color;
  #endif
}
void main() {
  vec4 albedo = vec4(baseColor(), _ColorMultiplier);
  float mainAlpha = 1.0;
  #ifdef MAIN_TEXTURE
  vec2 mainUv = vUv;
  #ifdef PARAMETRIC_SLICE
  mainUv = vec2(vSliceUv.x / vSliceUv.z, vSliceUv.y);
  #endif
  vec4 mainSample = texture2D(_MainTex, mainUv * _MainTexScale + _MainTexOffset);
  #ifdef PARAMETRIC_SLICE
  mainAlpha = mainSample.a;
  #else
  albedo *= mainSample;
  #endif
  #endif
  float effectMask = 1.0;
  #ifdef WORLD_NOISE
  vec3 sourceWorldPosition = vec3(vWorldPos.xy, -vWorldPos.z);
  vec3 sourceWorldScrolling = vec3(_WorldNoiseScrolling.xy, -_WorldNoiseScrolling.z);
  vec3 noisePosition = sourceWorldPosition + sourceWorldScrolling * (_TimeSeconds / 20.0);
  float worldNoise = fakeGlowWorldNoise(noisePosition * _WorldNoiseScale);
  effectMask *= worldNoise * _WorldNoiseIntensityScale + _WorldNoiseIntensityOffset;
  #endif
  #ifdef WORLD_SPACE_FADE
  effectMask *= clamp((vWorldPos.y - _WorldSpaceFadePos) * _WorldSpaceFadeSlope, 0.0, 1.0);
  #endif
  if (_UseFogForLights != 0.0) {
    albedo = shapeChroGlow(albedo, mainAlpha);
    albedo *= effectMask;
    #ifdef PARAMETRIC_SLICE
    #ifdef ALPHA_WIDTH_SCALE
    float fogAlphaFactor = mix(_AlphaWidth.x, _AlphaWidth.y, vLengthFactor);
    float fogSignal = max(
      _ColorMultiplier * fogAlphaFactor * fogAlphaFactor * fogAlphaFactor,
      1.0
    );
    #else
    float fogSignal = max(
      _ColorMultiplier * vLengthFactor * vLengthFactor * vLengthFactor,
      1.0
    );
    #endif
    albedo = applyTransparentLightFog(albedo, vWorldPos, _FogStartOffset, _FogScale / fogSignal);
    #else
    albedo.rgb = chroToneMap(albedo.rgb);
    albedo = applyTransparentLightFog(albedo, vWorldPos, _FogStartOffset, _FogScale);
    #endif
  } else {
    albedo = applyChroFog(albedo, vScreenPos, vWorldPos, _FogStartOffset, _FogScale);
    albedo = shapeChroGlow(albedo, mainAlpha);
    albedo *= effectMask;
    #ifndef PARAMETRIC_SLICE
    albedo.rgb = chroToneMap(albedo.rgb);
    #endif
  }
  gl_FragColor = albedo;
  #include <colorspace_fragment>
}
`,td=`
uniform vec4 _SizeParams;
uniform vec4 _AlphaWidth;
uniform float _CapUVSize;
varying vec3 vWorldPos;
varying vec2 vUv;
varying vec3 vSliceUv;
varying vec4 vScreenPos;
varying float vLengthFactor;
#ifdef USE_INSTANCING_COLOR
varying vec3 vInstanceColor;
#endif
void main() {
  vec3 localPosition = position;
  #ifdef PARAMETRIC_SLICE
  float capVertex = step(0.49, abs(uv.y - 0.5));
  #ifdef ALPHA_WIDTH_SCALE
  float widthFactor = 1.0;
  float startWidthFactor = _AlphaWidth.z;
  float endWidthFactor = _AlphaWidth.w;
  float startCapWidthFactor = max(
    endWidthFactor + (startWidthFactor - endWidthFactor) * (4.0 / 3.0),
    startWidthFactor * 0.01
  );
  float endCapWidthFactor = max(
    startWidthFactor + (endWidthFactor - startWidthFactor) * (4.0 / 3.0),
    endWidthFactor * 0.01
  );
  float height;
  float offset = _SizeParams.y * _SizeParams.z;
  if (uv.y < 0.25) {
    float t = 1.0 - uv.y / 0.25;
    widthFactor = mix(startWidthFactor, startCapWidthFactor, t);
    height = -_SizeParams.w * 0.5 * t;
  } else if (uv.y < 0.75) {
    float t = (uv.y - 0.25) * 2.0;
    widthFactor = mix(startWidthFactor, endWidthFactor, t);
    height = _SizeParams.y * t;
  } else {
    float t = (uv.y - 0.75) / 0.25;
    widthFactor = mix(endWidthFactor, endCapWidthFactor, t);
    height = _SizeParams.y + _SizeParams.w * 0.5 * t;
  }
  vLengthFactor = (height + _SizeParams.w) / (_SizeParams.y + _SizeParams.w * 2.0);
  height -= offset;
  float width = _SizeParams.x * widthFactor;
  float capDirection = sign(uv.y - 0.5);
  #else
  float startWidthFactor = _AlphaWidth.z;
  float endWidthFactor = _AlphaWidth.w;
  float startCapWidthFactor = max(
    endWidthFactor + (startWidthFactor - endWidthFactor) * (4.0 / 3.0),
    startWidthFactor * 0.01
  );
  float endCapWidthFactor = max(
    startWidthFactor + (endWidthFactor - startWidthFactor) * (4.0 / 3.0),
    endWidthFactor * 0.01
  );
  float widthFactor = uv.y > 0.9
    ? endCapWidthFactor
    : uv.y > 0.5
      ? endWidthFactor
      : uv.y > 0.1
        ? startWidthFactor
        : startCapWidthFactor;
  float height = (position.y - _SizeParams.z) * _SizeParams.y
    + (position.y - 0.5) * capVertex * _SizeParams.w;
  vLengthFactor = height > 0.5 - _SizeParams.z ? _AlphaWidth.y : _AlphaWidth.x;
  float width = position.x * _SizeParams.x * widthFactor;
  float capDirection = -sign(uv.y - 0.5);
  #endif
  float sliceUvY = uv.y + capDirection * (1.0 - capVertex) * (0.25 - _CapUVSize);
  vUv = uv;
  vSliceUv = vec3(uv.x * widthFactor, sliceUvY, widthFactor);
  #ifdef Y_AXIS_BILLBOARD
  vec3 worldOrigin = (modelMatrix * vec4(0.0, 0.0, 0.0, 1.0)).xyz;
  mat3 localToWorld = mat3(modelMatrix);
  vec3 columnCross = cross(localToWorld[1], localToWorld[2]);
  float inverseDeterminant = 1.0 / dot(localToWorld[0], columnCross);
  vec3 toCamera = cameraPosition - worldOrigin;
  vec3 localCamera = vec3(
    dot(toCamera, columnCross),
    dot(toCamera, cross(localToWorld[2], localToWorld[0])),
    dot(toCamera, cross(localToWorld[0], localToWorld[1]))
  ) * inverseDeterminant;
  vec2 look = normalize(localCamera.xz);
  #ifdef ALPHA_WIDTH_SCALE
  float billboardX = position.x * width;
  #else
  float billboardX = width;
  #endif
  vec3 slicePosition = vec3(
    -look.y * billboardX - look.x * position.z,
    height,
    look.x * billboardX - look.y * position.z
  );
  vec3 worldPosition = (modelMatrix * vec4(slicePosition, 1.0)).xyz;
  #else
  #ifdef ALPHA_WIDTH_SCALE
  vec3 slicePosition = vec3(position.x * width, height, position.z);
  #else
  vec3 slicePosition = vec3(width, height, position.z);
  #endif
  vec3 worldPosition = (modelMatrix * vec4(slicePosition, 1.0)).xyz;
  #endif
  vWorldPos = worldPosition;
  gl_Position = projectionMatrix * viewMatrix * vec4(worldPosition, 1.0);
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
  return;
  #else
  vLengthFactor = uv.y;
  if (localPosition.x < 0.0) {
    localPosition.x = (localPosition.x + 1.0) / _SizeParams.x * _SizeParams.w - 1.0;
  } else if (localPosition.x > 0.0) {
    localPosition.x = (localPosition.x - 1.0) / _SizeParams.x * _SizeParams.w + 1.0;
  }
  if (localPosition.y < 0.0) {
    localPosition.y = (localPosition.y + 1.0) / _SizeParams.y * _SizeParams.w - 1.0;
  } else if (localPosition.y > 0.0) {
    localPosition.y = (localPosition.y - 1.0) / _SizeParams.y * _SizeParams.w + 1.0;
  }
  #endif

  vec4 localPos = vec4(localPosition, 1.0);
  #ifdef USE_INSTANCING
  localPos = instanceMatrix * localPos;
  #endif
  #ifdef USE_INSTANCING_COLOR
  vInstanceColor = instanceColor;
  #endif
  vec4 worldPos = modelMatrix * localPos;
  vWorldPos = worldPos.xyz;
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
}
`,od=`
uniform sampler2D _ReflectionTex;
uniform float _ReflectionIntensity;
uniform sampler2D _DirtTex;
uniform vec2 _DirtScale;
uniform vec2 _DirtOffset;
uniform float _DirtIntensity;
uniform sampler2D _NormalTex;
uniform vec2 _NormalScale;
uniform vec2 _NormalOffset;
uniform vec2 _TextureScrolling;
uniform vec2 _DetailNormalTexScrolling;
uniform float _DetailNormalTextureScale;
uniform float _DetailNormalIntensity;
uniform float _BumpIntensity;
uniform float _TimeSeconds;
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec2 vUv;
varying vec4 vScreenPos;
${ze}
${Bl}
void main() {
  vec2 screenUV = vScreenPos.xy / vScreenPos.w;
  screenUV.x = 1.0 - screenUV.x;
  #ifdef NORMAL_TEXTURE
  float scrollTime = _TimeSeconds * 0.05;
  vec2 baseNormalUv = vUv * _NormalScale + _NormalOffset + _TextureScrolling * scrollTime;
  vec2 normalOffset = chroDxt5NormalXY(texture2D(_NormalTex, baseNormalUv));
  #ifdef DETAIL_NORMAL_MAP
  vec2 detailNormalUv = (baseNormalUv + _DetailNormalTexScrolling * scrollTime) * _DetailNormalTextureScale;
  vec2 detailNormalOffset = chroDxt5NormalXY(texture2D(_NormalTex, detailNormalUv));
  normalOffset = mix(normalOffset, detailNormalOffset, _DetailNormalIntensity);
  #endif
  normalOffset *= _BumpIntensity;
  float viewHeight = normalize(vWorldPos - cameraPosition).y;
  screenUV -= normalOffset * viewHeight;
  #endif
  float reflectionScale = _ReflectionIntensity * _ReflectionIntensity;
  vec4 albedo = texture2D(_ReflectionTex, screenUV) * reflectionScale;
  #ifdef DIRT
  vec4 dirt = texture2D(_DirtTex, vUv * _DirtScale + _DirtOffset);
  albedo *= mix(vec4(1.0), dirt, _DirtIntensity);
  #endif
  albedo = applyChroFog(albedo, vScreenPos, vWorldPos, _FogStartOffset, _FogScale);
  gl_FragColor = vec4(albedo.rgb, 0.0);
  #include <colorspace_fragment>
}
`,ql=`
varying vec4 vScreenPos;
void main() {
  gl_Position = vec4(position.xy, 1.0, 1.0);
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
}
`,id=`
uniform sampler2D _BloomPrePassTexture;
uniform vec2 _CustomFogTextureToScreenRatio;
varying vec4 vScreenPos;
void main() {
  vec2 uv = (vScreenPos.xy / vScreenPos.w - 0.5) * _CustomFogTextureToScreenRatio + 0.5;
  gl_FragColor = vec4(texture2D(_BloomPrePassTexture, uv).rgb, 0.0);
  #include <colorspace_fragment>
}
`,nd=`
uniform sampler2D _BloomPrePassTexture;
uniform vec2 _CustomFogTextureToScreenRatio;
uniform vec3 _TintColor;
uniform float _TintColorAlpha;
uniform vec4 _GradientColors[8];
uniform vec2 _GradientStops[8];
uniform int _GradientCount;
varying vec4 vScreenPos;
${dt}
void main() {
  vec2 screenUv = vScreenPos.xy / vScreenPos.w;
  vec2 fogUv = (screenUv - 0.5) * _CustomFogTextureToScreenRatio + 0.5;
  float t = clamp(screenUv.y, 0.0, 1.0);
  vec4 gradient = _GradientColors[0];
  bool selected = false;
  for (int i = 6; i >= 0; i--) {
    if (!selected && i < _GradientCount - 1 && t >= _GradientStops[i].x) {
      float span = max(_GradientStops[i + 1].x - _GradientStops[i].x, 0.0001);
      float blend = pow(max((t - _GradientStops[i].x) / span, 0.0), _GradientStops[i].y);
      gradient = mix(_GradientColors[i], _GradientColors[i + 1], blend);
      selected = true;
    }
  }
  vec3 background = chroToneMap(gradient.rgb * _TintColor);
  vec3 bloomFog = texture2D(_BloomPrePassTexture, fogUv).rgb;
  gl_FragColor = vec4(background + bloomFog, 0.0);
  #include <colorspace_fragment>
}
`,ns={transparent:!0,blending:ot,blendEquation:Ae,blendSrc:Me,blendDst:Me,blendEquationAlpha:Ae,blendSrcAlpha:Me,blendDstAlpha:Me},we=n=>new Ke().setRGB(...n).convertSRGBToLinear();function ht(n,e){return n===void 0?void 0:n.uniforms[e]?.value}function Kt(n,e){return n.uniforms[e]?.value}function Tn(n,e){return n.uniforms[e]?.value}function je(n,e={}){return{...n,_FogEnabled:{value:e.enabled===!1?0:1},_HeightFogEnabled:{value:e.heightEnabled?1:0},_FogStartOffset:{value:e.startOffset??0},_FogScale:{value:e.scale??1},_FogHeightOffset:{value:e.heightOffset??0},_FogHeightScale:{value:e.heightScale??1}}}function tt(n,e){return{[n]:{value:e?.texture??null},[`${n}Scale`]:{value:new xe(...e?.scale??[1,1])},[`${n}Offset`]:{value:new xe(...e?.offset??[0,0])}}}const Yt=16,Br=4,Si=Yt+2,Mi=Si*Br,sa=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],ar=[...sa,...sa];function lr(n){return n*n*n*(n*(n*6-15)+10)}function no(n,e,i,r){switch(n&15){case 0:return e+i;case 1:return-e+i;case 2:return e-i;case 3:return-e-i;case 4:return e+r;case 5:return-e+r;case 6:return e-r;case 7:return-e-r;case 8:return i+r;case 9:return-i+r;case 10:return i-r;case 11:return-i-r;case 12:return i+e;case 13:return-i+r;case 14:return i-e;default:return-i-r}}function bo(n,e,i){return n+i*(e-n)}function cr(n,e){return n+=1,n%e}function rd(n,e,i,r){n%=r,e%=r,i%=r;const o=Math.trunc(n)&255,t=Math.trunc(e)&255,s=Math.trunc(i)&255,a=n-Math.trunc(n),l=e-Math.trunc(e),c=i-Math.trunc(i),f=lr(a),u=lr(l),h=lr(c),d=(T,C,x)=>ar[(ar[(ar[T]??0)+C]??0)+x]??0,p=cr(o,r),m=cr(t,r),v=cr(s,r),g=bo(no(d(o,t,s),a,l,c),no(d(p,t,s),a-1,l,c),f),y=bo(no(d(o,m,s),a,l-1,c),no(d(p,m,s),a-1,l-1,c),f),S=bo(no(d(o,t,v),a,l,c-1),no(d(p,t,v),a-1,l,c-1),f),b=bo(no(d(o,m,v),a,l-1,c-1),no(d(p,m,v),a-1,l-1,c-1),f);return(bo(bo(g,y,u),bo(S,b,u),h)+1)*.5}function sd(){const n=new Uint8Array(Mi*Mi*4);for(let e=0;e<Yt;e+=1)for(let i=0;i<Si;i+=1)for(let r=0;r<Si;r+=1){const o=(r+Yt-1)%Yt,t=(i+Yt-1)%Yt,s=rd(6*o/Yt,6*t/Yt,6*e/Yt,6),a=Math.round(Math.min(Math.max((s-.5)*1.8+.5,0),1)*255),l=e%Br*Si+r,c=Math.floor(e/Br)*Si+i,f=(l+c*Mi)*4;n.fill(a,f,f+4)}return n}let ro;function rs(){return ro!==void 0||(ro=new Jo(sd(),Mi,Mi,Wt),ro.minFilter=Ve,ro.magFilter=Ve,ro.generateMipmaps=!1,ro.needsUpdate=!0),ro}function ad(n,e,i=[1,1,1,1],r){return new Ee({vertexShader:Zl,fragmentShader:Qh,uniforms:{...je(n,r),_Color:{value:we(e)},_ColorMultiplier:{value:1},_AlphaWidth:{value:new Be(...i)}},defines:{OPAQUE_LENGTH_FACTOR:1}})}function ld(n,e,i=[1,1,1,1],r){return new Ee({vertexShader:Zl,fragmentShader:$h,uniforms:{...je(n,r),_Color:{value:we(e)},_ColorMultiplier:{value:1},_AlphaWidth:{value:new Be(...i)}}})}function cd(n,e,i,r,o,t={}){const{worldNoise:s,worldSpaceFade:a}=t,l={value:0},c={...je(n,t.fog),_Color:{value:we(e)},_ColorMultiplier:{value:1},_BloomWhiteMultiplier:{value:i},_BloomType:{value:t.bloomType??2},_BloomMultiplier:{value:t.bloomMultiplier??1},_SquareAlpha:{value:t.squareAlpha?1:0},_UseFogForLights:{value:t.useFogForLights?1:0},_TimeSeconds:l,_WorldNoiseScale:{value:s?.scale??1},_WorldNoiseIntensityOffset:{value:s?.intensityOffset??0},_WorldNoiseIntensityScale:{value:s?.intensityScale??1},_WorldNoiseScrolling:{value:new H(...s?.scrolling??[0,0,0])},_WorldNoiseTex:{value:s===void 0?null:rs()},_WorldSpaceFadePos:{value:a?.position??0},_WorldSpaceFadeSlope:{value:a?.slope??1},_AlphaWidth:{value:new Be(...t.alphaWidth??[1,1,1,1])},_CapUVSize:{value:t.capUvSize??.25},...tt("_MainTex",o)};r!==void 0&&Object.assign(c,{_SizeParams:{value:new Be(...r)}});const f={};o!==void 0&&Object.assign(f,{MAIN_TEXTURE:1}),t.parametricSlice&&Object.assign(f,{PARAMETRIC_SLICE:1}),t.yAxisBillboard&&Object.assign(f,{Y_AXIS_BILLBOARD:1}),t.alphaWidthScale&&Object.assign(f,{ALPHA_WIDTH_SCALE:1}),s!==void 0&&Object.assign(f,{WORLD_NOISE:1}),a!==void 0&&Object.assign(f,{WORLD_SPACE_FADE:1});const u=new Ee({vertexShader:r===void 0&&!t.parametricSlice?jt:td,fragmentShader:ed,uniforms:c,defines:f});return s!==void 0&&(u.onBeforeRender=()=>{l.value=performance.now()*.001}),u}function fd(n,e,i,r,o){const t={};o.vertexColor&&Object.assign(t,{USE_VERTEX_COLOR:1}),o.vertexRedIsAlpha&&Object.assign(t,{VERTEX_RED_IS_ALPHA:1}),o.vertexSquareAlpha&&Object.assign(t,{VERTEX_SQUARE_ALPHA:1}),o.vertexChannelsAlpha&&Object.assign(t,{VERTEX_CHANNELS_A:1}),r.displacement!==void 0&&(Object.assign(t,{VERTEX_DISPLACEMENT:1}),o.spatialDisplacement&&Object.assign(t,{SPATIAL_DISPLACEMENT:1})),o.textureColor&&Object.assign(t,{TEXTURE_COLOR:1}),o.alphaChannelRed&&Object.assign(t,{ALPHA_CHANNEL_RED:1}),o.squareAlpha&&Object.assign(t,{SQUARE_ALPHA:1}),o.forcedWhiteBoost&&Object.assign(t,{FORCED_WHITE_BOOST:1}),o.billboard==="camera"&&Object.assign(t,{BILLBOARD_CAMERA:1}),o.billboard==="yAxis"&&Object.assign(t,{BILLBOARD_Y_AXIS:1}),o.customTime==="freeze"&&Object.assign(t,{CUSTOM_TIME_FREEZE:1}),o.customTime==="song"&&Object.assign(t,{CUSTOM_TIME_SONG:1}),o.flipbook!==void 0&&Object.assign(t,{TEXTURE_FLIPBOOK:1}),r.main!==void 0&&Object.assign(t,{MAIN_TEXTURE:1}),r.mask!==void 0&&(Object.assign(t,{MASK:1}),o.maskRedIsAlpha&&Object.assign(t,{MASK_RED_IS_ALPHA:1}),o.maskBlend==="add"&&Object.assign(t,{MASK_BLEND_ADD:1}),o.maskBlend==="maskedAdd"&&Object.assign(t,{MASK_BLEND_MASKED_ADD:1})),r.mask2!==void 0&&(Object.assign(t,{MASK2:1}),o.mask2RedIsAlpha&&Object.assign(t,{MASK2_RED_IS_ALPHA:1}),o.mask2Blend==="add"&&Object.assign(t,{MASK2_BLEND_ADD:1}),o.mask2Blend==="maskedAdd"&&Object.assign(t,{MASK2_BLEND_MASKED_ADD:1})),r.colorGradient!==void 0&&Object.assign(t,{COLOR_GRADIENT:1}),o.fogType==="lerp"&&Object.assign(t,{FOG_LERP:1}),o.fogType==="alpha"&&Object.assign(t,{FOG_ALPHA:1});const s={value:0},a=new Ee({defines:t,vertexShader:Hh,fragmentShader:Vh,uniforms:{...je(n,o.fog),_Color:{value:we(e)},_ColorMultiplier:{value:i},...tt("_MainTex",r.main),...tt("_MaskTex",r.mask),...tt("_Mask2Tex",r.mask2),...tt("_DisplacementTex",r.displacement),...tt("_ColorGradient",r.colorGradient),_BillboardScale:{value:o.billboardScale},_TimeSeconds:s,_SongTime:o.songTime??{value:0},_TimeOffset:{value:o.timeOffset},_FlipbookColumns:{value:o.flipbook?.columns??1},_FlipbookRows:{value:o.flipbook?.rows??1},_FlipbookSpeed:{value:o.flipbook?.speed??1},_GradientPosition:{value:o.gradientPosition},_GradientPanningSpeed:{value:o.gradientPanningSpeed},_UvPanning:{value:new xe(o.uvPanning[0],o.uvPanning[1])},_MaskPanning:{value:new xe(o.maskPanning[0],o.maskPanning[1])},_Mask2Panning:{value:new xe(o.mask2Panning[0],o.mask2Panning[1])},_DisplacementStrength:{value:o.displacementStrength},_DisplacementAxes:{value:new H(...o.displacementAxes)},_DisplacementPanning:{value:new xe(o.displacementPanning[0],o.displacementPanning[1])},_DisplacementPanningSpeed:{value:o.displacementPanningSpeed},_BaseLayer:{value:o.baseLayer},_Intensity:{value:o.intensity},_AlphaMultiplier:{value:o.alphaMultiplier},_WhiteBoostStart:{value:o.whiteBoostStart},_BloomType:{value:o.bloomType},_BloomMultiplier:{value:o.bloomMultiplier},_BloomWhite:{value:o.bloomWhite},_MaskStrength:{value:o.maskStrength},_Mask2Strength:{value:o.mask2Strength}}});return o.customTime==="continuous"&&(a.onBeforeRender=()=>{s.value=performance.now()*.001}),a}function ud(n,e,i,r){const o={value:0},t=new Ee({vertexShader:Xh,fragmentShader:Yh,uniforms:{...je(n),_Color:{value:we(e)},_ColorMultiplier:{value:i},_TimeSeconds:o,_Height:{value:r.height},_Speed:{value:r.speed},_BottomFadeScale:{value:r.bottomFadeScale},_TopFadeScale:{value:r.topFadeScale},_BottomEnd:{value:r.bottomEnd},_TopEnd:{value:r.topEnd},_Intensity:{value:r.intensity},_AlphaMultiplier:{value:r.alphaMultiplier},_AlphaFromFog:{value:r.alphaFromFog}}});return t.onBeforeRender=()=>{o.value=performance.now()*.001},t}function hd(n,e,i,r,o,t){const s={value:0},a=new Ee({defines:o===void 0?{}:{MAIN_TEXTURE:1},vertexShader:Zh,fragmentShader:qh,uniforms:{...je(n,t.fog),_Color:{value:we(e)},_ColorMultiplier:{value:i},_TargetPoint:{value:new Be(...r)},_Width:{value:t.width},_Jitter:{value:t.jitter},_Speed:{value:t.speed},_TimeSeconds:s,...tt("_MainTex",o)}});return a.onBeforeRender=()=>{s.value=performance.now()*.001},a}function dd(n,e,i,r,o){const t={value:0},s={};i!==void 0&&Object.assign(s,{MAIN_TEXTURE:1}),r!==void 0&&Object.assign(s,{NOISE_TEXTURE:1});const a=new Ee({defines:s,vertexShader:Kh,fragmentShader:Jh,uniforms:{...je(n,o.fog),...tt("_MainTex",i),...tt("_NoiseTex",r),_Speed:{value:o.speed},_WorldNoiseIntensityOffset:{value:o.noiseIntensityOffset},_WorldNoiseIntensityScale:{value:o.noiseIntensityScale},_WorldNoiseScrolling:{value:new xe(...o.noiseScrolling)},_TimeSeconds:t,_DirectionalLightDirections:e.directions,_DirectionalLightColors:e.colors}});return a.onBeforeRender=()=>{t.value=performance.now()*.001},a}function pd(n){const e=n.colors._Color??[1,1,1,1];return[e[0],e[1],e[2]]}function Mt(n,e){return n===void 0?e:[n[0],n[1],n[2]]}function po(n,e=!1){return{enabled:e||n.floats._EnableFog!==0,startOffset:n.floats._FogStartOffset??0,scale:n.floats._FogScale??1,heightEnabled:(n.floats._EnableHeightFog??0)!==0,heightOffset:n.floats._FogHeightOffset??0,heightScale:n.floats._FogHeightScale??1}}function Kl(n){return n.includes("_CUSTOM_TIME_FREEZE")?"freeze":n.includes("_CUSTOM_TIME_SONG_TIME")?"song":"continuous"}function $e(n,e,i){const r=n.textures?.[i];if(r===void 0)return;const o=e.textures?.get(r.asset);return o===void 0?void 0:{texture:o,scale:r.scale,offset:r.offset}}const Jl="textures/rectangle-fake-glow.png",Ur="textures/game-e28988ba8e66079a.png";function md(n,e,i){let r;n.shader==="ChroMapper/Parametric Box Fake Glow"?r={asset:Jl,scale:[1,1],offset:[0,0]}:n.shader==="ChroMapper/Parametric Slice Billboard"&&(r={asset:Ur,scale:[1,1],offset:[0,0]});const o=n.textures?._MainTex??r,t=o===void 0?void 0:e.textures?.get(o.asset),s=n.colors._WorldNoiseScrolling??[0,0,0,1],a=cd(e.fog,i,n.floats._BloomWhiteMultiplier??1,n.shader==="ChroMapper/Parametric Box Fake Glow"||n.shader==="ChroMapper/Parametric Slice Billboard"?n.colors._SizeParams:void 0,o===void 0||t===void 0?void 0:{texture:t,scale:o.scale,offset:o.offset},{parametricSlice:n.shader==="ChroMapper/Parametric Slice Billboard",yAxisBillboard:(n.floats._EnableYAxisBillboard??0)!==0,alphaWidthScale:n.keywords.includes("ALPHA_WIDTH_SCALE"),capUvSize:n.floats._CapUVSize??.25,alphaWidth:n.colors._AlphaWidth??[1,1,1,1],bloomType:n.floats._BloomType??0,bloomMultiplier:n.floats._BloomMultiplier??1,squareAlpha:(n.floats._SquareAlpha??0)!==0,useFogForLights:(n.floats._UseFogForLights??0)!==0,worldNoise:n.keywords.includes("ENABLE_WORLD_NOISE")?{scale:n.floats._WorldNoiseScale??1,intensityOffset:n.floats._WorldNoiseIntensityOffset??0,intensityScale:n.floats._WorldNoiseIntensityScale??1,scrolling:[s[1],s[2],s[3]]}:void 0,worldSpaceFade:n.keywords.includes("ENABLE_WORLD_SPACE_FADE")?{position:n.floats._WorldSpaceFadePos??0,slope:n.floats._WorldSpaceFadeSlope??1}:void 0,fog:po(n)});return a.transparent=!0,a.blending=ot,a.blendEquation=n.floats._BlendOp===4?Yo:Ae,a.blendSrc=Me,a.blendDst=Me,a.blendEquationAlpha=n.floats._BlendOp===4?Yo:Ae,a.blendSrcAlpha=n.floats._BlendModeSrcA===5?Eo:n.floats._BlendModeSrcA===1?Me:St,a.blendDstAlpha=Me,a}function vd(n,e,i){if(n.family==="fakeGlow")return md(n,e,i);const r=n.family==="lightTubeOpaque"?ad(e.fog,i,n.colors._AlphaWidth??[1,1,1,1],po(n,!0)):ld(e.fog,i,n.colors._AlphaWidth??[1,1,1,1],po(n,!0));return n.family==="lightTubeOpaque"||(r.transparent=!0,r.blending=ot,r.blendEquation=Ae,r.blendSrc=Me,r.blendDst=Me,r.blendEquationAlpha=Ae,r.blendSrcAlpha=Me,r.blendDstAlpha=Me),r}function gd(n){return[...Object.values(n.materials).flatMap(e=>Object.values(e.textures??{}).map(i=>i.asset)),...(n.particleSystems??[]).map(e=>e.texture)]}function yd(n){const e=new Set(Object.values(n.materials).flatMap(i=>{const r=i.textures;if(r===void 0)return[];const o=["_NormalTex","_MaskTex","_Mask2Tex","_DisplacementTex","_NoiseTex","_DistortTex","_MetalSmoothnessTex","_DirtDetailTex","_EmissionTex","_EmissionMask","_SecondaryEmissionMask","_NormalTexture"].flatMap(s=>r[s]?.asset??[]),t=r._MainTex;return t!==void 0&&i.keywords.includes("_ALPHACHANNEL_RED")&&!i.keywords.includes("TEXTURE_COLOR")&&o.push(t.asset),o}));for(const i of n.particleSystems??[])i.alphaChannelRed&&e.add(i.texture);return e}async function aa(n,e,i=jh){const r=await i(n,e),o=new Set(gd(r)),t=new Set(Object.values(r.materials).flatMap(h=>h.shader==="ChroMapper/Parametric Slice Billboard"?h.textures?._MainTex?.asset??Ur:[]));for(const h of r.particleSystems??[])t.add(h.texture);Object.values(r.materials).some(h=>h.shader==="ChroMapper/Parametric Box Fake Glow")&&o.add(Jl),Object.values(r.materials).some(h=>h.shader==="ChroMapper/Parametric Slice Billboard")&&o.add(Ur);const s=yd(r),a=new Li,l=new Map;let c,f;function u(){for(const h of l.values())h.dispose();c?.dispose();for(const h of f?.textures??[])h.dispose()}try{let h;if(await Promise.all([...o].map(async d=>{try{const p=await a.loadAsync(`/chro/environments/${d}`);p.colorSpace=s.has(d)?lf:Nt,p.wrapS=t.has(d)?Jt:Ot,p.wrapT=t.has(d)?Jt:Ot,l.set(d,p)}catch(p){h??={cause:p}}})),h!==void 0)throw h.cause;if(e?.throwIfAborted(),c=r.reflectionProbe===void 0?void 0:await new $n().loadAsync(r.reflectionProbe.map(d=>`/chro/environments/${d}`)),c!==void 0&&(c.colorSpace=Nt),r.bakedReflectionProbe!==void 0){const[d,p]=r.bakedReflectionProbe.textures,m=await Promise.all([new $n().loadAsync(d.map(y=>`/chro/environments/${y}`)),new $n().loadAsync(p.map(y=>`/chro/environments/${y}`))]);for(const y of m)y.colorSpace=Nt;const v=new H(...r.bakedReflectionProbe.position),g=new H(...r.bakedReflectionProbe.size).multiplyScalar(.5);f={textures:m,position:v,boxMin:v.clone().sub(g),boxMax:v.clone().add(g),lightColors:Array.from({length:6},()=>new Be),lights:r.bakedReflectionProbe.lights}}return e?.throwIfAborted(),{data:r,textures:l,reflectionProbe:c,bakedReflectionProbe:f,dispose:u}}catch(h){throw u(),h}}const Po=(n,e)=>n.map(i=>({eventType:i.ID,offIntensity:i.OffIntensity,lightOnStart:i.LightOnStart!==0,invertColorScheme:i.InvertColorScheme!==0,lightId:e,lightIdRemap:i.LightIdRemapEntries}));function bd(n,e){const r=(n.BoxLight===null?void 0:e.objects[n.BoxLight.obj])?.materials?.find(s=>s!==null),o=r===void 0?void 0:e.materials[r]?.colors._Color,t=e.colorScheme.envColorRight;return[o?.[0]??t[0],o?.[1]??t[1],o?.[2]??t[2]]}function Sd(n){return(e,i)=>{const r=n.MixType===0?Math.sqrt(Math.max(i*n.LightIntensity,0)):i*n.LightIntensity;if(n.MultiplyColorByAlpha===0)return{color:e,alpha:Math.min(r*n.Intensity,n.MaxIntensity),visible:!0};const o=[e[0]*r*n.Intensity,e[1]*r*n.Intensity,e[2]*r*n.Intensity],t=o[0]*.299+o[1]*.587+o[2]*.114,s=t>n.MaxIntensity?n.MaxIntensity/t:1;return{color:[o[0]*s,o[1]*s,o[2]*s],alpha:r*n.Intensity,visible:!0}}}function _d(n,e,i,r){const o=-n.Length*n.Center,t=n.Length*(1-n.Center),s=new H(0,o,0).applyMatrix4(e.matrixWorld),a=new H(0,t,0).applyMatrix4(e.matrixWorld);return{start:[s.x,s.y,s.z],end:[a.x,a.y,a.z],color:bd(n,i),alpha:1,startWidth:n.StartWidth,endWidth:n.EndWidth,startAlpha:n.StartAlpha,endAlpha:n.EndAlpha,widthMultiplier:n.LightWidthMultiplier,intensityMultiplier:n.BloomFogIntensityMultiplier,boostToWhite:n.BoostToWhite,limitAlpha:n.LimitAlpha!==0,minAlpha:n.MinAlpha,maxAlpha:n.MaxAlpha,blendMode:n.BlendMode,bindings:Po(r,n.ID),node:e,localStart:[0,o,0],localEnd:[0,t,0],baseLength:n.Length,center:n.Center,multiplyLengthByAlpha:n.MultiplyLengthByAlpha!==0,alphaToLengthCurve:n.AlphaToLengthCurve,alphaToBloomLengthCurve:n.AlphaToLengthBloomFogCurve}}const Td=["MaterialLightController","InstancedMaterialLightController","SpriteLightController"];function xd(n,e){const i=e.componentIndex??0;switch(e.component){case"InstancedMaterialLightController":return Ze(n,e.obj,"InstancedMaterialLightController",i);case"LightIntensityController":return Ze(n,e.obj,"LightIntensityController",i);case"LightSink":return Ze(n,e.obj,"LightSink",i);case"MaterialLightController":return Ze(n,e.obj,"MaterialLightController",i);case"ParametricBloomFogLightController":return Ze(n,e.obj,"ParametricBloomFogLightController",i);case"SpriteLightController":return Ze(n,e.obj,"SpriteLightController",i);default:return}}function Md(n,e,i){function r(s){const a=n.objects[s.obj]?.components,l=s.componentIndex??0;if(s.component==="MaterialLightController"){const c=a?.MaterialLightController?.[l];return c?.Renderer===null||c?.Renderer===void 0?[]:e.objectShaderMaterials[c.Renderer.obj]??[]}if(s.component==="InstancedMaterialLightController"){const f=a?.InstancedMaterialLightController?.[l]?.MpbColorSetter,u=f===void 0?void 0:n.objects[f.obj]?.components?.MaterialPropertyBlockColorSetter?.[f.componentIndex??0];return u===void 0?[]:Hl(n,e.objectShaderMaterials,u.Controller)}if(s.component==="SpriteLightController"){const c=a?.SpriteLightController?.[l];return e.objectShaderMaterials[c?.Renderer?.obj??s.obj]??[]}return e.objectShaderMaterials[s.obj]??[]}function o(s){const a=n.objects[s.obj]?.components,l=s.componentIndex??0;if(s.component==="MaterialLightController"){const c=a?.MaterialLightController?.[l];if(c!==void 0)return(f,u)=>{const h=u*c.AlphaIntensity;let d=c.AlphaIntoColor!==0?[h,h,h]:f,p=1;return c.MultiplyColorWithAlpha!==0&&(p*=h),c.MultiplyColor!==0&&(p*=c.ColorMultiplier),d=[d[0]*p,d[1]*p,d[2]*p],{color:d,alpha:c.SetColorOnly!==0?c.Alpha:h,visible:!0}}}if(s.component==="InstancedMaterialLightController"){const c=a?.InstancedMaterialLightController?.[l],f=c?.MpbColorSetter,u=f===void 0?void 0:n.objects[f.obj]?.components?.MaterialPropertyBlockColorSetter?.[f.componentIndex??0];if(c!==void 0)return(h,d)=>{let p=c.SetColorOnly!==0?d:Math.max(c.MinAlpha,d)*c.Intensity;c.SaturateIntensity!==0&&(p=Math.min(Math.max(p,0),1));const m=c.MultiplyColorByAlpha===1?d:c.MultiplyColorByAlpha===2?p:1,v=c.HDR!==0?c.Intensity:1,g=u?.MultiplyWithAlpha===0?1:p*v;return{color:[h[0]*m*v*g,h[1]*m*v*g,h[2]*m*v*g],alpha:p*v,visible:!0}}}if(s.component==="SpriteLightController"){const c=a?.SpriteLightController?.[l];if(c!==void 0)return(f,u)=>{const h=c.SetColorOnly!==0?u:Math.max(u,c.MinAlpha),d=c.MultiplyColorByAlpha===1?u:c.MultiplyColorByAlpha===2?h:1;return{color:[f[0]*d*c.Intensity,f[1]*d*c.Intensity,f[2]*d*c.Intensity],alpha:h*c.Intensity,visible:c.HideIfAlphaOutOfRange===0||h>=c.HideAlphaRangeMin&&h<=c.HideAlphaRangeMax}}}return(c,f)=>({color:c,alpha:f,visible:!0})}function t(s){const a=s.componentIndex??0,l=n.objects[s.obj]?.components;if(s.component==="MaterialLightController")return l?.MaterialLightController?.[a]?.Property;if(s.component==="InstancedMaterialLightController"){const c=l?.InstancedMaterialLightController?.[a]?.MpbColorSetter;return c===void 0?void 0:n.objects[c.obj]?.components?.MaterialPropertyBlockColorSetter?.[c.componentIndex??0]?.Property}return"_Color"}return n.objects.forEach((s,a)=>{for(const l of Td)s.components?.[l]?.forEach((c,f)=>{if(!c.enabled)return;const u={obj:a,component:l,componentIndex:f},h=e.lightEffectsByTarget.get(at(u))??[];if(h.length===0)return;const d=r(u);if(d.length===0)return;const p=e.nodes[a];i.materialLights.push({materials:d,bindings:Po(h,c.ID),intensityMultiplier:1,initialVisible:p?.visible,node:p,transform:o(u),colorProperty:t(u)??"_Color"})})}),An(n,"LightColorGroupEffectManager","LightColorGroupEffect").flatMap(({groupId:s,effect:a})=>{if(!a.enabled)return[];const l=a.lightEntries.flatMap(c=>{const f=xd(n,c);if(f?.enabled!==!0)return[];const u=i.parametricTargets.get(at(c));return[{id:f.ID,node:c.component==="ParametricBloomFogLightController"?void 0:e.nodes[c.obj],materials:r(c),colorProperty:t(c)??"_Color",segments:u?.segments??[],materialLights:u?.materialLights??[],transform:o(c)}]});return[{groupId:s,count:a.Count,targets:l}]})}function He(n,e){const i=n.keys[0],r=n.keys.at(-1);if(i===void 0||r===void 0)return 1;if(e<=i.time)return i.value;if(e>=r.time)return r.value;for(let o=0;o<n.keys.length-1;o++){const t=n.keys[o],s=n.keys[o+1];if(t===void 0||s===void 0||e>s.time)continue;if(!Number.isFinite(t.outSlope)||!Number.isFinite(s.inSlope))return t.value;const a=s.time-t.time;if(a<=0)return s.value;const l=(e-t.time)/a,c=l*l,f=c*l;return(2*f-3*c+1)*t.value+(f-2*c+l)*t.outSlope*a+(-2*f+3*c)*s.value+(f-c)*s.inSlope*a}return r.value}function wd(n,e,i){function r(t,s,a){const l=t.flatMap(f=>Hl(n,e,f)),c=l.map(f=>Tn(f,s));return{apply:f=>{const u=a(f);l.forEach(h=>{const d=h.uniforms[s];d===void 0?(h.uniforms[s]={value:u},h.needsUpdate=!0):d.value=u})},reset:()=>{l.forEach((f,u)=>{const h=c[u];h!==void 0&&f.uniforms[s]!==void 0&&(f.uniforms[s].value=h)})}}}function o(t,s=new Set){const a=at(t);if(s.has(a)||t.component===void 0)return[];s.add(a);const l=t.componentIndex??0;if(t.component==="MpbFx"){const c=Ze(n,t.obj,"MpbFx",l);return c?.enabled!==!0?[]:[r([c.MpbController],c.PropertyName,f=>ut.clamp(f*c.GranularityMultiplier,c.ValueBounds[0],c.ValueBounds[1]))]}if(t.component==="MpbArrayFx"){const c=Ze(n,t.obj,"MpbArrayFx",l);return c?.enabled!==!0?[]:[r(c.MpbControllers,c.PropertyName,f=>ut.clamp(f*c.GranularityMultiplier,c.ValueBounds[0],c.ValueBounds[1]))]}if(t.component==="LocalScaleFx"){const c=Ze(n,t.obj,"LocalScaleFx",l);if(c?.enabled!==!0)return[];const f=c.TargetTransforms.flatMap(u=>{const h=i[u.obj];return h===void 0?[]:[{target:h,initialScale:h.scale.clone()}]});return[{apply:u=>{f.forEach(({target:h,initialScale:d})=>{h.scale.copy(d).multiplyScalar(ut.clamp(u,c.ValueBounds[0],c.ValueBounds[1])),h.updateMatrix()})},reset:()=>{f.forEach(({target:u,initialScale:h})=>{u.scale.copy(h),u.updateMatrix()})}}]}if(t.component==="MoveInDirectionFx"){const c=Ze(n,t.obj,"MoveInDirectionFx",l);if(c?.enabled!==!0)return[];const f=i[c.TargetTransform.obj];if(f===void 0)return[];const u=f.position.clone(),h=new H(c.MoveOrigin[0],c.MoveOrigin[1],-c.MoveOrigin[2]),d=u.clone().sub(h).normalize();return[{apply:p=>{f.position.copy(u).addScaledVector(d,p*c.MoveScale),f.updateMatrix()},reset:()=>{f.position.copy(u),f.updateMatrix()}}]}if(t.component==="AlphaFx"){const c=Ze(n,t.obj,"AlphaFx",l);return c?.enabled!==!0?[]:[r(c.MpbControllers,"_ColorMultiplier",f=>f)]}if(t.component==="SwitchGameObjectFx"){const c=Ze(n,t.obj,"SwitchGameObjectFx",l);if(c?.enabled!==!0)return[];const f=i[c.GameObjectA.obj],u=i[c.GameObjectB.obj];if(f===void 0||u===void 0)return[];const h=[f.visible,u.visible];return[{apply:d=>{f.visible=Math.abs(d)<1e-6,u.visible=!f.visible},reset:()=>{f.visible=h[0],u.visible=h[1]}}]}if(t.component==="SwitchGameObjectArrayFx"){const c=Ze(n,t.obj,"SwitchGameObjectArrayFx",l);if(c?.enabled!==!0)return[];const f=c.GameObjects.flatMap(u=>{const h=i[u.GameObject.obj];return h===void 0?[]:[{threshold:u.Threshold,target:h,visible:h.visible}]});return[{apply:u=>{let h=!1;for(let d=f.length-1;d>=0;d-=1){const p=f[d];if(p===void 0)continue;const m=!h&&u>=p.threshold;p.target.visible=m,m&&(h=!0)}},reset:()=>{f.forEach(u=>{u.target.visible=u.visible})}}]}if(t.component==="CollectionFx"){const c=Ze(n,t.obj,"CollectionFx",l);return c?.enabled!==!0?[]:c.Targets.flatMap(f=>o(f,new Set(s)))}if(t.component==="ParametricSliceEndWidthFx"){const c=Ze(n,t.obj,"ParametricSliceEndWidthFx",l);if(c?.enabled!==!0)return[];const u=(e[c.SpriteLight.obj]??[]).flatMap(h=>{const d=ht(h,"_AlphaWidth");return d===void 0?[]:[{alphaWidth:d,initial:d.w}]});return u.length===0?[]:[{apply:h=>{const d=ut.clamp(h*c.ValueMultiplier,c.ValueBounds[0],c.ValueBounds[1]);for(const p of u)p.alphaWidth.w=d},reset:()=>{u.forEach(h=>{h.alphaWidth.w=h.initial})}}]}if(t.component==="VertexDisplacementFx"){const c=Ze(n,t.obj,"VertexDisplacementFx",l);if(c?.enabled!==!0)return[];const f=e[t.obj]??[],u=new H(He(c.XCurve,0)*c.Ranges[0],He(c.YCurve,0)*c.Ranges[1],-He(c.ZCurve,0)*c.Ranges[2]);return f.forEach(h=>{const d=ht(h,"_DisplacementAxisMultiplier");d!==void 0?d.copy(u):h.uniforms._DisplacementAxisMultiplier={value:u.clone()}}),[{apply:h=>{const d=new H(He(c.XCurve,h)*c.Ranges[0],He(c.YCurve,h)*c.Ranges[1],-He(c.ZCurve,h)*c.Ranges[2]);f.forEach(p=>{const m=ht(p,"_DisplacementAxisMultiplier");m!==void 0?m.copy(d):p.uniforms._DisplacementAxisMultiplier={value:d.clone()}})},reset:()=>{f.forEach(h=>{ht(h,"_DisplacementAxisMultiplier")?.copy(u)})}}]}return[]}return An(n,"FloatFxGroupEffectManager","FloatFxGroupEffect").flatMap(({groupId:t,effect:s})=>s.enabled?[{groupId:t,count:s.Count,trigger:s.Trigger!==0,entries:s.fxEntries.map(a=>({id:a.ID,targets:a.Targets.flatMap(l=>o(l))}))}]:[])}function Ql(n,e,i=[1,1,1],r=.5,o,t){const s={value:0},a={};o!==void 0&&Object.assign(a,{DIRT:1}),t!==void 0&&Object.assign(a,{NORMAL_TEXTURE:1}),t?.detailIntensity!==void 0&&t.detailIntensity!==0&&Object.assign(a,{DETAIL_NORMAL_MAP:1});const l=new Ee({vertexShader:jt,fragmentShader:od,uniforms:{...je(n,{startOffset:1}),_ReflectionTex:e,_ReflectionIntensity:{value:r},_Color:{value:we(i)},_DirtTex:{value:o?.texture??null},_DirtScale:{value:new xe(...o?.scale??[1,1])},_DirtOffset:{value:new xe(...o?.offset??[0,0])},_DirtIntensity:{value:o?.intensity??1},_NormalTex:{value:t?.texture??null},_NormalScale:{value:new xe(...t?.scale??[1,1])},_NormalOffset:{value:new xe(...t?.offset??[0,0])},_TextureScrolling:{value:new xe(...t?.scrolling??[0,0])},_DetailNormalTexScrolling:{value:new xe(...t?.detailScrolling??[0,0])},_DetailNormalTextureScale:{value:t?.detailScale??1},_DetailNormalIntensity:{value:t?.detailIntensity??0},_BumpIntensity:{value:t?.intensity??0},_TimeSeconds:s},defines:a});return t!==void 0&&(l.onBeforeRender=()=>{s.value=performance.now()*.001}),l}function Ed(n){return new Ee({vertexShader:ql,fragmentShader:id,uniforms:{_BloomPrePassTexture:n._BloomPrePassTexture,_CustomFogTextureToScreenRatio:n._CustomFogTextureToScreenRatio},depthWrite:!1,side:nt})}function Cd(n,e,i){const r=Array.from({length:8},(t,s)=>{const a=i[Math.min(s,i.length-1)]?.color??[0,0,0,1],l=we([a[0],a[1],a[2]]);return new Be(l.r,l.g,l.b,a[3])}),o=Array.from({length:8},(t,s)=>{const a=i[Math.min(s,i.length-1)]??{startT:1,exp:1};return new xe(a.startT,a.exp)});return new Ee({vertexShader:ql,fragmentShader:nd,uniforms:{_BloomPrePassTexture:n._BloomPrePassTexture,_CustomFogTextureToScreenRatio:n._CustomFogTextureToScreenRatio,_TintColor:{value:we([e[0],e[1],e[2]])},_TintColorAlpha:{value:e[3]},_GradientColors:{value:r},_GradientStops:{value:o},_GradientCount:{value:Math.min(i.length,8)}},depthTest:!1,depthWrite:!1,side:nt})}function Pd(n){const e=new _t;if(e.setAttribute("position",new De(new Float32Array(n.positions),3)),n.normals!==void 0?e.setAttribute("normal",new De(new Float32Array(n.normals),3)):e.computeVertexNormals(),n.uvs!==void 0&&e.setAttribute("uv",new De(new Float32Array(n.uvs),2)),n.secondaryUvs!==void 0&&e.setAttribute("uv1",new De(new Float32Array(n.secondaryUvs),2)),n.colors!==void 0){const i=n.colors.length/(n.positions.length/3);e.setAttribute("color",new De(new Float32Array(n.colors),i))}e.setIndex(n.indices);for(const i of n.groups??[])e.addGroup(i.start,i.count,i.materialIndex);return e.computeBoundingSphere(),e}const ui=new H,Io=new H,fr=new H;function Ad(n){if(n.hasAttribute("tangent")||!n.hasAttribute("normal")||!n.hasAttribute("uv")||n.index===null)return;n.computeTangents();const e=n.getAttribute("normal"),i=n.getAttribute("tangent");for(let r=0;r<i.count;r++)Io.fromBufferAttribute(i,r),!(Io.lengthSq()>1e-6)&&(ui.fromBufferAttribute(e,r).normalize(),fr.set(Math.abs(ui.x)<.9?1:0,Math.abs(ui.x)<.9?0:1,0),Io.copy(fr).addScaledVector(ui,-fr.dot(ui)).normalize(),i.setXYZW(r,Io.x,Io.y,Io.z,1));i.needsUpdate=!0}function Ld(){const n=new _t;return n.setAttribute("position",new De(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),n}function Rd(n){const e=new it;return e.name=n.name,e.position.fromArray(n.position),e.quaternion.fromArray(n.rotation),e.scale.fromArray(n.scale),e.visible=n.active,e}const Od=.25,ur=128;function Dd(n,e){for(let i=n.length-2;i>=0;i--){const r=n[i];if(r===void 0||e<r.startT)continue;const o=n[i+1];if(o===void 0)continue;const t=Math.pow((e-r.startT)/(o.startT-r.startT),r.exp);return r.color.map((s,a)=>s+((o.color[a]??0)-s)*t)}return n[n.length-1]?.color??[0,0,0,0]}function Fd(n,e){let i=e,r=n.objects.length;for(;r-- >0;){const o=n.objects[i];if(!o?.active)return!1;if(o.parent<0)return!0;i=o.parent}return!1}function Id(n){for(const[e,i]of n.objects.entries())for(const r of i.components?.BackgroundGradient??[]){if(!r.enabled||r.ExecutionTime!==2||r.Elements.length<2||!Fd(n,e))continue;const o=new Uint8Array(ur*4);for(let t=0;t<ur;t++){const s=Dd(r.Elements,t/(ur-1));for(let a=0;a<4;a++)o[t*4+a]=Math.round(Math.min(Math.max(s[a]??0,0),1)*255)}return{ramp:o,tint:r.TintColor}}return null}function kd(n,e){const i=[];return n.objects.forEach((r,o)=>{for(const t of r.components?.DirectionalLight??[]){if(!t.enabled)continue;const s=(r.components?.DirectionalLightsController??[]).find(l=>l.enabled&&l.Light.obj===o),a=(s?.LightIntensityData??[]).flatMap(l=>{if(l.component!=="LightIntensityController")return[];const c=n.objects[l.obj]?.components?.LightIntensityController?.[l.componentIndex??0];if(!c?.enabled)return[];const f=e.lightEffectsByTarget.get(at(l))??[];return Po(f,c.ID).map(u=>({binding:u,intensity:c.Intensity??1}))});i.push({node:e.nodes[o]??e.root,color:[t.Color[0],t.Color[1],t.Color[2]],intensity:t.Intensity,controllerIntensity:s?.Intensity??1,radius:t.Radius,maxIntensity:s?.MaxIntensity??1,multiplyColorByAlpha:s?.MultiplyColorByAlpha!==0,mixType:s?.MixType??0,inputs:a})}}),i}function Nd(n,e,i,r){n.objects.forEach((o,t)=>{o.components?.BackgroundGradientController?.forEach((s,a)=>{if(!s.enabled)return;const l=Cd(e.fog,s.TintColor,s.Elements),c=Ld();i.geometries.set(`__background-gradient-${String(t)}-${String(a)}`,c),i.materialInstances.add(l);const f=new Ue(c,l);f.name=`${o.name}:background-gradient`,f.frustumCulled=!1,f.renderOrder=-999,i.nodes[t]?.add(f);const u={obj:t,component:"BackgroundGradientController",componentIndex:a},h=i.lightEffectsByTarget.get(at(u))??[];r.push({materials:[l],bindings:Po(h,s.ID),intensityMultiplier:1,node:f,colorProperty:"_TintColor",transform:Sd(s)})})})}function Bd(n,e,i,r){const o=new Map,t=new Set(n.objects.flatMap(s=>(s.components?.LightReflection??[]).flatMap(a=>a.ParametricLightReflection.map(l=>l.Light.obj))));return n.objects.forEach((s,a)=>{const l=e.nodes[a];if(!(l===void 0||!s.active&&!t.has(a)))for(const[c,f]of(s.components?.ParametricBloomFogLightController??[]).entries()){let u=function(g,y=Number.POSITIVE_INFINITY,S=f.StartAlpha){for(const b of p)b(g,y,S)};if(!f.enabled)continue;const h=e.lightEffectsByTarget.get(at({obj:a,component:"ParametricBloomFogLightController",componentIndex:c}))??[],d=_d(f,l,n,h);i.push(d);const p=[],m={node:l,segments:[d],materialLights:[],matrixTargets:[],startAlpha:f.StartAlpha,endAlpha:f.EndAlpha,setLength:u};o.set(`${String(a)}:ParametricBloomFogLightController:${String(c)}`,m);const v=[["box",f.BoxLight,f.ColorAlphaMultiplier],["sprite",f.SpriteLight,f.ColorAlphaMultiplier*f.FakeBloomIntensityMultiplier]];for(const[g,y,S]of v){let b=function(M){Z=M;const R=Math.max(Math.abs(M*S),f.MinAlpha);A!==void 0&&(A.visible=W&&(f.DisableRenderersOnZeroAlpha===0||M>.01)&&(n.objects[k]?.chromaGenerated===!0||!B||R*R>Od));const F=f.MultiplyLengthByAlpha===0?1:He(f.AlphaToLengthCurve,M);let D=1;if(f.ThickenWithDistance!==0){const z=f.MaxDistance-f.MinDistance,N=L.matrixWorld.elements[14],G=z===0?0:Math.min(Math.max((N-f.MinDistance)/z,0),1),q=He(f.ThickenCurve,G);D=f.MinWidthMultiplier+(f.MaxWidthMultiplier-f.MinWidthMultiplier)*q}if(P!==void 0){const z=f.Width*D,N=f.OverrideChildrenLength===0?P.Height:(K+(f.AddWidthToLength===0?0:f.Width))*F,G=Math.min(N,U);P.UpdateTransform!==0&&(_.scale.set(z*.5,G*.5,z*.5),_.position.set(0,(.5-f.Center)*G,0),_.updateMatrix());const q=f.OverrideChildrenAlpha===0?P.AlphaStart:I,Q=f.OverrideChildrenAlpha===0?P.AlphaEnd:f.EndAlpha,X=q+(Q-q)*(N<=0?1:Math.min(G/N,1));for(const V of C)ht(V,"_AlphaWidth")?.set(q,X,f.OverrideChildrenWidth===0?P.WidthStart:f.StartWidth,f.OverrideChildrenWidth===0?P.WidthEnd:f.EndWidth)}if(O!==void 0){const z=f.Width*f.BakedGlowWidthScale*D,N=f.OverrideChildrenLength===0?O.Length:(K+(f.AddWidthToLength===0?0:z))*F,G=Math.min(N,U),q=f.OverrideChildrenAlpha===0?O.AlphaStart:I,Q=f.OverrideChildrenAlpha===0?O.AlphaEnd:f.EndAlpha,X=q+(Q-q)*(N<=0?1:Math.min(G/N,1));for(const V of C)ht(V,"_AlphaWidth")?.set(q,X,f.OverrideChildrenWidth===0?O.WidthStart:f.StartWidth,f.OverrideChildrenWidth===0?O.WidthEnd:f.EndWidth),ht(V,"_SizeParams")?.set(z*O.WidthMultiplier,G,f.Center,z*2*O.WidthMultiplier)}};if(y===null)continue;const T=e.nodes[y.obj],C=e.objectShaderMaterials[y.obj]??[];if(T===void 0||C.length===0)continue;const x=n.objects[y.obj]?.components,P=g==="box"?x?.ParametricBoxLight?.[y.componentIndex??0]:void 0,O=g==="sprite"?x?.ParametricSpriteLight?.[y.componentIndex??0]:void 0,E=T,k=y.obj;let _=E;for(;_.parent?.name.startsWith("__chroma_track_")===!0;)_=_.parent;const L=l;O!==void 0&&E.traverse(M=>{const R=e.rendererMeshes.get(M);R!==void 0&&(R.frustumCulled=!1)});const A=e.rendererMeshes.get(E),W=A?.visible??!0,B=C.some(M=>!M.transparent&&M.depthWrite);let Z=1,K=f.Length,U=Number.POSITIVE_INFINITY,I=f.StartAlpha;P!==void 0&&P.UpdateTransform!==0&&m.matrixTargets.push(_),p.push((M,R,F)=>{K=Math.max(M,0),U=Math.max(R,0),I=F,b(Z)});const w={materials:C,bindings:Po(h,f.ID),intensityMultiplier:S,minimumAlpha:f.MinAlpha,applyAlpha:b};b(1),r.push(w),m.materialLights.push(w)}}}),o}function Ud(n,e,i){n.objects.forEach((r,o)=>{for(const[t,s]of(r.components?.RectangleFakeGlowLightController??[]).entries()){if(!s.enabled)continue;const l=Zo(n,s.MpbController).flatMap(u=>e.objectShaderMaterials[u]??[]);if(l.length===0)continue;const c=[s.Size[0]*.5,s.Size[1]*.5,1,s.EdgeSize*.5];for(const u of l)ht(u,"_SizeParams")?.fromArray(c);const f=e.lightEffectsByTarget.get(at({obj:o,component:"RectangleFakeGlowLightController",componentIndex:t}))??[];i.push({materials:l,bindings:Po(f,s.ID),intensityMultiplier:s.AlphaMultiplier,minimumAlpha:s.MinAlpha})}})}function Gd(n,e,i){n.objects.forEach((r,o)=>{for(const t of r.components?.MaterialLightsController??[]){if(!t.enabled)continue;const s=t.MeshRenderer?.obj??o,a=e.objectShaderMaterials[s]??[];if(a.length===0)continue;const l=t.LightIntensityData.flatMap(c=>{if(c.component!=="LightIntensityController")return[];const f=n.objects[c.obj]?.components?.LightIntensityController?.[c.componentIndex??0];if(f?.enabled!==!0)return[];const u=e.lightEffectsByTarget.get(at(c))??[];return u.length===0?[]:[{bindings:Po(u,f.ID),intensity:f.Intensity??1}]});l.length!==0&&i.push({materials:a,bindings:[],intensityMultiplier:1,node:e.nodes[s],colorProperty:t.ColorProperty,combined:{inputs:l,intensity:t.Intensity,maxIntensity:t.MaxIntensity,multiplyColorByAlpha:t.MultiplyColorByAlpha!==0,mixType:t.MixType,setAlphaOnly:t.SetAlphaOnly!==0,alphaIntoColor:t.AlphaIntoColor!==0,setColorOnly:t.SetColorOnly!==0}})}})}function Wd(n,e,i){const r=[],o=[];Nd(n,e,i,o);const t=Bd(n,i,r,o);return Ud(n,i,o),Gd(n,i,o),{directionalLights:kd(n,i),lightSegments:r,materialLights:o,parametricTargets:t,backgroundGradient:Id(n)}}function zd(n,e){const i=[];return n.objects.forEach((r,o)=>{r.components?.LightRotation?.forEach((t,s)=>{if(!t.enabled||t.Effect.component!=="LightRotationEffect")return;const l=n.objects[t.Effect.obj]?.components?.LightRotationEffect?.[t.Effect.componentIndex??0],c=e[t.Transform.obj];l===void 0||!l.enabled||c===void 0||i.push({target:c,eventType:l.ID,startRotation:t.StartRotation,axis:t.RotationVector,speedMultiplier:t.SpeedMultiplier,seed:o*31+s})}),r.components?.LightPairRotation?.forEach((t,s)=>{if(!t.enabled)return;const a=o*31+s;t.Transforms.slice(0,2).forEach((l,c)=>{const f=c===0?t.LeftEffect:t.RightEffect;if(f.component!=="LightRotationEffect")return;const u=n.objects[f.obj]?.components?.LightRotationEffect?.[f.componentIndex??0],h=e[l.Transform.obj];u===void 0||!u.enabled||h===void 0||i.push({target:h,eventType:u.ID,startRotation:h.quaternion.toArray(),axis:t.RotationVector,speedMultiplier:1,seed:a,pair:{mirrored:c===1,startAngle:t.StartRotation*(c===1?-1:1)}})})})}),i}function jd(n,e){const i=[];return n.objects.forEach((r,o)=>{r.components?.TrackLaneRingsManager?.forEach((t,s)=>{if(!t.enabled)return;const a=t.Rings.flatMap(h=>{const d=n.objects[h.obj]?.components?.TrackLaneRing?.[h.componentIndex??0],p=e[h.obj];return d===void 0||!d.enabled||p===void 0?[]:[{target:p,positionOffset:d.PositionOffset,initialPosition:d.PositionZ}]});if(a.length===0)return;const l=n.objects.flatMap((h,d)=>(h.components?.TrackLaneRingsRotation??[]).map((p,m)=>({candidateIndex:d,componentIndex:m,component:p}))).find(({component:h})=>h.enabled&&h.Manager.obj===o&&(h.Manager.componentIndex??0)===s),c=l===void 0?void 0:n.objects.flatMap(h=>h.components?.TrackLaneRingsRotationEffect??[]).find(h=>h.enabled&&h.Effect.obj===l.candidateIndex&&(h.Effect.componentIndex??0)===l.componentIndex),f=n.objects.flatMap(h=>h.components?.TrackLaneRingsPositionSpawner??[]).find(h=>h.enabled&&h.RingManager.obj===o&&(h.RingManager.componentIndex??0)===s),u=f===void 0?void 0:n.objects[f.EffectManager.obj]?.components?.TrackLaneRingsPositionEffect?.[f.EffectManager.componentIndex??0];i.push({rings:a.map(({target:h,positionOffset:d})=>({target:h,positionOffset:d})),rotationEventType:c?.ID,rotationConfig:l===void 0||c===void 0?void 0:{name:r.name,ringCount:a.length,startupRotationAngle:l.component.StartupRotationAngle,startupRotationStep:l.component.StartupRotationStep,startupPropagationSpeed:l.component.StartupRotationPropagationSpeed,startupFlexySpeed:l.component.StartupRotationFlexySpeed,rotationStep:l.component.RotationStep,counterSpin:l.component.CounterSpin!==0,rotation:c.Rotation,step:c.Step,stepType:c.StepType,propagationSpeed:c.PropagationSpeed,flexySpeed:c.FlexySpeed},initialRotations:a.map(()=>0),positionEventType:u?.ID,positionConfig:f===void 0||u?.enabled!==!0?void 0:{positionOffsets:a.map(({positionOffset:h})=>h[2]),initialPositions:a.map(({initialPosition:h})=>h),minPositionStep:f.MinPositionStep,maxPositionStep:f.MaxPositionStep,moveSpeed:f.MoveSpeed},seed:o})})}),i}function Hd(n,e){return An(n,"LightRotationGroupEffectManager","LightRotationGroupEffect").flatMap(({groupId:i,effect:r})=>r.enabled?[{groupId:i,count:r.Count,entries:r.transformEntries.map(o=>({id:o.ID,axis:o.Axis,mirrored:o.Mirrored!==0,targets:o.Transforms.flatMap(t=>e[t.obj]??[])}))}]:[])}function Vd(n,e){return An(n,"LightTranslationGroupEffectManager","LightTranslationGroupEffect").flatMap(({groupId:i,effect:r})=>r.enabled?[{groupId:i,count:r.Count,translationLimits:r.TranslationLimits,distributionLimits:r.DistributionLimits,entries:r.transformEntries.map(o=>({id:o.ID,axis:o.Axis,mirrored:o.Mirrored!==0,targets:o.Transforms.flatMap(t=>e[t.obj]??[])}))}]:[])}function Xd(n,e){return{rotations:zd(n,e),ringGroups:jd(n,e),glsRotationGroups:Hd(n,e),glsTranslationGroups:Vd(n,e)}}const la=new H(0,1,0),Yd=new H(0,0,1),hr=.001,dr=new be,pr=new H,mr=new H;function Zd(n,e,i,r){const o=[],t=new Set,s=new Map;for(const l of n.objects)for(const c of l.components?.ColliderFx??[])c.enabled&&s.set(at(c.Collider),c.Value>0);function a(l,c,f){if(l===void 0||c===void 0)return;const u=new Ue(l,i);u.matrixAutoUpdate=!1,o.push({mesh:u,node:c,reflective:f})}for(const[l,c]of n.objects.entries()){for(const[f,u]of(c.components?.BoxCollider??[]).entries()){const d=at({obj:l,component:"BoxCollider",componentIndex:f});if(t.add(d),!u.enabled)continue;const p=new Cn(...u.Size);p.translate(...u.Center),r.push(p),a(p,e.nodes[l],s.get(d)??!1)}for(const[f,u]of(c.components?.MeshCollider??[]).entries()){const d=at({obj:l,component:"MeshCollider",componentIndex:f});t.add(d),u.enabled&&a(e.geometries.get(u.Mesh),e.nodes[l],s.get(d)??!1)}}for(const l of n.objects)for(const c of l.components?.ColliderFx??[]){if(!c.enabled||t.has(at(c.Collider)))continue;const f=n.objects[c.Collider.obj],u=f?.mesh===void 0?void 0:e.geometries.get(f.mesh);a(u,e.nodes[c.Collider.obj],c.Value>0)}return o}function ca(n){let e=n;for(;e!==null;){if(!e.visible)return!1;e=e.parent}return!0}function $l(n,e,i,r){pr.copy(e),mr.copy(r),n.parent!==null&&(dr.copy(n.parent.matrixWorld).invert(),pr.applyMatrix4(dr),mr.transformDirection(dr)),n.position.copy(pr),n.quaternion.setFromUnitVectors(i,mr.normalize()),n.updateMatrix()}function qd(n,e){const i=Math.max(e,0);n.localStart[1]=-i*n.center,n.localEnd[1]=i*(1-n.center)}function fa(n,e,i,r,o,t){const s=Math.min(r,i),a=e.multiplyLengthByAlpha?He(e.alphaToLengthCurve,e.alpha):1,l=e.multiplyLengthByAlpha?He(e.alphaToBloomLengthCurve,e.alpha):1;qd(e,s*l),e.startAlpha=o,e.endAlpha=(o+(n.target.endAlpha-o)*(i<=0?1:Math.min(s/i,1)))*a,n.target.setLength(i,r,o);for(const c of n.target.matrixTargets)t.add(c)}function Kd(n){for(const e of n){let i=e.parent;for(;i!==null&&!n.has(i);)i=i.parent;i===null&&e.updateMatrixWorld(!0)}}function ua(n,e,i){const r=e.parametricTargets.get(at(i.Light)),o=r?.segments[0];if(r===void 0||o===void 0)return;const t=e.lightSegments.indexOf(o),s=n.nodes[i.HitPointGameObject.obj],a=n.nodes[i.HitPointTransform.obj];if(!(t<0||s===void 0||a===void 0))return s.visible=!1,{target:r,outputIndex:t,hitPointNode:s,hitPointTransform:a,hitPointMaterials:n.objectShaderMaterials[i.HitPointGameObject.obj]??[],hitPointCurve:i.HitPointDistanceToAlphaCurve,showHitPoint:i.ShowHitPoint!==0}}function Jd(n,e,i){const r=[];for(const o of n.objects)for(const t of o.components?.LightReflection??[]){if(!t.enabled)continue;const s=ua(e,i,t.MainParametricLight);if(s===void 0)continue;const a=[];for(const l of t.ParametricLightReflection){const c=ua(e,i,l);c!==void 0&&(c.target.node.visible=!1,a.push(c))}r.push({main:s,bounces:a})}return r}function ha(n,e,i,r,o,t){if(n.hitPointNode.visible=n.showHitPoint&&e!==void 0,!n.hitPointNode.visible||e===void 0)return;$l(n.hitPointTransform,e.point,Yd,e.normal),t.add(n.hitPointTransform);const s=i<=0?1:Math.min(Math.max(e.distance/i,0),1),a=Math.max(He(n.hitPointCurve,s),0)*r.alpha;o.setRGB(...r.color).convertSRGBToLinear();for(const l of n.hitPointMaterials){Kt(l,"_Color")?.copy(o);const c=l.uniforms._ColorMultiplier;c!==void 0&&(c.value=a)}}function Qd(n,e,i){const r=Jd(n,e,i);if(r.length===0)return{apply:()=>{},dispose:()=>{}};const o=new Dt({side:nt}),t=[],s=Zd(n,e,o,t),a=new cf;a.near=hr;const l=[],c=new Map(s.map(S=>[S.mesh,S])),f=new xl,u=new H,h=new H,d=new H,p=new Ke,m=new Set;function v(S,b,T){a.far=T,a.set(S,b);for(const C of a.intersectObjects(l,!1)){const x=c.get(C.object),P=C.face?.normal;if(x===void 0||P===void 0)continue;const O=P.clone().applyNormalMatrix(f.getNormalMatrix(C.object.matrixWorld));if(!(O.dot(b)>=0))return{distance:C.distance,point:C.point.clone(),normal:O,reflective:x.reflective}}}function g(S,b){S.target.node.visible=!1,S.hitPointNode.visible=!1;const T=b[S.outputIndex];T!==void 0&&(T.alpha=0)}function y(S){m.clear(),l.length=0;for(const b of s)ca(b.node)&&(b.mesh.matrixWorld.copy(b.node.matrixWorld),l.push(b.mesh));for(const b of r){const T=S[b.main.outputIndex];if(T===void 0)continue;const C=T.baseLength;if(T.alpha<=.01||!ca(b.main.target.node)){b.main.hitPointNode.visible=!1;for(const L of b.bounces)g(L,S);continue}b.main.target.node.getWorldPosition(u),h.copy(la).transformDirection(b.main.target.node.matrixWorld);let x=v(u,h,C);const P=x?.distance??C;fa(b.main,T,C,P,b.main.target.startAlpha,m),ha(b.main,x,C,T,p,m);let O=x?.reflective===!0,E=Math.max(C-P,0),k=T.endAlpha??1,_=x?.point;x!==void 0&&d.copy(h).reflect(x.normal).normalize();for(const L of b.bounces){const A=S[L.outputIndex];if(!O||A===void 0||_===void 0){g(L,S);continue}L.target.node.visible=!0,$l(L.target.node,_,la,d),m.add(L.target.node),A.color=[T.color[0],T.color[1],T.color[2]],A.alpha=T.alpha;const W=E,B=_.clone().addScaledVector(d,hr);x=v(B,d,W);const Z=Math.min((x?.distance??W)+(x===void 0?0:hr),W);fa(L,A,W,Z,k,m),ha(L,x,W,A,p,m),O=x?.reflective===!0,E=Math.max(W-Z,0),k=A.endAlpha??1,_=x?.point,x!==void 0&&d.reflect(x.normal).normalize()}}Kd(m)}return{apply:y,dispose(){for(const S of t)S.dispose();o.dispose()}}}const ec={resolveDepthBuffer:!1,resolveStencilBuffer:!1},$d={mirrorQuality:"high"},ep=n=>n==="low"?512:n==="medium"?1024:2048;function tc(n,e,i=new Be){return i.set(e.x,e.y,e.z,-n.dot(e))}function tp(n,e){return n.x*e.x+n.y*e.y+n.z*e.z+n.w}function op(n,e=new be){const{x:i,y:r,z:o,w:t}=n;return e.set(1-2*i*i,-2*i*r,-2*i*o,-2*t*i,-2*r*i,1-2*r*r,-2*r*o,-2*t*r,-2*o*i,-2*o*r,1-2*o*o,-2*t*o,0,0,0,1)}function ip(n,e,i,r=new Be,o=new H,t=new H){return o.copy(e).applyMatrix4(n),t.copy(i).transformDirection(n),tc(o,t,r)}function np(n,e,i=new be,r=new be,o=new Be,t=new Be){i.copy(n);const s=o.set(Math.sign(e.x),Math.sign(e.y),1,1).applyMatrix4(r.copy(n).invert()),a=t.copy(e).multiplyScalar(2/e.dot(s)),l=i.elements;return l[2]=a.x-l[3],l[6]=a.y-l[7],l[10]=a.z-l[11],l[14]=a.w-l[15],i}class oc extends Ee{}const Bt=1,Ln=2,Di=3,rp=536885504,sp=537952032,ap=wn(n=>n instanceof Ue),lp=vl({mirrorExcluded:of().optional(),environmentLayer:ml().optional()});function cp(){const n=new Jo(new Uint8Array([0,0,0,0]),1,1,Wt);return n.minFilter=Ve,n.magFilter=Ve,n.needsUpdate=!0,n}class fp{mesh;reflectionTexture;target;black=cp();mirrorCamera=new Kr;clearColorTmp=new Ke;normal=new H;planePos=new H;camPos=new H;reflection=new be;plane=new Be;clipPlane=new Be;pointScratch=new H;normalScratch=new H;inverseProjectionScratch=new be;qScratch=new Be;cScratch=new Be;flippedMaterials=new Set;mirrorPassUniforms=new Set;excludedObjects=new Set;reflectionLayers;constructor(e,i,r){const o=ep(e.mirrorQuality);this.target=e.mirrorQuality==="none"?null:new En(o,o,{format:Wt,depthBuffer:!0,stencilBuffer:!0,samples:e.mirrorQuality==="high"?2:0,...ec}),this.reflectionTexture={value:this.target?.texture??this.black},this.reflectionLayers=e.mirrorQuality==="low"?rp:sp,this.mesh=new Ue(new qe(i,r)),this.mesh.rotateX(-Math.PI/2),this.mesh.layers.set(Bt),this.mirrorCamera.matrixAutoUpdate=!1,this.mirrorCamera.matrixWorldAutoUpdate=!1}updateMaterials(e){this.flippedMaterials.clear(),this.mirrorPassUniforms.clear(),this.excludedObjects.clear(),e.traverse(i=>{const r=ap.safeParse(i);if(!r.success)return;const o=lp.safeParse(r.data.userData);o.success&&o.data.mirrorExcluded===!0&&this.excludedObjects.add(r.data);const t=o.success?o.data.environmentLayer:void 0;t!==void 0&&(this.reflectionLayers&1<<t)===0&&r.data.layers.set(Bt);const s=Array.isArray(r.data.material)?r.data.material:[r.data.material];for(const a of s)(a.side===uo||a.side===mn)&&this.flippedMaterials.add(a),a instanceof oc&&this.mirrorPassUniforms.add(a.uniforms._MirrorPass)})}render(e,i,r,o){if(this.target===null)return;this.mesh.updateMatrixWorld(),this.normal.set(0,0,1).transformDirection(this.mesh.matrixWorld),this.mesh.getWorldPosition(this.planePos),this.planePos.addScaledVector(this.normal,-.001);const t=tc(this.planePos,this.normal,this.plane);if(r.getWorldPosition(this.camPos),tp(t,this.camPos)<=1e-4){this.reflectionTexture.value=this.black;return}this.reflectionTexture.value=this.target.texture;const s=this.mirrorCamera;op(t,this.reflection),s.matrixWorldInverse.multiplyMatrices(r.matrixWorldInverse,this.reflection),s.matrixWorld.copy(s.matrixWorldInverse).invert(),s.projectionMatrix.copy(r.projectionMatrix),s.projectionMatrixInverse.copy(r.projectionMatrixInverse);const a=ip(s.matrixWorldInverse,this.planePos,this.normal,this.clipPlane,this.pointScratch,this.normalScratch);s.layers.mask=r.layers.mask,s.layers.disable(Bt),s.layers.disable(Ln);for(const u of this.flippedMaterials)u.side=u.side===uo?mn:uo;for(const u of this.mirrorPassUniforms)u.value=1;const l=[...this.excludedObjects].filter(u=>u.visible);for(const u of l)u.visible=!1;const c=e.getRenderTarget();e.getClearColor(this.clearColorTmp);const f=e.getClearAlpha();try{e.setClearColor(0,0),e.setRenderTarget(this.target),o?.(e,s),np(r.projectionMatrix,a,s.projectionMatrix,this.inverseProjectionScratch,this.qScratch,this.cScratch),s.projectionMatrixInverse.copy(s.projectionMatrix).invert(),e.render(i,s)}finally{e.setRenderTarget(c),e.setClearColor(this.clearColorTmp,f);for(const u of this.flippedMaterials)u.side=u.side===uo?mn:uo;for(const u of this.mirrorPassUniforms)u.value=0;for(const u of l)u.visible=!0}}dispose(){this.target?.dispose(),this.black.dispose(),this.mesh.geometry.dispose()}}function up(n,e){const i=n.objects.flatMap((a,l)=>(a.components?.PositionConstraint??[]).flatMap(c=>{const f=e[l];if(!c.enabled||c.m_Active===0||f===void 0)return[];const u=c.m_Sources.flatMap(h=>{const d=e[h.sourceTransform.obj];return d===void 0?[]:[{target:d,weight:h.weight}]});return u.length===0?[]:[{target:f,data:c,sources:u}]})),r=new H,o=new H,t=new H,s=new H;return()=>{if(i.length===0)return!1;for(const a of i){let l=0;r.set(0,0,0);for(const c of a.sources)c.target.getWorldPosition(o),r.addScaledVector(o,c.weight),l+=c.weight;l<=0||(r.multiplyScalar(1/l),r.add(o.set(a.data.m_TranslationOffset[0],a.data.m_TranslationOffset[1],-a.data.m_TranslationOffset[2])),a.target.getWorldPosition(t),r.lerpVectors(t,r,a.data.m_Weight),a.data.m_AffectTranslationX===0&&(r.x=t.x),a.data.m_AffectTranslationY===0&&(r.y=t.y),a.data.m_AffectTranslationZ===0&&(r.z=t.z),s.copy(r),a.target.parent?.worldToLocal(s),a.target.position.copy(s),a.target.updateMatrix())}return!0}}const hp="shapeRadius",dp="shapePosition",pp="shapeRotation",mp="shapeScale",vp=`
attribute vec3 particleVelocity;
attribute float particleStart;
attribute float particleLifetime;
attribute float particleSize;
attribute float particleRotation;
uniform float _SongTime;
uniform float _Cycle;
uniform float _Prewarm;
uniform float _ViewportHeight;
varying float vAge;
varying float vLifetime;
varying float vRotation;
varying vec3 vWorldPos;
void main() {
  float elapsed = _SongTime - particleStart;
  float alive = step(0.0, elapsed);
  if (_Prewarm != 0.0) {
    elapsed += _Cycle;
    alive = 1.0;
  }
  float age = mod(max(elapsed, 0.0), _Cycle);
  alive *= 1.0 - step(particleLifetime, age);
  vec3 localPosition = position + particleVelocity * age;
  vec4 worldPosition = modelMatrix * vec4(localPosition, 1.0);
  vec4 viewPosition = viewMatrix * worldPosition;
  gl_Position = projectionMatrix * viewPosition;
  gl_PointSize = alive * particleSize * projectionMatrix[1][1] * _ViewportHeight * 0.5
    / max(-viewPosition.z, 0.001);
  vAge = age;
  vLifetime = particleLifetime;
  vRotation = particleRotation;
  vWorldPos = worldPosition.xyz;
}
`;function gp(n){const e=a=>Number.isInteger(a)?`${a}.0`:`${a}`,i=[...n].sort((a,l)=>a[0]-l[0]),r=i[0];if(r===void 0)return"return 1.0;";let[o,t]=r;const s=[`if (t <= ${e(o)}) return ${e(t)};`];for(const[a,l]of i.slice(1))s.push(`if (t <= ${e(a)}) return mix(${e(t)}, ${e(l)}, clamp((t - ${e(o)}) / ${e(Math.max(a-o,1e-6))}, 0.0, 1.0));`),o=a,t=l;return s.push(`return ${e(t)};`),s.join(`
`)}function yp(n){return`
uniform sampler2D _MainTex;
uniform vec4 _Tint;
uniform float _Brightness;
uniform float _AlphaMultiplier;
uniform float _FogStartOffset;
uniform float _FogScale;
varying float vAge;
varying float vLifetime;
varying float vRotation;
varying vec3 vWorldPos;
${ze}
float particleAlpha(float t) {
  ${gp(n.alphaKeys)}
}
void main() {
  float sine = sin(vRotation);
  float cosine = cos(vRotation);
  vec2 uv = gl_PointCoord - 0.5;
  uv = mat2(cosine, -sine, sine, cosine) * uv + 0.5;
  vec4 sampleColor = texture2D(_MainTex, uv);
  float textureAlpha = ${n.alphaChannelRed?"sampleColor.r":"sampleColor.a"};
  float alpha = textureAlpha * _Tint.a * _AlphaMultiplier
    * particleAlpha(clamp(vAge / max(vLifetime, 0.0001), 0.0, 1.0));
  ${n.squareAlpha?"alpha *= alpha;":""}
  vec3 color = _Tint.rgb * (1.0 + _Brightness);
  ${n.whiteBoost?"color += vec3(alpha);":""}
  vec4 outputColor = vec4(color * alpha, alpha);
  ${n.fogEnabled?"outputColor = applyTransparentLightFog(outputColor, vWorldPos, _FogStartOffset, _FogScale);":""}
  if (outputColor.a <= 0.0001) discard;
  gl_FragColor = outputColor;
}
`}function xo(n,e){const i=Math.sin((n+1)*12.9898+e*78.233)*43758.5453;return i-Math.floor(i)}function bp(n,e){const i=xo(n,e)*2-1,r=xo(n,e+1)*Math.PI*2,o=Math.sqrt(1-i*i);return new H(Math.cos(r)*o,i,Math.sin(r)*o)}function Sp(n){const e=[],i=[],r=[],o=[],t=[],s=[],{[pp]:a,[hp]:l,[mp]:c,[dp]:f}=n,u=new ge().setFromEuler(new Ri(a[0]*Math.PI/180,a[1]*Math.PI/180,a[2]*Math.PI/180,"XYZ"));for(let d=0;d<n.maxParticles;d+=1){const p=bp(d,0),m=l*Math.cbrt(xo(d,2)),v=p.clone().multiplyScalar(m).multiply(new H(...c)).applyQuaternion(u).add(new H(...f)),g=n.randomDirection===0?new H(0,1,0).applyQuaternion(u):p,y=n.speed[0]+(n.speed[1]-n.speed[0])*xo(d,3);e.push(v.x,v.y,v.z),i.push(g.x*y,g.y*y,g.z*y),r.push(n.rate>0?d/n.rate:0),o.push(n.lifetime[0]+(n.lifetime[1]-n.lifetime[0])*xo(d,4)),t.push(n.size[0]+(n.size[1]-n.size[0])*xo(d,5)),s.push(n.rotationRange[0]+(n.rotationRange[1]-n.rotationRange[0])*xo(d,6))}const h=new _t;return h.setAttribute("position",new ao(e,3)),h.setAttribute("particleVelocity",new ao(i,3)),h.setAttribute("particleStart",new ao(r,1)),h.setAttribute("particleLifetime",new ao(o,1)),h.setAttribute("particleSize",new ao(t,1)),h.setAttribute("particleRotation",new ao(s,1)),h}function _p(n,e,i,r,o){const t=new xe;for(const[s,a]of n.entries()){const l=e.textures?.get(a.texture);if(l===void 0||a.maxParticles===0||a.rate<=0)continue;const c=Sp(a),f=new Ee({vertexShader:vp,fragmentShader:yp(a),uniforms:{...je(e.fog,{enabled:a.fogEnabled,heightEnabled:a.heightFogEnabled}),_MainTex:{value:l},_Tint:{value:new Be(...a.tint)},_Brightness:{value:a.brightness},_AlphaMultiplier:{value:a.alphaMultiplier},_SongTime:e.songTime??{value:0},_Cycle:{value:a.maxParticles/a.rate},_Prewarm:{value:a.prewarm?1:0},_ViewportHeight:{value:1}},transparent:!0,depthWrite:!1,blending:ot,blendEquation:Ae,blendSrc:Me,blendDst:Me,blendEquationAlpha:Ae,blendSrcAlpha:Me,blendDstAlpha:Me});f.onBeforeRender=d=>{const p=f.uniforms._ViewportHeight;p!==void 0&&(p.value=d.getDrawingBufferSize(t).y)};const u=new it;u.name=a.name,u.position.set(...a.position),u.quaternion.set(...a.rotation),u.scale.set(...a.scale);const h=new Ml(c,f);h.name=`${a.name}:particles`,h.frustumCulled=!1,h.renderOrder=a.sortingOrder,u.add(h),i.add(u),r.set(`particle-system:${s}:${a.name}`,c),o.add(f)}}const ic=`
uniform vec3 _DisplacementAxisMultiplier;
uniform float _DisplacementStrength;
uniform float _MeshPackingId;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vWorldTangent;
varying vec3 vWorldBitangent;
varying vec3 vViewPos;
varying vec3 vViewNormal;
varying vec2 vUv;
#ifdef USE_SECONDARY_UV
varying vec2 vSecondaryUv;
#endif
varying vec4 vScreenPos;
#ifdef USE_VERTEX_COLOR
attribute vec4 color;
varying vec4 vVertexColor;
#endif
#if defined(MESH_PACKING) || defined(USE_SECONDARY_UV)
attribute vec2 uv1;
#endif

void main() {
  vec3 localPosition = position;
  vec3 localNormal = normal;
  mat3 instanceBasis = mat3(1.0);
  #ifdef MESH_PACKING
  if (abs(uv1.y - _MeshPackingId) > 0.1) localPosition = vec3(0.0);
  #endif
  #ifdef VERTEX_DISPLACEMENT
  vec3 displacement = color.rgb;
  #ifdef DISPLACEMENT_BIDIRECTIONAL
  displacement = displacement * 2.0 - 1.0;
  #endif
  #ifdef DISPLACEMENT_SPATIAL
  localPosition += displacement * _DisplacementAxisMultiplier * _DisplacementStrength;
  #else
  localPosition += localNormal * displacement.r * _DisplacementAxisMultiplier.x * _DisplacementStrength;
  #endif
  #endif
  #ifdef USE_VERTEX_COLOR
  vVertexColor = color;
  #endif
  vec4 localPos = vec4(localPosition, 1.0);
  #ifdef USE_INSTANCING
  localPos = instanceMatrix * localPos;
  instanceBasis = mat3(instanceMatrix);
  #endif
  vec4 worldPos = modelMatrix * localPos;
  vec4 viewPos = viewMatrix * worldPos;
  vWorldPos = worldPos.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * instanceBasis * localNormal);
  #ifdef USE_TANGENT
  vWorldTangent = normalize(mat3(modelMatrix) * instanceBasis * tangent.xyz);
  vWorldBitangent = normalize(cross(vWorldNormal, vWorldTangent) * tangent.w);
  #endif
  vViewPos = viewPos.xyz;
  #ifdef USE_INSTANCING
  vViewNormal = normalize(mat3(viewMatrix) * vWorldNormal);
  #else
  vViewNormal = normalize(normalMatrix * localNormal);
  #endif
  vUv = uv;
  #ifdef USE_SECONDARY_UV
  vSecondaryUv = uv1;
  #endif
  gl_Position = projectionMatrix * viewPos;
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
}
`,nc=`
uniform samplerCube _ReflectionProbe;
uniform samplerCube _ReflectionProbe2;
uniform vec3 _ReflectionProbePosition;
uniform vec3 _ReflectionProbeBoxMin;
uniform vec3 _ReflectionProbeBoxMax;
uniform vec4 _LightProbeLightBakeId[6];

vec3 chroDecodeProbeChannel(float encoded, vec4 lightColor) {
  float lowRange = min(encoded, 0.5);
  float highRange = max(encoded - 0.5, 0.0) * lightColor.a;
  return lowRange * lightColor.rgb + vec3(highRange * highRange);
}

vec3 chroProjectProbeDirection(vec3 direction, vec3 worldPosition) {
  vec3 inverseDirection = 1.0 / direction;
  vec3 projectedBounds = mix(
    (_ReflectionProbeBoxMin - worldPosition) * inverseDirection,
    (_ReflectionProbeBoxMax - worldPosition) * inverseDirection,
    step(vec3(0.0), direction)
  );
  float projectedDistance = min(min(projectedBounds.x, projectedBounds.y), projectedBounds.z);
  return worldPosition - _ReflectionProbePosition + direction * projectedDistance;
}

vec3 chroSampleProbe(vec3 reflectedView, vec3 worldPosition, float mip) {
  vec3 probeDirection = vec3(reflectedView.xy, -reflectedView.z);
  #ifdef BAKED_REFLECTION_PROBE
  vec3 unityWorldPosition = vec3(worldPosition.xy, -worldPosition.z);
  probeDirection = chroProjectProbeDirection(probeDirection, unityWorldPosition);
  vec3 firstProbe = textureCube(_ReflectionProbe, probeDirection, mip).rgb;
  vec3 secondProbe = textureCube(_ReflectionProbe2, probeDirection, mip).rgb;
  vec3 decoded = chroDecodeProbeChannel(firstProbe.r, _LightProbeLightBakeId[0]);
  decoded += chroDecodeProbeChannel(firstProbe.g, _LightProbeLightBakeId[1]);
  decoded += chroDecodeProbeChannel(firstProbe.b, _LightProbeLightBakeId[2]);
  decoded += chroDecodeProbeChannel(secondProbe.r, _LightProbeLightBakeId[3]);
  decoded += chroDecodeProbeChannel(secondProbe.g, _LightProbeLightBakeId[4]);
  decoded += chroDecodeProbeChannel(secondProbe.b, _LightProbeLightBakeId[5]);
  return clamp(decoded * 2.0, 0.0, 1.0);
  #else
  return textureCube(_ReflectionProbe, probeDirection, mip).rgb;
  #endif
}
`,Tp=`
uniform sampler2D _NormalTexture;
uniform vec2 _NormalTextureScale;
uniform vec2 _NormalTextureOffset;
uniform vec2 _NormalTexScrolling;
uniform float _NormalScale;
uniform float _NormalScaleVertical;
uniform float _Metallic;
uniform float _ReflectionIntensity;
uniform float _Smoothness;
uniform vec3 _Color;
uniform float _ColorAlpha;
uniform float _TimeSeconds;
uniform float _FogStartOffset;
uniform float _FogScale;
uniform float _FallingFogStartOffset;
uniform float _ZFadePosition;
uniform float _ZFadeScale;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vWorldTangent;
varying vec3 vWorldBitangent;
varying vec2 vUv;
varying vec4 vScreenPos;
${dt}
${ze}
${Bl}
${nc}
void main() {
  float unityTime = _TimeSeconds * 0.05;
  vec2 normalUv = (vUv + _NormalTexScrolling * unityTime) * _NormalTextureScale + _NormalTextureOffset;
  vec4 packedNormal = texture2D(_NormalTexture, normalUv);
  vec2 mappedXy = chroDxt5NormalXY(packedNormal);
  vec3 surfaceNormal = normalize(vWorldNormal);
  float mappedZ = sqrt(max(1.0 - min(dot(mappedXy, mappedXy), 1.0), 0.0));
  float verticalGain = 1.0 + _NormalScaleVertical * (1.0 - surfaceNormal.y);
  mappedXy *= verticalGain;
  vec3 mappedNormal = normalize(mat3(vWorldTangent, vWorldBitangent, surfaceNormal) * vec3(mappedXy, mappedZ));
  vec3 normal = normalize(mix(surfaceNormal, mappedNormal, _NormalScale));
  vec3 viewDirection = normalize(cameraPosition - vWorldPos);
  vec3 reflectedView = reflect(-viewDirection, normal);
  float roughness = 1.0 - _Smoothness;
  float roughnessMipWeight = 1.7 - 0.7 * roughness;
  float probeMip = roughness * roughnessMipWeight * 6.0;
  vec3 reflection = chroSampleProbe(reflectedView, vWorldPos, probeMip);
  #ifndef BAKED_REFLECTION_PROBE
  reflection = min(reflection * 2.0, vec3(1.0));
  #endif
  float reflectionWeight = _Smoothness * mix(0.4, 2.0, _Metallic);
  vec3 reflectionColor = mix(vec3(1.0), _Color, _Metallic);
  vec4 albedo = vec4(
    chroToneMap(reflection * reflectionColor * _ReflectionIntensity * reflectionWeight),
    _ColorAlpha
  );
  float fogStartOffset = _FogStartOffset + _FallingFogStartOffset * (1.0 - clamp(normal.y, 0.0, 1.0));
  albedo = applyChroFog(albedo, vScreenPos, vWorldPos, fogStartOffset, _FogScale);
  #ifdef Z_FADE
  float alpha = clamp((_ZFadePosition + vWorldPos.z) * _ZFadeScale, 0.0, 1.0) * _ColorAlpha;
  gl_FragColor = vec4(albedo.rgb, alpha);
  #else
  gl_FragColor = vec4(albedo.rgb, 0.0);
  #endif
  #include <colorspace_fragment>
}
`,xp=`
uniform vec3 _DirectionalLightDirections[5];
uniform vec3 _DirectionalLightColors[5];
uniform vec3 _DirectionalLightPositions[5];
uniform float _DirectionalLightRadii[5];
uniform float _AmbientMinimalValue;
uniform vec3 _NominalDiffuseLevel;
uniform float _AmbientMultiplier;
uniform float _DiffuseEnabled;
uniform float _BothSidesDiffuseMultiplier;
uniform float _Metallic;
uniform float _SpecularEnabled;
uniform float _Smoothness;
uniform float _SpecularIntensity;
uniform float _LightFalloffEnabled;
uniform float _PrivatePointLightEnabled;
uniform vec3 _PrivatePointLightColor;
uniform vec3 _PrivatePointLightPosition;
uniform float _PrivatePointLightLocal;
uniform float _PrivatePointLightIntensity;
uniform float _GroundFadeEnabled;
uniform float _GroundFadeScale;
uniform float _GroundFadeOffset;
uniform float _DistanceDarkeningEnabled;
uniform float _DarkeningScale;
uniform float _DarkeningIntensity;
uniform vec3 _DarkeningCenter;
uniform vec3 _DarkeningDirection;
uniform vec3 _EmissionColor;
uniform float _EmissionColorAlpha;
uniform float _VertexEmissionThreshold;
uniform float _VertexEmissionStrength;
uniform float _VertexEmissionBloomIntensity;
uniform sampler2D _DiffuseTex;
uniform vec2 _DiffuseTexScale;
uniform vec2 _DiffuseTexOffset;
uniform float _AlbedoMultiplier;
uniform sampler2D _MetalSmoothnessTex;
uniform vec2 _MetalSmoothnessTexScale;
uniform vec2 _MetalSmoothnessTexOffset;
uniform float _OcclusionIntensity;
uniform sampler2D _DirtDetailTex;
uniform vec2 _DirtDetailTexScale;
uniform vec2 _DirtDetailTexOffset;
uniform vec2 _OcclusionDetailOffset;
uniform float _OcclusionDetailIntensity;
uniform sampler2D _NormalTexture;
uniform vec2 _NormalTextureScale;
uniform vec2 _NormalTextureOffset;
uniform float _NormalScale;
uniform sampler2D _EmissionTex;
uniform vec2 _EmissionTexScale;
uniform vec2 _EmissionTexOffset;
uniform sampler2D _EmissionMask;
uniform vec2 _EmissionMaskScale;
uniform vec2 _EmissionMaskOffset;
uniform sampler2D _SecondaryEmissionMask;
uniform vec2 _SecondaryEmissionMaskScale;
uniform vec2 _SecondaryEmissionMaskOffset;
uniform vec2 _EmissionMaskSpeed;
uniform vec2 _SecondaryEmissionMaskSpeed;
uniform float _PrimaryEmissionGain;
uniform float _SecondaryEmissionGain;
uniform float _ReflectionIntensity;
uniform vec3 _EmissionTexColor;
uniform float _EmissionTexColorAlpha;
uniform float _EmissionBrightness;
uniform float _EmissionFogSuppression;
uniform float _EmissionTexBloomIntensity;
uniform float _EmissionTexWhiteBoostMultiplier;
uniform float _TimeSeconds;
uniform float _SongTime;
uniform float _TimeOffset;
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vViewPos;
varying vec3 vViewNormal;
varying vec2 vUv;
#ifdef USE_SECONDARY_UV
varying vec2 vSecondaryUv;
#endif
varying vec4 vScreenPos;
#ifdef USE_VERTEX_COLOR
varying vec4 vVertexColor;
#endif
${pt}
${dt}
${ze}
${nc}
float chroDiffuseTerm(vec3 normal, vec3 lightDirection) {
  return max(dot(normal, lightDirection), 0.0)
    + max(dot(normal, -lightDirection), 0.0) * _BothSidesDiffuseMultiplier;
}

float chroLightFalloff(vec3 lightOffset, float radius) {
  return clamp(1.0 - length(lightOffset) / max(radius, 0.00000001), 0.0, 1.0);
}

const float CHRO_PI = 3.14159265;

float chroGgxDistribution(float normalDotHalf, float roughnessSquared) {
  float roughnessFourth = roughnessSquared * roughnessSquared;
  float denominator = normalDotHalf * normalDotHalf * (roughnessFourth - 1.0) + 1.0;
  return roughnessFourth / (CHRO_PI * denominator * denominator);
}

float chroSmithMasking(float normalDotDirection, float geometryK) {
  return normalDotDirection / (normalDotDirection * (1.0 - geometryK) + geometryK);
}

vec3 chroSchlickFresnel(vec3 baseReflectance, float viewDotHalf) {
  return baseReflectance + (1.0 - baseReflectance) * pow(1.0 - viewDotHalf, 5.0);
}

vec3 chroSpecularTerm(
  vec3 lightDirection,
  vec3 viewDirection,
  vec3 normal,
  vec3 albedo,
  float metallic,
  float smoothness
) {
  vec3 halfDirection = normalize(lightDirection + viewDirection);
  float normalDotHalf = clamp(dot(normal, halfDirection), 0.0, 1.0);
  float normalDotView = clamp(dot(normal, viewDirection), 0.0, 1.0);
  float normalDotLight = clamp(dot(normal, lightDirection), 0.0, 1.0);
  float viewDotHalf = clamp(dot(viewDirection, halfDirection), 0.0, 1.0);
  float roughness = 1.0 - smoothness;
  float roughnessSquared = roughness * roughness;
  float distribution = chroGgxDistribution(normalDotHalf, roughnessSquared);
  vec3 baseReflectance = mix(vec3(0.04), albedo, metallic);
  vec3 fresnel = chroSchlickFresnel(baseReflectance, viewDotHalf);
  float geometryK = (roughnessSquared + 1.0) * (roughnessSquared + 1.0) / 8.0;
  float geometryView = chroSmithMasking(normalDotView, geometryK);
  float geometryLight = chroSmithMasking(normalDotLight, geometryK);
  return distribution * fresnel * geometryView * geometryLight
    / (4.0 * normalDotView * normalDotLight + 0.001) * normalDotLight;
}
void main() {
  float materialTime = _TimeSeconds;
  #ifdef CUSTOM_TIME_SONG
  materialTime = _SongTime;
  #elif defined(CUSTOM_TIME_FREEZE)
  materialTime = _TimeOffset;
  #endif
  vec3 albedo = baseColor();
  #ifdef DIFFUSE_TEXTURE
  albedo *= texture2D(_DiffuseTex, vUv * _DiffuseTexScale + _DiffuseTexOffset).rgb * _AlbedoMultiplier;
  #endif
  #ifdef USE_VERTEX_COLOR
  #ifndef VERTEX_EMISSION
  albedo *= vVertexColor.rgb;
  #endif
  #endif
  vec3 normal = normalize(vWorldNormal);
  #ifdef NORMAL_TEXTURE
  vec3 mappedNormal = texture2D(
    _NormalTexture,
    vUv * _NormalTextureScale + _NormalTextureOffset
  ).xyz * 2.0 - 1.0;
  mappedNormal.xy *= _NormalScale;
  vec3 positionDx = dFdx(vWorldPos);
  vec3 positionDy = dFdy(vWorldPos);
  vec2 uvDx = dFdx(vUv);
  vec2 uvDy = dFdy(vUv);
  vec3 tangent = normalize(positionDx * uvDy.y - positionDy * uvDx.y);
  vec3 bitangent = normalize(-positionDx * uvDy.x + positionDy * uvDx.x);
  normal = normalize(mat3(tangent, bitangent, normal) * mappedNormal);
  #endif
  vec3 viewDirection = normalize(cameraPosition - vWorldPos);
  float metallic = _Metallic;
  float smoothness = _Smoothness;
  vec4 packedSurface = vec4(1.0);
  #ifdef METAL_SMOOTHNESS_TEXTURE
  packedSurface = texture2D(
    _MetalSmoothnessTex,
    vUv * _MetalSmoothnessTexScale + _MetalSmoothnessTexOffset
  );
    #ifdef METALLIC_TEXTURE
  metallic *= packedSurface.r;
    #endif
    #ifdef SMOOTHNESS_TEXTURE
    #ifdef METAL_SMOOTHNESS_ALPHA
    smoothness *= packedSurface.a;
    #elif defined(METAL_SMOOTHNESS_GREEN_ROUGHNESS)
    smoothness *= 1.0 - packedSurface.g;
    #else
    smoothness *= packedSurface.g;
    #endif
    #endif
  #endif
  vec3 diffuseLight = vec3(0.0);
  vec3 specularLight = vec3(0.0);
  for (int i = 0; i < 5; i++) {
    vec3 lightColor = _DirectionalLightColors[i];
    if (lightColor.r == 0.0 && lightColor.g == 0.0 && lightColor.b == 0.0) continue;
    vec3 lightDir = normalize(_DirectionalLightDirections[i]);
    float attenuation = 1.0;
    if (_LightFalloffEnabled != 0.0) {
      vec3 lightOffset = vWorldPos - _DirectionalLightPositions[i];
      attenuation = chroLightFalloff(lightOffset, _DirectionalLightRadii[i]);
    }
    diffuseLight += chroDiffuseTerm(normal, lightDir) * attenuation * lightColor * _DiffuseEnabled;
    if (_SpecularEnabled != 0.0) {
      specularLight += chroSpecularTerm(lightDir, viewDirection, normal, albedo, metallic, smoothness)
        * attenuation * lightColor;
    }
  }
  if (_PrivatePointLightEnabled != 0.0) {
    vec3 pointOffset = _PrivatePointLightLocal != 0.0
      ? _PrivatePointLightPosition
      : _PrivatePointLightPosition - vWorldPos;
    vec3 lightDir = normalize(pointOffset);
    vec3 pointColor = _PrivatePointLightColor * _PrivatePointLightIntensity;
    diffuseLight += chroDiffuseTerm(normal, lightDir) * pointColor * _DiffuseEnabled;
    if (_SpecularEnabled != 0.0) {
      specularLight += chroSpecularTerm(lightDir, viewDirection, normal, albedo, metallic, smoothness) * pointColor;
    }
  }
  vec3 calculated = diffuseLight * albedo * (1.0 - metallic);
  if (_SpecularEnabled != 0.0) {
    calculated += specularLight * _SpecularIntensity;
  }
  calculated += max(_NominalDiffuseLevel * albedo, vec3(_AmbientMinimalValue)) * _AmbientMultiplier;
  #ifdef REFLECTION_PROBE
  vec3 reflectedView = reflect(-viewDirection, normal);
  float roughness = 1.0 - smoothness;
  float roughnessMipWeight = 1.7 - 0.7 * roughness;
  float probeMip = roughness * roughnessMipWeight * 6.0;
  vec3 reflection = chroSampleProbe(reflectedView, vWorldPos, probeMip);
    #ifdef MULTIPLY_REFLECTIONS
    reflection *= mix(vec3(1.0), albedo, metallic);
    #endif
  float reflectionWeight = smoothness * mix(0.4, 2.0, metallic);
  calculated += reflection * reflectionWeight * _ReflectionIntensity;
  #endif
  #ifdef OCCLUSION
  float occlusion = mix(1.0, packedSurface.b, _OcclusionIntensity);
    #ifdef OCCLUSION_DETAIL
    float detailOcclusion = texture2D(
      _DirtDetailTex,
      (vUv + _OcclusionDetailOffset) * _DirtDetailTexScale + _DirtDetailTexOffset
    ).b;
    occlusion *= mix(1.0, detailOcclusion, _OcclusionDetailIntensity);
    #endif
    #ifdef OCCLUSION_BEFORE_EMISSION
    calculated *= occlusion;
    #endif
  #endif
  #ifdef TONE_MAP_BEFORE_EMISSION
  calculated = chroToneMap(calculated);
  #endif
  float bloomEmission = 0.0;
  float fogSuppression = 1.0;
  #ifdef VERTEX_EMISSION
  float vertexEmissionT = clamp(
    (vVertexColor.g - _VertexEmissionThreshold) / (1.0 - _VertexEmissionThreshold),
    0.0,
    1.0
  );
  float vertexEmissionMask = vertexEmissionT * vertexEmissionT * (3.0 - 2.0 * vertexEmissionT)
    * _VertexEmissionStrength;
  calculated += _EmissionColor * _EmissionColorAlpha * vertexEmissionMask;
  fogSuppression = 1.0 - _EmissionFogSuppression * vertexEmissionMask
    * _EmissionColorAlpha * _EmissionColorAlpha;
  #endif
  #ifdef EMISSION_TEXTURE
  vec4 emission = texture2D(_EmissionTex, vUv * _EmissionTexScale + _EmissionTexOffset);
    #ifdef EMISSION_MASK
    vec2 primaryMaskUv = vUv;
      #ifdef EMISSION_MASK_SECONDARY_UV
      primaryMaskUv = vSecondaryUv;
      #endif
    vec4 primaryMask = texture2D(
      _EmissionMask,
      primaryMaskUv * _EmissionMaskScale + _EmissionMaskOffset + _EmissionMaskSpeed * materialTime
    );
    emission *= mix(vec4(1.0), primaryMask, _PrimaryEmissionGain);
    #endif
    #ifdef SECONDARY_EMISSION_MASK
    vec2 secondaryMaskUv = vUv;
      #ifdef SECONDARY_EMISSION_MASK_SECONDARY_UV
      secondaryMaskUv = vSecondaryUv;
      #endif
    vec4 secondaryMask = texture2D(
      _SecondaryEmissionMask,
      secondaryMaskUv * _SecondaryEmissionMaskScale + _SecondaryEmissionMaskOffset
        + _SecondaryEmissionMaskSpeed * materialTime
    );
    emission *= mix(vec4(1.0), secondaryMask, _SecondaryEmissionGain);
    #endif
    #ifdef EMISSION_TEXTURE_SIMPLE
    float visibleEmission = emission.r * _EmissionBrightness;
    bloomEmission = emission.g * _EmissionBrightness;
    vec3 visibleEmissionColor = _EmissionTexColor * visibleEmission * _EmissionTexColorAlpha;
      #ifdef EMISSION_WHITE_BOOST
      float whiteBoostSignal = bloomEmission * bloomEmission * _EmissionTexColorAlpha
        * _EmissionTexWhiteBoostMultiplier;
      float whiteEnergy = whiteBoostSignal * whiteBoostSignal * 0.997;
      visibleEmissionColor = clamp(visibleEmissionColor + vec3(whiteEnergy), 0.0, 1.0);
      #endif
    calculated += visibleEmissionColor;
    fogSuppression = 1.0 - visibleEmission * _EmissionFogSuppression * _EmissionTexColorAlpha;
    #else
    vec4 finalEmission = emission * vec4(_EmissionTexColor, _EmissionTexColorAlpha)
      * _EmissionBrightness;
    bloomEmission = finalEmission.a;
    calculated += finalEmission.rgb;
    fogSuppression = 1.0 - bloomEmission * _EmissionFogSuppression;
      #ifdef EMISSION_WHITE_BOOST
      float whiteBoostSignal = bloomEmission * bloomEmission * _EmissionTexWhiteBoostMultiplier;
      float whiteEnergy = whiteBoostSignal * whiteBoostSignal * 0.997;
      calculated += vec3(whiteEnergy);
      #endif
    #endif
  #endif
  #if defined(OCCLUSION) && !defined(OCCLUSION_BEFORE_EMISSION)
  calculated *= occlusion;
  #endif
  vec4 color = vec4(calculated, 0.0);
  #ifdef EMISSION_MAIN_EFFECT
  float mainEffectSignal = bloomEmission;
  color.a = mainEffectSignal * mainEffectSignal * 3.5
    * _EmissionTexColorAlpha * _EmissionTexBloomIntensity;
  #endif
  #ifdef VERTEX_EMISSION_MAIN_EFFECT
  color.a += vVertexColor.a * vVertexColor.a * _EmissionColorAlpha * _VertexEmissionBloomIntensity;
  #endif
  if (_GroundFadeEnabled != 0.0) {
    color *= clamp((vWorldPos.y + _GroundFadeOffset) * _GroundFadeScale, 0.0, 1.0);
  }
  #ifndef TONE_MAP_BEFORE_EMISSION
  color.rgb = chroToneMap(color.rgb);
  #endif
  color = applyChroFog(color, vScreenPos, vWorldPos, _FogStartOffset, _FogScale * fogSuppression);
  if (_DistanceDarkeningEnabled != 0.0) {
    vec3 offset = vWorldPos - _DarkeningCenter;
    float distanceAlongAxis = max(0.0, dot(offset, normalize(_DarkeningDirection)));
    float factor = clamp(distanceAlongAxis * _DarkeningScale, 0.0, 1.0) * _DarkeningIntensity;
    color.rgb = mix(color.rgb, vec3(0.0), factor);
  }
  // game writes to a unorm target: blend sources clamp to [0,1] per draw
  gl_FragColor = clamp(color, 0.0, 1.0);
  #include <colorspace_fragment>
}
`,Mp=Array.from({length:6},()=>new Be),vr=new H;function rc(n,e){return{_ReflectionProbe:{value:e?.textures[0]??n},_ReflectionProbe2:{value:e?.textures[1]??n},_ReflectionProbePosition:{value:e?.position??vr},_ReflectionProbeBoxMin:{value:e?.boxMin??vr},_ReflectionProbeBoxMax:{value:e?.boxMax??vr},_LightProbeLightBakeId:{value:e?.lightColors??Mp}}}function wp(n,e,i,r,o){const t={value:0},s={USE_TANGENT:1};o.zFade!==void 0&&Object.assign(s,{Z_FADE:1}),o.bakedReflectionProbe!==void 0&&Object.assign(s,{BAKED_REFLECTION_PROBE:1});const a=new Ee({defines:s,vertexShader:ic,fragmentShader:Tp,uniforms:{...je(n,o.fog),...tt("_NormalTexture",r),_NormalTexScrolling:{value:new xe(...o.normalScrolling)},_NormalScale:{value:o.normalScale},_NormalScaleVertical:{value:o.normalScaleVertical},_Metallic:{value:o.metallic},...rc(o.reflectionProbe,o.bakedReflectionProbe),_ReflectionIntensity:{value:o.reflectionIntensity},_Smoothness:{value:o.smoothness},_FallingFogStartOffset:{value:o.fallingFogStartOffset},_ZFadePosition:{value:o.zFade?.position??0},_ZFadeScale:{value:o.zFade?.scale??1},_Color:{value:we(e)},_ColorAlpha:{value:i},_TimeSeconds:t}});return a.onBeforeRender=()=>{t.value=performance.now()*.001},a}function sc(n,e,i,r){const o={value:0},t={};(r.vertexColorEnabled||r.vertexEmissionEnabled)&&Object.assign(t,{USE_VERTEX_COLOR:1}),r.vertexEmissionEnabled&&Object.assign(t,{VERTEX_EMISSION:1}),r.vertexEmissionEnabled&&r.vertexEmissionMainEffect&&Object.assign(t,{VERTEX_EMISSION_MAIN_EFFECT:1}),r.displacementEnabled&&Object.assign(t,{VERTEX_DISPLACEMENT:1}),r.displacementSpatial&&Object.assign(t,{DISPLACEMENT_SPATIAL:1}),r.displacementBidirectional&&Object.assign(t,{DISPLACEMENT_BIDIRECTIONAL:1}),r.meshPackingEnabled&&Object.assign(t,{MESH_PACKING:1}),r.diffuse!==void 0&&Object.assign(t,{DIFFUSE_TEXTURE:1}),r.metalSmoothness!==void 0&&(Object.assign(t,{METAL_SMOOTHNESS_TEXTURE:1}),r.metallicTextureEnabled&&Object.assign(t,{METALLIC_TEXTURE:1}),r.smoothnessTextureSource!=="none"&&Object.assign(t,{SMOOTHNESS_TEXTURE:1}),r.smoothnessTextureSource==="greenRoughness"&&Object.assign(t,{METAL_SMOOTHNESS_GREEN_ROUGHNESS:1}),r.smoothnessTextureSource==="alpha"&&Object.assign(t,{METAL_SMOOTHNESS_ALPHA:1}),r.occlusionEnabled&&Object.assign(t,{OCCLUSION:1}),r.occlusionEnabled&&r.occlusionBeforeEmission&&Object.assign(t,{OCCLUSION_BEFORE_EMISSION:1})),r.occlusionDetail!==void 0&&r.occlusionDetailEnabled&&Object.assign(t,{OCCLUSION_DETAIL:1}),r.normal!==void 0&&Object.assign(t,{NORMAL_TEXTURE:1}),r.emission!==void 0&&(Object.assign(t,{EMISSION_TEXTURE:1}),r.emissionAlphaSource==="green"&&Object.assign(t,{EMISSION_TEXTURE_SIMPLE:1}),r.emissionWhiteBoost&&Object.assign(t,{EMISSION_WHITE_BOOST:1}),r.emissionMainEffect&&Object.assign(t,{EMISSION_MAIN_EFFECT:1})),(r.emission!==void 0||r.vertexEmissionEnabled)&&r.toneMapBeforeEmission&&Object.assign(t,{TONE_MAP_BEFORE_EMISSION:1}),r.emissionMask!==void 0&&Object.assign(t,{EMISSION_MASK:1}),r.secondaryEmissionMask!==void 0&&Object.assign(t,{SECONDARY_EMISSION_MASK:1}),r.emissionMask!==void 0&&r.emissionMaskSecondaryUvs&&Object.assign(t,{EMISSION_MASK_SECONDARY_UV:1,USE_SECONDARY_UV:1}),r.secondaryEmissionMask!==void 0&&r.secondaryEmissionMaskSecondaryUvs&&Object.assign(t,{SECONDARY_EMISSION_MASK_SECONDARY_UV:1,USE_SECONDARY_UV:1}),(r.reflectionProbe!==void 0||r.bakedReflectionProbe!==void 0)&&Object.assign(t,{REFLECTION_PROBE:1}),r.bakedReflectionProbe!==void 0&&Object.assign(t,{BAKED_REFLECTION_PROBE:1}),(r.reflectionProbe!==void 0||r.bakedReflectionProbe!==void 0)&&r.multiplyReflections&&Object.assign(t,{MULTIPLY_REFLECTIONS:1}),r.customTime==="freeze"&&Object.assign(t,{CUSTOM_TIME_FREEZE:1}),r.customTime==="song"&&Object.assign(t,{CUSTOM_TIME_SONG:1});const s=new Ee({defines:t,vertexShader:ic,fragmentShader:xp,uniforms:{...je(n,r.fog),_Color:{value:we(e)},_EmissionColor:{value:we(r.vertexEmissionColor)},_EmissionColorAlpha:{value:r.vertexEmissionColorAlpha},_VertexEmissionThreshold:{value:r.vertexEmissionThreshold},_VertexEmissionStrength:{value:r.vertexEmissionStrength},_VertexEmissionBloomIntensity:{value:r.vertexEmissionBloomIntensity},...tt("_DiffuseTex",r.diffuse),_AlbedoMultiplier:{value:r.albedoMultiplier},...tt("_MetalSmoothnessTex",r.metalSmoothness),_OcclusionIntensity:{value:r.occlusionIntensity},...tt("_DirtDetailTex",r.occlusionDetail),_OcclusionDetailOffset:{value:new xe(...r.occlusionDetailOffset)},_OcclusionDetailIntensity:{value:r.occlusionDetailIntensity},...tt("_NormalTexture",r.normal),_NormalScale:{value:r.normalScale},...tt("_EmissionTex",r.emission),...tt("_EmissionMask",r.emissionMask),...tt("_SecondaryEmissionMask",r.secondaryEmissionMask),_EmissionMaskSpeed:{value:new xe(r.emissionMaskSpeed[0],r.emissionMaskSpeed[1])},_SecondaryEmissionMaskSpeed:{value:new xe(r.secondaryEmissionMaskSpeed[0],r.secondaryEmissionMaskSpeed[1])},_PrimaryEmissionGain:{value:r.primaryEmissionGain},_SecondaryEmissionGain:{value:r.secondaryEmissionGain},...rc(r.reflectionProbe,r.bakedReflectionProbe),_ReflectionIntensity:{value:r.reflectionIntensity},_EmissionTexColor:{value:we(r.emissionColor)},_EmissionTexColorAlpha:{value:r.emissionColorAlpha},_EmissionBrightness:{value:r.emissionBrightness},_EmissionFogSuppression:{value:r.emissionFogSuppression},_EmissionTexBloomIntensity:{value:r.emissionBloomIntensity},_EmissionTexWhiteBoostMultiplier:{value:r.emissionWhiteBoostMultiplier},_TimeSeconds:o,_SongTime:r.songTime??{value:0},_TimeOffset:{value:r.timeOffset},_DirectionalLightDirections:i.directions,_DirectionalLightColors:i.colors,_DirectionalLightPositions:i.positions,_DirectionalLightRadii:i.radii,_AmbientMinimalValue:{value:r.ambientMinimalValue},_NominalDiffuseLevel:{value:new H(...r.nominalDiffuseLevel)},_AmbientMultiplier:{value:r.ambientMultiplier},_DiffuseEnabled:{value:r.diffuseEnabled?1:0},_BothSidesDiffuseMultiplier:{value:r.bothSidesDiffuseMultiplier},_Metallic:{value:r.metallic},_SpecularEnabled:{value:r.specularEnabled?1:0},_Smoothness:{value:r.smoothness},_SpecularIntensity:{value:r.specularIntensity},_LightFalloffEnabled:{value:r.lightFalloffEnabled?1:0},_PrivatePointLightEnabled:{value:r.privatePointLightEnabled?1:0},_PrivatePointLightColor:{value:we(r.privatePointLightColor)},_PrivatePointLightPosition:{value:new H(...r.privatePointLightPosition)},_PrivatePointLightLocal:{value:r.privatePointLightLocal?1:0},_PrivatePointLightIntensity:{value:r.privatePointLightIntensity},_GroundFadeEnabled:{value:r.groundFadeEnabled?1:0},_GroundFadeScale:{value:r.groundFadeScale},_GroundFadeOffset:{value:r.groundFadeOffset},_DistanceDarkeningEnabled:{value:r.distanceDarkeningEnabled?1:0},_DarkeningScale:{value:r.darkeningScale},_DarkeningIntensity:{value:r.darkeningIntensity},_DarkeningCenter:{value:new H(...r.darkeningCenter)},_DarkeningDirection:{value:new H(...r.darkeningDirection)},_DisplacementStrength:{value:r.displacementStrength},_DisplacementAxisMultiplier:{value:new H(...r.displacementAxisMultiplier)},_MeshPackingId:{value:r.meshPackingId}}});return r.customTime==="continuous"&&(s.onBeforeRender=()=>{o.value=performance.now()*.001}),s}function Qi(n,e){const i=Mt(n,e);return[i[0],i[1],-i[2]]}function Ep(n,e,i){if(n.shader==="ChroMapper/Water Lit"){const a=$e(n,e,"_NormalTexture");if(a!==void 0&&(e.reflectionProbe!==void 0||e.bakedReflectionProbe!==void 0)){const l=n.colors._NormalTexScrolling??[0,0,0,0];return wp(e.fog,i,n.colors._Color?.[3]??1,a,{normalScale:n.floats._NormalScale??1,normalScaleVertical:n.floats._NormalScaleVertical??0,normalScrolling:[l[0],l[1]],metallic:n.floats._Metallic??0,reflectionIntensity:n.floats._ReflectionProbeIntensity??1,smoothness:n.floats._Smoothness??.5,fallingFogStartOffset:n.floats._FallingFogStartOffset??0,reflectionProbe:e.reflectionProbe,bakedReflectionProbe:e.bakedReflectionProbe,zFade:n.keywords.includes("Z_FADE")?{position:n.floats._ZFadePosition??0,scale:n.floats._ZFadeScale??1}:void 0,fog:po(n)})}}const r=$e(n,e,"_DiffuseTex")??$e(n,e,"_DiffuseTexture"),o=n.keywords.includes("METAL_SMOOTHNESS_TEXTURE")?$e(n,e,"_MetalSmoothnessTex"):void 0,t=$e(n,e,"_DirtDetailTex")??o;let s="none";return n.keywords.includes("_SMOOTHNESS_TEXTURE_MPM_G_ROUGHNESS")?s="greenRoughness":n.keywords.includes("_SMOOTHNESS_TEXTURE_MPM_A")?s="alpha":n.keywords.includes("_SMOOTHNESS_TEXTURE_MPM_G")&&(s="green"),sc(e.fog,i,e.directionalLights,{ambientMinimalValue:n.floats._AmbientMinimalValue??0,nominalDiffuseLevel:Mt(n.colors._NominalDiffuseLevel,[0,0,0]),ambientMultiplier:n.floats._AmbientMultiplier??1,diffuseEnabled:(n.floats._EnableDiffuse??1)!==0,bothSidesDiffuseMultiplier:(n.floats._EnableBothSidesDiffuse??0)===0?0:n.floats._BothSidesDiffuseMultiplier??1,metallic:n.floats._Metallic??0,specularEnabled:(n.floats._EnableSpecular??1)!==0,smoothness:n.floats._Smoothness??n.floats._Glossiness??.5,specularIntensity:n.floats._SpecularIntensity??1,lightFalloffEnabled:(n.floats._EnableLightFalloff??0)!==0,privatePointLightEnabled:(n.floats._EnablePrivatePointLight??0)!==0,privatePointLightColor:Mt(n.colors._PrivatePointLightColor,[0,.5,1]),privatePointLightPosition:Qi(n.colors._PrivatePointLightPosition,[0,0,0]),privatePointLightLocal:(n.floats._PointLightPositionLocal??0)!==0,privatePointLightIntensity:n.floats._PrivatePointLightIntensity??1,groundFadeEnabled:(n.floats._EnableGroundFade??0)!==0,groundFadeScale:n.floats._GroundFadeScale??.5,groundFadeOffset:n.floats._GroundFadeOffset??1,distanceDarkeningEnabled:(n.floats._EnableDistanceDarkening??0)!==0,darkeningScale:n.floats._DarkeningScale??.35,darkeningIntensity:n.floats._DarkeningIntensity??1,darkeningCenter:Qi(n.colors._DarkeningCenter,[0,0,0]),darkeningDirection:Qi(n.colors._DarkeningDirection,[1,1,1]),vertexColorEnabled:n.floats._Vertex===1||n.floats._Vertex===5,vertexEmissionEnabled:n.floats._Vertex===2||n.keywords.includes("_VERTEXMODE_EMISSION"),vertexEmissionColor:Mt(n.colors._EmissionColor,[1,1,1]),vertexEmissionColorAlpha:n.colors._EmissionColor?.[3]??1,vertexEmissionThreshold:n.floats._EmissionThreshold??0,vertexEmissionStrength:n.floats._EmissionStrength??1,vertexEmissionBloomIntensity:n.floats._EmissionBloomIntensity??1,vertexEmissionMainEffect:n.keywords.includes("_VERTEX_WHITEBOOSTTYPE_MAINEFFECT"),displacementEnabled:n.floats._Vertex===5||n.keywords.includes("_VERTEXMODE_DISPLACEMENT"),displacementSpatial:(n.floats._DisplacementSpatial??0)!==0||n.keywords.includes("DISPLACEMENT_SPATIAL"),displacementBidirectional:(n.floats._DisplacementBidirectional??0)!==0||n.keywords.includes("DISPLACEMENT_BIDIRECTIONAL"),displacementStrength:n.floats._DisplacementStrength??.1,displacementAxisMultiplier:Qi(n.colors._DisplacementAxisMultiplier,[1,1,1]),meshPackingEnabled:n.keywords.includes("MESH_PACKING"),meshPackingId:n.floats._MeshPackingId??0,diffuse:(n.floats._EnableDiffuseTexture??0)!==0?r:void 0,albedoMultiplier:n.floats._AlbedoMultiplier??1,metalSmoothness:o,metallicTextureEnabled:n.keywords.includes("_METALLIC_TEXTURE_MPM_R"),smoothnessTextureSource:s,occlusionEnabled:n.keywords.includes("OCCLUSION")&&n.keywords.includes("_OCCLUSION_SOURCE_MPM_B"),occlusionBeforeEmission:n.keywords.includes("OCCLUSION_BEFORE_EMISSION"),occlusionIntensity:n.floats._OcclusionIntensity??1,occlusionDetail:t,occlusionDetailEnabled:n.keywords.includes("OCCLUSION_DETAIL")&&t!==void 0,occlusionDetailOffset:[n.colors._AdditiveUVOffset?.[0]??0,n.colors._AdditiveUVOffset?.[1]??0],occlusionDetailIntensity:n.floats._OcclusionDetailIntensity??0,normal:(n.floats._EnableNormalMap??0)!==0?$e(n,e,"_NormalTexture"):void 0,normalScale:n.floats._NormalScale??n.floats._BumpScale??1,emission:(n.floats._EmissionTexture??0)!==0?$e(n,e,"_EmissionTex"):void 0,emissionMask:(n.floats._EnableEmissionMask??0)!==0?$e(n,e,"_EmissionMask"):void 0,secondaryEmissionMask:(n.floats._EnableSecondaryEmissionMask??0)!==0?$e(n,e,"_SecondaryEmissionMask"):void 0,emissionMaskSecondaryUvs:(n.floats._Secondary_UVs??0)!==0&&(n.floats._SecondaryUVsMask??0)!==0,secondaryEmissionMaskSecondaryUvs:(n.floats._Secondary_UVs??0)!==0&&(n.floats._SecondaryUVsMask2??0)!==0,emissionMaskSpeed:Mt(n.colors._EmissionMaskSpeed,[0,0,0]),secondaryEmissionMaskSpeed:Mt(n.colors._SecondaryEmissionMaskSpeed,[0,0,0]),primaryEmissionGain:n.floats._EmissionMaskIntensity??1,secondaryEmissionGain:n.floats._SecondaryEmissionMaskIntensity??1,reflectionProbe:(n.floats._EnableReflectionProbe??0)!==0||n.keywords.includes("REFLECTION_PROBE")?e.reflectionProbe:void 0,bakedReflectionProbe:(n.floats._EnableReflectionProbe??0)!==0||n.keywords.includes("REFLECTION_PROBE")?e.bakedReflectionProbe:void 0,reflectionIntensity:n.floats._ReflectionProbeIntensity??1,multiplyReflections:n.keywords.includes("MULTIPLY_REFLECTIONS"),emissionColor:Mt(n.colors._EmissionTexColor,[1,1,1]),emissionColorAlpha:n.colors._EmissionTexColor?.[3]??1,emissionBrightness:n.floats._EmissionBrightness??1,emissionFogSuppression:n.floats._EmissionFogSuppression??0,emissionAlphaSource:(n.floats._Emission_Alpha_Source??0)===0?"green":"textureAlpha",emissionWhiteBoost:n.floats._EmissionBloomType===1||n.keywords.includes("_EMISSIONCOLORTYPE_WHITEBOOST")||n.keywords.includes("_EMISSIONBLOOMTYPE_PP"),emissionWhiteBoostMultiplier:n.floats._EmissionTexWhiteboostMultiplier??1,emissionMainEffect:n.keywords.includes("_EMISSIONCOLORTYPE_MAINEFFECT")||n.keywords.includes("_EMISSIONCOLORTYPE_WHITEBOOST"),emissionBloomIntensity:n.floats._EmissionTexBloomIntensity??1,toneMapBeforeEmission:n.keywords.includes("_ACES_APPROACH_BEFORE_EMISSIVE"),customTime:Kl(n.keywords),songTime:e.songTime,timeOffset:n.floats._TimeOffset??0,fog:po(n)})}function co(n){switch(n){case 0:return St;case 2:return Ll;case 3:return Al;case 4:return Pl;case 5:return Eo;case 6:return Cl;case 7:return El;case 8:return wl;case 9:return ff;case 10:return Gt;default:return Me}}function fo(n){switch(n){case 0:return St;case 2:return Ll;case 3:return Al;case 4:return Pl;case 5:return Eo;case 6:return Cl;case 7:return El;case 8:return wl;case 10:return Gt;default:return Me}}function Cp(n,e,i){const r=new Set(n.keywords);let o="none";r.has("_FOGTYPE_ALPHA")?o="alpha":r.has("_FOGTYPE_LERP")&&(o="lerp");let t="none";r.has("_BILLBOARD_Y_AXIS")?t="yAxis":(r.has("_BILLBOARD_FULL")||r.has("_BILLBOARD_CAMERA_FACING"))&&(t="camera");let s="multiply";r.has("_MASKBLEND_MASKED_ADD")?s="maskedAdd":r.has("_MASKBLEND_ADD")&&(s="add");let a="multiply";r.has("_MASK2BLEND_MASKED_ADD")?a="maskedAdd":r.has("_MASK2BLEND_ADD")&&(a="add");const l=fd(e.fog,i,n.colors._Color?.[3]??1,{main:r.has("MAIN_TEXTURE")?$e(n,e,"_MainTex"):void 0,mask:r.has("MASK")?$e(n,e,"_MaskTex"):void 0,mask2:r.has("MASK2")?$e(n,e,"_Mask2Tex")??$e(n,e,"_NoiseTex"):void 0,displacement:r.has("VERTEX_DISPLACEMENT")?$e(n,e,"_DisplacementTex"):void 0,colorGradient:r.has("COLOR_GRADIENT")?$e(n,e,"_ColorGradient"):void 0},{vertexColor:r.has("VERTEX_COLOR")||r.has("VERTEX_RED_IS_ALPHA")||r.has("VERTEX_SQUARE_ALPHA")||r.has("_VERTEXCHANNELS_A")||r.has("_VERTEXCHANNELS_RGB"),vertexRedIsAlpha:r.has("VERTEX_RED_IS_ALPHA"),vertexSquareAlpha:r.has("VERTEX_SQUARE_ALPHA"),vertexChannelsAlpha:r.has("_VERTEXCHANNELS_A"),spatialDisplacement:r.has("SPATIAL_DISPLACEMENT"),displacementStrength:n.floats._DisplacementStrength??.1,displacementAxes:Mt(n.colors._DisplacementAxes,[1,1,1]),displacementPanning:Mt(n.colors._DisplacementPanning,[0,0,0]),displacementPanningSpeed:n.floats._DisplacementPanningSpeed??1,textureColor:r.has("TEXTURE_COLOR"),alphaChannelRed:r.has("_ALPHACHANNEL_RED"),squareAlpha:r.has("SQUARE_ALPHA"),billboard:t,billboardScale:n.floats._BillboardScale??1,customTime:Kl(n.keywords),songTime:e.songTime,timeOffset:n.floats._TimeOffset??0,flipbook:r.has("TEXTURE_FLIPBOOK")?{columns:n.floats._FlipbookColumns??1,rows:n.floats._FlipbookRows??1,speed:n.floats._FlipbookSpeed??1}:void 0,gradientPosition:n.floats._GradientPosition??0,gradientPanningSpeed:n.floats._GradientPanningSpeed??0,uvPanning:Mt(n.colors._UvPanning,[0,0,0]),maskPanning:Mt(n.colors._MaskPanning,[0,0,0]),mask2Panning:Mt(n.colors._Mask2Panning,[0,0,0]),baseLayer:n.floats._BaseLayer??1,intensity:n.floats._Intensity??1,alphaMultiplier:n.floats._AlphaMultiplier??1,forcedWhiteBoost:r.has("_WHITEBOOSTTYPE_MAINEFFECT")&&(n.floats._EnableForcedWhiteBoost??0)!==0,whiteBoostStart:n.floats._WhiteboostRemapStart??n.floats._WhiteBoostRemapStart??n.floats._WhiteBoostOffset??0,bloomType:n.floats._BloomType??0,bloomMultiplier:n.floats._BloomMultiplier??1,bloomWhite:n.floats._BloomWhite??n.floats._BloomWhiteMultiplier??1,fogType:o,fog:po(n,o!=="none"),maskRedIsAlpha:r.has("MASK_RED_IS_ALPHA"),maskBlend:s,maskStrength:n.floats._MaskStrength??1,mask2RedIsAlpha:r.has("MASK2_RED_IS_ALPHA"),mask2Blend:a,mask2Strength:n.floats._Mask2Strength??1});return l.transparent=!0,l.blending=ot,l.blendEquation=n.floats._BlendOp===4?Yo:Ae,l.blendSrc=co(n.floats._BlendModeSrc),l.blendDst=fo(n.floats._BlendModeDst),l.blendEquationAlpha=n.floats._BlendOp===4?Yo:Ae,l.blendSrcAlpha=co(n.floats._BlendModeSrcA),l.blendDstAlpha=fo(n.floats._BlendModeDstA),l}const ac=new WeakMap;function lc(n){return ac.get(n)}function Pp(n){switch(n){case 1:return yf;case 2:return gf;case 3:return vf;case 4:return mf;case 5:return pf;case 6:return df;case 7:return hf;default:return uf}}function Ap(n){switch(n){case 1:return Ef;case 2:return wf;case 3:return Mf;case 4:return xf;case 5:return Tf;case 6:return _f;case 7:return Sf;default:return bf}}function da(n,e){const i=pd(n);let r,o;switch(n.family){case"lit":r=o=Ep(n,e,i),n.shader==="ChroMapper/Water Lit"&&n.keywords.includes("Z_FADE")&&(r.transparent=!0,r.blending=ot,r.blendEquation=Ae,r.blendSrc=co(n.floats._BlendModeSrc),r.blendDst=fo(n.floats._BlendModeDst),r.blendEquationAlpha=Ae,r.blendSrcAlpha=co(n.floats._BlendModeSrcA),r.blendDstAlpha=fo(n.floats._BlendModeDstA));break;case"lightTubeOpaque":case"lightTubeTransparent":case"fakeGlow":r=o=vd(n,e,i);break;case"customParticles":r=o=Cp(n,e,i);break;case"rain":r=o=ud(e.fog,i,n.colors._Color?.[3]??1,{height:n.floats._Height??10,speed:n.floats._Speed??1,bottomFadeScale:n.floats._BottomFadeScale??1,topFadeScale:n.floats._TopFadeScale??1,bottomEnd:n.floats._BottomEnd??1,topEnd:n.floats._TopEnd??1,intensity:n.floats._Intensity??1,alphaMultiplier:n.floats._AlphaMultiplier??1,alphaFromFog:n.floats._AlphaFromFog??.5}),r.transparent=!0,r.depthTest=!1,r.blending=ot,r.blendEquation=Ae,r.blendSrc=co(n.floats._BlendSrcFactor),r.blendDst=fo(n.floats._BlendDstFactor),r.blendEquationAlpha=Ae,r.blendSrcAlpha=co(n.floats._BlendSrcFactorA),r.blendDstAlpha=fo(n.floats._BlendDstFactorA);break;case"lightning":{r=o=hd(e.fog,i,n.colors._Color?.[3]??1,n.colors._TargetPoint??[0,0,0,1],$e(n,e,"_MainTex"),{width:n.floats._Width??1,jitter:n.floats._Jitter??5,speed:n.floats._Speed??1,fog:po(n,!0)}),r.transparent=!0,r.blending=ot,r.blendEquation=n.floats._BlendOp===4?Yo:Ae,r.blendSrc=co(n.floats._BlendModeSrc),r.blendDst=fo(n.floats._BlendModeDst),r.blendEquationAlpha=r.blendEquation,r.blendSrcAlpha=co(n.floats._BlendModeSrcA),r.blendDstAlpha=fo(n.floats._BlendModeDstA);break}case"depthOnly":r=new Dt({colorWrite:!1});break;case"stencil":r=new Dt({colorWrite:!1,depthWrite:!1});break;case"clouds":{const f=n.colors._WorldNoiseScrolling??[0,0,0,1];r=o=dd(e.fog,e.directionalLights,$e(n,e,"_MainTex"),$e(n,e,"_NoiseTex"),{speed:n.floats._Speed??1,noiseIntensityOffset:n.floats._WorldNoiseIntensityOffset??0,noiseIntensityScale:n.floats._WorldNoiseIntensityScale??0,noiseScrolling:[f[0],f[1]],fog:{...po(n,!0),heightEnabled:!0,heightOffset:n.floats._HeightFogOffset??0,heightScale:1}});break}case"mirror":{const f=n.keywords.includes("DIRT")?n.textures?._DirtTex:void 0,u=f===void 0?void 0:e.textures?.get(f.asset),h=n.textures?._NormalTex,d=h===void 0?void 0:e.textures?.get(h.asset),p=n.colors._TextureScrolling??[0,0,0,0],m=n.colors._DetailNormalTexScrolling??[0,0,0,0];r=o=Ql(e.fog,e.reflectionTexture,i,n.floats._ReflectionIntensity??.5,f===void 0||u===void 0?void 0:{texture:u,scale:f.scale,offset:f.offset,intensity:n.floats._DirtIntensity??1},h===void 0||d===void 0?void 0:{texture:d,scale:h.scale,offset:h.offset,intensity:n.floats._BumpIntensity??.1,scrolling:[p[0],p[1]],detailScrolling:[m[0],m[1]],detailScale:n.floats._DetailNormalTextureScale??1,detailIntensity:n.keywords.includes("DETAIL_NORMAL_MAP")?n.floats._DetailNormalIntensity??0:0});break}case"skip":case"unknown":return null}if(o!==void 0){const f=o.uniforms._FogStartOffset,u=o.uniforms._FogScale,h=n.floats._FogStartOffset,d=n.floats._FogScale;f!==void 0&&h!==void 0&&(f.value=h),u!==void 0&&d!==void 0&&(u.value=d)}const t=n.shader==="ChroMapper/Parametric Slice Billboard",s=n.family==="lightTubeTransparent";if(t||s)r.side=nt;else{const f=n.floats._CullMode??n.floats._Cull;f===0&&(r.side=nt),f===1&&(r.side=mn),f===2&&(r.side=uo)}const a=t||n.shader==="ChroMapper/Parametric Box Fake Glow";r.depthWrite=n.family==="depthOnly"||!a&&!s&&n.family!=="stencil"&&n.family!=="rain"&&n.floats._ZWrite!==0;const l=n.floats._StencilComp??8,c=n.floats._StencilPass??0;return(l!==8||c!==0)&&(r.stencilWrite=!0,r.stencilRef=n.floats._StencilRefValue??0,r.stencilFunc=Pp(l),r.stencilZPass=Ap(c)),ac.set(r,n.family),{material:r,shader:o}}function Lp(n){for(let e=n;e!==null;e=e.parent)if(!e.visible)return!1;return!0}function Rp(n){const e=new Set;return n.objects.forEach((i,r)=>{for(const o of i.components?.ParametricBloomFogLightController??[])o.enabled&&(o.BoxLight!==null&&e.add(o.BoxLight.obj),o.SpriteLight!==null&&e.add(o.SpriteLight.obj));for(const o of i.components?.RectangleFakeGlowLightController??[])if(o.enabled)for(const t of Zo(n,o.MpbController))e.add(t);for(const o of i.components?.MaterialLightController??[])o.enabled&&o.Renderer!==null&&e.add(o.Renderer.obj);for(const o of i.components?.MaterialLightsController??[])o.enabled&&e.add(o.MeshRenderer?.obj??r);for(const o of i.components?.SpriteLightController??[])o.enabled&&e.add(o.Renderer?.obj??r);for(const o of i.components?.MaterialPropertyBlockController??[]){if(!o.enabled)continue;const t=o.Renderers.length===0?[r]:o.Renderers.map(s=>s.obj);for(const s of t)e.add(s)}for(const o of i.components?.MaterialPropertyBlockPositionAnimator??[])if(o.enabled)for(const t of Zo(n,o.Controller))e.add(t)}),e}function Op(n){const e=new Map,i=new Map;for(const r of n.objects)for(const o of r.components?.BasicLightEffect??[])if(o.enabled)for(const t of o.lightEntries){const s=at(t),a=i.get(s);if(a===void 0?i.set(s,[o]):a.push(o),t.component!=="ParametricBloomFogLightController")continue;const l=e.get(t.obj);l===void 0?e.set(t.obj,[o]):l.push(o)}return{byObject:e,byTarget:i}}function Dp(n,e){function i(t){if(t.component!=="GenericCallbackEventEffect")return;const s=n.objects[t.obj]?.components?.GenericCallbackEventEffect?.[t.componentIndex??0];return s?.enabled===!0?s.ID:void 0}const r=[],o=[];for(const t of n.objects){for(const s of t.components?.GameObjectIntSwitch??[]){let a=function(f){for(const u of c){const h=u.value===f;for(const d of u.targets)d.visible=h}};const l=i(s.Effect);if(!s.enabled||l===void 0)continue;const c=s.GameObjectsValueContainers.map(f=>({value:f.Value,targets:f.GameObjects.flatMap(u=>e[u.obj]??[])}));a(s.DefaultValue),r.push({eventType:l,defaultValue:s.DefaultValue,apply:a})}for(const s of t.components?.GameObjectSwitch??[]){let a=function(u){for(const h of c)h.visible=!u;for(const h of f)h.visible=u};if(!s.enabled||s.Effect.component!=="ColorBoostEffect"||n.objects[s.Effect.obj]?.components?.ColorBoostEffect?.[s.Effect.componentIndex??0]?.enabled!==!0)continue;const c=s.NormalGameObjects.flatMap(u=>e[u.obj]??[]),f=s.BoostGameObjects.flatMap(u=>e[u.obj]??[]);a(!1),o.push({apply:a})}}return{eventSwitches:r,boostSwitches:o}}function Fp(n,e,i){const r=new it;r.name=n.id;const o=Op(n),t=Rp(n),s=new Map(Object.entries(n.meshes).map(([E,k])=>[E,Pd(k)])),a=new Map;for(const[E,k]of Object.entries(n.materials)){const _=da(k,e);_!==null&&a.set(E,_)}const l=new Set([...a.values()].map(E=>E.material)),c=new Map,f=n.objects.map(()=>[]),u=n.objects.map(E=>{const k=Rd(E);return E.customEnvironmentOnly===!0&&!i&&(k.visible=!1),k}),h=n.objects.flatMap((E,k)=>{const _=E.components?.ChromaIDMarker?.[0],L=u[k];return _?.enabled===!0&&L!==void 0?[{id:_.ChromaID,node:L}]:[]});let d=new Set;const p=new Map;u.forEach((E,k)=>{const _=n.objects[k];if(_===void 0)return;(_.parent<0?r:u[_.parent])?.add(E);const A=_.mesh===void 0?void 0:s.get(_.mesh),W=(_.materials??[]).flatMap(M=>{if(M===null)return[];const R=a.get(M),F=n.materials[M];if(R===void 0||F===void 0)return[];if(!t.has(k))return[R];const D=da(F,e);return D===null?[]:(l.add(D.material),[D])}),B=W.map(M=>M.material);if(f[k]=W.flatMap(M=>M.shader??[]),A===void 0||B.length===0)return;_.materials?.some(M=>M!==null&&n.materials[M]?.shader==="ChroMapper/Water Lit")&&Ad(A);const Z=_.materials?.length===1?_.materials[0]:void 0,K=Z==null?void 0:n.materials[Z],U=B.length===1?B[0]:void 0;if(_.mesh?.startsWith("__chroma_geometry_")===!0&&Z!==null&&Z!==void 0&&K?.shader==="ChroMapper/Lit"&&U!==void 0&&!t.has(k)&&!U.transparent&&U.depthWrite&&!U.stencilWrite&&A.groups.length===0&&_.components?.PlanarReflection===void 0){const M=_.layer,R=`${_.mesh}:${Z}:${String(M)}`,F=p.get(R),D={node:E,rendererEnabled:_.rendererEnabled!==!1};F===void 0?p.set(R,{name:_.name,geometry:A,material:U,layer:M,sources:[D]}):F.sources.push(D);return}const I=new Ue(A,B.length===1?B[0]:B);c.set(E,I),I.name=`${_.name}:renderer`,I.userData.environmentLayer=_.layer,I.visible=_.rendererEnabled!==!1;const w=_.materials?.flatMap(M=>M===null?[]:[n.materials[M]?.family]);w?.includes("clouds")&&(I.frustumCulled=!1),_.materials?.some(M=>M!==null&&n.materials[M]?.shader==="ChroMapper/Parametric Slice Billboard")&&(I.renderOrder=1),w?.includes("stencil")&&(I.renderOrder=-1),_.components?.PlanarReflection!==void 0&&I.layers.set(Bt),E.add(I)});const m=[];for(const E of p.values()){let k=function(_){const L=new Jr(E.geometry,E.material,E.sources.length);return L.name=`${E.name}:instances${_?":mirrored":""}`,L.userData.environmentLayer=E.layer,L.frustumCulled=!1,L.count=0,L.instanceMatrix.setUsage(Zt),_&&(L.scale.x=-1),r.add(L),L};if(E.sources.length===1){for(const _ of E.sources){const L=new Ue(E.geometry,E.material);L.name=`${E.name}:renderer`,L.userData.environmentLayer=E.layer,L.visible=_.rendererEnabled,c.set(_.node,L),_.node.add(L)}continue}m.push({sources:E.sources,regular:k(!1),mirrored:k(!0)})}const v=new be,g=new be,y=new be,S=new be().makeScale(-1,1,1);function b(){if(m.length!==0){v.copy(r.matrixWorld).invert();for(const E of m){let k=0,_=0;for(const L of E.sources)!L.rendererEnabled||!Lp(L.node)||(g.multiplyMatrices(v,L.node.matrixWorld),g.determinant()<0?(y.multiplyMatrices(S,g),E.mirrored.setMatrixAt(_++,y)):E.regular.setMatrixAt(k++,g));E.regular.count=k,E.mirrored.count=_,k>0&&(E.regular.instanceMatrix.needsUpdate=!0),_>0&&(E.mirrored.instanceMatrix.needsUpdate=!0)}}}function T(){for(const E of m)E.regular.dispose(),E.mirrored.dispose()}_p(n.particleSystems??[],e,r,s,l);for(const E of n.objects)for(const k of E.components?.MaterialPropertyBlockFloatSetter??[])if(k.enabled)for(const _ of Zo(n,k.Controller))for(const L of f[_]??[])for(const[A,W]of Object.entries(k.Values)){const B=L.uniforms[A];B===void 0?L.uniforms[A]={value:W}:B.value=W}const C=Dp(n,u);r.updateMatrixWorld(!0);const x=up(n,u);x(),r.updateMatrixWorld(!0),b();for(const E of n.objects)for(const k of E.components?.MaterialPropertyBlockPositionAnimator??[]){let _=function(){A.getWorldPosition(B),W.set(B.x,B.y,B.z,1)};if(!k.enabled)continue;const L=u[k.TargetTransform.obj];if(L===void 0)continue;const A=L,W=new Be,B=new H;_();for(const Z of Zo(n,k.Controller))for(const K of f[Z]??[]){K.uniforms[k.Property]={value:W};const U=K.onBeforeRender.bind(K);K.onBeforeRender=(...I)=>{U(...I),_()}}}function P(E){for(const k of d)k.visible=n.objects[u.indexOf(k)]?.active??!0;d=new Set(h.filter(k=>E.some(_=>k.id.includes(_))).map(k=>k.node));for(const k of d)k.visible=!1}function O(){for(const E of d)E.visible=!1}return{root:r,geometries:s,materialInstances:l,rendererMeshes:c,objectShaderMaterials:f,nodes:u,lightEffectsByObject:o.byObject,lightEffectsByTarget:o.byTarget,eventSwitches:C.eventSwitches,boostSwitches:C.boostSwitches,applyChromaRemoval:P,enforceChromaRemoval:O,applyConstraints:x,syncInstancedMeshes:b,disposeInstancedMeshes:T}}function Ip(n,e,i){const r=i===void 0?{data:n,tracks:new Map,materialTracks:new Map,fogTracks:new Set,tubeTracks:new Map,source:void 0}:Wh(n,i),o=Fp(r.data,e,i!==void 0),t=Wd(r.data,e,o),s=Qd(r.data,o,t),a=Xd(r.data,o.nodes),l=Md(r.data,o,t),c=wd(r.data,o.objectShaderMaterials,o.nodes);return o.root.traverse(f=>{f.updateMatrix(),f.matrixAutoUpdate=!1}),o.root.updateMatrixWorld(!0),{root:o.root,lightSegments:t.lightSegments,materialLights:t.materialLights,backgroundGradient:t.backgroundGradient,rotations:a.rotations,ringGroups:a.ringGroups,glsColorGroups:l,glsRotationGroups:a.glsRotationGroups,glsTranslationGroups:a.glsTranslationGroups,glsFxGroups:c,eventSwitches:o.eventSwitches,boostSwitches:o.boostSwitches,directionalLights:t.directionalLights,bakedReflectionProbe:e.bakedReflectionProbe,data:r.data,chromaEnvironment:r.source,chromaTracks:new Map([...r.tracks].map(([f,u])=>[f,u.flatMap(h=>o.nodes[h]??[])])),chromaMaterialTracks:new Map([...r.materialTracks].map(([f,u])=>[f,[...new Set(r.data.objects.flatMap((h,d)=>h.materials?.some(p=>p!==null&&u.includes(p))?o.objectShaderMaterials[d]??[]:[]))]])),chromaFogTracks:r.fogTracks,chromaTubeTracks:new Map([...r.tubeTracks].map(([f,u])=>[f,u.flatMap(h=>{const d=`${String(h)}:ParametricBloomFogLightController:`,p=[...t.parametricTargets].filter(([y])=>y.startsWith(d)).map(([,y])=>y),m=[...new Set(p.flatMap(y=>y.segments))],v=p.flatMap(y=>y.materialLights),g=[...new Set([...v,...t.materialLights.filter(y=>y.node===o.nodes[h])])];return m.length===0&&g.length===0?[]:[{segments:m,materialLights:g}]})])),applyChromaRemoval:o.applyChromaRemoval,enforceChromaRemoval:o.enforceChromaRemoval,applyConstraints:o.applyConstraints,syncInstancedMeshes:o.syncInstancedMeshes,applyReflections:s.apply,dispose(){s.dispose(),o.disposeInstancedMeshes();for(const f of o.geometries.values())f.dispose();for(const f of o.materialInstances)f.dispose()}}}async function kp(n,e,i,r){const o=await aa(n,i);let t;try{let s=function(){l(),o.dispose(),t?.dispose()};r?.enhancements.some(c=>c.geometry!==void 0)&&(t=await aa(lh,i));const a=Ip(t===void 0?o.data:fh(o.data,t.data),{...e,textures:t===void 0?o.textures:new Map([...o.textures,...t.textures]),reflectionProbe:o.reflectionProbe,bakedReflectionProbe:o.bakedReflectionProbe},r),l=a.dispose;return a.dispose=s,a}catch(s){throw o.dispose(),t?.dispose(),s}}class cc{seedArray=Array.from({length:56},()=>0);inext=0;inextp=21;constructor(e){let r=161803398-(e===-2147483648?2147483647:Math.abs(e));r<0&&(r+=2147483647),this.seedArray[55]=r;let o=1;for(let t=1;t<55;t+=1){const s=21*t%55;this.seedArray[s]=o,o=r-o,o<0&&(o+=2147483647),r=this.seedArray[s]??0}for(let t=1;t<5;t+=1)for(let s=1;s<56;s+=1){let a=(this.seedArray[s]??0)-(this.seedArray[1+(s+30)%55]??0);a<0&&(a+=2147483647),this.seedArray[s]=a}}next(e){this.inext+=1,this.inext>=56&&(this.inext=1),this.inextp+=1,this.inextp>=56&&(this.inextp=1);let i=(this.seedArray[this.inext]??0)-(this.seedArray[this.inextp]??0);return i===2147483647&&(i-=1),i<0&&(i+=2147483647),this.seedArray[this.inext]=i,Math.floor(i/2147483647*e)}}function Np(n,e){const i=new cc(e),r=[];for(const o of n){const t=i.next(r.length+1);t===r.length?r.push(o):(r.push(r[t]??0),r[t]=o)}return r}function gr(n,e,i,r,o,t){let s=Array.from({length:i},(d,p)=>n+p*e);t.random!==0&&(t.random&1)===0&&(s=Np(s,t.seed));const a=t.limit===0||t.limit===1?i:Math.ceil(i*t.limit);let l=Array.from({length:i},(d,p)=>p);if(a>0)if((t.random&2)!==0){const d=new cc(t.seed);let p=0;l=l.map((m,v)=>d.next(i-v)>=a-p?-1:(p+=1,m))}else l=l.map((d,p)=>p<a?d:-1);const c=(t.limitAffectsType&1)!==0,f=(t.limitAffectsType&2)!==0,u=[];let h=0;for(let d=0;d<i;d+=1){const p=l[d]??-1;if(p===-1)continue;const m=s[d]??0;for(let v=0;v<o;v+=1){const g=m*o+v;if(g>=r)break;u.push({element:g,durationOrder:c?h:p,distributionOrder:f?h:p})}h+=1}return{entries:u,count:i,visibleCount:a,limitsDuration:c,limitsDistribution:f}}function Bp(n,e){const i=n.chunks===0?1:Math.ceil(e/n.chunks),r=Math.ceil(e/i);if(n.type===1){const l=Math.ceil(r/n.param0);if(n.reverse===1){const u=r-l*n.param1-1,h=Math.max(0,u-l+1);return gr(u,h>u?1:-1,Math.abs(h-u)+1,e,i,n)}const c=l*n.param1,f=Math.min(r-1,c+l-1);return gr(c,f<c?-1:1,Math.abs(f-c)+1,e,i,n)}if(n.type!==2)return null;const o=r-n.param0;if(o<=0)return null;const t=n.param1===0?1:Math.ceil(o/n.param1),s=n.reverse===1?r-1-n.param0:n.param0,a=n.reverse===1?-n.param1:n.param1;return gr(s,a,t,e,i,n)}function Up(n,e,i,r){const o=n.limitsDuration?n.visibleCount:n.count,t=e===1?Math.max(i-r,0):i;return e===1?t/Math.max(o-1,1):t}function Gp(n,e,i,r,o){const t=n.limitsDistribution?n.visibleCount:n.count,s=Oi(o);return i===1?r*s(e/Math.max(t-1,1)):r*s(e/t)*t}function vn(n,e,i=()=>0){const r=new Map;for(const t of n){const s=new Set;for(const a of t.boxes){if(a.events.length===0)continue;const l=Bp(a.indexFilter,e);if(l===null)continue;const c=a.events[a.events.length-1];if(c===void 0)continue;const f=Up(l,a.beatDistributionType,a.beatDistribution,c.relativeJsonTime),u=i(a);for(const h of l.entries){const d=`${String(u)}:${String(h.element)}`;if(s.has(d))continue;s.add(d);const p={group:t,box:a,filter:l,entry:h,axis:u,localJsonTime:t.jsonTime+f*h.durationOrder},m=r.get(d);m===void 0?r.set(d,[p]):m.push(p)}}}const o=[];for(const t of r.values())t.sort((s,a)=>s.localJsonTime-a.localJsonTime),t.forEach((s,a)=>{const l=t[a+1]?.localJsonTime??Number.POSITIVE_INFINITY,c=s.localJsonTime-s.group.jsonTime,f=Gp(s.filter,s.entry.distributionOrder,s.box.distributionType,s.box.distribution,s.box.easing);s.box.events.forEach((u,h)=>{const d=s.group.jsonTime+u.relativeJsonTime+c;d>l||o.push({element:s.entry.element,axis:s.axis,jsonTime:d,distributionOffset:h===0&&s.box.affectFirst!==1?0:f,event:u,box:s.box})})});return o.sort((t,s)=>t.jsonTime-s.jsonTime)}const ss=n=>Math.min(Math.max(n,0),1),Ut=(n,e,i)=>n+(e-n)*i;function as(n,e){let i=0,r=n.length;for(;i<r;){const o=i+r>>>1;(n[o]?.time??Number.POSITIVE_INFINITY)<=e?i=o+1:r=o}return i-1}function Wp(n,e,i){return[Ut(n[0],e[0],i),Ut(n[1],e[1],i),Ut(n[2],e[2],i)]}function $i(n,e,i){return n===1?i?e.environmentRightBoost:e.environmentRight:n===2?i?e.environmentWhiteBoost:e.environmentWhite:i?e.environmentLeftBoost:e.environmentLeft}function zp(n,e,i){for(let r=e;r>=0;r-=1){const o=n[r];if(o!==void 0&&o.usePrevious!==1)return o}return i}function jp(n,e){return n.map(({jsonTime:i,distributionOffset:r,event:o})=>({time:e(i),color:o.color,brightness:o.brightness+r,easing:o.easing,usePrevious:o.usePrevious,frequency:o.frequency,strobeBrightness:o.strobeBrightness,strobeFade:o.strobeFade}))}function Hp(n,e,i,r){const o={time:Number.NEGATIVE_INFINITY,color:0,brightness:0,easing:-1,usePrevious:0,frequency:0,strobeBrightness:0,strobeFade:0},t=as(n,e);if(t<0)return{color:$i(o.color,i,r),alpha:0};const s=n[t];if(s===void 0)return{color:$i(o.color,i,r),alpha:0};const a=s.usePrevious===1?zp(n,t-1,o):s,l=n[t+1],c=$i(a.color,i,r);if(l===void 0)return{color:c,alpha:a.brightness};const f=l.usePrevious===1?a:l,u=l.time-s.time,h=u<=0?1:ss((e-s.time)/u),d=Oi(f.easing)(h),p=Wp(c,$i(f.color,i,r),d),m=Ut(a.brightness,f.brightness,d),v=f.easing===-1?a.frequency:f.frequency,g=f.easing===-1?a.strobeBrightness:f.strobeBrightness;if(a.frequency<=0&&v<=0)return{color:p,alpha:m};const y=Ut(a.strobeBrightness,g,h),S=h*u,b=u===0?0:S*S/(2*u),T=(-a.frequency*b+a.frequency*S+v*b)%1;if(f.strobeFade===1){const C=Oi(9)(1-Math.abs(T*2-1));return{color:p,alpha:Ut(1,y,C)}}return{color:p,alpha:T>.5?y:m}}function pa(n,e,i=0){const r=as(n,e);if(r<0)return i;const o=n[r];if(o===void 0)return i;let t=o.value;if(o.usePrevious===1){t=i;for(let f=r-1;f>=0;f-=1){const u=n[f];if(u!==void 0&&u.usePrevious!==1){t=u.value;break}}}const s=n[r+1];if(s===void 0)return t;const a=s.usePrevious===1?t:s.value,l=s.time-o.time,c=l<=0?1:ss((e-o.time)/l);return Ut(t,a,Oi(s.easing)(c))}function Vp(n,e){return n.map(({jsonTime:i,distributionOffset:r,event:o})=>({time:e(i),value:o.value+r,easing:o.easing,usePrevious:o.usePrevious}))}const xn=(n,e)=>(n%e+e)%e,Xp=(n,e)=>xn(e-n+180,360)-180;function Yp(n,e,i,r){const o=Xp(n,e);return r===1?n+o+(o<0?360:0)+i*360:r===2?n+o-(o>0?360:0)-i*360:n+o+Math.sign(o)*i*360}function Zp(n,e){return n.map(({jsonTime:i,distributionOffset:r,event:o,box:t})=>{const s=Math.floor(Math.abs(r)/360),a=xn(Math.abs(r),360)*Math.sign(r),l=t.flip===1?-1:1;return{time:e(i),value:(a+o.rotation)*l,easing:o.easing,usePrevious:o.usePrevious,loop:o.loop+s,direction:o.direction}})}function qp(n,e){const i=as(n,e);if(i<0)return 0;const r=n[i];if(r===void 0)return 0;let o=r.value;if(r.usePrevious===1){o=0;for(let f=i-1;f>=0;f-=1){const u=n[f];if(u!==void 0&&u.usePrevious!==1){o=u.value;break}}}const t=xn(o,360),s=n[i+1];if(s===void 0||s.usePrevious===1)return t;const a=Yp(t,xn(s.value,360),s.loop,s.direction),l=s.time-r.time,c=l<=0?1:ss((e-r.time)/l);return Ut(t,a,Oi(s.easing)(c))}function Kp(n,e,i,r,o){return n.map(({jsonTime:t,distributionOffset:s,event:a,box:l})=>{const c=l.flip===1?-1:1,f=o?-1:1,u=a.translation*c*f,h=s*c*f;return{time:e(t),value:Ut(i[0],i[1],(u+1)*.5)+Ut(r[0],r[1],(h+1)*.5),easing:a.easing,usePrevious:a.usePrevious}})}const Jp=.6,Qp=[["height","fogHeight"],["startY","fogStartY"],["attenuation","fogAttenuation"],["offset","fogOffset"]];function $p(){return{position:[],localPosition:[],rotation:[],localRotation:[],scale:[],color:[],fogHeight:[],fogStartY:[],fogAttenuation:[],fogOffset:[]}}function em(){return{fogHeight:[],fogStartY:[],fogAttenuation:[],fogOffset:[],colorAlphaMultiplier:[],bloomFogIntensityMultiplier:[]}}function hi(n,e){let i=0,r=n.length;for(;i<r;){const o=i+r>>>1;(n[o]?.beat??Number.POSITIVE_INFINITY)<=e?i=o+1:r=o}return n[i-1]}function di(n,e,i,r){if(n!==void 0)return i(n.points,Pf(e,n.beat,n.duration,n.repeat,n.easing),r,Af(e,n.beat,n.duration,n.repeat))}function It(n,e,i){return e===void 0?void 0:{beat:n.songBpmTime,duration:n.durationSongBpmTime,repeat:n.repeat,easing:n.easing,order:i,points:e}}function ko(n,e,i){return e===void 0?void 0:{beat:n.songBpmTime,duration:n.durationSongBpmTime,repeat:0,easing:n.easing,order:i,points:e}}function ma(n){return n?.map(e=>({value:Sn(e.value),time:e.time,easing:e.easing,expression:e.expression}))}function st(n,e){e!==void 0&&n.push(e)}function yr(n,e,i){const r=n.get(i);r===void 0?n.set(i,[e]):r.includes(e)||r.push(e)}function va(n){let e=0;for(let i=n.parent;i!==null;i=i.parent)e++;return e}function tm(n,e){return n===void 0?e:e===void 0?n:[n[0]*e[0],n[1]*e[1],n[2]*e[2]]}function ga(n,e){return n===void 0?e:e===void 0?n:[n[0]+e[0],n[1]+e[1],n[2]+e[2]]}function om(n,e){return n===void 0?e:e===void 0?n:[n[0]*e[0],n[1]*e[1],n[2]*e[2],n[3]*e[3]]}function ya(n,e){const i=e?Jp:1;return[n[0]*i,n[1]*i,-n[2]*i]}function im(n,e){return n===void 0?e:e===void 0?n:e.beat>n.beat||e.beat===n.beat&&e.order>n.order?e:n}class nm{tracks=new Map;componentTracks=new Map;worldPosition=new H;parentPosition=new H;parentScale=new H;parentRotation=new ge;targetRotation=new ge;parentMatrix=new be;parentMatrixInverse=new be;noodleBasis=new be().makeScale(1,1,-1);transformTargets=[];materialTargets=[];tubeTargets=[];fogTracks=[];fogTrackEvents=[];baseFog=null;fog=null;v2=!1;rebuild(e){this.clear(),this.baseFog={...e.data.fogParams},this.fog={...this.baseFog};const i=e.chromaEnvironment;if(i===void 0)return;this.v2=i.version===2;for(const[s,a]of i.animations.entries()){const l=ma(a.rotation),c=ma(a.localRotation);for(const f of a.track){let u=this.tracks.get(f);u===void 0&&(u=$p(),this.tracks.set(f,u)),st(u.position,It(a,a.position,s)),st(u.localPosition,It(a,a.localPosition,s)),st(u.rotation,It(a,l,s)),st(u.localRotation,It(a,c,s)),st(u.scale,It(a,a.scale,s)),st(u.color,It(a,a.color,s)),st(u.fogHeight,It(a,a.fogHeight,s)),st(u.fogStartY,It(a,a.fogStartY,s)),st(u.fogAttenuation,It(a,a.fogAttenuation,s)),st(u.fogOffset,It(a,a.fogOffset,s))}}for(const[s,a]of i.componentAnimations.entries())for(const l of a.track){let c=this.componentTracks.get(l);c===void 0&&(c=em(),this.componentTracks.set(l,c));const f=a.components.BloomFogEnvironment;st(c.fogHeight,ko(a,f?.height,s)),st(c.fogStartY,ko(a,f?.startY,s)),st(c.fogAttenuation,ko(a,f?.attenuation,s)),st(c.fogOffset,ko(a,f?.offset,s));const u=a.components.TubeBloomPrePassLight;st(c.colorAlphaMultiplier,ko(a,u?.colorAlphaMultiplier,s)),st(c.bloomFogIntensityMultiplier,ko(a,u?.bloomFogIntensityMultiplier,s))}const r=new Map;for(const[s,a]of e.chromaTracks??[])for(const l of a)yr(r,s,l);this.transformTargets=[...r].map(([s,a])=>({target:s,tracks:a,position:s.position.clone(),rotation:s.quaternion.clone(),scale:s.scale.clone()})),this.transformTargets.sort((s,a)=>va(s.target)-va(a.target));const o=new Map;for(const[s,a]of e.chromaMaterialTracks??[])for(const l of a)yr(o,s,l);this.materialTargets=[...o].map(([s,a])=>({material:s,tracks:a,color:Kt(s,"_Color")?.clone(),alpha:Tn(s,"_ColorAlpha"),multiplier:Tn(s,"_ColorMultiplier")})),this.fogTracks=[...e.chromaFogTracks??[]],this.fogTrackEvents=i.fogTrackEvents.map(s=>({beat:s.songBpmTime,track:s.track}));const t=new Map;for(const[s,a]of e.chromaTubeTracks??[])for(const l of a)yr(t,s,l);this.tubeTargets=[...t].map(([s,a])=>({target:s,tracks:a,segments:s.segments.map(l=>({target:l,intensityMultiplier:l.intensityMultiplier??1})),materialLights:s.materialLights.map(l=>({target:l,intensityMultiplier:l.intensityMultiplier}))}))}clear(){this.tracks.clear(),this.componentTracks.clear(),this.transformTargets=[],this.materialTargets=[],this.tubeTargets=[],this.fogTracks=[],this.fogTrackEvents=[],this.baseFog=null,this.fog=null}update(e,i,r){return this.updateTransforms(e,i,r),this.updateMaterials(e,r),this.updateTubeComponents(e,r),this.updateFog(e,r)}track(e){return this.tracks.get(e)}sampleVector(e,i,r){return di(hi(e,i),i,Lf,r)}sampleRotation(e,i,r){const o=di(hi(e,i),i,Sl,r);return o===void 0?void 0:[-o[0],-o[1],o[2],o[3]]}sampleColor(e,i,r){return di(hi(e,i),i,Rf,r)}sampleNumber(e,i,r){return di(hi(e,i),i,ks,r)}sampleNumberEvent(e,i,r){return di(e,i,ks,r)}updateTransforms(e,i,r){for(const o of this.transformTargets){let t,s,a,l,c;for(const u of o.tracks){const h=this.track(u);h!==void 0&&(t=ga(t,this.sampleVector(h.position,e,r)),s=ga(s,this.sampleVector(h.localPosition,e,r)),a=Is(a,this.sampleRotation(h.rotation,e,r)),l=Is(l,this.sampleRotation(h.localRotation,e,r)),c=tm(c,this.sampleVector(h.scale,e,r)))}const f=o.target;c===void 0?f.scale.copy(o.scale):f.scale.fromArray(c),l!==void 0?f.quaternion.fromArray(l):a!==void 0?(this.targetRotation.fromArray(a),f.parent!==null&&(f.parent.updateWorldMatrix(!0,!1),f.parent.matrixWorld.decompose(this.parentPosition,this.parentRotation,this.parentScale),this.targetRotation.premultiply(this.parentRotation.invert())),f.quaternion.copy(this.targetRotation)):f.quaternion.copy(o.rotation),s!==void 0?f.position.fromArray(ya(s,this.v2)):t!==void 0?(this.worldPosition.fromArray(ya(t,this.v2)),f.parent!==null&&(f.parent.updateWorldMatrix(!0,!1),f.parent.worldToLocal(this.worldPosition)),Number.isFinite(this.worldPosition.x+this.worldPosition.y+this.worldPosition.z)?f.position.copy(this.worldPosition):f.position.copy(o.position)):f.position.copy(o.position),f.updateMatrix(),f.updateWorldMatrix(!1,!0),i!==void 0&&this.applyNoodleParent(o,i,e,r)}}applyNoodleParent(e,i,r,o){const t=Cf(i,e.tracks,r,o);if(t?.matrix===void 0)return;const s=e.target;this.parentMatrix.fromArray(t.matrix).premultiply(this.noodleBasis).multiply(this.noodleBasis),t.worldPositionStays&&(s.updateWorldMatrix(!0,!1),s.matrix.copy(s.matrixWorld)),s.matrix.premultiply(this.parentMatrix),s.parent!==null&&(s.parent.updateWorldMatrix(!0,!1),this.parentMatrixInverse.copy(s.parent.matrixWorld).invert(),s.matrix.premultiply(this.parentMatrixInverse)),s.matrix.decompose(s.position,s.quaternion,s.scale),s.updateMatrix(),s.updateWorldMatrix(!1,!0)}updateMaterials(e,i){for(const r of this.materialTargets){let o;for(const s of r.tracks){const a=this.track(s);a!==void 0&&(o=om(o,this.sampleColor(a.color,e,i)))}const t=Kt(r.material,"_Color");if(o===void 0){t!==void 0&&r.color!==void 0&&t.copy(r.color),r.alpha!==void 0&&r.material.uniforms._ColorAlpha!==void 0&&(r.material.uniforms._ColorAlpha.value=r.alpha),r.multiplier!==void 0&&r.material.uniforms._ColorMultiplier!==void 0&&(r.material.uniforms._ColorMultiplier.value=r.multiplier);continue}t?.setRGB(o[0],o[1],o[2]),r.material.uniforms._ColorAlpha!==void 0&&(r.material.uniforms._ColorAlpha.value=o[3]),r.material.uniforms._ColorMultiplier!==void 0&&(r.material.uniforms._ColorMultiplier.value=o[3])}}componentEvent(e,i,r){let o;for(const t of e){const s=this.componentTracks.get(t)?.[i];s!==void 0&&(o=im(o,hi(s,r)))}return o}updateTubeComponents(e,i){for(const r of this.tubeTargets){const o=this.componentEvent(r.tracks,"colorAlphaMultiplier",e),t=this.componentEvent(r.tracks,"bloomFogIntensityMultiplier",e),s=o===void 0?void 0:this.sampleNumberEvent(o,e,i),a=t===void 0?void 0:this.sampleNumberEvent(t,e,i);for(const l of r.materialLights)l.target.intensityMultiplier=s??l.intensityMultiplier;for(const l of r.segments)l.target.intensityMultiplier=a??l.intensityMultiplier}}fogTrackValue(e,i,r,o){const t=this.track(e)?.[i];return t===void 0?void 0:this.sampleNumber(t,r,o)}updateFog(e,i){if(this.baseFog===null||this.fog===null)return;const r={...this.baseFog};if(this.v2)for(const[o,t]of this.fogTrackEvents.entries()){if(t.beat>e)break;const s=this.fogTrackEvents[o+1],a=s!==void 0&&s.beat<=e?s.beat:e;r.height=this.fogTrackValue(t.track,"fogHeight",a,i)??r.height,r.startY=this.fogTrackValue(t.track,"fogStartY",a,i)??r.startY,r.attenuation=this.fogTrackValue(t.track,"fogAttenuation",a,i)??r.attenuation,r.offset=this.fogTrackValue(t.track,"fogOffset",a,i)??r.offset}else for(const[o,t]of Qp){const s=this.componentEvent(this.fogTracks,t,e);s!==void 0&&(r[o]=this.sampleNumberEvent(s,e,i)??r[o])}if(!(r.height===this.fog.height&&r.startY===this.fog.startY&&r.attenuation===this.fog.attenuation&&r.offset===this.fog.offset))return this.fog=r,r}}const rm=2166136261,sm=16777619;function Gr(n){const e=n.lightIdRemap.map(([i,r])=>`${String(i)}:${String(r)}`).join(",");return`${String(n.eventType)}|${String(n.lightId)}|${e}`}function am(n,e){if(n.length!==e.length)return!1;for(let i=0;i<n.length;i++)if(n[i]!==e[i])return!1;return!0}function lm(n,e,i){if(n.length===0)return e;if(e.length===0)return n;const r=[],o=e.values();let t=o.next();for(const s of n){for(;!t.done&&(i.get(t.value)??Number.POSITIVE_INFINITY)<(i.get(s)??Number.POSITIVE_INFINITY);)r.push(t.value),t=o.next();r.push(s)}for(;!t.done;)r.push(t.value),t=o.next();return r}function cm(n,e){const i=n.objects[e.obj]?.components,r=e.componentIndex??0;if(e.component==="ParametricBloomFogLightController"){const t=i?.ParametricBloomFogLightController?.[r];return t?.enabled!==!0?void 0:t.BoxLight!==null||t.SpriteLight!==null?t.ID:void 0}const o=e.component==="MaterialLightController"?i?.MaterialLightController?.[r]:e.component==="InstancedMaterialLightController"?i?.InstancedMaterialLightController?.[r]:e.component==="SpriteLightController"?i?.SpriteLightController?.[r]:e.component==="RectangleFakeGlowLightController"?i?.RectangleFakeGlowLightController?.[r]:void 0;return o?.enabled===!0?o.ID:void 0}function fm(n,e){const i=new be,r=new be;let o=e,t=n.objects.length;for(;o>=0&&t-- >0;){const s=n.objects[o];if(s===void 0)break;r.compose(new H().fromArray(s.position),new ge().fromArray(s.rotation),new H().fromArray(s.scale)),i.premultiply(r),o=s.parent}return-i.elements[14]}function um(n){const e=new Map;for(const i of n.objects)for(const r of i.components?.BasicLightEffect??[]){if(!r.enabled)continue;const o=[];for(const a of r.lightEntries){const l=cm(n,a);l!==void 0&&o.push({id:l,lane:Math.round(fm(n,a.obj))})}o.sort((a,l)=>a.id-l.id);const t=new Map;for(const a of o){const l=t.get(a.lane);l===void 0?t.set(a.lane,[a.id]):l.push(a.id)}const s=[...t.entries()].sort((a,l)=>a[0]-l[0]).map(([,a])=>a);e.set(r.ID,s)}return e}function hm(n,e,i){i.byType.clear(),i.byBinding.clear(),i.byBindingKey.clear();const r=new Map,o=new Map,t=new Map;function s(v,g,y,S){let b=v.get(g);b===void 0&&(b=new Map,v.set(g,b));const T=b.get(y);T===void 0?b.set(y,new Set([S])):T.add(S)}function a(v){const g=Gr(v);let y=t.get(g);if(y===void 0){y={eventType:v.eventType,targetedEvents:[],hash:rm},t.set(g,y);const S=new Map;for(const[T,C]of v.lightIdRemap)S.has(T)||S.set(T,C);const b=new Set;S.has(v.lightId)||b.add(v.lightId);for(const[T,C]of S)C===v.lightId&&b.add(T);for(const T of b)s(r,v.eventType,T,g);s(o,v.eventType,v.lightId,g)}i.byBinding.set(v,y.targetedEvents)}function l(v,g,y){const S=t.get(v);S!==void 0&&(S.targetedEvents.push(g),S.hash=Math.imul(S.hash^y+1,sm)>>>0)}if(e!==null){for(const v of e.lightSegments)for(const g of v.bindings)a(g);for(const v of e.materialLights){for(const g of v.bindings)a(g);for(const g of v.combined?.inputs??[])for(const y of g.bindings)a(y)}for(const v of e.directionalLights)for(const g of v.inputs)a(g.binding)}const c=new Set,f=n?.lightEvents??[],u=new Map,h=new Map;let d=null;for(const[v,g]of f.entries()){u.set(g,v);const y=i.byType.get(g.type);y===void 0?i.byType.set(g.type,[g]):y.push(g);let S=Of(g),b=r;if(S===void 0){const C=Df(g);if(C===void 0){const P=h.get(g.type);P===void 0?h.set(g.type,[g]):P.push(g);continue}d??=e===null?new Map:um(e.data);const x=d.get(g.type)??[];S=C.flatMap(P=>x[P]??[]),b=o}c.clear();const T=b.get(g.type);if(T!==void 0){for(const C of S)for(const x of T.get(C)??[])c.add(x);for(const C of c)l(C,g,v)}}const p=new Map,m=new Map;for(const[v,g]of t){const y=`${String(g.eventType)}:${String(g.targetedEvents.length)}:${String(g.hash)}`,S=p.get(y);let b=S?.find(C=>am(C,g.targetedEvents));b===void 0&&(b=g.targetedEvents,S===void 0?p.set(y,[b]):S.push(b));let T=m.get(b);T===void 0&&(T=lm(h.get(g.eventType)??[],b,u),m.set(b,T)),i.byBindingKey.set(v,T)}for(const v of i.byBinding.keys()){const g=i.byBindingKey.get(Gr(v));g!==void 0&&i.byBinding.set(v,g)}}const en=(n,e,i)=>n.customData?.[e]??n.customData?.[i];function fc(n,e,i,r,o,t,s){let a=i,l=0,c=0;const f=60/e,u=[];return n.forEach((h,d)=>{a+=(h.songBpmTime-c)*f*l,c=h.songBpmTime;const p=Or.parse(en(h,"_lockPosition","lockRotation"));let m=h.value;if(m>0){const y=en(h,"_preciseSpeed","preciseSpeed"),S=en(h,"_speed","speed");y!==void 0?m=yt.parse(y):S!==void 0&&(m=yt.parse(S))}if(m===0){l=0,p||(a=i),u.push({beat:h.songBpmTime,angle:a,speed:l});return}if(m<0){u.push({beat:h.songBpmTime,angle:a,speed:l});return}const v=en(h,"_direction","direction");let g=v===void 0?s(h,d,"direction")<.5?1:-1:yt.parse(v)===0?1:-1;t&&(g*=-1),p||(a=i+s(h,d,"angle")*r),l=m*o*20*g,u.push({beat:h.songBpmTime,angle:a,speed:l})}),h=>{let d=0,p=u.length;for(;d<p;){const v=d+p>>>1;(u[v]?.beat??1/0)<=h?d=v+1:p=v}const m=u[d-1];return m===void 0?i:m.angle+(h-m.beat)*f*m.speed}}function dm(n,e,i,r){return fc(n,e,0,180,i,!1,r)}function pm(n,e,i,r,o){return fc(n,e,r,360*(i?-1:1),1,i,o)}function mm(n){return(e,i,r)=>{const o=Math.sin(n*12.9898+e.songBpmTime*78.233+i*37.719+(r==="angle"?1:0));return o-Math.floor(o)}}const Mn=.02,At=(n,e,i)=>n.customData?.[e]??n.customData?.[i],uc=n=>Math.max(1,Math.ceil(n/Mn)),vm=(n,e,i)=>n+(e-n)*Math.min(Math.max(i,0),1);function ba(n,e,i,r,o,t,s){if(t<=0)return;let a=0,l=0;for(;a<n.length;){let c=Math.floor(a);for(;c<a+t&&c<n.length;)n[c]?.push({tick:e+l,order:i,target:r+c*o,speed:s}),c++;a+=t,l++}}function hc(n,e,i,r){return e+(n-e)*(1-Math.min(Math.max(Mn*i,0),1))**r}function dc(n,e){const i=[];let r=n,o=n,t=0,s=1,a=0;for(;a<e.length;){const l=e[a]?.tick??1/0,c=l-s;for(c>0&&(r=hc(r,o,t,c));e[a]?.tick===l;)o=e[a]?.target??o,t=e[a]?.speed??t,a++;i.push({tick:l,target:o,speed:t,valueBefore:r}),s=l}return i}function Sa(n,e,i){if(i<=0)return n;let r=0,o=e.length;for(;r<o;){const s=r+o>>>1;(e[s]?.tick??1/0)<=i?r=s+1:o=s}const t=e[r-1];return t===void 0?n:hc(t.valueBefore,t.target,t.speed,i-t.tick+1)}function pc(n,e,i){const r=Math.floor(i/Mn),o=i/Mn-r,t=Sa(n,e,Math.max(r-1,0)),s=Sa(n,e,r);return vm(t,s,o)}function mc(n){for(const e of n)e.sort((i,r)=>i.tick-r.tick||r.order-i.order);return n}function gm(n,e,i,r){const o=r(e,i,"step");return n.stepType===0?o*n.step:n.stepType===1?-n.step+o*n.step*2:n.stepType===2&&o>.5?n.step:0}function _a(n,e,i,r,o){const t=Array.from({length:r.ringCount},()=>[]);ba(t,1,0,r.startupRotationAngle,r.startupRotationStep,r.startupPropagationSpeed,r.startupFlexySpeed);let s=r.startupRotationAngle;n.forEach((c,f)=>{const u=c.customData!==void 0,h=At(c,"_direction","direction"),d=u?h!==void 0&&yt.parse(h)===0:o(c,f,"direction")<.5,p=At(c,"_rotation","rotation"),m=p===void 0?r.rotation:yt.parse(p),v=p===void 0?r.rotationStep:yt.parse(p),g=d?m:-m,y=At(c,"_nameFilter","nameFilter");if(y===void 0||!r.name.includes(Ff.parse(y))){let S=gm(r,c,f,o),b=r.propagationSpeed,T=r.flexySpeed;const C=At(c,"_step","step"),x=At(c,"_prop","prop"),P=At(c,"_speed","speed");C!==void 0&&(S=yt.parse(C)),x!==void 0&&(b=yt.parse(x)),P!==void 0&&(T=yt.parse(P));const O=At(c,"_stepMult","stepMult"),E=At(c,"_propMult","propMult"),k=At(c,"_speedMult","speedMult");O!==void 0&&(S*=yt.parse(O)),E!==void 0&&(b*=yt.parse(E)),k!==void 0&&(T*=yt.parse(k));let _=d?1:-1;const L=Or.parse(c.customData?._counterSpin);r.counterSpin&&L&&(_*=-1);const A=Or.parse(c.customData?._reset);ba(t,uc(c.songBpmTime*60/e),f+1,s+(A?90*(L?1:-1):v*_),A?0:S,A?50:b,A?50:T)}s+=g});const a=mc(t).map((c,f)=>dc(i[f]??0,c)),l=i.map(()=>0);return c=>{const f=c*60/e;for(let u=0;u<a.length;u++)l[u]=pc(i[u]??0,a[u]??[],f);return l}}function Ta(n,e,i){const r=i.initialPositions.map(()=>[]);n.forEach((s,a)=>{const l=At(s,"_step","step"),c=At(s,"_speed","speed"),f=l===void 0?(a+1)%2===0?i.maxPositionStep:i.minPositionStep:yt.parse(l),u=c===void 0?i.moveSpeed:yt.parse(c),h=uc(s.songBpmTime*60/e);r.forEach((d,p)=>{d.push({tick:h,order:a+1,target:(i.positionOffsets[p]??0)+p*f,speed:u})})});const o=mc(r).map((s,a)=>dc(i.initialPositions[a]??0,s)),t=i.initialPositions.map(()=>0);return s=>{const a=s*60/e;for(let l=0;l<o.length;l++)t[l]=pc(i.initialPositions[l]??0,o[l]??[],a);return t}}function ym(n){return(e,i,r)=>{const o=e?.songBpmTime??0,t=Math.sin(n*23.1407+o*91.737+i*17.119+(r==="step"?1:0));return t-Math.floor(t)}}function Rt(n,e,i){let r=n^Math.imul(e+1,-1640531527)^Math.imul(i+1,-2048140359);return r=Math.imul(r^r>>>16,2147612853),r=Math.imul(r^r>>>15,1598334677),((r^r>>>16)>>>0)/4294967296}const xa=new H(0,0,1),pi=Math.PI/180;class bm{rotationQuaternion=new ge;rotationAxis=new H;changedMatrices=new Set;glsRotationRuntime=[];glsTranslationRuntime=[];glsFxRuntime=[];ringRuntime=[];rotationRuntime=[];menuLightshow=null;rebuild(e,i,r,o){this.menuLightshow=null,this.ringRuntime=e.ringGroups.map(t=>{const s={group:t};if(t.rotationConfig!==void 0&&t.rotationEventType!==void 0){const a=ym(t.seed);s.fullRotation=_a(o(t.rotationEventType),i.songBpm,t.initialRotations,t.rotationConfig,a),s.restingRotation=_a([],i.songBpm,t.initialRotations,t.rotationConfig,a)}return t.positionConfig!==void 0&&t.positionEventType!==void 0&&(s.fullPosition=Ta(o(t.positionEventType),i.songBpm,t.positionConfig),s.restingPosition=Ta([],i.songBpm,t.positionConfig)),s}),this.rotationRuntime=e.rotations.map(t=>{const s=mm(t.seed);function a(l){return t.pair===void 0?dm(l,i.songBpm,t.speedMultiplier,s):pm(l,i.songBpm,t.pair.mirrored,t.pair.startAngle,s)}return{rotation:t,full:a(o(t.eventType)),resting:a([])}}),this.glsRotationRuntime=[];for(const t of e.glsRotationGroups){const s=i.lightRotationEventBoxGroups.filter(l=>l.id===t.groupId),a=vn(s,t.count,l=>l.axis);for(const l of t.entries)this.glsRotationRuntime.push({entry:l,tween:Zp(a.filter(c=>c.element===l.id&&c.axis===l.axis),r),initial:l.targets.map(c=>({target:c,value:c.quaternion.clone()}))})}this.glsTranslationRuntime=[];for(const t of e.glsTranslationGroups){const s=i.lightTranslationEventBoxGroups.filter(l=>l.id===t.groupId),a=vn(s,t.count,l=>l.axis);for(const l of t.entries){const c=a.filter(h=>h.element===l.id&&h.axis===l.axis),f=t.translationLimits[l.axis]??[0,0],u=t.distributionLimits[l.axis]??[0,0];this.glsTranslationRuntime.push({entry:l,tween:Kp(c,r,f,u,l.mirrored),initial:l.targets.map(h=>({target:h,value:h.position.clone()}))})}}this.glsFxRuntime=[];for(const t of e.glsFxGroups){const s=i.fxEventBoxGroups.filter(l=>l.id===t.groupId),a=vn(s,t.count);for(const l of t.entries){const c=a.filter(f=>f.element===l.id);this.glsFxRuntime.push({targets:l.targets,tween:Vp(c,r),trigger:t.trigger})}}}rebuildMenuLightshow(e,i){this.clear(),this.menuLightshow={environment:e,seed:i}}clear(){this.menuLightshow=null,this.glsRotationRuntime=[],this.glsTranslationRuntime=[],this.glsFxRuntime=[],this.ringRuntime=[],this.rotationRuntime=[]}update(e,i){if(this.menuLightshow!==null){this.updateMenuLightshow(e,this.menuLightshow.environment,this.menuLightshow.seed);return}const r=this.changedMatrices;r.clear();for(const o of this.rotationRuntime){const t=o.rotation,s=(i?o.full:o.resting)(e);this.rotationAxis.fromArray(t.axis).normalize(),this.rotationQuaternion.setFromAxisAngle(this.rotationAxis,s*pi),t.target.quaternion.fromArray(t.startRotation).multiply(this.rotationQuaternion),r.add(t.target)}for(const o of this.ringRuntime){const t=o.group,s=i?o.fullRotation:o.restingRotation;if(s!==void 0){const l=s(e);t.rings.forEach((c,f)=>{c.target.quaternion.setFromAxisAngle(xa,(l[f]??0)*pi),r.add(c.target)})}const a=i?o.fullPosition:o.restingPosition;if(a!==void 0){const l=a(e);t.rings.forEach((c,f)=>{c.target.position.set(c.positionOffset[0],c.positionOffset[1],-(l[f]??c.positionOffset[2])),r.add(c.target)})}}for(const o of this.glsRotationRuntime){const t=o.tween[0]?.time;if(!i||t===void 0||e<t){for(const{target:l,value:c}of o.initial)l.quaternion.copy(c),r.add(l);continue}let s=qp(o.tween,e);o.entry.mirrored&&(s*=-1);const a=o.entry.axis;this.rotationAxis.set(a===0?-1:0,a===1?-1:0,a===2?1:0),this.rotationQuaternion.setFromAxisAngle(this.rotationAxis,s*pi);for(const l of o.entry.targets)l.quaternion.copy(this.rotationQuaternion),r.add(l)}for(const o of this.glsTranslationRuntime){const t=o.tween[0]?.time;if(!i||t===void 0||e<t){for(const{target:a,value:l}of o.initial)a.position.copy(l),r.add(a);continue}const s=pa(o.tween,e);for(const a of o.entry.targets)o.entry.axis===0?a.position.x=s:o.entry.axis===1?a.position.y=s:a.position.z=-s,r.add(a)}for(const o of this.glsFxRuntime){const t=o.tween[0]?.time;if(!i||o.trigger&&(t===void 0||e<t)){for(const a of o.targets)a.reset();continue}const s=pa(o.tween,e);for(const a of o.targets)a.apply(s)}for(const o of r)o.updateMatrix()}updateMenuLightshow(e,i,r){const o=this.changedMatrices;o.clear();for(const t of i.rotations){const s=Rt(r,t.seed,0)*360,a=t.pair?.mirrored===!0||t.speedMultiplier<0?-1:1,l=Math.min(Math.max(Math.abs(t.speedMultiplier),.75),2)*3;this.rotationAxis.fromArray(t.axis).normalize(),this.rotationQuaternion.setFromAxisAngle(this.rotationAxis,(s+e*l*a)*pi),t.target.quaternion.fromArray(t.startRotation).multiply(this.rotationQuaternion),o.add(t.target)}for(const t of i.ringGroups){const s=Rt(r,t.seed,1)*Math.PI*2,a=(Rt(r,t.seed,2)-.5)*24;t.rings.forEach((l,c)=>{const f=a+Math.sin(e*.12+c*.36+s)*16;l.target.quaternion.setFromAxisAngle(xa,f*pi),o.add(l.target)})}for(const t of o)t.updateMatrix()}}function Sm(n,e){let i=0,r=n.length;for(;i<r;){const o=i+r>>>1;(n[o]?.songBpmTime??Number.POSITIVE_INFINITY)<=e?i=o+1:r=o}return i===0?void 0:n[i-1]?.value}function _m(n){for(let e=n;e!==null;e=e.parent)if(!e.visible)return!1;return!0}function Tm(n){return n<=.0031308?Math.max(n,0)*12.92:1.055*Math.pow(n,1/2.4)-.055}class xm{directionalLights={directions:Array.from({length:5},()=>new H(0,0,1)),colors:Array.from({length:5},()=>new H),positions:Array.from({length:5},()=>new H),radii:Array.from({length:5},()=>100)};songTime={value:0};lightSegments=[];position=new H;directionalLightLinear=new Ke;transforms=new bm;chromaTracks=new nm;glsSegments=new Map;glsMaterialLights=new Map;glsColorSamples=new Map;glsDirectMaterials=new Map;lightEventsByType=new Map;lightEventsByBinding=new Map;lightEventsByBindingKey=new Map;lightTimelinesByBinding=new Map;lightTimelinesByEvents=new Map;basicLightSamples=new Map;resolvedBasicLightSamples=new Map;latestTimelineBeats=new Map;menuLightSamples=new Map;environment=null;data=null;menuLightshowSeed=null;colors=Ci;lightshowMode="full";glsColorRuntime=[];jsonTimeToSongBpmTime=e=>e;basicLightSampleBeat=Number.NaN;basicLightSampleBoosted=!1;basicLightSampleSongBpm=Number.NaN;basicLightSampleMode;basicLightSampleColors;setEnvironment(e){this.environment=e,this.rebuildTimelineCaches(),e.applyChromaRemoval(this.data?.environmentRemoval??[]),this.lightSegments.length=0;for(const i of e.lightSegments)this.lightSegments.push({...i,start:[...i.start],end:[...i.end],color:[...i.color],intensityMultiplier:i.intensityMultiplier??1});this.data===null&&(this.colors=gl(e.data.colorScheme)),this.chromaTracks.rebuild(e),this.rebuildRuntime()}setMap(e,i){this.data=e,this.colors=i,this.environment?.applyChromaRemoval(e.environmentRemoval),this.rebuildTimelineCaches(),this.rebuildRuntime()}setMenuLightshow(e){this.menuLightshowSeed=e,this.basicLightSampleBeat=Number.NaN,this.rebuildRuntime()}setColors(e){this.colors=e,this.basicLightSampleColors=void 0}clearMap(){this.data=null,this.environment?.applyChromaRemoval([])}setLightshowMode(e){this.lightshowMode=e,this.basicLightSampleMode=void 0}update(e,i){const r=this.environment;if(r===null)return;const o=this.data?.songBpm??120;this.songTime.value=qt(e,o);const t=this.data===null&&this.menuLightshowSeed!==null,s=t||Ns(this.lightshowMode),a=t?!1:s?Bs(this.lightEventsByType.get(5)??[],e):!1;this.prepareBasicLightSamples(e,a,o),this.updateBakedReflectionProbe(e,a,o);for(const c of r.boostSwitches)c.apply(a);for(const c of r.eventSwitches){const f=s?Sm(this.lightEventsByType.get(c.eventType)??[],e):void 0;c.apply(f??c.defaultValue)}const l=this.chromaTracks.update(e,this.data?.noodle,i);return this.updateGlsColors(e,a,s),this.updateLightSegments(e,a,o),this.updateMaterialLights(e,a,o),this.transforms.update(e,s),r.enforceChromaRemoval(),l}updateWorldLights(e){this.environment?.applyReflections(this.lightSegments);for(const i of this.lightSegments)this.position.fromArray(i.localStart).applyMatrix4(i.node.matrixWorld),i.start[0]=this.position.x,i.start[1]=this.position.y,i.start[2]=this.position.z,this.position.fromArray(i.localEnd).applyMatrix4(i.node.matrixWorld),i.end[0]=this.position.x,i.end[1]=this.position.y,i.end[2]=this.position.z;this.updateDirectionalLights(e)}rebuildTimelineCaches(){this.lightTimelinesByBinding.clear(),this.lightTimelinesByEvents.clear(),this.basicLightSampleMode=void 0,this.basicLightSamples.clear(),this.resolvedBasicLightSamples.clear(),this.latestTimelineBeats.clear(),this.glsColorSamples.clear(),hm(this.data,this.environment,{byType:this.lightEventsByType,byBinding:this.lightEventsByBinding,byBindingKey:this.lightEventsByBindingKey})}rebuildRuntime(){this.glsColorRuntime=[];const e=this.data,i=this.environment;if(i===null){this.transforms.clear(),this.chromaTracks.clear();return}if(e===null){this.menuLightshowSeed===null?this.transforms.clear():this.transforms.rebuildMenuLightshow(i,this.menuLightshowSeed);return}this.jsonTimeToSongBpmTime=If(e.bpmEvents,e.songBpm);for(const s of i.lightSegments)for(const a of s.bindings)this.timelineForBinding(a);for(const s of i.materialLights)for(const a of s.bindings)this.timelineForBinding(a);for(const s of i.directionalLights)for(const a of s.inputs)this.timelineForBinding(a.binding);const r=new Map,o=new Set(i.glsColorGroups.map(s=>s.groupId));if(o.size>0)for(const s of e.lightColorEventBoxGroups){if(!o.has(s.id))continue;const a=r.get(s.id);a===void 0?r.set(s.id,[s]):a.push(s)}const t=new Map;for(const s of i.glsColorGroups){const a=r.get(s.groupId)??[],l=vn(a,s.count),c=new Map,f=new Set(s.targets.map(u=>u.id));for(const u of l){if(!f.has(u.element))continue;const h=c.get(u.element);h===void 0?c.set(u.element,[u]):h.push(u)}for(const u of s.targets){const h=`${String(s.groupId)}:${String(s.count)}:${String(u.id)}`;let d=t.get(h);d===void 0&&(d={tween:jp(c.get(u.id)??[],this.jsonTimeToSongBpmTime)},t.set(h,d)),this.glsColorRuntime.push({target:u,source:d,initialVisible:u.node?.visible,initialMaterials:u.materials.map(p=>{const m=Kt(p,u.colorProperty),v=Tn(p,`${u.colorProperty}Alpha`),g=ht(p,"_ColorMultiplier");return{material:p,colorProperty:u.colorProperty,color:m?.clone(),alpha:v,multiplier:g}})})}}this.transforms.rebuild(i,e,this.jsonTimeToSongBpmTime,s=>this.lightEventsByType.get(s)??[])}updateGlsColors(e,i,r){if(this.glsSegments.clear(),this.glsMaterialLights.clear(),this.glsDirectMaterials.clear(),this.glsColorSamples.clear(),r){const o=this.glsColorSamples;for(const t of this.glsColorRuntime){let s=o.get(t.source);s===void 0&&(s=Hp(t.source.tween,e,this.colors,i),o.set(t.source,s));const a=t.target.transform(s.color,s.alpha);t.target.node!==void 0&&(t.target.node.visible=t.initialVisible!==!1&&a.visible);for(const l of t.target.segments)this.glsSegments.set(l,a);for(const l of t.target.materialLights)this.glsMaterialLights.set(l,a);for(const l of t.target.materials)this.glsDirectMaterials.set(l,{controlled:a,colorProperty:t.target.colorProperty})}return}for(const o of this.glsColorRuntime){o.target.node!==void 0&&o.initialVisible!==void 0&&(o.target.node.visible=o.initialVisible);for(const t of o.initialMaterials){const s=Kt(t.material,t.colorProperty);s!==void 0&&t.color!==void 0&&s.copy(t.color);const a=t.material.uniforms[`${t.colorProperty}Alpha`];t.alpha!==void 0&&a!==void 0&&(a.value=t.alpha),t.multiplier!==void 0&&t.material.uniforms._ColorMultiplier!==void 0&&(t.material.uniforms._ColorMultiplier.value=t.multiplier)}}}updateLightSegments(e,i,r){const o=this.environment;if(o!==null)for(const[t,s]of o.lightSegments.entries()){const a=this.lightSegments[t];if(a===void 0)continue;a.intensityMultiplier=s.intensityMultiplier;const l=this.glsSegments.get(s);l===void 0?this.sampleLightSegment(s,a,e,i,r):(a.color=l.color,a.alpha=s.alpha*l.alpha),_m(s.node)||(a.alpha=0);const c=s.multiplyLengthByAlpha?He(s.alphaToLengthCurve,a.alpha):1,f=s.multiplyLengthByAlpha?He(s.alphaToBloomLengthCurve,a.alpha):1,u=s.baseLength*f;a.localStart[1]=-u*s.center,a.localEnd[1]=u*(1-s.center),a.endAlpha=(s.endAlpha??1)*c}}updateMaterialLights(e,i,r){const o=this.environment;if(o!==null){for(const t of o.materialLights){const s=this.glsMaterialLights.get(t),a=s??(t.combined===void 0?this.sampleEnvironmentLight(t.bindings,e,i,r):this.sampleCombinedMaterialLight(t.combined,e,i,r));if(a===null)continue;let l;s===void 0?l=t.transform?.(a.color,a.alpha)??{color:a.color,alpha:Math.max(a.alpha*t.intensityMultiplier,t.minimumAlpha??0),visible:!0}:l={...s,alpha:Math.max(s.alpha*t.intensityMultiplier,t.minimumAlpha??0)},t.node!==void 0&&(t.node.visible=t.initialVisible!==!1&&(l.visible??!0)),t.applyAlpha?.(a.rawAlpha??a.alpha);const c=t.colorProperty??"_Color";for(const f of t.materials){const u=Kt(f,c);u!==void 0&&t.combined?.setAlphaOnly!==!0&&this.setControlledMaterialColor(u,l.color);const h=f.uniforms[`${c}Alpha`];h!==void 0&&t.combined?.setColorOnly!==!0&&(h.value=l.alpha);const d=f.uniforms._ColorMultiplier;d!==void 0&&t.combined?.setColorOnly!==!0&&(d.value=l.alpha)}}for(const[t,{controlled:s,colorProperty:a}]of this.glsDirectMaterials){const l=Kt(t,a);l!==void 0&&this.setControlledMaterialColor(l,s.color);const c=t.uniforms[`${a}Alpha`];c!==void 0&&(c.value=s.alpha);const f=t.uniforms._ColorMultiplier;f!==void 0&&(f.value=s.alpha)}}}setControlledMaterialColor(e,i){e.setRGB(...i)}sampleCombinedMaterialLight(e,i,r,o){let t=0,s=0,a=0,l=0;for(const f of e.inputs){const u=this.sampleEnvironmentLight(f.bindings,i,r,o);if(u===null)continue;const h=e.mixType===0?Math.sqrt(Math.max(u.alpha*f.intensity,0)):u.alpha*f.intensity,d=e.multiplyColorByAlpha?h:1,p=u.color[0]*d,m=u.color[1]*d,v=u.color[2]*d;e.mixType===0?(t=Math.max(t,p),s=Math.max(s,m),a=Math.max(a,v),l=Math.max(l,h)):(t+=p,s+=m,a+=v)}if(e.multiplyColorByAlpha){t*=e.intensity,s*=e.intensity,a*=e.intensity,l*=e.intensity;const f=t*.299+s*.587+a*.114;if(f>e.maxIntensity){const u=e.maxIntensity/f;t*=u,s*=u,a*=u,l*=u}}else l=Math.min(l*e.intensity,e.maxIntensity);return{color:e.alphaIntoColor?[l,l,l]:[t,s,a],alpha:l,visible:!0}}sampleLightSegment(e,i,r,o,t){const s=this.sampleEnvironmentLight(e.bindings,r,o,t);i.color=s?.color??e.color,i.alpha=s===null?this.lightshowMode==="none"?0:e.alpha:e.alpha*s.alpha}sampleEnvironmentLight(e,i,r,o){this.prepareBasicLightSamples(i,r,o);let t,s=Number.NEGATIVE_INFINITY;for(const a of e){const l=this.timelineForBinding(a);let c=this.latestTimelineBeats.get(l);c===void 0&&(c=kf(l,i),this.latestTimelineBeats.set(l,c)),(t===void 0||c>=s)&&(t=a,s=c)}return t===void 0?null:this.sampleEnvironmentBinding(t,i,r,o)}sampleEnvironmentBinding(e,i,r,o){if(this.prepareBasicLightSamples(i,r,o),this.data===null&&this.menuLightshowSeed!==null)return this.sampleMenuLight(this.menuLightshowSeed,e.eventType,e.lightId,e.invertColorScheme,i);const t=Us(this.lightshowMode,this.timelineForBinding(e));return this.sampleBasicTimeline(t,i,r,o,e.offIntensity,e.lightOnStart,e.invertColorScheme)}sampleEventType(e,i,r,o){if(this.data===null&&this.menuLightshowSeed!==null)return this.sampleMenuLight(this.menuLightshowSeed,e,0,!1,i);const t=this.lightEventsByType.get(e);if(t===void 0)return null;const s=this.lightTimelinesByEvents.get(t)??Gs(t);this.lightTimelinesByEvents.set(t,s);const a=Us(this.lightshowMode,s);return this.sampleBasicTimeline(a,i,r,o,0,!1,!1)}sampleBasicTimeline(e,i,r,o,t,s,a){let l=this.basicLightSamples.get(e);l===void 0&&(l=new Map,this.basicLightSamples.set(e,l));let c=l.get(t);c===void 0&&(c=[void 0,void 0],l.set(t,c));const f=s?1:0;let u=c[f];u===void 0&&(u=Nf(e,i,{songBpm:o,offIntensity:t,lightOnStart:s,normalAlpha:r?Gf:Wf,highlightAlpha:zf}),c[f]=u);let h=this.resolvedBasicLightSamples.get(u);h===void 0&&(h=[void 0,void 0],this.resolvedBasicLightSamples.set(u,h));const d=a?1:0,p=h[d];if(p!==void 0)return p;const m=Bf(u),v={color:Uf(u,this.colors,a,r),alpha:u.fading===!0?Math.max(m,0):m,rawAlpha:m,stateAlpha:u.fading===!0?Math.max(u.alpha,0):u.alpha,fading:u.fading===!0};return h[d]=v,v}updateBakedReflectionProbe(e,i,r){const o=this.environment?.bakedReflectionProbe;if(o!==void 0){for(const t of o.lightColors)t.set(0,0,0,0);for(const t of o.lights){const s=o.lightColors[t.bakeId-1];if(s===void 0)continue;let a=0,l=0,c=0,f=0;for(const u of t.inputs){const h=this.sampleEventType(u.lightId,e,i,r);if(h===null)continue;const d=h.rawAlpha??h.alpha,p=Tm(d)*u.intensity,m=h.color[0]*p,v=h.color[1]*p,g=h.color[2]*p,y=d*2*u.intensity*u.probeHighlightsIntensityMultiplier;t.mixType===0?(a=Math.max(a,m),l=Math.max(l,v),c=Math.max(c,g),f=Math.max(f,y)):(a+=m,l+=v,c+=g,f+=y)}this.directionalLightLinear.setRGB(a*t.probeIntensity,l*t.probeIntensity,c*t.probeIntensity).convertSRGBToLinear(),s.set(this.directionalLightLinear.r,this.directionalLightLinear.g,this.directionalLightLinear.b,f*t.probeIntensity)}}}prepareBasicLightSamples(e,i,r){this.basicLightSampleBeat===e&&this.basicLightSampleBoosted===i&&this.basicLightSampleSongBpm===r&&this.basicLightSampleMode===this.lightshowMode&&this.basicLightSampleColors===this.colors||(this.basicLightSampleBeat=e,this.basicLightSampleBoosted=i,this.basicLightSampleSongBpm=r,this.basicLightSampleMode=this.lightshowMode,this.basicLightSampleColors=this.colors,this.basicLightSamples.clear(),this.resolvedBasicLightSamples.clear(),this.latestTimelineBeats.clear(),this.menuLightSamples.clear())}sampleMenuLight(e,i,r,o,t){const s=`${i}:${r}:${o?1:0}`,a=this.menuLightSamples.get(s);if(a!==void 0)return a;const l=Math.imul(i+1,4099)^r,c=9+Rt(e,l,0)*5,f=(t+Rt(e,l,1)*c)/c,u=Math.floor(f),h=ut.smoothstep(f-u,.68,1),d=o?this.colors.environmentRight:this.colors.environmentLeft,p=o?this.colors.environmentLeft:this.colors.environmentRight,m=A=>{const W=Rt(e,l,A+2),B=Rt(e,l^1540483477,A)<.5?d:p,Z=W<.22?0:.48+Rt(e,l^668265261,A)*.24;return{color:B,alpha:Z}},v=m(u),g=m(u+1),y=[ut.lerp(v.color[0],g.color[0],h),ut.lerp(v.color[1],g.color[1],h),ut.lerp(v.color[2],g.color[2],h)],S=24,b=(t+Rt(e,1757159915,0)*S)/S,T=Math.floor(b),x=.56+Rt(e,l^374761393,T)*.3,P=ut.smoothstep(b-T,x,x+.14),O=A=>{const W=Rt(e,1757159915,A+1);return W<.2?this.colors.environmentLeft:W<.4?this.colors.environmentRight:y},E=O(T),k=O(T+1),_=ut.lerp(v.alpha,g.alpha,h),L={color:[ut.lerp(E[0],k[0],P),ut.lerp(E[1],k[1],P),ut.lerp(E[2],k[2],P)],alpha:_,stateAlpha:_,fading:h>0&&h<1||P>0&&P<1,visible:!0};return this.menuLightSamples.set(s,L),L}eventsForBinding(e){const i=this.lightEventsByBinding.get(e);if(i!==void 0)return i;const r=this.lightEventsByBindingKey.get(Gr(e))??[];return this.lightEventsByBinding.set(e,r),r}timelineForBinding(e){const i=this.lightTimelinesByBinding.get(e);if(i!==void 0)return i;const r=this.eventsForBinding(e),o=this.lightTimelinesByEvents.get(r)??Gs(r);return this.lightTimelinesByBinding.set(e,o),this.lightTimelinesByEvents.set(r,o),o}updateDirectionalLights(e){const{colors:i,directions:r,positions:o,radii:t}=this.directionalLights;for(const c of i)c.set(0,0,0);const s=this.environment;if(s===null)return;const a=Ns(this.lightshowMode)?Bs(this.lightEventsByType.get(5)??[],e):!1,l=this.data?.songBpm??120;this.prepareBasicLightSamples(e,a,l);for(let c=0;c<Math.min(s.directionalLights.length,5);c++){const f=s.directionalLights[c];if(f===void 0)continue;const u=r[c],h=i[c],d=o[c];if(u===void 0||h===void 0||d===void 0)return;if(f.node.getWorldDirection(u),f.node.getWorldPosition(d),t[c]=f.radius,f.inputs.length===0){h.fromArray(f.color).multiplyScalar(f.intensity),this.directionalLightLinear.setRGB(h.x,h.y,h.z).convertSRGBToLinear(),h.set(this.directionalLightLinear.r,this.directionalLightLinear.g,this.directionalLightLinear.b);continue}for(const p of f.inputs){const m=this.sampleEnvironmentBinding(p.binding,e,a,l),v=m.stateAlpha*p.intensity,g=f.mixType===0?Math.sqrt(Math.max(v,0)):v,y=f.multiplyColorByAlpha?g:1,[S,b,T]=m.color;f.mixType===0?(h.x=Math.max(h.x,S*y),h.y=Math.max(h.y,b*y),h.z=Math.max(h.z,T*y)):(h.x+=S*y,h.y+=b*y,h.z+=T*y)}if(f.multiplyColorByAlpha){h.multiplyScalar(f.controllerIntensity);const p=h.x*.299+h.y*.587+h.z*.114;p>f.maxIntensity&&h.multiplyScalar(f.maxIntensity/p)}h.multiplyScalar(f.intensity),this.directionalLightLinear.setRGB(h.x,h.y,h.z).convertSRGBToLinear(),h.set(this.directionalLightLinear.r,this.directionalLightLinear.g,this.directionalLightLinear.b)}}}const vc=.1,gc=`
float chroReflectionMip(float gloss, float edge, float cameraDistance) {
  float distanceRoughness = clamp(cameraDistance * 0.01 - 0.3, 0.0, 1.0);
  float roughness = max(1.0 - gloss + edge + distanceRoughness, 0.0);
  float roughnessCurve = roughness * (1.7 - 0.7 * roughness);
  return roughnessCurve * 6.0;
}

varying vec3 vReflectionDirection;
varying float vCameraDistance;
#ifdef MIRROR_FACE_CORRECTION
uniform float _MirrorPass;
#endif

vec3 chroReflection(float mip) {
  bool frontFacing = gl_FrontFacing;
  #ifdef MIRROR_FACE_CORRECTION
  frontFacing = frontFacing != (_MirrorPass > 0.5);
  #endif
  float sideGain = frontFacing ? 1.0 : 7.0 / 27.0;
  vec3 direction = frontFacing ? vReflectionDirection : -vReflectionDirection;
  float reflectionMip = max(mip - 1.5, 2.1);
  return textureCubeLodEXT(_ReflectionMap, direction, reflectionMip).rgb * sideGain;
}
`,Mm=`
uniform samplerCube _ReflectionMap;
uniform float _SurfaceGain;
uniform float _EdgeStrength;
uniform float _EdgeBias;
uniform float _EdgeDistanceStart;
uniform float _EdgeDistanceGain;
uniform float _EdgeShadow;
uniform float _SurfaceGloss;
uniform float _CutoutEdgeGlow;
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec4 vScreenPos;
varying float vReflectionEdge;
${pt}
${dt}
${ze}
${gc}
${Wl}
void main() {
  float dissolveEdge = applyNativeCutoutDissolve();
  float mip = chroReflectionMip(_SurfaceGloss, vReflectionEdge, vCameraDistance);
  vec3 reflectionColor = chroReflection(mip);
  vec3 surfaceColor = reflectionColor * baseColor() * _SurfaceGain;
  surfaceColor *= 1.0 - vReflectionEdge * _EdgeShadow;
  vec4 albedo = vec4(mix(surfaceColor, baseColor(), dissolveEdge), 0.0);
  albedo.a = max(albedo.a, dissolveEdge * _CutoutEdgeGlow);

  albedo.rgb = chroToneMap(albedo.rgb);
  albedo = applyChroFog(albedo, vScreenPos, vWorldPos, _FogStartOffset, _FogScale);
  gl_FragColor = albedo;
  #include <colorspace_fragment>
}
`,wm=`
uniform samplerCube _ReflectionMap;
uniform float _SurfaceGain;
uniform float _SurfaceGloss;
uniform float _CutoutEdgeGlow;
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec4 vScreenPos;
${pt}
${dt}
${ze}
${gc}
${Co}
void main() {
  float dissolveEdge = applyNoodleDissolve();
  float mip = chroReflectionMip(_SurfaceGloss, 0.0, vCameraDistance);
  vec3 reflectionColor = chroReflection(mip);
  vec4 color = vec4(
    chroToneMap(mix(reflectionColor * baseColor() * _SurfaceGain, baseColor(), dissolveEdge)),
    dissolveEdge * _CutoutEdgeGlow
  );
  color = applyChroFog(color, vScreenPos, vWorldPos, _FogStartOffset, _FogScale);
  gl_FragColor = color;
  #include <colorspace_fragment>
}
`,Em=`
uniform float _ColorMultiplier;
uniform float _CutoutEdgeGlow;
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec4 vScreenPos;
${pt}
${dt}
${ze}
${Wl}
void main() {
  float dissolveEdge = applyNativeCutoutDissolve();
  vec4 albedo = vec4(baseColor() * _ColorMultiplier, dissolveEdge * _CutoutEdgeGlow);
  albedo.rgb = chroToneMap(albedo.rgb);
  #ifdef DECORATIVE_ARROW
  float fogVisibility = 1.0 - chroFogAmount(vWorldPos, _FogStartOffset, _FogScale);
  float distanceFade = smoothstep(${Qr}, ${vc}, fogVisibility);
  if (distanceFade <= 0.0) discard;
  albedo.a = distanceFade;
  #else
  albedo = applyChroFog(albedo, vScreenPos, vWorldPos, _FogStartOffset, _FogScale);
  #endif
  gl_FragColor = albedo;
  #include <colorspace_fragment>
}
`,yc=`
float chroSegmentDistance(vec2 point, vec2 start, vec2 end) {
  vec2 segment = end - start;
  vec2 offset = point - start;
  float progress = clamp(dot(offset, segment) / dot(segment, segment), 0.0, 1.0);
  return length(offset - segment * progress);
}

float chroArrowFeather(vec2 uv) {
  vec2 point = vec2((uv.x - 0.5) * 2.0, 1.0 - uv.y);
  vec2 a = vec2(-0.535714, 0.334286);
  vec2 b = vec2(0.535714, 0.334286);
  vec2 c = vec2(0.535714, 0.423571);
  vec2 d = vec2(0.0, 0.655714);
  vec2 e = vec2(-0.535714, 0.423571);
  float inside = step(0.0, min(
    min((b.x - a.x) * (point.y - a.y) - (b.y - a.y) * (point.x - a.x),
        (c.x - b.x) * (point.y - b.y) - (c.y - b.y) * (point.x - b.x)),
    min(min((d.x - c.x) * (point.y - c.y) - (d.y - c.y) * (point.x - c.x),
            (e.x - d.x) * (point.y - d.y) - (e.y - d.y) * (point.x - d.x)),
        (a.x - e.x) * (point.y - e.y) - (a.y - e.y) * (point.x - e.x))
  ));
  float distanceToArrow = min(
    min(chroSegmentDistance(point, a, b), chroSegmentDistance(point, b, c)),
    min(min(chroSegmentDistance(point, c, d), chroSegmentDistance(point, d, e)),
        chroSegmentDistance(point, e, a))
  );
  distanceToArrow *= 1.0 - inside;
  float halo = exp(-10.76 * distanceToArrow);
  halo *= 1.0 - smoothstep(0.08, 0.34, distanceToArrow);
  return mix(halo, 1.0, inside);
}

float chroDotFeather(vec2 uv) {
  float radius = length(uv - 0.5);
  float core = 1.0 - smoothstep(0.153, 0.158, radius);
  float halo = 0.46 * exp(-20.25 * max(radius - 0.158, 0.0));
  halo *= 1.0 - smoothstep(0.269, 0.316, radius);
  return max(core, halo);
}
`,bc=`
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec2 vUv;
varying float vDissolve;
${pt}
${ze}
${yc}
void main() {
  float alpha = chroArrowFeather(vUv) * clamp(vDissolve, 0.0, 1.0);
  alpha *= alpha;
  float fogVisibility = 1.0 - chroFogAmount(vWorldPos, _FogStartOffset, _FogScale);
  #ifdef DECORATIVE_ARROW
  alpha *= smoothstep(${Qr}, ${vc}, fogVisibility);
  #endif
  alpha *= fogVisibility;
  gl_FragColor = vec4(clamp(baseColor() * alpha, 0.0, 1.0), clamp(alpha, 0.0, 1.0));
  #include <colorspace_fragment>
}
`,Cm=`
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec2 vUv;
varying vec4 vScreenPos;
varying float vDissolve;
${pt}
${ze}
${yc}
void main() {
  float sourceAlpha = chroDotFeather(vUv) * clamp(vDissolve, 0.0, 1.0);
  float alpha = sourceAlpha * clamp(sourceAlpha, 0.0, 1.0);
  float fog = chroFogAmount(vWorldPos, _FogStartOffset, _FogScale);
  vec3 color = mix(baseColor(), chroFogColor(vScreenPos).rgb, fog);
  float whiteBoost = abs((1.0 - fog) * alpha);
  gl_FragColor = vec4(
    clamp(color * alpha + vec3(whiteBoost), 0.0, 1.0),
    clamp(alpha, 0.0, 1.0)
  );
  #include <colorspace_fragment>
}
`,Sc=`
uniform float _ColorMultiplier;
uniform vec3 _CoreColor;
uniform float _CoreMultiplier;
uniform float _CoreBlend;
uniform float _BloomAlpha;
uniform float _CoreBloomAlpha;
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec2 vUv;
varying vec4 vScreenPos;
${pt}
${dt}
${ze}
${Co}
void main() {
  applyNoodleDissolve();
  vec3 viewDirection = normalize(cameraPosition - vWorldPos);
  float facing = abs(dot(normalize(vWorldNormal), viewDirection));
  float coreBlend = smoothstep(0.15, 0.95, facing) * _CoreBlend;
  vec3 emission = mix(baseColor() * _ColorMultiplier, _CoreColor * _CoreMultiplier, coreBlend);
  float surfaceTexture = 0.9 + 0.1 * sin((vUv.y * 16.0 + vUv.x * 2.0) * 6.2831853);
  emission *= surfaceTexture;
  float bloomAlpha = mix(_BloomAlpha, _CoreBloomAlpha, coreBlend);
  vec4 albedo = vec4(emission, bloomAlpha);
  albedo.rgb = chroToneMap(albedo.rgb);
  albedo = applyChroFog(albedo, vScreenPos, vWorldPos, _FogStartOffset, _FogScale);
  gl_FragColor = albedo;
  #include <colorspace_fragment>
}
`,Pm=`
attribute float trailAlpha;
varying float vTrailAlpha;
void main() {
  vTrailAlpha = trailAlpha;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Am=`
uniform vec3 _Color;
varying float vTrailAlpha;
void main() {
  float alpha = vTrailAlpha * 0.3;
  gl_FragColor = vec4(_Color * (0.45 + vTrailAlpha * 0.55), alpha);
  #include <colorspace_fragment>
}
`,Lm=`
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec4 vScreenPos;
${pt}
${dt}
${ze}
${Co}
void main() {
  applyNoodleDissolve();
  vec3 viewDirection = normalize(cameraPosition - vWorldPos);
  float angle = pow(1.0 - abs(dot(normalize(vWorldNormal), viewDirection)), 2.0);
  vec3 sceneGlow = chroFogColor(vScreenPos).rgb;
  float fog = chroFogAmount(vWorldPos, _FogStartOffset, _FogScale);
  vec3 tint = baseColor();
  vec4 color = vec4(sceneGlow * tint * 2.0 + tint * (0.045 + angle * 0.08), (0.2 + angle * 0.18) * (1.0 - fog));
  color.rgb = chroToneMap(color.rgb);
  gl_FragColor = color;
  #include <colorspace_fragment>
}
`,Rm=`
varying float vColorAlpha;
${pt}
${Co}
void main() {
  applyNoodleDissolve();
  gl_FragColor = vec4(clamp(baseColor(), 0.0, 1.0), vColorAlpha);
  #include <colorspace_fragment>
}
`,Om=`
attribute vec4 tangent;
attribute float instanceColorAlpha;
attribute vec3 instanceUvScale;
varying vec2 vDisplacementUv;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vCutoutPos;
varying float vColorAlpha;
varying vec4 vScreenPos;
#ifdef USE_INSTANCING_COLOR
varying vec3 vInstanceColor;
#endif
varying float vDissolve;
#ifdef USE_INSTANCING
attribute float instanceDissolve;
attribute float instanceCutoutSeed;
#endif
${Pn}
void main() {
  vDissolve = 1.0;
  vec4 localPos = vec4(position, 1.0);
  vec3 localNormal = normal;
  vec3 cutoutPos = position;
  vec3 cutoutOffset = vec3(0.0);
  vec3 uvScale = vec3(1.0);
  vColorAlpha = 1.0;
  #ifdef USE_INSTANCING
  localPos = instanceMatrix * localPos;
  localNormal = mat3(instanceMatrix) * localNormal;
  cutoutPos = mat3(instanceMatrix) * cutoutPos;
  cutoutOffset = noodleCutoutOffset(instanceCutoutSeed);
  vDissolve = instanceDissolve;
  vColorAlpha = instanceColorAlpha;
  uvScale = instanceUvScale;
  #endif
  #ifdef USE_INSTANCING_COLOR
  vInstanceColor = instanceColor;
  #endif

  vec3 uvTangent = tangent.xyz;
  vec3 uvBitangent = cross(uvTangent, normal);
  vDisplacementUv = uv * 0.3 * vec2(dot(uvScale, uvTangent), dot(uvScale, uvBitangent));
  vec4 worldPos = modelMatrix * localPos;
  vWorldPos = worldPos.xyz;
  vWorldNormal = normalize(mat3(modelMatrix) * localNormal);
  vCutoutPos = mat3(modelMatrix) * cutoutPos + cutoutOffset;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
}
`,Dm=`
uniform sampler2D _WallSceneTexture;
uniform sampler2D _WallNoiseTexture;
uniform float _WallDisplacementStrength;
uniform float _WallDisplacementAlpha;
uniform float _WallViewAngleDistortionParam;
uniform float _WallTintToWhite;
uniform float _WallAddColorMultiplier;
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec2 vDisplacementUv;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying float vColorAlpha;
varying vec4 vScreenPos;
${pt}
${ze}
${Co}
vec3 wallSrgbToLinear(vec3 color) {
  vec3 linear = pow((color + 0.055) / 1.055, vec3(2.4));
  vec3 toe = color / 12.92;
  return mix(linear, toe, 1.0 - step(vec3(0.04045), color));
}

vec3 wallLinearToSrgb(vec3 color) {
  vec3 srgb = 1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055;
  vec3 toe = color * 12.92;
  return mix(srgb, toe, 1.0 - step(vec3(0.0031308), color));
}

void main() {
  applyNoodleDissolve();
  vec2 displacement = texture2D(_WallNoiseTexture, vDisplacementUv).rg - vec2(0.5);
  vec3 viewDirection = normalize(cameraPosition - vWorldPos);
  float viewAngle = clamp(
    sqrt(abs(dot(viewDirection, normalize(vWorldNormal)))) * _WallViewAngleDistortionParam,
    0.0,
    1.0
  );
  float tintAlpha = mix(vColorAlpha, 1.0, _WallTintToWhite);
  displacement *= _WallDisplacementStrength * tintAlpha * viewAngle;

  vec2 screenUv = (vScreenPos.xy + displacement) / vScreenPos.w;
  vec4 sceneColor = texture2D(_WallSceneTexture, screenUv);
  vec3 obstacleColor = wallLinearToSrgb(baseColor());
  vec3 tintColor = wallSrgbToLinear(mix(obstacleColor, vec3(1.0), _WallTintToWhite));
  vec3 addColor = wallSrgbToLinear(obstacleColor * _WallAddColorMultiplier);
  vec4 color = sceneColor * vec4(tintColor, tintAlpha) + vec4(addColor, 0.0);
  color.a *= _WallDisplacementAlpha;
  color = applyChroFog(color, vScreenPos, vWorldPos, _FogStartOffset, _FogScale);
  gl_FragColor = clamp(color, 0.0, 1.0);
  #include <colorspace_fragment>
}
`,Fm=`
attribute float instanceColorAlpha;
attribute vec3 instanceObstacleEdgeScale;
varying vec3 vWorldPos;
varying vec3 vCutoutPos;
varying vec3 vLocalNormal;
varying vec3 vInstanceScale;
varying vec3 vObstacleEdgeScale;
varying vec2 vUv;
varying float vColorAlpha;
varying vec4 vScreenPos;
#ifdef USE_INSTANCING_COLOR
varying vec3 vInstanceColor;
#endif
varying float vDissolve;
#ifdef USE_INSTANCING
attribute float instanceDissolve;
attribute float instanceCutoutSeed;
#endif
${Pn}
void main() {
  vDissolve = 1.0;
  vec4 localPos = vec4(position, 1.0);
  vec3 cutoutPos = position;
  vec3 cutoutOffset = vec3(0.0);
  vColorAlpha = 1.0;
  vInstanceScale = vec3(1.0);
  vObstacleEdgeScale = vec3(1.0);
  #ifdef USE_INSTANCING
  vInstanceScale = vec3(
    length(instanceMatrix[0].xyz),
    length(instanceMatrix[1].xyz),
    length(instanceMatrix[2].xyz)
  );
  vObstacleEdgeScale = instanceObstacleEdgeScale;
  localPos = instanceMatrix * localPos;
  cutoutPos = mat3(instanceMatrix) * cutoutPos;
  cutoutOffset = noodleCutoutOffset(instanceCutoutSeed);
  vDissolve = instanceDissolve;
  vColorAlpha = instanceColorAlpha;
  #endif
  #ifdef USE_INSTANCING_COLOR
  vInstanceColor = instanceColor;
  #endif
  vec4 worldPos = modelMatrix * localPos;
  vWorldPos = worldPos.xyz;
  vCutoutPos = mat3(modelMatrix) * cutoutPos + cutoutOffset;
  vLocalNormal = normal;
  vUv = uv;
  gl_Position = projectionMatrix * viewMatrix * worldPos;
  vScreenPos = vec4((gl_Position.xy + gl_Position.ww) * 0.5, gl_Position.zw);
}
`,Im=`
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec3 vLocalNormal;
varying vec3 vInstanceScale;
varying vec3 vObstacleEdgeScale;
varying vec2 vUv;
varying float vColorAlpha;
varying vec4 vScreenPos;
${pt}
${ze}
${Co}
void main() {
  applyNoodleDissolve();
  vec2 uvScalar;
  vec2 edgeScale;
  if (vLocalNormal.x != 0.0) {
    uvScalar = vInstanceScale.zy;
    edgeScale = vObstacleEdgeScale.zy;
  } else if (vLocalNormal.y != 0.0) {
    uvScalar = vInstanceScale.xz;
    edgeScale = vObstacleEdgeScale.xz;
  } else {
    uvScalar = vInstanceScale.xy;
    edgeScale = vObstacleEdgeScale.xy;
  }

  vec2 halfUv = 0.5 - abs(0.5 - vUv);
  if (
    halfUv.x * uvScalar.x >= 0.04 * edgeScale.x &&
    halfUv.y * uvScalar.y >= 0.04 * edgeScale.y
  ) {
    discard;
  }

  vec4 color = mix(
    vec4(baseColor(), vColorAlpha * 2.0),
    chroFogColor(vScreenPos),
    chroFogAmount(vWorldPos, _FogStartOffset, _FogScale)
  );
  // the game writes raw hdr chroma colors into a unorm target, which clamps
  // to [0,1] before bloom; our scene target is half-float, so clamp here
  gl_FragColor = clamp(color, 0.0, 1.0);
  #include <colorspace_fragment>
}
`,km=`
attribute float instanceColorAlpha;
attribute vec3 instanceObstacleEdgeScale;
varying vec3 vWorldPos;
varying vec3 vCutoutPos;
varying vec3 vLocalNormal;
varying vec3 vInstanceScale;
varying vec3 vObstacleEdgeScale;
varying vec2 vUv;
varying float vColorAlpha;
varying float vViewAngle;
#ifdef USE_INSTANCING_COLOR
varying vec3 vInstanceColor;
#endif
varying float vDissolve;
#ifdef USE_INSTANCING
attribute float instanceDissolve;
attribute float instanceCutoutSeed;
#endif
${Pn}
void main() {
  vDissolve = 1.0;
  vColorAlpha = 1.0;
  vec4 localPos = vec4(position, 1.0);
  vec3 localNormal = normal;
  vec3 cutoutPos = position;
  vec3 cutoutOffset = vec3(0.0);
  vInstanceScale = vec3(1.0);
  vObstacleEdgeScale = vec3(1.0);
  #ifdef USE_INSTANCING
  vInstanceScale = vec3(
    length(instanceMatrix[0].xyz),
    length(instanceMatrix[1].xyz),
    length(instanceMatrix[2].xyz)
  );
  vObstacleEdgeScale = instanceObstacleEdgeScale;
  localPos = instanceMatrix * localPos;
  localNormal = mat3(instanceMatrix) * localNormal;
  cutoutPos = mat3(instanceMatrix) * cutoutPos;
  cutoutOffset = noodleCutoutOffset(instanceCutoutSeed);
  vDissolve = instanceDissolve;
  vColorAlpha = instanceColorAlpha;
  #endif
  #ifdef USE_INSTANCING_COLOR
  vInstanceColor = instanceColor;
  #endif
  vec4 worldPos = modelMatrix * localPos;
  vec3 worldNormal = normalize(mat3(modelMatrix) * localNormal);
  vec3 viewDirection = normalize(worldPos.xyz - cameraPosition);
  vWorldPos = worldPos.xyz;
  vCutoutPos = mat3(modelMatrix) * cutoutPos + cutoutOffset;
  vLocalNormal = normal;
  vUv = uv;
  vViewAngle = min(abs(dot(viewDirection, worldNormal)), 1.0);
  gl_Position = projectionMatrix * viewMatrix * worldPos;
}
`,Nm=`
uniform float _FogStartOffset;
uniform float _FogScale;
varying vec3 vWorldPos;
varying vec3 vLocalNormal;
varying vec3 vInstanceScale;
varying vec3 vObstacleEdgeScale;
varying vec2 vUv;
varying float vColorAlpha;
varying float vViewAngle;
${pt}
${ze}
${Co}
void main() {
  applyNoodleDissolve();
  vec2 uvScalar;
  vec2 edgeScale;
  if (vLocalNormal.x != 0.0) {
    uvScalar = vInstanceScale.zy;
    edgeScale = vObstacleEdgeScale.zy;
  } else if (vLocalNormal.y != 0.0) {
    uvScalar = vInstanceScale.xz;
    edgeScale = vObstacleEdgeScale.xz;
  } else {
    uvScalar = vInstanceScale.xy;
    edgeScale = vObstacleEdgeScale.xy;
  }

  // legacy noodle scaled the prefab glow together with the obstacle root
  vec2 halfUv = (0.5 - abs(0.5 - vUv)) * uvScalar;
  vec2 edgeDistance = halfUv / max(edgeScale, vec2(0.0001));
  float distanceToEdge = min(edgeDistance.x, edgeDistance.y);
  float textureAlpha = exp(-pow(distanceToEdge / 0.035, 2.0));
  float signal = clamp(
    vColorAlpha * vViewAngle * (1.0 - chroFogAmount(vWorldPos, _FogStartOffset, _FogScale)),
    0.0,
    1.0
  );
  signal *= textureAlpha * textureAlpha;
  gl_FragColor = clamp(vec4(baseColor() * signal, signal), 0.0, 1.0);
  #include <colorspace_fragment>
}
`,Bm=`
uniform float _PlaybackBeat;
uniform float _StartBeat;
uniform float _EndBeat;
uniform float _JumpBeats;
uniform float _TravelPerBeat;
uniform float _CurveLength;
uniform float _StartFadeDistance;
uniform float _EndFadeDistance;
uniform float _NoiseSeed;
uniform float _ClockSeconds;
uniform float _ArcDrop;
uniform float _ArcRadius;
attribute vec3 arcData;
varying vec2 vUv;
varying vec3 vWorldPos;
varying float vEdge;
varying float vAlpha;
void main() {
  float pointBeat = mix(_StartBeat, _EndBeat, arcData.z);
  float jumpProgress = clamp((_PlaybackBeat - pointBeat + _JumpBeats) / _JumpBeats, 0.0, 1.0);
  vec3 center = position;
  float gravityPhase = 1.0 - jumpProgress;
  center.y -= _ArcDrop * gravityPhase * gravityPhase;
  center.z = -arcData.z * (_EndBeat - _StartBeat) * _TravelPerBeat;

  float aheadDistance = (pointBeat - _PlaybackBeat) * _TravelPerBeat;
  float width = _ArcRadius * clamp(aheadDistance * 4.0 + 2.0, 0.0, 1.0);
  vec3 localPos = center + normal * ((arcData.x - 0.5) * 2.0 * width);
  vec4 worldPos = modelMatrix * vec4(localPos, 1.0);
  vWorldPos = worldPos.xyz;
  gl_Position = projectionMatrix * viewMatrix * worldPos;

  float pointElapsed = _PlaybackBeat - (pointBeat - _JumpBeats);
  float spawnFade = clamp(pointElapsed / (_JumpBeats * 0.5), 0.0, 1.0);
  float cutFade = clamp(aheadDistance * 4.0, 0.0, 1.0);
  float startFade = clamp(arcData.y * _CurveLength / _StartFadeDistance, 0.0, 1.0);
  float endFade = clamp((1.0 - arcData.y) * _CurveLength / _EndFadeDistance, 0.0, 1.0);
  vAlpha = spawnFade * cutFade * startFade * startFade * endFade * endFade;
  vEdge = 1.0 - arcData.x;
  vUv = vec2(arcData.y, 1.0 - arcData.x) * vec2(0.101, 2.985)
    + _ClockSeconds * vec2(1.79, 0.172);
  vUv.x += _NoiseSeed;
}
`,Um=`
uniform vec4 _ArcColor;
uniform sampler2D _ArcNoise;
uniform float _FogStartOffset;
uniform float _FogScale;
uniform float _NoodleDissolve;
varying vec2 vUv;
varying vec3 vWorldPos;
varying float vEdge;
varying float vAlpha;
${ze}
${Gl}
void main() {
  float cutout = 1.0 - clamp(_NoodleDissolve, 0.0, 1.0);
  if (noodleCutoutNoise(vWorldPos * 0.25) < cutout) discard;
  float edge = max(1.0 - 2.0 * abs(vEdge - 0.5), 0.0);
  edge *= mix(0.015, 1.0, edge);
  float fogVisibility = 1.0 - chroFogAmount(vWorldPos, _FogStartOffset, _FogScale);
  float broadNoise = texture2D(_ArcNoise, vUv).r;
  float detailNoise = texture2D(_ArcNoise, vUv.yx + vec2(0.37, -0.21)).g;
  float noise = mix(broadNoise, detailNoise, 0.035);
  float alpha = edge * noise * vAlpha * fogVisibility;
  float boostInput = fogVisibility * fogVisibility * alpha * 0.998;
  float whiteBoost = clamp(boostInput * boostInput, 0.0, 1.0);
  gl_FragColor = vec4(min(_ArcColor.rgb * alpha + vec3(whiteBoost), vec3(1.0)), alpha);
  #include <colorspace_fragment>
}
`;function Gm(n,e,i,r,o,t,s,a,l,c=.95){return new Ee({defines:{INSTANCED_COLOR:"",REFLECTION_RIM:"",REFLECTIVE_SURFACE:""},vertexShader:jt,fragmentShader:Mm,side:uo,uniforms:{...je(n,{startOffset:100,scale:.5,heightEnabled:!0,heightScale:2.5}),_ReflectionMap:{value:i},_Color:{value:e},_SurfaceGain:{value:r},_EdgeStrength:{value:o},_EdgeBias:{value:t},_EdgeDistanceStart:{value:s},_EdgeDistanceGain:{value:a},_EdgeShadow:{value:l},_SurfaceGloss:{value:c},_CutoutNoiseTex:{value:rs()},_CutoutTexScale:{value:.5},_CutoutEdgeGlow:{value:1}}})}function Ma(n,e,i){return Gm(n,we(e),i,.92,2,-.1,5,.03,.2,.95)}function _c(n,e){const i={INSTANCED_COLOR:""};e&&Object.assign(i,{DECORATIVE_ARROW:""});const r=new Ee({defines:i,vertexShader:jt,fragmentShader:Em,transparent:e,depthWrite:!e,uniforms:{...je(n,{startOffset:e?49:100}),_Color:{value:we([1,1,1])},_ColorMultiplier:{value:1.71875},_CutoutNoiseTex:{value:rs()},_CutoutTexScale:{value:2},_CutoutEdgeGlow:{value:1}}});return e&&(r.blending=ot,r.blendEquation=Ae,r.blendSrc=Eo,r.blendDst=Gt,r.blendEquationAlpha=Ae,r.blendSrcAlpha=St,r.blendDstAlpha=Me),r}function wa(n){return _c(n,!1)}function Ea(n){return _c(n,!0)}function ls(n,e,i,r=!1){const o={INSTANCED_COLOR:""};return r&&Object.assign(o,{DECORATIVE_ARROW:""}),new Ee({defines:o,vertexShader:jt,fragmentShader:e,uniforms:{...je(n,{startOffset:49}),_Color:{value:we([1,1,1])}},transparent:!0,depthWrite:!1,side:nt,blending:ot,blendEquation:Ae,blendSrc:Me,blendDst:i?Me:Gt,blendEquationAlpha:Ae,blendSrcAlpha:St,blendDstAlpha:Me})}function Ca(n){return ls(n,bc,!0)}function Pa(n){return ls(n,bc,!0,!0)}function Aa(n){return ls(n,Cm,!1)}function Wm(){const n=new Dt({color:16777215,transparent:!0,opacity:.8,depthWrite:!1});return n.blending=ot,n.blendEquation=Ae,n.blendSrc=Eo,n.blendDst=Gt,n.blendSrcAlpha=St,n.blendDstAlpha=Me,n}function zm(n,e){return new oc({defines:{INSTANCED_COLOR:"",REFLECTIVE_SURFACE:"",MIRROR_FACE_CORRECTION:""},vertexShader:jt,fragmentShader:wm,side:nt,uniforms:{...je(n,{startOffset:100,scale:.5}),_ReflectionMap:{value:e},_MirrorPass:{value:0},_Color:{value:we(yl)},_SurfaceGain:{value:.2},_SurfaceGloss:{value:1},_CutoutSize:{value:1},_CutoutEdgeWidth:{value:.02},_CutoutEdgeGlow:{value:1}}})}function jm(n,e,i){return new Ee({...ns,depthWrite:!1,vertexShader:jt,fragmentShader:Sc,uniforms:{...je(n),_Color:{value:we(e)},_ColorMultiplier:{value:1.4},_CoreColor:{value:we(i)},_CoreMultiplier:{value:1.65},_CoreBlend:{value:.26},_BloomAlpha:{value:.62},_CoreBloomAlpha:{value:.65},_CutoutSize:{value:1},_CutoutEdgeWidth:{value:0}}})}function Hm(n,e){return new Ee({vertexShader:jt,fragmentShader:Sc,uniforms:{...je(n),_Color:{value:we(e)},_ColorMultiplier:{value:2.05},_CoreColor:{value:we(e)},_CoreMultiplier:{value:2.05},_CoreBlend:{value:0},_BloomAlpha:{value:.3},_CoreBloomAlpha:{value:.3},_CutoutSize:{value:1},_CutoutEdgeWidth:{value:0}}})}function Vm(n){return new Ee({vertexShader:Pm,fragmentShader:Am,uniforms:{_Color:{value:we(n)}},transparent:!0,depthWrite:!1,side:nt})}function Xm(n,e){return new Ee({defines:{INSTANCED_COLOR:""},vertexShader:jt,fragmentShader:Lm,uniforms:{...je(n,{startOffset:100}),_Color:{value:we(e)},_CutoutSize:{value:1.2},_CutoutEdgeWidth:{value:0}},depthWrite:!1,side:nt,transparent:!0,blending:ot,blendEquation:Ae,blendSrc:Eo,blendDst:Gt,blendSrcAlpha:St,blendDstAlpha:Me})}function Ym(n){return new Ee({defines:{INSTANCED_COLOR:"",INSTANCED_COLOR_ALPHA:""},vertexShader:jt,fragmentShader:Rm,uniforms:{_Color:{value:we(n)},_CutoutSize:{value:1.2},_CutoutEdgeWidth:{value:0},_CutoutSoftening:{value:0}},depthWrite:!0,side:nt})}function Zm(n,e,i,r){return new Ee({defines:{INSTANCED_COLOR:""},vertexShader:Om,fragmentShader:Dm,uniforms:{...je(n,{startOffset:100,scale:1,heightEnabled:!0,heightScale:2.5}),_Color:{value:we(e)},_WallSceneTexture:i,_WallNoiseTexture:{value:r},_WallDisplacementStrength:{value:.25},_WallDisplacementAlpha:{value:.75},_WallViewAngleDistortionParam:{value:1},_WallTintToWhite:{value:.75},_WallAddColorMultiplier:{value:.1},_CutoutSize:{value:1.2},_CutoutEdgeWidth:{value:0}},depthWrite:!0,side:nt,transparent:!0,blending:ot,blendEquation:Ae,blendSrc:Me,blendDst:St,blendSrcAlpha:Me,blendDstAlpha:St})}function qm(n,e){return new Ee({defines:{INSTANCED_COLOR:""},vertexShader:Fm,fragmentShader:Im,uniforms:{...je(n,{startOffset:7,heightEnabled:!0,heightScale:2.5}),_Color:{value:we(e)},_CutoutSize:{value:1},_CutoutEdgeWidth:{value:0}},depthWrite:!0,side:nt})}function Km(n,e){return new Ee({...ns,defines:{INSTANCED_COLOR:""},vertexShader:km,fragmentShader:Nm,uniforms:{...je(n,{heightEnabled:!0,heightScale:2.5}),_Color:{value:we(e)},_CutoutSize:{value:1},_CutoutEdgeWidth:{value:0}},depthWrite:!1,side:nt})}function Jm(n,e,i,r){const o=we(e);return new Ee({vertexShader:Bm,fragmentShader:Um,uniforms:{...je(n,{startOffset:100,scale:.5}),_ArcColor:{value:new Be(o.r,o.g,o.b,1)},_ArcNoise:{value:i},_PlaybackBeat:{value:r.headBeat-r.hjdBeats},_StartBeat:{value:r.headBeat},_EndBeat:{value:r.tailBeat},_JumpBeats:{value:r.hjdBeats},_TravelPerBeat:{value:r.unitsPerBeat},_CurveLength:{value:r.pathLength},_StartFadeDistance:{value:r.headFadeLength},_EndFadeDistance:{value:r.tailFadeLength},_NoiseSeed:{value:r.random},_ClockSeconds:{value:0},_ArcDrop:{value:r.disableGravity?0:.6},_ArcRadius:{value:.15},_NoodleDissolve:{value:1}},depthWrite:!1,side:nt,...ns})}const Qm=n=>Math.min(Math.max(n,0),1),br=Math.PI/180,$m=new H(1,0,0),e0=new H(0,1,0),t0=new H(0,0,1),Tc=[-.9543871,-.1183784,.2741019],La=[Tc,[.7680854,-.08805521,.6342642],[-.6780157,.306681,-.6680131],[.1255014,.9398643,.3176546],[.365105,-.3664974,-.8557909],[-.8790653,-.06244748,-.4725934],[.01886305,-.8065798,.5908241],[-.1455435,.8901445,.4318099],[.07651193,.9474725,-.3105508],[.1306983,-.2508438,-.9591639]];function o0(n){const e=Math.floor(n);return n-e!==.5?Math.round(n):e%2===0?e:e+1}class i0{up=new H;forward=new H;right=new H;localZ=new H;adjustedHead=new H;correctedPosition=new H;correctedHead=new H;correctionUp=new H;matrix=new be;look=new ge;base=new ge;jump=new ge;inverseCorrection=new ge;identity=new ge;middle=new ge;end=new ge;axisRotation=new ge;setUnityEuler(e,i,r,o){e.setFromAxisAngle(e0,-r*br),e.multiply(this.axisRotation.setFromAxisAngle($m,-i*br)),e.multiply(this.axisRotation.setFromAxisAngle(t0,o*br))}setJumpRotation(e,i,r,o,t,s){if(s<=0){e.identity();return}const a=(i%360+360)%360;this.setUnityEuler(this.end,0,0,a);const l=Math.abs(o0(r*10+o*2+t*2)%La.length),c=La[l]??Tc;if(this.setUnityEuler(this.middle,c[0]*20,c[1]*20,a+c[2]*20),s<.125){e.slerpQuaternions(this.identity,this.middle,Math.sin(s*Math.PI*4));return}e.slerpQuaternions(this.middle,this.end,Math.sin((s-.125)*Math.PI*2))}apply(e,i,r,o,t,s,a,l,c,f,u){if(u>=.5){e.copy(i);return}this.up.set(0,1,0).applyQuaternion(i),this.base.copy(r),this.setJumpRotation(this.jump,o,t,s,l,u),e.copy(this.base).multiply(this.jump);const h=Qm(u*2);if(h===0)return;this.correctedPosition.copy(a).applyQuaternion(f),this.correctedHead.copy(c).applyQuaternion(f);const d=(this.correctedPosition.y-this.correctedHead.y)*.8;if(this.correctionUp.set(0,1,0).applyQuaternion(this.inverseCorrection.copy(f).invert()),this.adjustedHead.copy(c).addScaledVector(this.correctionUp,d),this.forward.copy(a).sub(this.adjustedHead).normalize().applyQuaternion(f).applyQuaternion(this.base),this.localZ.copy(this.forward).negate(),this.right.crossVectors(this.up,this.localZ),this.right.lengthSq()<1e-8)return;this.right.normalize(),this.up.crossVectors(this.localZ,this.right).normalize(),this.look.setFromRotationMatrix(this.matrix.makeBasis(this.right,this.up,this.localZ));const p=e.dot(this.look)<0?-1:1;e.set(e.x+(this.look.x*p-e.x)*h,e.y+(this.look.y*p-e.y)*h,e.z+(this.look.z*p-e.z)*h,e.w+(this.look.w*p-e.w)*h).normalize()}}const Xt=64,n0=.420983,r0=128,Sr=24/255,Ra=64/255,_r=80/255,Oa=new Float64Array([-.094948,-.416227,-.016767,.080421,.027306,.140759,.418996,-.254666,-.32283,.407222,-.425745,-.429403,.163331,-.052848,-.954595,.142924,.0566,-1.141887,-.197931,-.201945,-.27767,.364015,.258786,.530614,.18329,.319186,-.086306,.782567,.150237,-.402833,1.453043,-.223462,.10226,-.205634,-1.089968,-.437742,-.2071,-.154505,-.332715,.160837,-.03282,-.164053,.330094,-.879466,-.182359,-.392997,-.116252,1.388043,-.229996,-.331103,-.015893,-.717335,-.260989,-.409561,.115897,.046967,.518192,-.238859,-.237968,-.064839,-.849993,.011558,.23475,-.327205,.734349,.235613,.018316,-.159608,-.454287,-.291908,.120241,.148597,.547734,.881572,-.423966,-.456368,-.32478,-.504557,-922e-6,.689833,.260593,-.026805,.132473,-.21626,-.229446,-.556091,-.573476,.746355,.048705,-.004097,-.084134,.098951,.403888,-.907745,-.155681,-.097371,-.184135,.416205,-.13203,-.457576,-.071611,-.0213,.271559,.065804,-.078287,.169297,.053847,-.309009,.304355,.33055,-.158641,.071954,-.053512,-.276948,.505206,.073742,-.490714,.00286,-.097228,.118674,.699453,-.505657,-.370094,-.156301,-.133067,.129275,.142485,.30731,.648306,-.233846,.29834,.303555,.067964,.153935,.140548,-.134518,-.608,-.274848,-.105211,-.030413,-.153583,-.237269,-.154128,.046321,-.263045,-.151804,-.504206,.313199,-.220284,-.493306,.941344,-.651747,.173148,-.381371,-.800968,.236623,.652177,.273515,.045569,-.318054,.167317,-.585271,-.484489,-.157197,-.62493,.289949,-.34296,.30108,.164079,-.514987,.492014,.171503,.566257,.364889,.101673,-.315055,-.023074,-.166608,-.427654,.008912,.168064,.092031,-.09389,1.12662,-.827933,.611163,.053983,.382433,.579138,-.09556,.324741,-.380948,-.329654,.091407,-.063816,.429138,.825303,-.132479,.400358,.374006,.270719,-.310478,.105171,.404764,-.504117,.184394,-.0266,-.176055,-.615401,.562318,.683096,-.331779,.19554,-.367466,-.392779,.387197,.255585,-1.002113,.983414,-.387976,.022549,-.540474,-.174839,.233983,-.286131,.338812,.548848,-.532597,.648673,.674351,-1.501274,.359622,.197825,-.269756,-.565013,.502555,.294044,-.561711,.139224,.162706,.15856,.603478,.331734,-.753863,-.575683,.15738,-.308536,.760153,.64491,-.306362,-.322826,1.3728,-.560174,.072197,.254232,.391724,-.399794,-.778925,.031912,-.425186,-.366901,.22104,-.035462,-.534543,1.271917,-.656037,-.209147,.046864,.71057,-.288997,-.901995,.987198,-.17802,-.450018,-.025882,.056211,-.356773,.53878,-.1092,-.403208,.392406,-.516212,-.698063,-.719083,.588762,-.486,-.252664,-.277418,.141693,-.596495,.474491,.039876,-.423147,.227394,.099917,-.114787,-.399593,.123544,-.364341,.308424,-.259306,-.135503,-.550519,.497742,.684161,-.252694,-.240515,.155655,.170678,-.179345,.119512,-.660639,.633672,.077797,-.45103,.263194,.085581,.583568,-.525261,-.225727,.406912,.05837,.076852,-.005213,-.142954,.673128,.129116,-.438401,-.413192,.346667,.083434,-.247328,-.272039,-.050647,.405794,.134392,.299935,-.156199,.388842,-.357778,.413022,.020339,.182789,-.238016,-.027427,.096488,-.328732,.439612,.150036,-.498339,-.620407,.439987,.343322,.278087,-.304172,.089114,-.471604,.732326,.032201,-.525207,-.127767,.458454,.472809,-.369878,.704866,.068021,.26371,.048354,.030162,-.053945,-.599777,.252013,-.40429,.237978,-.229516,.059446,-.179209,.077724,-.057058,.466422,-.001196,-.267061,-.146017,.688735,.258907,-.143274,-.354331,-.359103,.08387,.289318,-.021007,-.604621,.420451,-.179929,.034044,-.537657,-.355119,-.011469,-.060861,-.243011,.027589,.25633,-.327744,-.099563,.442405,.280544,-.373582,-.609427,-.104995,-.104931,.078527,.315503,-.449412,-.464833,.333499,.247552,-.107029,-.418253,.36815,-.648814,-.008782,.433749,.152647,-.313017,-.375912,.595276,-.275115,.31347,-.287573,.634294,.280582,.289845,.154769,-.250367,-.074705,.043042,.169167,-.361018,-.363478,-.050733,.050943,.28938,.257345,.167359,-.275696,-.208025,.273712,.022033,.184372,-.121976,.206174,.067809,.049098,.255568,.089967,-.117996,-.331312,.505172,.138881,-.051976,.102609,.290689,.558921,-.106966,-.022471,.022092,-.091533,.346363,.35799,-.211348,-.184065,.25661,.568339,-.083607,.246869,.158128,-.198215,-.147846,.355887,.652043,-.161197,.396273,.005889,.341186,-.055375,.127214,.040321,-.237259,.176966,.202702,.02948,-.259362,.27766,.318381,.166375,.060943,-.252886,.308967,.089628,.291783,.335186,-.150575,.078474,.234422,.187105,-.035259,-.072618,-.051835,-.051697,-.077205,.078034,.303912,-.4074,-.422256,.072343,-.270952,-.161346,-.494034,-.260794,-.10883,-.02788,-.03481,.043564,.122846,.312006,.228977,-.077654,.114428,.121049,-.130887,-.007867,.198254,-.143773,-.083228,-.757949,.164669,.195096,-.204692,-.230407,.192362,-.472933,.205507,.286832,.113342,-.194987,-.243689,.446245,.358653,.018884,-.059768,.095651,.427379,-.062794,-.07684,-.069407,-.038396,.388641,.187042,-.516745,-.104827,.367767,.00439,.003653,.207945,.190096,-.305494,-.209693,.37875,.717594,.20598,.220936,.320108,.511298,.049994,.722845,.015839,-.068446,.016596,.293341,-.138779,-.234501,-.054747,.1009,.086654,.325447,-.022583,.119328,.189327,.050163,.447932,-.345096,.079824,.402054,.182101,-.161374,.369205,.183193,-.305251,.020788,.219824,.245331,-.411611,-.702123,.25485,-.004726,.102837,-.302896,.277223,.130587,.30959,.310881,-.354452,-.233364,.539195,-.002417,-.485795,.282115,.286329,-.624336,.031833,.079375,.365152,-.198491,-.491627,-.014846,-.205712,-.08458,-.438877,.095296,-.466165,-.040815,.199669,-.291249,-.196839,.228978,.384421,.206728,-.074542,.070624,-.49688,-.279242,-.110291,-.192807,-.130279,-.178505,.240556,-.181216,-.488827,.169252,.317599,-.055375,.095732,.517745,-.377714,.367708,-.350718,.407975,.404395,-.223933,.479043,-.318722,.135126,-.103067,-.302604,-.064842,.010495,-.089898,.800375,-.5431,-.23132,-.106324,34e-6,-.226687,.561202,-.014422,-.147928,-.010709,.279749,-.007397,.10183,.588015,.285198,-.021963,-.242922,.52019,-.20486,.028674,.504141,-.129603,.544159,-.624026,-.50358,-.079226,-.369037,.706971,.073789,-.322815,.863192,-.080276,.117966,-.035837,-.175954,.962902,-.079381,-.048889,-.242644,.136057,-.274946,-.118841,-.86814,.306681,-.278827,-.030651,-.285406,-.498355,.393647,-.311307,.538443,-.279507,.430813,.155024,-.338158,-.648321,.060794,.332148,-.008381,-.037118,.07061,-.21721,-.128103,.904728,-.574728,-.141379,.289156,.464085,.115697,-.469988,-.262274,-.363984,-.330908,.094965,.433965,-.499922,.653545,-.319835,.186035,.530713,-.045309,.004184,-.54681,-.205204,-.626059,-.500194,-.38875,.165428,-.307702,.615246,-.49185,-.387928,-.009466,.172865,.092086,.132195,.272275,-.190238,.012274,-.123188,-.170058,-.0474,.205898,.164886,.470724,.605512,.344666,-.295148,-.063197,.45276,-.600971,-.048674,-.390587,-.367926,-.544752,-.217249,.372847,-.350006,-.139959,.349765,.091838,.17914,-.035244,.024674,.451613,.211948,-.055998,-.391616,.028179,.178703,-.114201,-.46158,-.192964,-.051912,.223992,.428392,-.451026,.407305,.33997,.311971,-.236426,.538084,.317897,-.287775,-.269251,-.441659,.28007,-.269752,.186084,.208951,.046889,-.306293,.768537,-.407897,-.340342,.33636,.056838,.175389,-.18757,-.759532,-.484453,-.038542,-.118745,.129884,-.283322,.85831,.350823,-.150725,.36387,.313635,.31787,.151341,.174492,-1.001477,.094328,-.042707,-.219318,-.177835,-.216256,.784899,-.110808,.890363,.179546,.241171,.246041,-.203955,-.626028,.048505,.71901,-.242856,.028933,-.182532,.098206,.584003,.733532,-.313764,-.43114,.235624,.022074,-.121982,-.385097,-.447029,-.417675,-.077926,-.323377,-.014906,.974836,.306857,-.107818,.078126,.734413,.58233,-.223527,.14953,.202334,-.289543,-.193338,.025695,-606e-6,.586883,.153222,.217366,.064872,.369014,-.48899,.328395,.275583,-1.057715,-.586948,-.065904,.117164,-.015984,-.308089,.114097,-.122421,-.118398,-.037125,.530184,-.29735,.240606,-.442463,.078747,-.619155,-.506133,-.593711,.640972,-.355277,.175604,.366714,.525067,.747035,.339426,.417612,.171499,-.509629,-.39187,.530364,-.141968,.91669,-.078118,-.290128,.130488,-.518536,.42147,.209689,.318089,.114529,.42903,.301467,-.59338,.288767,-.755485,-.18673,.012,-.26299,.212194,.803263,.053933,.938899,-.985188,-.079846,.128326,-.056625,.50688,-.028253,-.603155,-.325538,-.474715,-.234847,.122724,-.125593,-1.204661,-.084238,-.035322,-.310147,-.024295,-.363585,-.15596,.129185,-.838679,.285251,-.177306,-.59309,.195423,.218865,-.355414,.330462,.13839,.429839,.08998,-.432423,-.330402,1.418123,.156809,-.092446,.185541,-.591696,-.178241,-.285512,-.165949,.009394,-.462193,-.327653,.256008,.260132,-.181286,.734026,-.565866,-.247116,.250912,.185804,.090509,-.041784,-.759812,-.6329,.649317,-.194277,-.424308,-.425258,-.159624,.172386,.158856,.613139,.001379,-.300258,-.193754,.511723,-.338303,-.306787,-.067326,.150347,-.353164,.298759,-.108109,-.34341,-.448603,.265363]),s0=Math.PI*(3-Math.sqrt(5)),a0=Array.from(Oa,(n,e)=>{const i=1-2*(e+.5)/Oa.length,r=Math.sqrt(1-i*i),o=e*s0;return{x:Math.cos(o)*r,y:i,z:Math.sin(o)*r,weight:n}});function l0(n,e,i){let r=n0;for(const t of a0){const s=n*t.x+e*t.y+i*t.z;r+=t.weight*Math.exp(r0*(s-1))}if(r=Math.min(Math.max(r,Sr),1),r>=_r)return r;const o=(r-Sr)/(_r-Sr);return Ra+o*(_r-Ra)}function c0(n,e,i){switch(n){case 0:return[1,-i,-e];case 1:return[-1,-i,e];case 2:return[e,1,i];case 3:return[e,-1,-i];case 4:return[e,-i,1];default:return[-e,-i,-1]}}function f0(n){const e=new Uint8Array(Xt*Xt*4);for(let i=0;i<Xt;i++){const r=(i+.5)/Xt*2-1;for(let o=0;o<Xt;o++){const t=(o+.5)/Xt*2-1,s=c0(n,t,r),a=1/Math.hypot(...s),l=Math.round(l0(s[0]*a,s[1]*a,s[2]*a)*255),c=(i*Xt+o)*4;e[c]=l,e[c+1]=l,e[c+2]=l,e[c+3]=255}}return new Jo(e,Xt,Xt,Wt)}function u0(){const n=new jf(Array.from({length:6},(e,i)=>f0(i)));return n.name="NoteReflection",n.colorSpace=Nt,n.generateMipmaps=!0,n.needsUpdate=!0,n}const h0={vertexCount:2352,data:["eNp1nXd8FkX6wFEgEDyxnKDnqcdJFyVAggXZHTakkISENEpQKVJSUGO7cBK9KKionAXkTqmiKKgcKsFEyLE7vD8VsIKKUgQVaTZA","EFFR5Dez7L5+J97+8X5YH7/zzDOzs7Mzz/PMJm/v67GHupU6j388JfbS0Vdj7y2Y7jw7a1zsge6x2MJpjzjqFyMz4eq1sQtbljor","Wg8xeF7vL5exTiOfdP7xbJmhh/KaqatiLx5a4CwsfTiSmfBEQ6xs2hKn66fjDJ7y7N2vxN6+7nmn53MPRTLNDi/XP8eaUW7wlL91","YJn+OZdc+5DBjJ9fH9s8dL6TeeHTvn6l21F1GDazXvJkKNf6lW5H1WHovOvg87HTSp90bnj/Jd8eZYuj/yVPPeTJeHtrYx0/WuTc","/NhTv7M/tJNtJE+GctbV2AYlc9T/M3jqZ9+SJzP/7IWxt8YvddTPqKuxDWFZ8lEM69X9ourz67p75ZjYc+1ecxYkTY8Nb1YR6/bj","KueNOxfre6XvmX+/DLnqC9Uv/j2KYrRerV/XQ57MIwfGx9q3eNk52vxlg6f8jq4PxVZ8v8wZ+eMyg+G16nt9D/z+N2zDtcHAZso1","p3ldLophf5KnnH1LhveIOtkWtpc8mcZjI6y3sZ3hmGlcr/r/TjBm49faPj3O/edPtVk/p/p5fWP1I7G5F41zRnd5LXY86clY09NK","naxp0mAoD/r9d3rIvD1qSey5k0qdqf9pMHjKg3vs6Gciink34eVY2lfjHf0veco5b5ChnDznDcp1fU+renX9ZHhNhvMY5a0KY7Gk","3FLnuulzDYbXZDhnUs53EBn93tHvHPXuMRiWfWOsjF17Tmnsi389afBRDOVsy3d3NsSaJ5bGzntuicFHMZSzb2lD8Rnqfar02M+X","G/ZTTj5ou//TY1SP13kXjTN4MpSTL9v1euxP4++O5e88MdZDeV7bWOyjrHmxx18rdchoG547YYMhR13GMxbcX/8ZIxO8X/x7Tz5K","TzDe/PcEdQbPuz8XBGPbn+vJUw95MsG7I6beHb+zP7QzeE/54548GcpZV2Mb9Pyk5yny1B+8s/xnlTyZYH7z5zjW1diGsCx5Mnqs","6nHaMrHU0M92cTyQj2Io5z3lmCFPJliPxVJnlBv9QNtoA3ky+hlbr36ZX40P13g+w7JqbeivEbt9Os7Qw7Kt/rEkJu9viJ39WJle","S8Z5Mv7cfWKO9p/xUM66yFDOftDviSY9/HeGoTOK4TPL5x39HyMfNW+QYV20gQz1o88Nm8lE9RXL4l4bPBnOgZx72S7KMVdEMpyr","yVOOuSKS0WNH7yH0v+QpxxwVqVPPFXoto+cL2hw8x/4ahwzLUif5KP28R6yLDPuf/D2Hlvq/rV3ia2y/beSphzwZ2kmGZdlv5KPa","Sx7r5rg+rRtr5Xi7/T4I+knLyZOhnPqpkwxtI6/3Knoe1vOxURdsCNvXmCdDOeuiTsz/Bk/9eh2u1+BqLW7wZChnXdRJhveUfCe1","Jy9V8+l1aj6lfrbL6lMW++Xo8thc9aNt5KmHPJnjrUv9uUvPYeRZFxnKed/1XKnnTH9fQB6MXrfd303No2odR57MPw7PjXWaMS52","KM3kyXAPQoZlR40ui40YXea8d+pag2FZb/jQ2JffjovdfpXJsCyvB74/zmk/oMw5o9Naoyzl348qc9QvtqmNyah6HdVmv17ywTrd","f89TruZyR68l9bxOhnLlA3K0L0j7hMgY8hN7iHD/9T8Z5QPS73tHv7/JUx7safx1RBSjxpijxpgTjLE4T7kaq3ov6wRjNc5QD21r","9s242PN6jXaXNOTsBzJ6LaLWJY5el1AnGb3W1P6ZYK7Te/Hf9Q/bSJ4M5YGfJtyfxnWu/Xmps6PZk868n5fqZ9TR7ddtJ0895Mno","9aj24QTz4W/2wE72J3kylLMu6tQy/f+0nDz18z6SJ/N/Zz/vBD+jLupkWfJk2G96HPVT40mPJfYP5WrN4ej1o16DkOE1Gd4vyvV4","UePGHzNkeE2GY4NyPvtk6BsmY5S9c7Fz1QkfmcGTYduVj8x59IS/zGgL5dRJhtdkWBdt4FxH+yknH/okMI/9Tg8Zysnz3cE5ljwZ","5WP0/Yu6LdTDuuh3IU+GPh6DQVm++8jw3UobyLAs7SdPRvlFfZ+ovqfUQzuD59RfG5AnQ9uoh7wxVjE22D+Uhz5yzKu/Y0LfNuZM","nyfDcUue8mB+8NsYpTP0x2MO9+0J/eJ6niHDstRJPlI/fXioiwz7nzyZYG6MYV71ecp5f8nQTvLUH8zJvpw828u+JU8mnLP1j3VR","J8uSJ6NiZ04YO1PrLUevu9T6y9HyeiXT/0/56xxL+eraqz0qeTK8Vus531+o/YYsy2t50mvO0B7TYxmdfD+Af7/0T8dA7lWxEB0H","IU9G+9cD/1Xcrx/sqeMM4w/ko/SEsYJg/xvXqfrO70PdvzomEK77yVMPeTLaFxb6xRrbD99FPK5CngzlrIs6VSzJUf3o96F6ph39","TAexpLhvy5D/9o6NZPA+N3gyeu7Sc0MQS4rzlIdriiCWFGeoR/swQp8Uy1Ku91b63av3V1H16vVM6FukzZQzDmP0A64NBv1DeXy9","fyJu9T+ZcI0WxKTiPBneX/KUa59y6FMgw3aRp/5wPajHDHn2G+8ReTKcT1gXdbIseTJsC/XwWWBZjnnyI/9U6v+e7hqfw/z5TMn8","n5ZrmZ7bAnmcJ6OfmeD5MXjE0Qx5MFf5fBRDnayXZXVMVr+DdVyWegz5b/HBSCaMIej+I09Gv8P1u1zHd8lTHsxzehwYTODD0eMp","nJN+Zw/rJU+GcsQEDZ2Bn0b/G44R/a/BUw95MoEvSI850x7YyTaSJ0M566JOxHkNnvrZt+TJUM66qDOMD+h8EfYP4qGGnDz7h/Iw","DqDmWYPhNRneL8r3Kl/2+HNKnTfHSoPhNRmODcr57JChzaFvXvnpDRsoD338yt9vMEZ7wdAG1qX9GqGPg/op1+8xvZbWzxsZvX/Q","8XcVhzd4xJ0NhnLEl/39nt736f0feTLUz/FAnWTYRvLUz3oZe2V7yZNhXWRYVsdZdD/pmDTyZML1te9HoJw8fQ3BXkrPeQZDPWQo","R66IwVCOvJRwj+iodho8Gb2G1WtZtY41eDLI/zH4KD1vNi2N5bZf67yt/g32rNoX4MeiQv3koxjKgz2uo/e7bAv5KIbyYF/r6D0u","Gcp5Xyhn/hsZXms/o/Y3Kr/j73xM4TUZ+o8o176V0M/S2McUXpPh80V5ELv0fTGNn9NQrn3Zel2if2Qo5/NFhjYzh5A2UM58xSiG","Otm37H/yZGgzcy/1tf432A/G5cz3INNYTyhnP1AelftBhnLq4TxDpnEeSPi+J0+GeRpkWJZzPhmWZX4IeTKUkzdy7/DOMt53EQzl","zM8LcsP8Z5h8FEM54kT+nj5N7en1/p48Ga6ByZPRMv3/tJw8Ga07nHfIk0HszOCj6iKj1x16/aHnZd0ful90nxh6oB8xPoOPsoGM","XmvoNYdeb5ChPMoevX7R6xi9hiEfrOf9PE7ytBNxTIOPagsZ1hv6HvQamGXZdjKU815wXBk8GOYO0X7Wy7LkyTBPiTxt4PNCngzl","rIs6+fySp/4wNt44L4u5iWQoj/vU1RwV+rDxrtfznaPeA/77QMflKFfvCv+doWN9ZPScreduPW9TJ+ry/XfqufGfH/JkQt9n4GP5","LW8DDNpi8mBCn2Xgr4jnbVAny5Inw3yA0M+K3ObQdxQv2zj3IGSQe2rUy7Yw34AMyzJfhTwZymkbdZJpnF8R8swfo37azDFAPoqh","nPeLY4Y8GeZWsR9oG20gT4a5cORZL8c5+SiGzwifLz535MlQPxmWZe4yeTLMAyTDssxLJE+G8wnlrIsMdRo51qOW6Dw8/U7Qc7+/","b1bvgZh65/h7ZfX+0e8uvcfT7zGDj2IoD/IL9F7DXzsHexO9v4jzUQzlOi6pYpJ+bFLneKj8Dj/Pg3wUQzn3WdxPkSfDa57p4FkG","7rnIkzH2WeDJ8FwDeTLcW5FhWZ6VIE+G+wIyLMuzLeTJqDW6vwdQsSKH74vVw4c6Op6s48rqv3XcSL9PdKwpzpMJ4976fpKH792Q","h3krOq5LhvLAP+rHY8lQDr99JAOfvMGTUXOYv+9S85jBUw7fuMFQjzoP4ARnA/R9cXQ8We/XyLCN5FkXeepB7MDcG6PtbKPBg4HP","39irUyfLkieDmEI8P0X7UqmTZcmTYX+yXrZF+1tD3ysZluU9Ik+GctpGnYhxGDaTpx7yZGgP7y99uJT7e8LgPE9jP294TYY+XMrV","mPLPpvRUZ1Qa+3nDazKIwxpyxo7JUK7n+CDvOpJhPJo8r7VfCnv8uB7KEQuOZBDnNXgyer8UxlfIU474ssFQD+1Xaxbfr6P9O8F7","2H8nkyfD6/AdGPia/Gc18EfFcwBCf6Ted5JhWfJkWDY4a6htMhjKg3HiP+tRTDAm/eeYPJngzKLuU4OnPDjb588fUTqDeLr/jNIe","ykN/MMbG75jQr4yx4fNBHNPPwwvuu28TeeohT0bHgYJ8jt/ZFraFbSRPhnLW1diGMKeQPPWzb8mTQc6hUVdjG8Ky5Mmw31QugJ+P","p/Py2D+U8xkhQzmfEd4vXpPhfY/SybK0h88+ecr5LJMJcgN9G5T/ygnyaYw4QpDP5T8b5MngvGqYV3ViTCDuwNiHwYOhHOdkDZ2M","aeKMrcFTT+PYaMgEef3+GCBPOxnTIU+GctZFnXo/pPZF+myvwUfFpMiToZx1UScZ6mRcgwzljFngLLzBRzGUM+7AWCF5MowVNtYZ","lmX8mkxUnJo8GcrZLuokw34mr32WYS4Rz0MZZ5lxxpk8GcrJ80wE5Tx/TYZynpUgw7M8lPOMBu2JKsvzPuTJsE+MNqIszzSRJ8Nz","HGwXz6QHObe+nDwZnjvgeQ2WpZx6yFAP5TynwGsytIfn9MmT4bl+5HUYZflNAOSEGDz1NP4WQcjw/IVhD+qK4snobz4E+T8Gw7K0","kzwZngGhHvI8n0KeDNe6XHPy/UuGa37ylHO92pgJ45UqzujoGKOONYbv1cDPHb8mgzWAIVdnV51/q3Orm9T5VTKUY20Qyai+8+O0","2q9JnnKsPSKZYF3h55eTpxxrKoNhXi5tY3v3lUvnNhVz7qz8nWRYlnXRNu1P0v4G7VtiWeokw7LkyQRrLT9HlPWSYV+F7/zgrGv8","XlCONXMkg7WuwWNNG1/76OeJPPWQJxOuF/TaobFtYVt478iToZx1NbYhzC8nT/0cM+TJ8JwR62psQ1iWPBn2m76/wTkco38oD3K8","fB81GcrDdbGeO3m/eE2G951yzg9kouqlfsq5n6V+7qlZFxmWJR9lJxnOgZQ3PhcQMtxTs162hfeCPBmdBxasf3y7wv1MUL9vi44R","6PiAjhOQJ6NjDcFay2BYNqwzyPeL82Sok/YwT5g5xuTJhG3V7WZdtCHsG91P5MnQBrYL59oMOfKYIhnaQ55y5FVFMkYbwVOOs4QG","g/OP5j4bNrNegweDc4vx/XeQexDXybLkyeBcZNyvEOQVxHWyLHkyUW1kW3A202BYlv1GngzltI066T+hzeSphzwZ9know9Djlm2n","XK/rgliCwfCaDO8F5SpeFY///S9/jJ+bRIZjHnI13/nPUpAjFGeYh0+GZZk/Tz5KPxnOCZQ3Oo8QZ1gX9bNP2M/M2ydDOXWSoc20","gf1DOeeixv0cfJMlfiZVr6sZA2IchzwZFVP0Y0/aPoNBWcZxyJPR+4vgfJDBsCzjR+TJdAj20Go/bbSLtpF5IPiegYpDGDwZlqVt","vKY9wbf4/Hup91Nh7ib5KIb1kmduA21mDgNjr2RYljFWMlFxXuYL8ZwaY7vkyWi9wffIDD6KoZxnshgDJU+GMVMyLEuG/UCe57xY","lnUx3kqGZXnOizwZHW8Pcj8MhmV53oo8GcrJ80xWeHZC+4bIRzGU8zxjsC71/RbkoxjKeZaT50nJk6GdrIvxUMoZ34yKmZJnvbSH","8U0ylFMnGcY0qZNnY8lQJ3m2nW3hOOFZfvrT+J0BfrOF3wHg2Xl+94bn3Hm2nTEL5tIwNkE5+fg5sxO5jnE/DnkyzB0iT4ZrCvJk","mMtEhmWNNQ54MuE7Wa+PybBsuM7S7yiDBxOu74LYR1w/bUYM3uDJsG8ZJyJjyKEzisH5KoOnHHkGkUzwjQ1/rUOe8nCNjDwQn2H8","izppJxmOPca26AsgT4bxKYNB2eDbCf79JMOyjIuRj9JPhm2knH1Fhnn+zNWPOn/HXH3m5LMsGZalTvJkuKdmrju+52DstcmTCX1X","2HOFeea/3bPfvv9g8FF68O0FQye+sRD3S2Gf6/PUQ55M6N/C3i3Mk4/biW9NGDwZylkXdeJ7EQZP/fjGhcGTYQ4S66JOlm2csxQy","PEdA/WwXzzWQj2Io5z3luDJ4MMHeyvfJsB9oG20gT6bROfT480IbKOc5FDI8c8G6aAPXA/S30z9PhnL69Ohvp57G39YIz2+QJ0Mf","OxmW5fcx/odP3mfowyfDsvwuB3kyXJNzrd5oHxHP19X74nD9FOzX/DOO/HY6eTLMH6Ye8sz7JR/1HXjqD/Zx/rnJIDboP9tGvt1v","7+Xfvhnw27cmTvBgghxC/5lk/h91six5MqEPST/zeC8bOlmWPBmsc4x62ZbQj6XnHTIsi3WUwZOhnLZRJ+MRtJk89TT+rlrIMGee","NrBdzIcnH8VQznvKfHjyZDj2yJPhGCZPhmvU0C+ln0OjvVjrkifDa+phX1HO+0uG34rht2X0nio4E2tc0y/B8yk8N0SeDOsyGJTl","uSHyZPhNGzIsy/NK5MnQ78F20Tb2CXkyPG/LM7aNz/OG746ob8WTaXzeOdxb8m+1kI9iKOcZZ559Jk8m/PsMej/E/GTm9zKPlzwZ","ypkvTZ3M2WZuNnnqIU8miIH6Od6N7Q/tZM4weTKUsy7qxDd2DJ76matMngzXe6yLOlmWPBn6FenPpK/SkP/2TEUy9JGSpxzPVCRD","vyt5yvHMRurkuU7aTN5gULbxmdOQYVna0Pg8bMg0/oZ/eBas8ZnT0M9u/O0S5D7x756QMf6GCP4OCHky/PsgZFiWuWf8/jnz9OiL","pu+a5xPpcyZPhv4lngWj3yCMlQU5onFfDf0z9MOQJ0M51hWGTsrpLyJDf4jh/4G/BesZg2FZ+ljIk6Gc9lMnY4u0nzz1kCfD9TDX","J1yTcF1KngzX0gaDslyXkicTxGv8vRkZluV6mHyUfjL8e0zcF5AnE5XPwH0u/RjkyTAPgQzL0o9BngzzHIwcDJSl/4Q8Ge7dGF/j","O+Lw7jvk0XeyLa/qoPv255PkFVvS7byujtvQokqe8mKWXTU5wyNz4MEa+bU31Lo3d8sq8rzec3Kl/MWus1+YPcrQQ3mnI2XyWW+l","/fTkXC+KSbm+RI6cnSBmvisMnvIx9xbKU6yWYsVZeV4Uc6A+Re6qTxET5lxv8JQfv7uXXJ/XQ7RPy/HInJZQJCdXLbd/eWKnN/f9","clkSy7Tb/lBv2Mx6yZOh/I3PCuQ7b2XYHfYmSuq88te28vxXN9j2Tb3k9tm95EIr274/p4ckTz3kyVQttOVbE5qKb0dsNeqlnWwj","eTKUsy7q/OvqNvLi/ySLfRdsMHjqZ9+SJ3PdslXef7K6iOq0LpJ1USfLko9iWO/KOxPkkt1FYvaaLG9+lu3eeeMkceYned6GB4a7","sxaOFYkv7PLGjezv7e1RJQbNyTLki4f09xK3VogNH9VGMv0WZnpT5xaI8Ve2kuTJrN1uuT927SOWFyZJ8pQPGZjt9fmmuzh0MNlg","eL1+Z7038YsiMWnqdsM2XpOhzZSf93aDN3lumRiVkB/JsD/JU86+JcN7RJ1sC9tLngzlrJc6OWbIf6iYO6Zut2/9osi4/nxZmpc3","pc6+Na1CTirP8GLZmXbXLlVyfLLtHemWYf3NqpaXf7jcO7qk0NpSVGkwlN+wpME7aUi+PW9+WSTz1NrmctnqfGvapyUGT3m7hQny","iXOy7f1vFkUyD6xJkW3/VmzNUv+Sp5zzBhnKyXPeoPzFK6+SezsOtPKmNzUYXpPhPEa5u/8W2XJqf2tR2Sxj/uQ1Gc6ZlPMdRGbV","/knyrh+z3M3D0gyGZVPX3SDv2T/YHb+o3uCjGMrZloXfD5M7zh3orh3QQpKPYihn39KGTzJr5OvnF7r7Hhvp0n7KyXfoWCUPb83w","CtpkerVOtVyyz/I6/JRm8GQoJz/lgzvkZeN+cPtclm5RflXRLfLezvO8J/6bYZE5q9ck2evCNHdhcpFN+R9PrZIN9/X3Pr5ooB28","Fzz1XrBTtlTIMU5/r8mOWpvMAzPLZJevG7xxHfMNPkrPe/0L5I9ts70V97US1HlWq7Pl53M3eONv7iU2qrFdb2V703N6CPLUQ55M","8O6Q6t1h1Es7/zyxUHbLbiknTcmzyZOhnHVR53V3tZEvvJssf71qg8FT/5eP9JK7RQ+5YEKOwZMJ5jep5jfBuqiTZcmTOSl1uFx9","eXPZ+WCaRf1sF8cD+SiGct5TjhnyZNzFKbLXGynyiT4TLPYDbaMN5Mn8GkuR6etT5Etf5btkWDZndoJ01BrxqXeFoYdlz/t7ghxw","bYnMGjjaJU/mj5+VyN1rmssLluS7lLMuMpSzH7oNrpSDNiz3Jl1WaOiMYvjM8nkf0a1C/ntznXdPcbpHPmreIGPcF9hAhvrveLhQ","vjkgUR5uleqRJxPVVyzbZEpP+c8be8p3nsgyeDKcAzn3sl2Uf7mwTP7QJN/777MNkQznavKUr9pUJL9Xc8vEaQmRTMuGFDlpS5n7","y0o1t4On/IjdQ64SOd6Rmb0idWZvLZKfPbHNS+q7wrC56dhkmaTWO2+3bSvJsCx1ko/Sz3vEusiw/8lv/0snuWhNB7ln5Xrj3pGn","HvJkaCcZlmW/kY9qL/nO6xLl2bsyvNrvCmTPZTu9ybct99Y2KZJDjtV7scpMz/2wXLZsnumtvi7Lm9qsSo7pm+ttX7XSG3W0zODJ","UE791EmGtpGfffgjb/L0X70zR6caPG14JX2g17tlS/nKa4UGT4Zy1kWdTa561XvmSCd5zYudDZ76M0uzvbf2J8up+7obPBnKWRd1","kuE9Jb92xgB329wEGRtTYuhnu9bWjnFXpPaW1ZelGLaRpx7yZK6ZOcRt9dByb9U1lQbPushQzvt+yULh5h0V3p6Lqw2eTLvph9yz","t2a79TvuMHgyIyvmeOM693V7LrzF4MlwD0KGZb+tL3Y/7DfU2jmwxmBY9qbbtq56bEeu+/6/TIZled0kIc8a9dpwa8ygGqMs5U+t","LbHySkrcTRkmc169ZfdokW5lplUb/I7DGfZbfTPsWPcqQ55xb5o1t22anXNkksFQftKcUdYnyhf0tfIJkaG88/259jevrrTdw2WR","TLvn+lvZUxJE67+XGDzl+7Oy7bUNLURSG/VcRzDbasdYC1J7ixlqjJGn/PpuGfaeX5LFfRcnGQz10LZjuzLdjB519oI/Vxpy9gOZ","K/uOdjveliDqRqs9I3SSyVi03f5pXK19aGOxbPthnX36mjT7/uQKo3/YRvLGvYB8flGi2HlBqp05tdDQuffO9mKRfNO+ZncXeUy1","u6pLhv2Majt56iFPpn2TD+2f72wiis5PNXjayf4kT4Zy1kWdVyass6+TncW5UzoaPPXzPpIn02v6GSKh7nQx9dg5Rl3UybLkybDf","No3sLX75zwjr5nYpRv9QfuSKFmLwH4ot54dhBsNrMrxflM/+4mW76fRc69oOlQbDazIcG5Tz2SdzdEOB/djNaW512iSDYdmnv91l","9/+sxJ3x6FiDJ8O2P5SfJJ5+zHLTL+5jtIVy6iTDazKsizZwrqP9lJNv936G3XNjhveZ8v8MKkqzntlQ4D3eSA8Zysnz3cE5ljyZ","rz4psbp+s8urnTnW0MO6ZqT2t5fvrfW2b6oweDI196fbG39KlPfsLTAYluW7jwzfrbSBDMvSfvJkLtpuWf9SPtE2F/Ux9NDOklMz","7E3HkuWyS5IMngxtox7yvI8cG+wfyjdNr7cPTMnx7qotj2SqKluKidl53g3XqucXPBmOW/KUHzyeLLqfnuEVd0uK1HlIzW29F233","flTzG+1pfVcT8ccmH3o5ap4hw7LUST5KP8cD6yLD/idP5tPVb9rene1lZzVnkqec95cM7SRP/VPUvHtmwjrvdDX3kmd72bfkyXRU","c3aH6WfIiWreZl3UybLkyXR9sEYkLR1m9bW2rLo6u0Z0nzbUWlc51FIxNXGWiqflyqHWB5k1YsXske6CLoUueTK8nr73DrHh5INu","u4PZRller2tdLWamOV6Tewvc9h2rxDlNM70B+zK8X8+vFk2/7OsOutrxyJN5ZFOReHnICi955jbvxfYVojg93evXrN4jM2RRmRhf","2+C9UTvI4KP0fP1godh+wPH+nat8yNB554quYluPt7wRky+U/744STzYJcM7Rd178tRDnkyzU1JEl75t5R+uf8eol3aeubVIXPtg","giw9OdsjT4Zy1kWdQzf0sRYOmySrt+V73aYNtx58aqy8vHaX9/Nt/e0lyk/d7smBpnxijv3hS+XSm1cfyahxZ+txN7GypSRP5v3H","LCtPzQ1T8pMkecrbnp5h56lx/dPxZIOhnn5/KHZt9T78+YoWRlnKf/zPCPdG9e7dOrK3wVDnt+s22zs3O9Jd+KvRRsrtZTvtNWo/","epvalxr9gGuDQf9QvrTrK/aTb5TL5i9lRjLb3k0Um78tkHveyDB4Mry/5Cm/YEgPcezmXvL2j3MMhu0iT/2Jau2n54O7ZWejf9hv","vEfkyXy284/ivNlt5diPTzfGNnWyLHkybAv18FlgWY558qVfFLuT1W9ZXo046bIhVpfLhrh3DawR474otj7aW2xpeUsl+4f6f1pO","nkze04737Na+1vRzqw1+wFf9vbpTs2yrZ5UhX7qnr9us1SB7QOWkSIY6WS/LLlUx2SYv7LLnqrgs9VD+5sQc75t59fa7L5VHMh9O","G+Q9+FxLcahLocGTOb7NcpcWJonjKr5LnvJ+Kga64kCymLq/u8Fcq95jwwfV2s9uKRanfFTn9dyVZr/es8Kwh/WSJ0P5BKHyA9ql","2lfPLDR0fqp8NdtXrrcXr+kgHlb+vNzbsuxX7ulp8NRDnsz5n7/nJV/ZRJzdob/B0062kTwZylkXdXZ6fbU3dGMX8djDnQye+tm3","5MlQzrqos7uKDyxS8YHY4hSjf85cVCh7POPYFyQlGnLy7B/Ktyjf8bFzB1qPfz/MYHhNhveL8k1Z9d4fDg629m+5wWB4TYZjg3I+","O2Ro8/T0y+RXp2e5m3J6GTZQvvX95vJY60J3/KYSg+E1GdrAus4oKZHXrUiz3lqeYOin/KBax6d/UeKe8vUum8xrav+g9hLWjgeX","2+T/qfzY29Xe9qRf62wylA/uVCWfPZhhJ+zNsKcpP9riS9KseYW2wZOhfo4H6iTDNpKnftbL2CvbS54M6yLDsrcU95KnOJeJHnen","W3Z6D3nvg73EqQU59k2HWsrj2wpE7ZACm3Ly8z8ukj2nJohRF2Xbp3+9y/t25liR8UWJRYZ6yFC+56F6b0dduajJzzEYykvHZnjH","L64SKd9m2Me7F3r77Eniv33TLfJkFvcd4V6i1tafePkWeTLJXfq6m2+eJL5en2fwUXq6FBW6dYU14rpnCt0NByyvU2q1ONQ/zaV+","8lEM5T8+uNyT11QKvd9lW8hHMZTvWJ4gm5WUiAkr0gyGct4Xypn/RobX/VX888K/J4j7B4427juvyax7oUz+ZVKDPW/3IEP+nPJL","tlH+yTN2ZxoMr8nw+aI8v0+1rJxq22+dl24wlA/NqZF//2KIVaN+ZCjn80WGNjOHkDZQznzFKIY62bfsf/JkaDNzLzf9s0bObfHx","qitnDzPkzPcgQz2Usx8oj8r9IEM59XCeIcNYP3M5yJNhngYZluWcT4ZlmR9Cngzl5A89niDnP5/lHVZ7Pr6zyEcxlC9a1ODN+2yQ","d6HaX+55dbnXNinfzSypNPgohvK8QxnesTMzvbM6VIlVg/t5/3d2rrtX7ePJk+EamDyZiam57jlj+3lnKTl5Mpcq3btVHVo/eTJ3","lqd79+2t867qXGHwUXWRmT3Wsq6od7yBf6oWzY8XuEc+aC7XfFRiMNR/Y1qad/RfibJ130KDj7KBTDu91lBrjq/UeoMM5VH2OO3z","rZ6Xt5Adfxlm8JsLit3SUSly6cW9DZ525mZlex8cSJZPqbUo+ai2kGG9H6k8xttVzuPfVO4jy7LtZCjnveC4Ik+GuUO0n/WyLHky","zFMiTxv4vJAnQznrok4+v+SpP8gdlSp31MiVWv5KgzfyiTJZcV6+TYbyqROyvHEJVfKaHRm26GZ7l4lqueq6NPfpD9K9/SoPvlWJ","Y13To86bo94HP6u4HOXv2HXefvXOOFnF+sj0Wp/vHhxQIy9V8zZ19hmR6b15YZW8dXWGNyZpkLvvtGp5wWDHI0+mn9of1W0pllmD","ar0X9wz0GlqVy5smr/TIPNtQ5z11aYV85Zs0gyfzV7X3aduhv0y5sol8vXqgNz1WKJuqmDp1six5MswHuH1sttf96+4yXeX6UifL","kifz0NWJclVNoVzQN9Wol21hvgEZlmW+CnkylNM26jRyYGAzeeaPUT9t5hggH8VQzvvFMUOeDHOr2A+0jTaQJ8NcOPKsl+OcfBTD","Z4TPF5878mSonwzL3nhPgqz4RMXhW2cbPBnmAZJhWeYlkifD+YRy1kWGOsmr94BYq94DLY4X6Llf6LlfvQfcu+6pty/ccIMY1rnY","vfXx5XZsZKW4/txCi3wUQ/n61DT76HeTxLyVae7VMyx7b2a1WHd/qkU+iqH8ph7DrA5ZNWJZn2HuaT8PtI7n14gt20ss8lEM5dxn","cT9FngyveabDOKOBPRd5MtxPkSfDcw3kyXBvRYZleVaCPBnuC8iwLM+2kCdz7Lqh7nkP1cht7pa+fF8cvWN731dm1siRN+e5HStG","WgfUnqFnn0KLPJnnj6RZ36dWyx4fWDb5q+dk2Yu7Vsnsg/0N+dSmhfalYpJcE8s0GMqPHNtld394rOx9dLjBUJ6/ttZ+49MKubpd","fzuKuW1/omjzY4F8YH+aTZ7MTrVGv0et1w+enmXwlH8ypacYfndPubF6gE2GelqNn2WLfbfI+s/T3b/c1Ew8vHq4HNNWuGTYRvKs","izz1qPeLHbxf7LUX59odTyqXKU+sNNrONpInU792o13TMVWe/M8mYtNT2fa6lkVy7estBHWyLHkyPzVbZ1+uYgovqthmhspPybso","SWaqeCl1six5MuxP1su2ZHbrJB7Y11EW7HjLYFiW94g8GcppG3WefG4b0f7cNnLWRWcYNpOnHvJkaA/v7zrlt3UGJsrnpjqG/Ls+","V4nBM5rKmzMGGgyvycx5v1x0UOdj+qpzMpQfPnCL+PvoWd6eiv4Gw2sy57RQcYID/b0RVw405Iwdk6G8d89J4k8T+7vn5BXZUQzj","0eR5/e9Hx4rWOudB5T5QD+XVteXiPZVvcEzlHUQxFdcWiuEqLl+j4vPkyeRc3EdYKndiqsqhIE/5lEuSxDgV93/nWLLBUA/tH92h","UrRWOULzVa5Q2g/DxNUqj+igyiciT4bXX11ZLXI2p1lnVNj2Q92rRI+CLPvgVjWnIQfgs4pJom/BIPvqjy2LDMuSJ8OyDzw1VqTX","7rJ1jJcM5RNVfKXnM/X20TE5hj1kxOhCMeeWlmJfzzybPBmVmyJ0nsp8FRMmT7nKqxCH1JzRU8U5o3RO2FQsFlXW2sdmbjfsofzV","yyvE5IY0e4BbF8mcM61QzGqTaj+WlyjId9ndRXyu8jZclaMX5BXYKq9AkKce8mSyz08Vp53I5zDqZVvYRvJkKGdd1KliuULFcoWO","65KnfvYteaOfj50jgnwUwbqok2XJk2G/qVwA0XHpCGuLystj/1DOZ4QM5XxGeL94TYb3PUony9IePvvkKeezTObgvBzrmwsqRUbr","Ott9Ot+a3KZabF7bz4gjtJk23J2mno1+6tkgT2ZI4TLvO1kscj74xF7brr/3zqcVwlLvQMYdGPsgT4byFx7I9LLmFIi7RCtBnYxp","/k35bYarM7YtDyUL8tRDnsxTTZrJOw70E6e/uMGol3YypkOeDOWsizrrZIrMeuAs8fK29QYfFZMiT4Zy1kWdZKiTcQ0ylDNmUaTO","qvy57wr7nSe2GXwUQznjDowVkifDWCEZlmX8mkxUnJo8GcrZLuokw34mv+jc5vKyFZnupoLhxnkonoflGWfyZCgnzzMRlPP8NRnK","eVaCDM/yUM4zGrQnqizP+5A3zh+hT8iwLM80kSfDcxxsF8+kTy1Odx+bYdvzrqg2eDI8d8DzGixLOfWQoR7KeU6B12RoD8/pkyfD","c/333pzmPTAnUazsXWiU5TcBStR8GFM5Icv3dzd46iFPhucvaA/riuLJXFOS6749JEWk270NhmVpJ3kyPANCPeR5PoU8Ga51uebk","+5cM1/zkKed6lQzzWvduvEMsuSjN6id+cN9tquJJf0u1u5+Ua1yTuS+hStz8XpZ95cQMj/LhhbeIRfekWZsvn+eRoXzFzDLxc3m+","3XlTQyRTtXi4uGDEEGtfVTNJnvLNPxSK/Rfm2H/d2CKSmWD3FsXDc62FQ1IMnvJgD2KrPYjBMC+XtrG9Kc0rxbFx17q7u9YZDMuy","LtqWNblEPHJRqvvlrQmSZamTDMuSJ3P7ZSli/6Ix7hp1Bo/1kmFffbexWKSrPfkP42qNe0H5a2otN1Ct48Y3pEUy6qyL0Ode9lyQ","avDqHI4IzuR4BRcliXS1Ts5U+cTkqYc8GXU+RwRndSR5toX3jjwZylkXdaozQiI4L2TooX6OGfJk1PkiEZw1MuqiTpYlT4b9ps7e","iOAcjsv+oVydqxH6jE2+yh0mQ/nXal08UK2Lz5yf4/J+8ZoM7zvlnB/IRNVL/ZRzP0v93FOzLjIsSz7KTjKcAynnnEmGe2rWy7bw","XpAns+tVlSuWlG/peHe3If3sd8/OtXaoOSP7acdesLWvO0Pl/m3OqrdPPTjY1fl45MnsV7EGFau23lLxBjIs21HFLFqqeMUlKm5B","ngx10h7mCTPHmDyZEaNSVB8WW3UqVs66aEPYN7qfyJOhDWzXKZdk2hvfybDnqJg45bd+Xmf/cG26/VIXlW8ZwdAe8pR/WJgoDu10","7B5qXxvF0GbylAfnWXzfABmh5pij6mzMYTXfDMjNtZuvXGlferTMsJn1kifzFzU3/KTOLQ5W88Q/ZmXbr65uIab/ocjQybLkyZzW","fJ09S/kcBqh5aJbyK7RSfoV/KR8DdbIseTJRbWRb1Hkd4Sm/R081F5JhWfYbeTKU0zbqfO2RM0SV8p/cq+ZU2kyeesiTYZ9MXTzG","Uu9Voc62G22nfNeMAdabcxPE22NKDIbXZHgvKL/x2WJr1MrlduHQSoPhNRmODcq3tBtoXVvaz96kniMyzMMnw7LMnycfpZ8M5wTK","eUbAYFAX9bNP2M/M2ydDOXWSoc20gf1DOeciMg1fDbYuzauUu3YutxmbYwyIcRzyZLZ6Kr+zqkR2UPsBMizLOA55Mp8tGmNNVXuL","BtVHZFiW8SPyZE5+/wr32IJbZOmUOUa7aBuZh+fluJPVN7P+Un7QIk+GZWkbr2nPDLUnGqz2Q/9V+6L5p5W41zcMl5cWNTP4KIb1","kmduA21mDgNjr2RYljFWMlFxXuYL8ZwaY7vkyfTac9B6Zecd8qmpOUa8OIqhnGeyGAMlT4YxUzIsS4b9QJ7nvFiWdTHeSoZlec6L","PJlalbvfV+V+PNZnghELZlmetyJPhnLyPJP12k/DxM12C1n3zzyXfBRDOc8zfnpmpdidW+e9pMYO+SiGcp7l5HlS8mRoJ+tiPJRy","xjejYqbkWS/tYXyTDOXUSYYxTerk2Vgy1EmebWdbOE54lp/+NH5ngN9s4XcAeHae373hOXeebWfMgrk0jE1QTv7R+Rn27Z2rRHL7","TJv5POTJMHeIPJmb7l9pl51cLmaOzTV4MsxlIsOy1W+0EM1OLhLrvjZzpcio/Fmh82dVLq2RH8WyX6h11gK1r85WZ83JkwnXd3qt","R/20+UEVd/pJVIi2j9cZPBn2LeNEZCinzigmXcWp+qs93ndqj0eecnuNY9/9aKFYOiAxkpnSMMLSMbM31T6JPOX56rsoScov0FO9","x8kw/kWdtJMMxx5jW4xhkSfD+BQZlp2uYnrZag98n9oDk2FZxsXIR+knwzZSzr4iwzx/5upHnb9jrj5z8lnWyOdHWeo0zgWA4Z6a","ue6L6zPsfoszvPtUX3OvTZ5M8F0dT31XR583tNV5Q0+fNyQz8axce/eClV5H9cyQj9ITfMfG9+VQZ+jH0j6t4Js5nvpmjsFTD3ky","oX9L+7rI087sFdl24roWslVCkcGToZx1UWfoY9P+NvLUP0k9U/t/SZY1qi3kyYT+Oe2rY13UybLkyfAcAfWzXTzXQD6KoZz3lOOK","PJlZ6nnZrL4rMFo9M+wH2kYbyJPh+OTzQhso5zkUMjxzwbpoA9cD9LfTP0+Gcvr06G+nHq6j+H0M8mToYyfDsvw+Bnky9OGTYVl+","l4M8Ga7JuVbnPoL5ui9m5VgL1Bzz0op+3nS1B89T+++bVi43vp1Ongzzh6mHPPN+yUd9B576Wz46wHpD7d3Xq3VVF+3nUc/0EfVs","B/tfofa/3l97ZdoH1P0Y9UKGl6LmKydZ+ZrXpnnkybRSz6POrTnrriYy2P8Ktf+V1Mmy5MkEuYtC5S7KYH8t1P7a0Mmy5MmcNiRR","jLtHxQ/apxr1si31as7poeYb9f0bg2FZ9ewK/eyq59jgyVBO26izXvnEblPz1qNq/qLN5KmHPBnmzNMGtov58OSjGMp5T5kPT54M","xx55MhzD5MlwjarmJ6Hnp9kNIwz7udYlT4bX1MO+opz3lwy/FcNvy/xJxT++vKBSDmldZ1zTL8HzKTw3RN4434S6yLAszw2RJ8Nv","2pBhWZ5XIk+Gfg+2i7axT8iT4XlbnrHleV6e8436VjwZnvnl+Wj+rRbyUQzlPOPMs8/kyejvdITf7GB+MvN7mcdLngzlzJemTuZs","MzebPPWQJ3N3x1SxZu1G7/C0JoI87WTOMHkylLMu6gzisJ7+RiR56meuMnkyzFFnXdTJsuTJ0K9IfyZ9lZT/8fVML3djuSzfVx/J","0EdKnvLrZ6Z55yYXynvmJkYy9LuSpzz4eyJS/T2RSJ0810mbyZNhWZ45JcOytIE8Gcp5Fow6+XdAmJvE3Cf+3RMyLMu/A0KeDP8+","CBmWZe4Zv3/OPD36oum75vlE+pzJk6F/iWfB6Dc4GsTKdNyMvhr6Z+iHIW8wkIfxOh27o07K6S8iQ38I66W/Raq4n163SLV+IcOy","9LGQJ2Pogf3UGcYVdYyR9pOnHvJkuB7m+oRrEq5LyZPhWpoMy3JdSp5MEK8RKl5jMCzL9TD5KP1k+PeYuC8w7AETlc/AfS79GOTJ","MA+BDMvSj0GeDPMcyLAs/SfkDf3YuzG+xnfE/wMfL4Xs"].join("")},d0={vertexCount:48,data:["eNqbNVNy3wznbhuG64t3A9l2MDYDECyb7bIXKo6sZp8Jh44tunp0cRxqYGxrJDOtkewCiSOrgZmDoh5dHJsaZDPR/ILVPTjcgOx3","ZPNRwgdNLzY3IIcJsvvRww3ZL9j8iK4GRRyXm7GED0YcIduLHM641CP7EQIa9tORbU9rtvHk03Zvn2SB7TRBYhMjjsbeh6QeziZG","HJlNPf8NrjgAAJ/dRfI="].join("")},p0={vertexCount:300,data:["eNrdmH9MlVUYx8k/XGWa5g90urZ0bpk27ScF73telrUWEK2GWdDYEHKgibFIUMubP8rp+jFomEZSMdD+QGGOoNV9z9lcMYa5jGTr","5wrNIQgMFgwKmp1zdu7d9768Dzq4fzTuX9+9+zzPec5znvM8Zzfz6Fo2dPssPvvbfve+rWXupsEXtY4xv2kr93PUhmeKoWwPninQ","Nl4/+N3w2g8y+B3XQuaVu55nSmcOxgQ7e55iIueilXMiK4KXa2lGaht5ZOLi3rKXHkjl6nt9aYN9Zsji4Ce0L9vsy0Yemba61fxI","0lVXfT+/J5ZXPThH+8GcSJ4b3kYeGdToB/OG35f0PMTzCppcL2P828q/YWwvY+JReQjFo3lkzH6Z+l7VPk9r2JfOocmP9oM8MvHv","N7gmt7b046ocKo25xfwgj4w8a27OOqSDSqMt7gt5ZGQ96D3KOC0fRttiHpD38a9jQMYnzxi/5pExOVG5De1da1wL84w8MvKsmTlr","W9YJk3WiGbTFe4E8MqjRD94d/F5at5qZ+lH5CTP4HdfCGCgeGdTQBxjWBmpkfGqDYvR+UfusNSY/yGCceBd+WdRk882HWfevheqs","w/fI9BytPXcn7B/zg7ynHnx9oi3eR+Qp/xgz1QeQQVvsJ7V3vMG/Wx3PmkYKQv1K9yLTx8bwnpoPx4y8p+Z9faIt3jXkkcGefGjZ","23xnZTJ/Lm0f2W+Rx7ryWUvzyOAcqYkR9sqhUv77gpdCOdRrmTxrjbyn5sPzAnlkKJ+e2RSeZcgjgzO047Nyrfed3+Li/DVa9bcI","3ue+a5/II0P5RFusW583wBj/GDP1fvDZl7bFvOF5Ue8HZNAW6wFrjHo/IIO2WOd4v6i5jwza4uwbGK7WdZtz6PWIOYWz5sjMVndN","xadsYevuiDkl86AZ1beR9/TM8F1DHhnKp+dNGL77yCODs+bum/eyE3mMdW0viphlRus3huFVbiNmDd4j5JExM0udnYWM520Trknk","kcEYkEFbn9mteWQwhlvsPazCsXn/4KsRPL6v/k1x3c+PlfCB0byIt5nJv6ptC3nsY9gfkEeG8ul594bz4Hkf+vrHmKm3JTJoi+80","n5of87ZEBm2xPvFeUG85ZNAWaxJrFd9CqJHBOseawXOn6hwZtM1flMiKzs4VVn6yoHRF7mJH5eGZcXRG4QhPPdXA066t2XjarOtA","DGP09sKdel35jU9Gz88rZz8v3yoyYienl8mYWmWu2hb8r7QzWW326MB+J6Rn5JXz32SuUmMT2WS0PDthzm5KabNHB/Y7IS3PzjFn","N6W07A/M9BCH0uo+m35FatmvdM5lvyK14VWfIbVZV/UrUq/9yxYbcv5hx5u7GKWjeL+YqYFJ6aJHsp22H5e7aS1djNInA+uDKWeX","ux99HRCUfq/2XrF5wUzRvLiLUTpaPSpa+qdlNay37GnxxfpeRulo9efi0Wyn6niz9f3By4zS/bnl7E/Z99bJc5mMjtaMq8/bxVIv","pTunpncySkdrLkdL98nYnriULk7K2Cg9WN0XVHzjxYCgdPtSS4x2x4g6eS6UTnpyWnB4b7OV1BUQlB76apVoq7jNqX22l1F6UUmu","PfD3nXZ2ZkBQekXfUZZ2YJ1TvaSLUbr91mFrW0J9cF6rjJ/Qp2M36v+z3jwccCg9UlJpfbNih/tlMa1lnXDTi1RPm7DGWXY9DMW3","FC927SvtwR8aAw6lzXxR9zE0a6aEPvfAXPfc5TYrRQQcSr/8R1vCrneqrKx+WkfrzSZ7ETe96LoYim9clSPKqqqsDzs7OKUf+zjB","mT54g7jQQeuZC3N4zekMJ/nd7mtpMZ6eHZfozD/Wxx4u6yH1lvgN4tH7d7gzPqD1xjmVfPemNOfCC1dIvW1kjbO/fpYYyqB1y8gn","PKshTbCbaP1a/j3O1cdnOek30vo/hxeIqw=="].join("")},m0={vertexCount:1200,data:["eNrtm1+oZ1UVxwcckEjsxYco6B/kQ5QyTkOEXO/vV4Ix45OBNCD5oEE4OBikUKRWgs2bFFooBFNERkXTXAu0unPvpRphHqJCBqGY","l4jKl2qokJia9lqz1/az913f35wQCuQIcj/cWWuds9fZe+211173/r8+sbNnz/Htd73xp8vvvXjM+bqjPw9ejFzlFyZP3TMvnHa+","+Z+fDF4MvJOwyZOXn7v2By5jP6/Z+o7z27//o+Dtkav8tv2k7tYTJ/z3fzr/6M5Xj37X+bkHvhi8GLnKL0yeumXsy/BJGa9zHbtx","+KFxlQ+/NV3739h8aXLG5r/Ki5Gr/MLkqfuPEyf997++7YFl5W3j8s7O5Z0ztnGFvOse/sqWy9xx/GtLvE+wvUPHVX5h8tTl78v3","cC7fJ3h7ZKV79tN3+O9/eH5jp/LC+Nw3F87vfvwZY/9GxkXGucr794L8dpVpNgc7q2yGvDPkybvsKF0bm8nYWCtvG5sv6hzO2OZ8","yLvu0+/4utssP5cv7f2W851feip4MXKVX5g8dbGWd2ztGdv6q7w9MmJCsOtifmZzhnPJGXM42HVtDde5sVPG6VzGHWxzo+Mqb3Ms","2HUZK0yu+i3YfN5xEk9cF/GtG2/iB2fEwE4X7xYxzWIU41vHGBd9wjVlfoj1Ehy+aoy1Fuy69oyIk5hvwRFjG1d5j6XUZexK3oHv","5pzEN9ctMcjHWGJS8MLYYq6xxeCEt42py7nNOV/WgHNZExlvG1PXvhnmsP++xr2Ykxl77KKu2cL7+NjrmnWu63RkX8vUtXhdx7u0","eF3HG2y+6rjKm6863WRd+3o/dfXtzvuOPb9z7tCRS3auet5knKu82xm56DqbbrWzi/lcPqvqqudmzxrth53UJnU5h7kWkjXizHlO","XcRtW+ORAwT7eicjbne6jIHl/ZxrjuTyIzNOUvf9Lz/oPnno7tP8vsH27TpOcjnmeM6JTddlfsV4m8ThiDMtB6Mu42QSkxmrnRlL","qcsc0uIvciSXGTnJM103icMen7EvZOz7MnUtBtUcrMsbk3zSucpbDhbsusxRsb8HW6zoOMljXZfvyfeHzzP2HIO68GEXD5M46Yxv","0enCJ/RVcOSxjeGrThd5rPkz8tvIh92HCbufqcscA+MKjn2qcZKHuG6y1nwNIl6NHDHT5CNGZew2ERvDjsW3bm2qZ9HmYCfiZGdT","2VG6jI3MGZK4F2u5xUacjzrmvsN9gfzvnx11vvXqDcsBYu8jLw+87m7njzy+0b0/mX5Ozmtxzm1nuiSHj/XScnX4pGOeiZIzVOQP","LX9OYr6z2CMspjXmmVGdK5mbJXsic0Xufbu+Kb+d+l78RshPyF0Oo74Xv4v6FvS58rPwZ+dD+kr5h35QY+d4S1x2tjgN7nI2NXaO","UY2L76/eme/G97G8M3JjvhvfgXaEruXhLdelTWVH6HZ2qCvqDJ0u8mpyl4crO9S18WNvDe7ydmWHusme5fsabSo71OVexhoObSo7","1C21CWerVYCzutCuOUabwk5nk7rM63jWTnLFyNVbPqnqANyjkzzQWdQeu/ok8xaV2/Csl5zTnZkTJjlY1HNarpXUUaN+2HJ1lc8P","ezf39MZcO9wTWVvjfqriGM9W6vzFc2VSM3FmPq9yfs4B9d3F9+2+Kb+d+l78LupbDD5P/Sx8uxxqg6/UM7Wfmz+VD+kr5R/6QY2d","Y1TjEmMxbvXSrhaazxmla/Zb/bazqe1kur0d6NJvHPswxmaHNSjaVHaEru3prWZFm8qO0LW92Nn2WdpUdoQua1+2dzebyo7QZW3N","9u5mU9kRuqxRR+3ObSo7QrezQ11RK+50cXYmd+drZYe6yVnV92vaVHaoK87CXd1A2aGuzdfYf8FdzWFCXV3Z6WxSl3Ue1tVV7Z31","HFVXT+qHWb2x1SFV/RB3cFntLupRrUaX1MbjnrHVBlX9kPXw5I7PmXd5qAF2bHu2cYlnO2Vvdi57NWvgETe8JszaHZn1Pd7VklkL","UrUv1seGu4nGrI0n9aK4A2p1oeS+eGRZ02PdJrkzinuQVqtM7oidOSfVPBxq2ukc41xS84fzRM0NzgF+9xqTt+uZsc0B9d35fdU3","5bdT34vfRX0L+lz5eVjXqQ/pK+Uf+oS1Pt7p0FfKP/TDhLnajYXvw3dgTZL3Snw3vgPtULeeDb2WSzuDLt+52aEu7pVYT87uvHbZ","oS7upFhn7u6gaYfflDZph3Vd2lR2qFvrBuZP1s+7WrGyQ91ax7B5YudWl69n4WZT2aEu7tpop7Op7FAXd3ydHepyHtIOddnzwPsF","2lR2kn4J72HgvQZtqvVOm7TDewraVHaGvovWU8H7EdpcYafpsk8Da6GzqexQl3fQWOOdTWWHurzXRuzqbCo7Spf5g51zjG0fS+4c","I7a3u0XVv8G+HdXbgxxJ9rewBybpp4o+tNY3pe5KeJ+y4h6k3cuovYB5FL6v5bpu337X7TvwLZn+VD6kr5R/6IcVY29jVOPiWDD/","Oa5ujBwL35nvpt6Hz1XPUva7uyroYu13fW60ucJO00VM6/riaFPZoS57MLDPdjaVHeqyN4O9H7Sp7FAXe1DXN0Kbah7SJu1gf+xs","KjtKl+uXdze8d0vY34e6vNPhXZtaO4w/1E3uXyLGtnwg4aiZNF3WcxjDuS8k7HWkQXe8u4y9oOUDCUdNqelyL+YZn+f0hC+td+jy","DJicE3fVRVnHpi73UO6DrPOQk94G1016a+Os2vaOhKOu3nTpW/qNdW8y67RJP2rs+80mdZnns/bFelrCsXaaLs+2yZlr1x1H0rfg","uqzn8P5C9bMl5/qov7Xcm3dtXCMJRy7UdJP738hb2npMOOqfTTepmYx3uNldue/LzIXE3i3tKN2hR6XV9ESNsTvvUJf7NXMS1ofJ","SQ3cdWmfz1V9wjzHUTdZs3H+anlpwnGf23R5rmedTfUVJP2orst+g6TvbldNj3U/6vLulXsu982Eo27cdJM8Kmqkq+5G42zYdFmT","Zw7P3D7h6CtouvQ/vwttJrxLl+dW1n5VvxbPy9Slb+k33lknHDWBUTf+dqPdrYu7/q52saIe0uRF70EXu6jLWMFabvL3GnFHOcYo","12XNh3f9ovegGwt1WQ/knqL2Hd4TUTe5Sx3rfhlHL03TZV7NvgKxRvozAnSZW7Ivhb0lCUcNMM1LKc+ekISjdtd0GZPpt8Sf0dc0","xm3XZc2Q50oRH7oYIvpAujokdXnu4FmGd7tk3mWrPvPEpuuyfy/p8WMcVnVg1+UZh/1RnAMJR2286bLvLunN4xkh7jXGmgbvwljT","G/Pq7I6M8dN1uUdz7+a9Nu/Kk2+06yyfnPF33bMnNkO+nZGHc3dqR+l+8PC9p/aU/9av/NT6dT9+/alffvh3Jy889aBkypO/sPHw","lvGhN9+yJnhzAq+d33vA+e/l5x/eeaXz8shhyZQnf6C8k/FbDt9705HHjjr/ZfM5yZQnl7HfZFzH7lzHnjLlyfa/8XuKL5fV/r7i","P8WUH9jH+NaByzs7l3eWTPl76tj/VsaO50qmvOLyPZzL91lXrHSffNMtm2ce2dwoc2GdbP9+6b/Pdlxk1oyqfONB5rJ2lM0p8lN0","bW4Z2Vwjmy/qHJZM+T/vPeC/f7nM7fXqz5fKOlBMebKt5Tont35f/FPfWTLlyZiTk+YP5Tvdsobr3Ngq88G5zAebnylTnsyYUPzm","71n8JlnFE8Q0OXYy5cl4t3XEJcmUHzjWjvkn1gvXb8eUJ5dnOde4GnNMMuXJjFGT3kfEt6tqbPxXmQvk99VYuiiyiimv5vkf61gW","ZSyKKV/ezX1e521jzD3JlC82nev7NC5r07mu05QpX8brc6mMd6uM99QVX76wr4xXMuXJal0jRnVcZCKOSVa6g53LPmvKc6foKjvd","vBXrQq0RMuKwrfHY6yVTnsy499GyT7xw8g033lNyHsUqZn7j3OnNt11718bBMw+tm59/8exvT9q+o3hKXqdsMqdSsZes8jHGxinx","WcVV5o2RzzAvGlnlnCoOYy+QTPn4LiWnkjkkmfJk5qLYx9cVqzxWvTN8K5ny8GEX3xRTnoyxtzy25q4pU37gyGPNZmN71rH7NvdX","f6ZM+S6XeOX9Jas8RK01+/edK85eH/lhxhajnrz59uurbsordC/7rCl2Xi3bz2tuvW1j5plnnnnmmS/HH3v6xX0zzzzzzDPPPPNr","irdOf+js/plnnnnmmWeeeeaZ/3/8m+PfvmHmmWee+X/Jqgdyyr0n5dGDMalfjvLki/WO++PljptceoH8Prf0AkmmvOpZUr2I5EH3","1Ofv29wYGX07kimvegni3vdieb5iyrMHQPX3klX/APsT0FslWfU2qN5a1UtJprzy8+HS6/KJg2vPHCq9LmTVg0pWdlSPWZk//j5l","/kimPHsPpvS3yB4G9BBO6mET/YfoSet4ytqhvJrPam2SKY/+qE3Bsp/qzosPr68/+tiNZos8xY7SVf0q6MmRTHnECuvri1ghmfJk","9awpPcOUV2sWc1Uy5dlTqvriyKofFfvCpB48ypPtGfBP4yn9mZSPXrISS1tfWfCvHtncX+Ot5JBHHLA533hKHyzl1bdQ9pUu9ggb","S+MpvVuUV36e8ncKQtf63Brju9jekfIUeRXfyJRnrFjxNxqNVbxS/WxqvGTKYz5M2msoT1Z/v6P6+siZ/Pj3KavWC+ZYk0f8t/dv","jP1F8hR51adNpjxjr/IhWcVt9iWWXtut+w+uvfcn506vjBXBU3odKc/+cMthnj1xYV/dL1K2fGZ512duKPnMpJ5z6rLvWsVesur3","Vn3saj6QKc+/OVLnArL6e6UJuXQXJwWvqf1a9bGrbzTI/Fd98srOq9H9Dzv72BU="].join("")};function Rn(n){const e=Uint8Array.from(atob(n.data),h=>h.charCodeAt(0)),i=Hf(e),r=new Float32Array(i.buffer,i.byteOffset,i.byteLength/4),o=n.vertexCount*3,t=new Uint32Array(r.buffer,r.byteOffset,r.length),s=new Uint32Array(o),a=new Uint32Array(o),l=[],c=new Map;let f=0;for(let h=0;h<n.vertexCount;h++){const d=h*3,p=o+d,m=[t[d],t[d+1],t[d+2],t[p],t[p+1],t[p+2]].join(",");let v=c.get(m);if(v===void 0){v=f++,c.set(m,v);const g=v*3;s.set(t.subarray(d,d+3),g),a.set(t.subarray(p,p+3),g)}l.push(v)}const u=new _t;return u.setAttribute("position",new De(new Float32Array(s.slice(0,f*3).buffer),3)),u.setAttribute("normal",new De(new Float32Array(a.slice(0,f*3).buffer),3)),u.setIndex(l),u}function v0(){return Rn(h0).scale(.01,.01,.01)}function Da(){return Rn(d0).translate(0,.108,.2535)}function Fa(){return new qe(.56,.28).translate(0,.1036,.2532)}function g0(){return new qe(.5,.5).translate(0,0,.2532)}function y0(){return Rn(p0)}function b0(){return Rn(m0).scale(.01,.01,.01)}function Ia(){const n=new Cn(1,1,1);return n.computeTangents(),n}function ka(){return new Cn(1,1,1)}function S0(n,e){return{x:n.y*e.z-n.z*e.y,y:n.z*e.x-n.x*e.z,z:n.x*e.y-n.y*e.x}}function _0(n){const e=new Float32Array(n.length*12),i=new Float32Array(n.length*12),r=new Float32Array(n.length*12);for(let s=0;s<n.length;s++){const a=n[s];if(a===void 0)continue;const l=S0(a.normal,a.tangent);e.set([a.x,a.y,0,a.x,a.y,0,a.x,a.y,0,a.x,a.y,0],s*12),i.set([a.normal.x,a.normal.y,a.normal.z,a.normal.x,a.normal.y,a.normal.z,l.x,l.y,l.z,l.x,l.y,l.z],s*12),r.set([0,a.pathT,a.zT,1,a.pathT,a.zT,0,a.pathT,a.zT,1,a.pathT,a.zT],s*12)}const o=[];for(let s=0;s<n.length-1;s++){const a=s*4;o.push(a,a+4,a+1,a+1,a+4,a+5,a+2,a+6,a+3,a+3,a+6,a+7)}const t=new _t;return t.setAttribute("position",new De(e,3)),t.setAttribute("normal",new De(i,3)),t.setAttribute("arcData",new De(r,3)),t.setIndex(o),t}const No=1e-4,T0=Math.PI/180;function Na(n,e,i){const r=Math.abs(n.lengthUnits),o=Math.max(r,No),t=Math.max(n.width*.98*i,No),s=Math.max(n.height*i,No),a=n.x,l=-e-Math.min(n.lengthUnits,0)-r/2,c=-n.rotationDeg,f=c*T0,u=Math.cos(f),h=Math.sin(f);return{position:[a*u+l*h,n.y+n.height*i/2,-a*h+l*u],yawDeg:c,outlineScale:[t,s,o],coreScale:[Math.max((n.width*.98-.01)*i,No),Math.max((n.height-.01)*i,No),Math.max(o-.01,No)]}}function Ba(n,e,i){let r=0,o=n.length;for(;r<o;){const t=r+o>>>1,s=n[t];s!==void 0&&(s.position<e||i&&s.position===e)?r=t+1:o=t}return r}function x0(n,e){let i=0,r=n.length;for(;i<r;){const o=i+r>>>1;(n[o]??1/0)<e?i=o+1:r=o}return i}class mi{starts;ends;endInclusive;started;expired;active;activeIndices=[];startCursor=0;endCursor=0;initialized=!1;constructor(e,i,r,o){this.starts=Array.from({length:e},(s,a)=>({position:i(a),index:a})),this.ends=Array.from({length:e},(s,a)=>({position:r(a),index:a}));const t=(s,a)=>s.position-a.position||s.index-a.index;this.starts.sort(t),this.ends.sort(t),this.endInclusive=o,this.started=new Uint8Array(e),this.expired=new Uint8Array(e),this.active=new Uint8Array(e)}at(e){const i=Ba(this.starts,e,!0),r=Ba(this.ends,e,!this.endInclusive),o=Math.abs(i-this.startCursor)+Math.abs(r-this.endCursor),t=!this.initialized||o>Math.max(this.activeIndices.length*2,64);return this.moveStartCursor(i,!t),this.moveEndCursor(r,!t),t&&this.rebuild(),this.initialized=!0,this.activeIndices}get current(){return this.activeIndices}moveStartCursor(e,i){for(;this.startCursor<e;){const r=this.starts[this.startCursor++];r!==void 0&&this.setStarted(r.index,!0,i)}for(;this.startCursor>e;){const r=this.starts[--this.startCursor];r!==void 0&&this.setStarted(r.index,!1,i)}}moveEndCursor(e,i){for(;this.endCursor<e;){const r=this.ends[this.endCursor++];r!==void 0&&this.setExpired(r.index,!0,i)}for(;this.endCursor>e;){const r=this.ends[--this.endCursor];r!==void 0&&this.setExpired(r.index,!1,i)}}rebuild(){this.activeIndices.length=0;for(let e=0;e<this.active.length;e++){const i=this.started[e]===1&&this.expired[e]===0;this.active[e]=i?1:0,i&&this.activeIndices.push(e)}}setStarted(e,i,r){this.started[e]=i?1:0,r&&this.sync(e)}setExpired(e,i,r){this.expired[e]=i?1:0,r&&this.sync(e)}sync(e){const i=this.started[e]===1&&this.expired[e]===0;if(i===(this.active[e]===1))return;this.active[e]=i?1:0;const r=x0(this.activeIndices,e);i?this.activeIndices.splice(r,0,e):this.activeIndices.splice(r,1)}}const xc=[1,1,1],M0=xc;class Tt{mesh;capacity;color=new Ke;instanceColors;instanceDissolves;instanceCutoutSeeds;instanceColorAlphas;instanceUvScales;instanceObstacleEdgeScales;cursor=0;lastRed=Number.NaN;lastGreen=Number.NaN;lastBlue=Number.NaN;linear=new Float32Array(3);colorsDirty=!1;colorAlphasDirty=!1;uvScalesDirty=!1;constructor(e,i,r,o=!1){this.capacity=Math.max(r,1),this.mesh=new Jr(e,i,this.capacity),this.mesh.instanceMatrix.setUsage(Zt),this.instanceColors=new lo(new Float32Array(this.capacity*3),3),this.instanceColors.setUsage(Zt),this.mesh.instanceColor=this.instanceColors,this.instanceDissolves=new lo(new Float32Array(this.capacity).fill(1),1),this.instanceDissolves.setUsage(Zt),this.mesh.geometry.setAttribute("instanceDissolve",this.instanceDissolves),this.instanceCutoutSeeds=new lo(new Float32Array(this.capacity),1),this.instanceCutoutSeeds.setUsage(Zt),this.mesh.geometry.setAttribute("instanceCutoutSeed",this.instanceCutoutSeeds),this.instanceColorAlphas=new lo(new Float32Array(this.capacity).fill(1),1),this.instanceColorAlphas.setUsage(Zt),this.mesh.geometry.setAttribute("instanceColorAlpha",this.instanceColorAlphas),this.instanceUvScales=new lo(new Float32Array(this.capacity*3).fill(1),3),this.instanceUvScales.setUsage(Zt),this.mesh.geometry.setAttribute("instanceUvScale",this.instanceUvScales),o&&(this.instanceObstacleEdgeScales=new lo(new Float32Array(this.capacity*3).fill(1),3),this.instanceObstacleEdgeScales.setUsage(Zt),this.mesh.geometry.setAttribute("instanceObstacleEdgeScale",this.instanceObstacleEdgeScales)),this.mesh.frustumCulled=!1,this.mesh.count=0}begin(){this.cursor=0}push(e,i,r=1,o=1,t=xc,s=M0){if(this.cursor>=this.capacity)return;this.mesh.setMatrixAt(this.cursor,e),(i[0]!==this.lastRed||i[1]!==this.lastGreen||i[2]!==this.lastBlue)&&(this.color.setRGB(i[0],i[1],i[2]).convertSRGBToLinear(),this.linear[0]=this.color.r,this.linear[1]=this.color.g,this.linear[2]=this.color.b,this.lastRed=i[0],this.lastGreen=i[1],this.lastBlue=i[2]);const a=this.instanceColors.array,l=this.cursor*3;(a[l]!==this.linear[0]||a[l+1]!==this.linear[1]||a[l+2]!==this.linear[2])&&(this.mesh.setColorAt(this.cursor,this.color),this.colorsDirty=!0),this.instanceDissolves.setX(this.cursor,r),this.instanceCutoutSeeds.setX(this.cursor,o);const c=Math.fround(i[3]??1);this.instanceColorAlphas.getX(this.cursor)!==c&&(this.instanceColorAlphas.setX(this.cursor,c),this.colorAlphasDirty=!0);const f=Math.fround(t[0]),u=Math.fround(t[1]),h=Math.fround(t[2]);(this.instanceUvScales.getX(this.cursor)!==f||this.instanceUvScales.getY(this.cursor)!==u||this.instanceUvScales.getZ(this.cursor)!==h)&&(this.instanceUvScales.setXYZ(this.cursor,f,u,h),this.uvScalesDirty=!0),this.instanceObstacleEdgeScales?.setXYZ(this.cursor,s[0],s[1],s[2]),this.cursor++}end(){this.mesh.count=this.cursor;const e=this.mesh.instanceMatrix;e.clearUpdateRanges(),this.cursor>0&&(e.addUpdateRange(0,this.cursor*16),e.needsUpdate=!0,this.colorsDirty&&(this.instanceColors.clearUpdateRanges(),this.instanceColors.addUpdateRange(0,this.cursor*3),this.instanceColors.needsUpdate=!0,this.colorsDirty=!1),this.instanceDissolves.clearUpdateRanges(),this.instanceDissolves.addUpdateRange(0,this.cursor),this.instanceDissolves.needsUpdate=!0,this.instanceCutoutSeeds.clearUpdateRanges(),this.instanceCutoutSeeds.addUpdateRange(0,this.cursor),this.instanceCutoutSeeds.needsUpdate=!0,this.instanceObstacleEdgeScales!==void 0&&(this.instanceObstacleEdgeScales.clearUpdateRanges(),this.instanceObstacleEdgeScales.addUpdateRange(0,this.cursor*3),this.instanceObstacleEdgeScales.needsUpdate=!0),this.colorAlphasDirty&&(this.instanceColorAlphas.clearUpdateRanges(),this.instanceColorAlphas.addUpdateRange(0,this.cursor),this.instanceColorAlphas.needsUpdate=!0,this.colorAlphasDirty=!1),this.uvScalesDirty&&(this.instanceUvScales.clearUpdateRanges(),this.instanceUvScales.addUpdateRange(0,this.cursor*3),this.instanceUvScales.needsUpdate=!0,this.uvScalesDirty=!1))}dispose(){this.mesh.geometry.dispose(),this.mesh.dispose()}}function Bo(n,e,i,r,o,t,s=n.enterBeat){return Vf(n.noodle,e,i,(i-n.spawnBeat)/r,o,t,s)}function Uo(n,e,i,r){return i.time===void 0||e<n.spawnBeat?e:n.spawnBeat+i.time*r}function vi(n,e,i,r){return e>=(n.enterBeat??n.spawnBeat)&&(r.time===void 0?e:i)<n.despawnBeat}function tn(n,e){return n===void 0?e:[n[0],n[1],n[2]]}function Mo(n,[e,i,r,o],t){return n.set(-e,t?i:-i,t?-r:r,o)}function Mc(n,e,i,r,o){return e.makeScale(o?-1:1,1,-1),i.copy(e).invert(),n.fromArray(r).premultiply(e).multiply(i)}const Go=.6;class w0{worldCorrection=new ge;parentMatrix=new be;rotatedObjectParentMatrix=new be;rotatedObjectMatrix=new be;basis=new be;basisInverse=new be;basePosition=new H;scratchPosition=new H;scratchScale=new H;baseQuaternion=new ge;staticWorldQuaternion=new ge;movementQuaternion=new ge;parentQuaternion=new ge;rotatedObjectParentQuaternion=new ge;worldQuaternion=new ge;applyWorldRotation(e,i){i!==void 0&&(this.setWorldQuaternion(i),e.position.applyQuaternion(this.worldQuaternion),e.quaternion.premultiply(this.worldQuaternion))}apply(e,i,r,o,t,s,a,l,c=!1){this.basePosition.copy(e.position),this.baseQuaternion.copy(e.quaternion),this.staticWorldQuaternion.identity(),a!==void 0&&(this.setWorldQuaternion(a),this.staticWorldQuaternion.copy(this.worldQuaternion),this.worldQuaternion.invert(),this.basePosition.applyQuaternion(this.worldQuaternion),this.baseQuaternion.premultiply(this.worldQuaternion)),this.movementQuaternion.copy(this.staticWorldQuaternion),r.rotation!==void 0&&(Mo(this.worldQuaternion,r.rotation,s),this.movementQuaternion.multiply(this.worldQuaternion)),this.worldCorrection.copy(this.movementQuaternion).invert();const f=r.definitePosition;if(f!==void 0?(e.position.set(o+f[0]*Go*(s?-1:1),t+f[1]*Go,-f[2]*Go),l===void 0?this.basePosition.copy(e.position):this.basePosition.add(e.position.sub(l))):r.position!==void 0&&this.basePosition.add(this.scratchPosition.set(r.position[0]*Go*(s?-1:1),r.position[1]*Go,-r.position[2]*Go)),e.position.copy(this.basePosition).applyQuaternion(this.movementQuaternion),e.quaternion.copy(this.movementQuaternion),i?.localRotation!==void 0&&(Mo(this.worldQuaternion,i.localRotation,s),e.quaternion.multiply(this.worldQuaternion)),r.localRotation!==void 0&&(Mo(this.worldQuaternion,r.localRotation,s),e.quaternion.multiply(this.worldQuaternion)),c||e.quaternion.multiply(this.baseQuaternion),this.applyScale(e.scale,i,r,s),e.matrix.compose(e.position,e.quaternion,e.scale),r.parentMatrix!==void 0&&(Mc(this.parentMatrix,this.basis,this.basisInverse,r.parentMatrix,s),this.parentMatrix.decompose(this.scratchPosition,this.parentQuaternion,this.scratchScale),this.worldCorrection.multiply(this.parentQuaternion.invert()),e.matrix.premultiply(this.parentMatrix)),c){this.rotatedObjectParentMatrix.copy(e.matrix),this.rotatedObjectParentMatrix.decompose(e.position,this.rotatedObjectParentQuaternion,e.scale),this.rotatedObjectMatrix.makeRotationFromQuaternion(this.baseQuaternion),e.matrix.multiply(this.rotatedObjectMatrix),e.quaternion.copy(this.rotatedObjectParentQuaternion).multiply(this.baseQuaternion);return}r.parentMatrix!==void 0&&e.matrix.decompose(e.position,e.quaternion,e.scale)}applyChildRotation(e,i){this.worldQuaternion.copy(this.rotatedObjectParentQuaternion).invert().multiply(i),this.rotatedObjectMatrix.makeRotationFromQuaternion(this.worldQuaternion),e.matrix.copy(this.rotatedObjectParentMatrix).multiply(this.rotatedObjectMatrix)}setWorldQuaternion(e){const[i,r,o,t]=Sn(e);this.worldQuaternion.set(-i,-r,o,t)}applyScale(e,i,r,o){i?.scale!==void 0&&(this.scratchScale.set(i.scale[0]??1,i.scale[1]??1,i.scale[2]??1),e.multiply(this.scratchScale)),r.scale!==void 0&&(this.scratchScale.fromArray(r.scale),o&&(this.scratchScale.x*=-1),e.multiply(this.scratchScale))}}const E0=new H(0,0,1),Ua=new H(0,1,0),Ga=new H(0,1.7,0),Tr=Math.PI/180,on=1,C0=90,P0=[1,1,1],Wa=[1,1,1];class A0{constructor(e,i,r,o){this.root=e,this.fog=i,this.screenDisplacementTexture=r,this.camera=o,this.sliderMistNoise.wrapS=Ot,this.sliderMistNoise.wrapT=Ot,this.obstacleDisplacementNoise.wrapS=Ot,this.obstacleDisplacementNoise.wrapT=Ot,this.hitLine.name="preview-hit-line",this.hitLine.geometry.rotateX(-Math.PI/2),this.hitLine.position.set(0,.01,-Ti),this.hitLine.visible=!1,this.root.add(this.hitLine)}root;fog;screenDisplacementTexture;camera;hitLine=new Ue(new qe(2.5,.025),Wm());noteReflection=u0();sliderMistNoise=new Li().load("/chro/textures/slider-mist-noise.png");obstacleDisplacementNoise=new Li().load("/chro/textures/obstacle-displacement-noise.png");matrix=new be;wallRootMatrix=new be;wallGeometryMatrix=new be;position=new H;wallOffset=new H;spawnPosition=new H;poseHeadPosition=new H;cameraPosition=new H;wallWorldPosition=new H;quaternion=new ge;noteLookRotation=new i0;scale=new H;pose={matrix:this.matrix,position:this.position,quaternion:this.quaternion,scale:this.scale};noodleObjectTransform=new w0;wallEdgeScale=[1,1,1];noteLookStates=new Map;data=null;colors=null;noteBodies=[];arrows=[];decorativeArrows=[];arrowGlows=[];decorativeArrowGlows=[];circleGlows=[];bombs=null;links=[];wallCores=null;legacySolidWallCores=null;wallFrames=null;wallFakeGlows=null;wallCoreLowMaterial=null;wallCoreHighMaterial=null;wallCoreEntries=[];screenDisplacementEffects=!0;previewHitNotes=!0;previewHitLine=!1;previewNotesLookAtPlayer=!1;instanceGroups=[];arcEntries=[];noteReplayWindows=null;bombWindows=null;linkReplayWindows=null;wallWindows=null;arcWindows=null;objectBeat=Number.NaN;ownedMaterials=[];noteColorMaterials=[];obstacleColorMaterials=[];setMap(e,i){this.data=e,this.colors=i;const r=[i.leftNote,i.rightNote],o=[Ma(this.fog,i.leftNote,this.noteReflection),Ma(this.fog,i.rightNote,this.noteReflection)],t=[wa(this.fog),wa(this.fog)],s=e.notes.some(g=>g.noodle!==void 0&&!g.interactable),a=s?[Ea(this.fog),Ea(this.fog)]:[],l=[Ca(this.fog),Ca(this.fog)],c=s?[Pa(this.fog),Pa(this.fog)]:[],f=[Aa(this.fog),Aa(this.fog)],u=zm(this.fog,this.noteReflection),h=Xm(this.fog,i.obstacle),d=Zm(this.fog,i.obstacle,this.screenDisplacementTexture,this.obstacleDisplacementNoise),p=e.walls.some(g=>g.legacySolidCore===!0)?Ym(i.obstacle):null;this.wallCoreLowMaterial=h,this.wallCoreHighMaterial=d;const m=qm(this.fog,i.obstacle),v=Km(this.fog,i.obstacle);this.noteColorMaterials=o,this.obstacleColorMaterials=[h,d,...p===null?[]:[p],m,v],this.ownedMaterials=[...o,...t,...a,...l,...c,...f,u,h,d,...p===null?[]:[p],m,v],this.noteBodies=o.map(g=>new Tt(v0(),g,e.capacity.notes)),this.arrows=t.map(g=>new Tt(Da(),g,e.capacity.notes)),this.decorativeArrows=a.map(g=>new Tt(Da(),g,e.capacity.notes)),this.arrowGlows=l.map(g=>new Tt(Fa(),g,e.capacity.notes)),this.decorativeArrowGlows=c.map(g=>new Tt(Fa(),g,e.capacity.notes)),this.circleGlows=f.map(g=>new Tt(g0(),g,e.capacity.notes)),this.bombs=new Tt(y0(),u,e.capacity.bombs),this.links=o.map(g=>new Tt(b0(),g,e.capacity.chainLinks)),this.wallCores=new Tt(Ia(),h,e.capacity.walls),this.legacySolidWallCores=p===null?null:new Tt(Ia(),p,e.capacity.walls),this.wallFrames=new Tt(ka(),m,e.capacity.walls,!0),this.wallFakeGlows=new Tt(ka(),v,e.capacity.walls,!0),this.wallCores.mesh.userData.mirrorExcluded=!0,this.legacySolidWallCores!==null&&(this.legacySolidWallCores.mesh.userData.mirrorExcluded=!0),this.wallFakeGlows.mesh.userData.mirrorExcluded=!0;for(const g of[...this.arrowGlows,...this.decorativeArrowGlows])g.mesh.layers.set(Di);this.wallFakeGlows.mesh.layers.set(Di),this.instanceGroups=[...this.noteBodies,...this.arrows,...this.decorativeArrows,...this.arrowGlows,...this.decorativeArrowGlows,...this.circleGlows,this.bombs,...this.links,this.wallCores,...this.legacySolidWallCores===null?[]:[this.legacySolidWallCores],this.wallFrames,this.wallFakeGlows];for(const g of this.instanceGroups)this.root.add(g.mesh);this.setScreenDisplacementEffects(this.screenDisplacementEffects),this.arcEntries=e.arcs.map(g=>{const y=r[g.colorIndex]??i.leftNote,S=Jm(this.fog,g.customColor??y,this.sliderMistNoise,{...g,disableGravity:g.noodle?.disableGravity});this.ownedMaterials.push(S);const b=new Ue(_0(g.points),S);return b.frustumCulled=!1,b.visible=!1,this.root.add(b),{mesh:b,arc:g}}),this.noteReplayWindows=new mi(e.notes.length,g=>e.notes[g]?.enterBeat??1/0,g=>{const y=e.notes[g];return ci(y?.noodle,e.noodle)?1/0:y?.despawnBeat??-1/0},!0),this.bombWindows=new mi(e.bombs.length,g=>e.bombs[g]?.enterBeat??1/0,g=>{const y=e.bombs[g];return ci(y?.noodle,e.noodle)?1/0:y?.despawnBeat??-1/0},!0),this.linkReplayWindows=new mi(e.chainLinks.length,g=>e.chainLinks[g]?.enterBeat??1/0,g=>{const y=e.chainLinks[g];return ci(y?.noodle,e.noodle)?1/0:y?.despawnBeat??-1/0},!0),this.wallWindows=new mi(e.walls.length,g=>e.walls[g]?.enterBeat??1/0,g=>{const y=e.walls[g];return ci(y?.noodle,e.noodle)?1/0:y?.despawnBeat??-1/0},!0),this.arcWindows=new mi(e.arcs.length,g=>e.arcs[g]?.spawnBeat??1/0,g=>{const y=e.arcs[g];return ci(y?.noodle,e.noodle)?1/0:y?.despawnBeat??-1/0},!0)}setColors(e){this.colors=e,[e.leftNote,e.rightNote].forEach((r,o)=>{const t=this.noteColorMaterials[o];t!==void 0&&Kt(t,"_Color")?.setRGB(...r).convertSRGBToLinear()});for(const r of this.obstacleColorMaterials)Kt(r,"_Color")?.setRGB(...e.obstacle).convertSRGBToLinear();const i=[we(e.leftNote),we(e.rightNote)];for(const{arc:r,mesh:o}of this.arcEntries){if(r.customColor!==void 0)continue;const t=i[r.colorIndex]??i[0];t!==void 0&&ht(o.material,"_ArcColor")?.set(t.r,t.g,t.b,1)}this.invalidate()}setScreenDisplacementEffects(e){if(this.screenDisplacementEffects=e,this.wallCores===null)return;const i=e?this.wallCoreHighMaterial:this.wallCoreLowMaterial;i!==null&&(this.wallCores.mesh.material=i),this.wallCores.mesh.layers.set(e?Ln:0)}setPreviewNotesLookAtPlayer(e){e!==this.previewNotesLookAtPlayer&&(this.previewNotesLookAtPlayer=e,this.invalidate())}setPreviewHitNotes(e){e!==this.previewHitNotes&&(this.previewHitNotes=e,this.invalidate())}setPreviewHitLine(e){e!==this.previewHitLine&&(this.previewHitLine=e,this.invalidate())}invalidate(){this.objectBeat=Number.NaN,this.noteLookStates.clear()}get wallsVisible(){return(this.wallCores?.mesh.count??0)>0||(this.legacySolidWallCores?.mesh.count??0)>0}update(e,i,r){const o=this.data,t=this.colors;if(o===null||t===null||(this.root.position.z=o.tracksPlayerZ&&i.hasPoses?i.trackedHeadZ:0,e===this.objectBeat))return;this.objectBeat=e,this.root.updateWorldMatrix(!0,!1),this.camera.getWorldPosition(this.cameraPosition);const s=qt(e,o.songBpm);for(const d of this.instanceGroups)d.begin();const a=i.hasReplay,l=!a&&this.previewHitNotes;this.hitLine.visible=!a&&this.previewHitLine;const c=i.poseFrames,f=this.noteReplayWindows?.at(e)??[];for(let d=0;d<2;d++)for(const p of f){const m=o.notes[p];if(m?.colorIndex!==d)continue;const v=m.hjdBeats*2,g=Bo(m,o.noodle,e,v,r,o.leftHanded),y=Uo(m,e,g,v),S=Yi(m,y),b=m.startX+(m.x-m.startX)*Ws(m,y),T=m.noodle?.disableGravity?m.y:m.startY+(m.y-m.startY)*S+zs(m,y,m.flipYSide),C=m.rotationDeg*(m.noodle?.disableLook===!0?1:js(m,y)),x=g.interactable===void 0?m.interactable:g.interactable>=1;if(!(vi(m,e,y,g)&&(!l||!x||Hs(m,y)))||m.replayEndTime!==void 0&&s>=m.replayEndTime)continue;const O=g.dissolve??1,E=g.dissolveArrow??1,k=qt(m.beat,o.songBpm);if(m.lookAtPlayer&&!m.noodle?.disableLook&&(a||this.previewNotesLookAtPlayer))this.composeLookNoteAt(m,y,b,T,k,s,o,c,i.headPosition,i,on,g.time!==void 0,g,r);else{this.composeAt(m,y,b,T,C,on,!0);const A=e<m.spawnBeat&&g.definitePosition!==void 0?this.spawnPosition.set(m.startX,m.startY,-Do(m,m.spawnBeat)):void 0;this.noodleObjectTransform.apply(this.pose,m.noodle,g,m.x,m.y,o.leftHanded,m.worldRotation,A,!0)}const _=tn(g.color,m.customColor??(m.colorIndex===1?t.rightNote:t.leftNote));O>0&&this.noteBodies[d]?.push(this.matrix,_,O,p+1);const L=g.dissolveArrow!==void 0||y<m.spawnBeat+v*.75;if(E>0&&L)if(m.dot)this.circleGlows[d]?.push(this.matrix,_,E,-p-1);else{const A=!x&&g.dissolveArrow!==void 0&&E>O,W=A?this.decorativeArrows:this.arrows,B=A?this.decorativeArrowGlows:this.arrowGlows;W[d]?.push(this.matrix,P0,E,-p-1),B[d]?.push(this.matrix,_,E,-p-1)}}for(const d of this.bombWindows?.at(e)??[]){const p=o.bombs[d];if(p===void 0)continue;const m=p.hjdBeats*2,v=Bo(p,o.noodle,e,m,r,o.leftHanded),g=Uo(p,e,v,m);if(!vi(p,e,g,v)||p.replayEndTime!==void 0&&s>=p.replayEndTime)continue;const y=p.noodle?.disableGravity?p.y:p.startY+(p.y-p.startY)*Yi(p,g);if((v.dissolve??1)<=0)continue;this.composeAt(p,g,p.x,y,0,1,!0);const S=e<p.spawnBeat&&v.definitePosition!==void 0?this.spawnPosition.set(p.x,p.startY,-Do(p,p.spawnBeat)):void 0;this.noodleObjectTransform.apply(this.pose,p.noodle,v,p.x,p.y,o.leftHanded,p.worldRotation,S),this.bombs?.push(this.matrix,tn(v.color,p.customColor??yl),v.dissolve??1,d+1)}const u=this.linkReplayWindows?.at(e)??[];for(let d=0;d<2;d++)for(const p of u){const m=o.chainLinks[p];if(m?.colorIndex!==d)continue;const v=m.hjdBeats*2,g=Bo(m,o.noodle,e,v,r,o.leftHanded),y=Uo(m,e,g,v),S=Yi(m,y),b=m.noodle?.disableGravity?m.y:er+(m.y-er)*S,T=m.rotationDeg*js(m,y),C=g.interactable===void 0?m.interactable:g.interactable>=1;if(!(vi(m,e,y,g)&&(!l||!C||Hs(m,y)))||m.replayEndTime!==void 0&&s>=m.replayEndTime||(g.dissolve??1)<=0)continue;this.composeAt(m,y,m.x,b,T,on);const P=e<m.spawnBeat&&g.definitePosition!==void 0?this.spawnPosition.set(m.x,er,-Do(m,m.spawnBeat)):void 0;this.noodleObjectTransform.apply(this.pose,m.noodle,g,m.x,m.y,o.leftHanded,m.worldRotation,P,!0);const O=tn(g.color,m.customColor??(m.colorIndex===1?t.rightNote:t.leftNote));this.links[d]?.push(this.matrix,O,g.dissolve??1,p+1)}let h=0;for(const d of this.wallWindows?.at(e)??[]){const p=o.walls[d];if(p===void 0)continue;const m=p.hjdBeats*2+(p.durationBeats??p.pullBeat-p.beat),v=Bo(p,o.noodle,e,m,r,o.leftHanded),g=Uo(p,e,v,m);if(!vi(p,e,g,v))continue;const y=p.durationBeats!==void 0&&p.durationBeats<0?1:Xf(p,g,o.movementStateAt?.(e).halfJumpDurationInBeats);if(y===0||(v.dissolve??1)<=0)continue;const S=Na(p,Vs(p,p.pullBeat,g),y);this.setWallRootPosition(p,S.position,y,this.position),this.quaternion.setFromAxisAngle(Ua,S.yawDeg*Tr),this.noodleObjectTransform.applyWorldRotation(this.pose,p.worldRotation),this.scale.set(1,1,1);const b=e<p.spawnBeat&&v.definitePosition!==void 0?this.setWallRootPosition(p,Na(p,Vs(p,p.pullBeat,p.spawnBeat),1).position,1,this.spawnPosition):void 0;this.noodleObjectTransform.apply(this.pose,p.noodle,v,p.x,p.y,o.leftHanded,p.worldRotation,b);let T;p.legacyPrefabScaling===!0&&(this.wallEdgeScale[0]=Math.abs(this.scale.x),this.wallEdgeScale[1]=Math.abs(this.scale.y),this.wallEdgeScale[2]=Math.abs(this.scale.z),T=this.wallEdgeScale),this.wallRootMatrix.copy(this.matrix),this.wallOffset.set(0,p.height*y/2,-Math.abs(p.lengthUnits)/2),this.quaternion.identity(),this.scale.fromArray(S.outlineScale),this.wallGeometryMatrix.compose(this.wallOffset,this.quaternion,this.scale),this.matrix.copy(this.wallRootMatrix).multiply(this.wallGeometryMatrix);const C=v.color??p.customColor??t.obstacle;if(p.legacySolidCore===!0&&v.color===void 0){this.legacySolidWallCores?.push(this.matrix,C,v.dissolve??1,d+1);continue}this.wallFrames?.push(this.matrix,C,v.dissolve??1,d+1,Wa,T),this.scale.set(S.outlineScale[0]+.01,S.outlineScale[1]+.01,S.outlineScale[2]+.01),this.wallGeometryMatrix.compose(this.wallOffset,this.quaternion,this.scale),this.matrix.copy(this.wallRootMatrix).multiply(this.wallGeometryMatrix),this.wallFakeGlows?.push(this.matrix,C,v.dissolve??1,d+1,Wa,T),this.scale.fromArray(S.coreScale),this.wallGeometryMatrix.compose(this.wallOffset,this.quaternion,this.scale),this.matrix.copy(this.wallRootMatrix).multiply(this.wallGeometryMatrix);let x=this.wallCoreEntries[h];x===void 0&&(x={matrix:new be,color:C,dissolve:1,cutoutSeed:1,uvScale:S.coreScale,distance:0},this.wallCoreEntries.push(x)),x.matrix.copy(this.matrix),x.color=C,x.dissolve=v.dissolve??1,x.cutoutSeed=d+1,x.uvScale=S.coreScale,this.wallWorldPosition.setFromMatrixPosition(this.matrix).applyMatrix4(this.root.matrixWorld),x.distance=this.wallWorldPosition.distanceToSquared(this.cameraPosition),h++}this.wallCoreEntries.length=h,this.wallCoreEntries.sort((d,p)=>p.distance-d.distance);for(const d of this.wallCoreEntries)this.wallCores?.push(d.matrix,d.color,d.dissolve,d.cutoutSeed,d.uvScale);for(const d of this.arcWindows?.current??[]){const p=this.arcEntries[d];p!==void 0&&(p.mesh.visible=!1)}for(const d of this.arcWindows?.at(e)??[]){const p=this.arcEntries[d];if(p===void 0)continue;const m=p.arc,v=m.hjdBeats*1.5+m.tailBeat-m.headBeat,g=Bo(m,o.noodle,e,v,r,o.leftHanded,m.spawnBeat),y=Uo(m,e,g,v);if(p.mesh.visible=vi(m,e,y,g)&&(g.dissolve??1)>0,!p.mesh.visible)continue;const S=Ti+(m.headBeat-y)*m.unitsPerBeat;this.position.set(0,Xs,-S),this.quaternion.identity(),this.noodleObjectTransform.applyWorldRotation(this.pose,m.worldRotation),p.mesh.position.copy(this.position),p.mesh.quaternion.copy(this.quaternion),this.scale.set(1,1,1),p.mesh.scale.copy(this.scale);const b=e<m.spawnBeat&&g.definitePosition!==void 0?this.spawnPosition.set(0,Xs,-(Ti+(m.headBeat-m.spawnBeat)*m.unitsPerBeat)):void 0;this.noodleObjectTransform.apply(this.pose,m.noodle,g,0,0,o.leftHanded,m.worldRotation,b),p.mesh.position.copy(this.position),p.mesh.quaternion.copy(this.quaternion),p.mesh.scale.copy(this.scale);const T=p.mesh.material.uniforms._NoodleDissolve;T!==void 0&&(T.value=g.dissolve??1);const C=tn(g.color,m.customColor??(m.colorIndex===1?t.rightNote:t.leftNote)),x=we(C);ht(p.mesh.material,"_ArcColor")?.set(x.r,x.g,x.b,g.color?.[3]??1);const P=p.mesh.material.uniforms._PlaybackBeat,O=p.mesh.material.uniforms._ClockSeconds;P!==void 0&&(P.value=y),O!==void 0&&(O.value=e*60/o.songBpm)}for(const d of this.instanceGroups)d.end()}clear(){for(const e of this.instanceGroups)this.root.remove(e.mesh),e.dispose();for(const e of this.arcEntries)this.root.remove(e.mesh),e.mesh.geometry.dispose();for(const e of this.ownedMaterials)e.dispose();this.noteBodies=this.arrows=this.decorativeArrows=this.arrowGlows=this.decorativeArrowGlows=[],this.circleGlows=this.links=[],this.bombs=this.wallCores=this.legacySolidWallCores=this.wallFrames=this.wallFakeGlows=null,this.wallCoreLowMaterial=this.wallCoreHighMaterial=null,this.wallCoreEntries=[],this.instanceGroups=[],this.arcEntries=[],this.noteReplayWindows=this.bombWindows=null,this.linkReplayWindows=null,this.wallWindows=this.arcWindows=null,this.ownedMaterials=[],this.noteColorMaterials=[],this.obstacleColorMaterials=[],this.noteLookStates.clear(),this.hitLine.visible=!1,this.data=null,this.colors=null,this.objectBeat=Number.NaN}dispose(){this.clear(),this.root.remove(this.hitLine),this.hitLine.geometry.dispose(),this.hitLine.material.dispose(),this.noteReflection.dispose(),this.sliderMistNoise.dispose(),this.obstacleDisplacementNoise.dispose()}composeAt(e,i,r,o,t,s,a=!1){const l=a?Yf(e,i):Do(e,i);this.position.set(r,o,-l),this.quaternion.setFromAxisAngle(E0,t*Tr),this.noodleObjectTransform.applyWorldRotation(this.pose,e.worldRotation),this.scale.setScalar(s),this.matrix.compose(this.position,this.quaternion,this.scale)}composeLookNoteAt(e,i,r,o,t,s,a,l,c,f,u,h,d,p){const m=this.noteLookState(e,l);h?s<m.lastSampleTime&&this.resetNoteLookState(m,e,l.length>0):l.length>0?this.advanceReplayNoteLook(m,e,t,s,a,l,f,p):this.advancePreviewNoteLook(m,e,t,i,a,p),this.composeAt(e,i,r,o,0,u,!0);const v=i<e.spawnBeat&&d.definitePosition!==void 0?this.spawnPosition.set(e.startX,e.startY,-Do(e,e.spawnBeat)):void 0;this.noodleObjectTransform.apply(this.pose,e.noodle,d,e.x,e.y,a.leftHanded,e.worldRotation,v,!0);const g=l.length>0?s:qt(i,a.songBpm);Math.abs(g-m.lastSampleTime)<1e-6?this.quaternion.copy(m.rotation):(this.noteLookRotation.apply(this.quaternion,m.rotation,this.quaternion,e.rotationDeg,t,e.x,this.position,e.y,l.length>0?this.poseHeadPosition.set(c.x,c.y,c.z-this.root.position.z):Ga,this.noodleObjectTransform.worldCorrection,(i-e.spawnBeat)/(e.hjdBeats*2)),h&&(m.rotation.copy(this.quaternion),m.lastSampleTime=s)),this.noodleObjectTransform.applyChildRotation(this.pose,this.quaternion)}noteLookState(e,i){let r=this.noteLookStates.get(e);const o=i.length>0;return r!==void 0?(r.usesReplayPoses!==o&&this.resetNoteLookState(r,e,o),r):(r={rotation:new ge,nextPreviewBeat:e.spawnBeat,lastSampleTime:Number.NEGATIVE_INFINITY,finished:!1,usesReplayPoses:o},this.noteLookStates.set(e,r),r)}advanceReplayNoteLook(e,i,r,o,t,s,a,l){o<e.lastSampleTime&&this.resetNoteLookState(e,i,!0);let c=e.lastSampleTime===Number.NEGATIVE_INFINITY?L0(s,qt(i.spawnBeat,t.songBpm)):R0(s,e.lastSampleTime);for(;!e.finished;){const f=s[c];if(f===void 0||f.time>o)return;if(f.time>=r){e.finished=!0;return}const u=Ys(f.time,t.songBpm);this.composeLookNoteBaseAt(i,u,t,l),a.headPositionForPose(f.head,this.poseHeadPosition,{root:jo(t.noodle,"Root",u,l,t.leftHanded),head:jo(t.noodle,"Head",u,l,t.leftHanded)},t.leftHanded),this.poseHeadPosition.z-=this.root.position.z,this.noteLookRotation.apply(e.rotation,e.rotation,this.quaternion,i.rotationDeg,r,i.x,this.position,i.y,this.poseHeadPosition,this.noodleObjectTransform.worldCorrection,(u-i.spawnBeat)/(i.hjdBeats*2)),e.lastSampleTime=f.time,c+=1}}resetNoteLookState(e,i,r){e.rotation.identity(),e.nextPreviewBeat=i.spawnBeat,e.lastSampleTime=Number.NEGATIVE_INFINITY,e.finished=!1,e.usesReplayPoses=r}advancePreviewNoteLook(e,i,r,o,t,s){const a=Ys(1/C0,t.songBpm);for(;!e.finished&&e.nextPreviewBeat<=o;){if(e.nextPreviewBeat>=i.beat){e.finished=!0;return}this.composeLookNoteBaseAt(i,e.nextPreviewBeat,t,s),this.noteLookRotation.apply(e.rotation,e.rotation,this.quaternion,i.rotationDeg,r,i.x,this.position,i.y,Ga,this.noodleObjectTransform.worldCorrection,(e.nextPreviewBeat-i.spawnBeat)/(i.hjdBeats*2)),e.lastSampleTime=qt(e.nextPreviewBeat,t.songBpm),e.nextPreviewBeat+=a}}composeLookNoteBaseAt(e,i,r,o){const t=e.hjdBeats*2,s=Bo(e,r.noodle,i,t,o,r.leftHanded),a=Uo(e,i,s,t),l=Yi(e,a),c=e.startX+(e.x-e.startX)*Ws(e,a),f=e.noodle?.disableGravity?e.y:e.startY+(e.y-e.startY)*l+zs(e,a,e.flipYSide);this.composeAt(e,a,c,f,0,on,!0);const u=i<e.spawnBeat&&s.definitePosition!==void 0?this.spawnPosition.set(e.startX,e.startY,-Do(e,e.spawnBeat)):void 0;this.noodleObjectTransform.apply(this.pose,e.noodle,s,e.x,e.y,r.leftHanded,e.worldRotation,u,!0)}setWallRootPosition(e,i,r,o){return this.quaternion.setFromAxisAngle(Ua,-e.rotationDeg*Tr),this.wallOffset.set(0,e.height*r/2,-Math.abs(e.lengthUnits)/2).applyQuaternion(this.quaternion),o.fromArray(i).sub(this.wallOffset)}}function L0(n,e){let i=0,r=n.length;for(;i<r;){const o=Math.floor((i+r)/2),t=n[o];t!==void 0&&t.time<e?i=o+1:r=o}return i}function R0(n,e){let i=0,r=n.length;for(;i<r;){const o=Math.floor((i+r)/2),t=n[o];t!==void 0&&t.time<=e?i=o+1:r=o}return i}class wc{position=new H;rotation=new ge;parentRotation=new ge;matrix=new be;basis=new be;basisInverse=new be;apply(e,i,r){if(i.absolute===!0){this.applyAbsolute(e,i,r);return}i.position!==void 0&&e.position.add(this.position.set(i.position[0]*.6*(r?-1:1),i.position[1]*.6,-i.position[2]*.6)),i.rotation!==void 0&&(Mo(this.rotation,i.rotation,r),e.position.applyQuaternion(this.rotation),e.quaternion.premultiply(this.rotation)),i.localRotation!==void 0&&(Mo(this.rotation,i.localRotation,r),e.quaternion.multiply(this.rotation)),i.scale!==void 0&&e.scale.multiply(this.position.fromArray(i.scale)),this.applyParent(e,i.parentMatrix,r)}applyAbsolute(e,i,r){if(i.localPosition!==void 0){const[o,t,s]=i.localPosition;e.position.set(o*(r?-1:1),t,-s)}if(i.localRotation!==void 0&&(Mo(this.rotation,i.localRotation,r),e.quaternion.copy(this.rotation)),i.scale!==void 0&&e.scale.fromArray(i.scale),this.applyParent(e,i.parentMatrix,r),i.localPosition===void 0&&i.position!==void 0){const[o,t,s]=i.position;this.position.set(o*(r?-1:1),t,-s),e.parent?.worldToLocal(this.position),e.position.copy(this.position)}i.localRotation===void 0&&i.rotation!==void 0&&(Mo(this.rotation,i.rotation,r),e.parent!==null&&(e.parent.getWorldQuaternion(this.parentRotation).invert(),this.rotation.premultiply(this.parentRotation)),e.quaternion.copy(this.rotation))}applyParent(e,i,r){i!==void 0&&(Mc(this.matrix,this.basis,this.basisInverse,i,r),e.updateMatrix(),e.matrix.premultiply(this.matrix),e.matrix.decompose(e.position,e.quaternion,e.scale))}}const O0=wn(n=>n instanceof Ue);function Ec(n){return Array.isArray(n.material)?n.material:[n.material]}function D0(n){let e=n;for(;e!==null;){if(!e.visible)return!1;e=e.parent}return!0}function F0(n){return Ec(n).some(e=>lc(e)==="mirror")}function I0(n){return Ec(n).some(e=>e.visible&&lc(e)==="mirror")}function k0(n){const e=[];return n.traverse(i=>{const r=O0.safeParse(i);r.success&&F0(r.data)&&e.push(r.data)}),e}function N0(n,e){return n.some(i=>e.layers.test(i.layers)&&D0(i)&&I0(i))}function B0(n=64){const e=n*n,i=new Float32Array(e);let r=1831565813;for(let a=0;a<e;a++)r^=r<<13,r^=r>>>17,r^=r<<5,i[a]=(r>>>0)/4294967295;const o=new Float32Array(e);for(let a=0;a<n;a++)for(let l=0;l<n;l++){let c=0;for(let u=-1;u<=1;u++)for(let h=-1;h<=1;h++){if(h===0&&u===0)continue;const d=(l+h+n)%n,p=(a+u+n)%n;c+=i[p*n+d]??0}const f=a*n+l;o[f]=(i[f]??0)-c/8}const t=Array.from({length:e},(a,l)=>l);t.sort((a,l)=>(o[a]??0)-(o[l]??0));const s=new Uint8Array(e*4);for(let a=0;a<e;a++){const l=t[a]??0,c=Math.round(a*255/Math.max(e-1,1)),f=l*4;s[f]=c,s[f+1]=c,s[f+2]=c,s[f+3]=255}return s}const za=928,U0=4,G0=3.98,W0=5,z0=.998,j0=1,H0=.0102,V0=.299,X0=.997,Y0=0;function Z0(n,e){return{width:za,height:Math.max(1,Math.floor(za*Math.max(e,1)/Math.max(n,1)))}}function ja(n,e){let{width:i,height:r}=Z0(n,e);const o=Math.log2(Math.max(i,r))+Math.min(W0,10)-10,t=Math.floor(o),s=Math.min(Math.max(t,1),16),a=[];for(let l=0;l<s;l++)a.push({width:i,height:r}),i=Math.max(Math.floor(i/2),1),r=Math.max(Math.floor(r/2),1);return{levels:a,sampleScale:.5+o-t}}function q0(n,e){const i=Math.min(1,(z0*(n+1)/(e-1))**H0);return{currentLevel:i,upsampled:Math.min(1,1+j0-i)}}const K0=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`,Cc=`
#ifndef BLOOM_TAP
#define BLOOM_TAP(tex, uv) texture2D(tex, uv)
#endif
vec4 downsample13(sampler2D tex, vec2 uv, vec2 texelSize) {
  vec4 a = BLOOM_TAP(tex, uv + texelSize * vec2(-1.0, -1.0));
  vec4 b = BLOOM_TAP(tex, uv + texelSize * vec2(0.0, -1.0));
  vec4 c = BLOOM_TAP(tex, uv + texelSize * vec2(1.0, -1.0));
  vec4 d = BLOOM_TAP(tex, uv + texelSize * vec2(-0.5, -0.5));
  vec4 e = BLOOM_TAP(tex, uv + texelSize * vec2(0.5, -0.5));
  vec4 f = BLOOM_TAP(tex, uv + texelSize * vec2(-1.0, 0.0));
  vec4 g = BLOOM_TAP(tex, uv);
  vec4 h = BLOOM_TAP(tex, uv + texelSize * vec2(1.0, 0.0));
  vec4 i = BLOOM_TAP(tex, uv + texelSize * vec2(-0.5, 0.5));
  vec4 j = BLOOM_TAP(tex, uv + texelSize * vec2(0.5, 0.5));
  vec4 k = BLOOM_TAP(tex, uv + texelSize * vec2(-1.0, 1.0));
  vec4 l = BLOOM_TAP(tex, uv + texelSize * vec2(0.0, 1.0));
  vec4 m = BLOOM_TAP(tex, uv + texelSize * vec2(1.0, 1.0));
  vec4 color = (d + e + i + j) * 0.124;
  color += (a + b + f + g) * 0.0315;
  color += (b + c + g + h) * 0.0315;
  color += (f + g + k + l) * 0.0315;
  color += (g + h + l + m) * 0.0315;
  return color;
}
`,J0=`
uniform sampler2D _SourceTex;
uniform vec2 _SourceTexelSize;
uniform float _AlphaWeights;
varying vec2 vUv;
// the game blooms from a unorm target, so stacked additive lights cap at 1;
// our scene target is half-float, clamp each source tap to match
#define BLOOM_TAP(tex, uv) clamp(texture2D(tex, uv), 0.0, 1.0)
${Cc}
void main() {
  vec4 color = downsample13(_SourceTex, vUv, _SourceTexelSize);
  color.rgb *= clamp(color.a * _AlphaWeights, 0.0, 1.0);
  gl_FragColor = color;
}
`,Q0=`
uniform sampler2D _SourceTex;
uniform vec2 _SourceTexelSize;
varying vec2 vUv;
${Cc}
void main() {
  gl_FragColor = downsample13(_SourceTex, vUv, _SourceTexelSize);
}
`,$0=`
uniform sampler2D _SourceTex;
uniform sampler2D _BloomTex;
uniform vec2 _SourceTexelSize;
uniform float _SampleScale;
uniform float _CombineSrc;
uniform float _CombineDst;
varying vec2 vUv;
void main() {
  vec2 d = _SourceTexelSize * _SampleScale;
  vec4 color = texture2D(_SourceTex, vUv + vec2(-d.x, -d.y)) * 0.99;
  color += texture2D(_SourceTex, vUv + vec2(0.0, -d.y)) * 2.01;
  color += texture2D(_SourceTex, vUv + vec2(d.x, -d.y)) * 0.99;
  color += texture2D(_SourceTex, vUv + vec2(-d.x, 0.0)) * 2.01;
  color += texture2D(_SourceTex, vUv) * 3.98;
  color += texture2D(_SourceTex, vUv + vec2(d.x, 0.0)) * 2.01;
  color += texture2D(_SourceTex, vUv + vec2(-d.x, d.y)) * 0.99;
  color += texture2D(_SourceTex, vUv + vec2(0.0, d.y)) * 2.01;
  color += texture2D(_SourceTex, vUv + d) * 0.99;
  vec4 upsampled = color / 15.98;
  gl_FragColor = texture2D(_BloomTex, vUv) * _CombineSrc + upsampled * _CombineDst;
}
`,ev=`
uniform sampler2D _SourceTex;
uniform sampler2D _BloomTex;
uniform sampler2D _BlueNoiseTex;
uniform vec2 _SourceTexelSize;
uniform vec2 _BlueNoiseScale;
uniform float _RandomValue;
uniform float _BloomIntensity;
uniform float _BaseColorBoost;
uniform float _BaseColorBoostThreshold;
uniform float _Fade;
varying vec2 vUv;
void main() {
  vec2 d = _SourceTexelSize * 0.5;
  float alpha = clamp(texture2D(_SourceTex, vUv + vec2(-d.x, d.y)).a, 0.0, 1.0);
  alpha += clamp(texture2D(_SourceTex, vUv + d).a, 0.0, 1.0);
  alpha += clamp(texture2D(_SourceTex, vUv - d).a, 0.0, 1.0);
  alpha += clamp(texture2D(_SourceTex, vUv + vec2(d.x, -d.y)).a, 0.0, 1.0);
  alpha *= 0.25;
  float whiteSignal = alpha * alpha * _BaseColorBoost - _BaseColorBoostThreshold;
  float whiteBoost = min(max(whiteSignal, 0.0), 1.0);
  vec3 color = min(texture2D(_SourceTex, vUv).rgb + vec3(whiteBoost), vec3(1.0));
  vec2 noiseUv = (vUv + vec2(0.103, 0.197)) * _BlueNoiseScale + vec2(_RandomValue);
  float noise = (texture2D(_BlueNoiseTex, noiseUv).r - 0.5) / 255.0;
  color += texture2D(_BloomTex, vUv).rgb * _BloomIntensity + vec3(noise);
  gl_FragColor = vec4(color * _Fade, 1.0);
  #include <colorspace_fragment>
  gl_FragColor.a = 1.0;
}
`;function tv(){const n=new _t;return n.setAttribute("position",new De(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),n.setAttribute("uv",new De(new Float32Array([0,0,2,0,0,2]),2)),n}function nn(n,e,i=!1){return new En(n,e,{type:_l,format:Wt,minFilter:Ve,magFilter:Ve,wrapS:Jt,wrapT:Jt,depthBuffer:i,stencilBuffer:i,...ec})}function rn(n,e){return new Ee({vertexShader:K0,fragmentShader:n,uniforms:e,depthTest:!1,depthWrite:!1})}function ov(){const e=new Jo(B0(64),64,64,Wt);return e.minFilter=_n,e.magFilter=_n,e.wrapS=Ot,e.wrapT=Ot,e.needsUpdate=!0,e}class iv{sceneTarget=nn(1,1,!0);screenDisplacementTarget=nn(1,1,!0);downs=Array.from({length:16},()=>nn(1,1));ups=Array.from({length:16},()=>nn(1,1));noiseTexture=ov();passScene=new Pi;passCamera=new Ai(-1,1,1,-1,0,1);passMesh;drawingBufferSize=new xe;clearColor=new Ke;layout=ja(1,1);noiseFrame=0;screenDisplacementEnabled=!0;screenDisplacementTexture={value:this.screenDisplacementTarget.texture};prefilterUniforms={_SourceTex:{value:this.sceneTarget.texture},_SourceTexelSize:{value:new xe},_AlphaWeights:{value:G0}};downsampleUniforms={_SourceTex:{value:this.sceneTarget.texture},_SourceTexelSize:{value:new xe}};upsampleUniforms={_SourceTex:{value:this.sceneTarget.texture},_BloomTex:{value:this.sceneTarget.texture},_SourceTexelSize:{value:new xe},_SampleScale:{value:this.layout.sampleScale},_CombineSrc:{value:1},_CombineDst:{value:1}};compositeUniforms={_SourceTex:{value:this.sceneTarget.texture},_BloomTex:{value:this.ups[0]?.texture??this.downs[0]?.texture},_BlueNoiseTex:{value:this.noiseTexture},_SourceTexelSize:{value:new xe(1,1)},_BlueNoiseScale:{value:new xe(1,1)},_RandomValue:{value:0},_BloomIntensity:{value:V0},_BaseColorBoost:{value:X0},_BaseColorBoostThreshold:{value:Y0},_Fade:{value:1}};prefilterMaterial=rn(J0,this.prefilterUniforms);downsampleMaterial=rn(Q0,this.downsampleUniforms);upsampleMaterial=rn($0,this.upsampleUniforms);compositeMaterial=rn(ev,this.compositeUniforms);constructor(){this.sceneTarget.samples=U0,this.passMesh=new Ue(tv(),this.prefilterMaterial),this.passMesh.frustumCulled=!1,this.passScene.add(this.passMesh),this.setSize(1,1)}setSize(e,i){this.screenDisplacementTarget.setSize(e,i),this.layout=ja(e,i),this.upsampleUniforms._SampleScale.value=this.layout.sampleScale,this.layout.levels.forEach((r,o)=>{this.downs[o]?.setSize(r.width,r.height),this.ups[o]?.setSize(r.width,r.height)})}setScreenDisplacementEnabled(e){this.screenDisplacementEnabled=e}render(e,i,r,o=!0){e.getDrawingBufferSize(this.drawingBufferSize);const t=Math.max(1,Math.floor(this.drawingBufferSize.x)),s=Math.max(1,Math.floor(this.drawingBufferSize.y));(this.sceneTarget.width!==t||this.sceneTarget.height!==s)&&(this.sceneTarget.setSize(t,s),this.setSize(t,s));const a=e.getRenderTarget(),l=e.autoClear;e.getClearColor(this.clearColor);const c=e.getClearAlpha();if(e.autoClear=!1,e.setClearColor(0,0),this.screenDisplacementEnabled&&o){const h=r.layers.mask;r.layers.disable(Ln),r.layers.disable(Di),e.setRenderTarget(this.screenDisplacementTarget),e.clear(!0,!0,!0),e.render(i,r),r.layers.mask=h}e.setRenderTarget(this.sceneTarget),e.clear(!0,!0,!0),e.render(i,r);let f=this.sceneTarget;for(const[h]of this.layout.levels.entries()){const d=this.downs[h];if(d===void 0)continue;const p=h===0?this.prefilterUniforms:this.downsampleUniforms;p._SourceTex.value=f.texture,p._SourceTexelSize.value.set(1/f.width,1/f.height),this.passMesh.material=h===0?this.prefilterMaterial:this.downsampleMaterial,e.setRenderTarget(d),e.render(this.passScene,this.passCamera),f=d}let u=f;for(let h=this.layout.levels.length-2;h>=0;h--){const d=this.downs[h],p=this.ups[h];if(d===void 0||p===void 0)continue;const m=q0(h,this.layout.levels.length);this.upsampleUniforms._SourceTex.value=f.texture,this.upsampleUniforms._BloomTex.value=d.texture,this.upsampleUniforms._SourceTexelSize.value.set(1/f.width,1/f.height),this.upsampleUniforms._CombineSrc.value=m.currentLevel,this.upsampleUniforms._CombineDst.value=m.upsampled,this.passMesh.material=this.upsampleMaterial,e.setRenderTarget(p),e.render(this.passScene,this.passCamera),f=p,u=p}this.noiseFrame++,this.compositeUniforms._BloomTex.value=u.texture,this.compositeUniforms._SourceTexelSize.value.set(1/t,1/s),this.compositeUniforms._BlueNoiseScale.value.set(t/64,s/64),this.compositeUniforms._RandomValue.value=this.noiseFrame*.61803398875%1,this.passMesh.material=this.compositeMaterial,e.setRenderTarget(a),e.setClearColor(this.clearColor,c),e.render(this.passScene,this.passCamera),e.autoClear=l}dispose(){this.sceneTarget.dispose(),this.screenDisplacementTarget.dispose();for(const e of[...this.downs,...this.ups])e.dispose();this.noiseTexture.dispose(),this.prefilterMaterial.dispose(),this.downsampleMaterial.dispose(),this.upsampleMaterial.dispose(),this.compositeMaterial.dispose(),this.passMesh.geometry.dispose()}}const sn=1.4,an=8,ln=1.7,Ha=50,cn=640,fn=480,nv=`
uniform sampler2D _SourceTex;
uniform sampler2D _DepthTex;
varying vec2 vUv;

void main() {
  vec4 color = texture2D(_SourceTex, vUv);
  float depthCoverage = 1.0 - step(0.999999, texture2D(_DepthTex, vUv).r);
  float colorCoverage = smoothstep(0.0, 0.01, max(max(color.r, color.g), color.b));
  float coverage = max(max(depthCoverage, color.a), colorCoverage);
  gl_FragColor = vec4(color.rgb, coverage);
  #include <colorspace_fragment>
}
`,rv=`
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;function sv(){const n=new _t;return n.setAttribute("position",new De(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),n.setAttribute("uv",new De(new Float32Array([0,0,2,0,0,2]),2)),n}class av{camera=new Ai(-ln*(cn/fn),ln*(cn/fn),ln,-ln,.01,Ha);depthTexture=new Zf(cn,fn);target=new En(cn,fn,{format:Wt,minFilter:Ve,magFilter:Ve,depthBuffer:!0,depthTexture:this.depthTexture,stencilBuffer:!1,samples:4});passScene=new Pi;passCamera=new Ai(-1,1,1,-1,0,1);passMaterial=new Ee({vertexShader:rv,fragmentShader:nv,uniforms:{_SourceTex:{value:this.target.texture},_DepthTex:{value:this.depthTexture}},depthTest:!1,depthWrite:!1,transparent:!0,blending:ot,blendEquation:Ae,blendSrc:Me,blendDst:Gt,blendEquationAlpha:Ae,blendSrcAlpha:Me,blendDstAlpha:Gt});passMesh=new Ue(sv(),this.passMaterial);rendererSize=new xe;previousViewport=new Be;previousScissor=new Be;previousClearColor=new Ke;view="back";constructor(){this.camera.layers.enable(Di),this.passMesh.frustumCulled=!1,this.passScene.add(this.passMesh),this.applyView()}setView(e){e!==this.view&&(this.view=e,this.applyView())}setHalfJumpDistance(e){const i=this.view==="back"&&e!==void 0?an+Ti+e:Ha;this.camera.far!==i&&(this.camera.far=i,this.camera.updateProjectionMatrix())}applyView(){switch(this.view){case"back":this.camera.position.set(0,sn,an);break;case"left":this.camera.position.set(-an,sn,0);break;case"right":this.camera.position.set(an,sn,0);break}this.camera.lookAt(0,sn,0)}viewport(e,i){const r=e.domElement.getBoundingClientRect(),o=i.getBoundingClientRect();if(r.width<=0||r.height<=0)return null;const t=Math.max(o.left,r.left),s=Math.min(o.right,r.right),a=Math.max(o.top,r.top),l=Math.min(o.bottom,r.bottom);if(s<=t||l<=a)return null;e.getSize(this.rendererSize);const c=this.rendererSize.x/r.width,f=this.rendererSize.y/r.height;return{x:Math.round((t-r.left)*c),y:Math.round((r.bottom-l)*f),width:Math.max(1,Math.round((s-t)*c)),height:Math.max(1,Math.round((l-a)*f))}}render(e,i,r){const o=this.viewport(e,r);if(o===null)return;const t=e.getRenderTarget(),s=e.autoClear,a=e.getScissorTest();e.getViewport(this.previousViewport),e.getScissor(this.previousScissor),e.getClearColor(this.previousClearColor);const l=e.getClearAlpha();try{e.autoClear=!1,e.setClearColor(0,0),e.setScissorTest(!1),e.setRenderTarget(this.target),e.clear(!0,!0,!0),e.render(i,this.camera),e.setRenderTarget(t),e.setViewport(o.x,o.y,o.width,o.height),e.setScissor(o.x,o.y,o.width,o.height),e.setScissorTest(!0),e.render(this.passScene,this.passCamera)}finally{e.setRenderTarget(t),e.setViewport(this.previousViewport),e.setScissor(this.previousScissor),e.setScissorTest(a),e.setClearColor(this.previousClearColor,l),e.autoClear=s}}dispose(){this.target.dispose(),this.passMaterial.dispose(),this.passMesh.geometry.dispose()}}function Va(n,e){const i=n[0],r=n.at(-1);if(i===void 0||r===void 0)return null;if(e<i.time)return{from:i,to:i,amount:0};if(e>=r.time)return{from:r,to:r,amount:0};let o=0,t=n.length-1;for(;o+1<t;){const c=Math.floor((o+t)/2),f=n[c];f!==void 0&&f.time<=e?o=c:t=c}const s=n[o]??i,a=n[t]??r,l=a.time-s.time;return{from:s,to:a,amount:l<=0?0:(e-s.time)/l}}const qo=1.05;function mo(n){return{keys:n.map(([e,i,r=0])=>({time:e,value:i,inSlope:r,outSlope:r}))}}const lv=mo([[0,0],[.6666667,20,30]]),cv=mo([[0,0],[.6666667,-20,-30]]),fv=mo([[0,.8],[.6666667,10,13.799999]]),uv=mo([[0,1],[.5833333,1],[.6666667,0]]),hv=mo([[0,.01],[.1,.02],[.43333334,.02],[.6666667,.013173884,-.022885125],[qo,.01]]),dv=mo([[0,.01],[.1,.02],[.43333334,.02],[.6666667,.0133923385,-.017910095],[qo,.01]]),pv=mo([[0,0],[.1,0],[.18333334,8],[.25,-8],[.31666666,8],[.43333334,0],[qo,0]]),mv=mo([[0,0],[.1,-2],[.43333334,-2],[.65,-.5336836,4.4348807],[qo,0]]),vv={linesVisible:!0,lineAlpha:1,lineScaleX:1,topLineX:0,bottomLineX:0,comboScaleX:1,comboScaleY:1,comboRotationDegrees:0,comboDepth:0};function gv(n){if(n===null||n<0)return vv;const e=Math.min(n,qo);return{linesVisible:n<qo,lineAlpha:He(uv,e),lineScaleX:He(fv,e)/.8,topLineX:He(lv,e),bottomLineX:He(cv,e),comboScaleX:He(hv,e)/.01,comboScaleY:He(dv,e)/.01,comboRotationDegrees:He(pv,e),comboDepth:He(mv,e)}}function yv(){var n=Object.create(null);function e(o,t){var s=o.id,a=o.name,l=o.dependencies;l===void 0&&(l=[]);var c=o.init;c===void 0&&(c=function(){});var f=o.getTransferables;if(f===void 0&&(f=null),!n[s])try{l=l.map(function(h){return h&&h.isWorkerModule&&(e(h,function(d){if(d instanceof Error)throw d}),h=n[h.id].value),h}),c=r("<"+a+">.init",c),f&&(f=r("<"+a+">.getTransferables",f));var u=null;typeof c=="function"?u=c.apply(void 0,l):console.error("worker module init function failed to rehydrate"),n[s]={id:s,value:u,getTransferables:f},t(u)}catch(h){h&&h.noLog||console.error(h),t(h)}}function i(o,t){var s,a=o.id,l=o.args;(!n[a]||typeof n[a].value!="function")&&t(new Error("Worker module "+a+": not found or its 'init' did not return a function"));try{var c=(s=n[a]).value.apply(s,l);c&&typeof c.then=="function"?c.then(f,function(u){return t(u instanceof Error?u:new Error(""+u))}):f(c)}catch(u){t(u)}function f(u){try{var h=n[a].getTransferables&&n[a].getTransferables(u);(!h||!Array.isArray(h)||!h.length)&&(h=void 0),t(u,h)}catch(d){console.error(d),t(d)}}}function r(o,t){var s=void 0;self.troikaDefine=function(l){return s=l};var a=URL.createObjectURL(new Blob(["/** "+o.replace(/\*/g,"")+` **/

troikaDefine(
`+t+`
)`],{type:"application/javascript"}));try{importScripts(a)}catch(l){console.error(l)}return URL.revokeObjectURL(a),delete self.troikaDefine,s}self.addEventListener("message",function(o){var t=o.data,s=t.messageId,a=t.action,l=t.data;try{a==="registerModule"&&e(l,function(c){c instanceof Error?postMessage({messageId:s,success:!1,error:c.message}):postMessage({messageId:s,success:!0,result:{isCallable:typeof c=="function"}})}),a==="callModule"&&i(l,function(c,f){c instanceof Error?postMessage({messageId:s,success:!1,error:c.message}):postMessage({messageId:s,success:!0,result:c},f||void 0)})}catch(c){postMessage({messageId:s,success:!1,error:c.stack})}})}function bv(n){var e=function(){for(var i=[],r=arguments.length;r--;)i[r]=arguments[r];return e._getInitResult().then(function(o){if(typeof o=="function")return o.apply(void 0,i);throw new Error("Worker module function was called but `init` did not return a callable function")})};return e._getInitResult=function(){var i=n.dependencies,r=n.init;i=Array.isArray(i)?i.map(function(t){return t&&(t=t.onMainThread||t,t._getInitResult&&(t=t._getInitResult())),t}):[];var o=Promise.all(i).then(function(t){return r.apply(null,t)});return e._getInitResult=function(){return o},o},e}var Pc=function(){var n=!1;if(typeof window<"u"&&typeof window.document<"u")try{var e=new Worker(URL.createObjectURL(new Blob([""],{type:"application/javascript"})));e.terminate(),n=!0}catch(i){console.log("Troika createWorkerModule: web workers not allowed; falling back to main thread execution. Cause: ["+i.message+"]")}return Pc=function(){return n},n},Sv=0,_v=0,xr=!1,wi=Object.create(null),Ei=Object.create(null),Wr=Object.create(null);function Qo(n){if((!n||typeof n.init!="function")&&!xr)throw new Error("requires `options.init` function");var e=n.dependencies,i=n.init,r=n.getTransferables,o=n.workerId,t=bv(n);o==null&&(o="#default");var s="workerModule"+ ++Sv,a=n.name||s,l=null;e=e&&e.map(function(f){return typeof f=="function"&&!f.workerModuleData&&(xr=!0,f=Qo({workerId:o,name:"<"+a+"> function dependency: "+f.name,init:`function(){return (
`+gn(f)+`
)}`}),xr=!1),f&&f.workerModuleData&&(f=f.workerModuleData),f});function c(){for(var f=[],u=arguments.length;u--;)f[u]=arguments[u];if(!Pc())return t.apply(void 0,f);if(!l){l=Xa(o,"registerModule",c.workerModuleData);var h=function(){l=null,Ei[o].delete(h)};(Ei[o]||(Ei[o]=new Set)).add(h)}return l.then(function(d){var p=d.isCallable;if(p)return Xa(o,"callModule",{id:s,args:f});throw new Error("Worker module function was called but `init` did not return a callable function")})}return c.workerModuleData={isWorkerModule:!0,id:s,name:a,dependencies:e,init:gn(i),getTransferables:r&&gn(r)},c.onMainThread=t,c}function Tv(n){Ei[n]&&Ei[n].forEach(function(e){e()}),wi[n]&&(wi[n].terminate(),delete wi[n])}function gn(n){var e=n.toString();return!/^function/.test(e)&&/^\w+\s*\(/.test(e)&&(e="function "+e),e}function xv(n){var e=wi[n];if(!e){var i=gn(yv);e=wi[n]=new Worker(URL.createObjectURL(new Blob(["/** Worker Module Bootstrap: "+n.replace(/\*/g,"")+` **/

;(`+i+")()"],{type:"application/javascript"}))),e.onmessage=function(r){var o=r.data,t=o.messageId,s=Wr[t];if(!s)throw new Error("WorkerModule response with empty or unknown messageId");delete Wr[t],s(o)}}return e}function Xa(n,e,i){return new Promise(function(r,o){var t=++_v;Wr[t]=function(s){s.success?r(s.result):o(new Error("Error in worker "+e+" call: "+s.error))},xv(n).postMessage({messageId:t,action:e,data:i})})}function Ac(){var n=(function(e){function i(U,I,w,M,R,F,D,z){var N=1-D;z.x=N*N*U+2*N*D*w+D*D*R,z.y=N*N*I+2*N*D*M+D*D*F}function r(U,I,w,M,R,F,D,z,N,G){var q=1-N;G.x=q*q*q*U+3*q*q*N*w+3*q*N*N*R+N*N*N*D,G.y=q*q*q*I+3*q*q*N*M+3*q*N*N*F+N*N*N*z}function o(U,I){for(var w=/([MLQCZ])([^MLQCZ]*)/g,M,R,F,D,z;M=w.exec(U);){var N=M[2].replace(/^\s*|\s*$/g,"").split(/[,\s]+/).map(function(G){return parseFloat(G)});switch(M[1]){case"M":D=R=N[0],z=F=N[1];break;case"L":(N[0]!==D||N[1]!==z)&&I("L",D,z,D=N[0],z=N[1]);break;case"Q":{I("Q",D,z,D=N[2],z=N[3],N[0],N[1]);break}case"C":{I("C",D,z,D=N[4],z=N[5],N[0],N[1],N[2],N[3]);break}case"Z":(D!==R||z!==F)&&I("L",D,z,R,F);break}}}function t(U,I,w){w===void 0&&(w=16);var M={x:0,y:0};o(U,function(R,F,D,z,N,G,q,Q,X){switch(R){case"L":I(F,D,z,N);break;case"Q":{for(var V=F,ue=D,ee=1;ee<w;ee++)i(F,D,G,q,z,N,ee/(w-1),M),I(V,ue,M.x,M.y),V=M.x,ue=M.y;break}case"C":{for(var te=F,ie=D,ce=1;ce<w;ce++)r(F,D,G,q,Q,X,z,N,ce/(w-1),M),I(te,ie,M.x,M.y),te=M.x,ie=M.y;break}}})}var s="precision highp float;attribute vec2 aUV;varying vec2 vUV;void main(){vUV=aUV;gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",a="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){gl_FragColor=texture2D(tex,vUV);}",l=new WeakMap,c={premultipliedAlpha:!1,preserveDrawingBuffer:!0,antialias:!1,depth:!1};function f(U,I){var w=U.getContext?U.getContext("webgl",c):U,M=l.get(w);if(!M){let q=function(te){var ie=F[te];if(!ie&&(ie=F[te]=w.getExtension(te),!ie))throw new Error(te+" not supported");return ie},Q=function(te,ie){var ce=w.createShader(ie);return w.shaderSource(ce,te),w.compileShader(ce),ce},X=function(te,ie,ce,Y){if(!D[te]){var ne={},oe={},j=w.createProgram();w.attachShader(j,Q(ie,w.VERTEX_SHADER)),w.attachShader(j,Q(ce,w.FRAGMENT_SHADER)),w.linkProgram(j),D[te]={program:j,transaction:function($){w.useProgram(j),$({setUniform:function(J,Ce){for(var re=[],ae=arguments.length-2;ae-- >0;)re[ae]=arguments[ae+2];var he=oe[Ce]||(oe[Ce]=w.getUniformLocation(j,Ce));w["uniform"+J].apply(w,[he].concat(re))},setAttribute:function(J,Ce,re,ae,he){var me=ne[J];me||(me=ne[J]={buf:w.createBuffer(),loc:w.getAttribLocation(j,J),data:null}),w.bindBuffer(w.ARRAY_BUFFER,me.buf),w.vertexAttribPointer(me.loc,Ce,w.FLOAT,!1,0,0),w.enableVertexAttribArray(me.loc),R?w.vertexAttribDivisor(me.loc,ae):q("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(me.loc,ae),he!==me.data&&(w.bufferData(w.ARRAY_BUFFER,he,re),me.data=he)}})}}}D[te].transaction(Y)},V=function(te,ie){N++;try{w.activeTexture(w.TEXTURE0+N);var ce=z[te];ce||(ce=z[te]=w.createTexture(),w.bindTexture(w.TEXTURE_2D,ce),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_MIN_FILTER,w.NEAREST),w.texParameteri(w.TEXTURE_2D,w.TEXTURE_MAG_FILTER,w.NEAREST)),w.bindTexture(w.TEXTURE_2D,ce),ie(ce,N)}finally{N--}},ue=function(te,ie,ce){var Y=w.createFramebuffer();G.push(Y),w.bindFramebuffer(w.FRAMEBUFFER,Y),w.activeTexture(w.TEXTURE0+ie),w.bindTexture(w.TEXTURE_2D,te),w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,te,0);try{ce(Y)}finally{w.deleteFramebuffer(Y),w.bindFramebuffer(w.FRAMEBUFFER,G[--G.length-1]||null)}},ee=function(){F={},D={},z={},N=-1,G.length=0};var R=typeof WebGL2RenderingContext<"u"&&w instanceof WebGL2RenderingContext,F={},D={},z={},N=-1,G=[];w.canvas.addEventListener("webglcontextlost",function(te){ee(),te.preventDefault()},!1),l.set(w,M={gl:w,isWebGL2:R,getExtension:q,withProgram:X,withTexture:V,withTextureFramebuffer:ue,handleContextLoss:ee})}I(M)}function u(U,I,w,M,R,F,D,z){D===void 0&&(D=15),z===void 0&&(z=null),f(U,function(N){var G=N.gl,q=N.withProgram,Q=N.withTexture;Q("copy",function(X,V){G.texImage2D(G.TEXTURE_2D,0,G.RGBA,R,F,0,G.RGBA,G.UNSIGNED_BYTE,I),q("copy",s,a,function(ue){var ee=ue.setUniform,te=ue.setAttribute;te("aUV",2,G.STATIC_DRAW,0,new Float32Array([0,0,2,0,0,2])),ee("1i","image",V),G.bindFramebuffer(G.FRAMEBUFFER,z||null),G.disable(G.BLEND),G.colorMask(D&8,D&4,D&2,D&1),G.viewport(w,M,R,F),G.scissor(w,M,R,F),G.drawArrays(G.TRIANGLES,0,3)})})})}function h(U,I,w){var M=U.width,R=U.height;f(U,function(F){var D=F.gl,z=new Uint8Array(M*R*4);D.readPixels(0,0,M,R,D.RGBA,D.UNSIGNED_BYTE,z),U.width=I,U.height=w,u(D,z,0,0,M,R)})}var d=Object.freeze({__proto__:null,withWebGLContext:f,renderImageData:u,resizeWebGLCanvasWithoutClearing:h});function p(U,I,w,M,R,F){F===void 0&&(F=1);var D=new Uint8Array(U*I),z=M[2]-M[0],N=M[3]-M[1],G=[];t(w,function(te,ie,ce,Y){G.push({x1:te,y1:ie,x2:ce,y2:Y,minX:Math.min(te,ce),minY:Math.min(ie,Y),maxX:Math.max(te,ce),maxY:Math.max(ie,Y)})}),G.sort(function(te,ie){return te.maxX-ie.maxX});for(var q=0;q<U;q++)for(var Q=0;Q<I;Q++){var X=ue(M[0]+z*(q+.5)/U,M[1]+N*(Q+.5)/I),V=Math.pow(1-Math.abs(X)/R,F)/2;X<0&&(V=1-V),V=Math.max(0,Math.min(255,Math.round(V*255))),D[Q*U+q]=V}return D;function ue(te,ie){for(var ce=1/0,Y=1/0,ne=G.length;ne--;){var oe=G[ne];if(oe.maxX+Y<=te)break;if(te+Y>oe.minX&&ie-Y<oe.maxY&&ie+Y>oe.minY){var j=g(te,ie,oe.x1,oe.y1,oe.x2,oe.y2);j<ce&&(ce=j,Y=Math.sqrt(ce))}}return ee(te,ie)&&(Y=-Y),Y}function ee(te,ie){for(var ce=0,Y=G.length;Y--;){var ne=G[Y];if(ne.maxX<=te)break;var oe=ne.y1>ie!=ne.y2>ie&&te<(ne.x2-ne.x1)*(ie-ne.y1)/(ne.y2-ne.y1)+ne.x1;oe&&(ce+=ne.y1<ne.y2?1:-1)}return ce!==0}}function m(U,I,w,M,R,F,D,z,N,G){F===void 0&&(F=1),z===void 0&&(z=0),N===void 0&&(N=0),G===void 0&&(G=0),v(U,I,w,M,R,F,D,null,z,N,G)}function v(U,I,w,M,R,F,D,z,N,G,q){F===void 0&&(F=1),N===void 0&&(N=0),G===void 0&&(G=0),q===void 0&&(q=0);for(var Q=p(U,I,w,M,R,F),X=new Uint8Array(Q.length*4),V=0;V<Q.length;V++)X[V*4+q]=Q[V];u(D,X,N,G,U,I,1<<3-q,z)}function g(U,I,w,M,R,F){var D=R-w,z=F-M,N=D*D+z*z,G=N?Math.max(0,Math.min(1,((U-w)*D+(I-M)*z)/N)):0,q=U-(w+G*D),Q=I-(M+G*z);return q*q+Q*Q}var y=Object.freeze({__proto__:null,generate:p,generateIntoCanvas:m,generateIntoFramebuffer:v}),S="precision highp float;uniform vec4 uGlyphBounds;attribute vec2 aUV;attribute vec4 aLineSegment;varying vec4 vLineSegment;varying vec2 vGlyphXY;void main(){vLineSegment=aLineSegment;vGlyphXY=mix(uGlyphBounds.xy,uGlyphBounds.zw,aUV);gl_Position=vec4(mix(vec2(-1.0),vec2(1.0),aUV),0.0,1.0);}",b="precision highp float;uniform vec4 uGlyphBounds;uniform float uMaxDistance;uniform float uExponent;varying vec4 vLineSegment;varying vec2 vGlyphXY;float absDistToSegment(vec2 point,vec2 lineA,vec2 lineB){vec2 lineDir=lineB-lineA;float lenSq=dot(lineDir,lineDir);float t=lenSq==0.0 ? 0.0 : clamp(dot(point-lineA,lineDir)/lenSq,0.0,1.0);vec2 linePt=lineA+t*lineDir;return distance(point,linePt);}void main(){vec4 seg=vLineSegment;vec2 p=vGlyphXY;float dist=absDistToSegment(p,seg.xy,seg.zw);float val=pow(1.0-clamp(dist/uMaxDistance,0.0,1.0),uExponent)*0.5;bool crossing=(seg.y>p.y!=seg.w>p.y)&&(p.x<(seg.z-seg.x)*(p.y-seg.y)/(seg.w-seg.y)+seg.x);bool crossingUp=crossing&&vLineSegment.y<vLineSegment.w;gl_FragColor=vec4(crossingUp ? 1.0/255.0 : 0.0,crossing&&!crossingUp ? 1.0/255.0 : 0.0,0.0,val);}",T="precision highp float;uniform sampler2D tex;varying vec2 vUV;void main(){vec4 color=texture2D(tex,vUV);bool inside=color.r!=color.g;float val=inside ? 1.0-color.a : color.a;gl_FragColor=vec4(val);}",C=new Float32Array([0,0,2,0,0,2]),x=null,P=!1,O={},E=new WeakMap;function k(U){if(!P&&!W(U))throw new Error("WebGL generation not supported")}function _(U,I,w,M,R,F,D){if(F===void 0&&(F=1),D===void 0&&(D=null),!D&&(D=x,!D)){var z=typeof OffscreenCanvas=="function"?new OffscreenCanvas(1,1):typeof document<"u"?document.createElement("canvas"):null;if(!z)throw new Error("OffscreenCanvas or DOM canvas not supported");D=x=z.getContext("webgl",{depth:!1})}k(D);var N=new Uint8Array(U*I*4);f(D,function(X){var V=X.gl,ue=X.withTexture,ee=X.withTextureFramebuffer;ue("readable",function(te,ie){V.texImage2D(V.TEXTURE_2D,0,V.RGBA,U,I,0,V.RGBA,V.UNSIGNED_BYTE,null),ee(te,ie,function(ce){A(U,I,w,M,R,F,V,ce,0,0,0),V.readPixels(0,0,U,I,V.RGBA,V.UNSIGNED_BYTE,N)})})});for(var G=new Uint8Array(U*I),q=0,Q=0;q<N.length;q+=4)G[Q++]=N[q];return G}function L(U,I,w,M,R,F,D,z,N,G){F===void 0&&(F=1),z===void 0&&(z=0),N===void 0&&(N=0),G===void 0&&(G=0),A(U,I,w,M,R,F,D,null,z,N,G)}function A(U,I,w,M,R,F,D,z,N,G,q){F===void 0&&(F=1),N===void 0&&(N=0),G===void 0&&(G=0),q===void 0&&(q=0),k(D);var Q=[];t(w,function(X,V,ue,ee){Q.push(X,V,ue,ee)}),Q=new Float32Array(Q),f(D,function(X){var V=X.gl,ue=X.isWebGL2,ee=X.getExtension,te=X.withProgram,ie=X.withTexture,ce=X.withTextureFramebuffer,Y=X.handleContextLoss;if(ie("rawDistances",function(ne,oe){(U!==ne._lastWidth||I!==ne._lastHeight)&&V.texImage2D(V.TEXTURE_2D,0,V.RGBA,ne._lastWidth=U,ne._lastHeight=I,0,V.RGBA,V.UNSIGNED_BYTE,null),te("main",S,b,function(j){var pe=j.setAttribute,$=j.setUniform,se=!ue&&ee("ANGLE_instanced_arrays"),J=!ue&&ee("EXT_blend_minmax");pe("aUV",2,V.STATIC_DRAW,0,C),pe("aLineSegment",4,V.DYNAMIC_DRAW,1,Q),$.apply(void 0,["4f","uGlyphBounds"].concat(M)),$("1f","uMaxDistance",R),$("1f","uExponent",F),ce(ne,oe,function(Ce){V.enable(V.BLEND),V.colorMask(!0,!0,!0,!0),V.viewport(0,0,U,I),V.scissor(0,0,U,I),V.blendFunc(V.ONE,V.ONE),V.blendEquationSeparate(V.FUNC_ADD,ue?V.MAX:J.MAX_EXT),V.clear(V.COLOR_BUFFER_BIT),ue?V.drawArraysInstanced(V.TRIANGLES,0,3,Q.length/4):se.drawArraysInstancedANGLE(V.TRIANGLES,0,3,Q.length/4)})}),te("post",s,T,function(j){j.setAttribute("aUV",2,V.STATIC_DRAW,0,C),j.setUniform("1i","tex",oe),V.bindFramebuffer(V.FRAMEBUFFER,z),V.disable(V.BLEND),V.colorMask(q===0,q===1,q===2,q===3),V.viewport(N,G,U,I),V.scissor(N,G,U,I),V.drawArrays(V.TRIANGLES,0,3)})}),V.isContextLost())throw Y(),new Error("webgl context lost")})}function W(U){var I=!U||U===x?O:U.canvas||U,w=E.get(I);if(w===void 0){P=!0;var M=null;try{var R=[97,106,97,61,99,137,118,80,80,118,137,99,61,97,106,97],F=_(4,4,"M8,8L16,8L24,24L16,24Z",[0,0,32,32],24,1,U);w=F&&R.length===F.length&&F.every(function(D,z){return D===R[z]}),w||(M="bad trial run results",console.info(R,F))}catch(D){w=!1,M=D.message}M&&console.warn("WebGL SDF generation not supported:",M),P=!1,E.set(I,w)}return w}var B=Object.freeze({__proto__:null,generate:_,generateIntoCanvas:L,generateIntoFramebuffer:A,isSupported:W});function Z(U,I,w,M,R,F){R===void 0&&(R=Math.max(M[2]-M[0],M[3]-M[1])/2),F===void 0&&(F=1);try{return _.apply(B,arguments)}catch(D){return console.info("WebGL SDF generation failed, falling back to JS",D),p.apply(y,arguments)}}function K(U,I,w,M,R,F,D,z,N,G){R===void 0&&(R=Math.max(M[2]-M[0],M[3]-M[1])/2),F===void 0&&(F=1),z===void 0&&(z=0),N===void 0&&(N=0),G===void 0&&(G=0);try{return L.apply(B,arguments)}catch(q){return console.info("WebGL SDF generation failed, falling back to JS",q),m.apply(y,arguments)}}return e.forEachPathCommand=o,e.generate=Z,e.generateIntoCanvas=K,e.javascript=y,e.pathToLineSegments=t,e.webgl=B,e.webglUtils=d,Object.defineProperty(e,"__esModule",{value:!0}),e})({});return n}function Mv(){var n=(function(e){var i={R:"13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",EN:"1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",ES:"17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",ET:"z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",AN:"16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",CS:"18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",B:"a,3,f+2,2v,690",S:"9,2,k",WS:"c,k,4f4,1vk+a,u,1j,335",ON:"x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",BN:"0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",NSM:"lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",AL:"16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",LRO:"6ct",RLO:"6cu",LRE:"6cq",RLE:"6cr",PDF:"6cs",LRI:"6ee",RLI:"6ef",FSI:"6eg",PDI:"6eh"},r={},o={};r.L=1,o[1]="L",Object.keys(i).forEach(function(Y,ne){r[Y]=1<<ne+1,o[r[Y]]=Y}),Object.freeze(r);var t=r.LRI|r.RLI|r.FSI,s=r.L|r.R|r.AL,a=r.B|r.S|r.WS|r.ON|r.FSI|r.LRI|r.RLI|r.PDI,l=r.BN|r.RLE|r.LRE|r.RLO|r.LRO|r.PDF,c=r.S|r.WS|r.B|t|r.PDI|l,f=null;function u(){if(!f){f=new Map;var Y=function(oe){if(i.hasOwnProperty(oe)){var j=0;i[oe].split(",").forEach(function(pe){var $=pe.split("+"),se=$[0],J=$[1];se=parseInt(se,36),J=J?parseInt(J,36):0,f.set(j+=se,r[oe]);for(var Ce=0;Ce<J;Ce++)f.set(++j,r[oe])})}};for(var ne in i)Y(ne)}}function h(Y){return u(),f.get(Y.codePointAt(0))||r.L}function d(Y){return o[h(Y)]}var p={pairs:"14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",canonical:"6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"};function m(Y,ne){var oe=36,j=0,pe=new Map,$=ne&&new Map,se;return Y.split(",").forEach(function J(Ce){if(Ce.indexOf("+")!==-1)for(var re=+Ce;re--;)J(se);else{se=Ce;var ae=Ce.split(">"),he=ae[0],me=ae[1];he=String.fromCodePoint(j+=parseInt(he,oe)),me=String.fromCodePoint(j+=parseInt(me,oe)),pe.set(he,me),ne&&$.set(me,he)}}),{map:pe,reverseMap:$}}var v,g,y;function S(){if(!v){var Y=m(p.pairs,!0),ne=Y.map,oe=Y.reverseMap;v=ne,g=oe,y=m(p.canonical,!1).map}}function b(Y){return S(),v.get(Y)||null}function T(Y){return S(),g.get(Y)||null}function C(Y){return S(),y.get(Y)||null}var x=r.L,P=r.R,O=r.EN,E=r.ES,k=r.ET,_=r.AN,L=r.CS,A=r.B,W=r.S,B=r.ON,Z=r.BN,K=r.NSM,U=r.AL,I=r.LRO,w=r.RLO,M=r.LRE,R=r.RLE,F=r.PDF,D=r.LRI,z=r.RLI,N=r.FSI,G=r.PDI;function q(Y,ne){for(var oe=125,j=new Uint32Array(Y.length),pe=0;pe<Y.length;pe++)j[pe]=h(Y[pe]);var $=new Map;function se(vt,Ct){var gt=j[vt];j[vt]=Ct,$.set(gt,$.get(gt)-1),gt&a&&$.set(a,$.get(a)-1),$.set(Ct,($.get(Ct)||0)+1),Ct&a&&$.set(a,($.get(a)||0)+1)}for(var J=new Uint8Array(Y.length),Ce=new Map,re=[],ae=null,he=0;he<Y.length;he++)ae||re.push(ae={start:he,end:Y.length-1,level:ne==="rtl"?1:ne==="ltr"?0:Ds(he,!1)}),j[he]&A&&(ae.end=he,ae=null);for(var me=R|M|w|I|t|G|F|A,Re=function(vt){return vt+(vt&1?1:2)},Ge=function(vt){return vt+(vt&1?2:1)},Se=0;Se<re.length;Se++){ae=re[Se];var _e=[{_level:ae.level,_override:0,_isolate:0}],fe=void 0,We=0,Fe=0,mt=0;$.clear();for(var Oe=ae.start;Oe<=ae.end;Oe++){var de=j[Oe];if(fe=_e[_e.length-1],$.set(de,($.get(de)||0)+1),de&a&&$.set(a,($.get(a)||0)+1),de&me)if(de&(R|M)){J[Oe]=fe._level;var Pe=(de===R?Ge:Re)(fe._level);Pe<=oe&&!We&&!Fe?_e.push({_level:Pe,_override:0,_isolate:0}):We||Fe++}else if(de&(w|I)){J[Oe]=fe._level;var $t=(de===w?Ge:Re)(fe._level);$t<=oe&&!We&&!Fe?_e.push({_level:$t,_override:de&w?P:x,_isolate:0}):We||Fe++}else if(de&t){de&N&&(de=Ds(Oe+1,!0)===1?z:D),J[Oe]=fe._level,fe._override&&se(Oe,fe._override);var Le=(de===z?Ge:Re)(fe._level);Le<=oe&&We===0&&Fe===0?(mt++,_e.push({_level:Le,_override:0,_isolate:1,_isolInitIndex:Oe})):We++}else if(de&G){if(We>0)We--;else if(mt>0){for(Fe=0;!_e[_e.length-1]._isolate;)_e.pop();var Te=_e[_e.length-1]._isolInitIndex;Te!=null&&(Ce.set(Te,Oe),Ce.set(Oe,Te)),_e.pop(),mt--}fe=_e[_e.length-1],J[Oe]=fe._level,fe._override&&se(Oe,fe._override)}else de&F?(We===0&&(Fe>0?Fe--:!fe._isolate&&_e.length>1&&(_e.pop(),fe=_e[_e.length-1])),J[Oe]=fe._level):de&A&&(J[Oe]=ae.level);else J[Oe]=fe._level,fe._override&&de!==Z&&se(Oe,fe._override)}for(var Ye=[],Ie=null,ve=ae.start;ve<=ae.end;ve++){var ke=j[ve];if(!(ke&l)){var lt=J[ve],rt=ke&t,Je=ke===G;Ie&&lt===Ie._level?(Ie._end=ve,Ie._endsWithIsolInit=rt):Ye.push(Ie={_start:ve,_end:ve,_level:lt,_startsWithPDI:Je,_endsWithIsolInit:rt})}}for(var wt=[],eo=0;eo<Ye.length;eo++){var Ht=Ye[eo];if(!Ht._startsWithPDI||Ht._startsWithPDI&&!Ce.has(Ht._start)){for(var to=[Ie=Ht],vo=void 0;Ie&&Ie._endsWithIsolInit&&(vo=Ce.get(Ie._end))!=null;)for(var Vt=eo+1;Vt<Ye.length;Vt++)if(Ye[Vt]._start===vo){to.push(Ie=Ye[Vt]);break}for(var ct=[],go=0;go<to.length;go++)for(var ds=to[go],Dn=ds._start;Dn<=ds._end;Dn++)ct.push(Dn);for(var Zc=J[ct[0]],ps=ae.level,Fi=ct[0]-1;Fi>=0;Fi--)if(!(j[Fi]&l)){ps=J[Fi];break}var Fn=ct[ct.length-1],qc=J[Fn],ms=ae.level;if(!(j[Fn]&t)){for(var Ii=Fn+1;Ii<=ae.end;Ii++)if(!(j[Ii]&l)){ms=J[Ii];break}}wt.push({_seqIndices:ct,_sosType:Math.max(ps,Zc)%2?P:x,_eosType:Math.max(ms,qc)%2?P:x})}}for(var In=0;In<wt.length;In++){var kn=wt[In],le=kn._seqIndices,$o=kn._sosType,Kc=kn._eosType,Ao=J[le[0]]&1?P:x;if($.get(K))for(var ki=0;ki<le.length;ki++){var vs=le[ki];if(j[vs]&K){for(var Nn=$o,Ni=ki-1;Ni>=0;Ni--)if(!(j[le[Ni]]&l)){Nn=j[le[Ni]];break}se(vs,Nn&(t|G)?B:Nn)}}if($.get(O))for(var Bi=0;Bi<le.length;Bi++){var gs=le[Bi];if(j[gs]&O)for(var Ui=Bi-1;Ui>=-1;Ui--){var ys=Ui===-1?$o:j[le[Ui]];if(ys&s){ys===U&&se(gs,_);break}}}if($.get(U))for(var Bn=0;Bn<le.length;Bn++){var bs=le[Bn];j[bs]&U&&se(bs,P)}if($.get(E)||$.get(L))for(var ei=1;ei<le.length-1;ei++){var Un=le[ei];if(j[Un]&(E|L)){for(var Lo=0,Gn=0,Wn=ei-1;Wn>=0&&(Lo=j[le[Wn]],!!(Lo&l));Wn--);for(var zn=ei+1;zn<le.length&&(Gn=j[le[zn]],!!(Gn&l));zn++);Lo===Gn&&(j[Un]===E?Lo===O:Lo&(O|_))&&se(Un,Lo)}}if($.get(O))for(var Ft=0;Ft<le.length;Ft++){var Jc=le[Ft];if(j[Jc]&O){for(var Gi=Ft-1;Gi>=0&&j[le[Gi]]&(k|l);Gi--)se(le[Gi],O);for(Ft++;Ft<le.length&&j[le[Ft]]&(k|l|O);Ft++)j[le[Ft]]!==O&&se(le[Ft],O)}}if($.get(k)||$.get(E)||$.get(L))for(var ti=0;ti<le.length;ti++){var Ss=le[ti];if(j[Ss]&(k|E|L)){se(Ss,B);for(var Wi=ti-1;Wi>=0&&j[le[Wi]]&l;Wi--)se(le[Wi],B);for(var zi=ti+1;zi<le.length&&j[le[zi]]&l;zi++)se(le[zi],B)}}if($.get(O))for(var jn=0,_s=$o;jn<le.length;jn++){var Ts=le[jn],Hn=j[Ts];Hn&O?_s===x&&se(Ts,x):Hn&s&&(_s=Hn)}if($.get(a)){var oi=P|O|_,xs=oi|x,ji=[];{for(var Ro=[],Oo=0;Oo<le.length;Oo++)if(j[le[Oo]]&a){var ii=Y[le[Oo]],Ms=void 0;if(b(ii)!==null)if(Ro.length<63)Ro.push({char:ii,seqIndex:Oo});else break;else if((Ms=T(ii))!==null)for(var ni=Ro.length-1;ni>=0;ni--){var Vn=Ro[ni].char;if(Vn===Ms||Vn===T(C(ii))||b(C(Vn))===ii){ji.push([Ro[ni].seqIndex,Oo]),Ro.length=ni;break}}}ji.sort(function(vt,Ct){return vt[0]-Ct[0]})}for(var Xn=0;Xn<ji.length;Xn++){for(var ws=ji[Xn],Hi=ws[0],Yn=ws[1],Es=!1,Et=0,Zn=Hi+1;Zn<Yn;Zn++){var Cs=le[Zn];if(j[Cs]&xs){Es=!0;var Ps=j[Cs]&oi?P:x;if(Ps===Ao){Et=Ps;break}}}if(Es&&!Et){Et=$o;for(var qn=Hi-1;qn>=0;qn--){var As=le[qn];if(j[As]&xs){var Ls=j[As]&oi?P:x;Ls!==Ao?Et=Ls:Et=Ao;break}}}if(Et){if(j[le[Hi]]=j[le[Yn]]=Et,Et!==Ao){for(var ri=Hi+1;ri<le.length;ri++)if(!(j[le[ri]]&l)){h(Y[le[ri]])&K&&(j[le[ri]]=Et);break}}if(Et!==Ao){for(var si=Yn+1;si<le.length;si++)if(!(j[le[si]]&l)){h(Y[le[si]])&K&&(j[le[si]]=Et);break}}}}for(var oo=0;oo<le.length;oo++)if(j[le[oo]]&a){for(var Rs=oo,Kn=oo,Jn=$o,ai=oo-1;ai>=0;ai--)if(j[le[ai]]&l)Rs=ai;else{Jn=j[le[ai]]&oi?P:x;break}for(var Os=Kc,li=oo+1;li<le.length;li++)if(j[le[li]]&(a|l))Kn=li;else{Os=j[le[li]]&oi?P:x;break}for(var Qn=Rs;Qn<=Kn;Qn++)j[le[Qn]]=Jn===Os?Jn:Ao;oo=Kn}}}for(var bt=ae.start;bt<=ae.end;bt++){var Qc=J[bt],Vi=j[bt];if(Qc&1?Vi&(x|O|_)&&J[bt]++:Vi&P?J[bt]++:Vi&(_|O)&&(J[bt]+=2),Vi&l&&(J[bt]=bt===0?ae.level:J[bt-1]),bt===ae.end||h(Y[bt])&(W|A))for(var Xi=bt;Xi>=0&&h(Y[Xi])&c;Xi--)J[Xi]=ae.level}}return{levels:J,paragraphs:re};function Ds(vt,Ct){for(var gt=vt;gt<Y.length;gt++){var io=j[gt];if(io&(P|U))return 1;if(io&(A|x)||Ct&&io===G)return 0;if(io&t){var Fs=$c(gt);gt=Fs===-1?Y.length:Fs}}return 0}function $c(vt){for(var Ct=1,gt=vt+1;gt<Y.length;gt++){var io=j[gt];if(io&A)break;if(io&G){if(--Ct===0)return gt}else io&t&&Ct++}return-1}}var Q="14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1",X;function V(){if(!X){var Y=m(Q,!0),ne=Y.map,oe=Y.reverseMap;oe.forEach(function(j,pe){ne.set(pe,j)}),X=ne}}function ue(Y){return V(),X.get(Y)||null}function ee(Y,ne,oe,j){var pe=Y.length;oe=Math.max(0,oe==null?0:+oe),j=Math.min(pe-1,j==null?pe-1:+j);for(var $=new Map,se=oe;se<=j;se++)if(ne[se]&1){var J=ue(Y[se]);J!==null&&$.set(se,J)}return $}function te(Y,ne,oe,j){var pe=Y.length;oe=Math.max(0,oe==null?0:+oe),j=Math.min(pe-1,j==null?pe-1:+j);var $=[];return ne.paragraphs.forEach(function(se){var J=Math.max(oe,se.start),Ce=Math.min(j,se.end);if(J<Ce){for(var re=ne.levels.slice(J,Ce+1),ae=Ce;ae>=J&&h(Y[ae])&c;ae--)re[ae]=se.level;for(var he=se.level,me=1/0,Re=0;Re<re.length;Re++){var Ge=re[Re];Ge>he&&(he=Ge),Ge<me&&(me=Ge|1)}for(var Se=he;Se>=me;Se--)for(var _e=0;_e<re.length;_e++)if(re[_e]>=Se){for(var fe=_e;_e+1<re.length&&re[_e+1]>=Se;)_e++;_e>fe&&$.push([fe+J,_e+J])}}}),$}function ie(Y,ne,oe,j){var pe=ce(Y,ne,oe,j),$=[].concat(Y);return pe.forEach(function(se,J){$[J]=(ne.levels[se]&1?ue(Y[se]):null)||Y[se]}),$.join("")}function ce(Y,ne,oe,j){for(var pe=te(Y,ne,oe,j),$=[],se=0;se<Y.length;se++)$[se]=se;return pe.forEach(function(J){for(var Ce=J[0],re=J[1],ae=$.slice(Ce,re+1),he=ae.length;he--;)$[re-he]=ae[he]}),$}return e.closingToOpeningBracket=T,e.getBidiCharType=h,e.getBidiCharTypeName=d,e.getCanonicalBracket=C,e.getEmbeddingLevels=q,e.getMirroredCharacter=ue,e.getMirroredCharactersMap=ee,e.getReorderSegments=te,e.getReorderedIndices=ce,e.getReorderedString=ie,e.openingToClosingBracket=b,Object.defineProperty(e,"__esModule",{value:!0}),e})({});return n}const Lc=/\bvoid\s+main\s*\(\s*\)\s*{/g;function zr(n){const e=/^[ \t]*#include +<([\w\d./]+)>/gm;function i(r,o){let t=$f[o];return t?zr(t):r}return n.replace(e,i)}const et=[];for(let n=0;n<256;n++)et[n]=(n<16?"0":"")+n.toString(16);function wv(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(et[n&255]+et[n>>8&255]+et[n>>16&255]+et[n>>24&255]+"-"+et[e&255]+et[e>>8&255]+"-"+et[e>>16&15|64]+et[e>>24&255]+"-"+et[i&63|128]+et[i>>8&255]+"-"+et[i>>16&255]+et[i>>24&255]+et[r&255]+et[r>>8&255]+et[r>>16&255]+et[r>>24&255]).toUpperCase()}const So=Object.assign||function(){let n=arguments[0];for(let e=1,i=arguments.length;e<i;e++){let r=arguments[e];if(r)for(let o in r)Object.prototype.hasOwnProperty.call(r,o)&&(n[o]=r[o])}return n},Ev=Date.now(),Ya=new WeakMap,Za=new Map;let Cv=1e10;function jr(n,e){const i=Rv(e);let r=Ya.get(n);if(r||Ya.set(n,r=Object.create(null)),r[i])return new r[i];const o=`_onBeforeCompile${i}`,t=function(c,f){n.onBeforeCompile.call(this,c,f);const u=this.customProgramCacheKey()+"|"+c.vertexShader+"|"+c.fragmentShader;let h=Za[u];if(!h){const d=Pv(this,c,e,i);h=Za[u]=d}c.vertexShader=h.vertexShader,c.fragmentShader=h.fragmentShader,So(c.uniforms,this.uniforms),e.timeUniform&&(c.uniforms[e.timeUniform]={get value(){return Date.now()-Ev}}),this[o]&&this[o](c)},s=function(){return a(e.chained?n:n.clone())},a=function(c){const f=Object.create(c,l);return Object.defineProperty(f,"baseMaterial",{value:n}),Object.defineProperty(f,"id",{value:Cv++}),f.uuid=wv(),f.uniforms=So({},c.uniforms,e.uniforms),f.defines=So({},c.defines,e.defines),f.defines[`TROIKA_DERIVED_MATERIAL_${i}`]="",f.extensions=So({},c.extensions,e.extensions),f._listeners=void 0,f},l={constructor:{value:s},isDerivedMaterial:{value:!0},type:{get:()=>n.type,set:c=>{n.type=c}},isDerivedFrom:{writable:!0,configurable:!0,value:function(c){const f=this.baseMaterial;return c===f||f.isDerivedMaterial&&f.isDerivedFrom(c)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return n.customProgramCacheKey()+"|"+i}},onBeforeCompile:{get(){return t},set(c){this[o]=c}},copy:{writable:!0,configurable:!0,value:function(c){return n.copy.call(this,c),!n.isShaderMaterial&&!n.isDerivedMaterial&&(So(this.extensions,c.extensions),So(this.defines,c.defines),So(this.uniforms,Qf.clone(c.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const c=new n.constructor;return a(c).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let c=this._depthMaterial;return c||(c=this._depthMaterial=jr(n.isDerivedMaterial?n.getDepthMaterial():new Kf({depthPacking:Jf}),e),c.defines.IS_DEPTH_MATERIAL="",c.uniforms=this.uniforms),c}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let c=this._distanceMaterial;return c||(c=this._distanceMaterial=jr(n.isDerivedMaterial?n.getDistanceMaterial():new qf,e),c.defines.IS_DISTANCE_MATERIAL="",c.uniforms=this.uniforms),c}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:c,_distanceMaterial:f}=this;c&&c.dispose(),f&&f.dispose(),n.dispose.call(this)}}};return r[i]=s,new s}function Pv(n,{vertexShader:e,fragmentShader:i},r,o){let{vertexDefs:t,vertexMainIntro:s,vertexMainOutro:a,vertexTransform:l,fragmentDefs:c,fragmentMainIntro:f,fragmentMainOutro:u,fragmentColorTransform:h,customRewriter:d,timeUniform:p}=r;if(t=t||"",s=s||"",a=a||"",c=c||"",f=f||"",u=u||"",(l||d)&&(e=zr(e)),(h||d)&&(i=i.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),i=zr(i)),d){let m=d({vertexShader:e,fragmentShader:i});e=m.vertexShader,i=m.fragmentShader}if(h){let m=[];i=i.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,v=>(m.push(v),"")),u=`${h}
${m.join(`
`)}
${u}`}if(p){const m=`
uniform float ${p};
`;t=m+t,c=m+c}return l&&(e=`vec3 troika_position_${o};
vec3 troika_normal_${o};
vec2 troika_uv_${o};
${e}
`,t=`${t}
void troikaVertexTransform${o}() {
  vec3 position = troika_position_${o};
  vec3 normal = troika_normal_${o};
  vec2 uv = troika_uv_${o};
  ${l}
  troika_position_${o} = position;
  troika_normal_${o} = normal;
  troika_uv_${o} = uv;
}
`,s=`
troika_position_${o} = vec3(position);
troika_normal_${o} = vec3(normal);
troika_uv_${o} = vec2(uv);
troikaVertexTransform${o}();
${s}
`,e=e.replace(/\b(position|normal|uv)\b/g,(m,v,g,y)=>/\battribute\s+vec[23]\s+$/.test(y.substr(0,g))?v:`troika_${v}_${o}`),n.map&&n.map.channel>0||(e=e.replace(/\bMAP_UV\b/g,`troika_uv_${o}`))),e=qa(e,o,t,s,a),i=qa(i,o,c,f,u),{vertexShader:e,fragmentShader:i}}function qa(n,e,i,r,o){return(r||o||i)&&(n=n.replace(Lc,`
${i}
void troikaOrigMain${e}() {`),n+=`
void main() {
  ${r}
  troikaOrigMain${e}();
  ${o}
}`),n}function Av(n,e){return n==="uniforms"?void 0:typeof e=="function"?e.toString():e}let Lv=0;const Ka=new Map;function Rv(n){const e=JSON.stringify(n,Av);let i=Ka.get(e);return i==null&&Ka.set(e,i=++Lv),i}function Ov(){return typeof window>"u"&&(self.window=self),(function(n){var e={parse:function(o){var t=e._bin,s=new Uint8Array(o);if(t.readASCII(s,0,4)=="ttcf"){var a=4;t.readUshort(s,a),a+=2,t.readUshort(s,a),a+=2;var l=t.readUint(s,a);a+=4;for(var c=[],f=0;f<l;f++){var u=t.readUint(s,a);a+=4,c.push(e._readFont(s,u))}return c}return[e._readFont(s,0)]},_readFont:function(o,t){var s=e._bin,a=t;s.readFixed(o,t),t+=4;var l=s.readUshort(o,t);t+=2,s.readUshort(o,t),t+=2,s.readUshort(o,t),t+=2,s.readUshort(o,t),t+=2;for(var c=["cmap","head","hhea","maxp","hmtx","name","OS/2","post","loca","glyf","kern","CFF ","GDEF","GPOS","GSUB","SVG "],f={_data:o,_offset:a},u={},h=0;h<l;h++){var d=s.readASCII(o,t,4);t+=4,s.readUint(o,t),t+=4;var p=s.readUint(o,t);t+=4;var m=s.readUint(o,t);t+=4,u[d]={offset:p,length:m}}for(h=0;h<c.length;h++){var v=c[h];u[v]&&(f[v.trim()]=e[v.trim()].parse(o,u[v].offset,u[v].length,f))}return f},_tabOffset:function(o,t,s){for(var a=e._bin,l=a.readUshort(o,s+4),c=s+12,f=0;f<l;f++){var u=a.readASCII(o,c,4);c+=4,a.readUint(o,c),c+=4;var h=a.readUint(o,c);if(c+=4,a.readUint(o,c),c+=4,u==t)return h}return 0}};e._bin={readFixed:function(o,t){return(o[t]<<8|o[t+1])+(o[t+2]<<8|o[t+3])/65540},readF2dot14:function(o,t){return e._bin.readShort(o,t)/16384},readInt:function(o,t){return e._bin._view(o).getInt32(t)},readInt8:function(o,t){return e._bin._view(o).getInt8(t)},readShort:function(o,t){return e._bin._view(o).getInt16(t)},readUshort:function(o,t){return e._bin._view(o).getUint16(t)},readUshorts:function(o,t,s){for(var a=[],l=0;l<s;l++)a.push(e._bin.readUshort(o,t+2*l));return a},readUint:function(o,t){return e._bin._view(o).getUint32(t)},readUint64:function(o,t){return 4294967296*e._bin.readUint(o,t)+e._bin.readUint(o,t+4)},readASCII:function(o,t,s){for(var a="",l=0;l<s;l++)a+=String.fromCharCode(o[t+l]);return a},readUnicode:function(o,t,s){for(var a="",l=0;l<s;l++){var c=o[t++]<<8|o[t++];a+=String.fromCharCode(c)}return a},_tdec:typeof window<"u"&&window.TextDecoder?new window.TextDecoder:null,readUTF8:function(o,t,s){var a=e._bin._tdec;return a&&t==0&&s==o.length?a.decode(o):e._bin.readASCII(o,t,s)},readBytes:function(o,t,s){for(var a=[],l=0;l<s;l++)a.push(o[t+l]);return a},readASCIIArray:function(o,t,s){for(var a=[],l=0;l<s;l++)a.push(String.fromCharCode(o[t+l]));return a},_view:function(o){return o._dataView||(o._dataView=o.buffer?new DataView(o.buffer,o.byteOffset,o.byteLength):new DataView(new Uint8Array(o).buffer))}},e._lctf={},e._lctf.parse=function(o,t,s,a,l){var c=e._bin,f={},u=t;c.readFixed(o,t),t+=4;var h=c.readUshort(o,t);t+=2;var d=c.readUshort(o,t);t+=2;var p=c.readUshort(o,t);return t+=2,f.scriptList=e._lctf.readScriptList(o,u+h),f.featureList=e._lctf.readFeatureList(o,u+d),f.lookupList=e._lctf.readLookupList(o,u+p,l),f},e._lctf.readLookupList=function(o,t,s){var a=e._bin,l=t,c=[],f=a.readUshort(o,t);t+=2;for(var u=0;u<f;u++){var h=a.readUshort(o,t);t+=2;var d=e._lctf.readLookupTable(o,l+h,s);c.push(d)}return c},e._lctf.readLookupTable=function(o,t,s){var a=e._bin,l=t,c={tabs:[]};c.ltype=a.readUshort(o,t),t+=2,c.flag=a.readUshort(o,t),t+=2;var f=a.readUshort(o,t);t+=2;for(var u=c.ltype,h=0;h<f;h++){var d=a.readUshort(o,t);t+=2;var p=s(o,u,l+d,c);c.tabs.push(p)}return c},e._lctf.numOfOnes=function(o){for(var t=0,s=0;s<32;s++)(o>>>s&1)!=0&&t++;return t},e._lctf.readClassDef=function(o,t){var s=e._bin,a=[],l=s.readUshort(o,t);if(t+=2,l==1){var c=s.readUshort(o,t);t+=2;var f=s.readUshort(o,t);t+=2;for(var u=0;u<f;u++)a.push(c+u),a.push(c+u),a.push(s.readUshort(o,t)),t+=2}if(l==2){var h=s.readUshort(o,t);for(t+=2,u=0;u<h;u++)a.push(s.readUshort(o,t)),t+=2,a.push(s.readUshort(o,t)),t+=2,a.push(s.readUshort(o,t)),t+=2}return a},e._lctf.getInterval=function(o,t){for(var s=0;s<o.length;s+=3){var a=o[s],l=o[s+1];if(o[s+2],a<=t&&t<=l)return s}return-1},e._lctf.readCoverage=function(o,t){var s=e._bin,a={};a.fmt=s.readUshort(o,t),t+=2;var l=s.readUshort(o,t);return t+=2,a.fmt==1&&(a.tab=s.readUshorts(o,t,l)),a.fmt==2&&(a.tab=s.readUshorts(o,t,3*l)),a},e._lctf.coverageIndex=function(o,t){var s=o.tab;if(o.fmt==1)return s.indexOf(t);if(o.fmt==2){var a=e._lctf.getInterval(s,t);if(a!=-1)return s[a+2]+(t-s[a])}return-1},e._lctf.readFeatureList=function(o,t){var s=e._bin,a=t,l=[],c=s.readUshort(o,t);t+=2;for(var f=0;f<c;f++){var u=s.readASCII(o,t,4);t+=4;var h=s.readUshort(o,t);t+=2;var d=e._lctf.readFeatureTable(o,a+h);d.tag=u.trim(),l.push(d)}return l},e._lctf.readFeatureTable=function(o,t){var s=e._bin,a=t,l={},c=s.readUshort(o,t);t+=2,c>0&&(l.featureParams=a+c);var f=s.readUshort(o,t);t+=2,l.tab=[];for(var u=0;u<f;u++)l.tab.push(s.readUshort(o,t+2*u));return l},e._lctf.readScriptList=function(o,t){var s=e._bin,a=t,l={},c=s.readUshort(o,t);t+=2;for(var f=0;f<c;f++){var u=s.readASCII(o,t,4);t+=4;var h=s.readUshort(o,t);t+=2,l[u.trim()]=e._lctf.readScriptTable(o,a+h)}return l},e._lctf.readScriptTable=function(o,t){var s=e._bin,a=t,l={},c=s.readUshort(o,t);t+=2,c>0&&(l.default=e._lctf.readLangSysTable(o,a+c));var f=s.readUshort(o,t);t+=2;for(var u=0;u<f;u++){var h=s.readASCII(o,t,4);t+=4;var d=s.readUshort(o,t);t+=2,l[h.trim()]=e._lctf.readLangSysTable(o,a+d)}return l},e._lctf.readLangSysTable=function(o,t){var s=e._bin,a={};s.readUshort(o,t),t+=2,a.reqFeature=s.readUshort(o,t),t+=2;var l=s.readUshort(o,t);return t+=2,a.features=s.readUshorts(o,t,l),a},e.CFF={},e.CFF.parse=function(o,t,s){var a=e._bin;(o=new Uint8Array(o.buffer,t,s))[t=0],o[++t],o[++t],o[++t],t++;var l=[];t=e.CFF.readIndex(o,t,l);for(var c=[],f=0;f<l.length-1;f++)c.push(a.readASCII(o,t+l[f],l[f+1]-l[f]));t+=l[l.length-1];var u=[];t=e.CFF.readIndex(o,t,u);var h=[];for(f=0;f<u.length-1;f++)h.push(e.CFF.readDict(o,t+u[f],t+u[f+1]));t+=u[u.length-1];var d=h[0],p=[];t=e.CFF.readIndex(o,t,p);var m=[];for(f=0;f<p.length-1;f++)m.push(a.readASCII(o,t+p[f],p[f+1]-p[f]));if(t+=p[p.length-1],e.CFF.readSubrs(o,t,d),d.CharStrings){t=d.CharStrings,p=[],t=e.CFF.readIndex(o,t,p);var v=[];for(f=0;f<p.length-1;f++)v.push(a.readBytes(o,t+p[f],p[f+1]-p[f]));d.CharStrings=v}if(d.ROS){t=d.FDArray;var g=[];for(t=e.CFF.readIndex(o,t,g),d.FDArray=[],f=0;f<g.length-1;f++){var y=e.CFF.readDict(o,t+g[f],t+g[f+1]);e.CFF._readFDict(o,y,m),d.FDArray.push(y)}t+=g[g.length-1],t=d.FDSelect,d.FDSelect=[];var S=o[t];if(t++,S!=3)throw S;var b=a.readUshort(o,t);for(t+=2,f=0;f<b+1;f++)d.FDSelect.push(a.readUshort(o,t),o[t+2]),t+=3}return d.Encoding&&(d.Encoding=e.CFF.readEncoding(o,d.Encoding,d.CharStrings.length)),d.charset&&(d.charset=e.CFF.readCharset(o,d.charset,d.CharStrings.length)),e.CFF._readFDict(o,d,m),d},e.CFF._readFDict=function(o,t,s){var a;for(var l in t.Private&&(a=t.Private[1],t.Private=e.CFF.readDict(o,a,a+t.Private[0]),t.Private.Subrs&&e.CFF.readSubrs(o,a+t.Private.Subrs,t.Private)),t)["FamilyName","FontName","FullName","Notice","version","Copyright"].indexOf(l)!=-1&&(t[l]=s[t[l]-426+35])},e.CFF.readSubrs=function(o,t,s){var a=e._bin,l=[];t=e.CFF.readIndex(o,t,l);var c,f=l.length;c=f<1240?107:f<33900?1131:32768,s.Bias=c,s.Subrs=[];for(var u=0;u<l.length-1;u++)s.Subrs.push(a.readBytes(o,t+l[u],l[u+1]-l[u]))},e.CFF.tableSE=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,0,111,112,113,114,0,115,116,117,118,119,120,121,122,0,123,0,124,125,126,127,128,129,130,131,0,132,133,0,134,135,136,137,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,138,0,139,0,0,0,0,140,141,142,143,0,0,0,0,0,144,0,0,0,145,0,0,146,147,148,149,0,0,0,0],e.CFF.glyphByUnicode=function(o,t){for(var s=0;s<o.charset.length;s++)if(o.charset[s]==t)return s;return-1},e.CFF.glyphBySE=function(o,t){return t<0||t>255?-1:e.CFF.glyphByUnicode(o,e.CFF.tableSE[t])},e.CFF.readEncoding=function(o,t,s){e._bin;var a=[".notdef"],l=o[t];if(t++,l!=0)throw"error: unknown encoding format: "+l;var c=o[t];t++;for(var f=0;f<c;f++)a.push(o[t+f]);return a},e.CFF.readCharset=function(o,t,s){var a=e._bin,l=[".notdef"],c=o[t];if(t++,c==0)for(var f=0;f<s;f++){var u=a.readUshort(o,t);t+=2,l.push(u)}else{if(c!=1&&c!=2)throw"error: format: "+c;for(;l.length<s;){u=a.readUshort(o,t),t+=2;var h=0;for(c==1?(h=o[t],t++):(h=a.readUshort(o,t),t+=2),f=0;f<=h;f++)l.push(u),u++}}return l},e.CFF.readIndex=function(o,t,s){var a=e._bin,l=a.readUshort(o,t)+1,c=o[t+=2];if(t++,c==1)for(var f=0;f<l;f++)s.push(o[t+f]);else if(c==2)for(f=0;f<l;f++)s.push(a.readUshort(o,t+2*f));else if(c==3)for(f=0;f<l;f++)s.push(16777215&a.readUint(o,t+3*f-1));else if(l!=1)throw"unsupported offset size: "+c+", count: "+l;return(t+=l*c)-1},e.CFF.getCharString=function(o,t,s){var a=e._bin,l=o[t],c=o[t+1];o[t+2],o[t+3],o[t+4];var f=1,u=null,h=null;l<=20&&(u=l,f=1),l==12&&(u=100*l+c,f=2),21<=l&&l<=27&&(u=l,f=1),l==28&&(h=a.readShort(o,t+1),f=3),29<=l&&l<=31&&(u=l,f=1),32<=l&&l<=246&&(h=l-139,f=1),247<=l&&l<=250&&(h=256*(l-247)+c+108,f=2),251<=l&&l<=254&&(h=256*-(l-251)-c-108,f=2),l==255&&(h=a.readInt(o,t+1)/65535,f=5),s.val=h??"o"+u,s.size=f},e.CFF.readCharString=function(o,t,s){for(var a=t+s,l=e._bin,c=[];t<a;){var f=o[t],u=o[t+1];o[t+2],o[t+3],o[t+4];var h=1,d=null,p=null;f<=20&&(d=f,h=1),f==12&&(d=100*f+u,h=2),f!=19&&f!=20||(d=f,h=2),21<=f&&f<=27&&(d=f,h=1),f==28&&(p=l.readShort(o,t+1),h=3),29<=f&&f<=31&&(d=f,h=1),32<=f&&f<=246&&(p=f-139,h=1),247<=f&&f<=250&&(p=256*(f-247)+u+108,h=2),251<=f&&f<=254&&(p=256*-(f-251)-u-108,h=2),f==255&&(p=l.readInt(o,t+1)/65535,h=5),c.push(p??"o"+d),t+=h}return c},e.CFF.readDict=function(o,t,s){for(var a=e._bin,l={},c=[];t<s;){var f=o[t],u=o[t+1];o[t+2],o[t+3],o[t+4];var h=1,d=null,p=null;if(f==28&&(p=a.readShort(o,t+1),h=3),f==29&&(p=a.readInt(o,t+1),h=5),32<=f&&f<=246&&(p=f-139,h=1),247<=f&&f<=250&&(p=256*(f-247)+u+108,h=2),251<=f&&f<=254&&(p=256*-(f-251)-u-108,h=2),f==255)throw p=a.readInt(o,t+1)/65535,h=5,"unknown number";if(f==30){var m=[];for(h=1;;){var v=o[t+h];h++;var g=v>>4,y=15&v;if(g!=15&&m.push(g),y!=15&&m.push(y),y==15)break}for(var S="",b=[0,1,2,3,4,5,6,7,8,9,".","e","e-","reserved","-","endOfNumber"],T=0;T<m.length;T++)S+=b[m[T]];p=parseFloat(S)}f<=21&&(d=["version","Notice","FullName","FamilyName","Weight","FontBBox","BlueValues","OtherBlues","FamilyBlues","FamilyOtherBlues","StdHW","StdVW","escape","UniqueID","XUID","charset","Encoding","CharStrings","Private","Subrs","defaultWidthX","nominalWidthX"][f],h=1,f==12&&(d=["Copyright","isFixedPitch","ItalicAngle","UnderlinePosition","UnderlineThickness","PaintType","CharstringType","FontMatrix","StrokeWidth","BlueScale","BlueShift","BlueFuzz","StemSnapH","StemSnapV","ForceBold",0,0,"LanguageGroup","ExpansionFactor","initialRandomSeed","SyntheticBase","PostScript","BaseFontName","BaseFontBlend",0,0,0,0,0,0,"ROS","CIDFontVersion","CIDFontRevision","CIDFontType","CIDCount","UIDBase","FDArray","FDSelect","FontName"][u],h=2)),d!=null?(l[d]=c.length==1?c[0]:c,c=[]):c.push(p),t+=h}return l},e.cmap={},e.cmap.parse=function(o,t,s){o=new Uint8Array(o.buffer,t,s),t=0;var a=e._bin,l={};a.readUshort(o,t),t+=2;var c=a.readUshort(o,t);t+=2;var f=[];l.tables=[];for(var u=0;u<c;u++){var h=a.readUshort(o,t);t+=2;var d=a.readUshort(o,t);t+=2;var p=a.readUint(o,t);t+=4;var m="p"+h+"e"+d,v=f.indexOf(p);if(v==-1){var g;v=l.tables.length,f.push(p);var y=a.readUshort(o,p);y==0?g=e.cmap.parse0(o,p):y==4?g=e.cmap.parse4(o,p):y==6?g=e.cmap.parse6(o,p):y==12?g=e.cmap.parse12(o,p):console.debug("unknown format: "+y,h,d,p),l.tables.push(g)}if(l[m]!=null)throw"multiple tables for one platform+encoding";l[m]=v}return l},e.cmap.parse0=function(o,t){var s=e._bin,a={};a.format=s.readUshort(o,t),t+=2;var l=s.readUshort(o,t);t+=2,s.readUshort(o,t),t+=2,a.map=[];for(var c=0;c<l-6;c++)a.map.push(o[t+c]);return a},e.cmap.parse4=function(o,t){var s=e._bin,a=t,l={};l.format=s.readUshort(o,t),t+=2;var c=s.readUshort(o,t);t+=2,s.readUshort(o,t),t+=2;var f=s.readUshort(o,t);t+=2;var u=f/2;l.searchRange=s.readUshort(o,t),t+=2,l.entrySelector=s.readUshort(o,t),t+=2,l.rangeShift=s.readUshort(o,t),t+=2,l.endCount=s.readUshorts(o,t,u),t+=2*u,t+=2,l.startCount=s.readUshorts(o,t,u),t+=2*u,l.idDelta=[];for(var h=0;h<u;h++)l.idDelta.push(s.readShort(o,t)),t+=2;for(l.idRangeOffset=s.readUshorts(o,t,u),t+=2*u,l.glyphIdArray=[];t<a+c;)l.glyphIdArray.push(s.readUshort(o,t)),t+=2;return l},e.cmap.parse6=function(o,t){var s=e._bin,a={};a.format=s.readUshort(o,t),t+=2,s.readUshort(o,t),t+=2,s.readUshort(o,t),t+=2,a.firstCode=s.readUshort(o,t),t+=2;var l=s.readUshort(o,t);t+=2,a.glyphIdArray=[];for(var c=0;c<l;c++)a.glyphIdArray.push(s.readUshort(o,t)),t+=2;return a},e.cmap.parse12=function(o,t){var s=e._bin,a={};a.format=s.readUshort(o,t),t+=2,t+=2,s.readUint(o,t),t+=4,s.readUint(o,t),t+=4;var l=s.readUint(o,t);t+=4,a.groups=[];for(var c=0;c<l;c++){var f=t+12*c,u=s.readUint(o,f+0),h=s.readUint(o,f+4),d=s.readUint(o,f+8);a.groups.push([u,h,d])}return a},e.glyf={},e.glyf.parse=function(o,t,s,a){for(var l=[],c=0;c<a.maxp.numGlyphs;c++)l.push(null);return l},e.glyf._parseGlyf=function(o,t){var s=e._bin,a=o._data,l=e._tabOffset(a,"glyf",o._offset)+o.loca[t];if(o.loca[t]==o.loca[t+1])return null;var c={};if(c.noc=s.readShort(a,l),l+=2,c.xMin=s.readShort(a,l),l+=2,c.yMin=s.readShort(a,l),l+=2,c.xMax=s.readShort(a,l),l+=2,c.yMax=s.readShort(a,l),l+=2,c.xMin>=c.xMax||c.yMin>=c.yMax)return null;if(c.noc>0){c.endPts=[];for(var f=0;f<c.noc;f++)c.endPts.push(s.readUshort(a,l)),l+=2;var u=s.readUshort(a,l);if(l+=2,a.length-l<u)return null;c.instructions=s.readBytes(a,l,u),l+=u;var h=c.endPts[c.noc-1]+1;for(c.flags=[],f=0;f<h;f++){var d=a[l];if(l++,c.flags.push(d),(8&d)!=0){var p=a[l];l++;for(var m=0;m<p;m++)c.flags.push(d),f++}}for(c.xs=[],f=0;f<h;f++){var v=(2&c.flags[f])!=0,g=(16&c.flags[f])!=0;v?(c.xs.push(g?a[l]:-a[l]),l++):g?c.xs.push(0):(c.xs.push(s.readShort(a,l)),l+=2)}for(c.ys=[],f=0;f<h;f++)v=(4&c.flags[f])!=0,g=(32&c.flags[f])!=0,v?(c.ys.push(g?a[l]:-a[l]),l++):g?c.ys.push(0):(c.ys.push(s.readShort(a,l)),l+=2);var y=0,S=0;for(f=0;f<h;f++)y+=c.xs[f],S+=c.ys[f],c.xs[f]=y,c.ys[f]=S}else{var b;c.parts=[];do{b=s.readUshort(a,l),l+=2;var T={m:{a:1,b:0,c:0,d:1,tx:0,ty:0},p1:-1,p2:-1};if(c.parts.push(T),T.glyphIndex=s.readUshort(a,l),l+=2,1&b){var C=s.readShort(a,l);l+=2;var x=s.readShort(a,l);l+=2}else C=s.readInt8(a,l),l++,x=s.readInt8(a,l),l++;2&b?(T.m.tx=C,T.m.ty=x):(T.p1=C,T.p2=x),8&b?(T.m.a=T.m.d=s.readF2dot14(a,l),l+=2):64&b?(T.m.a=s.readF2dot14(a,l),l+=2,T.m.d=s.readF2dot14(a,l),l+=2):128&b&&(T.m.a=s.readF2dot14(a,l),l+=2,T.m.b=s.readF2dot14(a,l),l+=2,T.m.c=s.readF2dot14(a,l),l+=2,T.m.d=s.readF2dot14(a,l),l+=2)}while(32&b);if(256&b){var P=s.readUshort(a,l);for(l+=2,c.instr=[],f=0;f<P;f++)c.instr.push(a[l]),l++}}return c},e.GDEF={},e.GDEF.parse=function(o,t,s,a){var l=t;t+=4;var c=e._bin.readUshort(o,t);return{glyphClassDef:c===0?null:e._lctf.readClassDef(o,l+c)}},e.GPOS={},e.GPOS.parse=function(o,t,s,a){return e._lctf.parse(o,t,s,a,e.GPOS.subt)},e.GPOS.subt=function(o,t,s,a){var l=e._bin,c=s,f={};if(f.fmt=l.readUshort(o,s),s+=2,t==1||t==2||t==3||t==7||t==8&&f.fmt<=2){var u=l.readUshort(o,s);s+=2,f.coverage=e._lctf.readCoverage(o,u+c)}if(t==1&&f.fmt==1){var h=l.readUshort(o,s);s+=2,h!=0&&(f.pos=e.GPOS.readValueRecord(o,s,h))}else if(t==2&&f.fmt>=1&&f.fmt<=2){h=l.readUshort(o,s),s+=2;var d=l.readUshort(o,s);s+=2;var p=e._lctf.numOfOnes(h),m=e._lctf.numOfOnes(d);if(f.fmt==1){f.pairsets=[];var v=l.readUshort(o,s);s+=2;for(var g=0;g<v;g++){var y=c+l.readUshort(o,s);s+=2;var S=l.readUshort(o,y);y+=2;for(var b=[],T=0;T<S;T++){var C=l.readUshort(o,y);y+=2,h!=0&&(_=e.GPOS.readValueRecord(o,y,h),y+=2*p),d!=0&&(L=e.GPOS.readValueRecord(o,y,d),y+=2*m),b.push({gid2:C,val1:_,val2:L})}f.pairsets.push(b)}}if(f.fmt==2){var x=l.readUshort(o,s);s+=2;var P=l.readUshort(o,s);s+=2;var O=l.readUshort(o,s);s+=2;var E=l.readUshort(o,s);for(s+=2,f.classDef1=e._lctf.readClassDef(o,c+x),f.classDef2=e._lctf.readClassDef(o,c+P),f.matrix=[],g=0;g<O;g++){var k=[];for(T=0;T<E;T++){var _=null,L=null;h!=0&&(_=e.GPOS.readValueRecord(o,s,h),s+=2*p),d!=0&&(L=e.GPOS.readValueRecord(o,s,d),s+=2*m),k.push({val1:_,val2:L})}f.matrix.push(k)}}}else if(t==4&&f.fmt==1)f.markCoverage=e._lctf.readCoverage(o,l.readUshort(o,s)+c),f.baseCoverage=e._lctf.readCoverage(o,l.readUshort(o,s+2)+c),f.markClassCount=l.readUshort(o,s+4),f.markArray=e.GPOS.readMarkArray(o,l.readUshort(o,s+6)+c),f.baseArray=e.GPOS.readBaseArray(o,l.readUshort(o,s+8)+c,f.markClassCount);else if(t==6&&f.fmt==1)f.mark1Coverage=e._lctf.readCoverage(o,l.readUshort(o,s)+c),f.mark2Coverage=e._lctf.readCoverage(o,l.readUshort(o,s+2)+c),f.markClassCount=l.readUshort(o,s+4),f.mark1Array=e.GPOS.readMarkArray(o,l.readUshort(o,s+6)+c),f.mark2Array=e.GPOS.readBaseArray(o,l.readUshort(o,s+8)+c,f.markClassCount);else{if(t==9&&f.fmt==1){var A=l.readUshort(o,s);s+=2;var W=l.readUint(o,s);if(s+=4,a.ltype==9)a.ltype=A;else if(a.ltype!=A)throw"invalid extension substitution";return e.GPOS.subt(o,a.ltype,c+W)}console.debug("unsupported GPOS table LookupType",t,"format",f.fmt)}return f},e.GPOS.readValueRecord=function(o,t,s){var a=e._bin,l=[];return l.push(1&s?a.readShort(o,t):0),t+=1&s?2:0,l.push(2&s?a.readShort(o,t):0),t+=2&s?2:0,l.push(4&s?a.readShort(o,t):0),t+=4&s?2:0,l.push(8&s?a.readShort(o,t):0),t+=8&s?2:0,l},e.GPOS.readBaseArray=function(o,t,s){var a=e._bin,l=[],c=t,f=a.readUshort(o,t);t+=2;for(var u=0;u<f;u++){for(var h=[],d=0;d<s;d++)h.push(e.GPOS.readAnchorRecord(o,c+a.readUshort(o,t))),t+=2;l.push(h)}return l},e.GPOS.readMarkArray=function(o,t){var s=e._bin,a=[],l=t,c=s.readUshort(o,t);t+=2;for(var f=0;f<c;f++){var u=e.GPOS.readAnchorRecord(o,s.readUshort(o,t+2)+l);u.markClass=s.readUshort(o,t),a.push(u),t+=4}return a},e.GPOS.readAnchorRecord=function(o,t){var s=e._bin,a={};return a.fmt=s.readUshort(o,t),a.x=s.readShort(o,t+2),a.y=s.readShort(o,t+4),a},e.GSUB={},e.GSUB.parse=function(o,t,s,a){return e._lctf.parse(o,t,s,a,e.GSUB.subt)},e.GSUB.subt=function(o,t,s,a){var l=e._bin,c=s,f={};if(f.fmt=l.readUshort(o,s),s+=2,t!=1&&t!=2&&t!=4&&t!=5&&t!=6)return null;if(t==1||t==2||t==4||t==5&&f.fmt<=2||t==6&&f.fmt<=2){var u=l.readUshort(o,s);s+=2,f.coverage=e._lctf.readCoverage(o,c+u)}if(t==1&&f.fmt>=1&&f.fmt<=2){if(f.fmt==1)f.delta=l.readShort(o,s),s+=2;else if(f.fmt==2){var h=l.readUshort(o,s);s+=2,f.newg=l.readUshorts(o,s,h),s+=2*f.newg.length}}else if(t==2&&f.fmt==1){h=l.readUshort(o,s),s+=2,f.seqs=[];for(var d=0;d<h;d++){var p=l.readUshort(o,s)+c;s+=2;var m=l.readUshort(o,p);f.seqs.push(l.readUshorts(o,p+2,m))}}else if(t==4)for(f.vals=[],h=l.readUshort(o,s),s+=2,d=0;d<h;d++){var v=l.readUshort(o,s);s+=2,f.vals.push(e.GSUB.readLigatureSet(o,c+v))}else if(t==5&&f.fmt==2){if(f.fmt==2){var g=l.readUshort(o,s);s+=2,f.cDef=e._lctf.readClassDef(o,c+g),f.scset=[];var y=l.readUshort(o,s);for(s+=2,d=0;d<y;d++){var S=l.readUshort(o,s);s+=2,f.scset.push(S==0?null:e.GSUB.readSubClassSet(o,c+S))}}}else if(t==6&&f.fmt==3){if(f.fmt==3){for(d=0;d<3;d++){h=l.readUshort(o,s),s+=2;for(var b=[],T=0;T<h;T++)b.push(e._lctf.readCoverage(o,c+l.readUshort(o,s+2*T)));s+=2*h,d==0&&(f.backCvg=b),d==1&&(f.inptCvg=b),d==2&&(f.ahedCvg=b)}h=l.readUshort(o,s),s+=2,f.lookupRec=e.GSUB.readSubstLookupRecords(o,s,h)}}else{if(t==7&&f.fmt==1){var C=l.readUshort(o,s);s+=2;var x=l.readUint(o,s);if(s+=4,a.ltype==9)a.ltype=C;else if(a.ltype!=C)throw"invalid extension substitution";return e.GSUB.subt(o,a.ltype,c+x)}console.debug("unsupported GSUB table LookupType",t,"format",f.fmt)}return f},e.GSUB.readSubClassSet=function(o,t){var s=e._bin.readUshort,a=t,l=[],c=s(o,t);t+=2;for(var f=0;f<c;f++){var u=s(o,t);t+=2,l.push(e.GSUB.readSubClassRule(o,a+u))}return l},e.GSUB.readSubClassRule=function(o,t){var s=e._bin.readUshort,a={},l=s(o,t),c=s(o,t+=2);t+=2,a.input=[];for(var f=0;f<l-1;f++)a.input.push(s(o,t)),t+=2;return a.substLookupRecords=e.GSUB.readSubstLookupRecords(o,t,c),a},e.GSUB.readSubstLookupRecords=function(o,t,s){for(var a=e._bin.readUshort,l=[],c=0;c<s;c++)l.push(a(o,t),a(o,t+2)),t+=4;return l},e.GSUB.readChainSubClassSet=function(o,t){var s=e._bin,a=t,l=[],c=s.readUshort(o,t);t+=2;for(var f=0;f<c;f++){var u=s.readUshort(o,t);t+=2,l.push(e.GSUB.readChainSubClassRule(o,a+u))}return l},e.GSUB.readChainSubClassRule=function(o,t){for(var s=e._bin,a={},l=["backtrack","input","lookahead"],c=0;c<l.length;c++){var f=s.readUshort(o,t);t+=2,c==1&&f--,a[l[c]]=s.readUshorts(o,t,f),t+=2*a[l[c]].length}return f=s.readUshort(o,t),t+=2,a.subst=s.readUshorts(o,t,2*f),t+=2*a.subst.length,a},e.GSUB.readLigatureSet=function(o,t){var s=e._bin,a=t,l=[],c=s.readUshort(o,t);t+=2;for(var f=0;f<c;f++){var u=s.readUshort(o,t);t+=2,l.push(e.GSUB.readLigature(o,a+u))}return l},e.GSUB.readLigature=function(o,t){var s=e._bin,a={chain:[]};a.nglyph=s.readUshort(o,t),t+=2;var l=s.readUshort(o,t);t+=2;for(var c=0;c<l-1;c++)a.chain.push(s.readUshort(o,t)),t+=2;return a},e.head={},e.head.parse=function(o,t,s){var a=e._bin,l={};return a.readFixed(o,t),t+=4,l.fontRevision=a.readFixed(o,t),t+=4,a.readUint(o,t),t+=4,a.readUint(o,t),t+=4,l.flags=a.readUshort(o,t),t+=2,l.unitsPerEm=a.readUshort(o,t),t+=2,l.created=a.readUint64(o,t),t+=8,l.modified=a.readUint64(o,t),t+=8,l.xMin=a.readShort(o,t),t+=2,l.yMin=a.readShort(o,t),t+=2,l.xMax=a.readShort(o,t),t+=2,l.yMax=a.readShort(o,t),t+=2,l.macStyle=a.readUshort(o,t),t+=2,l.lowestRecPPEM=a.readUshort(o,t),t+=2,l.fontDirectionHint=a.readShort(o,t),t+=2,l.indexToLocFormat=a.readShort(o,t),t+=2,l.glyphDataFormat=a.readShort(o,t),t+=2,l},e.hhea={},e.hhea.parse=function(o,t,s){var a=e._bin,l={};return a.readFixed(o,t),t+=4,l.ascender=a.readShort(o,t),t+=2,l.descender=a.readShort(o,t),t+=2,l.lineGap=a.readShort(o,t),t+=2,l.advanceWidthMax=a.readUshort(o,t),t+=2,l.minLeftSideBearing=a.readShort(o,t),t+=2,l.minRightSideBearing=a.readShort(o,t),t+=2,l.xMaxExtent=a.readShort(o,t),t+=2,l.caretSlopeRise=a.readShort(o,t),t+=2,l.caretSlopeRun=a.readShort(o,t),t+=2,l.caretOffset=a.readShort(o,t),t+=2,t+=8,l.metricDataFormat=a.readShort(o,t),t+=2,l.numberOfHMetrics=a.readUshort(o,t),t+=2,l},e.hmtx={},e.hmtx.parse=function(o,t,s,a){for(var l=e._bin,c={aWidth:[],lsBearing:[]},f=0,u=0,h=0;h<a.maxp.numGlyphs;h++)h<a.hhea.numberOfHMetrics&&(f=l.readUshort(o,t),t+=2,u=l.readShort(o,t),t+=2),c.aWidth.push(f),c.lsBearing.push(u);return c},e.kern={},e.kern.parse=function(o,t,s,a){var l=e._bin,c=l.readUshort(o,t);if(t+=2,c==1)return e.kern.parseV1(o,t-2,s,a);var f=l.readUshort(o,t);t+=2;for(var u={glyph1:[],rval:[]},h=0;h<f;h++){t+=2,s=l.readUshort(o,t),t+=2;var d=l.readUshort(o,t);t+=2;var p=d>>>8;if((p&=15)!=0)throw"unknown kern table format: "+p;t=e.kern.readFormat0(o,t,u)}return u},e.kern.parseV1=function(o,t,s,a){var l=e._bin;l.readFixed(o,t),t+=4;var c=l.readUint(o,t);t+=4;for(var f={glyph1:[],rval:[]},u=0;u<c;u++){l.readUint(o,t),t+=4;var h=l.readUshort(o,t);t+=2,l.readUshort(o,t),t+=2;var d=h>>>8;if((d&=15)!=0)throw"unknown kern table format: "+d;t=e.kern.readFormat0(o,t,f)}return f},e.kern.readFormat0=function(o,t,s){var a=e._bin,l=-1,c=a.readUshort(o,t);t+=2,a.readUshort(o,t),t+=2,a.readUshort(o,t),t+=2,a.readUshort(o,t),t+=2;for(var f=0;f<c;f++){var u=a.readUshort(o,t);t+=2;var h=a.readUshort(o,t);t+=2;var d=a.readShort(o,t);t+=2,u!=l&&(s.glyph1.push(u),s.rval.push({glyph2:[],vals:[]}));var p=s.rval[s.rval.length-1];p.glyph2.push(h),p.vals.push(d),l=u}return t},e.loca={},e.loca.parse=function(o,t,s,a){var l=e._bin,c=[],f=a.head.indexToLocFormat,u=a.maxp.numGlyphs+1;if(f==0)for(var h=0;h<u;h++)c.push(l.readUshort(o,t+(h<<1))<<1);if(f==1)for(h=0;h<u;h++)c.push(l.readUint(o,t+(h<<2)));return c},e.maxp={},e.maxp.parse=function(o,t,s){var a=e._bin,l={},c=a.readUint(o,t);return t+=4,l.numGlyphs=a.readUshort(o,t),t+=2,c==65536&&(l.maxPoints=a.readUshort(o,t),t+=2,l.maxContours=a.readUshort(o,t),t+=2,l.maxCompositePoints=a.readUshort(o,t),t+=2,l.maxCompositeContours=a.readUshort(o,t),t+=2,l.maxZones=a.readUshort(o,t),t+=2,l.maxTwilightPoints=a.readUshort(o,t),t+=2,l.maxStorage=a.readUshort(o,t),t+=2,l.maxFunctionDefs=a.readUshort(o,t),t+=2,l.maxInstructionDefs=a.readUshort(o,t),t+=2,l.maxStackElements=a.readUshort(o,t),t+=2,l.maxSizeOfInstructions=a.readUshort(o,t),t+=2,l.maxComponentElements=a.readUshort(o,t),t+=2,l.maxComponentDepth=a.readUshort(o,t),t+=2),l},e.name={},e.name.parse=function(o,t,s){var a=e._bin,l={};a.readUshort(o,t),t+=2;var c=a.readUshort(o,t);t+=2,a.readUshort(o,t);for(var f,u=["copyright","fontFamily","fontSubfamily","ID","fullName","version","postScriptName","trademark","manufacturer","designer","description","urlVendor","urlDesigner","licence","licenceURL","---","typoFamilyName","typoSubfamilyName","compatibleFull","sampleText","postScriptCID","wwsFamilyName","wwsSubfamilyName","lightPalette","darkPalette"],h=t+=2,d=0;d<c;d++){var p=a.readUshort(o,t);t+=2;var m=a.readUshort(o,t);t+=2;var v=a.readUshort(o,t);t+=2;var g=a.readUshort(o,t);t+=2;var y=a.readUshort(o,t);t+=2;var S=a.readUshort(o,t);t+=2;var b,T=u[g],C=h+12*c+S;if(p==0)b=a.readUnicode(o,C,y/2);else if(p==3&&m==0)b=a.readUnicode(o,C,y/2);else if(m==0)b=a.readASCII(o,C,y);else if(m==1)b=a.readUnicode(o,C,y/2);else if(m==3)b=a.readUnicode(o,C,y/2);else{if(p!=1)throw"unknown encoding "+m+", platformID: "+p;b=a.readASCII(o,C,y),console.debug("reading unknown MAC encoding "+m+" as ASCII")}var x="p"+p+","+v.toString(16);l[x]==null&&(l[x]={}),l[x][T!==void 0?T:g]=b,l[x]._lang=v}for(var P in l)if(l[P].postScriptName!=null&&l[P]._lang==1033)return l[P];for(var P in l)if(l[P].postScriptName!=null&&l[P]._lang==0)return l[P];for(var P in l)if(l[P].postScriptName!=null&&l[P]._lang==3084)return l[P];for(var P in l)if(l[P].postScriptName!=null)return l[P];for(var P in l){f=P;break}return console.debug("returning name table with languageID "+l[f]._lang),l[f]},e["OS/2"]={},e["OS/2"].parse=function(o,t,s){var a=e._bin.readUshort(o,t);t+=2;var l={};if(a==0)e["OS/2"].version0(o,t,l);else if(a==1)e["OS/2"].version1(o,t,l);else if(a==2||a==3||a==4)e["OS/2"].version2(o,t,l);else{if(a!=5)throw"unknown OS/2 table version: "+a;e["OS/2"].version5(o,t,l)}return l},e["OS/2"].version0=function(o,t,s){var a=e._bin;return s.xAvgCharWidth=a.readShort(o,t),t+=2,s.usWeightClass=a.readUshort(o,t),t+=2,s.usWidthClass=a.readUshort(o,t),t+=2,s.fsType=a.readUshort(o,t),t+=2,s.ySubscriptXSize=a.readShort(o,t),t+=2,s.ySubscriptYSize=a.readShort(o,t),t+=2,s.ySubscriptXOffset=a.readShort(o,t),t+=2,s.ySubscriptYOffset=a.readShort(o,t),t+=2,s.ySuperscriptXSize=a.readShort(o,t),t+=2,s.ySuperscriptYSize=a.readShort(o,t),t+=2,s.ySuperscriptXOffset=a.readShort(o,t),t+=2,s.ySuperscriptYOffset=a.readShort(o,t),t+=2,s.yStrikeoutSize=a.readShort(o,t),t+=2,s.yStrikeoutPosition=a.readShort(o,t),t+=2,s.sFamilyClass=a.readShort(o,t),t+=2,s.panose=a.readBytes(o,t,10),t+=10,s.ulUnicodeRange1=a.readUint(o,t),t+=4,s.ulUnicodeRange2=a.readUint(o,t),t+=4,s.ulUnicodeRange3=a.readUint(o,t),t+=4,s.ulUnicodeRange4=a.readUint(o,t),t+=4,s.achVendID=[a.readInt8(o,t),a.readInt8(o,t+1),a.readInt8(o,t+2),a.readInt8(o,t+3)],t+=4,s.fsSelection=a.readUshort(o,t),t+=2,s.usFirstCharIndex=a.readUshort(o,t),t+=2,s.usLastCharIndex=a.readUshort(o,t),t+=2,s.sTypoAscender=a.readShort(o,t),t+=2,s.sTypoDescender=a.readShort(o,t),t+=2,s.sTypoLineGap=a.readShort(o,t),t+=2,s.usWinAscent=a.readUshort(o,t),t+=2,s.usWinDescent=a.readUshort(o,t),t+=2},e["OS/2"].version1=function(o,t,s){var a=e._bin;return t=e["OS/2"].version0(o,t,s),s.ulCodePageRange1=a.readUint(o,t),t+=4,s.ulCodePageRange2=a.readUint(o,t),t+=4},e["OS/2"].version2=function(o,t,s){var a=e._bin;return t=e["OS/2"].version1(o,t,s),s.sxHeight=a.readShort(o,t),t+=2,s.sCapHeight=a.readShort(o,t),t+=2,s.usDefault=a.readUshort(o,t),t+=2,s.usBreak=a.readUshort(o,t),t+=2,s.usMaxContext=a.readUshort(o,t),t+=2},e["OS/2"].version5=function(o,t,s){var a=e._bin;return t=e["OS/2"].version2(o,t,s),s.usLowerOpticalPointSize=a.readUshort(o,t),t+=2,s.usUpperOpticalPointSize=a.readUshort(o,t),t+=2},e.post={},e.post.parse=function(o,t,s){var a=e._bin,l={};return l.version=a.readFixed(o,t),t+=4,l.italicAngle=a.readFixed(o,t),t+=4,l.underlinePosition=a.readShort(o,t),t+=2,l.underlineThickness=a.readShort(o,t),t+=2,l},e==null&&(e={}),e.U==null&&(e.U={}),e.U.codeToGlyph=function(o,t){var s=o.cmap,a=-1;if(s.p0e4!=null?a=s.p0e4:s.p3e1!=null?a=s.p3e1:s.p1e0!=null?a=s.p1e0:s.p0e3!=null&&(a=s.p0e3),a==-1)throw"no familiar platform and encoding!";var l=s.tables[a];if(l.format==0)return t>=l.map.length?0:l.map[t];if(l.format==4){for(var c=-1,f=0;f<l.endCount.length;f++)if(t<=l.endCount[f]){c=f;break}return c==-1||l.startCount[c]>t?0:65535&(l.idRangeOffset[c]!=0?l.glyphIdArray[t-l.startCount[c]+(l.idRangeOffset[c]>>1)-(l.idRangeOffset.length-c)]:t+l.idDelta[c])}if(l.format==12){if(t>l.groups[l.groups.length-1][1])return 0;for(f=0;f<l.groups.length;f++){var u=l.groups[f];if(u[0]<=t&&t<=u[1])return u[2]+(t-u[0])}return 0}throw"unknown cmap table format "+l.format},e.U.glyphToPath=function(o,t){var s={cmds:[],crds:[]};if(o.SVG&&o.SVG.entries[t]){var a=o.SVG.entries[t];return a==null?s:(typeof a=="string"&&(a=e.SVG.toPath(a),o.SVG.entries[t]=a),a)}if(o.CFF){var l={x:0,y:0,stack:[],nStems:0,haveWidth:!1,width:o.CFF.Private?o.CFF.Private.defaultWidthX:0,open:!1},c=o.CFF,f=o.CFF.Private;if(c.ROS){for(var u=0;c.FDSelect[u+2]<=t;)u+=2;f=c.FDArray[c.FDSelect[u+1]].Private}e.U._drawCFF(o.CFF.CharStrings[t],l,c,f,s)}else o.glyf&&e.U._drawGlyf(t,o,s);return s},e.U._drawGlyf=function(o,t,s){var a=t.glyf[o];a==null&&(a=t.glyf[o]=e.glyf._parseGlyf(t,o)),a!=null&&(a.noc>-1?e.U._simpleGlyph(a,s):e.U._compoGlyph(a,t,s))},e.U._simpleGlyph=function(o,t){for(var s=0;s<o.noc;s++){for(var a=s==0?0:o.endPts[s-1]+1,l=o.endPts[s],c=a;c<=l;c++){var f=c==a?l:c-1,u=c==l?a:c+1,h=1&o.flags[c],d=1&o.flags[f],p=1&o.flags[u],m=o.xs[c],v=o.ys[c];if(c==a)if(h){if(!d){e.U.P.moveTo(t,m,v);continue}e.U.P.moveTo(t,o.xs[f],o.ys[f])}else d?e.U.P.moveTo(t,o.xs[f],o.ys[f]):e.U.P.moveTo(t,(o.xs[f]+m)/2,(o.ys[f]+v)/2);h?d&&e.U.P.lineTo(t,m,v):p?e.U.P.qcurveTo(t,m,v,o.xs[u],o.ys[u]):e.U.P.qcurveTo(t,m,v,(m+o.xs[u])/2,(v+o.ys[u])/2)}e.U.P.closePath(t)}},e.U._compoGlyph=function(o,t,s){for(var a=0;a<o.parts.length;a++){var l={cmds:[],crds:[]},c=o.parts[a];e.U._drawGlyf(c.glyphIndex,t,l);for(var f=c.m,u=0;u<l.crds.length;u+=2){var h=l.crds[u],d=l.crds[u+1];s.crds.push(h*f.a+d*f.b+f.tx),s.crds.push(h*f.c+d*f.d+f.ty)}for(u=0;u<l.cmds.length;u++)s.cmds.push(l.cmds[u])}},e.U._getGlyphClass=function(o,t){var s=e._lctf.getInterval(t,o);return s==-1?0:t[s+2]},e.U._applySubs=function(o,t,s,a){for(var l=o.length-t-1,c=0;c<s.tabs.length;c++)if(s.tabs[c]!=null){var f,u=s.tabs[c];if(!u.coverage||(f=e._lctf.coverageIndex(u.coverage,o[t]))!=-1){if(s.ltype==1)o[t],u.fmt==1?o[t]=o[t]+u.delta:o[t]=u.newg[f];else if(s.ltype==4)for(var h=u.vals[f],d=0;d<h.length;d++){var p=h[d],m=p.chain.length;if(!(m>l)){for(var v=!0,g=0,y=0;y<m;y++){for(;o[t+g+(1+y)]==-1;)g++;p.chain[y]!=o[t+g+(1+y)]&&(v=!1)}if(v){for(o[t]=p.nglyph,y=0;y<m+g;y++)o[t+y+1]=-1;break}}}else if(s.ltype==5&&u.fmt==2)for(var S=e._lctf.getInterval(u.cDef,o[t]),b=u.cDef[S+2],T=u.scset[b],C=0;C<T.length;C++){var x=T[C],P=x.input;if(!(P.length>l)){for(v=!0,y=0;y<P.length;y++){var O=e._lctf.getInterval(u.cDef,o[t+1+y]);if(S==-1&&u.cDef[O+2]!=P[y]){v=!1;break}}if(v){var E=x.substLookupRecords;for(d=0;d<E.length;d+=2)E[d],E[d+1]}}}else if(s.ltype==6&&u.fmt==3){if(!e.U._glsCovered(o,u.backCvg,t-u.backCvg.length)||!e.U._glsCovered(o,u.inptCvg,t)||!e.U._glsCovered(o,u.ahedCvg,t+u.inptCvg.length))continue;var k=u.lookupRec;for(C=0;C<k.length;C+=2){S=k[C];var _=a[k[C+1]];e.U._applySubs(o,t+S,_,a)}}}}},e.U._glsCovered=function(o,t,s){for(var a=0;a<t.length;a++)if(e._lctf.coverageIndex(t[a],o[s+a])==-1)return!1;return!0},e.U.glyphsToPath=function(o,t,s){for(var a={cmds:[],crds:[]},l=0,c=0;c<t.length;c++){var f=t[c];if(f!=-1){for(var u=c<t.length-1&&t[c+1]!=-1?t[c+1]:0,h=e.U.glyphToPath(o,f),d=0;d<h.crds.length;d+=2)a.crds.push(h.crds[d]+l),a.crds.push(h.crds[d+1]);for(s&&a.cmds.push(s),d=0;d<h.cmds.length;d++)a.cmds.push(h.cmds[d]);s&&a.cmds.push("X"),l+=o.hmtx.aWidth[f],c<t.length-1&&(l+=e.U.getPairAdjustment(o,f,u))}}return a},e.U.P={},e.U.P.moveTo=function(o,t,s){o.cmds.push("M"),o.crds.push(t,s)},e.U.P.lineTo=function(o,t,s){o.cmds.push("L"),o.crds.push(t,s)},e.U.P.curveTo=function(o,t,s,a,l,c,f){o.cmds.push("C"),o.crds.push(t,s,a,l,c,f)},e.U.P.qcurveTo=function(o,t,s,a,l){o.cmds.push("Q"),o.crds.push(t,s,a,l)},e.U.P.closePath=function(o){o.cmds.push("Z")},e.U._drawCFF=function(o,t,s,a,l){for(var c=t.stack,f=t.nStems,u=t.haveWidth,h=t.width,d=t.open,p=0,m=t.x,v=t.y,g=0,y=0,S=0,b=0,T=0,C=0,x=0,P=0,O=0,E=0,k={val:0,size:0};p<o.length;){e.CFF.getCharString(o,p,k);var _=k.val;if(p+=k.size,_=="o1"||_=="o18")c.length%2!=0&&!u&&(h=c.shift()+a.nominalWidthX),f+=c.length>>1,c.length=0,u=!0;else if(_=="o3"||_=="o23")c.length%2!=0&&!u&&(h=c.shift()+a.nominalWidthX),f+=c.length>>1,c.length=0,u=!0;else if(_=="o4")c.length>1&&!u&&(h=c.shift()+a.nominalWidthX,u=!0),d&&e.U.P.closePath(l),v+=c.pop(),e.U.P.moveTo(l,m,v),d=!0;else if(_=="o5")for(;c.length>0;)m+=c.shift(),v+=c.shift(),e.U.P.lineTo(l,m,v);else if(_=="o6"||_=="o7")for(var L=c.length,A=_=="o6",W=0;W<L;W++){var B=c.shift();A?m+=B:v+=B,A=!A,e.U.P.lineTo(l,m,v)}else if(_=="o8"||_=="o24"){L=c.length;for(var Z=0;Z+6<=L;)g=m+c.shift(),y=v+c.shift(),S=g+c.shift(),b=y+c.shift(),m=S+c.shift(),v=b+c.shift(),e.U.P.curveTo(l,g,y,S,b,m,v),Z+=6;_=="o24"&&(m+=c.shift(),v+=c.shift(),e.U.P.lineTo(l,m,v))}else{if(_=="o11")break;if(_=="o1234"||_=="o1235"||_=="o1236"||_=="o1237")_=="o1234"&&(y=v,S=(g=m+c.shift())+c.shift(),E=b=y+c.shift(),C=b,P=v,m=(x=(T=(O=S+c.shift())+c.shift())+c.shift())+c.shift(),e.U.P.curveTo(l,g,y,S,b,O,E),e.U.P.curveTo(l,T,C,x,P,m,v)),_=="o1235"&&(g=m+c.shift(),y=v+c.shift(),S=g+c.shift(),b=y+c.shift(),O=S+c.shift(),E=b+c.shift(),T=O+c.shift(),C=E+c.shift(),x=T+c.shift(),P=C+c.shift(),m=x+c.shift(),v=P+c.shift(),c.shift(),e.U.P.curveTo(l,g,y,S,b,O,E),e.U.P.curveTo(l,T,C,x,P,m,v)),_=="o1236"&&(g=m+c.shift(),y=v+c.shift(),S=g+c.shift(),E=b=y+c.shift(),C=b,x=(T=(O=S+c.shift())+c.shift())+c.shift(),P=C+c.shift(),m=x+c.shift(),e.U.P.curveTo(l,g,y,S,b,O,E),e.U.P.curveTo(l,T,C,x,P,m,v)),_=="o1237"&&(g=m+c.shift(),y=v+c.shift(),S=g+c.shift(),b=y+c.shift(),O=S+c.shift(),E=b+c.shift(),T=O+c.shift(),C=E+c.shift(),x=T+c.shift(),P=C+c.shift(),Math.abs(x-m)>Math.abs(P-v)?m=x+c.shift():v=P+c.shift(),e.U.P.curveTo(l,g,y,S,b,O,E),e.U.P.curveTo(l,T,C,x,P,m,v));else if(_=="o14"){if(c.length>0&&!u&&(h=c.shift()+s.nominalWidthX,u=!0),c.length==4){var K=c.shift(),U=c.shift(),I=c.shift(),w=c.shift(),M=e.CFF.glyphBySE(s,I),R=e.CFF.glyphBySE(s,w);e.U._drawCFF(s.CharStrings[M],t,s,a,l),t.x=K,t.y=U,e.U._drawCFF(s.CharStrings[R],t,s,a,l)}d&&(e.U.P.closePath(l),d=!1)}else if(_=="o19"||_=="o20")c.length%2!=0&&!u&&(h=c.shift()+a.nominalWidthX),f+=c.length>>1,c.length=0,u=!0,p+=f+7>>3;else if(_=="o21")c.length>2&&!u&&(h=c.shift()+a.nominalWidthX,u=!0),v+=c.pop(),m+=c.pop(),d&&e.U.P.closePath(l),e.U.P.moveTo(l,m,v),d=!0;else if(_=="o22")c.length>1&&!u&&(h=c.shift()+a.nominalWidthX,u=!0),m+=c.pop(),d&&e.U.P.closePath(l),e.U.P.moveTo(l,m,v),d=!0;else if(_=="o25"){for(;c.length>6;)m+=c.shift(),v+=c.shift(),e.U.P.lineTo(l,m,v);g=m+c.shift(),y=v+c.shift(),S=g+c.shift(),b=y+c.shift(),m=S+c.shift(),v=b+c.shift(),e.U.P.curveTo(l,g,y,S,b,m,v)}else if(_=="o26")for(c.length%2&&(m+=c.shift());c.length>0;)g=m,y=v+c.shift(),m=S=g+c.shift(),v=(b=y+c.shift())+c.shift(),e.U.P.curveTo(l,g,y,S,b,m,v);else if(_=="o27")for(c.length%2&&(v+=c.shift());c.length>0;)y=v,S=(g=m+c.shift())+c.shift(),b=y+c.shift(),m=S+c.shift(),v=b,e.U.P.curveTo(l,g,y,S,b,m,v);else if(_=="o10"||_=="o29"){var F=_=="o10"?a:s;if(c.length==0)console.debug("error: empty stack");else{var D=c.pop(),z=F.Subrs[D+F.Bias];t.x=m,t.y=v,t.nStems=f,t.haveWidth=u,t.width=h,t.open=d,e.U._drawCFF(z,t,s,a,l),m=t.x,v=t.y,f=t.nStems,u=t.haveWidth,h=t.width,d=t.open}}else if(_=="o30"||_=="o31"){var N=c.length,G=(Z=0,_=="o31");for(Z+=N-(L=-3&N);Z<L;)G?(y=v,S=(g=m+c.shift())+c.shift(),v=(b=y+c.shift())+c.shift(),L-Z==5?(m=S+c.shift(),Z++):m=S,G=!1):(g=m,y=v+c.shift(),S=g+c.shift(),b=y+c.shift(),m=S+c.shift(),L-Z==5?(v=b+c.shift(),Z++):v=b,G=!0),e.U.P.curveTo(l,g,y,S,b,m,v),Z+=4}else{if((_+"").charAt(0)=="o")throw console.debug("Unknown operation: "+_,o),_;c.push(_)}}}t.x=m,t.y=v,t.nStems=f,t.haveWidth=u,t.width=h,t.open=d};var i=e,r={Typr:i};return n.Typr=i,n.default=r,Object.defineProperty(n,"__esModule",{value:!0}),n})({}).Typr}function Dv(){return(function(n){var e=Uint8Array,i=Uint16Array,r=Uint32Array,o=new e([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),t=new e([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),s=new e([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),a=function(_,L){for(var A=new i(31),W=0;W<31;++W)A[W]=L+=1<<_[W-1];var B=new r(A[30]);for(W=1;W<30;++W)for(var Z=A[W];Z<A[W+1];++Z)B[Z]=Z-A[W]<<5|W;return[A,B]},l=a(o,2),c=l[0],f=l[1];c[28]=258,f[258]=28;for(var u=a(t,0)[0],h=new i(32768),d=0;d<32768;++d){var p=(43690&d)>>>1|(21845&d)<<1;p=(61680&(p=(52428&p)>>>2|(13107&p)<<2))>>>4|(3855&p)<<4,h[d]=((65280&p)>>>8|(255&p)<<8)>>>1}var m=function(_,L,A){for(var W=_.length,B=0,Z=new i(L);B<W;++B)++Z[_[B]-1];var K,U=new i(L);for(B=0;B<L;++B)U[B]=U[B-1]+Z[B-1]<<1;{K=new i(1<<L);var I=15-L;for(B=0;B<W;++B)if(_[B])for(var w=B<<4|_[B],M=L-_[B],R=U[_[B]-1]++<<M,F=R|(1<<M)-1;R<=F;++R)K[h[R]>>>I]=w}return K},v=new e(288);for(d=0;d<144;++d)v[d]=8;for(d=144;d<256;++d)v[d]=9;for(d=256;d<280;++d)v[d]=7;for(d=280;d<288;++d)v[d]=8;var g=new e(32);for(d=0;d<32;++d)g[d]=5;var y=m(v,9),S=m(g,5),b=function(_){for(var L=_[0],A=1;A<_.length;++A)_[A]>L&&(L=_[A]);return L},T=function(_,L,A){var W=L/8|0;return(_[W]|_[W+1]<<8)>>(7&L)&A},C=function(_,L){var A=L/8|0;return(_[A]|_[A+1]<<8|_[A+2]<<16)>>(7&L)},x=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],P=function(_,L,A){var W=new Error(L||x[_]);if(W.code=_,Error.captureStackTrace&&Error.captureStackTrace(W,P),!A)throw W;return W},O=function(_,L,A){var W=_.length;if(!W||A&&!A.l&&W<5)return L||new e(0);var B=!L||A,Z=!A||A.i;A||(A={}),L||(L=new e(3*W));var K,U=function(fe){var We=L.length;if(fe>We){var Fe=new e(Math.max(2*We,fe));Fe.set(L),L=Fe}},I=A.f||0,w=A.p||0,M=A.b||0,R=A.l,F=A.d,D=A.m,z=A.n,N=8*W;do{if(!R){A.f=I=T(_,w,1);var G=T(_,w+1,3);if(w+=3,!G){var q=_[(oe=((K=w)/8|0)+(7&K&&1)+4)-4]|_[oe-3]<<8,Q=oe+q;if(Q>W){Z&&P(0);break}B&&U(M+q),L.set(_.subarray(oe,Q),M),A.b=M+=q,A.p=w=8*Q;continue}if(G==1)R=y,F=S,D=9,z=5;else if(G==2){var X=T(_,w,31)+257,V=T(_,w+10,15)+4,ue=X+T(_,w+5,31)+1;w+=14;for(var ee=new e(ue),te=new e(19),ie=0;ie<V;++ie)te[s[ie]]=T(_,w+3*ie,7);w+=3*V;var ce=b(te),Y=(1<<ce)-1,ne=m(te,ce);for(ie=0;ie<ue;){var oe,j=ne[T(_,w,Y)];if(w+=15&j,(oe=j>>>4)<16)ee[ie++]=oe;else{var pe=0,$=0;for(oe==16?($=3+T(_,w,3),w+=2,pe=ee[ie-1]):oe==17?($=3+T(_,w,7),w+=3):oe==18&&($=11+T(_,w,127),w+=7);$--;)ee[ie++]=pe}}var se=ee.subarray(0,X),J=ee.subarray(X);D=b(se),z=b(J),R=m(se,D),F=m(J,z)}else P(1);if(w>N){Z&&P(0);break}}B&&U(M+131072);for(var Ce=(1<<D)-1,re=(1<<z)-1,ae=w;;ae=w){var he=(pe=R[C(_,w)&Ce])>>>4;if((w+=15&pe)>N){Z&&P(0);break}if(pe||P(2),he<256)L[M++]=he;else{if(he==256){ae=w,R=null;break}var me=he-254;if(he>264){var Re=o[ie=he-257];me=T(_,w,(1<<Re)-1)+c[ie],w+=Re}var Ge=F[C(_,w)&re],Se=Ge>>>4;if(Ge||P(3),w+=15&Ge,J=u[Se],Se>3&&(Re=t[Se],J+=C(_,w)&(1<<Re)-1,w+=Re),w>N){Z&&P(0);break}B&&U(M+131072);for(var _e=M+me;M<_e;M+=4)L[M]=L[M-J],L[M+1]=L[M+1-J],L[M+2]=L[M+2-J],L[M+3]=L[M+3-J];M=_e}}A.l=R,A.p=ae,A.b=M,R&&(I=1,A.m=D,A.d=F,A.n=z)}while(!I);return M==L.length?L:(function(fe,We,Fe){(Fe==null||Fe>fe.length)&&(Fe=fe.length);var mt=new(fe instanceof i?i:fe instanceof r?r:e)(Fe-We);return mt.set(fe.subarray(We,Fe)),mt})(L,0,M)},E=new e(0),k=typeof TextDecoder<"u"&&new TextDecoder;try{k.decode(E,{stream:!0})}catch{}return n.convert_streams=function(_){var L=new DataView(_),A=0;function W(){var X=L.getUint16(A);return A+=2,X}function B(){var X=L.getUint32(A);return A+=4,X}function Z(X){q.setUint16(Q,X),Q+=2}function K(X){q.setUint32(Q,X),Q+=4}for(var U={signature:B(),flavor:B(),length:B(),numTables:W(),reserved:W(),totalSfntSize:B(),majorVersion:W(),minorVersion:W(),metaOffset:B(),metaLength:B(),metaOrigLength:B(),privOffset:B(),privLength:B()},I=0;Math.pow(2,I)<=U.numTables;)I++;I--;for(var w=16*Math.pow(2,I),M=16*U.numTables-w,R=12,F=[],D=0;D<U.numTables;D++)F.push({tag:B(),offset:B(),compLength:B(),origLength:B(),origChecksum:B()}),R+=16;var z,N=new Uint8Array(12+16*F.length+F.reduce((function(X,V){return X+V.origLength+4}),0)),G=N.buffer,q=new DataView(G),Q=0;return K(U.flavor),Z(U.numTables),Z(w),Z(I),Z(M),F.forEach((function(X){K(X.tag),K(X.origChecksum),K(R),K(X.origLength),X.outOffset=R,(R+=X.origLength)%4!=0&&(R+=4-R%4)})),F.forEach((function(X){var V,ue=_.slice(X.offset,X.offset+X.compLength);if(X.compLength!=X.origLength){var ee=new Uint8Array(X.origLength);V=new Uint8Array(ue,2),O(V,ee)}else ee=new Uint8Array(ue);N.set(ee,X.outOffset);var te=0;(R=X.outOffset+X.origLength)%4!=0&&(te=4-R%4),N.set(new Uint8Array(te).buffer,X.outOffset+X.origLength),z=R+te})),G.slice(0,z)},Object.defineProperty(n,"__esModule",{value:!0}),n})({}).convert_streams}function Fv(n,e){const i={M:2,L:2,Q:4,C:6,Z:0},r={C:"18g,ca,368,1kz",D:"17k,6,2,2+4,5+c,2+6,2+1,10+1,9+f,j+11,2+1,a,2,2+1,15+2,3,j+2,6+3,2+8,2,2,2+1,w+a,4+e,3+3,2,3+2,3+5,23+w,2f+4,3,2+9,2,b,2+3,3,1k+9,6+1,3+1,2+2,2+d,30g,p+y,1,1+1g,f+x,2,sd2+1d,jf3+4,f+3,2+4,2+2,b+3,42,2,4+2,2+1,2,3,t+1,9f+w,2,el+2,2+g,d+2,2l,2+1,5,3+1,2+1,2,3,6,16wm+1v",R:"17m+3,2,2,6+3,m,15+2,2+2,h+h,13,3+8,2,2,3+1,2,p+1,x,5+4,5,a,2,2,3,u,c+2,g+1,5,2+1,4+1,5j,6+1,2,b,2+2,f,2+1,1s+2,2,3+1,7,1ez0,2,2+1,4+4,b,4,3,b,42,2+2,4,3,2+1,2,o+3,ae,ep,x,2o+2,3+1,3,5+1,6",L:"x9u,jff,a,fd,jv",T:"4t,gj+33,7o+4,1+1,7c+18,2,2+1,2+1,2,21+a,2,1b+k,h,2u+6,3+5,3+1,2+3,y,2,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,3,7,6+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+d,1,1+1,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,ek,3+1,r+4,1e+4,6+5,2p+c,1+3,1,1+2,1+b,2db+2,3y,2p+v,ff+3,30+1,n9x,1+2,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,5s,6y+2,ea,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+9,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2,2b+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,470+8,at4+4,1o+6,t5,1s+3,2a,f5l+1,2+3,43o+2,a+7,1+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,1,gzau,v+2n,3l+6n"},o=1,t=2,s=4,a=8,l=16,c=32;let f;function u(x){if(!f){const P={R:t,L:o,D:s,C:l,U:c,T:a};f=new Map;for(let O in r){let E=0;r[O].split(",").forEach(k=>{let[_,L]=k.split("+");_=parseInt(_,36),L=L?parseInt(L,36):0,f.set(E+=_,P[O]);for(let A=L;A--;)f.set(++E,P[O])})}}return f.get(x)||c}const h=1,d=2,p=3,m=4,v=[null,"isol","init","fina","medi"];function g(x){const P=new Uint8Array(x.length);let O=c,E=h,k=-1;for(let _=0;_<x.length;_++){const L=x.codePointAt(_);let A=u(L)|0,W=h;A&a||(O&(o|s|l)?A&(t|s|l)?(W=p,(E===h||E===p)&&P[k]++):A&(o|c)&&(E===d||E===m)&&P[k]--:O&(t|c)&&(E===d||E===m)&&P[k]--,E=P[_]=W,O=A,k=_,L>65535&&_++)}return P}function y(x,P){const O=[];for(let k=0;k<P.length;k++){const _=P.codePointAt(k);_>65535&&k++,O.push(n.U.codeToGlyph(x,_))}const E=x.GSUB;if(E){const{lookupList:k,featureList:_}=E;let L;const A=/^(rlig|liga|mset|isol|init|fina|medi|half|pres|blws|ccmp)$/,W=[];_.forEach(B=>{if(A.test(B.tag))for(let Z=0;Z<B.tab.length;Z++){if(W[B.tab[Z]])continue;W[B.tab[Z]]=!0;const K=k[B.tab[Z]],U=/^(isol|init|fina|medi)$/.test(B.tag);U&&!L&&(L=g(P));for(let I=0;I<O.length;I++)(!L||!U||v[L[I]]===B.tag)&&n.U._applySubs(O,I,K,k)}})}return O}function S(x,P){const O=new Int16Array(P.length*3);let E=0;for(;E<P.length;E++){const A=P[E];if(A===-1)continue;O[E*3+2]=x.hmtx.aWidth[A];const W=x.GPOS;if(W){const B=W.lookupList;for(let Z=0;Z<B.length;Z++){const K=B[Z];for(let U=0;U<K.tabs.length;U++){const I=K.tabs[U];if(K.ltype===1){if(n._lctf.coverageIndex(I.coverage,A)!==-1&&I.pos){L(I.pos,E);break}}else if(K.ltype===2){let w=null,M=k();if(M!==-1){const R=n._lctf.coverageIndex(I.coverage,P[M]);if(R!==-1){if(I.fmt===1){const F=I.pairsets[R];for(let D=0;D<F.length;D++)F[D].gid2===A&&(w=F[D])}else if(I.fmt===2){const F=n.U._getGlyphClass(P[M],I.classDef1),D=n.U._getGlyphClass(A,I.classDef2);w=I.matrix[F][D]}if(w){w.val1&&L(w.val1,M),w.val2&&L(w.val2,E);break}}}}else if(K.ltype===4){const w=n._lctf.coverageIndex(I.markCoverage,A);if(w!==-1){const M=k(_),R=M===-1?-1:n._lctf.coverageIndex(I.baseCoverage,P[M]);if(R!==-1){const F=I.markArray[w],D=I.baseArray[R][F.markClass];O[E*3]=D.x-F.x+O[M*3]-O[M*3+2],O[E*3+1]=D.y-F.y+O[M*3+1];break}}}else if(K.ltype===6){const w=n._lctf.coverageIndex(I.mark1Coverage,A);if(w!==-1){const M=k();if(M!==-1){const R=P[M];if(b(x,R)===3){const F=n._lctf.coverageIndex(I.mark2Coverage,R);if(F!==-1){const D=I.mark1Array[w],z=I.mark2Array[F][D.markClass];O[E*3]=z.x-D.x+O[M*3]-O[M*3+2],O[E*3+1]=z.y-D.y+O[M*3+1];break}}}}}}}}else if(x.kern&&!x.cff){const B=k();if(B!==-1){const Z=x.kern.glyph1.indexOf(P[B]);if(Z!==-1){const K=x.kern.rval[Z].glyph2.indexOf(A);K!==-1&&(O[B*3+2]+=x.kern.rval[Z].vals[K])}}}}return O;function k(A){for(let W=E-1;W>=0;W--)if(P[W]!==-1&&(!A||A(P[W])))return W;return-1}function _(A){return b(x,A)===1}function L(A,W){for(let B=0;B<3;B++)O[W*3+B]+=A[B]||0}}function b(x,P){const O=x.GDEF&&x.GDEF.glyphClassDef;return O?n.U._getGlyphClass(P,O):0}function T(...x){for(let P=0;P<x.length;P++)if(typeof x[P]=="number")return x[P]}function C(x){const P=Object.create(null),O=x["OS/2"],E=x.hhea,k=x.head.unitsPerEm,_=T(O&&O.sTypoAscender,E&&E.ascender,k),L={unitsPerEm:k,ascender:_,descender:T(O&&O.sTypoDescender,E&&E.descender,0),capHeight:T(O&&O.sCapHeight,_),xHeight:T(O&&O.sxHeight,_),lineGap:T(O&&O.sTypoLineGap,E&&E.lineGap),supportsCodePoint(A){return n.U.codeToGlyph(x,A)>0},forEachGlyph(A,W,B,Z){let K=0;const U=1/L.unitsPerEm*W,I=y(x,A);let w=0;const M=S(x,I);return I.forEach((R,F)=>{if(R!==-1){let D=P[R];if(!D){const{cmds:z,crds:N}=n.U.glyphToPath(x,R);let G="",q=0;for(let ee=0,te=z.length;ee<te;ee++){const ie=i[z[ee]];G+=z[ee];for(let ce=1;ce<=ie;ce++)G+=(ce>1?",":"")+N[q++]}let Q,X,V,ue;if(N.length){Q=X=1/0,V=ue=-1/0;for(let ee=0,te=N.length;ee<te;ee+=2){let ie=N[ee],ce=N[ee+1];ie<Q&&(Q=ie),ce<X&&(X=ce),ie>V&&(V=ie),ce>ue&&(ue=ce)}}else Q=V=X=ue=0;D=P[R]={index:R,advanceWidth:x.hmtx.aWidth[R],xMin:Q,yMin:X,xMax:V,yMax:ue,path:G}}Z.call(null,D,K+M[F*3]*U,M[F*3+1]*U,w),K+=M[F*3+2]*U,B&&(K+=B*W)}w+=A.codePointAt(w)>65535?2:1}),K}};return L}return function(P){const O=new Uint8Array(P,0,4),E=n._bin.readASCII(O,0,4);if(E==="wOFF")P=e(P);else if(E==="wOF2")throw new Error("woff2 fonts not supported");return C(n.parse(P)[0])}}const Iv=Qo({name:"Typr Font Parser",dependencies:[Ov,Dv,Fv],init(n,e,i){const r=n(),o=e();return i(r,o)}});function kv(){return(function(n){var e=function(){this.buckets=new Map};e.prototype.add=function(S){var b=S>>5;this.buckets.set(b,(this.buckets.get(b)||0)|1<<(31&S))},e.prototype.has=function(S){var b=this.buckets.get(S>>5);return b!==void 0&&(b&1<<(31&S))!=0},e.prototype.serialize=function(){var S=[];return this.buckets.forEach((function(b,T){S.push((+T).toString(36)+":"+b.toString(36))})),S.join(",")},e.prototype.deserialize=function(S){var b=this;this.buckets.clear(),S.split(",").forEach((function(T){var C=T.split(":");b.buckets.set(parseInt(C[0],36),parseInt(C[1],36))}))};var i=Math.pow(2,8),r=i-1,o=~r;function t(S){var b=(function(C){return C&o})(S).toString(16),T=(function(C){return(C&o)+i-1})(S).toString(16);return"codepoint-index/plane"+(S>>16)+"/"+b+"-"+T+".json"}function s(S,b){var T=S&r,C=b.codePointAt(T/6|0);return((C=(C||48)-48)&1<<T%6)!=0}function a(S,b){var T;(T=S,T.replace(/U\+/gi,"").replace(/^,+|,+$/g,"").split(/,+/).map((function(C){return C.split("-").map((function(x){return parseInt(x.trim(),16)}))}))).forEach((function(C){var x=C[0],P=C[1];P===void 0&&(P=x),b(x,P)}))}function l(S,b){a(S,(function(T,C){for(var x=T;x<=C;x++)b(x)}))}var c={},f={},u=new WeakMap,h="https://cdn.jsdelivr.net/gh/lojjic/unicode-font-resolver@v1.0.1/packages/data";function d(S){var b=u.get(S);return b||(b=new e,l(S.ranges,(function(T){return b.add(T)})),u.set(S,b)),b}var p,m=new Map;function v(S,b,T){return S[b]?b:S[T]?T:(function(C){for(var x in C)return x})(S)}function g(S,b){var T=b;if(!S.includes(T)){T=1/0;for(var C=0;C<S.length;C++)Math.abs(S[C]-b)<Math.abs(T-b)&&(T=S[C])}return T}function y(S){return p||(p=new Set,l("9-D,20,85,A0,1680,2000-200A,2028-202F,205F,3000",(function(b){p.add(b)}))),p.has(S)}return n.CodePointSet=e,n.clearCache=function(){c={},f={}},n.getFontsForString=function(S,b){b===void 0&&(b={});var T,C=b.lang;C===void 0&&(C=/\p{Script=Hangul}/u.test(T=S)?"ko":/\p{Script=Hiragana}|\p{Script=Katakana}/u.test(T)?"ja":"en");var x=b.category;x===void 0&&(x="sans-serif");var P=b.style;P===void 0&&(P="normal");var O=b.weight;O===void 0&&(O=400);var E=(b.dataUrl||h).replace(/\/$/g,""),k=new Map,_=new Uint8Array(S.length),L={},A={},W=new Array(S.length),B=new Map,Z=!1;function K(w){var M=m.get(w);return M||(M=fetch(E+"/"+w).then((function(R){if(!R.ok)throw new Error(R.statusText);return R.json().then((function(F){if(!Array.isArray(F)||F[0]!==1)throw new Error("Incorrect schema version; need 1, got "+F[0]);return F[1]}))})).catch((function(R){if(E!==h)return Z||(console.error('unicode-font-resolver: Failed loading from dataUrl "'+E+'", trying default CDN. '+R.message),Z=!0),E=h,m.delete(w),K(w);throw R})),m.set(w,M)),M}for(var U=function(w){var M=S.codePointAt(w),R=t(M);W[w]=R,c[R]||B.has(R)||B.set(R,K(R).then((function(F){c[R]=F}))),M>65535&&(w++,I=w)},I=0;I<S.length;I++)U(I);return Promise.all(B.values()).then((function(){B.clear();for(var w=function(R){var F=S.codePointAt(R),D=null,z=c[W[R]],N=void 0;for(var G in z){var q=A[G];if(q===void 0&&(q=A[G]=new RegExp(G).test(C||"en")),q){for(var Q in N=G,z[G])if(s(F,z[G][Q])){D=Q;break}break}}if(!D){e:for(var X in z)if(X!==N){for(var V in z[X])if(s(F,z[X][V])){D=V;break e}}}D||(console.debug("No font coverage for U+"+F.toString(16)),D="latin"),W[R]=D,f[D]||B.has(D)||B.set(D,K("font-meta/"+D+".json").then((function(ue){f[D]=ue}))),F>65535&&(R++,M=R)},M=0;M<S.length;M++)w(M);return Promise.all(B.values())})).then((function(){for(var w,M=null,R=0;R<S.length;R++){var F=S.codePointAt(R);if(M&&(y(F)||d(M).has(F)))_[R]=_[R-1];else{M=f[W[R]];var D=L[M.id];if(!D){var z=M.typeforms,N=v(z,x,"sans-serif"),G=v(z[N],P,"normal"),q=g((w=z[N])===null||w===void 0?void 0:w[G],O);D=L[M.id]=E+"/font-files/"+M.id+"/"+N+"."+G+"."+q+".woff"}var Q=k.get(D);Q==null&&(Q=k.size,k.set(D,Q)),_[R]=Q}F>65535&&(R++,_[R]=_[R-1])}return{fontUrls:Array.from(k.keys()),chars:_}}))},Object.defineProperty(n,"__esModule",{value:!0}),n})({})}function Nv(n,e){const i=Object.create(null),r=Object.create(null);function o(s,a){const l=c=>{console.error(`Failure loading font ${s}`,c)};try{const c=new XMLHttpRequest;c.open("get",s,!0),c.responseType="arraybuffer",c.onload=function(){if(c.status>=400)l(new Error(c.statusText));else if(c.status>0)try{const f=n(c.response);f.src=s,a(f)}catch(f){l(f)}},c.onerror=l,c.send()}catch(c){l(c)}}function t(s,a){let l=i[s];l?a(l):r[s]?r[s].push(a):(r[s]=[a],o(s,c=>{c.src=s,i[s]=c,r[s].forEach(f=>f(c)),delete r[s]}))}return function(s,a,{lang:l,fonts:c=[],style:f="normal",weight:u="normal",unicodeFontsURL:h}={}){const d=new Uint8Array(s.length),p=[];s.length||y();const m=new Map,v=[];if(f!=="italic"&&(f="normal"),typeof u!="number"&&(u=u==="bold"?700:400),c&&!Array.isArray(c)&&(c=[c]),c=c.slice().filter(b=>!b.lang||b.lang.test(l)).reverse(),c.length){let x=0;(function P(O=0){for(let E=O,k=s.length;E<k;E++){const _=s.codePointAt(E);if(x===1&&p[d[E-1]].supportsCodePoint(_)||E>0&&/\s/.test(s[E]))d[E]=d[E-1],x===2&&(v[v.length-1][1]=E);else for(let L=d[E],A=c.length;L<=A;L++)if(L===A){const W=x===2?v[v.length-1]:v[v.length]=[E,E];W[1]=E,x=2}else{d[E]=L;const{src:W,unicodeRange:B}=c[L];if(!B||S(_,B)){const Z=i[W];if(!Z){t(W,()=>{P(E)});return}if(Z.supportsCodePoint(_)){let K=m.get(Z);typeof K!="number"&&(K=p.length,p.push(Z),m.set(Z,K)),d[E]=K,x=1;break}}}_>65535&&E+1<k&&(d[E+1]=d[E],E++,x===2&&(v[v.length-1][1]=E))}g()})()}else v.push([0,s.length-1]),g();function g(){if(v.length){const b=v.map(T=>s.substring(T[0],T[1]+1)).join(`
`);e.getFontsForString(b,{lang:l||void 0,style:f,weight:u,dataUrl:h}).then(({fontUrls:T,chars:C})=>{const x=p.length;let P=0;v.forEach(E=>{for(let k=0,_=E[1]-E[0];k<=_;k++)d[E[0]+k]=C[P++]+x;P++});let O=0;T.forEach((E,k)=>{t(E,_=>{p[k+x]=_,++O===T.length&&y()})})})}else y()}function y(){a({chars:d,fonts:p})}function S(b,T){for(let C=0;C<T.length;C++){const[x,P=x]=T[C];if(x<=b&&b<=P)return!0}return!1}}}const Bv=Qo({name:"FontResolver",dependencies:[Nv,Iv,kv],init(n,e,i){return n(e,i())}});function Uv(n,e){const r=/[\u00AD\u034F\u061C\u115F-\u1160\u17B4-\u17B5\u180B-\u180E\u200B-\u200F\u202A-\u202E\u2060-\u206F\u3164\uFE00-\uFE0F\uFEFF\uFFA0\uFFF0-\uFFF8]/,o="[^\\S\\u00A0]",t=new RegExp(`${o}|[\\-\\u007C\\u00AD\\u2010\\u2012-\\u2014\\u2027\\u2056\\u2E17\\u2E40]`);function s({text:p,lang:m,fonts:v,style:g,weight:y,preResolvedFonts:S,unicodeFontsURL:b},T){const C=({chars:x,fonts:P})=>{let O,E;const k=[];for(let _=0;_<x.length;_++)x[_]!==E?(E=x[_],k.push(O={start:_,end:_,fontObj:P[x[_]]})):O.end=_;T(k)};S?C(S):n(p,C,{lang:m,fonts:v,style:g,weight:y,unicodeFontsURL:b})}function a({text:p="",font:m,lang:v,sdfGlyphSize:g=64,fontSize:y=400,fontWeight:S=1,fontStyle:b="normal",letterSpacing:T=0,lineHeight:C="normal",maxWidth:x=1/0,direction:P,textAlign:O="left",textIndent:E=0,whiteSpace:k="normal",overflowWrap:_="normal",anchorX:L=0,anchorY:A=0,metricsOnly:W=!1,unicodeFontsURL:B,preResolvedFonts:Z=null,includeCaretPositions:K=!1,chunkedBoundsSize:U=8192,colorRanges:I=null},w){const M=u(),R={fontLoad:0,typesetting:0};p.indexOf("\r")>-1&&(console.info("Typesetter: got text with \\r chars; normalizing to \\n"),p=p.replace(/\r\n/g,`
`).replace(/\r/g,`
`)),y=+y,T=+T,x=+x,C=C||"normal",E=+E,s({text:p,lang:v,style:b,weight:S,fonts:typeof m=="string"?[{src:m}]:m,unicodeFontsURL:B,preResolvedFonts:Z},F=>{R.fontLoad=u()-M;const D=isFinite(x);let z=null,N=null,G=null,q=null,Q=null,X=null,V=null,ue=null,ee=0,te=0,ie=k!=="nowrap";const ce=new Map,Y=u();let ne=E,oe=0,j=new h;const pe=[j];F.forEach(re=>{const{fontObj:ae}=re,{ascender:he,descender:me,unitsPerEm:Re,lineGap:Ge,capHeight:Se,xHeight:_e}=ae;let fe=ce.get(ae);if(!fe){const de=y/Re,Pe=C==="normal"?(he-me+Ge)*de:C*y,$t=(Pe-(he-me)*de)/2,Le=Math.min(Pe,(he-me)*de),Te=(he+me)/2*de+Le/2;fe={index:ce.size,src:ae.src,fontObj:ae,fontSizeMult:de,unitsPerEm:Re,ascender:he*de,descender:me*de,capHeight:Se*de,xHeight:_e*de,lineHeight:Pe,baseline:-$t-he*de,caretTop:Te,caretBottom:Te-Le},ce.set(ae,fe)}const{fontSizeMult:We}=fe,Fe=p.slice(re.start,re.end+1);let mt,Oe;ae.forEachGlyph(Fe,y,T,(de,Pe,$t,Le)=>{Pe+=oe,Le+=re.start,mt=Pe,Oe=de;const Te=p.charAt(Le),Ye=de.advanceWidth*We,Ie=j.count;let ve;if("isEmpty"in de||(de.isWhitespace=!!Te&&new RegExp(o).test(Te),de.canBreakAfter=!!Te&&t.test(Te),de.isEmpty=de.xMin===de.xMax||de.yMin===de.yMax||r.test(Te)),!de.isWhitespace&&!de.isEmpty&&te++,ie&&D&&!de.isWhitespace&&Pe+Ye+ne>x&&Ie){if(j.glyphAt(Ie-1).glyphObj.canBreakAfter)ve=new h,ne=-Pe;else for(let lt=Ie;lt--;)if(lt===0&&_==="break-word"){ve=new h,ne=-Pe;break}else if(j.glyphAt(lt).glyphObj.canBreakAfter){ve=j.splitAt(lt+1);const rt=ve.glyphAt(0).x;ne-=rt;for(let Je=ve.count;Je--;)ve.glyphAt(Je).x-=rt;break}ve&&(j.isSoftWrapped=!0,j=ve,pe.push(j),ee=x)}let ke=j.glyphAt(j.count);ke.glyphObj=de,ke.x=Pe+ne,ke.y=$t,ke.width=Ye,ke.charIndex=Le,ke.fontData=fe,Te===`
`&&(j=new h,pe.push(j),ne=-(Pe+Ye+T*y)+E)}),oe=mt+Oe.advanceWidth*We+T*y});let $=0;pe.forEach(re=>{let ae=!0;for(let he=re.count;he--;){const me=re.glyphAt(he);ae&&!me.glyphObj.isWhitespace&&(re.width=me.x+me.width,re.width>ee&&(ee=re.width),ae=!1);let{lineHeight:Re,capHeight:Ge,xHeight:Se,baseline:_e}=me.fontData;Re>re.lineHeight&&(re.lineHeight=Re);const fe=_e-re.baseline;fe<0&&(re.baseline+=fe,re.cap+=fe,re.ex+=fe),re.cap=Math.max(re.cap,re.baseline+Ge),re.ex=Math.max(re.ex,re.baseline+Se)}re.baseline-=$,re.cap-=$,re.ex-=$,$+=re.lineHeight});let se=0,J=0;if(L&&(typeof L=="number"?se=-L:typeof L=="string"&&(se=-ee*(L==="left"?0:L==="center"?.5:L==="right"?1:c(L)))),A&&(typeof A=="number"?J=-A:typeof A=="string"&&(J=A==="top"?0:A==="top-baseline"?-pe[0].baseline:A==="top-cap"?-pe[0].cap:A==="top-ex"?-pe[0].ex:A==="middle"?$/2:A==="bottom"?$:A==="bottom-baseline"?-pe[pe.length-1].baseline:c(A)*$)),!W){const re=e.getEmbeddingLevels(p,P);z=new Uint16Array(te),N=new Uint8Array(te),G=new Float32Array(te*2),q={},V=[1/0,1/0,-1/0,-1/0],ue=[],K&&(X=new Float32Array(p.length*4)),I&&(Q=new Uint8Array(te*3));let ae=0,he=-1,me=-1,Re,Ge;if(pe.forEach((Se,_e)=>{let{count:fe,width:We}=Se;if(fe>0){let Fe=0;for(let Le=fe;Le--&&Se.glyphAt(Le).glyphObj.isWhitespace;)Fe++;let mt=0,Oe=0;if(O==="center")mt=(ee-We)/2;else if(O==="right")mt=ee-We;else if(O==="justify"&&Se.isSoftWrapped){let Le=0;for(let Te=fe-Fe;Te--;)Se.glyphAt(Te).glyphObj.isWhitespace&&Le++;Oe=(ee-We)/Le}if(Oe||mt){let Le=0;for(let Te=0;Te<fe;Te++){let Ye=Se.glyphAt(Te);const Ie=Ye.glyphObj;Ye.x+=mt+Le,Oe!==0&&Ie.isWhitespace&&Te<fe-Fe&&(Le+=Oe,Ye.width+=Oe)}}const de=e.getReorderSegments(p,re,Se.glyphAt(0).charIndex,Se.glyphAt(Se.count-1).charIndex);for(let Le=0;Le<de.length;Le++){const[Te,Ye]=de[Le];let Ie=1/0,ve=-1/0;for(let ke=0;ke<fe;ke++)if(Se.glyphAt(ke).charIndex>=Te){let lt=ke,rt=ke;for(;rt<fe;rt++){let Je=Se.glyphAt(rt);if(Je.charIndex>Ye)break;rt<fe-Fe&&(Ie=Math.min(Ie,Je.x),ve=Math.max(ve,Je.x+Je.width))}for(let Je=lt;Je<rt;Je++){const wt=Se.glyphAt(Je);wt.x=ve-(wt.x+wt.width-Ie)}break}}let Pe;const $t=Le=>Pe=Le;for(let Le=0;Le<fe;Le++){const Te=Se.glyphAt(Le);Pe=Te.glyphObj;const Ye=Pe.index,Ie=re.levels[Te.charIndex]&1;if(Ie){const ve=e.getMirroredCharacter(p[Te.charIndex]);ve&&Te.fontData.fontObj.forEachGlyph(ve,0,0,$t)}if(K){const{charIndex:ve,fontData:ke}=Te,lt=Te.x+se,rt=Te.x+Te.width+se;X[ve*4]=Ie?rt:lt,X[ve*4+1]=Ie?lt:rt,X[ve*4+2]=Se.baseline+ke.caretBottom+J,X[ve*4+3]=Se.baseline+ke.caretTop+J;const Je=ve-he;Je>1&&f(X,he,Je),he=ve}if(I){const{charIndex:ve}=Te;for(;ve>me;)me++,I.hasOwnProperty(me)&&(Ge=I[me])}if(!Pe.isWhitespace&&!Pe.isEmpty){const ve=ae++,{fontSizeMult:ke,src:lt,index:rt}=Te.fontData,Je=q[lt]||(q[lt]={});Je[Ye]||(Je[Ye]={path:Pe.path,pathBounds:[Pe.xMin,Pe.yMin,Pe.xMax,Pe.yMax]});const wt=Te.x+se,eo=Te.y+Se.baseline+J;G[ve*2]=wt,G[ve*2+1]=eo;const Ht=wt+Pe.xMin*ke,to=eo+Pe.yMin*ke,vo=wt+Pe.xMax*ke,Vt=eo+Pe.yMax*ke;Ht<V[0]&&(V[0]=Ht),to<V[1]&&(V[1]=to),vo>V[2]&&(V[2]=vo),Vt>V[3]&&(V[3]=Vt),ve%U===0&&(Re={start:ve,end:ve,rect:[1/0,1/0,-1/0,-1/0]},ue.push(Re)),Re.end++;const ct=Re.rect;if(Ht<ct[0]&&(ct[0]=Ht),to<ct[1]&&(ct[1]=to),vo>ct[2]&&(ct[2]=vo),Vt>ct[3]&&(ct[3]=Vt),z[ve]=Ye,N[ve]=rt,I){const go=ve*3;Q[go]=Ge>>16&255,Q[go+1]=Ge>>8&255,Q[go+2]=Ge&255}}}}}),X){const Se=p.length-he;Se>1&&f(X,he,Se)}}const Ce=[];ce.forEach(({index:re,src:ae,unitsPerEm:he,ascender:me,descender:Re,lineHeight:Ge,capHeight:Se,xHeight:_e})=>{Ce[re]={src:ae,unitsPerEm:he,ascender:me,descender:Re,lineHeight:Ge,capHeight:Se,xHeight:_e}}),R.typesetting=u()-Y,w({glyphIds:z,glyphFontIndices:N,glyphPositions:G,glyphData:q,fontData:Ce,caretPositions:X,glyphColors:Q,chunkedBounds:ue,fontSize:y,topBaseline:J+pe[0].baseline,blockBounds:[se,J-$,se+ee,J],visibleBounds:V,timings:R})})}function l(p,m){a({...p,metricsOnly:!0},v=>{const[g,y,S,b]=v.blockBounds;m({width:S-g,height:b-y})})}function c(p){let m=p.match(/^([\d.]+)%$/),v=m?parseFloat(m[1]):NaN;return isNaN(v)?0:v/100}function f(p,m,v){const g=p[m*4],y=p[m*4+1],S=p[m*4+2],b=p[m*4+3],T=(y-g)/v;for(let C=0;C<v;C++){const x=(m+C)*4;p[x]=g+T*C,p[x+1]=g+T*(C+1),p[x+2]=S,p[x+3]=b}}function u(){return(self.performance||Date).now()}function h(){this.data=[]}const d=["glyphObj","x","y","width","charIndex","fontData"];return h.prototype={width:0,lineHeight:0,baseline:0,cap:0,ex:0,isSoftWrapped:!1,get count(){return Math.ceil(this.data.length/d.length)},glyphAt(p){let m=h.flyweight;return m.data=this.data,m.index=p,m},splitAt(p){let m=new h;return m.data=this.data.splice(p*d.length),m}},h.flyweight=d.reduce((p,m,v,g)=>(Object.defineProperty(p,m,{get(){return this.data[this.index*d.length+v]},set(y){this.data[this.index*d.length+v]=y}}),p),{data:null,index:0}),{typeset:a,measure:l}}const wo=()=>(self.performance||Date).now(),On=Ac();let Ja;function Gv(n,e,i,r,o,t,s,a,l,c,f=!0){return f?zv(n,e,i,r,o,t,s,a,l,c).then(null,u=>(Ja||(console.warn("WebGL SDF generation failed, falling back to JS",u),Ja=!0),$a(n,e,i,r,o,t,s,a,l,c))):$a(n,e,i,r,o,t,s,a,l,c)}const yn=[],Wv=5;let Hr=0;function Rc(){const n=wo();for(;yn.length&&wo()-n<Wv;)yn.shift()();Hr=yn.length?setTimeout(Rc,0):0}const zv=(...n)=>new Promise((e,i)=>{yn.push(()=>{const r=wo();try{On.webgl.generateIntoCanvas(...n),e({timing:wo()-r})}catch(o){i(o)}}),Hr||(Hr=setTimeout(Rc,0))}),jv=4,Hv=2e3,Qa={};let Vv=0;function $a(n,e,i,r,o,t,s,a,l,c){const f="TroikaTextSDFGenerator_JS_"+Vv++%jv;let u=Qa[f];return u||(u=Qa[f]={workerModule:Qo({name:f,workerId:f,dependencies:[Ac,wo],init(h,d){const p=h().javascript.generate;return function(...m){const v=d();return{textureData:p(...m),timing:d()-v}}},getTransferables(h){return[h.textureData.buffer]}}),requests:0,idleTimer:null}),u.requests++,clearTimeout(u.idleTimer),u.workerModule(n,e,i,r,o,t).then(({textureData:h,timing:d})=>{const p=wo(),m=new Uint8Array(h.length*4);for(let v=0;v<h.length;v++)m[v*4+c]=h[v];return On.webglUtils.renderImageData(s,m,a,l,n,e,1<<3-c),d+=wo()-p,--u.requests===0&&(u.idleTimer=setTimeout(()=>{Tv(f)},Hv)),{timing:d}})}function Xv(n){n._warm||(On.webgl.isSupported(n),n._warm=!0)}const Yv=On.webglUtils.resizeWebGLCanvasWithoutClearing,_i={unicodeFontsURL:null,sdfGlyphSize:64,sdfMargin:1/16,sdfExponent:9,textureWidth:2048},Zv=new Ke;function Wo(){return(self.performance||Date).now()}const el=Object.create(null);function qv(n,e){n=Jv({},n);const i=Wo(),r=[];if(n.font&&r.push({label:"user",src:Qv(n.font)}),n.font=r,n.text=""+n.text,n.sdfGlyphSize=n.sdfGlyphSize||_i.sdfGlyphSize,n.unicodeFontsURL=n.unicodeFontsURL||_i.unicodeFontsURL,n.colorRanges!=null){let h={};for(let d in n.colorRanges)if(n.colorRanges.hasOwnProperty(d)){let p=n.colorRanges[d];typeof p!="number"&&(p=Zv.set(p).getHex()),h[d]=p}n.colorRanges=h}Object.freeze(n);const{textureWidth:o,sdfExponent:t}=_i,{sdfGlyphSize:s}=n,a=o/s*4;let l=el[s];if(!l){const h=document.createElement("canvas");h.width=o,h.height=s*256/a,l=el[s]={glyphCount:0,sdfGlyphSize:s,sdfCanvas:h,sdfTexture:new Dr(h,void 0,void 0,void 0,Ve,Ve),contextLost:!1,glyphsByFont:new Map},l.sdfTexture.generateMipmaps=!1,Kv(l)}const{sdfTexture:c,sdfCanvas:f}=l;Fc(n).then(h=>{const{glyphIds:d,glyphFontIndices:p,fontData:m,glyphPositions:v,fontSize:g,timings:y}=h,S=[],b=new Float32Array(d.length*4);let T=0,C=0;const x=Wo(),P=m.map(L=>{let A=l.glyphsByFont.get(L.src);return A||l.glyphsByFont.set(L.src,A=new Map),A});d.forEach((L,A)=>{const W=p[A],{src:B,unitsPerEm:Z}=m[W];let K=P[W].get(L);if(!K){const{path:R,pathBounds:F}=h.glyphData[B][L],D=Math.max(F[2]-F[0],F[3]-F[1])/s*(_i.sdfMargin*s+.5),z=l.glyphCount++,N=[F[0]-D,F[1]-D,F[2]+D,F[3]+D];P[W].set(L,K={path:R,atlasIndex:z,sdfViewBox:N}),S.push(K)}const{sdfViewBox:U}=K,I=v[C++],w=v[C++],M=g/Z;b[T++]=I+U[0]*M,b[T++]=w+U[1]*M,b[T++]=I+U[2]*M,b[T++]=w+U[3]*M,d[A]=K.atlasIndex}),y.quads=(y.quads||0)+(Wo()-x);const O=Wo();y.sdf={};const E=f.height,k=Math.ceil(l.glyphCount/a),_=Math.pow(2,Math.ceil(Math.log2(k*s)));_>E&&(console.info(`Increasing SDF texture size ${E}->${_}`),Yv(f,o,_),c.dispose()),Promise.all(S.map(L=>Oc(L,l,n.gpuAccelerateSDF).then(({timing:A})=>{y.sdf[L.atlasIndex]=A}))).then(()=>{S.length&&!l.contextLost&&(Dc(l),c.needsUpdate=!0),y.sdfTotal=Wo()-O,y.total=Wo()-i,e(Object.freeze({parameters:n,sdfTexture:c,sdfGlyphSize:s,sdfExponent:t,glyphBounds:b,glyphAtlasIndices:d,glyphColors:h.glyphColors,caretPositions:h.caretPositions,chunkedBounds:h.chunkedBounds,ascender:h.ascender,descender:h.descender,lineHeight:h.lineHeight,capHeight:h.capHeight,xHeight:h.xHeight,topBaseline:h.topBaseline,blockBounds:h.blockBounds,visibleBounds:h.visibleBounds,timings:h.timings}))})}),Promise.resolve().then(()=>{l.contextLost||Xv(f)})}function Oc({path:n,atlasIndex:e,sdfViewBox:i},{sdfGlyphSize:r,sdfCanvas:o,contextLost:t},s){if(t)return Promise.resolve({timing:-1});const{textureWidth:a,sdfExponent:l}=_i,c=Math.max(i[2]-i[0],i[3]-i[1]),f=Math.floor(e/4),u=f%(a/r)*r,h=Math.floor(f/(a/r))*r,d=e%4;return Gv(r,r,n,i,c,l,o,u,h,d,s)}function Kv(n){const e=n.sdfCanvas;e.addEventListener("webglcontextlost",i=>{console.log("Context Lost",i),i.preventDefault(),n.contextLost=!0}),e.addEventListener("webglcontextrestored",i=>{console.log("Context Restored",i),n.contextLost=!1;const r=[];n.glyphsByFont.forEach(o=>{o.forEach(t=>{r.push(Oc(t,n,!0))})}),Promise.all(r).then(()=>{Dc(n),n.sdfTexture.needsUpdate=!0})})}function Jv(n,e){for(let i in e)e.hasOwnProperty(i)&&(n[i]=e[i]);return n}let un;function Qv(n){return un||(un=typeof document>"u"?{}:document.createElement("a")),un.href=n,un.href}function Dc(n){if(typeof createImageBitmap!="function"){console.info("Safari<15: applying SDF canvas workaround");const{sdfCanvas:e,sdfTexture:i}=n,{width:r,height:o}=e,t=n.sdfCanvas.getContext("webgl");let s=i.image.data;(!s||s.length!==r*o*4)&&(s=new Uint8Array(r*o*4),i.image={width:r,height:o,data:s},i.flipY=!1,i.isDataTexture=!0),t.readPixels(0,0,r,o,t.RGBA,t.UNSIGNED_BYTE,s)}}const $v=Qo({name:"Typesetter",dependencies:[Uv,Bv,Mv],init(n,e,i){return n(e,i())}}),Fc=Qo({name:"Typesetter",dependencies:[$v],init(n){return function(e){return new Promise(i=>{n.typeset(e,i)})}},getTransferables(n){const e=[];for(let i in n)n[i]&&n[i].buffer&&e.push(n[i].buffer);return e}});Fc.onMainThread;const tl={};function eg(n){let e=tl[n];return e||(e=tl[n]=new qe(1,1,n,n).translate(.5,.5,0)),e}const tg="aTroikaGlyphBounds",ol="aTroikaGlyphIndex",og="aTroikaGlyphColor";class ig extends eu{constructor(){super(),this.detail=1,this.curveRadius=0,this.groups=[{start:0,count:1/0,materialIndex:0},{start:0,count:1/0,materialIndex:1}],this.boundingSphere=new Rl,this.boundingBox=new Ol}computeBoundingSphere(){}computeBoundingBox(){}set detail(e){if(e!==this._detail){this._detail=e,(typeof e!="number"||e<1)&&(e=1);let i=eg(e);["position","normal","uv"].forEach(r=>{this.attributes[r]=i.attributes[r].clone()}),this.setIndex(i.getIndex().clone())}}get detail(){return this._detail}set curveRadius(e){e!==this._curveRadius&&(this._curveRadius=e,this._updateBounds())}get curveRadius(){return this._curveRadius}updateGlyphs(e,i,r,o,t){this.updateAttributeData(tg,e,4),this.updateAttributeData(ol,i,1),this.updateAttributeData(og,t,3),this._blockBounds=r,this._chunkedBounds=o,this.instanceCount=i.length,this._updateBounds()}_updateBounds(){const e=this._blockBounds;if(e){const{curveRadius:i,boundingBox:r}=this;if(i){const{PI:o,floor:t,min:s,max:a,sin:l,cos:c}=Math,f=o/2,u=o*2,h=Math.abs(i),d=e[0]/h,p=e[2]/h,m=t((d+f)/u)!==t((p+f)/u)?-h:s(l(d)*h,l(p)*h),v=t((d-f)/u)!==t((p-f)/u)?h:a(l(d)*h,l(p)*h),g=t((d+o)/u)!==t((p+o)/u)?h*2:a(h-c(d)*h,h-c(p)*h);r.min.set(m,e[1],i<0?-g:0),r.max.set(v,e[3],i<0?0:g)}else r.min.set(e[0],e[1],0),r.max.set(e[2],e[3],0);r.getBoundingSphere(this.boundingSphere)}}applyClipRect(e){let i=this.getAttribute(ol).count,r=this._chunkedBounds;if(r)for(let o=r.length;o--;){i=r[o].end;let t=r[o].rect;if(t[1]<e.w&&t[3]>e.y&&t[0]<e.z&&t[2]>e.x)break}this.instanceCount=i}updateAttributeData(e,i,r){const o=this.getAttribute(e);i?o&&o.array.length===i.length?(o.array.set(i),o.needsUpdate=!0):(this.setAttribute(e,new lo(i,r)),delete this._maxInstanceCount,this.dispose()):o&&this.deleteAttribute(e)}}const ng=`
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform vec4 uTroikaTotalBounds;
uniform vec4 uTroikaClipRect;
uniform mat3 uTroikaOrient;
uniform bool uTroikaUseGlyphColors;
uniform float uTroikaEdgeOffset;
uniform float uTroikaBlurRadius;
uniform vec2 uTroikaPositionOffset;
uniform float uTroikaCurveRadius;
attribute vec4 aTroikaGlyphBounds;
attribute float aTroikaGlyphIndex;
attribute vec3 aTroikaGlyphColor;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec3 vTroikaGlyphColor;
varying vec2 vTroikaGlyphDimensions;
`,rg=`
vec4 bounds = aTroikaGlyphBounds;
bounds.xz += uTroikaPositionOffset.x;
bounds.yw -= uTroikaPositionOffset.y;

vec4 outlineBounds = vec4(
  bounds.xy - uTroikaEdgeOffset - uTroikaBlurRadius,
  bounds.zw + uTroikaEdgeOffset + uTroikaBlurRadius
);
vec4 clippedBounds = vec4(
  clamp(outlineBounds.xy, uTroikaClipRect.xy, uTroikaClipRect.zw),
  clamp(outlineBounds.zw, uTroikaClipRect.xy, uTroikaClipRect.zw)
);

vec2 clippedXY = (mix(clippedBounds.xy, clippedBounds.zw, position.xy) - bounds.xy) / (bounds.zw - bounds.xy);

position.xy = mix(bounds.xy, bounds.zw, clippedXY);

uv = (position.xy - uTroikaTotalBounds.xy) / (uTroikaTotalBounds.zw - uTroikaTotalBounds.xy);

float rad = uTroikaCurveRadius;
if (rad != 0.0) {
  float angle = position.x / rad;
  position.xz = vec2(sin(angle) * rad, rad - cos(angle) * rad);
  normal.xz = vec2(sin(angle), cos(angle));
}
  
position = uTroikaOrient * position;
normal = uTroikaOrient * normal;

vTroikaGlyphUV = clippedXY.xy;
vTroikaGlyphDimensions = vec2(bounds[2] - bounds[0], bounds[3] - bounds[1]);


float txCols = uTroikaSDFTextureSize.x / uTroikaSDFGlyphSize;
vec2 txUvPerSquare = uTroikaSDFGlyphSize / uTroikaSDFTextureSize;
vec2 txStartUV = txUvPerSquare * vec2(
  mod(floor(aTroikaGlyphIndex / 4.0), txCols),
  floor(floor(aTroikaGlyphIndex / 4.0) / txCols)
);
vTroikaTextureUVBounds = vec4(txStartUV, vec2(txStartUV) + txUvPerSquare);
vTroikaTextureChannel = mod(aTroikaGlyphIndex, 4.0);
`,sg=`
uniform sampler2D uTroikaSDFTexture;
uniform vec2 uTroikaSDFTextureSize;
uniform float uTroikaSDFGlyphSize;
uniform float uTroikaSDFExponent;
uniform float uTroikaEdgeOffset;
uniform float uTroikaFillOpacity;
uniform float uTroikaBlurRadius;
uniform vec3 uTroikaStrokeColor;
uniform float uTroikaStrokeWidth;
uniform float uTroikaStrokeOpacity;
uniform bool uTroikaSDFDebug;
varying vec2 vTroikaGlyphUV;
varying vec4 vTroikaTextureUVBounds;
varying float vTroikaTextureChannel;
varying vec2 vTroikaGlyphDimensions;

float troikaSdfValueToSignedDistance(float alpha) {
  // Inverse of exponential encoding in webgl-sdf-generator
  
  float maxDimension = max(vTroikaGlyphDimensions.x, vTroikaGlyphDimensions.y);
  float absDist = (1.0 - pow(2.0 * (alpha > 0.5 ? 1.0 - alpha : alpha), 1.0 / uTroikaSDFExponent)) * maxDimension;
  float signedDist = absDist * (alpha > 0.5 ? -1.0 : 1.0);
  return signedDist;
}

float troikaGlyphUvToSdfValue(vec2 glyphUV) {
  vec2 textureUV = mix(vTroikaTextureUVBounds.xy, vTroikaTextureUVBounds.zw, glyphUV);
  vec4 rgba = texture2D(uTroikaSDFTexture, textureUV);
  float ch = floor(vTroikaTextureChannel + 0.5); //NOTE: can't use round() in WebGL1
  return ch == 0.0 ? rgba.r : ch == 1.0 ? rgba.g : ch == 2.0 ? rgba.b : rgba.a;
}

float troikaGlyphUvToDistance(vec2 uv) {
  return troikaSdfValueToSignedDistance(troikaGlyphUvToSdfValue(uv));
}

float troikaGetAADist() {
  
  #if defined(GL_OES_standard_derivatives) || __VERSION__ >= 300
  return length(fwidth(vTroikaGlyphUV * vTroikaGlyphDimensions)) * 0.5;
  #else
  return vTroikaGlyphDimensions.x / 64.0;
  #endif
}

float troikaGetFragDistValue() {
  vec2 clampedGlyphUV = clamp(vTroikaGlyphUV, 0.5 / uTroikaSDFGlyphSize, 1.0 - 0.5 / uTroikaSDFGlyphSize);
  float distance = troikaGlyphUvToDistance(clampedGlyphUV);
 
  // Extrapolate distance when outside bounds:
  distance += clampedGlyphUV == vTroikaGlyphUV ? 0.0 : 
    length((vTroikaGlyphUV - clampedGlyphUV) * vTroikaGlyphDimensions);

  

  return distance;
}

float troikaGetEdgeAlpha(float distance, float distanceOffset, float aaDist) {
  #if defined(IS_DEPTH_MATERIAL) || defined(IS_DISTANCE_MATERIAL)
  float alpha = step(-distanceOffset, -distance);
  #else

  float alpha = smoothstep(
    distanceOffset + aaDist,
    distanceOffset - aaDist,
    distance
  );
  #endif

  return alpha;
}
`,ag=`
float aaDist = troikaGetAADist();
float fragDistance = troikaGetFragDistValue();
float edgeAlpha = uTroikaSDFDebug ?
  troikaGlyphUvToSdfValue(vTroikaGlyphUV) :
  troikaGetEdgeAlpha(fragDistance, uTroikaEdgeOffset, max(aaDist, uTroikaBlurRadius));

#if !defined(IS_DEPTH_MATERIAL) && !defined(IS_DISTANCE_MATERIAL)
vec4 fillRGBA = gl_FragColor;
fillRGBA.a *= uTroikaFillOpacity;
vec4 strokeRGBA = uTroikaStrokeWidth == 0.0 ? fillRGBA : vec4(uTroikaStrokeColor, uTroikaStrokeOpacity);
if (fillRGBA.a == 0.0) fillRGBA.rgb = strokeRGBA.rgb;
gl_FragColor = mix(fillRGBA, strokeRGBA, smoothstep(
  -uTroikaStrokeWidth - aaDist,
  -uTroikaStrokeWidth + aaDist,
  fragDistance
));
gl_FragColor.a *= edgeAlpha;
#endif

if (edgeAlpha == 0.0) {
  discard;
}
`;function lg(n){const e=jr(n,{chained:!0,extensions:{derivatives:!0},uniforms:{uTroikaSDFTexture:{value:null},uTroikaSDFTextureSize:{value:new xe},uTroikaSDFGlyphSize:{value:0},uTroikaSDFExponent:{value:0},uTroikaTotalBounds:{value:new Be(0,0,0,0)},uTroikaClipRect:{value:new Be(0,0,0,0)},uTroikaEdgeOffset:{value:0},uTroikaFillOpacity:{value:1},uTroikaPositionOffset:{value:new xe},uTroikaCurveRadius:{value:0},uTroikaBlurRadius:{value:0},uTroikaStrokeWidth:{value:0},uTroikaStrokeColor:{value:new Ke},uTroikaStrokeOpacity:{value:1},uTroikaOrient:{value:new xl},uTroikaUseGlyphColors:{value:!0},uTroikaSDFDebug:{value:!1}},vertexDefs:ng,vertexTransform:rg,fragmentDefs:sg,fragmentColorTransform:ag,customRewriter({vertexShader:i,fragmentShader:r}){let o=/\buniform\s+vec3\s+diffuse\b/;return o.test(r)&&(r=r.replace(o,"varying vec3 vTroikaGlyphColor").replace(/\bdiffuse\b/g,"vTroikaGlyphColor"),o.test(i)||(i=i.replace(Lc,`uniform vec3 diffuse;
$&
vTroikaGlyphColor = uTroikaUseGlyphColors ? aTroikaGlyphColor / 255.0 : diffuse;
`))),{vertexShader:i,fragmentShader:r}}});return e.transparent=!0,e.forceSinglePass=!0,Object.defineProperties(e,{isTroikaTextMaterial:{value:!0},shadowSide:{get(){return this.side},set(){}}}),e}const cs=new Dt({color:16777215,side:nt,transparent:!0}),il=8421504,nl=new be,hn=new H,Mr=new H,gi=[],cg=new H,wr="+x+y";function rl(n){return Array.isArray(n)?n[0]:n}let Ic=()=>{const n=new Ue(new qe(1,1),cs);return Ic=()=>n,n},kc=()=>{const n=new Ue(new qe(1,1,32,1),cs);return kc=()=>n,n};const fg={type:"syncstart"},ug={type:"synccomplete"},Nc=["font","fontSize","fontStyle","fontWeight","lang","letterSpacing","lineHeight","maxWidth","overflowWrap","text","direction","textAlign","textIndent","whiteSpace","anchorX","anchorY","colorRanges","sdfGlyphSize"],hg=Nc.concat("material","color","depthOffset","clipRect","curveRadius","orientation","glyphGeometryDetail");class Bc extends Ue{constructor(){const e=new ig;super(e,null),this.text="",this.anchorX=0,this.anchorY=0,this.curveRadius=0,this.direction="auto",this.font=null,this.unicodeFontsURL=null,this.fontSize=.1,this.fontWeight="normal",this.fontStyle="normal",this.lang=null,this.letterSpacing=0,this.lineHeight="normal",this.maxWidth=1/0,this.overflowWrap="normal",this.textAlign="left",this.textIndent=0,this.whiteSpace="normal",this.material=null,this.color=null,this.colorRanges=null,this.outlineWidth=0,this.outlineColor=0,this.outlineOpacity=1,this.outlineBlur=0,this.outlineOffsetX=0,this.outlineOffsetY=0,this.strokeWidth=0,this.strokeColor=il,this.strokeOpacity=1,this.fillOpacity=1,this.depthOffset=0,this.clipRect=null,this.orientation=wr,this.glyphGeometryDetail=1,this.sdfGlyphSize=null,this.gpuAccelerateSDF=!0,this.debugSDF=!1}sync(e){this._needsSync&&(this._needsSync=!1,this._isSyncing?(this._queuedSyncs||(this._queuedSyncs=[])).push(e):(this._isSyncing=!0,this.dispatchEvent(fg),qv({text:this.text,font:this.font,lang:this.lang,fontSize:this.fontSize||.1,fontWeight:this.fontWeight||"normal",fontStyle:this.fontStyle||"normal",letterSpacing:this.letterSpacing||0,lineHeight:this.lineHeight||"normal",maxWidth:this.maxWidth,direction:this.direction||"auto",textAlign:this.textAlign,textIndent:this.textIndent,whiteSpace:this.whiteSpace,overflowWrap:this.overflowWrap,anchorX:this.anchorX,anchorY:this.anchorY,colorRanges:this.colorRanges,includeCaretPositions:!0,sdfGlyphSize:this.sdfGlyphSize,gpuAccelerateSDF:this.gpuAccelerateSDF,unicodeFontsURL:this.unicodeFontsURL},i=>{this._isSyncing=!1,this._textRenderInfo=i,this.geometry.updateGlyphs(i.glyphBounds,i.glyphAtlasIndices,i.blockBounds,i.chunkedBounds,i.glyphColors);const r=this._queuedSyncs;r&&(this._queuedSyncs=null,this._needsSync=!0,this.sync(()=>{r.forEach(o=>o&&o())})),this.dispatchEvent(ug),e&&e()})))}onBeforeRender(e,i,r,o,t,s){this.sync(),t.isTroikaTextMaterial&&this._prepareForRender(t)}dispose(){this.geometry.dispose()}get textRenderInfo(){return this._textRenderInfo||null}createDerivedMaterial(e){return lg(e)}get material(){let e=this._derivedMaterial;const i=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=cs.clone());if((!e||!e.isDerivedFrom(i))&&(e=this._derivedMaterial=this.createDerivedMaterial(i),i.addEventListener("dispose",function r(){i.removeEventListener("dispose",r),e.dispose()})),this.hasOutline()){let r=e._outlineMtl;return r||(r=e._outlineMtl=Object.create(e,{id:{value:e.id+.1}}),r.isTextOutlineMaterial=!0,r.depthWrite=!1,r.map=null,e.addEventListener("dispose",function o(){e.removeEventListener("dispose",o),r.dispose()})),[r,e]}else return e}set material(e){e&&e.isTroikaTextMaterial?(this._derivedMaterial=e,this._baseMaterial=e.baseMaterial):this._baseMaterial=e}hasOutline(){return!!(this.outlineWidth||this.outlineBlur||this.outlineOffsetX||this.outlineOffsetY)}get glyphGeometryDetail(){return this.geometry.detail}set glyphGeometryDetail(e){this.geometry.detail=e}get curveRadius(){return this.geometry.curveRadius}set curveRadius(e){this.geometry.curveRadius=e}get customDepthMaterial(){return rl(this.material).getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return rl(this.material).getDistanceMaterial()}set customDistanceMaterial(e){}_prepareForRender(e){const i=e.isTextOutlineMaterial,r=e.uniforms,o=this.textRenderInfo;if(o){const{sdfTexture:a,blockBounds:l}=o;r.uTroikaSDFTexture.value=a,r.uTroikaSDFTextureSize.value.set(a.image.width,a.image.height),r.uTroikaSDFGlyphSize.value=o.sdfGlyphSize,r.uTroikaSDFExponent.value=o.sdfExponent,r.uTroikaTotalBounds.value.fromArray(l),r.uTroikaUseGlyphColors.value=!i&&!!o.glyphColors;let c=0,f=0,u=0,h,d,p,m=0,v=0;if(i){let{outlineWidth:y,outlineOffsetX:S,outlineOffsetY:b,outlineBlur:T,outlineOpacity:C}=this;c=this._parsePercent(y)||0,f=Math.max(0,this._parsePercent(T)||0),h=C,m=this._parsePercent(S)||0,v=this._parsePercent(b)||0}else u=Math.max(0,this._parsePercent(this.strokeWidth)||0),u&&(p=this.strokeColor,r.uTroikaStrokeColor.value.set(p??il),d=this.strokeOpacity,d==null&&(d=1)),h=this.fillOpacity;r.uTroikaEdgeOffset.value=c,r.uTroikaPositionOffset.value.set(m,v),r.uTroikaBlurRadius.value=f,r.uTroikaStrokeWidth.value=u,r.uTroikaStrokeOpacity.value=d,r.uTroikaFillOpacity.value=h??1,r.uTroikaCurveRadius.value=this.curveRadius||0;let g=this.clipRect;if(g&&Array.isArray(g)&&g.length===4)r.uTroikaClipRect.value.fromArray(g);else{const y=(this.fontSize||.1)*100;r.uTroikaClipRect.value.set(l[0]-y,l[1]-y,l[2]+y,l[3]+y)}this.geometry.applyClipRect(r.uTroikaClipRect.value)}r.uTroikaSDFDebug.value=!!this.debugSDF,e.polygonOffset=!!this.depthOffset,e.polygonOffsetFactor=e.polygonOffsetUnits=this.depthOffset||0;const t=i?this.outlineColor||0:this.color;if(t==null)delete e.color;else{const a=e.hasOwnProperty("color")?e.color:e.color=new Ke;(t!==a._input||typeof t=="object")&&a.set(a._input=t)}let s=this.orientation||wr;if(s!==e._orientation){let a=r.uTroikaOrient.value;s=s.replace(/[^-+xyz]/g,"");let l=s!==wr&&s.match(/^([-+])([xyz])([-+])([xyz])$/);if(l){let[,c,f,u,h]=l;hn.set(0,0,0)[f]=c==="-"?1:-1,Mr.set(0,0,0)[h]=u==="-"?-1:1,nl.lookAt(cg,hn.cross(Mr),Mr),a.setFromMatrix4(nl)}else a.identity();e._orientation=s}}_parsePercent(e){if(typeof e=="string"){let i=e.match(/^(-?[\d.]+)%$/),r=i?parseFloat(i[1]):NaN;e=(isNaN(r)?0:r/100)*this.fontSize}return e}localPositionToTextCoords(e,i=new xe){i.copy(e);const r=this.curveRadius;return r&&(i.x=Math.atan2(e.x,Math.abs(r)-Math.abs(e.z))*Math.abs(r)),i}worldPositionToTextCoords(e,i=new xe){return hn.copy(e),this.localPositionToTextCoords(this.worldToLocal(hn),i)}raycast(e,i){const{textRenderInfo:r,curveRadius:o}=this;if(r){const t=r.blockBounds,s=o?kc():Ic(),a=s.geometry,{position:l,uv:c}=a.attributes;for(let f=0;f<c.count;f++){let u=t[0]+c.getX(f)*(t[2]-t[0]);const h=t[1]+c.getY(f)*(t[3]-t[1]);let d=0;o&&(d=o-Math.cos(u/o)*o,u=Math.sin(u/o)*o),l.setXYZ(f,u,h,d)}a.boundingSphere=this.geometry.boundingSphere,a.boundingBox=this.geometry.boundingBox,s.matrixWorld=this.matrixWorld,s.material.side=this.material.side,gi.length=0,s.raycast(e,gi);for(let f=0;f<gi.length;f++)gi[f].object=this,i.push(gi[f])}}copy(e){const i=this.geometry;return super.copy(e),this.geometry=i,hg.forEach(r=>{this[r]=e[r]}),this}clone(){return new this.constructor().copy(this)}}Nc.forEach(n=>{const e="_private_"+n;Object.defineProperty(Bc.prototype,n,{get(){return this[e]},set(i){i!==this[e]&&(this[e]=i,this._needsSync=!0)}})});new Ke;const dg="/chro/fonts/teko-medium.ttf",Uc=new WeakMap,fs=.55;function us(n=1,e=16777215){const i=new Dt({color:e,transparent:!0,opacity:n,depthTest:!0,depthWrite:!1});return i.blending=ot,i.blendEquation=Ae,i.blendSrc=Eo,i.blendDst=Gt,i.blendEquationAlpha=Ae,i.blendSrcAlpha=St,i.blendDstAlpha=Me,i}function hs(n=16777215,e=fs){const i=us(1,n);return e===0||(i.blendSrcAlpha=tu,i.blendDstAlpha=Gt,i.blendAlpha=e),i}function pg(n){return bl(qr()).number(n,"integer")}function mg(n){return bl(qr()).number(n,"precisePercent")}function vg(n){return n>=.9?"SS":n>=.8?"S":n>=.65?"A":n>=.5?"B":n>=.35?"C":n>=.2?"D":"E"}function Lt(n,e,i,r="middle",o="center",t=!1,s=fs,a=!0){const l=new Bc,c=t?hs(16777215,s):us();return l.material=c,Uc.set(l,c),l.text=n,l.font=dg,l.fontSize=e,l.color=16777215,l.fillOpacity=1,l.anchorX=o,l.anchorY=r,l.textAlign="center",l.depthOffset=0,l.position.set(...i),l.renderOrder=1e3,l.frustumCulled=!1,l.layers.set(Bt),a&&l.sync(),l}function Gc(n){n.dispose(),Uc.get(n)?.dispose()}function Er(n){const{x:e,y:i,z:r}=n.position;n.matrix.set(1,.2,0,e,0,1,0,i,0,0,1,r,0,0,0,1),n.matrixAutoUpdate=!1}function Pt(n,e=1,i=16777215){const r=new Ue(n,us(e,i));return r.renderOrder=1e3,r.layers.set(Bt),r}function sl(n){return nf(n,qr())}function al(n,e=null){return e!==null?e:Math.max(n.poses.at(-1)?.time??0,n.notes.at(-1)?.time??0,n.scores.at(-1)?.time??0,n.walls.at(-1)?.exitTime??0)}const gg=.26,yg=.46;function bg(n,e,i,r){const o=new it,t=[],s=r?yg:gg,a=n[0],l=n.length===1&&a?.baselineOffset===void 0&&a?.underline!==!0?a:void 0;if(l!==void 0&&!l.text.includes(`
`)){const p=Lt(l.text,s*l.scale,[0,0,0],"middle","center",!0,i,!1);return p.color=l.color??e,p.maxWidth=2.5,p.sync(),o.add(p),{root:o,texts:[p],decorations:t}}const c=[[]];for(const p of n){const m=p.text.split(`
`);for(const[v,g]of m.entries()){if(g!==""){const y=Lt(g,s*p.scale,[0,0,0],"bottom-baseline","left",!0,i,!1);y.color=p.color??e,y.maxWidth=2.5;const S=p.underline===!0?new Ue(new qe(1,1),hs(p.color??e,i)):void 0;S!==void 0&&(S.renderOrder=1001,S.layers.set(Bt),t.push(S),o.add(S)),c.at(-1)?.push({run:p,text:y,underline:S}),o.add(y)}v<m.length-1&&c.push([])}}const f=c.flat().map(p=>p.text),u=c.map(p=>Math.max(s,...p.map(m=>m.text.fontSize)));let d=u.reduce((p,m)=>p+m,0)/2;for(const[p,m]of c.entries()){let v=function(){if(--S>0)return;const b=m.map(C=>{const x=C.text.textRenderInfo?.blockBounds;return x===void 0?0:x[2]-x[0]});let T=-b.reduce((C,x)=>C+x,0)/2;for(const[C,x]of m.entries()){const P=b[C]??0,O=y+(x.run.baselineOffset??0)*s;x.text.position.set(T,O,0),x.underline!==void 0&&(x.underline.position.set(T+P/2,O-x.text.fontSize*.12,.001),x.underline.scale.set(P,x.text.fontSize*.055,1)),T+=P}};const g=u[p]??s,y=d-g*.8;let S=m.length;for(const b of m)b.text.sync(v);d-=g}return{root:o,texts:f,decorations:t}}function Ko(n,e,i,r,o){const t=o*o,s=t*o;return(2*s-3*t+1)*n+(s-2*t+o)*i+(-2*s+3*t)*e+(s-t)*r}function Sg(n){const e=.18576352;if(n<=e)return Ko(0,.62048507,3.3401878*e,1.5404444*e,n/e);const i=1-e;return Ko(.62048507,1,1.5404444*i,0,(n-e)/i)}function _g(n){if(n<.2)return 3*(n/.2)**2-2*(n/.2)**3;if(n<=.40029904)return 1;const e=(n-.40029904)/(1-.40029904);return 1-(3*e**2-2*e**3)}function Tg(n){const e=.15881044;if(n<=e)return Ko(0,.7196346,4.5314064*e,1.0496378*e,n/e);const i=1-e;return Ko(.7196346,1,1.0496378*i,0,(n-e)/i)}function xg(n){const e=.15138501;if(n<=e)return Ko(0,1,0,.024424182*e,n/e);const i=1-e;return Math.max(0,Ko(1,0,.024424182*i,0,(n-e)/i))}class Mg{root=new it;flying=new Map;start=new H;target=new H;rotation=new ge;inverseRotation=new ge;update(e,i){const r=ou(e,i,.7),o=new Set(r.map(t=>t.id));for(const[t,s]of this.flying)o.has(t)||(this.disposeFlyingText(s),this.flying.delete(t));for(const t of r){const s=e.events[t.id]?.note;if(s===void 0)continue;let a=this.flying.get(t.id);a===void 0&&(a=this.createFlyingText(t.runs,t.color,t.showCenterIndicator,t.kind!=="score",s,e),this.flying.set(t.id,a),this.root.add(a.root)),a.root.position.lerpVectors(a.start,a.target,a.failure?Tg(t.age):Sg(t.age)),a.root.quaternion.copy(a.rotation);const l=(a.failure?xg(t.age):_g(t.age))*t.opacity;for(const c of a.texts)c.fillOpacity=l;for(const c of a.decorations)c.material.opacity=l;a.indicator!==void 0&&(a.indicator.material.opacity=l)}}clear(){for(const e of this.flying.values())this.disposeFlyingText(e);this.flying.clear()}createFlyingText(e,i,r,o,t,s){const a=o||s.hitScoreVisualizer===null?fs:0,{root:l,texts:c,decorations:f}=bg(e,i,a,o),u=r?new Ue(new qe(.32,.04),hs(i)):void 0;u!==void 0&&(u.position.set(0,-.15,.01),u.renderOrder=1001,u.layers.set(Bt),l.add(u));const h=s.hitScoreVisualizer?.fixedPosition,d=h===void 0?this.start.set(t.cutPoint.x,t.cutPoint.y,-t.cutPoint.z).clone():this.start.set(h[0],h[1],-h[2]).clone(),p=t.worldRotation===void 0?new ge:this.rotation.set(-t.worldRotation.x,-t.worldRotation.y,t.worldRotation.z,t.worldRotation.w).clone();if(o){this.inverseRotation.copy(p).invert(),t.eventType===3&&(t.notePosition===void 0?this.start.set((t.noteId.lineIndex-1.5)*.6,t.noteId.lineLayer*.6+.85,0).applyQuaternion(p):(this.start.set(t.notePosition.x,t.notePosition.y,-t.notePosition.z).applyQuaternion(this.inverseRotation),this.start.z=0,this.start.applyQuaternion(p)));const y=t.eventType===3?this.start.clone():this.start.set(t.cutPoint.x,t.cutPoint.y,-t.cutPoint.z).clone(),S=this.target.copy(y).applyQuaternion(this.inverseRotation),b=this.target.set(S.x<0?-2:2,1.3,-15).applyQuaternion(p).clone();return{root:l,texts:c,decorations:f,indicator:u,start:y,target:b,rotation:p,failure:o}}if(h!==void 0)return{root:l,texts:c,decorations:f,indicator:u,start:d,target:d.clone(),rotation:p,failure:o};this.inverseRotation.copy(p).invert();const m=this.target.copy(d).applyQuaternion(this.inverseRotation);m.z=0,m.y=-.24,m.z-=7.55;const v=m.applyQuaternion(p).clone(),g=s.hitScoreVisualizer?.targetPositionOffset;return g!==void 0&&v.add(this.start.set(g[0],g[1],-g[2])),{root:l,texts:c,decorations:f,indicator:u,start:d,target:v,rotation:p,failure:o}}disposeFlyingText(e){this.root.remove(e.root),e.indicator?.geometry.dispose(),e.indicator?.material.dispose();for(const i of e.decorations)i.geometry.dispose(),i.material.dispose();for(const i of e.texts)Gc(i)}}const wg=-3.2;class Eg{root=new it;scoreHud=new it;comboPanel=new it;combo=Lt("0",.46,[0,-.165,0]);comboLabel=Lt("COMBO",.33,[0,.165,0]);score=Lt("0",.33,[-3.2,1.17,-6.99]);rank=Lt("SS",.66,[-3.2,.48,-6.98]);accuracy=Lt("100.00%",.27,[-3.2,.88,-6.98]);multiplierNumber=Lt("1",.6,[3.28,1.68,-6.97]);multiplierX=Lt("x",.3,[3.01,1.83,-6.97]);songTime=Lt("0:00",.24,[2.92,.76,-6.97]);songDuration=Lt("0:00",.24,[3.48,.76,-6.97]);energyFill;songProgressFill;multiplierProgress;comboTopLine;comboBottomLine;textMeshes;panelMeshes;flyingScores=new Mg;timeline=null;comboBreakTime=null;songDurationSeconds=null;scoreStackLayout="";constructor(){this.root.visible=!1,this.root.renderOrder=1e3,this.comboPanel.position.set(-3.2,1.775,-6.99),this.comboPanel.add(this.combo,this.comboLabel),Er(this.comboLabel),Er(this.multiplierNumber),Er(this.multiplierX),this.rank.fillOpacity=.5,this.accuracy.fillOpacity=.5,this.songDuration.fillOpacity=.5;for(const c of[this.multiplierNumber,this.multiplierX,this.songTime,this.songDuration])c.outlineWidth=c.fontSize*.012,c.outlineColor=16777215,c.outlineOpacity=c.fillOpacity;this.textMeshes=[this.combo,this.comboLabel,this.score,this.rank,this.accuracy,this.multiplierNumber,this.multiplierX,this.songTime,this.songDuration],this.scoreHud.add(this.comboPanel,this.score,this.rank,this.accuracy,this.multiplierNumber,this.multiplierX,this.songTime,this.songDuration),this.root.add(this.scoreHud,this.flyingScores.root),this.comboTopLine=Pt(new qe(1,.04)),this.comboTopLine.position.set(-3.2,2.18,-7),this.comboBottomLine=Pt(new qe(1,.04)),this.comboBottomLine.position.set(-3.2,1.41,-7);const e=Pt(new qe(1.94,.09),.75,0);e.position.set(0,-.64,-7.75),e.renderOrder=999;const i=new qe(1.908,.06).translate(.954,0,0);this.energyFill=Pt(i),this.energyFill.position.set(-.954,-.64,-7.73);const r=Pt(new qe(.12,.12),.25);r.position.set(-1.1,-.64,-7.73),r.rotation.z=Math.PI/4;const o=Pt(new qe(.12,.12),.25);o.position.set(1.06,-.64,-7.73),o.rotation.z=Math.PI/4;const t=Pt(new Zs(.47,.5,64),.25);t.position.set(3.2,1.7,-7),t.renderOrder=999,this.multiplierProgress=Pt(new Zs(.47,.5,64,1,Math.PI/2,-Math.PI*2)),this.multiplierProgress.position.set(3.2,1.7,-6.97);const s=Pt(new qe(1,.06),.25);s.position.set(3.2,.98,-6.99);const a=new qe(1,.06).translate(.5,0,0);this.songProgressFill=Pt(a),this.songProgressFill.position.set(2.7,.98,-6.97);const l=Pt(new qe(.02,.18),.5);l.position.set(3.2,.76,-6.99),this.scoreHud.add(this.comboTopLine,this.comboBottomLine,e,this.energyFill,r,o,t,this.multiplierProgress,s,this.songProgressFill,l),this.panelMeshes=[this.comboTopLine,this.comboBottomLine,e,this.energyFill,r,o,t,this.multiplierProgress,s,this.songProgressFill,l]}setReplay(e,i){this.timeline=e===null?null:i===void 0?tr(e):tr(e,i),this.comboBreakTime=e===null?null:qs(e),this.root.visible=e!==null,this.scoreHud.visible=e!==null&&e.scores.length>0,this.flyingScores.clear(),this.updateComboBreak(0),this.timeline!==null&&(this.refreshDuration(),this.updateState(Ks(this.timeline,0)))}setSongDuration(e){this.songDurationSeconds=e,this.refreshDuration()}setEnabled(e){this.root.visible=e&&this.timeline!==null}setHitScoreVisualizer(e){this.timeline!==null&&(this.timeline={...this.timeline,hitScoreVisualizer:e},this.flyingScores.clear())}refreshTimeline(){const e=this.timeline;e!==null&&(this.timeline=tr(e.replay,e.hitScoreVisualizer),this.comboBreakTime=qs(e.replay),this.scoreHud.visible=e.replay.scores.length>0,this.refreshDuration())}update(e){const i=this.timeline;if(i===null)return;this.updateState(Ks(i,e));const r=al(i.replay,this.songDurationSeconds);this.setText(this.songTime,sl(e)),this.songProgressFill.scale.x=r===0?0:Math.min(Math.max(e/r,0),1),this.flyingScores.update(i,e),this.updateComboBreak(e)}dispose(){this.flyingScores.clear();for(const e of this.textMeshes)Gc(e);for(const e of this.panelMeshes)e.geometry.dispose(),e.material.dispose()}updateState(e){this.setText(this.combo,String(e.combo)),this.updateScoreStack(pg(e.score),mg(e.accuracy),vg(e.accuracy)),this.setText(this.multiplierNumber,String(e.multiplier)),this.energyFill.scale.x=e.energy;const i=Math.min(Math.max(e.multiplierProgress,0),1);this.multiplierProgress.geometry.setDrawRange(0,Math.floor(i*64)*6)}refreshDuration(){const e=this.timeline?.replay;e!==void 0&&this.setText(this.songDuration,sl(al(e,this.songDurationSeconds)))}updateComboBreak(e){const i=this.comboBreakTime===null?null:e-this.comboBreakTime,r=gv(i);this.comboTopLine.visible=r.linesVisible,this.comboBottomLine.visible=r.linesVisible,this.comboTopLine.material.opacity=r.lineAlpha,this.comboBottomLine.material.opacity=r.lineAlpha,this.comboTopLine.position.x=-3.2+r.topLineX,this.comboBottomLine.position.x=-3.2+r.bottomLineX,this.comboTopLine.scale.x=r.lineScaleX,this.comboBottomLine.scale.x=r.lineScaleX,this.comboPanel.scale.set(r.comboScaleX,r.comboScaleY,1),this.comboPanel.rotation.z=ut.degToRad(r.comboRotationDegrees),this.comboPanel.position.z=-6.99-r.comboDepth}updateScoreStack(e,i,r){const o=`${e}\0${i}\0${r}`;if(o===this.scoreStackLayout)return;this.scoreStackLayout=o,this.score.text=e,this.accuracy.text=i,this.rank.text=r;const t=[this.score,this.accuracy,this.rank];let s=t.length;const a=()=>{if(!(--s>0))for(const l of t){const c=l.textRenderInfo?.visibleBounds;if(c!==void 0){const f=l===this.accuracy?.03:0;l.position.x=wg-(c[0]+c[2])/2+f}}};for(const l of t)l.sync(a)}setText(e,i){e.text!==i&&(e.text=i,e.sync())}}const bn=Math.PI/180,Cg=120,Pg=10,Ag=1.5,Lg=10,Rg=bn,Og=1;function Wc(n){return Math.min(Math.max((1-n)/.75,0),1)}function Dg(n,e){return Math.min(n+Wc(e)*Pg,Cg)}function Fg(n){return Wc(n)*Ag}function Ig(n,e=new Ri(0,0,0,"YXZ")){return e.setFromQuaternion(n,"YXZ"),e.x=Rg+e.x*Og,e.z=0,n.setFromEuler(e)}class kg{constructor(e){this.camera=e,this.camera.far=jl,this.camera.updateProjectionMatrix()}camera;position=new H;offset=new H;quaternion=new ge;rotationQuaternion=new ge;euler=new Ri(0,0,0,"YXZ");headEuler=new Ri(0,0,0,"YXZ");mode=Vo.replayCamera;settings=Vo;previewCameraDistanceOverride=null;forced=!1;hasReplay=!1;hasMapNotes=!1;poseReady=!1;replayTime=Number.NEGATIVE_INFINITY;updatedAt=performance.now();get cameraMode(){return this.mode}reset(){this.poseReady=!1,this.replayTime=Number.NEGATIVE_INFINITY,this.updatedAt=performance.now()}setMode(e){e!==this.mode&&this.reset(),this.mode=e,this.applyFov(),e==="static"&&(this.camera.position.set(...To(this.staticCameraDistance)),this.camera.quaternion.identity())}setSettings(e,i,r){if(this.settings=e,this.forced=i,this.hasReplay=r,i){this.applyFov(),this.camera.position.set(...To(this.staticCameraDistance));return}this.setMode(r?e.replayCamera:"static")}setForced(e,i){if(this.forced=e,this.hasReplay=i,!e){this.setMode(i?this.settings.replayCamera:"static");return}this.applyFov(),this.reset(),this.camera.position.set(...To(this.staticCameraDistance)),this.camera.quaternion.identity()}setReplayPresence(e){if(this.hasReplay=e,!this.forced){this.setMode(e?this.settings.replayCamera:"static");return}this.camera.position.set(...To(this.staticCameraDistance))}setMapHasNotes(e){this.hasMapNotes=e,this.hasReplay||this.camera.position.set(...To(this.staticCameraDistance))}setPreviewCameraDistanceOverride(e){this.previewCameraDistanceOverride=e,this.hasReplay||this.camera.position.set(...To(this.staticCameraDistance))}setAspect(e){this.camera.aspect=e,this.applyFov()}update(e,i){this.mode==="first-person"?this.updateFirstPerson(e,i):this.mode==="follow"&&(e.getWorldPosition(this.position),this.camera.position.copy(this.position).add(this.offset.set(0,.4,2.5)),this.camera.lookAt(this.position.add(this.offset.set(0,0,-2))),this.camera.position.add(this.offset.set(0,0,this.responsivePullback).applyQuaternion(this.camera.quaternion)))}updateFirstPerson(e,i){const r=this.settings,o=i<this.replayTime||i-this.replayTime>.25,t=performance.now(),s=r.replayCameraSmoothing?Math.min((t-this.updatedAt)/1e3*r.replayCameraSmoothingSpeed,1):1;this.replayTime=i,this.updatedAt=t,e.getWorldPosition(this.position),this.position.add(this.offset.set(r.replayCameraXOffset,r.replayCameraYOffset,-r.replayCameraDepthOffset)),this.euler.set(-r.replayCameraXRotation*bn,-r.replayCameraYRotation*bn,r.replayCameraZRotation*bn,"YXZ"),e.getWorldQuaternion(this.quaternion),r.replayCameraForceUpright&&Ig(this.quaternion,this.headEuler),this.quaternion.multiply(this.rotationQuaternion.setFromEuler(this.euler)),this.position.add(this.offset.set(0,0,this.responsivePullback).applyQuaternion(this.quaternion));const a=this.poseReady&&this.camera.position.distanceToSquared(this.position)>Lg**2,l=this.poseReady&&!o&&!a?s:1;this.camera.position.lerp(this.position,l),this.camera.quaternion.slerp(this.quaternion,l),this.poseReady=!0}applyFov(){const e=!this.forced&&this.mode!=="static";this.camera.fov=e?Dg(this.settings.replayCameraFov,this.camera.aspect):this.settings.replayCameraFov,this.camera.updateProjectionMatrix()}get responsivePullback(){return!this.forced&&this.mode!=="static"?Fg(this.camera.aspect):0}get staticCameraDistance(){return this.forced&&!this.hasReplay&&!this.hasMapNotes?0:this.hasReplay?this.settings.fixedCameraDistance:this.previewCameraDistanceOverride??this.settings.previewCameraDistance}}function ll(n,e){if(e===iu)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),n;if(e===Fr||e===Dl){let i=n.getIndex();if(i===null){const s=[],a=n.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)s.push(l);n.setIndex(s),i=n.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),n}const r=i.count-2,o=[];if(e===Fr)for(let s=1;s<=r;s++)o.push(i.getX(0)),o.push(i.getX(s)),o.push(i.getX(s+1));else for(let s=0;s<r;s++)s%2===0?(o.push(i.getX(s)),o.push(i.getX(s+1)),o.push(i.getX(s+2))):(o.push(i.getX(s+2)),o.push(i.getX(s+1)),o.push(i.getX(s)));o.length/3!==r&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const t=n.clone();return t.setIndex(o),t.clearGroups(),t}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),n}function Ng(n){const e=new Map,i=new Map,r=n.clone();return zc(n,r,function(o,t){e.set(t,o),i.set(o,t)}),r.traverse(function(o){if(!o.isSkinnedMesh)return;const t=o,s=e.get(o),a=s.skeleton.bones;t.skeleton=s.skeleton.clone(),t.bindMatrix.copy(s.bindMatrix),t.skeleton.bones=a.map(function(l){return i.get(l)}),t.bind(t.skeleton,t.bindMatrix)}),r}function zc(n,e,i){i(n,e);for(let r=0;r<n.children.length;r++)zc(n.children[r],e.children[r],i)}class Bg extends nu{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(i){return new jg(i)}),this.register(function(i){return new Hg(i)}),this.register(function(i){return new $g(i)}),this.register(function(i){return new e1(i)}),this.register(function(i){return new t1(i)}),this.register(function(i){return new Xg(i)}),this.register(function(i){return new Yg(i)}),this.register(function(i){return new Zg(i)}),this.register(function(i){return new qg(i)}),this.register(function(i){return new zg(i)}),this.register(function(i){return new Kg(i)}),this.register(function(i){return new Vg(i)}),this.register(function(i){return new Qg(i)}),this.register(function(i){return new Jg(i)}),this.register(function(i){return new Gg(i)}),this.register(function(i){return new cl(i,ye.EXT_MESHOPT_COMPRESSION)}),this.register(function(i){return new cl(i,ye.KHR_MESHOPT_COMPRESSION)}),this.register(function(i){return new o1(i)})}load(e,i,r,o){const t=this;let s;if(this.resourcePath!=="")s=this.resourcePath;else if(this.path!==""){const c=xi.extractUrlBase(e);s=xi.resolveURL(c,this.path)}else s=xi.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){o?o(c):console.error(c),t.manager.itemError(e),t.manager.itemEnd(e)},l=new Fl(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{t.parse(c,s,function(f){i(f),t.manager.itemEnd(e)},a)}catch(f){a(f)}},r,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,i,r,o){let t;const s={},a={},l=new TextDecoder;if(typeof e=="string")t=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===jc){try{s[ye.KHR_BINARY_GLTF]=new i1(e)}catch(u){o&&o(u);return}t=JSON.parse(s[ye.KHR_BINARY_GLTF].content)}else t=JSON.parse(l.decode(e));else t=e;if(t.asset===void 0||t.asset.version[0]<2){o&&o(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new v1(t,{path:i||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let f=0;f<this.pluginCallbacks.length;f++){const u=this.pluginCallbacks[f](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[u.name]=u,s[u.name]=!0}if(t.extensionsUsed)for(let f=0;f<t.extensionsUsed.length;++f){const u=t.extensionsUsed[f],h=t.extensionsRequired||[];switch(u){case ye.KHR_MATERIALS_UNLIT:s[u]=new Wg;break;case ye.KHR_DRACO_MESH_COMPRESSION:s[u]=new n1(t,this.dracoLoader);break;case ye.KHR_TEXTURE_TRANSFORM:s[u]=new r1;break;case ye.KHR_MESH_QUANTIZATION:s[u]=new s1;break;default:h.indexOf(u)>=0&&a[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(s),c.setPlugins(a),c.parse(r,o)}parseAsync(e,i){const r=this;return new Promise(function(o,t){r.parse(e,i,o,t)})}}function Ug(){let n={};return{get:function(e){return n[e]},add:function(e,i){n[e]=i},remove:function(e){delete n[e]},removeAll:function(){n={}}}}function Xe(n,e,i){const r=n.json.materials[e];return r.extensions&&r.extensions[i]?r.extensions[i]:null}const ye={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Gg{constructor(e){this.parser=e,this.name=ye.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,i=this.parser.json.nodes||[];for(let r=0,o=i.length;r<o;r++){const t=i[r];t.extensions&&t.extensions[this.name]&&t.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,t.extensions[this.name].light)}}_loadLight(e){const i=this.parser,r="light:"+e;let o=i.cache.get(r);if(o)return o;const t=i.json,l=((t.extensions&&t.extensions[this.name]||{}).lights||[])[e];let c;const f=new Ke(16777215);l.color!==void 0&&f.setRGB(l.color[0],l.color[1],l.color[2],Qt);const u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new au(f),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new su(f),c.distance=u;break;case"spot":c=new ru(f),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),kt(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=i.createUniqueName(l.name||"light_"+e),o=Promise.resolve(c),i.cache.add(r,o),o}getDependency(e,i){if(e==="light")return this._loadLight(i)}createNodeAttachment(e){const i=this,r=this.parser,t=r.json.nodes[e],a=(t.extensions&&t.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return r._getNodeRef(i.cache,a,l)})}}class Wg{constructor(){this.name=ye.KHR_MATERIALS_UNLIT}getMaterialType(){return Dt}extendParams(e,i,r){const o=[];e.color=new Ke(1,1,1),e.opacity=1;const t=i.pbrMetallicRoughness;if(t){if(Array.isArray(t.baseColorFactor)){const s=t.baseColorFactor;e.color.setRGB(s[0],s[1],s[2],Qt),e.opacity=s[3]}t.baseColorTexture!==void 0&&o.push(r.assignTexture(e,"map",t.baseColorTexture,Nt))}return Promise.all(o)}}class zg{constructor(e){this.parser=e,this.name=ye.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,i){const r=Xe(this.parser,e,this.name);return r===null||r.emissiveStrength!==void 0&&(i.emissiveIntensity=r.emissiveStrength),Promise.resolve()}}class jg{constructor(e){this.parser=e,this.name=ye.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Xe(this.parser,e,this.name)!==null?zt:null}extendMaterialParams(e,i){const r=Xe(this.parser,e,this.name);if(r===null)return Promise.resolve();const o=[];if(r.clearcoatFactor!==void 0&&(i.clearcoat=r.clearcoatFactor),r.clearcoatTexture!==void 0&&o.push(this.parser.assignTexture(i,"clearcoatMap",r.clearcoatTexture)),r.clearcoatRoughnessFactor!==void 0&&(i.clearcoatRoughness=r.clearcoatRoughnessFactor),r.clearcoatRoughnessTexture!==void 0&&o.push(this.parser.assignTexture(i,"clearcoatRoughnessMap",r.clearcoatRoughnessTexture)),r.clearcoatNormalTexture!==void 0&&(o.push(this.parser.assignTexture(i,"clearcoatNormalMap",r.clearcoatNormalTexture)),r.clearcoatNormalTexture.scale!==void 0)){const t=r.clearcoatNormalTexture.scale;i.clearcoatNormalScale=new xe(t,t)}return Promise.all(o)}}class Hg{constructor(e){this.parser=e,this.name=ye.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Xe(this.parser,e,this.name)!==null?zt:null}extendMaterialParams(e,i){const r=Xe(this.parser,e,this.name);return r===null||(i.dispersion=r.dispersion!==void 0?r.dispersion:0),Promise.resolve()}}class Vg{constructor(e){this.parser=e,this.name=ye.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Xe(this.parser,e,this.name)!==null?zt:null}extendMaterialParams(e,i){const r=Xe(this.parser,e,this.name);if(r===null)return Promise.resolve();const o=[];return r.iridescenceFactor!==void 0&&(i.iridescence=r.iridescenceFactor),r.iridescenceTexture!==void 0&&o.push(this.parser.assignTexture(i,"iridescenceMap",r.iridescenceTexture)),r.iridescenceIor!==void 0&&(i.iridescenceIOR=r.iridescenceIor),i.iridescenceThicknessRange===void 0&&(i.iridescenceThicknessRange=[100,400]),r.iridescenceThicknessMinimum!==void 0&&(i.iridescenceThicknessRange[0]=r.iridescenceThicknessMinimum),r.iridescenceThicknessMaximum!==void 0&&(i.iridescenceThicknessRange[1]=r.iridescenceThicknessMaximum),r.iridescenceThicknessTexture!==void 0&&o.push(this.parser.assignTexture(i,"iridescenceThicknessMap",r.iridescenceThicknessTexture)),Promise.all(o)}}class Xg{constructor(e){this.parser=e,this.name=ye.KHR_MATERIALS_SHEEN}getMaterialType(e){return Xe(this.parser,e,this.name)!==null?zt:null}extendMaterialParams(e,i){const r=Xe(this.parser,e,this.name);if(r===null)return Promise.resolve();const o=[];if(i.sheenColor=new Ke(0,0,0),i.sheenRoughness=0,i.sheen=1,r.sheenColorFactor!==void 0){const t=r.sheenColorFactor;i.sheenColor.setRGB(t[0],t[1],t[2],Qt)}return r.sheenRoughnessFactor!==void 0&&(i.sheenRoughness=r.sheenRoughnessFactor),r.sheenColorTexture!==void 0&&o.push(this.parser.assignTexture(i,"sheenColorMap",r.sheenColorTexture,Nt)),r.sheenRoughnessTexture!==void 0&&o.push(this.parser.assignTexture(i,"sheenRoughnessMap",r.sheenRoughnessTexture)),Promise.all(o)}}class Yg{constructor(e){this.parser=e,this.name=ye.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Xe(this.parser,e,this.name)!==null?zt:null}extendMaterialParams(e,i){const r=Xe(this.parser,e,this.name);if(r===null)return Promise.resolve();const o=[];return r.transmissionFactor!==void 0&&(i.transmission=r.transmissionFactor),r.transmissionTexture!==void 0&&o.push(this.parser.assignTexture(i,"transmissionMap",r.transmissionTexture)),Promise.all(o)}}class Zg{constructor(e){this.parser=e,this.name=ye.KHR_MATERIALS_VOLUME}getMaterialType(e){return Xe(this.parser,e,this.name)!==null?zt:null}extendMaterialParams(e,i){const r=Xe(this.parser,e,this.name);if(r===null)return Promise.resolve();const o=[];i.thickness=r.thicknessFactor!==void 0?r.thicknessFactor:0,r.thicknessTexture!==void 0&&o.push(this.parser.assignTexture(i,"thicknessMap",r.thicknessTexture)),i.attenuationDistance=r.attenuationDistance||1/0;const t=r.attenuationColor||[1,1,1];return i.attenuationColor=new Ke().setRGB(t[0],t[1],t[2],Qt),Promise.all(o)}}class qg{constructor(e){this.parser=e,this.name=ye.KHR_MATERIALS_IOR}getMaterialType(e){return Xe(this.parser,e,this.name)!==null?zt:null}extendMaterialParams(e,i){const r=Xe(this.parser,e,this.name);return r===null||(i.ior=r.ior!==void 0?r.ior:1.5,i.ior===0&&(i.ior=1e3)),Promise.resolve()}}class Kg{constructor(e){this.parser=e,this.name=ye.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Xe(this.parser,e,this.name)!==null?zt:null}extendMaterialParams(e,i){const r=Xe(this.parser,e,this.name);if(r===null)return Promise.resolve();const o=[];i.specularIntensity=r.specularFactor!==void 0?r.specularFactor:1,r.specularTexture!==void 0&&o.push(this.parser.assignTexture(i,"specularIntensityMap",r.specularTexture));const t=r.specularColorFactor||[1,1,1];return i.specularColor=new Ke().setRGB(t[0],t[1],t[2],Qt),r.specularColorTexture!==void 0&&o.push(this.parser.assignTexture(i,"specularColorMap",r.specularColorTexture,Nt)),Promise.all(o)}}class Jg{constructor(e){this.parser=e,this.name=ye.EXT_MATERIALS_BUMP}getMaterialType(e){return Xe(this.parser,e,this.name)!==null?zt:null}extendMaterialParams(e,i){const r=Xe(this.parser,e,this.name);if(r===null)return Promise.resolve();const o=[];return i.bumpScale=r.bumpFactor!==void 0?r.bumpFactor:1,r.bumpTexture!==void 0&&o.push(this.parser.assignTexture(i,"bumpMap",r.bumpTexture)),Promise.all(o)}}class Qg{constructor(e){this.parser=e,this.name=ye.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Xe(this.parser,e,this.name)!==null?zt:null}extendMaterialParams(e,i){const r=Xe(this.parser,e,this.name);if(r===null)return Promise.resolve();const o=[];return r.anisotropyStrength!==void 0&&(i.anisotropy=r.anisotropyStrength),r.anisotropyRotation!==void 0&&(i.anisotropyRotation=r.anisotropyRotation),r.anisotropyTexture!==void 0&&o.push(this.parser.assignTexture(i,"anisotropyMap",r.anisotropyTexture)),Promise.all(o)}}class $g{constructor(e){this.parser=e,this.name=ye.KHR_TEXTURE_BASISU}loadTexture(e){const i=this.parser,r=i.json,o=r.textures[e];if(!o.extensions||!o.extensions[this.name])return null;const t=o.extensions[this.name],s=i.options.ktx2Loader;if(!s){if(r.extensionsRequired&&r.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return i.loadTextureImage(e,t.source,s)}}class e1{constructor(e){this.parser=e,this.name=ye.EXT_TEXTURE_WEBP}loadTexture(e){const i=this.name,r=this.parser,o=r.json,t=o.textures[e];if(!t.extensions||!t.extensions[i])return null;const s=t.extensions[i],a=o.images[s.source];let l=r.textureLoader;if(a.uri){const c=r.options.manager.getHandler(a.uri);c!==null&&(l=c)}return r.loadTextureImage(e,s.source,l)}}class t1{constructor(e){this.parser=e,this.name=ye.EXT_TEXTURE_AVIF}loadTexture(e){const i=this.name,r=this.parser,o=r.json,t=o.textures[e];if(!t.extensions||!t.extensions[i])return null;const s=t.extensions[i],a=o.images[s.source];let l=r.textureLoader;if(a.uri){const c=r.options.manager.getHandler(a.uri);c!==null&&(l=c)}return r.loadTextureImage(e,s.source,l)}}class cl{constructor(e,i){this.name=i,this.parser=e}loadBufferView(e){const i=this.parser.json,r=i.bufferViews[e];if(r.extensions&&r.extensions[this.name]){const o=r.extensions[this.name],t=this.parser.getDependency("buffer",o.buffer),s=this.parser.options.meshoptDecoder;if(!s||!s.supported){if(i.extensionsRequired&&i.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return t.then(function(a){const l=o.byteOffset||0,c=o.byteLength||0,f=o.count,u=o.byteStride,h=new Uint8Array(a,l,c);return s.decodeGltfBufferAsync?s.decodeGltfBufferAsync(f,u,h,o.mode,o.filter).then(function(d){return d.buffer}):s.ready.then(function(){const d=new ArrayBuffer(f*u);return s.decodeGltfBuffer(new Uint8Array(d),f,u,h,o.mode,o.filter),d})})}else return null}}class o1{constructor(e){this.name=ye.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const i=this.parser.json,r=i.nodes[e];if(!r.extensions||!r.extensions[this.name]||r.mesh===void 0)return null;const o=i.meshes[r.mesh];for(const c of o.primitives)if(c.mode!==xt.TRIANGLES&&c.mode!==xt.TRIANGLE_STRIP&&c.mode!==xt.TRIANGLE_FAN&&c.mode!==void 0)return null;const s=r.extensions[this.name].attributes,a=[],l={};for(const c in s)a.push(this.parser.getDependency("accessor",s[c]).then(f=>(l[c]=f,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const f=c.pop(),u=f.isGroup?f.children:[f],h=c[0].count,d=[];for(const p of u){const m=new be,v=new H,g=new ge,y=new H(1,1,1),S=new Jr(p.geometry,p.material,h);for(let b=0;b<h;b++)l.TRANSLATION&&v.fromBufferAttribute(l.TRANSLATION,b),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,b),l.SCALE&&y.fromBufferAttribute(l.SCALE,b),S.setMatrixAt(b,m.compose(v,g,y));for(const b in l)if(b==="_COLOR_0"){const T=l[b];S.instanceColor=new lo(T.array,T.itemSize,T.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&p.geometry.setAttribute(b,l[b]);Qe.prototype.copy.call(S,p),this.parser.assignFinalMaterial(S),d.push(S)}return f.isGroup?(f.clear(),f.add(...d),f):d[0]}))}}const jc="glTF",yi=12,fl={JSON:1313821514,BIN:5130562};class i1{constructor(e){this.name=ye.KHR_BINARY_GLTF,this.content=null,this.body=null;const i=new DataView(e,0,yi),r=new TextDecoder;if(this.header={magic:r.decode(new Uint8Array(e.slice(0,4))),version:i.getUint32(4,!0),length:i.getUint32(8,!0)},this.header.magic!==jc)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const o=this.header.length-yi,t=new DataView(e,yi);let s=0;for(;s<o;){const a=t.getUint32(s,!0);s+=4;const l=t.getUint32(s,!0);if(s+=4,l===fl.JSON){const c=new Uint8Array(e,yi+s,a);this.content=r.decode(c)}else if(l===fl.BIN){const c=yi+s;this.body=e.slice(c,c+a)}s+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class n1{constructor(e,i){if(!i)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=ye.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=i,this.dracoLoader.preload()}decodePrimitive(e,i){const r=this.json,o=this.dracoLoader,t=e.extensions[this.name].bufferView,s=e.extensions[this.name].attributes,a={},l={},c={};for(const f in s){const u=Vr[f]||f.toLowerCase();a[u]=s[f]}for(const f in e.attributes){const u=Vr[f]||f.toLowerCase();if(s[f]!==void 0){const h=r.accessors[e.attributes[f]],d=Xo[h.componentType];c[u]=d.name,l[u]=h.normalized===!0}}return i.getDependency("bufferView",t).then(function(f){return new Promise(function(u,h){o.decodeDracoFile(f,function(d){for(const p in d.attributes){const m=d.attributes[p],v=l[p];v!==void 0&&(m.normalized=v)}u(d)},a,c,Qt,h)})})}}class r1{constructor(){this.name=ye.KHR_TEXTURE_TRANSFORM}extendTexture(e,i){return(i.texCoord===void 0||i.texCoord===e.channel)&&i.offset===void 0&&i.rotation===void 0&&i.scale===void 0||(e=e.clone(),i.texCoord!==void 0&&(e.channel=i.texCoord),i.offset!==void 0&&e.offset.fromArray(i.offset),i.rotation!==void 0&&(e.rotation=i.rotation),i.scale!==void 0&&e.repeat.fromArray(i.scale),e.needsUpdate=!0),e}}class s1{constructor(){this.name=ye.KHR_MESH_QUANTIZATION}}class Hc extends Eu{constructor(e,i,r,o){super(e,i,r,o)}copySampleValue_(e){const i=this.resultBuffer,r=this.sampleValues,o=this.valueSize,t=e*o*3+o;for(let s=0;s!==o;s++)i[s]=r[t+s];return i}interpolate_(e,i,r,o){const t=this.resultBuffer,s=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,f=o-i,u=(r-i)/f,h=u*u,d=h*u,p=e*c,m=p-c,v=-2*d+3*h,g=d-h,y=1-v,S=g-h+u;for(let b=0;b!==a;b++){const T=s[m+b+a],C=s[m+b+l]*f,x=s[p+b+a],P=s[p+b]*f;t[b]=y*T+S*C+v*x+g*P}return t}}const a1=new ge;class l1 extends Hc{interpolate_(e,i,r,o){const t=super.interpolate_(e,i,r,o);return a1.fromArray(t).normalize().toArray(t),t}}const xt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Xo={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},ul={9728:_n,9729:Ve,9984:hu,9985:uu,9986:fu,9987:Il},hl={33071:Jt,33648:du,10497:Ot},Cr={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Vr={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},so={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},c1={CUBICSPLINE:void 0,LINEAR:Nl,STEP:Mu},Pr={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function f1(n){return n.DefaultMaterial===void 0&&(n.DefaultMaterial=new kl({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:uo})),n.DefaultMaterial}function _o(n,e,i){for(const r in i.extensions)n[r]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[r]=i.extensions[r])}function kt(n,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(n.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function u1(n,e,i){let r=!1,o=!1,t=!1;for(let c=0,f=e.length;c<f;c++){const u=e[c];if(u.POSITION!==void 0&&(r=!0),u.NORMAL!==void 0&&(o=!0),u.COLOR_0!==void 0&&(t=!0),r&&o&&t)break}if(!r&&!o&&!t)return Promise.resolve(n);const s=[],a=[],l=[];for(let c=0,f=e.length;c<f;c++){const u=e[c];if(r){const h=u.POSITION!==void 0?i.getDependency("accessor",u.POSITION):n.attributes.position;s.push(h)}if(o){const h=u.NORMAL!==void 0?i.getDependency("accessor",u.NORMAL):n.attributes.normal;a.push(h)}if(t){const h=u.COLOR_0!==void 0?i.getDependency("accessor",u.COLOR_0):n.attributes.color;l.push(h)}}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(l)]).then(function(c){const f=c[0],u=c[1],h=c[2];return r&&(n.morphAttributes.position=f),o&&(n.morphAttributes.normal=u),t&&(n.morphAttributes.color=h),n.morphTargetsRelative=!0,n})}function h1(n,e){if(n.updateMorphTargets(),e.weights!==void 0)for(let i=0,r=e.weights.length;i<r;i++)n.morphTargetInfluences[i]=e.weights[i];if(e.extras&&Array.isArray(e.extras.targetNames)){const i=e.extras.targetNames;if(n.morphTargetInfluences.length===i.length){n.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++)n.morphTargetDictionary[i[r]]=r}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function d1(n){let e;const i=n.extensions&&n.extensions[ye.KHR_DRACO_MESH_COMPRESSION];if(i?e="draco:"+i.bufferView+":"+i.indices+":"+Ar(i.attributes):e=n.indices+":"+Ar(n.attributes)+":"+n.mode,n.targets!==void 0)for(let r=0,o=n.targets.length;r<o;r++)e+=":"+Ar(n.targets[r]);return e}function Ar(n){let e="";const i=Object.keys(n).sort();for(let r=0,o=i.length;r<o;r++)e+=i[r]+":"+n[i[r]]+";";return e}function Xr(n){switch(n){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function p1(n){return n.search(/\.jpe?g($|\?)/i)>0||n.search(/^data\:image\/jpeg/)===0?"image/jpeg":n.search(/\.webp($|\?)/i)>0||n.search(/^data\:image\/webp/)===0?"image/webp":n.search(/\.ktx2($|\?)/i)>0||n.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const m1=new be;class v1{constructor(e={},i={}){this.json=e,this.extensions={},this.plugins={},this.options=i,this.cache=new Ug,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let r=!1,o=-1,t=!1,s=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const a=navigator.userAgent;r=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);o=r&&l?parseInt(l[1],10):-1,t=a.indexOf("Firefox")>-1,s=t?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||r&&o<17||t&&s<98?this.textureLoader=new Li(this.options.manager):this.textureLoader=new lu(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Fl(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,i){const r=this,o=this.json,t=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(s){return s._markDefs&&s._markDefs()}),Promise.all(this._invokeAll(function(s){return s.beforeRoot&&s.beforeRoot()})).then(function(){return Promise.all([r.getDependencies("scene"),r.getDependencies("animation"),r.getDependencies("camera")])}).then(function(s){const a={scene:s[0][o.scene||0],scenes:s[0],animations:s[1],cameras:s[2],asset:o.asset,parser:r,userData:{}};return _o(t,a,o),kt(a,o),Promise.all(r._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(i)}_markDefs(){const e=this.json.nodes||[],i=this.json.skins||[],r=this.json.meshes||[];for(let o=0,t=i.length;o<t;o++){const s=i[o].joints;for(let a=0,l=s.length;a<l;a++)e[s[a]].isBone=!0}for(let o=0,t=e.length;o<t;o++){const s=e[o];s.mesh!==void 0&&(this._addNodeRef(this.meshCache,s.mesh),s.skin!==void 0&&(r[s.mesh].isSkinnedMesh=!0)),s.camera!==void 0&&this._addNodeRef(this.cameraCache,s.camera)}}_addNodeRef(e,i){i!==void 0&&(e.refs[i]===void 0&&(e.refs[i]=e.uses[i]=0),e.refs[i]++)}_getNodeRef(e,i,r){if(e.refs[i]<=1)return r;const o=r.clone(),t=(s,a)=>{const l=this.associations.get(s);l!=null&&this.associations.set(a,l);for(const[c,f]of s.children.entries())t(f,a.children[c])};return t(r,o),o.name+="_instance_"+e.uses[i]++,o}_invokeOne(e){const i=Object.values(this.plugins);i.push(this);for(let r=0;r<i.length;r++){const o=e(i[r]);if(o)return o}return null}_invokeAll(e){const i=Object.values(this.plugins);i.unshift(this);const r=[];for(let o=0;o<i.length;o++){const t=e(i[o]);t&&r.push(t)}return r}getDependency(e,i){const r=e+":"+i;let o=this.cache.get(r);if(!o){switch(e){case"scene":o=this.loadScene(i);break;case"node":o=this._invokeOne(function(t){return t.loadNode&&t.loadNode(i)});break;case"mesh":o=this._invokeOne(function(t){return t.loadMesh&&t.loadMesh(i)});break;case"accessor":o=this.loadAccessor(i);break;case"bufferView":o=this._invokeOne(function(t){return t.loadBufferView&&t.loadBufferView(i)});break;case"buffer":o=this.loadBuffer(i);break;case"material":o=this._invokeOne(function(t){return t.loadMaterial&&t.loadMaterial(i)});break;case"texture":o=this._invokeOne(function(t){return t.loadTexture&&t.loadTexture(i)});break;case"skin":o=this.loadSkin(i);break;case"animation":o=this._invokeOne(function(t){return t.loadAnimation&&t.loadAnimation(i)});break;case"camera":o=this.loadCamera(i);break;default:if(o=this._invokeOne(function(t){return t!=this&&t.getDependency&&t.getDependency(e,i)}),!o)throw new Error("Unknown type: "+e);break}this.cache.add(r,o)}return o}getDependencies(e){let i=this.cache.get(e);if(!i){const r=this,o=this.json[e+(e==="mesh"?"es":"s")]||[];i=Promise.all(o.map(function(t,s){return r.getDependency(e,s)})),this.cache.add(e,i)}return i}loadBuffer(e){const i=this.json.buffers[e],r=this.fileLoader;if(i.type&&i.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+i.type+" buffer type is not supported.");if(i.uri===void 0&&e===0)return Promise.resolve(this.extensions[ye.KHR_BINARY_GLTF].body);const o=this.options;return new Promise(function(t,s){r.load(xi.resolveURL(i.uri,o.path),t,void 0,function(){s(new Error('THREE.GLTFLoader: Failed to load buffer "'+i.uri+'".'))})})}loadBufferView(e){const i=this.json.bufferViews[e];return this.getDependency("buffer",i.buffer).then(function(r){const o=i.byteLength||0,t=i.byteOffset||0;return r.slice(t,t+o)})}loadAccessor(e){const i=this,r=this.json,o=this.json.accessors[e];if(o.bufferView===void 0&&o.sparse===void 0){const s=Cr[o.type],a=Xo[o.componentType],l=o.normalized===!0,c=new a(o.count*s);return Promise.resolve(new De(c,s,l))}const t=[];return o.bufferView!==void 0?t.push(this.getDependency("bufferView",o.bufferView)):t.push(null),o.sparse!==void 0&&(t.push(this.getDependency("bufferView",o.sparse.indices.bufferView)),t.push(this.getDependency("bufferView",o.sparse.values.bufferView))),Promise.all(t).then(function(s){const a=s[0],l=Cr[o.type],c=Xo[o.componentType],f=c.BYTES_PER_ELEMENT,u=f*l,h=o.byteOffset||0,d=o.bufferView!==void 0?r.bufferViews[o.bufferView].byteStride:void 0,p=o.normalized===!0;let m,v;if(d&&d!==u){const g=Math.floor(h/d),y="InterleavedBuffer:"+o.bufferView+":"+o.componentType+":"+g+":"+o.count;let S=i.cache.get(y);S||(m=new c(a,g*d,o.count*d/f),S=new cu(m,d/f),i.cache.add(y,S)),v=new wu(S,l,h%d/f,p)}else a===null?m=new c(o.count*l):m=new c(a,h,o.count*l),v=new De(m,l,p);if(o.sparse!==void 0){const g=Cr.SCALAR,y=Xo[o.sparse.indices.componentType],S=o.sparse.indices.byteOffset||0,b=o.sparse.values.byteOffset||0,T=new y(s[1],S,o.sparse.count*g),C=new c(s[2],b,o.sparse.count*l);a!==null&&(v=new De(v.array.slice(),v.itemSize,v.normalized)),v.normalized=!1;for(let x=0,P=T.length;x<P;x++){const O=T[x];if(v.setX(O,C[x*l]),l>=2&&v.setY(O,C[x*l+1]),l>=3&&v.setZ(O,C[x*l+2]),l>=4&&v.setW(O,C[x*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}v.normalized=p}return v})}loadTexture(e){const i=this.json,r=this.options,t=i.textures[e].source,s=i.images[t];let a=this.textureLoader;if(s.uri){const l=r.manager.getHandler(s.uri);l!==null&&(a=l)}return this.loadTextureImage(e,t,a)}loadTextureImage(e,i,r){const o=this,t=this.json,s=t.textures[e],a=t.images[i],l=(a.uri||a.bufferView)+":"+s.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(i,r).then(function(f){f.flipY=!1,f.name=s.name||a.name||"",f.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(f.name=a.uri);const h=(t.samplers||{})[s.sampler]||{};return f.magFilter=ul[h.magFilter]||Ve,f.minFilter=ul[h.minFilter]||Il,f.wrapS=hl[h.wrapS]||Ot,f.wrapT=hl[h.wrapT]||Ot,f.generateMipmaps=!f.isCompressedTexture&&f.minFilter!==_n&&f.minFilter!==Ve,o.associations.set(f,{textures:e}),f}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,i){const r=this,o=this.json,t=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const s=o.images[e],a=self.URL||self.webkitURL;let l=s.uri||"",c=!1;if(s.bufferView!==void 0)l=r.getDependency("bufferView",s.bufferView).then(function(u){c=!0;const h=new Blob([u],{type:s.mimeType});return l=a.createObjectURL(h),l});else if(s.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const f=Promise.resolve(l).then(function(u){return new Promise(function(h,d){let p=h;i.isImageBitmapLoader===!0&&(p=function(m){const v=new Dr(m);v.needsUpdate=!0,h(v)}),i.load(xi.resolveURL(u,t.path),p,void 0,d)})}).then(function(u){return c===!0&&a.revokeObjectURL(l),kt(u,s),u.userData.mimeType=s.mimeType||p1(s.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=f,f}assignTexture(e,i,r,o){const t=this;return this.getDependency("texture",r.index).then(function(s){if(!s)return null;if(r.texCoord!==void 0&&r.texCoord>0&&(s=s.clone(),s.channel=r.texCoord),t.extensions[ye.KHR_TEXTURE_TRANSFORM]){const a=r.extensions!==void 0?r.extensions[ye.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=t.associations.get(s);s=t.extensions[ye.KHR_TEXTURE_TRANSFORM].extendTexture(s,a),t.associations.set(s,l)}}return o!==void 0&&(s.colorSpace=o),e[i]=s,s})}assignFinalMaterial(e){const i=e.geometry;let r=e.material;const o=i.attributes.tangent===void 0,t=i.attributes.color!==void 0,s=i.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+r.uuid;let l=this.cache.get(a);l||(l=new pu,or.prototype.copy.call(l,r),l.color.copy(r.color),l.map=r.map,l.sizeAttenuation=!1,this.cache.add(a,l)),r=l}else if(e.isLine){const a="LineBasicMaterial:"+r.uuid;let l=this.cache.get(a);l||(l=new mu,or.prototype.copy.call(l,r),l.color.copy(r.color),l.map=r.map,this.cache.add(a,l)),r=l}if(o||t||s){let a="ClonedMaterial:"+r.uuid+":";o&&(a+="derivative-tangents:"),t&&(a+="vertex-colors:"),s&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=r.clone(),t&&(l.vertexColors=!0),s&&(l.flatShading=!0),o&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(r))),r=l}e.material=r}getMaterialType(){return kl}loadMaterial(e){const i=this,r=this.json,o=this.extensions,t=r.materials[e];let s;const a={},l=t.extensions||{},c=[];if(l[ye.KHR_MATERIALS_UNLIT]){const u=o[ye.KHR_MATERIALS_UNLIT];s=u.getMaterialType(),c.push(u.extendParams(a,t,i))}else{const u=t.pbrMetallicRoughness||{};if(a.color=new Ke(1,1,1),a.opacity=1,Array.isArray(u.baseColorFactor)){const h=u.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],Qt),a.opacity=h[3]}u.baseColorTexture!==void 0&&c.push(i.assignTexture(a,"map",u.baseColorTexture,Nt)),a.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,a.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(i.assignTexture(a,"metalnessMap",u.metallicRoughnessTexture)),c.push(i.assignTexture(a,"roughnessMap",u.metallicRoughnessTexture))),s=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}t.doubleSided===!0&&(a.side=nt);const f=t.alphaMode||Pr.OPAQUE;if(f===Pr.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,f===Pr.MASK&&(a.alphaTest=t.alphaCutoff!==void 0?t.alphaCutoff:.5)),t.normalTexture!==void 0&&s!==Dt&&(c.push(i.assignTexture(a,"normalMap",t.normalTexture)),a.normalScale=new xe(1,1),t.normalTexture.scale!==void 0)){const u=t.normalTexture.scale;a.normalScale.set(u,u)}if(t.occlusionTexture!==void 0&&s!==Dt&&(c.push(i.assignTexture(a,"aoMap",t.occlusionTexture)),t.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=t.occlusionTexture.strength)),t.emissiveFactor!==void 0&&s!==Dt){const u=t.emissiveFactor;a.emissive=new Ke().setRGB(u[0],u[1],u[2],Qt)}return t.emissiveTexture!==void 0&&s!==Dt&&c.push(i.assignTexture(a,"emissiveMap",t.emissiveTexture,Nt)),Promise.all(c).then(function(){const u=new s(a);return t.name&&(u.name=t.name),kt(u,t),i.associations.set(u,{materials:e}),t.extensions&&_o(o,u,t),u})}createUniqueName(e){const i=vu.sanitizeNodeName(e||"");return i in this.nodeNamesUsed?i+"_"+ ++this.nodeNamesUsed[i]:(this.nodeNamesUsed[i]=0,i)}loadGeometries(e){const i=this,r=this.extensions,o=this.primitiveCache;function t(a){return r[ye.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,i).then(function(l){return dl(l,a,i)})}const s=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],f=d1(c),u=o[f];if(u)s.push(u.promise);else{let h;c.extensions&&c.extensions[ye.KHR_DRACO_MESH_COMPRESSION]?h=t(c):h=dl(new _t,c,i),o[f]={primitive:c,promise:h},s.push(h)}}return Promise.all(s)}loadMesh(e){const i=this,r=this.json,o=this.extensions,t=r.meshes[e],s=t.primitives,a=[];for(let l=0,c=s.length;l<c;l++){const f=s[l].material===void 0?f1(this.cache):this.getDependency("material",s[l].material);a.push(f)}return a.push(i.loadGeometries(s)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),f=l[l.length-1],u=[];for(let d=0,p=f.length;d<p;d++){const m=f[d],v=s[d];let g;const y=c[d];if(v.mode===xt.TRIANGLES||v.mode===xt.TRIANGLE_STRIP||v.mode===xt.TRIANGLE_FAN||v.mode===void 0)g=t.isSkinnedMesh===!0?new gu(m,y):new Ue(m,y),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),v.mode===xt.TRIANGLE_STRIP?g.geometry=ll(g.geometry,Dl):v.mode===xt.TRIANGLE_FAN&&(g.geometry=ll(g.geometry,Fr));else if(v.mode===xt.LINES)g=new yu(m,y);else if(v.mode===xt.LINE_STRIP)g=new bu(m,y);else if(v.mode===xt.LINE_LOOP)g=new Su(m,y);else if(v.mode===xt.POINTS)g=new Ml(m,y);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+v.mode);Object.keys(g.geometry.morphAttributes).length>0&&h1(g,t),g.name=i.createUniqueName(t.name||"mesh_"+e),kt(g,t),v.extensions&&_o(o,g,v),i.assignFinalMaterial(g),u.push(g)}for(let d=0,p=u.length;d<p;d++)i.associations.set(u[d],{meshes:e,primitives:d});if(u.length===1)return t.extensions&&_o(o,u[0],t),u[0];const h=new it;t.extensions&&_o(o,h,t),i.associations.set(h,{meshes:e});for(let d=0,p=u.length;d<p;d++)h.add(u[d]);return h})}loadCamera(e){let i;const r=this.json.cameras[e],o=r[r.type];if(!o){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return r.type==="perspective"?i=new Kr(ut.radToDeg(o.yfov),o.aspectRatio||1,o.znear||1,o.zfar||2e6):r.type==="orthographic"&&(i=new Ai(-o.xmag,o.xmag,o.ymag,-o.ymag,o.znear,o.zfar)),r.name&&(i.name=this.createUniqueName(r.name)),kt(i,r),Promise.resolve(i)}loadSkin(e){const i=this.json.skins[e],r=[];for(let o=0,t=i.joints.length;o<t;o++)r.push(this._loadNodeShallow(i.joints[o]));return i.inverseBindMatrices!==void 0?r.push(this.getDependency("accessor",i.inverseBindMatrices)):r.push(null),Promise.all(r).then(function(o){const t=o.pop(),s=o,a=[],l=[];for(let c=0,f=s.length;c<f;c++){const u=s[c];if(u){a.push(u);const h=new be;t!==null&&h.fromArray(t.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',i.joints[c])}return new _u(a,l)})}loadAnimation(e){const i=this.json,r=this,o=i.animations[e],t=o.name?o.name:"animation_"+e,s=[],a=[],l=[],c=[],f=[];for(let u=0,h=o.channels.length;u<h;u++){const d=o.channels[u],p=o.samplers[d.sampler],m=d.target,v=m.node,g=o.parameters!==void 0?o.parameters[p.input]:p.input,y=o.parameters!==void 0?o.parameters[p.output]:p.output;m.node!==void 0&&(s.push(this.getDependency("node",v)),a.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",y)),c.push(p),f.push(m))}return Promise.all([Promise.all(s),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(f)]).then(function(u){const h=u[0],d=u[1],p=u[2],m=u[3],v=u[4],g=[];for(let S=0,b=h.length;S<b;S++){const T=h[S],C=d[S],x=p[S],P=m[S],O=v[S];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();const E=r._createAnimationTracks(T,C,x,P,O);if(E)for(let k=0;k<E.length;k++)g.push(E[k])}const y=new Tu(t,void 0,g);return kt(y,o),y})}createNodeMesh(e){const i=this.json,r=this,o=i.nodes[e];return o.mesh===void 0?null:r.getDependency("mesh",o.mesh).then(function(t){const s=r._getNodeRef(r.meshCache,o.mesh,t);return o.weights!==void 0&&s.traverse(function(a){if(a.isMesh)for(let l=0,c=o.weights.length;l<c;l++)a.morphTargetInfluences[l]=o.weights[l]}),s})}loadNode(e){const i=this.json,r=this,o=i.nodes[e],t=r._loadNodeShallow(e),s=[],a=o.children||[];for(let c=0,f=a.length;c<f;c++)s.push(r.getDependency("node",a[c]));const l=o.skin===void 0?Promise.resolve(null):r.getDependency("skin",o.skin);return Promise.all([t,Promise.all(s),l]).then(function(c){const f=c[0],u=c[1],h=c[2];h!==null&&f.traverse(function(d){d.isSkinnedMesh&&d.bind(h,m1)});for(let d=0,p=u.length;d<p;d++)f.add(u[d]);if(f.userData.pivot!==void 0&&u.length>0){const d=f.userData.pivot,p=u[0];f.pivot=new H().fromArray(d),f.position.x-=d[0],f.position.y-=d[1],f.position.z-=d[2],p.position.set(0,0,0),delete f.userData.pivot}return f})}_loadNodeShallow(e){const i=this.json,r=this.extensions,o=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const t=i.nodes[e],s=t.name?o.createUniqueName(t.name):"",a=[],l=o._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),t.camera!==void 0&&a.push(o.getDependency("camera",t.camera).then(function(c){return o._getNodeRef(o.cameraCache,t.camera,c)})),o._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let f;if(t.isBone===!0?f=new xu:c.length>1?f=new it:c.length===1?f=c[0]:f=new Qe,f!==c[0])for(let u=0,h=c.length;u<h;u++)f.add(c[u]);if(t.name&&(f.userData.name=t.name,f.name=s),kt(f,t),t.extensions&&_o(r,f,t),t.matrix!==void 0){const u=new be;u.fromArray(t.matrix),f.applyMatrix4(u)}else t.translation!==void 0&&f.position.fromArray(t.translation),t.rotation!==void 0&&f.quaternion.fromArray(t.rotation),t.scale!==void 0&&f.scale.fromArray(t.scale);if(!o.associations.has(f))o.associations.set(f,{});else if(t.mesh!==void 0&&o.meshCache.refs[t.mesh]>1){const u=o.associations.get(f);o.associations.set(f,{...u})}return o.associations.get(f).nodes=e,f}),this.nodeCache[e]}loadScene(e){const i=this.extensions,r=this.json.scenes[e],o=this,t=new it;r.name&&(t.name=o.createUniqueName(r.name)),kt(t,r),r.extensions&&_o(i,t,r);const s=r.nodes||[],a=[];for(let l=0,c=s.length;l<c;l++)a.push(o.getDependency("node",s[l]));return Promise.all(a).then(function(l){for(let f=0,u=l.length;f<u;f++){const h=l[f];h.parent!==null?t.add(Ng(h)):t.add(h)}const c=f=>{const u=new Map;for(const[h,d]of o.associations)(h instanceof or||h instanceof Dr)&&u.set(h,d);return f.traverse(h=>{const d=o.associations.get(h);d!=null&&u.set(h,d)}),u};return o.associations=c(t),t})}_createAnimationTracks(e,i,r,o,t){const s=[],a=e.name?e.name:e.uuid,l=[];function c(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}so[t.path]===so.weights?(c(e),e.isGroup&&e.children.forEach(c)):l.push(a);let f;switch(so[t.path]){case so.weights:f=Qs;break;case so.rotation:f=$s;break;case so.translation:case so.scale:f=Js;break;default:r.itemSize===1?f=Qs:f=Js;break}const u=o.interpolation!==void 0?c1[o.interpolation]:Nl,h=this._getArrayFromAccessor(r);for(let d=0,p=l.length;d<p;d++){const m=new f(l[d]+"."+so[t.path],i.array,h,u);o.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(m),s.push(m)}return s}_getArrayFromAccessor(e){let i=e.array;if(e.normalized){const r=Xr(i.constructor),o=new Float32Array(i.length);for(let t=0,s=i.length;t<s;t++)o[t]=i[t]*r;i=o}return i}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(r){const o=this instanceof $s?l1:Hc;return new o(this.times,this.values,this.getValueSize()/3,r)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function g1(n,e,i){const r=e.attributes,o=new Ol;if(r.POSITION!==void 0){const a=i.json.accessors[r.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(o.set(new H(l[0],l[1],l[2]),new H(c[0],c[1],c[2])),a.normalized){const f=Xr(Xo[a.componentType]);o.min.multiplyScalar(f),o.max.multiplyScalar(f)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const t=e.targets;if(t!==void 0){const a=new H,l=new H;for(let c=0,f=t.length;c<f;c++){const u=t[c];if(u.POSITION!==void 0){const h=i.json.accessors[u.POSITION],d=h.min,p=h.max;if(d!==void 0&&p!==void 0){if(l.setX(Math.max(Math.abs(d[0]),Math.abs(p[0]))),l.setY(Math.max(Math.abs(d[1]),Math.abs(p[1]))),l.setZ(Math.max(Math.abs(d[2]),Math.abs(p[2]))),h.normalized){const m=Xr(Xo[h.componentType]);l.multiplyScalar(m)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}o.expandByVector(a)}n.boundingBox=o;const s=new Rl;o.getCenter(s.center),s.radius=o.min.distanceTo(o.max)/2,n.boundingSphere=s}function dl(n,e,i){const r=e.attributes,o=[];function t(s,a){return i.getDependency("accessor",s).then(function(l){n.setAttribute(a,l)})}for(const s in r){const a=Vr[s]||s.toLowerCase();a in n.attributes||o.push(t(r[s],a))}if(e.indices!==void 0&&!n.index){const s=i.getDependency("accessor",e.indices).then(function(a){n.setIndex(a)});o.push(s)}return ea.workingColorSpace!==Qt&&"COLOR_0"in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ea.workingColorSpace}" not supported.`),kt(n,e),g1(n,e,i),Promise.all(o).then(function(){return e.targets!==void 0?u1(n,e.targets,i):n})}const Vc={color:[.18,.22,.28],metallic:.05,smoothness:.55,specularIntensity:.2},y1=wn(n=>n instanceof Ue),b1=new Map(Object.entries({Headset_M:Vc,Foam:{color:[.035,.04,.05],metallic:0,smoothness:.12,specularIntensity:.05},Gray_Plastic:{color:[.12,.15,.2],metallic:.05,smoothness:.45,specularIntensity:.18},Lens:{color:[.025,.11,.16],metallic:.35,smoothness:.82,specularIntensity:.45},L:{color:[.06,.42,.58],metallic:.15,smoothness:.7,specularIntensity:.3},Strap:{color:[.06,.07,.09],metallic:0,smoothness:.08,specularIntensity:.04}})),S1={color:[.05,.055,.065],metallic:.65,smoothness:.45,specularIntensity:.32,ambientMinimalValue:.01},_1={color:[.025,.03,.04],metallic:.05,smoothness:.2,specularIntensity:.12,ambientMinimalValue:.01};function Yr(n,e,i){return sc(n,i.color,{directions:{value:e.directions},colors:{value:e.colors},positions:{value:e.positions},radii:{value:e.radii}},{ambientMinimalValue:i.ambientMinimalValue??.16,emissionFogSuppression:0,nominalDiffuseLevel:[.3,.3,.3],ambientMultiplier:.5,diffuseEnabled:!0,bothSidesDiffuseMultiplier:.08,metallic:i.metallic,specularEnabled:!0,smoothness:i.smoothness,specularIntensity:i.specularIntensity,lightFalloffEnabled:!1,privatePointLightEnabled:!1,privatePointLightColor:[0,0,0],privatePointLightPosition:[0,0,0],privatePointLightLocal:!1,privatePointLightIntensity:0,groundFadeEnabled:!1,groundFadeScale:0,groundFadeOffset:0,distanceDarkeningEnabled:!1,darkeningScale:0,darkeningIntensity:0,darkeningCenter:[0,0,0],darkeningDirection:[0,0,1],vertexColorEnabled:!1,vertexEmissionEnabled:!1,vertexEmissionColor:[0,0,0],vertexEmissionColorAlpha:0,vertexEmissionThreshold:0,vertexEmissionStrength:1,vertexEmissionBloomIntensity:1,vertexEmissionMainEffect:!1,displacementEnabled:!1,displacementSpatial:!1,displacementBidirectional:!1,displacementStrength:0,displacementAxisMultiplier:[0,0,0],meshPackingEnabled:!1,meshPackingId:0,albedoMultiplier:1,metallicTextureEnabled:!1,smoothnessTextureSource:"none",occlusionEnabled:!1,occlusionBeforeEmission:!1,occlusionIntensity:1,occlusionDetailEnabled:!1,occlusionDetailOffset:[0,0],occlusionDetailIntensity:0,normalScale:1,emissionColor:[0,0,0],emissionColorAlpha:0,emissionBrightness:0,emissionAlphaSource:"textureAlpha",emissionWhiteBoost:!1,emissionWhiteBoostMultiplier:1,emissionMainEffect:!1,emissionBloomIntensity:1,toneMapBeforeEmission:!1,emissionMaskSpeed:[0,0,0],secondaryEmissionMaskSpeed:[0,0,0],emissionMaskSecondaryUvs:!1,secondaryEmissionMaskSecondaryUvs:!1,primaryEmissionGain:1,secondaryEmissionGain:1,reflectionIntensity:0,multiplyReflections:!1,customTime:"continuous",timeOffset:0,fog:{startOffset:100}})}class T1{constructor(e,i,r){this.fog=e,this.directionalLights=i,this.refreshMirrorMaterials=r}fog;directionalLights;refreshMirrorMaterials;root=new it;geometries=[];materials=[];disposed=!1;async load(){const e=await zo.tryPromise(()=>new Bg().loadAsync("/chro/models/vr-headset.glb"));if(e.isErr()){this.disposed||console.error("replay headset failed to load",e.error);return}const i=e.value,r=new Set,o=new Set,t=new Map,s=this.fog,a=this.directionalLights;function l(c){o.add(c);const f=t.get(c.name);if(f!==void 0)return f;const u=b1.get(c.name)??Vc,h=Yr(s,a,u);return h.name=c.name,t.set(c.name,h),h}i.scene.traverse(c=>{const f=y1.safeParse(c);f.success&&(r.add(f.data.geometry),f.data.material=Array.isArray(f.data.material)?f.data.material.map(l):l(f.data.material))});for(const c of o)c.dispose();if(i.scene.name="ReplayHeadset",i.scene.rotation.y=Math.PI/2,i.scene.scale.setScalar(.22),this.disposed){for(const c of r)c.dispose();for(const c of t.values())c.dispose();return}this.root.add(i.scene),this.geometries.push(...r),this.materials.push(...t.values()),this.refreshMirrorMaterials()}dispose(){this.disposed=!0;for(const e of this.geometries)e.dispose();for(const e of this.materials)e.dispose()}}function Lr(n,e,i=12){const r=new Tl(n,n,e,i);return r.rotateX(-Math.PI/2),r}function pl(n,e){const i=new Cu(n,e,12);return i.rotateX(-Math.PI/2),i}function x1(n){const e=new it,i=[];function r(m,v,g){const y=new Ue(m,v);return y.position.z=g,e.add(y),i.push(m),y}const o=Ne,t=r(pl(o.saberBladeThickness,o.saberBladeLength),n.blade,0),s=r(pl(o.saberCoreThickness,o.saberBladeLength-o.saberCoreInset),n.core,0),a=r(new ir(o.saberGuardSize,o.saberGuardThickness,6,32),n.blade,0),l=r(Lr(o.saberGripThickness,o.saberGripLength,16),n.grip,0),c=[r(new ir(o.saberCollarSize,o.saberCollarThickness,6,24),n.blade,0),r(new ir(o.saberCollarSize,o.saberCollarThickness,6,24),n.blade,0)],f=[];for(let m=0;m<5;m++)f.push(r(Lr(o.saberRingSize,o.saberRingThickness,16),n.metal,0));const u=r(Lr(o.saberPommelThickness,o.saberPommelLength),n.metal,0),h=new Qe,d=new Qe;e.add(h,d);const p={root:e,trailBase:h,tip:d,geometries:i,blade:t,core:s,guard:a,grip:l,collars:c,rings:f,pommel:u};return Zr(p,o),p}function Zr(n,e){const r=e.saberBladeLength,o=0-r/2,t=Math.max(r-e.saberCoreInset,.01),s=.0032,a=s+e.saberGripLength+e.saberPommelLength;n.root.visible=e.showSabers,n.root.scale.setScalar(e.saberScale),n.blade.position.z=o,n.blade.scale.set(e.saberBladeThickness/Ne.saberBladeThickness,e.saberBladeThickness/Ne.saberBladeThickness,r/Ne.saberBladeLength),n.core.position.z=o,n.core.scale.set(e.saberCoreThickness/Ne.saberCoreThickness,e.saberCoreThickness/Ne.saberCoreThickness,t/(Ne.saberBladeLength-Ne.saberCoreInset)),n.guard.position.z=0+e.saberGuardThickness,n.guard.scale.set(e.saberGuardSize/Ne.saberGuardSize,e.saberGuardSize/Ne.saberGuardSize,e.saberGuardThickness/Ne.saberGuardThickness),n.grip.position.z=0+s+e.saberGripLength/2,n.grip.scale.set(e.saberGripThickness/Ne.saberGripThickness,e.saberGripThickness/Ne.saberGripThickness,e.saberGripLength/Ne.saberGripLength),n.collars.forEach((l,c)=>{l.position.z=0+a/2+.008+(c===0?-.5:.5)*e.saberCollarSpacing,l.scale.set(e.saberCollarSize/Ne.saberCollarSize,e.saberCollarSize/Ne.saberCollarSize,e.saberCollarThickness/Ne.saberCollarThickness)}),n.rings.forEach((l,c)=>{l.visible=c<e.saberRingCount,l.position.z=0+a*.53+(c-(e.saberRingCount-1)/2)*e.saberRingSpacing,l.scale.set(e.saberRingSize/Ne.saberRingSize,e.saberRingSize/Ne.saberRingSize,e.saberRingThickness/Ne.saberRingThickness)}),n.pommel.position.z=0+s+e.saberGripLength+e.saberPommelLength/2,n.pommel.scale.set(e.saberPommelThickness/Ne.saberPommelThickness,e.saberPommelThickness/Ne.saberPommelThickness,e.saberPommelLength/Ne.saberPommelLength),n.tip.position.z=0-r,n.trailBase.position.z=n.tip.position.z+e.replayTrailLength}function Xc(n){const e=n.settings.replayTrailSamples,i=n.mesh.geometry;i.setAttribute("position",new De(new Float32Array(e*6),3)),i.setAttribute("trailAlpha",new De(new Float32Array(e*2),1));const r=new Uint16Array((e-1)*6);for(let o=0;o<e-1;o++){const t=o*6,s=o*2;r.set([s,s+1,s+2,s+2,s+1,s+3],t)}i.setIndex(new De(r,1))}function Yc(n){const e=n.mesh.geometry.getAttribute("position"),i=n.mesh.geometry.getAttribute("trailAlpha"),r=Math.max(n.samples.length-1,1);n.samples.forEach((o,t)=>{const s=t/r,a=n.settings.replayTrailStyle==="flag"?(1-s)*.5:0,l=a+(.5-a)*n.settings.replayTrailThinness;e.setXYZ(t*2,o.base.x+(o.tip.x-o.base.x)*l,o.base.y+(o.tip.y-o.base.y)*l,o.base.z+(o.tip.z-o.base.z)*l),e.setXYZ(t*2+1,o.tip.x+(o.base.x-o.tip.x)*l,o.tip.y+(o.base.y-o.tip.y)*l,o.tip.z+(o.base.z-o.tip.z)*l);const c=s**n.settings.replayTrailFade*n.settings.replayTrailOpacity;i.setX(t*2,c),i.setX(t*2+1,c)}),e.needsUpdate=!0,i.needsUpdate=!0,n.mesh.geometry.setDrawRange(0,Math.max(n.samples.length-1,0)*6)}function M1(n,e=rf){const i=new _t;i.setDrawRange(0,0);const r=new Ue(i,n);r.frustumCulled=!1,r.visible=e.showSaberTrails;const o={mesh:r,material:n,samples:[],settings:{...e}};return Xc(o),o}function w1(n,e){const i=e.replayTrailSamples!==n.settings.replayTrailSamples;n.settings={...e},n.mesh.visible=e.showSaberTrails,n.samples.length>e.replayTrailSamples&&n.samples.splice(0,n.samples.length-e.replayTrailSamples),i&&Xc(n),Yc(n)}function E1(n){n.samples.length=0,n.mesh.geometry.setDrawRange(0,0)}function C1(n,e,i){const r=n.samples.at(-1),o=n.settings.replayTrailMotionThreshold;r!==void 0&&r.tip.distanceToSquared(i)<o*o||(n.samples.push({base:e.clone(),tip:i.clone()}),n.samples.length>n.settings.replayTrailSamples&&n.samples.shift(),Yc(n))}function dn([n,e,i]){return[.55+n*.45,.55+e*.45,.55+i*.45]}class P1{root=new it;replayPlayerRoot=new Qe;replayHeadTrack=new Qe;replayLeftHandTrack=new Qe;replayRightHandTrack=new Qe;posePlayerRoot=new Qe;poseHeadTrack=new Qe;poseHead=new Qe;replayLeftHand=new Qe;replayRightHand=new Qe;replayLeftOffset=new Qe;replayRightOffset=new Qe;replayLeftTip=new Qe;replayRightTip=new Qe;replayLeftTrailBase=new Qe;replayRightTrailBase=new Qe;gameplayHud=new Eg;replayHeadset;cameraController;replayPosition=new H;replayQuaternion=new ge;worldQuaternion=new ge;position=new H;worldHeadPosition=new H;noodlePlayerTransform=new wc;replayGeometries=[];replayMaterials=[];replaySabers=[];replayTrails=[];replaySaberColorMaterials=[];replayTrailTime=Number.NEGATIVE_INFINITY;localSpaceSaberTrail=!1;showHeadset=Vo.showHeadset;orthographicOverlayRendering=!1;saberSettings=Ne;replay=null;hasSampledReplayPose=!1;lightshowMode="full";constructor(e,i,r,o){this.cameraController=new kg(e),this.replayHeadset=new T1(i,r,o);const t=Yr(i,r,S1),s=Yr(i,r,_1),a=[{color:Ci.leftNote,offset:this.replayLeftOffset,tip:this.replayLeftTip,trailBase:this.replayLeftTrailBase},{color:Ci.rightNote,offset:this.replayRightOffset,tip:this.replayRightTip,trailBase:this.replayRightTrailBase}];for(const{color:l,offset:c,tip:f,trailBase:u}of a){const h=jm(i,l,dn(l)),d=Hm(i,dn(l)),p=x1({blade:h,core:d,metal:t,grip:s});u.position.copy(p.trailBase.position),f.position.copy(p.tip.position),p.root.remove(p.trailBase,p.tip),p.trailBase=u,p.tip=f,p.root.add(u,f),Zr(p,this.saberSettings),c.add(p.root),this.replaySabers.push(p),this.replayGeometries.push(...p.geometries),this.replayMaterials.push(h,d),this.replaySaberColorMaterials.push({blade:h,core:d});const m=Vm(l),v=M1(m);this.root.add(v.mesh),this.replayGeometries.push(v.mesh.geometry),this.replayMaterials.push(m),this.replayTrails.push(v)}this.replayMaterials.push(t,s),this.replayLeftHand.add(this.replayLeftOffset),this.replayRightHand.add(this.replayRightOffset),this.replayHeadTrack.add(this.replayHeadset.root),this.replayLeftHandTrack.add(this.replayLeftHand),this.replayRightHandTrack.add(this.replayRightHand),this.replayPlayerRoot.add(this.replayHeadTrack,this.replayLeftHandTrack,this.replayRightHandTrack),this.root.add(this.replayPlayerRoot),this.poseHeadTrack.add(this.poseHead),this.posePlayerRoot.add(this.poseHeadTrack),this.root.visible=!1}get hudRoot(){return this.gameplayHud.root}get headPosition(){return this.replayHeadset.root.updateWorldMatrix(!0,!1),this.replayHeadset.root.getWorldPosition(this.worldHeadPosition)}headPositionForPose(e,i,r,o=!1){return this.posePlayerRoot.position.set(0,0,0),this.posePlayerRoot.quaternion.identity(),this.posePlayerRoot.scale.set(1,1,1),this.poseHeadTrack.position.set(0,0,0),this.poseHeadTrack.quaternion.identity(),this.poseHeadTrack.scale.set(1,1,1),this.poseHead.position.set(e.position.x,e.position.y,-e.position.z),this.poseHead.quaternion.set(-e.rotation.x,-e.rotation.y,e.rotation.z,e.rotation.w),this.poseHead.scale.set(1,1,1),r!==void 0&&(this.noodlePlayerTransform.apply(this.posePlayerRoot,r.root,o),this.noodlePlayerTransform.apply(this.poseHeadTrack,r.head,o)),this.poseHead.updateWorldMatrix(!0,!1),this.poseHead.getWorldPosition(i)}get trackedHeadZ(){return this.replayHeadset.root.position.z}get hasReplay(){return this.replay!==null}get cameraMode(){return this.cameraController.cameraMode}get hasPoses(){return this.replay!==null&&this.replay.poses.length>0}get poseFrames(){return this.replay?.poses??[]}loadHeadset(){return this.replayHeadset.load()}setLightshowMode(e){this.lightshowMode=e;const i=ho(e);this.root.visible=!i&&this.hasPoses,this.gameplayHud.setEnabled(!i),i&&this.clearTrails(),this.cameraController.setForced(i,this.hasReplay),this.updateHeadsetVisibility()}setReplay(e,i){this.replay=e,this.hasSampledReplayPose=!1,this.gameplayHud.setReplay(e,i),this.gameplayHud.setEnabled(!ho(this.lightshowMode)),this.clearTrails(),this.cameraController.reset(),this.root.visible=!ho(this.lightshowMode)&&this.hasPoses,this.applySaberOffsets(),this.cameraController.setReplayPresence(this.hasReplay),this.updateHeadsetVisibility()}setHitScoreVisualizer(e){this.gameplayHud.setHitScoreVisualizer(e)}setMapHasNotes(e){this.cameraController.setMapHasNotes(e)}setPreviewCameraDistanceOverride(e){this.cameraController.setPreviewCameraDistanceOverride(e)}setCameraMode(e){this.cameraController.setMode(e),this.updateHeadsetVisibility()}refreshTimeline(){this.gameplayHud.refreshTimeline(),this.root.visible=!ho(this.lightshowMode)&&this.hasPoses}setSongDuration(e){this.gameplayHud.setSongDuration(e)}setCameraSettings(e){this.showHeadset=e.showHeadset,this.cameraController.setSettings(e,ho(this.lightshowMode),this.hasReplay),this.updateHeadsetVisibility()}updateHeadsetVisibility(){this.replayHeadset.root.visible=this.showHeadset&&(this.orthographicOverlayRendering||this.cameraController.cameraMode!=="first-person")}setOrthographicOverlayRendering(e){this.orthographicOverlayRendering=e,this.updateHeadsetVisibility()}setSaberSettings(e){this.clearTrails(),this.saberSettings={...e};for(const i of this.replaySabers)Zr(i,e);for(const i of this.replayTrails)w1(i,e);this.applySaberOffsets()}setNoodleTrailLocalSpace(e){if(e!==this.localSpaceSaberTrail){this.localSpaceSaberTrail=e,this.clearTrails();for(const i of this.replayTrails)(e?this.replayPlayerRoot:this.root).add(i.mesh)}}setCameraAspect(e){this.cameraController.setAspect(e)}setColors(e){[e.leftNote,e.rightNote].forEach((i,r)=>{const o=this.replaySaberColorMaterials[r];ht(o?.blade,"_Color")?.setRGB(...i).convertSRGBToLinear(),ht(o?.blade,"_CoreColor")?.setRGB(...dn(i)).convertSRGBToLinear(),ht(o?.core,"_Color")?.setRGB(...dn(i)).convertSRGBToLinear();const l=this.replayTrails[r];ht(l?.material,"_Color")?.setRGB(...i).convertSRGBToLinear()})}baseProvider(e,i){const r=this.replay,o=r===null?null:Va(r.poses,i),t=/^(baseHead|baseLeftHand|baseRightHand)(Local)?(Position|Rotation|Scale)$/.exec(e);if(t!==null){const a=t[1],l=t[2]!==void 0,c=t[3];if(c==="Scale"&&!l)return;const f=a==="baseHead"?this.replayHeadset.root:a==="baseLeftHand"?this.replayLeftHand:this.replayRightHand;if(this.hasSampledReplayPose)return c==="Scale"?f.scale.toArray():c==="Position"?(l?this.position.copy(f.position):f.getWorldPosition(this.position),[this.position.x,this.position.y,-this.position.z]):(l?this.replayQuaternion.copy(f.quaternion):f.getWorldQuaternion(this.replayQuaternion),Rr([-this.replayQuaternion.x,-this.replayQuaternion.y,this.replayQuaternion.z,this.replayQuaternion.w]));if(c==="Scale")return[1,1,1];if(o===null)return c==="Position"&&a==="baseHead"?[0,1.7,0]:[0,0,0];const u=a==="baseHead"?o.from.head:a==="baseLeftHand"?o.from.leftHand:o.from.rightHand,h=a==="baseHead"?o.to.head:a==="baseLeftHand"?o.to.leftHand:o.to.rightHand;return c==="Position"?[u.position.x+(h.position.x-u.position.x)*o.amount,u.position.y+(h.position.y-u.position.y)*o.amount,u.position.z+(h.position.z-u.position.z)*o.amount]:(this.replayQuaternion.set(u.rotation.x,u.rotation.y,u.rotation.z,u.rotation.w).slerp(this.worldQuaternion.set(h.rotation.x,h.rotation.y,h.rotation.z,h.rotation.w),o.amount),Rr([this.replayQuaternion.x,this.replayQuaternion.y,this.replayQuaternion.z,this.replayQuaternion.w]))}if(r===null)return e==="baseMultiplier"?[1]:e==="baseEnergy"?[.5]:e.startsWith("base")?[0]:void 0;const s=pn(r.scores,i);if(e==="baseCombo")return[pn(r.combos,i)?.combo??0];if(e==="baseMultiplier")return[pn(r.multipliers,i)?.multiplier??1];if(e==="baseEnergy")return[pn(r.energies,i)?.energy??.5];if(e==="baseMultipliedScore"||e==="baseModifiedScore")return[s?.score??0];if(e==="baseImmediateMaxPossibleMultipliedScore"||e==="baseImmediateMaxPossibleModifiedScore")return[s?.immediateMaxPossibleScore??0];if(e==="baseRelativeScore"){const a=s?.immediateMaxPossibleScore??0;return[a===0?0:(s?.score??0)/a]}}update(e,i,r=!1){if(this.replay===null)return;this.gameplayHud.update(e);const o=Va(this.replay.poses,e);if(o!==null){this.replayPlayerRoot.position.set(0,0,0),this.replayPlayerRoot.quaternion.identity(),this.replayPlayerRoot.scale.set(1,1,1);for(const t of[this.replayHeadTrack,this.replayLeftHandTrack,this.replayRightHandTrack])t.position.set(0,0,0),t.quaternion.identity(),t.scale.set(1,1,1);this.sampleTransform(this.replayHeadset.root,o.from.head,o.to.head,o.amount),this.sampleTransform(this.replayLeftHand,o.from.leftHand,o.to.leftHand,o.amount),this.sampleTransform(this.replayRightHand,o.from.rightHand,o.to.rightHand,o.amount),i!==void 0&&(this.noodlePlayerTransform.apply(this.replayPlayerRoot,i.root,r),this.noodlePlayerTransform.apply(this.replayHeadTrack,i.head,r),this.noodlePlayerTransform.apply(this.replayLeftHandTrack,i.leftHand,r),this.noodlePlayerTransform.apply(this.replayRightHandTrack,i.rightHand,r)),this.hasSampledReplayPose=!0,this.updateTrails(e),this.cameraController.update(this.replayHeadset.root,e)}}applyTransform(e,i){e.position.set(i.position.x,i.position.y,-i.position.z),e.quaternion.set(-i.rotation.x,-i.rotation.y,i.rotation.z,i.rotation.w),e.scale.set(1,1,1)}sampleTransform(e,i,r,o){this.applyTransform(e,i),this.replayPosition.set(r.position.x,r.position.y,-r.position.z),e.position.lerp(this.replayPosition,o),this.replayQuaternion.set(-r.rotation.x,-r.rotation.y,r.rotation.z,r.rotation.w);const t=e.quaternion.dot(this.replayQuaternion)<0?-1:1;e.quaternion.set(e.quaternion.x+(this.replayQuaternion.x*t-e.quaternion.x)*o,e.quaternion.y+(this.replayQuaternion.y*t-e.quaternion.y)*o,e.quaternion.z+(this.replayQuaternion.z*t-e.quaternion.z)*o,e.quaternion.w+(this.replayQuaternion.w*t-e.quaternion.w)*o).normalize()}clearTrails(){this.replayTrailTime=Number.NEGATIVE_INFINITY;for(const e of this.replayTrails)E1(e)}applySaberOffsets(){const e=this.saberSettings;for(const i of[this.replayLeftOffset,this.replayRightOffset])i.position.set(e.saberXOffset,e.saberYOffset,e.saberZOffset),i.rotation.set(e.saberXRotation*Math.PI/180,e.saberYRotation*Math.PI/180,e.saberZRotation*Math.PI/180)}updateTrails(e){if((e<this.replayTrailTime||e-this.replayTrailTime>.25)&&this.clearTrails(),e!==this.replayTrailTime){this.root.updateMatrixWorld(!0);for(let i=0;i<2;i++){const r=i===0?this.replayLeftTrailBase:this.replayRightTrailBase,o=i===0?this.replayLeftTip:this.replayRightTip,t=this.replayTrails[i];t!==void 0&&(r.getWorldPosition(this.position),o.getWorldPosition(this.replayPosition),this.localSpaceSaberTrail&&(this.replayPlayerRoot.worldToLocal(this.position),this.replayPlayerRoot.worldToLocal(this.replayPosition)),C1(t,this.position,this.replayPosition))}this.replayTrailTime=e}}dispose(){this.replayHeadset.dispose(),this.gameplayHud.dispose();for(const e of this.replayGeometries)e.dispose();for(const e of this.replayMaterials)e.dispose()}}function pn(n,e){let i=0,r=n.length;for(;i<r;){const o=i+r>>>1;(n[o]?.time??Number.POSITIVE_INFINITY)<=e?i=o+1:r=o}return n[i-1]}function A1(){const n=new _t;return n.setAttribute("position",new De(new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),3)),n}class O1{constructor(e=$d,i=()=>{},r=()=>null){this.onEnvironmentLoadSettled=i,this.orthoOverlayElement=r,this.pipeline=new sh,this.postBloom=new iv,this.mirror=new fp(e,6,400),this.camera.position.set(...To(Vo.previewCameraDistance)),this.scene.matrixAutoUpdate=!1,this.scene.matrixWorldAutoUpdate=!1,this.camera.layers.enable(Bt),this.camera.layers.enable(Ln),this.camera.layers.enable(Di),this.playerCameraHead.add(this.camera),this.playerCameraRoot.add(this.playerCameraHead),this.scene.add(this.playerCameraRoot);const o=this.pipeline.fogUniforms;this.mapObjects=new A0(this.mapRoot,o,this.postBloom.screenDisplacementTexture,this.camera),this.skybox=new Ue(A1(),Ed(o)),this.skybox.frustumCulled=!1,this.skybox.renderOrder=-1e3,this.scene.add(this.skybox),this.mirror.mesh.material=Ql(o,this.mirror.reflectionTexture),this.mirror.mesh.position.set(0,0,-150),this.mirror.mesh.visible=!1,this.scene.add(this.mirror.mesh),this.scene.add(this.mapRoot);const t=this.environmentLights.directionalLights;this.replayView=new P1(this.camera,o,{directions:t.directions,colors:t.colors,positions:t.positions,radii:t.radii},()=>{this.mirror.updateMaterials(this.scene)}),this.replayView.hudRoot.traverse(s=>{s.layers.set(Bt)}),this.scene.add(this.replayView.hudRoot),this.scene.add(this.replayView.root),this.mirror.updateMaterials(this.scene),this.replayView.loadHeadset()}onEnvironmentLoadSettled;orthoOverlayElement;scene=new Pi;camera=new Kr(Vo.replayCameraFov,1,.1,jl);playerCameraRoot=new it;playerCameraHead=new it;noodlePlayerTransform=new wc;mapRoot=new it;baseProviders=new Ou((e,i)=>this.baseProvider(e,i),e=>qt(e,this.data?.songBpm??120));pipeline;postBloom;mirror;skybox;replayView;replayOrthographicOverlay=new av;mapObjects;environmentLights=new xm;environment=null;environmentMirrorConsumers=[];environmentRequest=null;lightshowMode="full";colors=Ci;songDuration=0;menuLightshowSeed=null;orthoCameraEnabled=Vo.orthoCameraEnabled;screenDisplacementEffects=!0;data=null;beatSource=()=>0;setEnvironment(e,i){if(this.environment?.data.id===e&&this.environment.chromaEnvironment===i)return this.environmentRequest?.controller.abort(),this.environmentRequest=null,Promise.resolve(zo.ok(void 0));if(this.environmentRequest?.id===e&&this.environmentRequest.chromaEnvironment===i)return this.environmentRequest.result;this.environmentRequest?.controller.abort();const r=new AbortController,o=this.loadAndApplyEnvironment(e,r,i);return this.environmentRequest={id:e,chromaEnvironment:i,controller:r,result:o},o}async loadAndApplyEnvironment(e,i,r){const o=await zo.tryPromise({try:()=>kp(e,{fog:this.pipeline.fogUniforms,reflectionTexture:this.mirror.reflectionTexture,directionalLights:{directions:{value:this.environmentLights.directionalLights.directions},colors:{value:this.environmentLights.directionalLights.colors},positions:{value:this.environmentLights.directionalLights.positions},radii:{value:this.environmentLights.directionalLights.radii}},songTime:this.environmentLights.songTime},i.signal,r),catch:a=>Pu(e,a)});if(o.isErr())return this.environmentRequest?.controller===i&&(this.environmentRequest=null,this.onEnvironmentLoadSettled()),zo.err(o.error);const t=o.value;if(i.signal.aborted||this.environmentRequest?.controller!==i)return t.dispose(),zo.err(new Au({environmentId:e,message:`environment ${e} load was cancelled`}));this.environment!==null&&(this.scene.remove(this.environment.root),this.environment.dispose()),this.environment=t,this.environmentRequest=null,this.environmentMirrorConsumers=k0(t.root),this.scene.add(t.root),this.environmentLights.setEnvironment(t),this.mirror.updateMaterials(this.scene),this.pipeline.setFogParams(t.data.fogParams);const s=r!==void 0&&(Object.keys(r.materials).length>0||r.enhancements.length>0||r.animations.length>0||r.componentAnimations.length>0||r.fogTrackEvents.length>0);return this.pipeline.setBackgroundGradient(s?null:t.backgroundGradient),this.onEnvironmentLoadSettled(),zo.ok(void 0)}setBeatSource(e){this.beatSource=e}startMenuLightshow(e){const i=performance.now();this.menuLightshowSeed=e,this.beatSource=()=>(performance.now()-i)/500,this.replayView.setPreviewCameraDistanceOverride(ah),this.environmentLights.setMenuLightshow(e)}setLightshowMode(e){this.lightshowMode=e,this.environmentLights.setLightshowMode(e);const i=ho(e);this.mapRoot.visible=!i,this.replayView.setLightshowMode(e),this.mapObjects.invalidate()}clear(){this.clearMap(),this.setSongDuration(null),this.setReplay(null),this.menuLightshowSeed!==null&&this.startMenuLightshow(this.menuLightshowSeed)}setReplay(e,i){this.replayView.setReplay(e,i),this.baseProviders.reset(),this.mapObjects.invalidate()}setHitScoreVisualizer(e){this.replayView.setHitScoreVisualizer(e)}setSongDuration(e){this.songDuration=e??0,this.replayView.setSongDuration(e)}appendReplayNoteEvents(e){this.data!==null&&e.length>0&&(Lu(this.data,e),this.mapObjects.invalidate()),this.replayView.refreshTimeline()}appendReplayHeightEvents(e){this.data===null||e.length===0||(Ru(this.data,e),this.mapObjects.invalidate())}setReplayCameraMode(e){this.replayView.setCameraMode(e)}setReplayCameraSettings(e){this.orthoCameraEnabled=e.orthoCameraEnabled,this.replayOrthographicOverlay.setView(e.orthoCameraView),this.replayView.setCameraSettings(e)}setReplaySaberSettings(e){this.replayView.setSaberSettings(e)}setScreenDisplacementEffects(e){this.screenDisplacementEffects=e,this.postBloom.setScreenDisplacementEnabled(e),this.mapObjects.setScreenDisplacementEffects(e)}setPreviewNotesLookAtPlayer(e){this.mapObjects.setPreviewNotesLookAtPlayer(e)}setPreviewHitNotes(e){this.mapObjects.setPreviewHitNotes(e)}setPreviewHitLine(e){this.mapObjects.setPreviewHitLine(e)}setMap(e,i){this.replayView.setPreviewCameraDistanceOverride(null),this.clearMap(),this.data=e,this.replayView.setMapHasNotes(e.notes.length>0),this.replayView.setNoodleTrailLocalSpace(e.noodle.localSpaceSaberTrail);const r=this.resolveMapColors(i);this.colors=r,this.baseProviders.reset(),this.environmentLights.setMap(e,r),this.replayView.setColors(r),this.mapObjects.setMap(e,r),this.mirror.updateMaterials(this.scene)}refreshMapColors(e){if(this.data===null)return;const i=this.resolveMapColors(e);this.colors=i,this.baseProviders.reset(),this.environmentLights.setColors(i),this.replayView.setColors(i),this.mapObjects.setColors(i)}resolveMapColors(e){return this.environment===null?Ci:gl(this.environment.data.colorScheme,e)}clearMap(){this.mapObjects.clear(),this.data=null,this.replayView.setMapHasNotes(!1),this.replayView.setNoodleTrailLocalSpace(!1),this.environmentLights.clearMap(),this.mirror.updateMaterials(this.scene)}baseProvider(e,i){const r=this.data,o=a=>[a[0],a[1],a[2],1],t=this.colors;if(e==="baseNote0Color")return o(r?.leftHanded===!0?t.rightNote:t.leftNote);if(e==="baseNote1Color")return o(r?.leftHanded===!0?t.leftNote:t.rightNote);if(e==="baseObstaclesColor")return o(t.obstacle);if(e==="baseSaberAColor")return o(t.leftNote);if(e==="baseSaberBColor")return o(t.rightNote);if(e==="baseEnvironmentColor0")return o(t.environmentLeft);if(e==="baseEnvironmentColor1")return o(t.environmentRight);if(e==="baseEnvironmentColorW")return o(t.environmentWhite);if(e==="baseEnvironmentColor0Boost")return o(t.environmentLeftBoost);if(e==="baseEnvironmentColor1Boost")return o(t.environmentRightBoost);if(e==="baseEnvironmentColorWBoost")return o(t.environmentWhiteBoost);const s=qt(i,r?.songBpm??120);if(e==="baseSongTime")return[s];if(e==="baseSongLength")return[this.songDuration];if(e==="basePlayerHeight")return[this.playerHeightAt(s)];if(r!==null){const a=r.movementStateAt?.(i);if(e==="baseNoteJumpMovementSpeed")return[a?.noteJumpSpeed??r.noteJumpSpeed??0];if(e==="baseNoteJumpStartBeatOffset")return[r.noteStartBeatOffset??0];if(e==="baseJumpDistance")return[a?.jumpDistance??0]}return this.replayView.baseProvider(e,s)}playerHeightAt(e){const i=this.data;if(i===null)return 1.8;let r=0,o=i.replayHeights.length;for(;r<o;){const t=r+o>>>1;(i.replayHeights[t]?.time??Number.POSITIVE_INFINITY)<=e?r=t+1:o=t}return i.replayHeights[r-1]?.height??i.initialPlayerHeight}update(e){const i=this.data;if(this.environment!==null){const s=this.environmentLights.update(e,this.baseProviders);s!==void 0&&this.pipeline.setFogParams(s)}if(i===null||ho(this.lightshowMode))return;const r=qt(e,i.songBpm);this.playerCameraRoot.position.set(0,0,0),this.playerCameraRoot.quaternion.identity(),this.playerCameraRoot.scale.set(1,1,1),this.playerCameraHead.position.set(0,0,0),this.playerCameraHead.quaternion.identity(),this.playerCameraHead.scale.set(1,1,1);const o=jo(i.noodle,"Root",e,this.baseProviders,i.leftHanded),t=jo(i.noodle,"Head",e,this.baseProviders,i.leftHanded);(!this.replayView.hasReplay||this.replayView.cameraMode==="static")&&(this.noodlePlayerTransform.apply(this.playerCameraRoot,o,i.leftHanded),this.noodlePlayerTransform.apply(this.playerCameraHead,t,i.leftHanded)),this.replayView.update(r,this.replayView.hasReplay?{root:o,head:t,leftHand:jo(i.noodle,"LeftHand",e,this.baseProviders,i.leftHanded),rightHand:jo(i.noodle,"RightHand",e,this.baseProviders,i.leftHanded)}:void 0,i.leftHanded),this.mapObjects.update(e,this.replayView,this.baseProviders)}render(e){if(this.environmentRequest!==null&&this.data===null)return;const i=this.environment===null&&this.data===null?0:this.beatSource();if(this.update(i),this.scene.updateMatrixWorld(),this.environment?.applyConstraints()===!0&&this.scene.updateMatrixWorld(),this.environment?.syncInstancedMeshes(),this.environment!==null&&this.environmentLights.updateWorldLights(i),N0(this.environmentMirrorConsumers,this.camera)&&this.mirror.render(e,this.scene,this.camera,(r,o)=>{this.pipeline.render(r,o,this.environmentLights.lightSegments)}),this.pipeline.render(e,this.camera,this.environmentLights.lightSegments),this.postBloom.render(e,this.scene,this.camera,this.mapRoot.visible&&this.mapObjects.wallsVisible),this.orthoCameraEnabled&&this.replayView.hasReplay&&!ho(this.lightshowMode)){const r=this.orthoOverlayElement();r!==null&&this.renderOrthographicOverlay(e,r,i)}}renderOrthographicOverlay(e,i,r){const o=this.environment?.root,t=o?.visible??!1,s=this.skybox.visible,a=this.mirror.mesh.visible,l=this.replayView.hudRoot.visible,c=this.pipeline.fogUniforms,f=c._CustomFogAttenuation.value,u=c._CustomFogHeightFogHeight.value,h=c._CustomFogHeightFogStartY.value;try{o!==void 0&&(o.visible=!1),this.skybox.visible=!1,this.mirror.mesh.visible=!1,this.replayView.hudRoot.visible=!1,this.replayView.setOrthographicOverlayRendering(!0),c._CustomFogAttenuation.value=0,c._CustomFogHeightFogHeight.value=1,c._CustomFogHeightFogStartY.value=-1e6,this.screenDisplacementEffects&&this.mapObjects.setScreenDisplacementEffects(!1),this.replayOrthographicOverlay.setHalfJumpDistance(this.data?.movementStateAt?.(r).halfJumpDistance),this.replayOrthographicOverlay.render(e,this.scene,i)}finally{this.screenDisplacementEffects&&this.mapObjects.setScreenDisplacementEffects(!0),c._CustomFogAttenuation.value=f,c._CustomFogHeightFogHeight.value=u,c._CustomFogHeightFogStartY.value=h,this.replayView.setOrthographicOverlayRendering(!1),this.replayView.hudRoot.visible=l,this.mirror.mesh.visible=a,this.skybox.visible=s,o!==void 0&&(o.visible=t)}}contextRestored(){this.pipeline.invalidate()}setSize(e,i){this.replayView.setCameraAspect(e/Math.max(i,1)),this.postBloom.setSize(e,i)}dispose(){this.environmentRequest?.controller.abort(),this.environmentRequest=null,this.environment!==null&&(this.scene.remove(this.environment.root),this.environment.dispose()),this.mapObjects.dispose(),this.replayView.dispose(),this.replayOrthographicOverlay.dispose();for(const e of[this.skybox,this.mirror.mesh])Array.isArray(e.material)||e.material.dispose();this.skybox.geometry.dispose(),this.mirror.dispose(),this.pipeline.dispose(),this.postBloom.dispose()}}export{O1 as MapView};
