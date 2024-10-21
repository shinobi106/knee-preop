import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Extend the object so that React Three Fiber is aware of it
extend({ Line: THREE.Line });

function LineBetweenPoints({ start, end, color = 'blue' }) {
    // Correct declaration of points
    const startPoint = new THREE.Vector3(...start);
    const endPoint = new THREE.Vector3(...end);
  
    const points = [startPoint, endPoint];
  
    return (
      <line>
        <bufferGeometry>
          <bufferAttribute
            attachObject={['attributes', 'position']}
            array={new Float32Array(points.flatMap(point => [point.x, point.y, point.z]))}
            count={points.length}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={color} />
      </line>
    );
  }
  
  
  export function Axes({ landmarks }) {
    return (
      <>
        {/* Mechanical Axis: Femur Center to Hip Center */}
        <LineBetweenPoints start={landmarks[0]} end={landmarks[1]} color="green" />
  
        {/* Other axes can be added here in a similar way */}
      </>
    );
  }
  