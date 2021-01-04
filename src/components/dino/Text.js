import * as THREE from 'three'
import { useMemo } from 'react'
import { useLoader, useUpdate } from 'react-three-fiber'

export default function Text({ children, size = 1, color = '#000000', ...props }) {
    const font = useLoader(THREE.FontLoader, '/bold.blob')
    const config = useMemo(() => ({ font, size: 40, height: 30, curveSegments: 32, bevelEnabled: true, bevelThickness: 6, bevelSize: 2.5, bevelOffset: 0, bevelSegments: 8 }),
        [font]
    )
    const mesh = useUpdate((self) => {
        const size = new THREE.Vector3()
        self.geometry.computeBoundingBox()
        self.geometry.boundingBox.getSize(size)
        self.position.x = -size.x / 2
        self.position.y = -size.y / 2
    },[children])
    return (
        <group {...props} scale={[0.1 * size, 0.1 * size, 0.1]}>
            <mesh ref={mesh}>
                <textBufferGeometry args={[children, config]} />
                <meshNormalMaterial />
            </mesh>
        </group>
    )
}
