'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // modal

    function openModal(modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.classList.add('active');

    }

    function closeModal (modalSelector) {
        const modal = document.querySelector(modalSelector);
        modal.classList.remove('active');
    }

    function modal (modalSelector, triggerSelector, closeSelector) {
        const modal = document.querySelector(modalSelector),
              modalTrigger = document.querySelectorAll(triggerSelector);

        modalTrigger.forEach(btn => {
            btn.addEventListener('click', () => openModal(modalSelector));
        });

        modal.addEventListener('click', (e) => {
            if(e.target === modal || e.target.getAttribute(closeSelector) == '') {
                closeModal(modalSelector);
            }
        });

        document.addEventListener('keydown', (e) => {
            if(e.code === 'Escape') {
                closeModal(modalSelector);
            }
        });
    }

    modal('.modal', '[data-modal]', 'data-close');

    // forms

    const form = document.querySelectorAll('form');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро с тобой свяжутся!',
        failure: 'Что-то пошло не так...'
    };

    form.forEach(item => {
        postData(item, '.modal');
    });


    function postData(form, modalSelector) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('span');
            statusMessage.classList.add('tiktok-loader');
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                margin-top: 30px;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function(value, key) {
                object[key] = value;
            });

            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object) // конвертация в JSON
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success, modalSelector);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure, modalSelector);
                statusMessage.remove();
            }).finally(() => {
                form.reset();
            });

            
        });
    }

    function showThanksModal(message, modalSelector) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        openModal(modalSelector);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="title title_white">${message}</div>
            </div>
        `;
        document.querySelector(modalSelector).append(thanksModal);


        const thanksPromise = new Promise(resolve => {
            setTimeout(() => {
                closeModal(modalSelector);
                resolve();
            }, 3000);
        }); 


        thanksPromise.then(() => {
            setTimeout(() => {
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
            }, 400);
        });  
    }

    // accordion
    
    const accordions = document.querySelectorAll('.accordion');

    accordions.forEach(el => {
        el.addEventListener('click', (e) => {
            const self = e.currentTarget;
            const control = self.querySelector('.accordion__control');
            const content = self.querySelector('.accordion__content');
            const arrow = self.querySelector(".arrow-svg");

            self.classList.toggle('open');

            if (self.classList.contains('open')) {
                control.setAttribute('aria-expanded', true);
                content.setAttribute('aria-hidden', false);
                content.style.maxHeight = content.scrollHeight + 'px';
                arrow.style.fill = '#8FE0DE';
            } else {
                control.setAttribute('aria-expanded', false);
                content.setAttribute('aria-hidden', true);
                content.style.maxHeight = null;
                arrow.style.fill = '#CE9AA4';
            }
        });
    });

    // Создать наблюдателя
    const observer = new IntersectionObserver(entries => {
        // перебор записей
        entries.forEach(entry => {
            // если элемент появился
            if (entry.isIntersecting) {
            // добавить ему CSS-класс
            entry.target.classList.add('scroll-item-animation');
            }
        });
    });
    
    // Сообщить наблюдателю, какие элементы следует отслеживать
    const bubleAnimation = document.querySelectorAll('.scroll-item');
    bubleAnimation.forEach(item => {
        observer.observe(item);
    });

});