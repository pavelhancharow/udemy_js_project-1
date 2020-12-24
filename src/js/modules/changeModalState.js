import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
  const windowForm = document.querySelectorAll('.balcon_icons_img'),
    windowWidth = document.querySelectorAll('#width'),
    windowHeight = document.querySelectorAll('#height'),
    windowType = document.querySelectorAll('#view_type'),
    windowProfile = document.querySelectorAll('.checkbox');

  checkNumInputs('#width');
  checkNumInputs('#height');

  function bindActionToElements(event, elem, prop) {
    elem.forEach((item, i) => {
      item.addEventListener(event, () => {
        switch (item.nodeName) {
          case 'SPAN':
            state[prop] = i + 1;
            break;
          case 'INPUT':
            if (item.getAttribute('type') === 'checkbox') {
              state[prop] = (i === 0) ? 'Холодное' : 'Теплое';
              elem.forEach((box, j) => {
                box.checked = false;
                if (i == j) {
                  box.checked = true;
                }
              });
            } else {
              state[prop] = item.value;
            }
            break;
          case 'SELECT':
            state[prop] = item.value;
            break;
        }
        if (Object.keys(state).length === 4) {
          document.querySelector('.popup_calc_button').removeAttribute('disabled');
        }
        if (Object.keys(state).length === 5) {
          document.querySelector('.popup_calc_profile_button').removeAttribute('disabled');
        }
      });
    });
  }

  bindActionToElements('click', windowForm, 'window');
  bindActionToElements('input', windowWidth, 'width');
  bindActionToElements('input', windowHeight, 'height');
  bindActionToElements('change', windowType, 'type');
  bindActionToElements('change', windowProfile, 'profile');
};

export default changeModalState;