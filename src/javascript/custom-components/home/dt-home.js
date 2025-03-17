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

        const iconContainers = this.shadowRoot.querySelectorAll('.card-icon-container');
        // const gallery = this.shadowRoot.querySelector('.gallery');
        // const galleryContainers = this.shadowRoot.querySelectorAll('.gallery-image-container');
        const introImageContainers = this.shadowRoot.querySelectorAll('.intro-image-container');
        const introImages = [
            '../../../assets/images/individual-lesson-6.jpg',
            '../../../assets/images/interior-2.jpg',
            '../../../assets/images/lesson-ball.jpg',
            '../../../assets/images/interior-3.jpg',

        ];
        // const buttonLeft = this.shadowRoot.querySelector('.navigate-image-button.previous');
        // const buttonRight = this.shadowRoot.querySelector('.navigate-image-button.next');
        const backToTopButton = this.shadowRoot.querySelector('.back-to-top-btn');

        // buttonLeft.classList.add('hidden');

        introImages.forEach((image, index) => {
            fetchImage(image, introImageContainers[index], 'intro-image');
        });

        fetchImage('../../../assets/images/interior-1.jpg', this.shadowRoot.querySelector('.cover-image-container'), 'cover-image');
        // fetchImage('../../../assets/icons/gd-icon.png', iconContainers[1], 'card-icon');
        // fetchImage('../../../assets/icons/favicon.png', iconContainers[2], 'card-icon');

        backToTopButton.addEventListener('click', (e) => { this.scrollToTop(e) });
        // buttonLeft.addEventListener('click', (e) => { this.scrollImages(e, buttonLeft, buttonRight, gallery, galleryContainers) });
        // buttonRight.addEventListener('click', (e) => { this.scrollImages(e, buttonLeft, buttonRight, gallery, galleryContainers) });
        // gallery.addEventListener('scroll', (e) => { this.positionNavigationButtons(e, galleryContainers) });
        // window.addEventListener('resize', (e) => this.positionNavigationButtons(e, galleryContainers));
        document.addEventListener("DOMContentLoaded", () => { this.animateOnScroll() });
    }

    scrollToTop(e) {
        const buttonClicked = e.target.closest('button');
        const topElement = this.shadowRoot.querySelector('.cover-image-container');

        buttonClicked ? topElement.scrollIntoView({ behavior: 'smooth' }) : null;

    }

    scrollImages(e, buttonLeft, buttonRight, gallery, galleryContainers) {
        const clickedButton = e.target.closest('button');
        const scrollAmount = gallery.scrollWidth / galleryContainers.length;
        let scrollPosition;


        clickedButton === buttonRight ?
            scrollPosition = gallery.scrollLeft + scrollAmount :
            scrollPosition = gallery.scrollLeft - scrollAmount;

        gallery.scrollTo({ left: scrollPosition, behavior: 'smooth' });
    }

    positionNavigationButtons(e, galleryContainers) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const visibleImage = entry.target;

                    const gallery = this.shadowRoot.querySelector('.gallery');
                    const galleryWidth = gallery.scrollWidth;
                    const galleryContainers = Array.from(this.shadowRoot.querySelectorAll('.gallery-image-container'));

                    const imageCount = galleryContainers.length
                    const visibleImageIndex = galleryContainers.indexOf(visibleImage);
                    const imageWidth = Math.ceil(galleryWidth / imageCount);
                    const visibleImagePosition = imageWidth * visibleImageIndex;

                    const buttonLeft = this.shadowRoot.querySelector('.navigate-image-button.previous');
                    const buttonRight = this.shadowRoot.querySelector('.navigate-image-button.next');

                    let buttonPositionLeft;
                    let buttonPositionRight;

                    if (window.innerWidth >= 1160) {
                        buttonPositionLeft = `${visibleImagePosition + 50}px`;
                        buttonPositionRight = `${visibleImagePosition + imageWidth - 95}px`
                    } else {

                        buttonPositionLeft = `${visibleImagePosition + 15}px`;
                        buttonPositionRight = `${visibleImagePosition + imageWidth - 45}px`;
                    }


                    buttonLeft.style.left = buttonPositionLeft;
                    buttonRight.style.left = buttonPositionRight;

                    visibleImageIndex === 0 ? buttonLeft.classList.add('hidden') : buttonLeft.classList.remove('hidden');
                    visibleImageIndex === imageCount - 1 ? buttonRight.classList.add('hidden') : buttonRight.classList.remove('hidden');
                }
            });
        }, { threshold: 0.2 });

        galleryContainers.forEach(container => observer.observe(container));

    }

    animateOnScroll() {
        // const cards = this.shadowRoot.querySelectorAll('.card');
        // const sectionTexts = this.shadowRoot.querySelectorAll('.section-text');
        // const bottomContainer = this.shadowRoot.querySelector('.card-container-bottom');
        // const bottomContainerChildren = Array.from(bottomContainer.children)
        // const gallery = this.shadowRoot.querySelector('.gallery');

        const introTexts = this.shadowRoot.querySelectorAll('.intro-text');
        const introImages = this.shadowRoot.querySelectorAll('.intro-image-container');
        const backToTopButton = this.shadowRoot.querySelector('.back-to-top-btn');
        const topElement = introTexts[0];
        const cover = this.shadowRoot.querySelector('.cover-image-container');

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');

                    if (entry.target === cover) {
                        backToTopButton.classList.add('hidden');
                    }

                    if (entry.target === topElement) {
                        backToTopButton.classList.remove('hidden');
                    }
                }
            });
        }, { threshold: 0.2 });

        observer.observe(cover);
        introTexts.forEach(text => observer.observe(text));
        introImages.forEach(image => observer.observe(image));
        // sectionTexts.forEach(section => observer.observe(section));
        // cards.forEach(card => observer.observe(card));
        // bottomContainerChildren.forEach(child => observer.observe(child));
        // observer.observe(gallery);
    }

}
customElements.define('dt-home', DtHome);

export { DtHome }
