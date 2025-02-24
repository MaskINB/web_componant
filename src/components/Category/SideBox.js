const template = document.createElement('template');
template.innerHTML = `
    <div class="side-box">
        <h2>Filter By</h2>
        <div class="filter-section">
            <h3>Categories</h3>
            <label><input type="checkbox" name="category" value="baby" /> Baby</label>
            <label><input type="checkbox" name="category" value="kids" /> Kids</label>
            <label><input type="checkbox" name="category" value="young" /> Young</label>
            <label><input type="checkbox" name="category" value="elder" /> Elder</label>
            <label><input type="checkbox" name="category" value="shoes" /> Shoes</label>
            <label><input type="checkbox" name="category" value="watches" /> Watches</label>
        </div>

        <div class="filter-section">
            <h3>Price</h3>
            <input type="range" id="priceRange" min="0" max="100000" value="1000" />
            <span id="priceValue">Rs.1000</span>
        </div>

        <div class="filter-section">
            <h3>Size</h3>
            <label><input type="checkbox" name="size" value="S" /> Small (S)</label>
            <label><input type="checkbox" name="size" value="M" /> Medium (M)</label>
            <label><input type="checkbox" name="size" value="L" /> Large (L)</label>
            <label><input type="checkbox" name="size" value="XL" /> Extra Large (XL)</label>
        </div>

        <button class="apply-filters">Apply Filters</button>
    </div>
`;

const style = document.createElement('style');
style.textContent = `
    .side-box {
        padding: 20px;
        background-color:blue;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        max-width: 250px;
        font-family: Arial, sans-serif;
    }

    h2 {
        color: #333;
        font-size: 1.5rem;
        margin-bottom: 20px;
        text-align: center;
    }

    h3 {
        color: #555;
        font-size: 1.2rem;
        margin-bottom: 10px;
    }

    .filter-section {
        margin-bottom: 20px;
    }

    label {
        display: block;
        margin-bottom: 10px;
        font-size: 1rem;
        color: #444;
    }

    input[type="range"] {
        width: 100%;
        margin-top: 10px;
    }

    #priceValue {
        display: inline-block;
        margin-top: 10px;
        font-size: 1.1rem;
        color: red;
    }

    .apply-filters {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: red;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
    }

    .apply-filters:hover {
        background-color: darkred;
    }
`;

class SideBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style.cloneNode(true));
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const priceRange = this.shadowRoot.querySelector('#priceRange');
        const priceValue = this.shadowRoot.querySelector('#priceValue');

        // Update the displayed price as the range slider moves
        priceRange.addEventListener('input', () => {
            priceValue.textContent = `Rs.${priceRange.value}`;
        });

        // Optional: Add filter logic to apply filters
        this.shadowRoot.querySelector('.apply-filters').addEventListener('click', () => {
            const selectedCategories = Array.from(this.shadowRoot.querySelectorAll('input[name="category"]:checked'))
                .map(input => input.value);
            const selectedSizes = Array.from(this.shadowRoot.querySelectorAll('input[name="size"]:checked'))
                .map(input => input.value);
            const selectedPrice = priceRange.value;

            console.log('Filters applied:', { selectedCategories, selectedSizes, selectedPrice });
            // Implement filter logic for your product display (e.g., update API request or product display based on selected filters)
        });
    }
}

customElements.define('side-box', SideBox);

export default SideBox;
