import html from './dt-about.html';
import style from './dt-about.component.sass';
import aboutData from "./about.json";

import { fetchImage, scrollToSection } from '../../utils';

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

        const sectionGroup = this.shadowRoot.querySelector('.section-group');
        this.backToTopBtn = this.shadowRoot.querySelector('.back-to-top-btn');

        // Dynamically create intro html and append to document
        const sectionContainerIntro = document.createElement('div');
        sectionContainerIntro.classList.add('section-container', 'intro');

        const introContent = `
            <h3 class="section-title">${aboutData.intro.title}</h3>

            <div class="intro-article-container">
                <div class="intro-image-container">

                    <figcaption class="intro-image-caption">
                        ${aboutData.intro.image_caption}
                    </figcaption>
                </div>

                ${aboutData.intro.paragraphs.map(paragraph => `
                     <p class="intro-paragraph">${paragraph}</p>
                    `).join('')}
            </div>
        `;

        sectionContainerIntro.innerHTML = introContent;
        sectionGroup.appendChild(sectionContainerIntro);
        fetchImage('./assets/images/fm-alexander.jpg', this.shadowRoot.querySelector('.intro-image-container'), 'intro-image')

        // Dynamically create for-who html and append to document
        const sectionContainerForWho = document.createElement('div');
        sectionContainerForWho.classList.add('section-container', 'for-who');

        const forWhoContent = `
                    <h3 class="section-title">${aboutData.for_who.title}</h3>

                    <div class="card-container">
                        ${Object.values(aboutData.for_who.cards).map(card => `
                                <div class="card">
                                    <p class="card-title">${card.title}</p>
                                    <p class="card-description">${card.description}</p>
                                </div>
                            `).join('')}
                    </div>
        `;

        sectionContainerForWho.innerHTML = forWhoContent;
        sectionGroup.appendChild(sectionContainerForWho);

        // Dynamically create for-what html and append to document
        const sectionContainerForWhat = document.createElement('div');
        sectionContainerForWhat.classList.add('section-container', 'for-what');

        const forWhatContent = `
                    <h3 class="section-title">${aboutData.for_what.title}</h3>

                    <div class="card-container">
                        ${Object.values(aboutData.for_what.cards).map(card => `
                                <div class="card">
                                    <p class="card-title">${card.title}</p>
                                    <p class="card-description">${card.description}</p>
                                </div>
                            `).join('')}
                    </div>
        `;

        sectionContainerForWhat.innerHTML = forWhatContent;
        sectionGroup.appendChild(sectionContainerForWhat);

        // Dynamically create cons html and append to document
        const sectionContainerCons = document.createElement('div');
        sectionContainerCons.classList.add('section-container', 'cons');

        const consContent = `
                    <h3 class="section-title">${aboutData.cons.title}</h3>

                    <div class="card-container">
                        ${Object.values(aboutData.cons.cards).map(card => `
                                <div class="card">
                                    <p class="card-title">${card.title}</p>
                                    <p class="card-description">${card.description}</p>
                                </div>
                            `).join('')}
                    </div>
        `;

        sectionContainerCons.innerHTML = consContent;
        sectionGroup.appendChild(sectionContainerCons);

        // Dynamically create quantity html and append to document
        const sectionContainerQuantity = document.createElement('div');
        sectionContainerQuantity.classList.add('section-container', 'lesson-quantity');

        const quantityContent = `
                     <h3 class="section-title">${aboutData.quantity.title}</h3>
                     <p class="section-description">${aboutData.quantity.description}</p>
 
                     <div class="card-container">
                         ${Object.values(aboutData.quantity.cards).map(card => `
                                 <div class="card">
                                     <p class="card-title">${card.title}</p>
                                     <p class="card-description">${card.description}</p>
                                 </div>
                             `).join('')}
                     </div>
         `;

        sectionContainerQuantity.innerHTML = quantityContent;
        sectionGroup.appendChild(sectionContainerQuantity);

        // Dynamically create professors html and append to document
        const sectionContainerProfessors = document.createElement('div');
        sectionContainerProfessors.classList.add('section-container', 'professors');

        const professorsContent = `
                      <h3 class="section-title">${aboutData.professors.title}</h3>
  
                      <div class="professor-cards-container">
                          ${Object.values(aboutData.professors.cards).map(card => `
                                  <div class="professor-card">
                                        <div class="professor-card-top-container"></div>

                                        <div class="professor-card-avatar-container">
                                            <div class="professor-card-img-container"></div>
                                            <h4 class="professor-card-name">${card.name}</h4>
                                            <h4 class="professor-card-position">${card.position}</h4>
                                        </div>

                                        <p class="professor-card-description">${card.description}</p>

                                        <button class="professor-card-button">${card.button.toUpperCase()}</button>
                                  </div>
                              `).join('')}
                      </div>
          `;

        sectionContainerProfessors.innerHTML = professorsContent;
        sectionGroup.appendChild(sectionContainerProfessors);

        const imgContainers = this.shadowRoot.querySelectorAll('.professor-card-img-container');
        const portraits = [
            './assets/images/portrait-georgia.jpg',
            './assets/images/portrait-reinaldo.jpg',
            './assets/images/portrait-merran.jpg',
            './assets/images/portrait-thomas.jpg'
        ];

        portraits.forEach((portrait, index) => {
            fetchImage(portrait, imgContainers[index], 'professor-card-img');
        });

        document.addEventListener('submenu-click', (e) => this.handleScrollClick(e));
        this.backToTopBtn.addEventListener('click', (e) => this.handleScrollClick(e));
    }

    handleScrollClick(e) {
        const navbar = document.querySelector('dt-navbar');
        const clickedSubmenuIsAbout = e.detail.clickedSubmenu === navbar.shadowRoot.querySelector('.submenu.about')
        const backToTopClicked = e.target.closest('button') === this.backToTopBtn;

        if (!clickedSubmenuIsAbout && !backToTopClicked) { return }

        navbar.closeNav();
        scrollToSection(
            this.shadowRoot.querySelector('.all'),
            this.shadowRoot.querySelector('.' + e.detail.scrollTargetClass),
            backToTopClicked
        );
    }

}
customElements.define('dt-about', DtAbout);

export { DtAbout }
