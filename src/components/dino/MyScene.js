import { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import Dino from './Dino';
import Text from './Text';

import { OrbitControls, Stars } from '@react-three/drei'

function MyScene() {

  return (
    <Canvas 
          concurrent
          colorManagement
          camera={{ position: [0, 0, 50], fov: 70 }}
          style={{backgroundColor: "#269dff"}}
        >
        <OrbitControls />
        <Stars/>
        <ambientLight intensity={1} />

        <Suspense fallback={null}>
            <Dino position={[0, 0 ,0]}/>
            <Text position={[-10, -1.8, -1]} children="TRONG" />
            <Text position={[10, -1.8, -1]} children="NHAN" />
        </Suspense>
    </Canvas>
  )
}

export default MyScene;