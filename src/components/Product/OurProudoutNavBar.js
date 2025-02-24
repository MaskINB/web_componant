const style = document.createElement('style');
style.textContent = `
 .nav-links {
    background-color: transparent;
    font-size: 20px;
    text-align: center;
    position: absolute; /* Position navbar relative to its parent */
    left: 0;
    width: 100%;
    z-index: 10; /* Ensure it stays above the .category */
    display: flex;
    justify-content: center;
    gap: 100px;
    margin-top: 30px; /* Add space between navbar and .category */
    font-family: 'Impact';
    font-weight: 900;
}

/* Link Styling */
.nav-links a {
    text-decoration: none;
    color: #1a4b2e; /* Change to your theme color */
    position: relative;
    transition: color 0.3s ease-in-out;
}

/* Hover Effect */
.nav-links a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px; /* Position underline slightly below text */
    width: 0;
    height: 5px; /* Thickness of the underline */
    background-color: #1a4b2e; /* Change to your theme color */
    transition: width 0.3s ease-in-out;
}

/* On Hover */
.nav-links a:hover {
    color: #003215; /* Change color on hover */
}

.nav-links a:hover::after {
    width: 100%; /* Underline expands fully on hover */
}

/* Media Query for Mobile and Smaller Screens */
@media screen and (max-width: 768px) {
    .nav-links {
        font-size: 16px; /* Smaller font size for mobile */
        flex-direction: column; /* Stack links vertically */
        gap: 20px; /* Reduced gap between links */
        margin-top: 20px; /* Reduced space between navbar and .category */
    }

    .nav-links a {
        padding: 10px 0; /* Add padding to make links more clickable on mobile */
    }
}

@media screen and (max-width: 480px) {
    .nav-links {
        font-size: 14px; /* Even smaller font size for very small screens */
        gap: 10px; /* Further reduce gap for small screens */
    }

    .nav-links a {
        padding: 8px 0; /* Adjust padding for small screens */
    }
}


`;

const template = document.createElement('template');
template.innerHTML = `
    <div class="nav-links">
    <a href="#sale">SALE</a>
    <a href="#hot">HOT</a>
    <a href="#new-arrivals">NEW ARRIVALS</a>
    <a href="#accessories">ACCESSORIES</a>
</div>

`;

class OurProudoutNavBar extends HTMLElement {
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

customElements.define('app-proudect-nav',OurProudoutNavBar);

export {OurProudoutNavBar};
