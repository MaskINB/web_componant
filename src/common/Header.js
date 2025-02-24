// Import necessary components
import { Logo } from './components/header/Logo.js';
import { Name } from './components/header/Name.js';
import { Searchbar } from './components/header/Searchbar.js';
import { Return } from './components/header/Return.js';
import { Cart } from './components/header/Cart.js';
import { Login } from './components/header/Login.js';

// Create and configure style
const style = document.createElement('style');
style.textContent = `
 header {
    padding-bottom: 5px;
    padding-top: 2px;
    margin-bottom: 0;
    display: flex;
    justify-content:space-evenly;
    align-items: center;
    height: 20px;
    background-color:transparent;
    margin-top:8px;
}

@media screen and (max-width: 768px) {
  header {
    padding-bottom: 10px;
    padding-top: 5px;
    height: auto; /* Allow for more height if needed */
    flex-direction: column;
    justify-content: center;
  }
}

@media screen and (max-width: 480px) {
  header {
    padding-bottom: 15px;
    padding-top: 10px;
    height: auto; /* Allow for more height if needed */
    flex-direction: column;
    align-items: center;
  }
}


`;

// Create and configure template
const template = document.createElement('template');
template.innerHTML = `
    <header>
        <app-logo></app-logo>
        <app-header-name></app-header-name>
        <app-searchbar></app-searchbar>
        <app-return></app-return>
        <app-cart></app-cart>
        <app-login></app-login> 
    </header>
`;

// Define the Header custom element
class Header extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style.cloneNode(true));
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Any additional setup if needed
    }
}

// Define the custom element
customElements.define('app-header', Header);

// Export the custom element class (use this in HTML or other components)
const AppHeader = () => {
    return `
    `
}
export{Header};
export { AppHeader };
