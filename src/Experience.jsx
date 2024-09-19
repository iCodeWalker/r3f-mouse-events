import { useFrame } from "@react-three/fiber";
import { meshBounds, useGLTF, OrbitControls } from "@react-three/drei";
import { useRef } from "react";

export default function Experience() {
  const cube = useRef();

  // Load model
  const hamburgerModel = useGLTF("./hamburger.glb");

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  // click event handling
  const eventHandler = (event) => {
    console.log("clicked", event);
    // changing the color of cube on click
    cube.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 76%)`);
  };

  const onPointerOverEventHandler = (e) => {
    console.log(e);
  };

  return (
    <>
      <OrbitControls makeDefault />

      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />

      <mesh
        position-x={-2}
        onClick={(e) => {
          e.stopPropagation(); // Occluding the object
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>

      <mesh
        ref={cube}
        position-x={2}
        scale={1.5}
        raycast={meshBounds}
        onClick={eventHandler}
        onContextMenu={eventHandler}
        onPointerOver={onPointerOverEventHandler}
        // Adding cursor pointer
        onPointerEnter={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "default")}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>

      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>

      {/* Adding model to the scene */}
      <primitive
        object={hamburgerModel.scene}
        scale={0.26}
        position-y={0.6}
        onClick={(event) => {
          console.log("click", event.object.name);
          event.stopPropagation();
        }}
      />
    </>
  );
}
