import html from './dt-about.html';
import style from './dt-about.component.sass';

import { fetchImage, scrollToSection } from '../../utils';

const template = document.createElement('template');

template.innerHTML = `
    <style>
        ${style}
    </style>
    ${html}
`;

class DtAbout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.backToTopBtn = this.shadowRoot.querySelector('.back-to-top-btn');
        const imgContainers = this.shadowRoot.querySelectorAll('.professor-card-img-container');
        const portraits = [
            './assets/images/portrait-georgia.jpg',
            './assets/images/portrait-reinaldo.jpg',
            './assets/images/portrait-merran.jpg',
            './assets/images/portrait-thomas.jpg'
        ];

        portraits.forEach((portrait, index) => {
            fetchImage(portrait, imgContainers[index], 'professor-card-img');
        });
        fetchImage('./assets/images/fm-alexander.jpg', this.shadowRoot.querySelector('.fm-alexander-img-container'), 'fm-alexander-img')

        document.addEventListener('submenu-click', (e) => this.handleScrollClick(e));
        this.backToTopBtn.addEventListener('click', (e) => this.handleScrollClick(e));
    }

    handleScrollClick(e) {
        const navbar = document.querySelector('dt-navbar');
        const clickedSubmenuIsAbout = e.detail.clickedSubmenu === navbar.shadowRoot.querySelector('.submenu.about')
        const backToTopClicked = e.target.closest('button') === this.backToTopBtn;

        if (!clickedSubmenuIsAbout && !backToTopClicked) { return }

        navbar.closeNav();
        scrollToSection(
            this.shadowRoot.querySelector('.all'),
            this.shadowRoot.querySelector('.' + e.detail.scrollTargetClass),
            backToTopClicked
        );
    }

}
customElements.define('dt-about', DtAbout);

export { DtAbout }
