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
        this.navItems = this.shadowRoot.querySelector('.nav-items');
        this.navLinks = this.shadowRoot.querySelectorAll('.nav-link');
        this.openButton = this.shadowRoot.querySelector('.open-button');
        this.closeButton = this.shadowRoot.querySelector('.close-button');

        fetchImage('../../../assets/icons/eita_logo.png', this.nav.querySelector('.home-link'), 'logo')
        fetchImage('../../../assets/icons/favicon.png', this.navItems.querySelector('.logo-button-container'), 'logo-small');

        this.openButton.addEventListener('click', () => { this.openNav() });
        this.closeButton.addEventListener('click', () => { this.closeNav() });
        this.navLinks.forEach((link) => { link.addEventListener('click', (e) => this.toggleSubmenu(e)) })
    }

    toggleSubmenu(e) {
        const nextSibling = e.target.nextElementSibling;
        if (nextSibling === null) { return }

        const submenus = this.shadowRoot.querySelectorAll('.submenu');
        const isOpen = nextSibling.classList.contains('open')

        submenus.forEach((menu) => menu.classList.remove('open'));

        if (!isOpen) {
            nextSibling.classList.add('open');
        }

    }

    openNav() {
        this.navItems.classList.add('open');
    }

    closeNav() {
        const submenus = this.shadowRoot.querySelectorAll('.submenu');

        submenus.forEach((menu) => menu.classList.remove('open'));
        this.navItems.classList.remove('open');
    }

}
customElements.define('dt-navbar', DtNavbar);

export { DtNavbar }

