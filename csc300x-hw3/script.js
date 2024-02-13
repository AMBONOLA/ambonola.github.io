const smallerImages = document.querySelectorAll('.dish img');

function showLargerImage(image) {
  const largerImageContainer = image.closest('.dish').querySelector('.larger-image-container');
  if (largerImageContainer) {
    const largerImageContainers = document.querySelectorAll('.larger-image-container');
    largerImageContainers.forEach(container => container.style.display = 'none');
    largerImageContainer.style.display = 'block';
  }
}

smallerImages.forEach(img => {
  img.addEventListener('click', function () {
    console.log('This is being clicked');
    showLargerImage(img);
  });
});
