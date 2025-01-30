import html from './dt-navbar.html';
import style from './dt-navbar.component.sass';

import { fetchImage } from '../../utils';

const template = document.createElement('template');

template.innerHTML = `
    <style>
        ${style}
    </style>
    ${html}
`;

class DtNavbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.nav = this.shadowRoot.querySelector('.nav');
        this.openButton = this.shadowRoot.querySelector('.open-button');
        this.closeButton = this.shadowRoot.querySelector('.close-button');

        fetchImage('../../../assets/icons/eita_logo.png', this.nav.querySelector('.home-link'), 'logo')

        this.openButton.addEventListener('click', () => { this.openNav() });
        this.closeButton.addEventListener('click', () => { this.closeNav() });
    }

    openNav() {
        this.nav.classList.add('open');
    }

    closeNav() {
        this.nav.classList.remove('open');
    }

}
customElements.define('dt-navbar', DtNavbar);

export { DtNavbar }

