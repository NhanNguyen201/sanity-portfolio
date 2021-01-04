import { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import Heart from './Heart';
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
            <Heart position={[0, -5 ,0]}/>
            <Text position={[0, 5, -1]} children="REACTJS" />
        </Suspense>
    </Canvas>
  )
}

export default MyScene;