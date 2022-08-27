
let card = document.querySelector('.card')

/* Get the height and width of the element */
const height = card.clientHeight
const width = card.clientWidth


card.addEventListener('mousemove', handleMove)


function handleMove(e) {
    /*
      * Get position of mouse cursor
      * With respect to the element
      * On mouseover
      */
    /* Store the x position */
    const xVal = e.offsetX
    /* Store the y position */
    const yVal = e.offsetY

      
    /* 
      Calculate rotation valuee along the Y-axis/X-axis 
      Here the multiplier 20 is to Control the rotation

     The further away from the center, the greater the rotation
    */
    const yRotation = 20 * ((xVal - width / 2) / width)

    const xRotation = -20 * ((yVal - height / 2) / height)

    /* Generate string for CSS transform property */
    const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'

    /* Apply the calculated transformation */
    card.style.transform = string
}

card.addEventListener('mouseout', function () {
    card.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
})

card.addEventListener('mousedown', function () {
    card.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
})

card.addEventListener('mouseup', function () {
    card.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
})