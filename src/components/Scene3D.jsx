'use client';

import React, { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { FiPlus, FiMinus, FiSearch } from 'react-icons/fi';
import { getLinerById, DEFAULT_LINER_ID } from '../data/linerData';

// Preload the updated Pool GLB model
useGLTF.preload('/models/Pool.glb');


function getProgress(val) {
  if (typeof val === 'number') {
    return Math.max(0, Math.min(1, val / 100));
  }
  return val === 'closed' ? 1.0 : val === 'open' ? 0.0 : 0.5;
}

// ─── Custom Control Legend Icons (Desktop & Mobile) ──────────────────────────
function MouseLeftIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <rect x="5" y="2" width="14" height="20" rx="7" stroke="#38bdf8" strokeWidth="2" />
      <line x1="5" y1="10" x2="19" y2="10" stroke="#38bdf8" strokeWidth="2" />
      <line x1="12" y1="2" x2="12" y2="10" stroke="#38bdf8" strokeWidth="2" />
      <path d="M5 9C5 5.13401 8.13401 2 12 2V10H5V9Z" fill="#38bdf8" />
    </svg>
  );
}

function MouseRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <rect x="5" y="2" width="14" height="20" rx="7" stroke="#38bdf8" strokeWidth="2" />
      <line x1="5" y1="10" x2="19" y2="10" stroke="#38bdf8" strokeWidth="2" />
      <line x1="12" y1="2" x2="12" y2="10" stroke="#38bdf8" strokeWidth="2" />
      <path d="M12 2C15.866 2 19 5.13401 19 9V10H12V2Z" fill="#38bdf8" />
    </svg>
  );
}

function OneFingerIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M12 2v9" />
      <path d="M12 11a3 3 0 0 1 3 3v2a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6v-3a3 3 0 0 1 3-3h1" />
      <path d="M12 6a2 2 0 0 1 2 2v3" />
    </svg>
  );
}

function TwoFingersIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d="M9 2v9" />
      <path d="M13 3v8" />
      <path d="M13 11a3 3 0 0 1 3 3v2a6 6 0 0 1-6 6H7a6 6 0 0 1-6-6v-3a3 3 0 0 1 3-3h1" />
      <path d="M13 7a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function PoolGLBModel({ poolWidth = 4, poolLength = 8, coverState = 50, color = 'grey', linerId = DEFAULT_LINER_ID }) {
  const { nodes, materials } = useGLTF('/models/Pool.glb');

  // Animated state ref for smooth lerping
  const animState = useRef({
    width: poolWidth,
    length: poolLength,
    progress: getProgress(coverState),
  });

  // Keep a copy of original water vertex positions for wave animation
  const originalWaterPositions = useRef(null);

  // Setup materials texture wrapping, transparency, UV scaling and tile resolution on mount
  useEffect(() => {
    // 1. Configure realistic refractive Water material with optical distortion (transmission & IOR)
    if (nodes.WaterSurface) {
      if (!nodes.WaterSurface.userData.physicalConfigured) {
        const oldMat = materials['Water liquid'];
        const physicalWater = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color('#38bdf8'), // Crystal sparkling pool turquoise
          transmission: 0.90, // Crystal clear transmission so it's bright and radiant
          opacity: 0.98,
          transparent: true,
          ior: 1.333, // Real physical water refraction
          thickness: 0.8, // Refraction depth
          roughness: 0.03, // Glossy mirror-like pool finish
          metalness: 0.02,
          clearcoat: 1.0,
          clearcoatRoughness: 0.02,
          attenuationColor: new THREE.Color('#0ea5e9'), // Radiant tropical azure
          attenuationDistance: 4.5, // High distance prevents darkening
          depthWrite: false,
        });
        if (oldMat && oldMat.map) {
          physicalWater.map = oldMat.map;
          physicalWater.map.wrapS = THREE.RepeatWrapping;
          physicalWater.map.wrapT = THREE.RepeatWrapping;
        }
        if (oldMat && oldMat.normalMap) {
          physicalWater.normalMap = oldMat.normalMap;
          physicalWater.normalMap.wrapS = THREE.RepeatWrapping;
          physicalWater.normalMap.wrapT = THREE.RepeatWrapping;
          physicalWater.normalScale = new THREE.Vector2(0.3, 0.3);
        }
        nodes.WaterSurface.material = physicalWater;
        nodes.WaterSurface.userData.physicalConfigured = true;
      }
      nodes.WaterSurface.renderOrder = 1;
    }

    // 2. Configure Fabric material: Matte, non-reflective
    const fabricMat = materials['Fabric-Grey'];
    if (fabricMat) {
      fabricMat.roughness = 0.95;
      fabricMat.metalness = 0.0;
      if (fabricMat.map) {
        fabricMat.map.wrapS = THREE.RepeatWrapping;
        fabricMat.map.wrapT = THREE.RepeatWrapping;
      }
      if (fabricMat.normalMap) {
        fabricMat.normalMap.wrapS = THREE.RepeatWrapping;
        fabricMat.normalMap.wrapT = THREE.RepeatWrapping;
      }
      if (fabricMat.roughnessMap) {
        fabricMat.roughnessMap.wrapS = THREE.RepeatWrapping;
        fabricMat.roughnessMap.wrapT = THREE.RepeatWrapping;
      }
      fabricMat.needsUpdate = true;
    }

    // 3. Make mechanism side enclosures glossy and reflective
    ['Stainless steel', 'Stainless steel black'].forEach((name) => {
      const m = materials[name];
      if (m) {
        m.roughness = 0.15;
        m.metalness = 0.85;
        m.needsUpdate = true;
      }
    });

    // 4. Match BlanketToRoll UV density to Blanket
    if (nodes.BlanketToRoll && nodes.BlanketToRoll.geometry) {
      const geo = nodes.BlanketToRoll.geometry;
      if (!geo.userData.uvAdjusted) {
        if (geo.attributes.uv2) {
          const uv2 = geo.attributes.uv2;
          for (let i = 0; i < uv2.count; i++) {
            uv2.setX(i, uv2.getX(i) * 4.3);
          }
          uv2.needsUpdate = true;
        }
        if (geo.attributes.uv) {
          const uv = geo.attributes.uv;
          for (let i = 0; i < uv.count; i++) {
            uv.setX(i, uv.getX(i) * 4.3);
          }
          uv.needsUpdate = true;
        }
        geo.userData.uvAdjusted = true;
      }
    }

    // 5. Configure Stone gravel textures
    const stoneMat = materials['Stone gravel'];
    if (stoneMat) {
      if (stoneMat.map) {
        stoneMat.map.wrapS = THREE.RepeatWrapping;
        stoneMat.map.wrapT = THREE.RepeatWrapping;
      }
      if (stoneMat.normalMap) {
        stoneMat.normalMap.wrapS = THREE.RepeatWrapping;
        stoneMat.normalMap.wrapT = THREE.RepeatWrapping;
      }
    }

    // Clone stone material for top and bottom so width and length scale independently without texture stretching
    if (stoneMat && nodes.ConcreteBlockTop && !nodes.ConcreteBlockTop.userData.clonedMat) {
      const topMat = stoneMat.clone();
      if (topMat.map) topMat.map = stoneMat.map.clone();
      if (topMat.normalMap) topMat.normalMap = stoneMat.normalMap.clone();
      nodes.ConcreteBlockTop.material = topMat;
      if (nodes.ConcreteBlockBottom) nodes.ConcreteBlockBottom.material = topMat;
      nodes.ConcreteBlockTop.userData.clonedMat = true;
    }

    // 6. Configure Pool Tiles textures
    const tileMat = materials['pool tiles'];
    if (tileMat) {
      if (tileMat.map) {
        tileMat.map.wrapS = THREE.RepeatWrapping;
        tileMat.map.wrapT = THREE.RepeatWrapping;
      }
      if (tileMat.normalMap) {
        tileMat.normalMap.wrapS = THREE.RepeatWrapping;
        tileMat.normalMap.wrapT = THREE.RepeatWrapping;
      }
    }
  }, [materials, nodes]);

  // Dynamic color updating for the blanket fabric
  useEffect(() => {
    const fabricMat = materials['Fabric-Grey'];
    if (fabricMat) {
      if (color === 'beige') {
        fabricMat.color.set('#E6D7C3'); // Warm light beige
      } else {
        fabricMat.color.set('#374151'); // Anthracite Grey
      }
      fabricMat.needsUpdate = true;
    }
  }, [color, materials]);

  // Material instances for solid (homogén, sima szín) vs patterned (mozaik/minta) liners
  const linerMaterialsRef = useRef({
    solid: null,
    pattern: null,
  });

  // Dynamic liner color and water color updating based on selected foil
  useEffect(() => {
    if (!nodes.PoolHole) return;
    const activeLiner = getLinerById(linerId);
    if (!activeLiner) return;

    // Lazily initialize materials
    if (!linerMaterialsRef.current.pattern) {
      const baseTile = materials['pool tiles'];
      if (baseTile) {
        const pMat = baseTile.clone();
        if (pMat.map) {
          pMat.map = baseTile.map.clone();
          pMat.map.wrapS = THREE.RepeatWrapping;
          pMat.map.wrapT = THREE.RepeatWrapping;
        }
        if (pMat.normalMap) {
          pMat.normalMap = baseTile.normalMap.clone();
          pMat.normalMap.wrapS = THREE.RepeatWrapping;
          pMat.normalMap.wrapT = THREE.RepeatWrapping;
        }
        pMat.roughness = 0.25;
        pMat.metalness = 0.05;
        linerMaterialsRef.current.pattern = pMat;
      }
    }
    if (!linerMaterialsRef.current.solid) {
      linerMaterialsRef.current.solid = new THREE.MeshStandardMaterial({
        roughness: 0.35,
        metalness: 0.02,
      });
    }

    const { solid, pattern } = linerMaterialsRef.current;
    if (activeLiner.category === 'solid' && solid) {
      // Homogén, sima szín textúraminta nélkül
      solid.color.set(activeLiner.colorHex);
      solid.needsUpdate = true;
      nodes.PoolHole.material = solid;
    } else if (pattern) {
      // Mintás fólia: mozaik textúra a választott árnyalattal színezve
      pattern.color.set(activeLiner.colorHex);
      pattern.needsUpdate = true;
      nodes.PoolHole.material = pattern;
    }

    // Adapt water color & physical light attenuation to match the liner reflection
    if (nodes.WaterSurface && nodes.WaterSurface.material) {
      const wMat = nodes.WaterSurface.material;
      if (wMat.color && activeLiner.waterColor) {
        wMat.color.set(activeLiner.waterColor);
      }
      if (wMat.attenuationColor && activeLiner.waterAttenuation) {
        wMat.attenuationColor.set(activeLiner.waterAttenuation);
      }
      if (activeLiner.waterDistance) {
        wMat.attenuationDistance = activeLiner.waterDistance;
      }
      wMat.needsUpdate = true;
    }
  }, [linerId, nodes, materials]);

  useFrame((state, delta) => {
    // 1. Smooth lerping for parameters
    const lerpSpeed = Math.min(1, delta * 8);
    animState.current.width = THREE.MathUtils.lerp(animState.current.width, poolWidth, lerpSpeed);
    animState.current.length = THREE.MathUtils.lerp(animState.current.length, poolLength, lerpSpeed);

    const targetProgress = getProgress(coverState);
    animState.current.progress = THREE.MathUtils.lerp(animState.current.progress, targetProgress, lerpSpeed);

    const curW = animState.current.width;
    const curL = animState.current.length;
    const curP = animState.current.progress;

    const w = curW / 2; // half width
    const l = curL / 2; // half length

    const widthScale = curW / 2.0;
    const lengthScale = curL / 4.0;

    // Pool liner texture repeat scaling (only for patterned material with map)
    const holeMat = nodes.PoolHole?.material;
    if (holeMat && holeMat.map) {
      const tileDensity = 14.0;
      holeMat.map.repeat.set(widthScale * tileDensity, lengthScale * tileDensity);
      if (holeMat.normalMap) {
        holeMat.normalMap.repeat.set(widthScale * tileDensity, lengthScale * tileDensity);
      }
    }

    // Concrete Stone repeat
    const stoneMat = materials['Stone gravel'];
    if (stoneMat) {
      if (stoneMat.map) stoneMat.map.repeat.set(1.0, curL * 1.2);
      if (stoneMat.normalMap) stoneMat.normalMap.repeat.set(1.0, curL * 1.2);
    }
    if (nodes.ConcreteBlockTop && nodes.ConcreteBlockTop.material) {
      const topMat = nodes.ConcreteBlockTop.material;
      if (topMat.map) topMat.map.repeat.set(1.0, (curW + 1.0) * 1.2);
      if (topMat.normalMap) topMat.normalMap.repeat.set(1.0, (curW + 1.0) * 1.2);
    }

    const waterMat = materials['Water liquid'];
    if (waterMat && waterMat.map) {
      waterMat.map.repeat.set(widthScale * 3.0, lengthScale * 3.0);
    }

    // 2. Transform Pool Structure & Surroundings
    if (nodes.WaterSurface) {
      nodes.WaterSurface.scale.set(widthScale, 1, lengthScale);
      // Sits comfortably 6.5cm below the deck so waves never clip through closed cover
      nodes.WaterSurface.position.set(0, -0.065, 0);
    }

    if (nodes.PoolHole) {
      nodes.PoolHole.position.set(-w, -0.75, 0);
      nodes.PoolHole.scale.set(0.75, widthScale, 2 * lengthScale);
    }

    // Concrete Borders:
    if (nodes.ConcreteBlockLeft) {
      nodes.ConcreteBlockLeft.position.set(-(w + 0.25), 0, 0);
      nodes.ConcreteBlockLeft.scale.set(0.25, 1, l);
    }
    if (nodes.ConcreteBlockRight) {
      nodes.ConcreteBlockRight.position.set(+(w + 0.25), 0, 0);
      nodes.ConcreteBlockRight.scale.set(0.25, 1, l);
    }

    if (nodes.ConcreteBlockTop) {
      nodes.ConcreteBlockTop.position.set(0, 0, -(l + 0.25));
      nodes.ConcreteBlockTop.scale.set(0.25, 1, w + 0.5);
    }
    if (nodes.ConcreteBlockBottom) {
      nodes.ConcreteBlockBottom.position.set(0, 0, +(l + 0.25));
      nodes.ConcreteBlockBottom.scale.set(0.25, 1, w + 0.5);
    }

    // 3. Poolzip Guide Rails: Run along full length Z from -(l + 0.384) to +(l + 0.384)
    if (nodes.RailLeft) {
      nodes.RailLeft.position.set(-(w + 0.345), 0.055, 0);
      nodes.RailLeft.scale.set(0.018, 0.005, l + 0.384);
    }
    if (nodes.RailRight) {
      nodes.RailRight.position.set(+(w + 0.345), 0.055, 0);
      nodes.RailRight.scale.set(0.018, 0.005, l + 0.384);
    }

    // 4. Mechanism Positioning along Z (Open vs Closed)
    const zAnchor = l + 0.384; // Reaches exact rail tip
    const zClosed = -(l + 0.28);
    const zOpen = l + 0.05;
    const zMech = zOpen + (zClosed - zOpen) * curP;

    // Left and Right Mechanism Boxes
    if (nodes.Left) {
      nodes.Left.position.set(-(w + 0.20), 0.21, zMech);
      nodes.Left.scale.set(0.1895, 0.155, 0.212);
    }
    if (nodes.Right) {
      nodes.Right.position.set(+(w + 0.20), 0.21, zMech);
      nodes.Right.scale.set(0.1895, 0.155, 0.212);
    }

    // 5. Extended BlanketToRoll
    if (nodes.BlanketToRoll) {
      nodes.BlanketToRoll.position.set(0, 0.0605, zMech + 0.1092);
      const rollScaleX = (w + 0.34) / 1.342778;
      nodes.BlanketToRoll.scale.set(rollScaleX, 1.0, 1.0);
    }

    // 6. Main Cover Blanket (Blanket)
    if (nodes.Blanket) {
      const coverLength = Math.max(0.05, zAnchor - zMech);
      const zBlanketCenter = (zAnchor + zMech) / 2;

      nodes.Blanket.position.set(0, 0.0605, zBlanketCenter);
      nodes.Blanket.scale.set(w + 0.34, 1.0, coverLength / 2);

      // Realistic physical texture unrolling: pinned at anchor, rolls out from mechanism
      if (materials['Fabric-Grey'] && materials['Fabric-Grey'].map) {
        const mat = materials['Fabric-Grey'];
        const fabricDensity = 0.85;
        const Delta_V = 2.3625;
        const k = fabricDensity / Delta_V;
        const repeatY = coverLength * k;
        const offsetY = -2.8327 * repeatY;
        if (mat.map) {
          mat.map.repeat.set(1.5, repeatY);
          mat.map.offset.set(0, offsetY);
        }
        if (mat.normalMap) {
          mat.normalMap.repeat.set(1.5, repeatY);
          mat.normalMap.offset.set(0, offsetY);
        }
        if (mat.roughnessMap) {
          mat.roughnessMap.repeat.set(1.5, repeatY);
          mat.roughnessMap.offset.set(0, offsetY);
        }
      }
    }

    // 7. Water Surface Real-time Vertex Wave Animation
    if (nodes.WaterSurface && nodes.WaterSurface.geometry) {
      const geo = nodes.WaterSurface.geometry;
      const posAttr = geo.attributes.position;

      if (!originalWaterPositions.current) {
        originalWaterPositions.current = new Float32Array(posAttr.array);
      }

      const orig = originalWaterPositions.current;
      const time = state.clock.getElapsedTime();

      for (let i = 0; i < posAttr.count; i++) {
        const x = orig[i * 3];
        const z = orig[i * 3 + 2];
        // Dense, smaller, multi-directional ripples for sparkling light distortion
        const wave =
          Math.sin(x * 12.0 + time * 3.4) * 0.0035 +
          Math.cos(z * 10.5 + time * 2.8) * 0.0035 +
          Math.sin((x + z) * 8.5 + time * 2.1) * 0.0025 +
          Math.cos((x - z) * 7.0 + time * 1.7) * 0.002;

        posAttr.setY(i, orig[i * 3 + 1] + wave);
      }
      posAttr.needsUpdate = true;
      geo.computeVertexNormals();
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Concrete Borders */}
      {nodes.ConcreteBlockTop && <primitive object={nodes.ConcreteBlockTop} />}
      {nodes.ConcreteBlockBottom && <primitive object={nodes.ConcreteBlockBottom} />}
      {nodes.ConcreteBlockLeft && <primitive object={nodes.ConcreteBlockLeft} />}
      {nodes.ConcreteBlockRight && <primitive object={nodes.ConcreteBlockRight} />}

      {/* Pool Basin Cavity */}
      {nodes.PoolHole && <primitive object={nodes.PoolHole} />}

      {/* Animated Semi-transparent Water Surface */}
      {nodes.WaterSurface && <primitive object={nodes.WaterSurface} />}

      {/* Aluminum Guide Rails */}
      {nodes.RailLeft && <primitive object={nodes.RailLeft} />}
      {nodes.RailRight && <primitive object={nodes.RailRight} />}

      {/* Left and Right Machine Enclosures */}
      {nodes.Left && <primitive object={nodes.Left} />}
      {nodes.Right && <primitive object={nodes.Right} />}

      {/* Extended Roll Attachment Textile */}
      {nodes.BlanketToRoll && <primitive object={nodes.BlanketToRoll} />}

      {/* Main Cover Blanket */}
      {nodes.Blanket && <primitive object={nodes.Blanket} />}
    </group>
  );
}

