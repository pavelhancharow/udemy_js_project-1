const resetCalc = () => {
  const windowForm = document.querySelectorAll('.balcon_icons_img'),
    windowWidth = document.querySelectorAll('#width'),
    windowHeight = document.querySelectorAll('#height'),
    windowType = document.querySelectorAll('#view_type'),
    windowProfile = document.querySelectorAll('.checkbox');

  function resetModal(elem) {
    elem.forEach((item, i) => {
      switch (item.nodeName) {
        case 'SPAN':
          if (i === 0) {
            item.classList.add('do_image_more');
          } else {
            item.classList.remove('do_image_more');
          }
          break;
        case 'INPUT':
          if (item.getAttribute('type') === 'checkbox') {
            elem.forEach(box => {
              box.checked = false;
            });
          } else {
            item.value = '';
          }
          break;
        case 'SELECT':
          item.value = 'tree';
          break;
      }

    });

  }

  resetModal(windowForm);
  resetModal(windowWidth);
  resetModal(windowHeight);
  resetModal(windowType);
  resetModal(windowProfile);
};

export default resetCalc;