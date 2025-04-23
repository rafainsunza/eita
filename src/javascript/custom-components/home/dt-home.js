import html from './dt-home.html';
import style from './dt-home.component.sass';

import { fetchImage } from '../../utils';

const template = document.createElement('template');

template.innerHTML = `
    <style>
        ${style}
    </style>
    ${html}
`;

class DtHome extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const introImageContainers = this.shadowRoot.querySelectorAll('.intro-image-container');
        const introImages = [
            './assets/images/individual-lesson-6.jpg',
            './assets/images/interior-2.jpg',
            './assets/images/lesson-ball.jpg',
            './assets/images/interior-3.jpg',

        ];
        const backToTopButton = this.shadowRoot.querySelector('.back-to-top-btn');

        introImages.forEach((image, index) => {
            fetchImage(image, introImageContainers[index], 'intro-image');
        });

        fetchImage('./assets/images/interior-1.jpg', this.shadowRoot.querySelector('.cover-image-container'), 'cover-image');

        backToTopButton.addEventListener('click', (e) => { this.scrollToTop(e) });
        document.addEventListener("DOMContentLoaded", () => { this.animateOnScroll() });
    }

    scrollToTop(e) {
        const buttonClicked = e.target.closest('button');
        const topElement = this.shadowRoot.querySelector('.cover-image-container');

        buttonClicked ? topElement.scrollIntoView({ behavior: 'smooth' }) : null;
    }


    animateOnScroll() {
        const titles = [this.shadowRoot.querySelector('h1'), this.shadowRoot.querySelector('h2')]
        console.log(titles)
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.2 });

        titles.forEach(title => observer.observe(title));
    }

}
customElements.define('dt-home', DtHome);

export { DtHome }
