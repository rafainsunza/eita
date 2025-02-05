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
        this.submenus = this.shadowRoot.querySelectorAll('.submenu');

        fetchImage('../../../assets/icons/eita_logo.png', this.nav.querySelector('.home-link'), 'logo')
        fetchImage('../../../assets/icons/favicon.png', this.navItems.querySelector('.logo-button-container'), 'logo-small');

        this.openButton.addEventListener('click', () => { this.openNav() });
        this.closeButton.addEventListener('click', () => { this.closeNav() });
        this.navLinks.forEach((link) => {
            link.addEventListener('click', (e) => {
                this.handleNavClick(e);
                this.toggleSubmenu(e);
            })
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768) {
                const dropdownButtons = this.shadowRoot.querySelectorAll('.dropdown-button');
                const submenus = this.shadowRoot.querySelectorAll('.submenu');

                dropdownButtons.forEach((button) => button.classList.remove('open'));
                submenus.forEach((menu) => menu.classList.remove('open'));
                this.navItems.classList.remove('open');
            }
        });
        this.submenus.forEach((menu) => {
            menu.addEventListener('mouseleave', () => {
                if (window.innerWidth >= 768) {
                    const dropdownButtons = this.shadowRoot.querySelectorAll('.dropdown-button');

                    dropdownButtons.forEach((button) => button.classList.remove('open'));
                    menu.classList.remove('open');
                }
            });
        });
    }

    handleNavClick(e) {
        const clickedNav = e.target;
        if (clickedNav.tagName === 'A') {
            const destination = clickedNav.classList[1];
            const page = document.createElement(`dt-${destination}`)
            const main = document.querySelector('main');


            const dropdownButtons = this.shadowRoot.querySelectorAll('.dropdown-button');
            const submenus = this.shadowRoot.querySelectorAll('.submenu');
            dropdownButtons.forEach((button) => button.classList.remove('open'));
            submenus.forEach((menu) => menu.classList.remove('open'));
            this.navItems.classList.remove('open');

            main.innerHTML = '';
            main.appendChild(page);
        }
    }

    toggleSubmenu(e) {
        const dropdownButton = e.target.closest('button');
        if (dropdownButton === null) { return }
        const nextSibling = e.target.closest('button').nextElementSibling;
        if (nextSibling === null) { return }

        const dropdownButtons = this.shadowRoot.querySelectorAll('.dropdown-button');
        const submenus = this.shadowRoot.querySelectorAll('.submenu');
        const isOpen = nextSibling.classList.contains('open');

        dropdownButtons.forEach((button) => button.classList.remove('open'));
        submenus.forEach((menu) => menu.classList.remove('open'));

        if (!isOpen) {
            nextSibling.classList.add('open');
            dropdownButton.classList.add('open')
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

