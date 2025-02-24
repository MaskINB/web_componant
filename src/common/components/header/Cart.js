const iconPath = ('src/assets/icons/cart.png')

const style = document.createElement('style');
style.textContent = `
.box {
  width: 80px;
  height: auto;
  float: left;
  transition: .5s linear;
  position: relative;
  display: block;
  overflow: hidden;
  padding: 15px;
  text-align: center;
  background: transparent;
  text-transform: uppercase;
  font-weight: 900;
  margin: 2px 10px 8px 10px;
}

.box:before {
  position: absolute;
  content: '';
  left: 0;
  bottom: 0;
  height: 4px;
  width: 100%;
  border-bottom: 4px solid transparent;
  border-left: 4px solid transparent;
  box-sizing: border-box;
  transform: translateX(100%);
}

.box:after {
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  border-top: 4px solid transparent;
  border-right: 4px solid transparent;
  box-sizing: border-box;
  transform: translateX(-100%);
}

.box:hover {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.box:hover:before {
  border-color:#1a4b2e;
  height: 100%;
  transform: translateX(0);
  transition: .3s transform linear, .3s height linear .3s;
}

.box:hover:after {
  border-color:#1a4b2e;
  height: 100%;
  transform: translateX(0);
  transition: .3s transform linear, .3s height linear .5s;
}

button {
  color:#1a4b2e;
  text-decoration: none;
  cursor: pointer;
  outline: none;
  border: none;
  background: transparent;
}

@media screen and (max-width: 768px) {
  .box {
    width: 120px; /* Increase width for better visibility on tablets */
    padding: 20px; /* Adjust padding for tablets */
    font-size: 14px; /* Adjust text size */
  }

  button {
    font-size: 14px; /* Adjust button text size */
    padding: 10px; /* Add some padding */
  }
}

@media screen and (max-width: 480px) {
  .box {
    width: 100%; /* Make box full-width on mobile */
    padding: 15px; /* Adjust padding for mobile */
    font-size: 12px; /* Adjust text size */
    text-align: center; /* Center text on mobile */
    margin: 10px 0; /* Adjust margins for mobile */
  }

  button {
    font-size: 12px; /* Adjust button text size for mobile */
    padding: 8px; /* Adjust button padding for mobile */
  }
}


`;

const template = document.createElement('template');
template.innerHTML = `
    <button>
        <span class="box">
            CART
        </span>
    </button>
`;

class Cart extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style.cloneNode(true));
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Optional: Any additional setup when the component is added to the DOM
    }
}

customElements.define('app-cart', Cart);

export { Cart };
