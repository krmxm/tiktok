document.addEventListener('DOMContentLoaded', () => {
    const accordions = document.querySelectorAll('.accordion');
    const arrow = document.getElementById("arrow-svg");

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

});