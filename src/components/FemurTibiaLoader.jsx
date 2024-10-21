// FemurTibiaLoader.js
import { useLoader } from '@react-three/fiber';
// import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { STLLoader } from 'three-stdlib';

function STLModel({ url, position }) {
  const geometry = useLoader(STLLoader, url);
  // geometry.center()

  return (
    <mesh scale={0.1}  rotation={[-1.6, 0, 0]}>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
}

export default function FemurTibiaLoader() {
  return (
    <>
      {/* Load Femur and Tibia */}
      <STLModel url="/Femur.stl" />
      <STLModel url="/Tibia.stl" />
    </>
  );
}
