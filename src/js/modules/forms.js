import checkNumInputs from "./checkNumInputs";
import resetCalc from "./resetCalc";

const forms = (state) => {
  const form = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input');

  checkNumInputs('input[name="user_phone"]');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что то пошло не так...'
  };

  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;

    let res = await fetch(url, {
      method: 'POST',
      body: data
    });

    return await res.text();
  };

  const clearInputs = () => {
    inputs.forEach(item => item.value = '');
  };

  form.forEach(item => item.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = item.querySelectorAll('input');

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].value === '') {
        return;
      }
    }

    let statusMessage = document.createElement('div');
    statusMessage.classList.add('status');
    item.append(statusMessage);

    const formData = new FormData(item);
    if (item.getAttribute('data-calc') === 'end') {
      for (const key in state) {
        formData.append(key, state[key]);
      }
    }

    postData('assets/server.php', formData)
      .then(res => {
        console.log(res);
        statusMessage.textContent = message.success;
      })
      .catch(() => statusMessage.textContent = message.failure)
      .finally(() => {
        clearInputs();
        setTimeout(() => {
          if (item.closest('[data-modal]')) {
            item.closest('[data-modal]').style.display = "none";
            document.body.style.overflow = "";
            resetCalc();
            if (item.getAttribute('data-calc') === 'end') {
              for (const key in state) {
                delete (state[key]);
              }
            }
          }
          statusMessage.remove();
        }, 5000);
      });

  }));
};

export default forms;