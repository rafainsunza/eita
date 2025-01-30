import './styles/reset.css'
import './styles/main.sass'

import './javascript/custom-components/navbar/dt-navbar'

import { fetchImage } from './javascript/utils'


fetchImage('./assets/icons/eita_logo.png', document.querySelector('header').querySelector('.home-link'), 'logo')
