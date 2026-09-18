import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function PlanetTeaser(props) {
  const shperesContainer = useRef(null);
  const ringContainer = useRef(null);
  const { nodes, materials } = useGLTF("/models/Planet.glb");

  useFrame((_, delta) => {
    if (shperesContainer.current) {
      shperesContainer.current.rotation.y += delta * 0.35;
    }
    if (ringContainer.current) {
      ringContainer.current.rotation.z += delta * 0.18;
    }
  });

  return (
    <group {...props} dispose={null}>
      <group ref={shperesContainer}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={materials["Material.002"]}
          rotation={[0, 0, 0.741]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere2.geometry}
          material={materials["Material.001"]}
          position={[0.647, 1.03, -0.724]}
          rotation={[0, 0, 0.741]}
          scale={0.223}
        />
      </group>
      <mesh
        ref={ringContainer}
        castShadow
        receiveShadow
        geometry={nodes.Ring.geometry}
        material={materials["Material.001"]}
        rotation={[-0.124, 0.123, -0.778]}
        scale={2}
      />
    </group>
  );
}
