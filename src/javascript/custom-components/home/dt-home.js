import html from './dt-home.html';
import style from './dt-home.component.sass';
import homeData from './home.json';

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

        const randomizedImages = homeData.gallery.images.sort(() => 0.5 - Math.random());
        const arrowRightIcon = '<svg class="image-gallery-navigation-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 151.2c-4.2-4.6-10.1-7.2-16.4-7.2C266 144 256 154 256 166.3l0 41.7-96 0c-17.7 0-32 14.3-32 32l0 32c0 17.7 14.3 32 32 32l96 0 0 41.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.4-7.2l84-91c3.5-3.8 5.4-8.7 5.4-13.9s-1.9-10.1-5.4-13.9l-84-91z"/></svg>';
        const arrowLeftIcon = '<svg class="image-gallery-navigation-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3l0-57.7 96 0c17.7 0 32-14.3 32-32l0-32c0-17.7-14.3-32-32-32l-96 0 0-57.7c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z"/></svg>';
        const homeWrapper = this.shadowRoot.querySelector('.home-wrapper');

        customElements.whenDefined('dt-page-title').then(() => {
            const pageTitle = this.shadowRoot.querySelector('dt-page-title');
            const titleContainer = pageTitle.shadowRoot.querySelector('.title-container');
            titleContainer.classList.add('home');

        });

        const homeContainer = document.createElement('div');
        homeContainer.classList.add('home-container');

        const homeContent = `
            <div class="home-top-image-container"">
                <dt-page-title title="${homeData.title}" subtitle="${homeData.subtitle}"></dt-page-title>
            </div>

            <div class="home-card-container">
                ${Object.values(homeData.cards).map(card => `
                        <div class="home-card">
                            <h3 class="home-card-title">${card.title}</h3>
                            <p class="home-card-text">${card.text}</p>
                        </div>
                    `).join('')}
            </div>

            <div class="image-gallery">
                    <h3 class="image-gallery-title">${homeData.gallery.title}</h3>

                    <button class="image-gallery-navigation-button previous hidden">${arrowLeftIcon}</button>
                    <button class="image-gallery-navigation-button next">${arrowRightIcon}</button>

                    <div class="image-gallery-slider">
                        ${Object.values(randomizedImages).map(image => `<div class="image-gallery-slide"></div>`).join('')}
                    </div>

                    <div class="image-gallery-thumbnails">
                        ${Object.values(randomizedImages.map(image => `<button class="image-gallery-thumbnail-button"></button>`)).join('')}
                    </div>
            </div>
        `;

        homeContainer.innerHTML = homeContent;
        homeWrapper.appendChild(homeContainer);

        const imageGallerySlides = Array.from(this.shadowRoot.querySelectorAll('.image-gallery-slide'));
        const imageGalleryThumbnailButtons = Array.from(this.shadowRoot.querySelectorAll('.image-gallery-thumbnail-button'));
        const imageGalleryNavigationButtons = Array.from(this.shadowRoot.querySelectorAll('.image-gallery-navigation-button'));

        fetchImage('./assets/images/interior-1.jpg', this.shadowRoot.querySelector('.home-top-image-container'), 'home-top-image');

        Promise.all(randomizedImages.map((image, index) => {
            return fetchImage(image, imageGalleryThumbnailButtons[index], 'image-gallery-thumbnail-button-image')
        }))
            .then(() => Promise.all(randomizedImages.map((image, index) => {
                return fetchImage(image, imageGallerySlides[index], 'image-gallery-image')
            })))
            .then(() => {
                this.initIntersectionObserver(imageGallerySlides, imageGalleryNavigationButtons);
            });

        imageGalleryThumbnailButtons[0].classList.add('indicating');
        imageGalleryThumbnailButtons.map(button => button.addEventListener('click', (e) => this.handleThumbnailButtonClick(e, imageGalleryThumbnailButtons, imageGallerySlides)));
        imageGalleryNavigationButtons.map(button => button.addEventListener('click', (e) => this.handleImageGalleryNavigation(e, imageGallerySlides, imageGalleryThumbnailButtons)));
    }

    initIntersectionObserver(slides, prevNextButtons) {
        const observerOptions = {
            root: this.shadowRoot.querySelector('.image-gallery-slider'),
            threshold: 1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = slides.indexOf(entry.target);
                    const prevButton = prevNextButtons[0];
                    const nextButton = prevNextButtons[1];

                    console.log(index)

                    index > 0 || index < slides.length - 1 ? prevNextButtons.forEach(button => button.classList.remove('hidden')) : null;
                    index === 0 ? prevButton.classList.add('hidden') : null;
                    index === slides.length - 1 ? nextButton.classList.add('hidden') : null;
                }
            });
        }, observerOptions);

        slides.forEach(slide => observer.observe(slide));
    }

    handleImageGalleryNavigation(e, slides, buttons) {
        const clickedButton = e.target.closest('button');
        const nextButton = this.shadowRoot.querySelector('.image-gallery-navigation-button.next');
        const previousButton = this.shadowRoot.querySelector('.image-gallery-navigation-button.previous');

        let currentIndex;
        let targetIndex;

        slides.forEach((slide, index) => {
            const rect = slide.getBoundingClientRect();
            const isVisible = rect.left >= 0 && rect.right <= window.innerWidth;
            isVisible ? currentIndex = index : null;
        });

        if (clickedButton === nextButton) { targetIndex = currentIndex + 1; }

        if (clickedButton === previousButton) { targetIndex = currentIndex - 1; }

        if (targetIndex === slides.length || targetIndex === -1 || isNaN(targetIndex)) return

        buttons.forEach(button => button.classList.remove('indicating'));
        buttons[targetIndex].classList.add('indicating');

        slides[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    handleThumbnailButtonClick(e, buttons, slides) {
        const clickedButton = e.target.closest('button');
        const index = buttons.indexOf(clickedButton);
        slides[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        buttons.forEach(button => button.classList.remove('indicating'));
        clickedButton.classList.add('indicating');
    }


}
customElements.define('dt-home', DtHome);

export { DtHome }
