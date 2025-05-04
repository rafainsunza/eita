import html from './dt-courses.html';
import style from './dt-courses.component.sass';
import coursesData from './courses.json';

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
        const sectionGroup = this.shadowRoot.querySelector('.section-group');

        // Append title
        const pageTitle = document.createElement('dt-page-title');
        pageTitle.setAttribute('title', 'Cursos');
        pageTitle.setAttribute('subtitle', '');
        sectionGroup.appendChild(pageTitle);

        // Dynamically create professor section html and append it
        const sectionContainerProfessor = document.createElement('div');
        sectionContainerProfessor.classList.add('section-container', 'professor');

        const sectionProfessorContent = `
            <h3 class="section-title">${coursesData.professors.title}</h3>
            <p class="section-description">${coursesData.professors.description}</p>
            <div class="section-content">
                <div class="slider-container">
                    <h4 class="slider-title">${coursesData.professors.cards_title}</h4>
                    
                    <div class="slider">
                      ${Object.values(coursesData.professors.cards).map(card => `
                            <div class="slider-card">
                                <p class="slider-card-text">${card.description}</p>     
                            </div>
                        `).join('')}
                    </div>

                    <div class="professor-slider-indicators">
                        ${Object.values(coursesData.professors.cards).map((card, index) => `
                            <button class="professor-slider-indicator ${index === 0 ? 'indicating' : ''}">${card.title}</button>
                            `).join('')}
                    </div>
                </div>

                <div class="extra-descriptions-container">
                        ${Object.values(coursesData.professors.extra_descriptions).map(description => `
                            <p class="extra-description">${description}</p>
                            <div class="extra-description-image-container"></div>
                            `).join('')}
                </div>
            </div>
        `;

        sectionContainerProfessor.innerHTML = sectionProfessorContent;
        sectionGroup.appendChild(sectionContainerProfessor);

        const imageContainers = this.shadowRoot.querySelectorAll('.extra-description-image-container');
        fetchImage('./assets/images/individual-lesson-3.jpg', imageContainers[0], 'extra-description-image');
        fetchImage('./assets/images/individual-lesson-4.jpg', imageContainers[1], 'extra-description-image');
        fetchImage('./assets/images/individual-lesson-1.jpg', imageContainers[2], 'extra-description-image');


        // Dynamically create vocal section html and append it
        const sectionContainerVocal = document.createElement('div');
        sectionContainerVocal.classList.add('section-container', 'vocal');

        const sectionVocalContent = `
                            <h3 class="section-title">${coursesData.vocal.title}</h3>
                            <p class="section-description">${coursesData.vocal.description}</p>
                            <div class="section-content">
                                <div class="slider-container">
                                        <h4 class="slider-title">${coursesData.vocal.cards_title}</h4>

                                        <div class="slider">
                                            ${Object.values(coursesData.vocal.cards).map(card => `
                                                    <div class="slider-card">
                                                        <h4 class="slider-card-title">${card.title}</h4>
                                                        <p class="slider-card-text">${card.description}</p>
                                                    </div>
                                                `).join('')}
                                        </div>

                                        <div class="vocal-slider-indicators">
                                            ${Object.values(coursesData.vocal.cards).map((card, index) => `
                                             <button class="vocal-slider-indicator ${index === 0 ? 'indicating' : ''}">${index + 1}</button>
                                            `).join('')}
                                        </div>
                                </div>
                            </div>
        `;

        sectionContainerVocal.innerHTML = sectionVocalContent;
        sectionGroup.appendChild(sectionContainerVocal);


        // event listeners
        document.addEventListener('submenu-click', (e) => this.handleScrollClick(e));
        this.backToTopBtn.addEventListener('click', (e) => this.handleScrollClick(e));
    }

    handleScrollClick(e) {
        const navbar = document.querySelector('dt-navbar');
        const clickedSubmenuIsCourses = e.detail.clickedSubmenu === navbar.shadowRoot.querySelector('.submenu.courses')
        const backToTopClicked = e.target.closest('button') === this.backToTopBtn;

        console.log(e.target)

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
