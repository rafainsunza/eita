import html from './dt-navbar.html';
import style from './dt-navbar.component.sass';
import navbarData from './navbar.json';

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

        const navbarContainer = this.shadowRoot.querySelector('.navbar-container');
        const navbarLogoContainer = this.shadowRoot.querySelector('.navbar-logo-container');
        fetchImage('./assets/icons/eita_logo.png', navbarLogoContainer, 'navbar-logo');

        // Create and append navbar toggle buttons
        const navbarToggleContainer = this.shadowRoot.querySelector('.navbar-toggle-container');
        const openIcon = '<svg class="navbar-toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>';
        const closeIcon = '<svg class="navbar-toggle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>';

        const openButton = document.createElement('button');
        const closeButton = document.createElement('button');

        openButton.classList.add('navbar-toggle-button');
        closeButton.classList.add('navbar-toggle-button', 'hidden');

        openButton.innerHTML = openIcon;
        closeButton.innerHTML = closeIcon;
        navbarToggleContainer.appendChild(openButton);
        navbarToggleContainer.appendChild(closeButton);

        // Create and append navbar items
        const componentNames = ['home', 'about', 'lessons', 'courses', 'schedule', 'contact'];
        const nav = document.createElement('nav');
        nav.classList.add('navbar-nav')
        const navContent = `
            <ul class="navbar-list">
                ${Object.values(navbarData.link_texts).map((text, index) => `
                        <li class="navbar-item">
                            <button class="navbar-button ${componentNames[index]}">${text}</button>
                        </li>
                    `).join('')}
            </ul>

        `;
        nav.innerHTML = navContent;
        navbarContainer.appendChild(nav);

        const navbarButtons = Array.from(this.shadowRoot.querySelectorAll('.navbar-button'));

        navbarButtons.map(button => button.addEventListener('click', (e) => this.appendCustomElement(e, nav, closeButton, openButton)))
        openButton.addEventListener('click', (e) => this.toggleNavMenu(e, openButton, closeButton, nav));
        closeButton.addEventListener('click', (e) => this.toggleNavMenu(e, openButton, closeButton, nav));
        navbarLogoContainer.addEventListener('click', (e) => this.appendCustomElement(e, nav, closeButton, openButton));
        window.addEventListener('resize', () => this.handleResize(openButton, closeButton, nav));
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize(openButton, closeButton, nav) {
        const navIsOpen = nav.classList.contains('open');

        if (navIsOpen && window.innerWidth >= 768) {
            nav.classList.remove('open');
            openButton.classList.remove('hidden');
            closeButton.classList.add('hidden');
        }
    }

    toggleNavMenu(e, openButton, closeButton, nav) {
        const button = e.target.closest('button');

        if (button === openButton) {
            openButton.classList.add('hidden');
            closeButton.classList.remove('hidden');
            nav.classList.add('open');
        }

        if (button === closeButton) {
            openButton.classList.remove('hidden');
            closeButton.classList.add('hidden');
            nav.classList.remove('open');
        }
    }

    appendCustomElement(e, nav, closeButton, openButton) {
        const button = e.target.closest('button');
        const componentName = button.classList[1];
        const element = document.createElement(`dt-${componentName}`);
        const main = document.querySelector('main');
        const children = Array.from(main.children);

        children.map(child => main.removeChild(child));
        main.appendChild(element);

        nav.classList.remove('open');
        closeButton.classList.add('hidden');
        openButton.classList.remove('hidden');
    }

}
customElements.define('dt-navbar', DtNavbar);

export { DtNavbar }

