import * as THREE from 'three';

export function CuttingPlane({ landmarks, axis, color = 'yellow' }) {
    const planeArgs = [200, 200]; // Size of the plane
    const planePosition = landmarks[0]; // Use first landmark for positioning
    const rotationAxis = axis || [1, 0, 0]; // Rotate the plane as needed
  
    return (
      <mesh position={planePosition} rotation={rotationAxis}>
        <planeGeometry attach="geometry" args={planeArgs} />
        <meshStandardMaterial attach="material" color={color} side={THREE.DoubleSide} />
      </mesh>
    );
  }
  