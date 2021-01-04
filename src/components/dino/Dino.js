import { useState, useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from 'react-three-fiber'
import { useGLTF } from "drei";
const Dino = ({ position }) => {
    const gltf = useGLTF('/dino.gltf', true);
    const group = useRef()
    const [mixer] = useState(() => new THREE.AnimationMixer())
    useEffect(() => {
        mixer.clipAction(gltf.animations[0], group.current).play()
        return () => gltf.animations.forEach(clip => mixer.uncacheClip(clip))
        // eslint-disable-next-line
    }, [])

    useFrame((state, delta) => {
        mixer.update(delta)
    })

    return (
        <group ref={group} position={position}>
            <primitive object={gltf.scene} dispose={null} scale={[0.1, 0.1, 0.1]} />;
        </group>
    )
}

export default Dino
