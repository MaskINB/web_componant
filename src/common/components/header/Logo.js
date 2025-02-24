import { navigateTo } from "../../../router/router.js";

const iconPath = 'src/assets/images/logoa.png';

const style = document.createElement('style');
style.textContent = `
    #logo {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 190px; /* Adjust to fit your logo size */
        height: auto;
        margin-top:35px;
        padding: 0;
        position: relative;
        left:-30px;
    }

    #logo img {
        max-width: 100%;
        height: auto;
        transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    }

    #logo img:hover {
        transform: scale(1.1); /* Slightly increase the size on hover */
    }

    @media screen and (max-width: 768px) {
    #logo {
        width: 150px; /* Reduce logo size for tablets */
        left: -20px; /* Adjust the position on tablets */
    }
}

@media screen and (max-width: 480px) {
    #logo {
        width: 120px; /* Further reduce logo size for mobile devices */
        left: 0; /* Center the logo on small screens */
    }
}


`;

const template = document.createElement('template');
template.innerHTML = `
    <div id="logo">
        <img src="${iconPath}" alt="Logo" title="Go to Home Page" /> 
    </div>
`;

class Logo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style.cloneNode(true));
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.addNavigation();
    }

    addNavigation() {
        const logoElement = this.shadowRoot.querySelector('img');
        logoElement.addEventListener('click', () => {
            navigateTo('/');
        });
    }
}

customElements.define('app-logo', Logo);

export { Logo };
