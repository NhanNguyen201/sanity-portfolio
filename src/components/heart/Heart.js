import {  useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import { useGLTF } from "drei";
const Heart = ({ position }) => {
    const gltf = useGLTF('/heart.gltf', true);
    const mesh = useRef()
    useFrame(() => {
        mesh.current.rotation.y += 0.02;
    })

    return (
        <group position={position}>
            <primitive ref={mesh} object={gltf.scene} dispose={null} scale={[.1, .1, .1]} />;
        </group>
    )
}

export default Heart
