import { AppHeader } from './src/common/Header.js';
import { urlLocationHandler } from './src/router/router.js';
import { FooterApp } from './src/common/Footer.js';



const app = () => {
    document.body.innerHTML = `
        ${AppHeader()}
        <div id="app"></div>
        <app-footer></app-footer>

    `;
};

export default app;
