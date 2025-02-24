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

        this.dtNavBar = document.querySelector('dt-navbar');
        this.backToTopBtn = this.shadowRoot.querySelector('.back-to-top-btn');

        const submenuLinks = this.dtNavBar.shadowRoot.querySelector('.submenu.about').children;

        fetchImage('../../../assets/images/fm-alexander.jpg', this.shadowRoot.querySelector('.fm-alexander-img-container'), 'fm-alexander-img')

        Array.from(submenuLinks).forEach(link => {
            link.addEventListener('click', (e) => this.handleSubmenuClick(e));
        });
        this.backToTopBtn.addEventListener('click', () => { this.scrollToSection(this, this.dtNavBar) });

    }

    handleSubmenuClick(e) {
        const clickedLink = e.target.classList[1];
        let about = document.querySelector('dt-about');
        const main = document.body.querySelector('main');

        if (!about) {
            about = document.createElement('dt-about');
            main.innerHTML = '';
            main.appendChild(about)
        }


        requestAnimationFrame(() => {
            setTimeout(() => {
                if (about.shadowRoot) {
                    const sections = about.shadowRoot.querySelectorAll('.section-container');
                    const all = about.shadowRoot.querySelector('.all');
                    let scrollTarget;

                    about.classList.remove('invisible');

                    clickedLink === 'all' ? scrollTarget = all : scrollTarget = [...sections].find(section => section.classList.contains(clickedLink));

                    this.scrollToSection(about, scrollTarget);
                }
            }, 100);
        });

        this.dtNavBar.closeNav()
    }

    scrollToSection(about, scrollTarget) {
        const scrollAdjustment = 125;
        const offsetTop = scrollTarget.offsetTop - scrollAdjustment;
        about.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }

}
customElements.define('dt-about', DtAbout);

export { DtAbout }
