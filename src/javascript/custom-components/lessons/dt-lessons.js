import html from './dt-lessons.html';
import style from './dt-lessons.component.sass';

import { fetchImage } from '../../utils';

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



    }
}
customElements.define('dt-lessons', DtLessons);

export { DtLessons }
