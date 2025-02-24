const style = document.createElement('style');
style.textContent = `
    .ui-input-container {
      position: relative;
      left:-30px;
      width: 700px; /* Set the width to exactly 850px */
    }

    .ui-input {
      width: 100%; /* Input will span the full width of the container */
      padding: 10px 10px 10px 35px; /* Space for the icon */
      font-size: 1em;
      border: none;
      border-bottom: 2px solid #ccc;
      outline: none;
      background-color: transparent;
      transition: border-color 0.5s;
      box-sizing: border-box; /* Includes padding in total width */
    }

    .ui-input:focus {
      border-color:#1a4b2e; /* Change border color on focus */
    }

    .ui-input-underline {
      position: absolute;
      bottom: -2px; /* Align with the input bottom */
      left: 0;
      right: 0; /* Ensure it spans the full width */
      height: 3px;
      background-color:#1a4b2e;
      transform: scaleX(0); /* Start hidden */
      transform-origin: left; /* Animate from left to right */
      transition: transform 0.3s;
    }

    .ui-input:focus + .ui-input-underline {
      transform: scaleX(1); /* Full width on focus */
    }

    .ui-input:focus ~ .ui-input-highlight {
      width: 100%; /* Highlight covers full width */
    }

    .ui-input-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: #999;
      transition: color 0.3s;
    }

    .ui-input:focus ~ .ui-input-icon {
      color:#1a4b2e; /* Change icon color on focus */
    }

    .ui-input-icon svg {
      width: 20px;
      height: 20px;
    }

    @media screen and (max-width: 768px) {
    .ui-input-container {
        width: 100%; /* Set width to 100% for tablet-sized screens */
        left: 0; /* Remove left positioning */
    }

    .ui-input {
        padding: 10px 10px 10px 25px; /* Adjust padding to fit the input container */
    }

    .ui-input-icon {
        left: 15px; /* Adjust icon position for better alignment */
    }
}

@media screen and (max-width: 480px) {
    .ui-input-container {
        width: 100%; /* Ensure full width on mobile */
        left: 0; /* Center align on smaller screens */
    }

    .ui-input {
        padding: 10px 10px 10px 20px; /* Further reduce padding for mobile */
        font-size: 0.9em; /* Reduce font size for mobile devices */
    }

    .ui-input-icon {
        left: 10px; /* Adjust icon position for small mobile screens */
        width: 18px; /* Reduce icon size */
        height: 18px; /* Reduce icon size */
    }
}

`;

const template = document.createElement('template');
template.innerHTML = `
<div class="ui-input-container">
    <input type="text" class="ui-input" placeholder="Type something..." required>
    <div class="ui-input-underline"></div>
    <div class="ui-input-highlight"></div>
    <div class="ui-input-icon">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke-linejoin="round"
          stroke-linecap="round"
          stroke-width="2"
          stroke="currentColor"
          d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        ></path>
      </svg>
    </div>
  </div>
`;

class Searchbar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style.cloneNode(true));
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    
    connectedCallback() {
        // Any additional logic or event listeners can go here
    }
}

customElements.define('app-searchbar', Searchbar);

export { Searchbar };
