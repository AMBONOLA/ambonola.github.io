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
}

function addBlueBorder(event) {
  const img = event.currentTarget;
  img.style.border = "5px solid blue";
}