const iconPathone = 'src/assets/images/Accessories.png';
const iconPathtwo = '/src/assets/images/Dressed.png';
const iconPaththree = 'src/assets/images/Outerwear.png';

const style = document.createElement('style');
style.textContent = `
.designer-clothes {
  padding: 40px;
  margin-top: 0px;
  margin-bottom: 50px;
  margin-left: 50px;
  margin-right: 50px;
  overflow: hidden;
  border-radius: 16px;
  background-color: transparent;
  height: 800px;
}

.cards {
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
}

.cards .one,
.cards .two,
.cards .three {
  background-color: #d4f4e1;
}

.cards .card {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  height: 550px;
  width: 350px;
  border-radius: 10px;
  color: rgb(1, 1, 1);
  cursor: pointer;
  transition: 400ms;
}

.cards .card:hover {
  transform: scale(1.1, 1.1);
}

.cards:hover > .card:not(:hover) {
  filter: blur(10px);
  transform: scale(0.9, 0.9);
}

.section-title {
  font-size: 60px;
  color: #1a4b2e;
  font-weight: bold;
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
  align-items: center;
  left: 300px;
  margin-top: 60px;
}

.section-subtitle {
  color: #1a4b2e;
  font-size: 30px;
  text-align: center;
  margin-top: 0;
}

.card .card-image {
  width: 100%;
  height: 250px;
  border-radius: 8px;
  margin-top: 5px;
  object-fit: cover;
  position: relative;
  top:20px;
}

.card .card-tagline {
  font-size: 1.5rem;
  margin: 15px 0 10px;
  font-weight: bold;
  color: #333;
  positiion: relative;
  top: 20px;
}

.card .card-description {
  font-size: 1rem;
  margin: 10px 20px;
  color: #555;
  position: relative;
  top:20px;
}

.card .card-button {
  background-color: #1a4b2e;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top:auto; /* Position button at the bottom */
  margin-bottom: 20px; /* Space below the button */
  position: relative;
  top:35px;
}

/* Mobile Devices */
@media (max-width: 768px) {
  .designer-clothes {
    padding: 20px;
    height: auto;
    margin-left: 20px;
    margin-right: 20px;
  }

  .cards {
    flex-direction: column;
    gap: 10px;
    justify-content: center;
  }

  .cards .card {
    width: 100%;
    height: auto;
    transform: none; /* Remove hover effect scaling for mobile */
  }

  .section-title {
    font-size: 40px;
    text-align: center;
    left: 0;
    margin-top: 30px;
  }

  .section-subtitle {
    font-size: 20px;
  }

  .card .card-image {
    height: 200px;
  }

  .card .card-tagline {
    font-size: 1.2rem;
  }

  .card .card-description {
    font-size: 0.9rem;
  }

  .card .card-button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}

/* Tablets */
@media (max-width: 1024px) {
  .designer-clothes {
    padding: 30px;
    height: auto;
    margin-left: 30px;
    margin-right: 30px;
  }

  .cards {
    flex-direction: row;
    gap: 15px;
  }

  .cards .card {
    width: 48%; /* Adjust card width for tablets */
  }

  .section-title {
    font-size: 50px;
  }

  .section-subtitle {
    font-size: 25px;
  }

  .card .card-image {
    height: 230px;
  }

  .card .card-tagline {
    font-size: 1.3rem;
  }

  .card .card-description {
    font-size: 1rem;
  }

  .card .card-button {
    font-size: 1rem;
  }
}

`;

const template = document.createElement('template');
template.innerHTML = `
<section class="designer-clothes">
  <h1 class="section-title">Designer Clothes For You</h1>
  <p class="section-subtitle">
    Immerse yourself in the world of luxury fashion with our meticulously crafted designer clothes!
  </p>

  <div class="cards">
    <div class="card one">
      <img src="${iconPathone}" alt="Product Image" class="card-image">
      <h2 class="card-tagline">Accessories</h2>
      <p class="card-description">Complete your ensemble with designer accessories such as handbags, scarves, belts, and hats.</p>
      <button class="card-button">Read More...</button>
    </div>
    <div class="card two">
      <img src="${iconPathtwo}" alt="Product Image" class="card-image">
      <h2 class="card-tagline">Dresses</h2>
      <p class="card-description">Explore a stunning range of designer dresses, including evening gowns and chic day dresses.</p>
      <button class="card-button">Read More...</button>
    </div>
    <div class="card three">
      <img src="${iconPaththree}" alt="Product Image" class="card-image">
      <h2 class="card-tagline">Outerwear</h2>
      <p class="card-description">Browse luxurious designer coats, jackets, and blazers to stay stylishly warm during colder seasons.</p>
      <button class="card-button">Read More...</button>
    </div>
  </div>
</section>
`;

class DesignerCloths extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(style.cloneNode(true));
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    // Optional: Any additional setup when the component is added to the DOM
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('mouseover', () => {
        card.style.transform = 'perspective(1000px) rotateY(15deg) scale(1.05)';
      });

      card.addEventListener('mouseout', () => {
        card.style.transform = 'perspective(1000px) rotateY(0deg) scale(1)';
      });
    });
  }
}

customElements.define('app-desigercloths', DesignerCloths);

export { DesignerCloths };
