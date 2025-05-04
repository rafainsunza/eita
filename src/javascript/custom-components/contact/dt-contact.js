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
                            ${Object.values(contactData.contact_options).map(option => `
                                    <li class="contact-card-list-item">
                                        <a class="contact-card-link" href="${option.href}" target="_blank" rel="noopener noreferrer">
                                            ${option.icon}
                                            ${option.contact}
                                        </a>
                                    </li>
                            `).join('')}

                            <li class="contact-card-list-item">
                                ${contactData.map_iframe}
                            </li>
                        </ul>
                    </div>

                    <div class="contact-card-form-container">
                        <form action="#" method="post" class="contact-card-form">
                            <label for="name">Nome</label>
                            <input type="text" id="name" name="name" required />

                            <label for="email">Email</label>
                            <input type="email" id="email" name="email" required />

                            <label for="phone">Telefone (opcional)</label>
                            <input type="tel" id="phone" name="phone" />

                            <label for="message">Mensagem</label>
                            <textarea name="message" id="message" required></textarea>

                            <button type="submit" class="submit-button">Enviar</button>
                        </form>    
                    </div>
                </div>
            `;

        contactContainer.innerHTML = contactContent;
        contactWrapper.appendChild(contactContainer);

    }
}
customElements.define('dt-contact', DtContact);

export { DtContact }