export default function Scene3D({
  poolWidth = 4,
  poolLength = 8,
  coverState = 50,
  color = 'grey',
  linerId = DEFAULT_LINER_ID,
}) {
  const controlsRef = useRef();
  const [zoom, setZoom] = useState(50); // 0 (far) to 100 (close)

  // Smoothly adjust camera distance along its current angle when zoom changes
  useEffect(() => {
    if (controlsRef.current) {
      const controls = controlsRef.current;
      const camera = controls.object;
      if (camera) {
        const dir = camera.position.clone().sub(controls.target).normalize();
        const targetDist = 14.0 - (zoom / 100) * (14.0 - 4.8);
        camera.position.copy(controls.target).add(dir.multiplyScalar(targetDist));
        controls.update();
      }
    }
  }, [zoom]);

  return (
    <div
      className="w-full h-full relative"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* React Three Fiber Canvas */}
      <Canvas shadows className="w-full h-full cursor-grab active:cursor-grabbing">
        <PerspectiveCamera makeDefault position={[5.8, 4.6, 7.2]} fov={42} />

        {/* Balanced 360 Studio Lighting */}
        <ambientLight intensity={1.5} />
        <directionalLight
          position={[12, 18, 10]}
          intensity={1.9}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-12, 16, -10]} intensity={1.4} color="#fffcf5" />
        <directionalLight position={[0, 10, -12]} intensity={0.9} color="#ffffff" />
        <directionalLight position={[0, 10, 12]} intensity={0.9} color="#ffffff" />
        <hemisphereLight skyColor="#ffffff" groundColor="#1e293b" intensity={0.8} />

        {/* 3D GLB Model in Suspense */}
        <Suspense fallback={null}>
          <PoolGLBModel
            poolWidth={poolWidth}
            poolLength={poolLength}
            coverState={coverState}
            color={color}
            linerId={linerId}
          />
        </Suspense>

        {/* Soft Contact Ground Shadow directly under the bottom of the pool basin */}
        <ContactShadows
          position={[0, -1.53, 0]}
          opacity={0.65}
          scale={26}
          blur={2.4}
          far={6}
        />

        {/* 360 Orbit Controls: Left=Rotate, Right=Pan */}
        <OrbitControls
          ref={controlsRef}
          target={[0, -0.4, 0]}
          enableZoom={false}
          enablePan={true}
          minDistance={3.5}
          maxDistance={18}
          maxPolarAngle={Math.PI / 2.05}
          autoRotate={false}
          dampingFactor={0.05}
          mouseButtons={{
            LEFT: THREE.MOUSE.ROTATE,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
          touches={{
            ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.PAN,
          }}
        />
      </Canvas>

      {/* ══ BOTTOM CONTROL BAR: Centered side-by-side on desktop, stacked with gap on mobile ══ */}
      <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col md:flex-row items-center gap-2 md:gap-3 select-none w-[92%] sm:w-[85%] md:w-auto">
        {/* 1. Controls Legend Pill */}
        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-1.5 rounded-full text-xs text-white/90 border border-white/10 shadow-xl whitespace-nowrap">
          {/* Desktop Legend (Mouse) */}
          <div className="hidden md:flex items-center gap-3.5">
            <div className="flex items-center gap-1.5">
              <MouseLeftIcon />
              <span style={{ fontFamily: "Gotham, sans-serif" }} className="text-[11.5px] font-medium">
                Forgatás
              </span>
            </div>
            <span className="w-px h-3 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <MouseRightIcon />
              <span style={{ fontFamily: "Gotham, sans-serif" }} className="text-[11.5px] font-medium">
                Mozgatás
              </span>
            </div>
          </div>

          {/* Mobile Touch Legend (Fingers) */}
          <div className="flex md:hidden items-center gap-3">
            <div className="flex items-center gap-1.5">
              <OneFingerIcon />
              <span style={{ fontFamily: "Gotham, sans-serif" }} className="text-[11px]">
                1 ujj: Forgatás
              </span>
            </div>
            <span className="w-px h-3 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <TwoFingersIcon />
              <span style={{ fontFamily: "Gotham, sans-serif" }} className="text-[11px]">
                2 ujj: Mozgatás
              </span>
            </div>
          </div>
        </div>

        {/* 2. Zoom Controls Pill: Thin, matching legend style, with magnifier icon in front */}
        <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 md:px-4 md:py-1.5 rounded-full border border-white/10 text-white/90 shadow-xl w-full md:w-auto justify-center">
          {/* Magnifier Icon in front */}
          <FiSearch className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />

          {/* Zoom Out Button (-) */}
          <button
            type="button"
            onClick={() => setZoom((prev) => Math.max(0, prev - 15))}
            title="Kicsinyítés (-)"
            aria-label="Kicsinyítés"
            className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white/90 transition-all cursor-pointer border-none flex-shrink-0"
          >
            <FiMinus className="w-2.5 h-2.5" />
          </button>

          {/* Zoom Slider */}
          <input
            type="range"
            min="0"
            max="100"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            title="Zoom csúszka"
            aria-label="Zoom csúszka"
            className="flex-1 md:w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#F28C48]"
          />

          {/* Zoom In Button (+) */}
          <button
            type="button"
            onClick={() => setZoom((prev) => Math.min(100, prev + 15))}
            title="Nagyítás (+)"
            aria-label="Nagyítás"
            className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white/90 transition-all cursor-pointer border-none flex-shrink-0"
          >
            <FiPlus className="w-2.5 h-2.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
