'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <div>Something went wrong. Please try refreshing the page.</div>;
  }

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          onError: () => setHasError(true),
        }),
      )}
    </>
  );
}

export default function PixelStars() {
  return (
    <ErrorBoundary>
      <PixelStarField />
    </ErrorBoundary>
  );
}

function PixelStarField() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();

    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });

    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create a group to hold all pixel stars
    const group = new THREE.Group();

    groupRef.current = group;
    scene.add(group);

    // Load star texture
    const starTexture = new THREE.TextureLoader().load('/asset.png'); // Replace with the actual path to your star texture
    const starMaterial = new THREE.SpriteMaterial({ map: starTexture });

    // Create stars
    const starCount = 100;
    const starSize = 0.1;

    for (let i = 0; i < starCount; i++) {
      const star = new THREE.Sprite(starMaterial);

      star.scale.set(starSize, starSize, 1);
      star.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
      );
      group.add(star);
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);

    scene.add(ambientLight);

    camera.position.set(0, 0, 5);
    camera.lookAt(scene.position);

    // Rotation and zoom variables
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    const dragRotationSpeed = 0.01;
    const zoomSpeed = 0.1;
    const minZoom = 3;
    const maxZoom = 20;
    let targetZoom = camera.position.length();
    let currentZoom = targetZoom;

    // Interaction handlers
    const startDragging = (clientX: number, clientY: number) => {
      isDragging = true;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const stopDragging = () => {
      isDragging = false;
    };

    const drag = (clientX: number, clientY: number) => {
      if (isDragging && groupRef.current) {
        const deltaMove = {
          x: clientX - previousMousePosition.x,
          y: clientY - previousMousePosition.y,
        };

        const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
          new THREE.Euler(
            deltaMove.y * dragRotationSpeed,
            deltaMove.x * dragRotationSpeed,
            0,
            'XYZ',
          ),
        );

        groupRef.current.quaternion.multiplyQuaternions(
          deltaRotationQuaternion,
          groupRef.current.quaternion,
        );

        previousMousePosition = { x: clientX, y: clientY };
      }
    };

    const zoom = (delta: number) => {
      targetZoom += delta * zoomSpeed;
      targetZoom = Math.max(minZoom, Math.min(maxZoom, targetZoom));
    };

    // Mouse event handlers
    const onMouseDown = (event: MouseEvent) => startDragging(event.clientX, event.clientY);
    const onMouseMove = (event: MouseEvent) => drag(event.clientX, event.clientY);
    const onMouseUp = stopDragging;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      zoom(event.deltaY);
    };

    // Touch event handlers
    let previousTouchDistance = 0;
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        startDragging(event.touches[0].clientX, event.touches[0].clientY);
      } else if (event.touches.length === 2) {
        previousTouchDistance = Math.hypot(
          event.touches[0].pageX - event.touches[1].pageX,
          event.touches[0].pageY - event.touches[1].pageY,
        );
      }
    };
    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        event.preventDefault();
        drag(event.touches[0].clientX, event.touches[0].clientY);
      } else if (event.touches.length === 2) {
        const touchDistance = Math.hypot(
          event.touches[0].pageX - event.touches[1].pageX,
          event.touches[0].pageY - event.touches[1].pageY,
        );

        zoom(previousTouchDistance - touchDistance);
        previousTouchDistance = touchDistance;
      }
    };
    const onTouchEnd = stopDragging;

    // Add event listeners
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    // Animation loop
    const animate = () => {
      if (sceneRef.current && rendererRef.current && groupRef.current && cameraRef.current) {
        requestAnimationFrame(animate);

        // Auto-rotation
        if (!isDragging) {
          group.rotation.x += 0.002;
          group.rotation.y += 0.002;
        }

        // Smooth zoom
        currentZoom += (targetZoom - currentZoom) * 0.1;
        const direction = new THREE.Vector3()
          .subVectors(camera.position, scene.position)
          .normalize();

        camera.position.copy(direction.multiplyScalar(currentZoom));
        camera.lookAt(scene.position);

        rendererRef.current.render(sceneRef.current, camera);
      }
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        const { innerWidth, innerHeight } = window;

        cameraRef.current.aspect = innerWidth / innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(innerWidth, innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100vh',
        cursor: isHovering ? 'grab' : 'default',
        touchAction: 'none',
      }}
    />
  );
}
