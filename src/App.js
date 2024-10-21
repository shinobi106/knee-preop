import { Canvas } from '@react-three/fiber';
import FemurTibiaLoader from './components/FemurTibiaLoader';
import { Landmarks } from './components/Landmarks';
import { Axes } from './components/Axes';
import { CuttingPlane } from './components/CuttingPlane';
import { Controls } from './components/Controls';
import { useState } from 'react';
import { Center, OrbitControls } from '@react-three/drei';


function App() {
  const [landmarks, setLandmarks] = useState([
    [0, 0, 0], // Femur Center
    [0, 0, 0], // Hip Center
  ]);

  const [FemurCenter, setFemurCenter] = useState(false);
  const [HipCenter, setHipCenter] = useState(false);
  const [FemurProximalCanal, setFemurProximalCanal] = useState(false);
  const [FemurDistalCanal, setFemurDistalCanal] = useState(false);
  const [MedialEpicondyle, setMedialEpicondyle] = useState(false);
  const [LateralEpicondyle, setLateralEpicondyle] = useState(false);
  const [DistalMedialPt, setDistalMedialPt] = useState(false);
  const [DistalLateralPt, setDistalLateralPt] = useState(false);
  const [PosteriorMedialPt, setPosteriorMedialPt] = useState(false);
  const [PosteriorLateralPt, setPosteriorLateralPt] = useState(false);
  const [landmarksHidden, setLandmarksHidden] = useState(true);
  const [orbitControls, setorbitControls] = useState(true);
  const [linesVisible, setLinesVisible] = useState(false);
  const [rotationFactor, setRotationFactor] = useState(0);
  const [rotationFactorLateral, setRotationFactorLateral] = useState(0);
  const [resection, setResection] = useState(false);
  const [measurement, setMeasurement] = useState(10);



  const disableOrbitControls = () => {
    console.log('disableOrbitControls');
      setorbitControls(false);
  }

  const enableOrbitControls = () => {
    console.log('enableOrbitControls');
    setorbitControls(true);
  }

  const handleLateralMovement = (sign) => {
    if(sign === 'plus') {
      setRotationFactorLateral(prev => prev + 0.02);
      setMeasurement(prev => prev + 0.5);
    }
    if(sign === 'minus') {
      setRotationFactorLateral(prev => prev - 0.02);
      setMeasurement(prev => prev - 0.5);
    }
  }

  return (
    <div className='main-cnt'>
      <div className='landmark-controls'>
        <div className='item'>
            <span>Femur Center</span>
            <button className={FemurCenter ? 'white' : 'black'} onClick={() => setFemurCenter(prev => !prev)}>active</button>
        </div>
        <div className='item'>
            <span>Hip Center</span>
            <button className={HipCenter ? 'white' : 'black'} onClick={() => setHipCenter(prev => !prev)}>active</button>
        </div>
        <div className='item'>
            <span>Femur Proximal Canal</span>
            <button className={FemurProximalCanal ? 'white' : 'black'} onClick={() => setFemurProximalCanal(prev => !prev)}>active</button>
        </div>
        <div className='item'>
            <span>Femur Distal Canal</span>
            <button className={FemurDistalCanal ? 'white' : 'black'} onClick={() => setFemurDistalCanal(prev => !prev)}>active</button>
        </div>
        <div className='item'>
            <span>Medial Epicondyle</span>
            <button className={MedialEpicondyle ? 'white' : 'black'} onClick={() => setMedialEpicondyle(prev => !prev)}>active</button>
        </div>
        <div className='item'>
            <span>Lateral Epicondyle</span>
            <button className={LateralEpicondyle ? 'white' : 'black'} onClick={() => setLateralEpicondyle(prev => !prev)}>active</button>
        </div>
        <div className='item'>
            <span>Distal Medial Pt</span>
            <button className={DistalMedialPt ? 'white' : 'black'} onClick={() => setDistalMedialPt(prev => !prev)}>active</button>
        </div>
        <div className='item'>
            <span>Distal Lateral Pt</span>
            <button className={DistalLateralPt ? 'white' : 'black'} onClick={() => setDistalLateralPt(prev => !prev)}>active</button>
        </div>
        <div className='item'>
            <span>Posterior Medial Pt</span>
            <button className={PosteriorMedialPt ? 'white' : 'black'} onClick={() => setPosteriorMedialPt(prev => !prev)}>active</button>
        </div>
        <div className='item'>
            <span>Posterior Lateral Pt</span>
            <button className={PosteriorLateralPt ? 'white' : 'black'} onClick={() => setPosteriorLateralPt(prev => !prev)}>active</button>
        </div>

        <div className='item'>
          <button className={linesVisible ? 'white' : 'black'} onClick={() => setLinesVisible(true)}>Update</button>
        </div>
      </div>

      <div className='rotation-controls'>
        <div className='item'>
          <button className='plus' onClick={() => setRotationFactor(prev => prev + 0.02)}>+</button>
            <span className='text green' style={{color: 'green'}}>Varus/Valgus</span>
          <button className='plus' onClick={() => setRotationFactor(prev => prev - 0.02)}>-</button>
        </div>

        <div className='item'>
          <button className='plus' onClick={() => handleLateralMovement('plus')}>+</button>
            <span className='text green'>Flexion/Extension</span>
          <button className='plus' onClick={() => handleLateralMovement('minus')}>-</button>
        </div>

        <div className='item'>
          <button className='plus' onClick={() => handleLateralMovement('plus')}>+</button>
            <span className='text green'>{measurement}mm</span>
          <button className='plus' onClick={() => handleLateralMovement('minus')}>-</button>
        </div>

        <div className='item'>
          <button className={resection ? 'white' : 'black'} onClick={() => setResection(prev => !prev)}>Resection</button>
        </div>
      </div>
      <Canvas className='canvas' camera={{ position: [0, 0, -80], far:10000 }}>
        <ambientLight intensity={1} />
        <Center>
          <FemurTibiaLoader />
        </Center>
        <directionalLight intensity={10} color={0xeb4634} position={[1, 0.75, 0.5]} />
          <directionalLight intensity={10} color={0xccccff} position={[-1, 0.75, -0.5]} />
        <Landmarks landmarks={landmarks} 
          FemurCenter={FemurCenter}
          HipCenter={HipCenter}
          FemurProximalCanal={FemurProximalCanal}
          FemurDistalCanal={FemurDistalCanal}
          MedialEpicondyle={MedialEpicondyle}
          LateralEpicondyle={LateralEpicondyle}
          DistalLateralPt={DistalLateralPt}
          DistalMedialPt={DistalMedialPt}
          PosteriorMedialPt={PosteriorMedialPt}
          PosteriorLateralPt={PosteriorLateralPt}
          landmarksHidden={landmarksHidden}
          disableOrbitControls={disableOrbitControls}
          enableOrbitControls={enableOrbitControls}
          linesVisible={linesVisible}
          rotationFactor={rotationFactor}
          rotationFactorLateral={rotationFactorLateral}
          resection={resection}
        />
        <Axes landmarks={landmarks} />
        {/* <CuttingPlane landmarks={landmarks} axis={[0, 1, 0]} /> */}
        {orbitControls && <OrbitControls enablePan={true}/>}
      </Canvas>
    </div>
  );
}

export default App;
