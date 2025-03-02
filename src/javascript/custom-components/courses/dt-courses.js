import html from './dt-courses.html';
import style from './dt-courses.component.sass';

import { fetchImage, scrollToSection } from '../../utils';

const template = document.createElement('template');

template.innerHTML = `
    <style>
        ${style}
    </style>
    ${html}
`;

class DtCourses extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.backToTopBtn = this.shadowRoot.querySelector('.back-to-top-btn');
        const imageContainers = this.shadowRoot.querySelectorAll('.section-image-container');
        fetchImage('../../../assets/images/individual-lesson-3.jpg', imageContainers[0], 'section-image');
        fetchImage('../../../assets/images/individual-lesson-4.jpg', imageContainers[1], 'section-image');
        fetchImage('../../../assets/images/individual-lesson-1.jpg', imageContainers[2], 'section-image');

        document.addEventListener('submenu-click', (e) => this.handleScrollClick(e));
        this.backToTopBtn.addEventListener('click', (e) => this.handleScrollClick(e));
    }

    handleScrollClick(e) {
        const navbar = document.querySelector('dt-navbar');
        const clickedSubmenuIsCourses = e.detail.clickedSubmenu === navbar.shadowRoot.querySelector('.submenu.courses')
        const backToTopClicked = e.target.closest('button') === this.backToTopBtn;

        if (!clickedSubmenuIsCourses && !backToTopClicked) { return }

        navbar.closeNav()
        scrollToSection(
            this.shadowRoot.querySelector('.all'),
            this.shadowRoot.querySelector('.' + e.detail.scrollTargetClass),
            backToTopClicked
        )
    }

}
customElements.define('dt-courses', DtCourses);

export { DtCourses }
