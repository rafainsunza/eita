import html from './dt-lessons.html';
import style from './dt-lessons.component.sass';
import lessonsData from './lessons.json'

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

        const lessonsWrapper = this.shadowRoot.querySelector('.lessons-wrapper');

        const lessonsContainer = document.createElement('div');
        lessonsContainer.classList.add('lessons-container');

        const lessonsContent = `
            <dt-page-title title="${lessonsData.title}" subtitle=""></dt-page-title>

            <div class="lessons-card individual">
                <div class="lessons-card-text-container">
                    <h3 class="lessons-card-title span-full-column-width">${lessonsData.individual.title}</h3>  
                    
                    <p class="lessons-card-text">${lessonsData.individual.text}</p>
                </div>

                <div class="lessons-card-image-container"></div>
            </div>

            <div class="lessons-card group">
                <div class="lessons-card-text-container">
                    <h3 class="lessons-card-title span-full-column-width">${lessonsData.group.title}</h3>

                    <p class="lessons-card-text">${lessonsData.group.text}</p>
                  
                </div>

                <div class="lessons-card-image-container"></div>
            </div>
        `;

        lessonsContainer.innerHTML = lessonsContent;
        lessonsWrapper.appendChild(lessonsContainer)

        const imgContainers = Array.from(this.shadowRoot.querySelectorAll('.lessons-card-image-container'));
        fetchImage('./assets/images/individual-lesson-2.jpg', imgContainers[0], 'lessons-card-image');
        fetchImage('./assets/images/group-lesson-3.jpg', imgContainers[1], 'lessons-card-image');

    }
}
customElements.define('dt-lessons', DtLessons);

export { DtLessons }
