'use client';

import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, PerspectiveCamera, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Preload the updated Pool GLB model
useGLTF.preload('/models/Pool.glb');

function PoolGLBModel({ poolWidth = 4, poolLength = 8, coverState = 'half', color = 'grey' }) {
  const { nodes, materials } = useGLTF('/models/Pool.glb');

  // Animated state ref for smooth lerping
  const animState = useRef({
    width: poolWidth,
    length: poolLength,
    progress: coverState === 'closed' ? 1.0 : coverState === 'open' ? 0.0 : 0.5,
  });

  // Keep a copy of original water vertex positions for wave animation
  const originalWaterPositions = useRef(null);

  // Setup materials texture wrapping, transparency, UV scaling and tile resolution on mount
  useEffect(() => {
    // 1. Configure Transparent, sparkling Water material
    const waterMat = materials['Water liquid'];
    if (waterMat) {
      waterMat.transparent = true;
      waterMat.opacity = 0.50;
      waterMat.roughness = 0.05;
      waterMat.metalness = 0.1;
      waterMat.color = new THREE.Color('#0ea5e9'); // Vibrant cyan pool water
      waterMat.depthWrite = false; // Essential: allows viewing pool floor and walls underneath
      if (waterMat.map) {
        waterMat.map.wrapS = THREE.RepeatWrapping;
        waterMat.map.wrapT = THREE.RepeatWrapping;
      }
      waterMat.needsUpdate = true;
    }

    // Set renderOrder on WaterSurface so opaque pool basin is drawn first
    if (nodes.WaterSurface) {
      nodes.WaterSurface.renderOrder = 1;
    }

    // 2. Configure Fabric material repeat wrapping
    const fabricMat = materials['Fabric-Grey'];
    if (fabricMat) {
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
    }

    // 3. Match BlanketToRoll UV density to Blanket for crisp, detailed fabric texture
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

    // 4. Configure Stone gravel textures
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

    // 5. Configure Pool Tiles textures with fine repeat
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
        fabricMat.color.set('#C8B5A3'); // Warm Sand/Beige
      } else {
        fabricMat.color.set('#525866'); // Slate/Anthracite Grey
      }
      fabricMat.needsUpdate = true;
    }
  }, [color, materials]);

  useFrame((state, delta) => {
    // 1. Smooth lerping for parameters
    const lerpSpeed = Math.min(1, delta * 8);
    animState.current.width = THREE.MathUtils.lerp(animState.current.width, poolWidth, lerpSpeed);
    animState.current.length = THREE.MathUtils.lerp(animState.current.length, poolLength, lerpSpeed);

    // Target cover progress: closed = 1.0, half = 0.5, open = 0.0
    const targetProgress = coverState === 'closed' ? 1.0 : coverState === 'open' ? 0.0 : 0.5;
    animState.current.progress = THREE.MathUtils.lerp(animState.current.progress, targetProgress, lerpSpeed);

    const curW = animState.current.width;
    const curL = animState.current.length;
    const curP = animState.current.progress;

    const w = curW / 2; // half width (e.g. 2m for 4m wide pool)
    const l = curL / 2; // half length (e.g. 4m for 8m long pool)

    // Base dimensions modeled in Blender: 2m x 4m (baseWidth=2, baseLength=4)
    const widthScale = curW / 2.0;
    const lengthScale = curL / 4.0;

    // High density multiplier creates realistic, small mosaic tiles on the pool walls and floor
    const tileMat = materials['pool tiles'];
    if (tileMat) {
      const tileDensity = 25.0;
      if (tileMat.map) {
        tileMat.map.repeat.set(widthScale * tileDensity, lengthScale * tileDensity);
      }
      if (tileMat.normalMap) {
        tileMat.normalMap.repeat.set(widthScale * tileDensity, lengthScale * tileDensity);
      }
    }

    const stoneMat = materials['Stone gravel'];
    if (stoneMat) {
      if (stoneMat.map) {
        stoneMat.map.repeat.set(widthScale * 2.0, lengthScale * 2.0);
      }
      if (stoneMat.normalMap) {
        stoneMat.normalMap.repeat.set(widthScale * 2.0, lengthScale * 2.0);
      }
    }

    const waterMat = materials['Water liquid'];
    if (waterMat && waterMat.map) {
      waterMat.map.repeat.set(widthScale * 3.0, lengthScale * 3.0);
    }

    // 2. Transform Pool Structure & Surroundings
    if (nodes.WaterSurface) {
      nodes.WaterSurface.scale.set(widthScale, 1, lengthScale);
      nodes.WaterSurface.position.set(0, -0.00488, 0);
    }

    if (nodes.PoolHole) {
      nodes.PoolHole.position.set(-w, -0.75, 0);
      nodes.PoolHole.scale.set(0.75, widthScale, 2 * lengthScale);
    }

    // Concrete Borders:
    // A) Long Sides (Left & Right): Keep scale.x = 0.25 constant, only scale Z length and translate X!
    if (nodes.ConcreteBlockLeft) {
      nodes.ConcreteBlockLeft.position.set(-(w + 0.25), 0, 0);
      nodes.ConcreteBlockLeft.scale.set(0.25, 1, l);
    }
    if (nodes.ConcreteBlockRight) {
      nodes.ConcreteBlockRight.position.set(+(w + 0.25), 0, 0);
      nodes.ConcreteBlockRight.scale.set(0.25, 1, l);
    }

    // B) Short Sides (Top & Bottom on Z axis): Keep scale.x = 0.25 constant, scale Z width = w + 0.5, translate Z!
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

    // 4. Mechanism Positioning along Z (Open vs Half vs Closed)
    // Full span from rail start (l + 0.30) to rail end (-(l + 0.28))
    const zAnchor = l + 0.30; // Anchored at the near rail end
    const zClosed = -(l + 0.28); // Closes all the way to the far rail end
    const zOpen = l + 0.05; // Retracts to the near rail end
    const zMech = zOpen + (zClosed - zOpen) * curP;

    // Boxes: Move along X with pool width, and along Z with the mechanism
    // Left Box is centered at -(w + 0.20), Right Box is centered at +(w + 0.20)
    if (nodes.Left) {
      nodes.Left.position.set(-(w + 0.20), 0.21, zMech);
      nodes.Left.scale.set(0.1895, 0.155, 0.212);
    }
    if (nodes.Right) {
      nodes.Right.position.set(+(w + 0.20), 0.21, zMech);
      nodes.Right.scale.set(0.1895, 0.155, 0.212);
    }

    // 5. Extended BlanketToRoll:
    // Offset Z by +0.1092 so the cylinder roll axis aligns DEAD-CENTER with the motor boxes and side holes
    if (nodes.BlanketToRoll) {
      nodes.BlanketToRoll.position.set(0, 0.0605, zMech + 0.1092);
      const rollScaleX = (w + 0.34) / 1.342778;
      nodes.BlanketToRoll.scale.set(rollScaleX, 1.0, 1.0);
    }

    // 6. Main Cover Blanket (Blanket)
    // Anchored at zAnchor (near rail end), moving edge at zMech (reaches far rail end when closed)
    if (nodes.Blanket) {
      const coverLength = Math.max(0.05, zAnchor - zMech);
      const zBlanketCenter = (zAnchor + zMech) / 2;

      nodes.Blanket.position.set(0, 0.0605, zBlanketCenter);
      // Width: (w + 0.34) fully covers the water and spans to the side rails on both sides
      // Length scales from center: total length = coverLength
      nodes.Blanket.scale.set(w + 0.34, 1.0, coverLength / 2);
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
        const wave =
          Math.sin(x * 5.5 + time * 3.0) * 0.012 +
          Math.cos(z * 4.0 + time * 2.2) * 0.01 +
          Math.sin((x + z) * 3.0 + time * 1.5) * 0.008;

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

      {/* Extended Roll Attachment Textile (Centered in Box & High-Res Textured) */}
      {nodes.BlanketToRoll && <primitive object={nodes.BlanketToRoll} />}

      {/* Main Cover Blanket */}
      {nodes.Blanket && <primitive object={nodes.Blanket} />}
    </group>
  );
}

export default function Scene3D({
  poolWidth = 4,
  poolLength = 8,
  coverState = 'half',
  color = 'grey',
}) {
  const controlsRef = useRef();

  return (
    <div className="w-full h-full relative">
      {/* React Three Fiber Canvas */}
      <Canvas shadows className="w-full h-full cursor-grab active:cursor-grabbing">
        <PerspectiveCamera makeDefault position={[5.8, 4.6, 7.2]} fov={42} />

        {/* Studio Lighting */}
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[12, 18, 10]}
          intensity={1.8}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-10, 10, -10]} intensity={0.8} color="#93c5fd" />
        <directionalLight position={[0, -5, 5]} intensity={0.3} color="#ffffff" />
        <hemisphereLight skyColor="#ffffff" groundColor="#1e293b" intensity={0.7} />

        {/* 3D GLB Model in Suspense */}
        <Suspense fallback={null}>
          <PoolGLBModel
            poolWidth={poolWidth}
            poolLength={poolLength}
            coverState={coverState}
            color={color}
          />
        </Suspense>

        {/* Soft Contact Ground Shadow */}
        <ContactShadows
          position={[0, -0.76, 0]}
          opacity={0.65}
          scale={24}
          blur={2.2}
          far={6}
        />

        {/* 360 Orbit Controls */}
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          minDistance={3.5}
          maxDistance={18}
          maxPolarAngle={Math.PI / 2.05}
          autoRotate={false}
          dampingFactor={0.05}
        />
      </Canvas>
    </div>
  );
}
