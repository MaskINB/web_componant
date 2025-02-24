import ProductBox from '../components/Product/ProductList.js'; 

const template = document.createElement('template');
template.innerHTML = `
    <div class="container">
        <div class="main">
            <product-box></product-box>
        </div>
    </div>
`;

const style = document.createElement('style');
style.textContent = `
    
`;

class ProductContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.appendChild(style.cloneNode(true));
    }
}

customElements.define('product-container', ProductContainer);

const ProductComponent = () => {
    return `
        <product-container></product-container>
    `;
}

export default ProductComponent;
