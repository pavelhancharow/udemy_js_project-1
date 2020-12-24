const images = () => {
  const imgPopup = document.createElement('div'),
    workSection = document.querySelector('.works'),
    bigImage = document.createElement('img');

  workSection.append(imgPopup);
  imgPopup.style.cssText = `justify-content: center; align-items: center; display: none;`;
  imgPopup.append(bigImage);

  workSection.addEventListener('click', (e) => {
    e.preventDefault();

    let target = e.target;

    imgPopup.classList.add('popup');

    if (target && target.classList.contains('preview')) {
      imgPopup.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      const path = target.parentNode.getAttribute('href');
      bigImage.setAttribute('src', path);
      bigImage.style.cssText = `display: flex; max-width: 80%; height: auto;`;
    }

    if (target && target.matches('div.popup')) {
      imgPopup.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
};

export default images;