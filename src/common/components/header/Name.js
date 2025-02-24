const style = document.createElement('style');
style.textContent = `
.key {
    font-size:35px;
    display: inline-block;
    transition: transform 0.2s;
    font-family: impact;
    color:#1a4b2e;
    margin:0;
    padding:0;
    }

.keyboard { 
    position: relative;
    left:-65px;
}

    @keyframes pressDown1 {
    30%,
    40%,
    100% {
        transform: translateY(0);
    }
    35% {
        transform: translateY(10px);
    }
    }

    @keyframes pressDown2 {
    70%,
    80%,
    100% {
        transform: translateY(0);
    }
    75% {
        transform: translateY(10px);
    }
    }

    @keyframes pressDown3 {
    30%,
    40%,
    100% {
        transform: translateY(0);
    }
    35% {
        transform: translateY(10px);
    }
    }

    @keyframes pressDown4 {
    40%,
    50%,
    100% {
        transform: translateY(0);
    }
    45% {
        transform: translateY(10px);
    }
    }

    @keyframes pressDown5 {
    20%,
    30%,
    100% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(10px);
    }
    }

    @keyframes pressDown6 {
    60%,
    70%,
    100% {
        transform: translateY(0);
    }
    65% {
        transform: translateY(10px);
    }
    }

    @keyframes pressDown7 {
    10%,
    20%,
    100% {
        transform: translateY(0);
    }
    15% {
        transform: translateY(10px);
    }
    }

    @keyframes pressDown8 {
    35%,
    45%,
    100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(10px);
    }
    }



    .key:nth-child(1) {
    animation: pressDown1 2s infinite;
    }

    .key:nth-child(2) {
    animation: pressDown2 3s infinite;
    }

    .key:nth-child(3) {
    animation: pressDown3 4s infinite;
    }

    .key:nth-child(4) {  
    animation: pressDown4 2.5s infinite;
    }

    .key:nth-child(5) {
    animation: pressDown5 2.5s infinite;
    }

    .key:nth-child(6) {
    animation: pressDown6 3.5s infinite;
    }

    .key:nth-child(7) {
    animation: pressDown7 2.2s infinite;
    }

    .key:nth-child(8) {
    animation: pressDown8 3.2s infinite;
    }

    */media query */
    @media screen and (max-width: 768px) {
    .key {
        font-size: 28px; /* Adjust font size for smaller screens */
    }

    .keyboard {
        left: -30px; /* Adjust positioning for better alignment on smaller screens */
    }
}

@media screen and (max-width: 480px) {
    .key {
        font-size: 22px; /* Further reduce font size for very small screens */
    }

    .keyboard {
        left: -20px; /* Adjust positioning for very small screens */
    }
}

`;

const template = document.createElement('template');
template.innerHTML = `
        <div class="keyboard">        
        <span class="key">E</span>
        <span class="key">-</span>
        <span class="key">C</span>
        <span class="key">L</span>
        <span class="key">O</span>
        <span class="key">T</span>
        <span class="key">I</span>
        <span class="key">N</span>
        <span class="key">G</span>
        </div>
`;

class Name extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style.cloneNode(true));
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
    }
}

customElements.define('app-header-name', Name);

export { Name };