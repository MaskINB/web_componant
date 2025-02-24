import CategoryBox from "../components/Home/Category.js";
import Carousel from "../components/Home/Carousel/Carousel.js";
import {OfferBar} from "../components/OfferBar.js";
import{DesignerCloths} from "../components/DesignerCloths.js";
import { FeedBack } from "../components/FeedBack.js";


const template = document.createElement('template');
template.innerHTML = `
    <div class="main">
        <carousel-box></carousel-box>
    </div>
    <div class="categories-section">
        <h2>Explore Our Categories</h2>
        <app-offerbar></app-offerbar>
        <category-box></category-box>
    </div>    
    
    <app-desigercloths></app-desigercloths>
    <app-feedback></app-feedback>
`;

const style = document.createElement('style');
style.textContent = `
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow: hidden;
        border-radius:0px;
    }

    .categories-section {
        padding: em;
        background-color: #ffffff;
        text-align: center;
    }

    .categories-section h2 {
        font-size:90px;
        margin-bottom: 1em;
        color:#1a4b2e;
        font-weight: bold;
        position: relative;
        display: inline-block;
        margin-bottom:15px;
    }

    .categories-section h2::after {
        content: "";
        display: block;
        height: 4px;
        width: 60px;
        background-color: #ff6f61;
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
    }

    .main, .categories-section {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 1024px) {
        .categories-section h2 {
            font-size: 2em;
        }
    }

    @media (max-width: 600px) {
        .categories-section h2 {
            font-size: 1.5em;
        }
    }
`;

class Home extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        
    }
}

customElements.define('home-page', Home);

const HomeComponent = () => {
    return (`
        <home-page></home-page>
    `);
};

export default HomeComponent;
