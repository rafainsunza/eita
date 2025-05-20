import html from './dt-about.html';
import style from './dt-about.component.sass';
import aboutData from "./about.json";

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

        const aboutWrapper = this.shadowRoot.querySelector('.about-wrapper');
        const aboutContainer = document.createElement('div');
        aboutContainer.classList.add('about-container');
        const professorCvs = ['../../../assets/professor_cvs/cv_georgia.pdf', '../../../assets/professor_cvs/cv_reinaldo.pdf', '../../../assets/professor_cvs/cv_merran.pdf', '../../../assets/professor_cvs/cv_thomas.pdf'];
        console.log(professorCvs);
        const keyOrder = ['intro', 'for_who', 'for_what', 'cons', 'quantity', 'professors'];
        const caretIcon = '<svg class="accordion-button-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M9.4 278.6c-12.5-12.5-12.5-32.8 0-45.3l128-128c9.2-9.2 22.9-11.9 34.9-6.9s19.8 16.6 19.8 29.6l0 256c0 12.9-7.8 24.6-19.8 29.6s-25.7 2.2-34.9-6.9l-128-128z"/></svg>';
        const aboutContent = `
            <dt-page-title title="Sobre" subtitle=""></dt-page-title>

            <div class="accordion">
                ${keyOrder.map((key, index) => {
            const lastIndex = keyOrder.length - 1;
            const data = aboutData[key];

            if (index === 0) {
                return (`
                        <div class="accordion-item">
                            <button class="accordion-button">
                                <span>${data.question || data.title}</span>
                                ${caretIcon}
                            </button>
                            <div class="accordion-content">
                                <div class="accordion-content-inner intro">

                                    <figure class="accordion-image-container intro">
                                        <figcaption>${data.image_caption}</figcaption>
                                    </figure>
                                    <p class="accordion-text intro">${data.answer.replace(/\.\s*/g, '.<span class="break"></span>')}</p>

                                </div>
                             
                            </div>
                        </div>    
                `);
            }

            if (index > 0 && index < lastIndex) {
                return (`
                    <div class="accordion-item">
                        <button class="accordion-button">
                            <span>${data.question || data.title}</span>
                            ${caretIcon}
                        </button>
                        <div class="accordion-content">
                            <div class="accordion-content-inner">
                                ${Object.values(data.answers).map(answer => `
                                <p class="accordion-answer">${answer.answer}</p>
                                <p class="accordion-answer-detail">${answer.answer_detail}</p>
                                `).join('')}
                            </div>
                        </div>
                    </div>    
                `);
            }

            if (index === lastIndex) {
                return (`
                    <div class="accordion-item">
                        <button class="accordion-button">
                            <span>${data.question || data.title}</span>
                            ${caretIcon}
                        </button>
                        <div class="accordion-content professor">
                            <div class="accordion-content-inner professor">
                                ${Object.values(data.cards).map((card, index) => {
                    return (`
                                <div class="accordion-professor-card">
                                    <div class="accordion-professor-card-image-container"></div>

                                    <div class="accordion-professor-card-info">
                                        <h3 class="accordion-professor-card-name">${card.name}</h3>
                                        <h4 class="accordion-professor-card-position">${card.position}</h4>
                                        <p class="accordion-professor-card-description">${card.description}</p>
                                    </div>

                                    <a class="accordion-professor-card-link" href="${professorCvs[index]}" target="_blank" rel="noopener noreferrer">${card.button.toUpperCase()}</a>
                                </div>
                            `);
                }).join('')}
                            </div>
                        </div>
                    </div>    
                `);
            }
        }).join('')}
            

            </div>
    `;
        aboutContainer.innerHTML = aboutContent;
        aboutWrapper.appendChild(aboutContainer);

        const introImages = ['../../../assets/images/fm-alexander.jpg'];
        const introImageContainers = Array.from(this.shadowRoot.querySelectorAll('.accordion-image-container.intro'));
        const professorCardImages = ['../../../assets/images/portrait-georgia.jpg', '../../../assets/images/portrait-reinaldo.jpg', '../../../assets/images/portrait-merran.jpg', '../../../assets/images/portrait-thomas.jpg'];
        const professorCardImageContainers = Array.from(this.shadowRoot.querySelectorAll('.accordion-professor-card-image-container'));
        const accordionButtons = Array.from(this.shadowRoot.querySelectorAll('.accordion-button'));
        const accordionContent = Array.from(this.shadowRoot.querySelectorAll('.accordion-content'));

        introImages.map((image, index) => fetchImage(image, introImageContainers[index], 'accordion-image'));
        professorCardImages.map((image, index) => fetchImage(image, professorCardImageContainers[index], 'accordion-professor-card-image'));

        accordionButtons.map(button => button.addEventListener('click', (e) => this.handleAccordionClick(e, accordionButtons, accordionContent)));
        window.addEventListener('resize', () => this.handleWindowResize());
    }

    disconnectedCallback() {
        window.removeEventListener('resize', this.handleWindowResize);
    }

    handleWindowResize() {
        // reset the maxheight on opened accordion content to avoid content being hidden because of lack of height
        const openedContentArray = Array.from(this.shadowRoot.querySelectorAll('.accordion-content.open'));
        let openedContent;

        openedContentArray.length > 0 ? openedContent = openedContentArray[0] : openedContent = false;

        if (openedContent === false) { return } else {
            openedContent.offsetHeight;
            openedContent.style.maxHeight = openedContent.scrollHeight + 'px';
        }

    }

    handleAccordionClick(e, accordionButtons, accordionContent) {
        const clickedButton = e.target.closest('button');
        const contentToDisplay = clickedButton.nextElementSibling;
        const isOpen = contentToDisplay.classList.contains('open');
        const remainingButtons = accordionButtons.filter(button => { if (button !== clickedButton) { return button } });
        const remainingContent = remainingButtons.map(button => { return button.nextElementSibling });

        if (isOpen) {
            this.hideAccordionContent(accordionContent, accordionButtons);
            return
        }

        this.showAccordionContent(contentToDisplay, clickedButton);
        this.hideAccordionContent(remainingContent, remainingButtons);

        contentToDisplay.classList.contains('professor') && window.innerWidth < 1024 ? this.scrollToContent(contentToDisplay) : null;
    }

    scrollToContent(content) {
        setTimeout(() => {
            content.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100)
    }

    showAccordionContent(content, button) {
        content.offsetHeight;
        content.style.maxHeight = content.scrollHeight + 'px';

        content.classList.add('open');
        button.classList.add('open');
    }

    hideAccordionContent(contents, buttons) {
        contents.map(content => {
            content.style.maxHeight = '0px';
            content.classList.remove('open');
        });

        buttons.map(button => button.classList.remove('open'));
    }
}
customElements.define('dt-about', DtAbout);

export { DtAbout }
