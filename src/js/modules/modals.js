import resetCalc from "./resetCalc";
import clearState from "./clearState";

const modals = (state) => {
  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll('[data-modal]'),
      scroll = calcScroll();

    trigger.forEach(item => item.addEventListener('click', (e) => {
      if (e.target) {
        e.preventDefault();
      }

      windows.forEach(item => item.style.display = 'none');

      modal.style.display = "block";
      document.body.style.cssText = `overflow: hidden; margin-right: ${scroll}px`;

      if (item.classList.contains('popup_calc_btn')) {
        state.window = 1;
        state.type = 'tree';
      }

      if (modal.classList.contains('popup_calc')) {
        const popupBtn = document.querySelectorAll('.popup_calc_button, .popup_calc_profile_button');
        popupBtn.forEach(item => item.setAttribute('disabled', true));
      }

    }));

    close.addEventListener('click', () => {
      windows.forEach(item => {
        item.style.display = 'none';
      });

      modal.style.display = "none";
      document.body.style.cssText = `overflow: auto; margin-right: 0px`;

      resetCalc();
      clearState(state);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal && closeClickOverlay) {
        windows.forEach(item => item.style.display = 'none');
        modal.style.display = "none";
        document.body.style.cssText = `overflow: auto; margin-right: 0px`;
        resetCalc();
        clearState(state);
      }
    });
  }

  function showModal(selector, timer) {
    setTimeout(() => {
      document.querySelector(selector).style.display = "block";
      document.body.style.overflow = "hidden";
    }, timer);
  }

  function calcScroll() {
    let div = document.createElement('div');
    div.style.cssText = `width: 50px; height: 50px; overflow-y: scroll; visibility: hidden`;
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;
  }

  bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close');
  bindModal('.phone_link', '.popup', '.popup .popup_close');
  bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
  bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false);
  bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false);
  showModal('.popup', 60000);
};

export default modals;