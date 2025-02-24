import SideBox from '../components/Category/SideBox.js';
import { navigateTo } from '../router/router.js';

const template = document.createElement('template');
template.innerHTML = `
    <div class="container">
        <div class="side">
            <side-box></side-box>
        </div>
        <div class="main">
            
        </div>
    </div>
`;

const style = document.createElement('style');
style.textContent = `
    .container {
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: 20px;
        padding: 20px;
        background-color: #f8f9fa;
        min-height: 100vh; 
    }

    .side {
        background-color: #f0f4f8;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
        max-width: 250px;
    }

    .main {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        background-color: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    }

    main-box {
        background-color: #fff;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease, box-shadow 0.3s ease;
        cursor: pointer;
    }

    main-box:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    main-box h1, main-box h2 {
        margin: 10px 0;
        color: #333;
        font-family: 'Arial', sans-serif;
        text-align: center;
    }

    main-box img {
        width: 100%;
        height: auto;
        object-fit: cover;
        border-radius: 8px;
        margin-bottom: 15px;
    }

    /* Pagination Styles */
    .pagination-container {
        display: flex;
        justify-content: center;
        padding: 20px 0;
    }

    .pagination-button {
        background-color: #007bff;
        color: #fff;
        border: none;
        padding: 10px 15px;
        margin: 0 5px;
        cursor: pointer;
        border-radius: 4px;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .pagination-button:hover {
        background-color: #0056b3;
        transform: translateY(-2px);
    }

    .pagination-button.active-button {
        background-color: #0056b3;
        cursor: default;
        opacity: 0.7;
    }

    .pagination-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: 768px) {
        .container {
            grid-template-columns: 1fr;
        }

        .side {
            max-width: 100%;
            padding: 10px;
        }

        .main {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }
    }
`;


class Category extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style.cloneNode(true));
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const categoryName = window.location.pathname.split('/category/')[1];
        if (categoryName) {
            this.getApiCategoryName(categoryName);
        } else {
            console.error('No category name found in the URL');
        }
    }

    async getApiCategoryName(categoryName, page = 1) {
        try {
            const response = await fetch(`https://api.anemidox.live/api/v1/controllers/ProductController.php?category_name=${categoryName}&page=${page}`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            
            this.renderProductBoxes(data);
            this.renderPaginationButtons(data.length, page, 16);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    
    
    renderProductBoxes(data, page = 1, productsPerPage = 18) {
        const mainContainer = this.shadowRoot.querySelector('.main');
        mainContainer.innerHTML = ''; 
    
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;
        const paginatedData = data.slice(start, end);
    
        paginatedData.forEach(product => {
            const mainBox = document.createElement('main-box');
            const h1 = document.createElement('h1');
            const img = document.createElement('img');
            const h2 = document.createElement('h2');
            
            h1.textContent = product.name;
            img.src = product.image_url;
            h2.textContent = `Rs.${product.price}`;
            
            h1.setAttribute('slot', 'one');
            img.setAttribute('slot', 'one');
            h2.setAttribute('slot', 'one');
            
            // Add click event to navigate to the product's detail page
            mainBox.onclick = () => {
                if (product.id) {
                    navigateTo(`/product/${product.id}`);
                } else {
                    console.error('Product ID not found');
                }
            };
    
            mainBox.appendChild(h1);
            mainBox.appendChild(img);
            mainBox.appendChild(h2);
            
            mainContainer.appendChild(mainBox);
        });
    }
    
    
    renderPaginationButtons(totalProducts, currentPage, productsPerPage) {
        const totalPages = Math.ceil(totalProducts / productsPerPage);
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add('pagination-container');
    
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.classList.add('pagination-button');
    
            button.addEventListener('click', () => {
                // Pass the page number to getApiCategoryName
                this.getApiCategoryName(window.location.pathname.split('/category/')[1], i);
            });
    
            if (i === currentPage) {
                button.disabled = true;
                button.classList.add('active-button');
            }
    
            paginationContainer.appendChild(button);
        }
    
        const existingPagination = this.shadowRoot.querySelector('.pagination-container');
        if (existingPagination) {
            existingPagination.remove(); // Remove old pagination buttons
        }
        this.shadowRoot.appendChild(paginationContainer);
    }
    
}

customElements.define('category-page', Category);

const CategoryComponent = () => {
    return (`
        <category-page></category-page>   
    `);
}

export default CategoryComponent;
