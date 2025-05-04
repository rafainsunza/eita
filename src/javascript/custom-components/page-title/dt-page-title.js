import html from './dt-page-title.html';
import style from './dt-page-title.component.sass';


const template = document.createElement('template');

template.innerHTML = `
    <style>
        ${style}
    </style>
    ${html}
`;

class DtPageTitle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));


    }

    static get observedAttributes() {
        return ['title', 'subtitle']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateContent();
    }

    connectedCallback() {
        this.updateContent();
    }

    updateContent() {
        const title = this.getAttribute('title');
        const subtitle = this.getAttribute('subtitle');

        const titleElement = this.shadowRoot.getElementById('title');
        const subtitleElement = this.shadowRoot.getElementById('subtitle');

        titleElement.textContent = title

        if (subtitle === '') {
            subtitleElement.classList.add('hidden')
        }
        else {
            subtitleElement.innerHTML = subtitle
        }

    }
}

customElements.define('dt-page-title', DtPageTitle);

export { DtPageTitle }

