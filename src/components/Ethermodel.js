import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'


export default function Model(props) {
  const { nodes, materials } = useGLTF('/ethermodel.glb')
  // const { camera } = useThree()




  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} >
        <mesh
          geometry={nodes.Object_2.geometry}
          material={materials['default']}
        />
        <Html as="div" center>
          <h3
            id="ContractHeading"
            onClick={() =>
              window.open(
                'https://etherscan.io/address/0xc1f32ee1634c4a3d217920122216aedbd1014f08',
                '_blank',
              )
            }
            style={{ color: 'white', marginTop: '12em',textAlign: 'center' }}
          >
          {props.custom}
          </h3>
        </Html>
      </group>
    </group>
  )
}

useGLTF.preload('/ethermodel.glb')
