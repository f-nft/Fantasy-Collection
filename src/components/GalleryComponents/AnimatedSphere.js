import React, { useRef, useState } from 'react'
import {MeshDistortMaterial} from '@react-three/drei'
import { Html } from '@react-three/drei';



function AnimatedSphere(props) {
     const mesh = useRef()
  // Set up state for the hovered and active state
  const [active, setActive] = useState(false)

  return (
      <mesh
      {...props}
      ref={mesh}
      scale={9}
      onClick={(event) => setActive(!active)}
      >
        <sphereBufferGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
            distort={0.3}
            speed={0.9}
            color="#8352FD"
            roughness={0.9}
         />
              <Html center className="content" position={[0,0,0]}>
              <div className="wrapper" style={{textAlign:"center"}}>
                <h3>{props.text}</h3>
                <h4>30%</h4>
              </div>
            </Html>
    </mesh>
  )
}

export default AnimatedSphere