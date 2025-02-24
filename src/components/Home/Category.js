import { navigateTo } from '../../router/router.js'; 
import { OurProudoutNavBar } from '../Product/OurProudoutNavBar.js';

const template = document.createElement('template');
template.innerHTML = `
<h1>Our Proudout</h1>
<div class="wrapper">
    <app-proudect-nav></app-proudect-nav>
    <div class="category">
        ${[...Array(16).keys()].map(i => `
            <article class="card" id="card-${i + 1}">
                <img class="card_image" src="" alt="Category Image">
                <div class="card_content">
                    <span class="card_title"></span>
                    <span class="card_subtitle"></span>
                    <p class="card_description"></p>
                </div>
            </article>
        `).join('')}
    </div>
</div>
`;

const style = document.createElement('style');
style.textContent = `
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.wrapper {
    position: relative; /* Ensure child elements respect stacking context */
    width: 100%;
    margin: 0 auto;
}

.category {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1px;
    padding: 70px;
    background: #d4f4e1;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(7.7px);
    -webkit-backdrop-filter: blur(7.7px);
    border: 1px solid rgba(62, 152, 163, 0.32);
    margin-left: 50px;
    margin-right: 50px;
}

.card {
    position: relative;
    width: 300px;
    height: 430px;
    color: #2e2d31;
    background: black;
    overflow: hidden;
    border-radius: 10px;
    transition: border 0.4s ease, transform 0.3s ease;
    margin-top: 30px;
}

.card:hover {
    border: 5px solid #3e98a3; /* Highlight border color */
    transform: scale(1.05); /* Slight zoom for better effect */
}

.card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    border: 2px solid rgba(62, 152, 163, 0.5); /* Animated border color */
    z-index: -1;
    transition: transform 0.4s ease;
    transform: scale(1.2);
    opacity: 0.7;
}

.card:hover::after {
    transform: scale(1); /* Bring the animated border to focus */
}

.card_image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

.card_content {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 20px;
    background: #f2f2f2;
    border-top-left-radius: 20px;
    transform: translateY(150px);
    transition: transform .25s;
}

.card_content::before {
    content: '';
    position: absolute;
    top: -47px;
    right: -45px;
    width: 100px;
    height: 100px;
    transform: rotate(-175deg);
    border-radius: 50%;
    box-shadow: inset 48px 48px #f2f2f2;
}

h1 {
    font-size: 90px;
    color: #1a4b2e;
    font-weight: bold;
    position: relative;
    display: inline-block;
    margin-bottom: 20px;
}

.card_title {
    font-weight: bold;
    color: #131313;
    line-height: 15px;
}

.card_subtitle {
    display: block;
    font-size: 12px;
    margin-bottom: 10px;
}

.card_description {
    font-size: 14px;
    opacity: 0;
    transition: opacity .5s;
}

.card:hover .card_content {
    transform: translateY(0);
}

.card:hover .card_description {
    opacity: 1;
    transition-delay: .25s;
}

/* Media Query for Tablets and Medium Screens */
@media (max-width: 1024px) {
    .category {
        grid-template-columns: repeat(2, 1fr); /* Switch to 2 columns on medium screens */
    }

    .card {
        width: 90%; /* Adjust card width to fit smaller screens */
        margin: 10px auto; /* Center the cards and add space between them */
    }
}

/* Media Query for Mobile Screens */
@media (max-width: 600px) {
    .category {
        grid-template-columns: 1fr; /* Single column layout for mobile */
        padding: 20px; /* Reduced padding for smaller screens */
    }

    .card {
        width: 100%; /* Make cards full width on mobile */
        margin-bottom: 20px; /* Add spacing between cards */
    }

    .card_content {
        padding: 15px; /* Reduced padding for mobile devices */
    }

    .card_title {
        font-size: 18px; /* Smaller title font size for mobile */
    }

    .card_subtitle {
        font-size: 10px; /* Adjust subtitle font size */
    }

    .card_description {
        font-size: 12px; /* Adjust description font size */
    }
}

/* Media Query for very small screens */
@media (max-width: 480px) {
    .card {
        width: 100%; /* Cards take full width */
        height: auto; /* Remove fixed height to adjust for mobile devices */
    }

    .card_content {
        padding: 10px; /* Further reduced padding for very small screens */
    }

    .card_title {
        font-size: 16px; /* Further reduce title size */
    }

    .card_subtitle {
        font-size: 8px; /* Further reduce subtitle size */
    }

    .card_description {
        font-size: 10px; /* Smaller description text */
    }

    h1 {
        font-size: 60px; /* Reduce the heading size on very small screens */
    }
}

/* New CSS for scroll-triggered animation */
.card {
    opacity: 0;
    transform: translateX(-100px); /* Start off-screen (left side) */
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.card:nth-child(even) {
    transform: translateX(100px); /* Start off-screen (right side) */
}

.card.visible {
    opacity: 1;
    transform: translateX(0); /* Reset to the original position */
}

`;

class CategoryBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(style.cloneNode(true), template.content.cloneNode(true));
    }

    connectedCallback() {
        this.fetchData();
        this.addScrollAnimation();
    }

    async fetchData() {
        try {
            const response = await fetch('https://api.anemidox.live/api/v1/controllers/CategoryController.php');
            if (!response.ok) throw new Error('Network error');
            const data = await response.json();
            this.renderCategoryData(data);
        } catch (error) {
            console.error('Data fetch error:', error);
        }
    }

    renderCategoryData(data) {
        const items = this.ensureDataLength(data,16);

        items.forEach((item, index) => {
            const cardId = `#card-${index + 1}`;
            this.updateCard(cardId, item);
        });
    }

    ensureDataLength(data, length) {
        const placeholders = Array.from({ length: Math.max(0, length - data.length) }, () => ({
            name: 'Placeholder',
            description: 'No description available.',
            categorie_url: 'https://via.placeholder.com/250x250.png?text=No+Image',
            id: null,
        }));
        return [...data, ...placeholders];
    }

    updateCard(selector, item) {
        const card = this.shadowRoot.querySelector(selector);
        if (card) {
            const { name = 'No title', description = '', categorie_url = '', id = null } = item;
            card.querySelector('.card_title').textContent = name;
            card.querySelector('.card_subtitle').textContent = description.slice(0, 100); // Optional truncation
            card.querySelector('.card_description').textContent = description;
            const img = card.querySelector('.card_image');
            img.src = categorie_url || 'https://via.placeholder.com/250x250.png?text=No+Image';  // Fallback image
            card.onclick = () => id ? navigateTo(`/category/${id}`) : console.error('No ID for category');
        } else {
            console.error(`Card not found: ${selector}`);
        }
    }

    addScrollAnimation() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const card = entry.target;
                    if (entry.isIntersecting) {
                        card.classList.add('visible');
                    } else {
                        card.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.2 } // Trigger when 20% of the element is visible
        );

        const cards = this.shadowRoot.querySelectorAll('.card');
        cards.forEach((card) => observer.observe(card));
    }
}

customElements.define('category-box', CategoryBox);

export default CategoryBox;
