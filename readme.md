## Mouse Events

    # Listening to click events :

    Handling mouse events in native three.js is a bit tricky, we need to use a Raycaster(cast rays). And to have the array of objects that the rays intersect and put than in the array.
    But r3f have made the process of mouse events or pointer events much easier and we won't have to implement a Raycaster.

    All we need to do is to add an onClick attribute to an object in our scene(like a mesh) and provide  it with a function.
