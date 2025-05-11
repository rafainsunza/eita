import html from './dt-schedule.html';
import style from './dt-schedule.component.sass';
import scheduleData from './schedule.json'

const template = document.createElement('template');

template.innerHTML = `
    <style>
        ${style}
    </style>
    ${html}
`;

class DtSchedule extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        const scheduleWrapper = this.shadowRoot.querySelector('.schedule-wrapper');

        const scheduleContainer = document.createElement('div');
        scheduleContainer.classList.add('schedule-container');

        const scheduleContent =
            `
                <dt-page-title title="${scheduleData.title}" subtitle=""></dt-page-title>

                <div class="schedule-list-wrapper">
                    <ul class="schedule-list">
                    ${Object.values(scheduleData.days).map(day => `
                        <li class="schedule-item">
                            <p class="schedule-day short">${day.short_name.toUpperCase()}</p>
                            <p class="schedule-day long">${day.name.toUpperCase()}</p>
                            <p class="schedule-hours">${day.hours}</p>
                        </li>
                        `).join('')}
                    </ul>
                </div>
             
            `;

        scheduleContainer.innerHTML = scheduleContent;
        scheduleWrapper.appendChild(scheduleContainer);

    }

}
customElements.define('dt-schedule', DtSchedule);

export { DtSchedule }

