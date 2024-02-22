const imgArray = document.querySelectorAll('img');

imgArray.forEach(img => {
  if (img.parentElement.classList.contains('image-container')) {
    img.addEventListener('click', addRedBorder);
  } else {
    img.addEventListener('click', addBlueBorder);
  }
})

function addRedBorder(event) {
  const img = event.currentTarget;
  img.style.border = "5px solid red";
  // after a selection is made we can make it so other items can't be clicked
  imgArray.forEach(otherImg => {
    if (otherImg.parentElement.classList.contains('image-container') && otherImg !== img) {
      otherImg.removeEventListener('click', addRedBorder)
      otherImg.style.cursor = "auto"
    }
  })

}

function addBlueBorder(event) {
  const img = event.currentTarget;
  img.style.border = "5px solid blue";
}