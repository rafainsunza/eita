import html from './dt-lessons.html';
import style from './dt-lessons.component.sass';

import { fetchImage, scrollToSection } from '../../utils';

const template = document.createElement('template');

template.innerHTML = `
    <style>
        ${style}
    </style>
    ${html}
`;

class DtLessons extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.backToTopBtn = this.shadowRoot.querySelector('.back-to-top-btn');

        document.addEventListener('submenu-click', (e) => this.handleScrollClick(e));
        this.backToTopBtn.addEventListener('click', (e) => this.handleScrollClick(e));
    }

    handleScrollClick(e) {
        const navbar = document.querySelector('dt-navbar');
        const clickedSubmenuIsLessons = e.detail.clickedSubmenu === navbar.shadowRoot.querySelector('.submenu.lessons')
        const backToTopClicked = e.target.closest('button') === this.backToTopBtn;

        if (!clickedSubmenuIsLessons && !backToTopClicked) { return }

        navbar.closeNav()
        scrollToSection(
            this.shadowRoot.querySelector('.all'),
            this.shadowRoot.querySelector('.' + e.detail.scrollTargetClass),
            backToTopClicked
        )
    }

}
customElements.define('dt-lessons', DtLessons);

export { DtLessons }
