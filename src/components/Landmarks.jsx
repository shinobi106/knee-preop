import { createRef, useRef, useState } from 'react';
import { Line, Sphere, Text, TransformControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';



export function Landmarks(props) {
  console.log(props.rotationFactor);
  

  function PlanePerpendicularToLine({ start, end, rotation, color, resection }) {
    const { gl } = useThree()
  
    // Calculate the direction vector (from start to end) and normalize it
    const direction = new THREE.Vector3().subVectors(new THREE.Vector3(...end), new THREE.Vector3(...start)).normalize()
  
    // Define the quaternion for rotating the plane
    const quaternion = new THREE.Quaternion()
    const up = rotation === 'null' 
      ? new THREE.Vector3(0, 0, 1) 
      : rotation === 'ant' 
        ? new THREE.Vector3(props.rotationFactor, 0, 1) 
        : new THREE.Vector3(0, props.rotationFactorLateral, 1)
  
    quaternion.setFromUnitVectors(up, direction)
  
    
    start[1] -= rotation === 'distal' ? 0.8 : rotation === 'resection' ? -1 : 0
  
    const planeRef = useRef()
  
    useFrame(() => {
      if (planeRef.current && rotation === 'resection') {
        if (resection) {
          const planePosition = new THREE.Vector3()
          planeRef.current.getWorldPosition(planePosition)
    
          const planeNormal = new THREE.Vector3(0, 0, 1).applyQuaternion(quaternion)
    
          const clippingPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(planeNormal, planePosition)
    
          gl.clippingPlanes = [clippingPlane] // Enable clipping plane
          gl.localClippingEnabled = true
        } else {
          gl.clippingPlanes = [] // Clear the clipping plane when resection is false
          gl.localClippingEnabled = false // Disable local clipping
        }
      }
    })
  
    return (
      <mesh position={start} quaternion={quaternion} ref={planeRef}>
        <planeGeometry args={[10, 10]} /> {/* Plane size */}
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
    )
  }
  


  function Landmark({ position, sphereRef, color }) {
    return (
      <Sphere ref={sphereRef} args={[0.5, 8, 8]} position={position}>
        <meshStandardMaterial color={color} />
      </Sphere>
    );
  }
  const MechanicalAxis = [
    [1.2, -2, 0],   // Femur Center
    [-1.5, 40, 1.5],   // Hip Center
  ];

  const startMechanicalAxis = new THREE.Vector3(...MechanicalAxis[0])
  const endMechanicalAxis = new THREE.Vector3(...MechanicalAxis[1])

  const midPointMechanicalAxis = new THREE.Vector3().addVectors(startMechanicalAxis, endMechanicalAxis).multiplyScalar(0.5);

  const AnatomicalAxis = [
    [1.8, -1, 1.5], // Femur Proximal Canal
    [-4, 39, 0], // Femur Distal Canal
  ];

  const startAnatomicalAxis = new THREE.Vector3(...AnatomicalAxis[0])
  const endAnatomicalAxis = new THREE.Vector3(...AnatomicalAxis[1])

  const midPointAnatomicalAxis = new THREE.Vector3().addVectors(startAnatomicalAxis, endAnatomicalAxis).multiplyScalar(0.3);


  const TEA = [
    [5.4, -0.5, -2], // Medial Epicondyle
    [-2.2, -0.5, -1]  // Lateral Epicondyle
  ];

  const PCA = [
    [3.5, -2.4, -2.8], // Posterior Medial Pt
    [-1, -2.4, -2.5] // Posterior Lateral Pt
  ];

  const landmarkPositions = [
    { "pos": [1.2, -2, 0], "name": props.FemurCenter },
    { "pos": [-1.5, 40, 1.5], "name": props.HipCenter },
    { "pos": [1.8, -1, 1.5], "name": props.FemurProximalCanal },
    { "pos": [-4, 39, 0], "name": props.FemurDistalCanal },
    { "pos": [5.4, -0.5, -2], "name": props.MedialEpicondyle },
    { "pos": [-2.2, -0.5, -1], "name": props.LateralEpicondyle },
    { "pos": [3.5, -2.8, -0.8], "name": props.DistalMedialPt },
    { "pos": [-0.5, -2.8, -0.5], "name": props.DistalLateralPt },
    { "pos": [3.5, -2.4, -2.8], "name": props.PosteriorMedialPt },
    { "pos": [-1, -2.4, -2.5], "name": props.PosteriorLateralPt },
  ];

  // Create refs for spheres and their corresponding TransformControls
  const sphereRefs = useRef(landmarkPositions.map(() => createRef()));
  const transformRefs = useRef(landmarkPositions.map(() => createRef()));

  return (
    <>
      {props.linesVisible && (
        <group>
          <Line points={MechanicalAxis} lineWidth={2} color={'yellow'} depthTest={false} />
          <Text
            position={[midPointMechanicalAxis.x + 6, midPointMechanicalAxis.y, midPointMechanicalAxis.z]} // Position at the midpoint // Rotate text to align with the line
            fontSize={1}
            color="white"
          >
            Mechanical Axis
          </Text>
          <PlanePerpendicularToLine start={MechanicalAxis[0]} end={MechanicalAxis[1]} rotation={'null'} color={'red'} resection={props.resection}/> 
          <Line points={AnatomicalAxis} lineWidth={2} color={'yellow'} depthTest={false} />

          <Text
                position={[midPointAnatomicalAxis.x + 8, midPointAnatomicalAxis.y, midPointAnatomicalAxis.z]} // Position at the midpoint // Rotate text to align with the line
                fontSize={1}
                color="white"
              >
                Anatomical Axis
          </Text>
          <Line points={TEA} lineWidth={2} color={'yellow'} depthTest={false} />
          {/* <PlanePerpendicularToLine start={TEA[0]} end={TEA[1]} /> */}
          <Line points={PCA} lineWidth={2} color={'yellow'} depthTest={false} />
          <Line points={[MechanicalAxis[0], [1.2, -2, -1]]} lineWidth={2} color={'red'} depthTest={false} />
          <Line points={[MechanicalAxis[0], [0.2, -2, 0]]} lineWidth={2} color={'blue'} depthTest={false} />
          <PlanePerpendicularToLine start={MechanicalAxis[0]} end={MechanicalAxis[1]} rotation={'ant'} color={'green'} resection={props.resection}/> {/* varus/valgus plane */}
          <PlanePerpendicularToLine start={MechanicalAxis[0]} end={MechanicalAxis[1]} rotation={'lateral'} color={'blue'} resection={props.resection}/> {/* Flexion/Extension plane */}
          <PlanePerpendicularToLine start={MechanicalAxis[0]} end={MechanicalAxis[1]} rotation={'distal'} color={'yellow'} resection={props.resection}/> {/* distal medial plane */}
          <PlanePerpendicularToLine start={MechanicalAxis[0]} end={MechanicalAxis[1]} rotation={'resection'} color={'white'} resection={props.resection}/> {/* distal resection plane */}
        </group>
      )}

      {landmarkPositions.map((pos, idx) => (
        pos['name'] ? 
        <TransformControls
          ref={transformRefs.current[idx]}
          key={idx}
          object={sphereRefs.current[idx]}
          onMouseDown={props.disableOrbitControls}
          onMouseUp={props.enableOrbitControls}
        >
          <Landmark
            key={idx}
            position={pos.pos}
            sphereRef={sphereRefs.current[idx]}
            color={pos.name ? 'red' : 'white'}
          />
        </TransformControls> : 
        <Landmark
            key={idx}
            position={pos.pos}
            sphereRef={sphereRefs.current[idx]}
            color={pos.name ? 'red' : 'white'}
          />
      ))}
    </>
  );
}
