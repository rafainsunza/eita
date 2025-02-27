import html from './dt-about.html';
import style from './dt-about.component.sass';

import { fetchImage } from '../../utils';

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

        fetchImage('../../../assets/images/fm-alexander.jpg', this.shadowRoot.querySelector('.fm-alexander-img-container'), 'fm-alexander-img')

        document.addEventListener('submenu-click', (e) => this.scrollToSection(e));
        this.backToTopBtn.addEventListener('click', (e) => this.scrollToSection(e));
    }

    scrollToSection(e) {
        const main = document.querySelector('main');
        const children = Array.from(main.children);
        const navbar = document.querySelector('dt-navbar');
        const clickedSubmenuIsAbout = e.detail.clickedSubmenu === navbar.shadowRoot.querySelector('.submenu.about')
        const backToTopClicked = e.target.closest('button') === this.backToTopBtn;
        let scrollTarget;

        if (!clickedSubmenuIsAbout && !backToTopClicked) { return }

        children.forEach((child) => {
            if (child !== this) {
                main.removeChild(child);
            }
        });

        this.classList.remove('invisible');

        backToTopClicked ?
            scrollTarget = this.shadowRoot.querySelector('.all') :
            scrollTarget = this.shadowRoot.querySelector('.' + e.detail.scrollTargetClass);

        // Safari seems to not handle scrollIntoView and/or scroll behavior correctly,
        // so to ensure correct scrolling I set the scroll behavior in safari to auto
        const browserIsSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        let scrollBehavior;

        browserIsSafari ? scrollBehavior = 'auto' : scrollBehavior = 'smooth';

        scrollTarget.scrollIntoView({ behavior: scrollBehavior });
        navbar.closeNav();
    }


}
customElements.define('dt-about', DtAbout);

export { DtAbout }
