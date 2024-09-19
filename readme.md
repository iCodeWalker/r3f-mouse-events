## Mouse Events

    # Listening to click events :

    Handling mouse events in native three.js is a bit tricky, we need to use a Raycaster(cast rays). And to have the array of objects that the rays intersect and put than in the array.
    But r3f have made the process of mouse events or pointer events much easier and we won't have to implement a Raycaster.

    All we need to do is to add an onClick attribute to an object in our scene(like a mesh) and provide  it with a function.

    # Event Information

    We can access the event related information by passing an argument to the function.

    A click implies that the pointer went down onto the object and then up again while remaining on teh object, If it started outside or ended outside the event doesn't count as a click.

    # Other Events :

      onContextMenu:
        1. When the context menu appears (Right click).
        2. On desktop it is Right click or ctrl + left click.
        3. On mobile it is pressing down for some time.

      onDoubleClick:
        1. When we double click or tap on the same object.
        2. The delay between the first and second click/tap is defined by the OS

      onPointerUp:
        1. When we release the click(left or right) or touch.

      onPointerDown:
        1. When we've just clicked or put our finger down.

      onPointerOver / onPointerEnter:
        1. When the cursor or finger just went above the object.
        2. In native javascript onPointerOver will be triggered on the intersection of children nodes also and in onPointerEnter will trigger only when cursor entered the container and not on child intersections.
        3. In r3f Both works the same.

      onPointerOut / onPointerLeave:
        1. When the cursor or finger just went out from the object.
        2. In r3f Both works the same.

      onPointerMove:
        1. Trigger on each frame if the cursor moves above the object.

      onPointerMissed:
        1. When user clicks outside of the object.
        2. We can add it on the <Canvas> and it will be triggered when none of the objects listening to the click is clicked.

    # Occluding:

      When one object is behind the other the click event is handled by the object behind the function will gets trigged because no obstruction is provided in r3f or three.js, we have to handle it.
      Occlude means obstruction.

      By default the Raycaster doesn't care about what's in front of the object being tested or the obeject handling the event.

      To occlude the cube we can add an onClick event on the sphere and tell it to stop propagating the event.

    # Cursor:

      To transform the pointer into finger cursor to show the user that this object or area is clickable.

      So we need to know when the mouse enters the cube and when it leaves the cube.
      Add onPoinerEnter and onPointerLeave attributes to the cube mesh.

    # Events on complex objects:

      <primitive
        object={hamburgerModel.scene}
        scale={0.26}
        position-y={0.6}
        onClick={(event) => {
          console.log("click", event.object.name);
          event.stopPropagation();
        }}
      />

      to listen to events on the whole group we can use : event.eventObject
      to listern to events on the object we clicked on we can use : event.object

    # Performance:

      listening to pointer events is quite a taxing task for the CPU.
      Specially on mobile devices.

      Avoid events that need to be tested on each frame.
        1. onPointerOver
        2. onPointerEnter
        3. onPointerOut
        4. onPointerLeave
        6. onPointerMove

      Minimise the number of objects that lsitens to the events and avoid testing on complex geometries.

      we can use "meshBounds", meshBounds will create a theoretical sphere around the mesh (called bounding sphere) and pointer events will be tested on the sphere instead of testing the geometry of the mesh.

      meshBounds only works on single mesh.
