import html from './dt-home.html';
import style from './dt-home.component.sass';
import homeData from './home.json'

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

        const homeWrapper = this.shadowRoot.querySelector('.home-wrapper');

        const homeContainer = document.createElement('div');
        homeContainer.classList.add('home-container');

        const homeContent = `
            <dt-page-title title="${homeData.title}" subtitle="${homeData.subtitle}"></dt-page-title}

            <div class="home-card-container">
                ${Object.values(homeData.cards).map(card => `
                        <div class="home-card">
                            <h3 class="home-card-title">${card.title}</h3>
                            <p class="home-card-text">${card.text}</p>
                            <div class="home-card-image-container"></div>
                        </div>
                    `).join('')}
            </div>
        `;

        homeContainer.innerHTML = homeContent;
        homeWrapper.appendChild(homeContainer);


        const introImageContainers = this.shadowRoot.querySelectorAll('.home-card-image-container');
        const introImages = [
            './assets/images/interior-1.jpg',
            './assets/images/individual-lesson-6.jpg',
            './assets/images/interior-2.jpg',
            './assets/images/lesson-ball.jpg',

        ];
        const backToTopButton = this.shadowRoot.querySelector('.back-to-top-btn');

        introImages.forEach((image, index) => {
            fetchImage(image, introImageContainers[index], 'home-card-image');
        });

        // fetchImage('./assets/images/interior-1.jpg', this.shadowRoot.querySelector('.home-cover-image-container'), 'home-cover-image');

        // backToTopButton.addEventListener('click', (e) => { this.scrollToTop(e) });
        // document.addEventListener("DOMContentLoaded", () => { this.animateOnScroll() });
    }

    scrollToTop(e) {
        const buttonClicked = e.target.closest('button');
        const topElement = this.shadowRoot.querySelector('.cover-image-container');

        buttonClicked ? topElement.scrollIntoView({ behavior: 'smooth' }) : null;
    }


    // animateOnScroll() {
    //     const titles = [this.shadowRoot.querySelector('h1'), this.shadowRoot.querySelector('h2')]
    //     console.log(titles)
    //     const observer = new IntersectionObserver(entries => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 entry.target.classList.add('animate');
    //             }
    //         });
    //     }, { threshold: 0.2 });

    //     titles.forEach(title => observer.observe(title));
    // }

}
customElements.define('dt-home', DtHome);

export { DtHome }
