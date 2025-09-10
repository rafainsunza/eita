import html from './dt-contact.html';
import style from './dt-contact.component.sass';
import contactData from './contact.json'

const template = document.createElement('template');

template.innerHTML = `
    <style>
        ${style}
    </style>
    ${html}
`;



class DtContact extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const contactWrapper = this.shadowRoot.querySelector('.contact-wrapper');

        const contactContainer = document.createElement('div');
        contactContainer.classList.add('contact-container');

        const contactContent =
            `
                <dt-page-title title="${contactData.title}" subtitle=""></dt-page-title>

                <div class="contact-card-container">
                    <h3 class="contact-description">${contactData.description}</h3>

                    <div class="contact-card-info">
                        <ul class="contact-card-list">
                            ${Object.values(contactData.contact_options).map((option, index) => `
                                    <li class="contact-card-list-item">
                                        ${index === 0 ? `<slot name="whatsapp-link"></slot>` : `<a class="contact-card-link" href="${option.href}" target="_blank" rel="noopener noreferrer">${option.icon} ${option.contact}</a>`
                }
                                    </li>
                            `).join('')
            }

                            <li class="contact-card-list-item">
    ${contactData.map_iframe}
</li>
                        </ul >
                    </div >

    <div class="contact-card-form-container">
        <form action="https://formspree.io/f/mjkwnbap" method="POST" class="contact-card-form">
            <label for="name">Nome</label>
            <input type="text" id="name" name="name" required />

            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label for="phone">Telefone (opcional)</label>
            <input type="tel" id="phone" name="phone" />

            <label for="message">Mensagem</label>
            <textarea name="message" id="message" required></textarea>

            <input type="text" name="_gotcha" style="display: none" aria-hidden="true" tabindex="-1" />

            <button type="submit" class="submit-button">Enviar</button>

            <div class="contact-card-form-submit-message-container">
                <div class="contact-card-form-submit-message-icon"></div>
                <p class="contact-card-form-submit-message-text-content"></p>
            </div>
        </form>
    </div>
                </div >
    `;

        contactContainer.innerHTML = contactContent;
        contactWrapper.appendChild(contactContainer);

        const form = this.shadowRoot.querySelector('.contact-card-form');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    this.showFormSubmitResult(true);
                    form.reset();
                } else {
                    this.showFormSubmitResult(false);
                }
            } catch (error) {
                this.showFormSubmitResult(false);
            }
        })

    }

    showFormSubmitResult(formSubmittedSuccessfully) {
        const formSubmitMessageContainer = this.shadowRoot.querySelector('.contact-card-form-submit-message-container');
        const messageTextContentContainer = this.shadowRoot.querySelector('.contact-card-form-submit-message-text-content');
        const iconContainer = this.shadowRoot.querySelector('.contact-card-form-submit-message-icon');

        const successMessage = "Obrigado pela sua mensagem! Entraremos em contato em breve.";
        const failMessage = "Algo deu errado. Por favor, tente novamente mais tarde.";
        const successIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M64 80c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16L64 80zM0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zM337 209L209 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L303 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg>'
        const failIcon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>';

        formSubmitMessageContainer.style.left = '0';

        if (formSubmittedSuccessfully) {
            formSubmitMessageContainer.classList.remove('fail');
            formSubmitMessageContainer.classList.add('success');
            messageTextContentContainer.textContent = successMessage;
            iconContainer.innerHTML = successIcon;
        } else {
            formSubmitMessageContainer.classList.remove('success');
            formSubmitMessageContainer.classList.add('fail');
            messageTextContentContainer.textContent = failMessage;
            iconContainer.innerHTML = failIcon;
        }

        setTimeout(() => {
            formSubmitMessageContainer.classList.remove('success', 'fail');
            messageTextContentContainer.textContent = '';
            iconContainer.innerHTML = '';
            formSubmitMessageContainer.style.left = '-100%';
        }, 4500);
    }
}
customElements.define('dt-contact', DtContact);

export { DtContact }

