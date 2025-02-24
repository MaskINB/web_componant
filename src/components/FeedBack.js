const icon ="/src/assets/icons/icons8-feedback-58.png";

const style = document.createElement("style");
style.textContent = `

.feedback-section {
  text-align: center;
  width:100%;
  margin: auto;
  }

.feedback-section h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #355e3b;
}

.feedback-container-wrapper {
  overflow: hidden; /* Hides overflowing cards */
  width: 100%; 
  max-width: 1150px; /* Exactly 3 cards visible (300px each + margin) */
  margin: 0 auto;
}

.feedback-container {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.feedback-card {
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 310px;
  margin: 0 10px;
  flex-shrink: 0;
  opacity: 0.9;
  text-align: center;
  margin-left:20px;
  margin-right:20px;
}

.feedback-card.middle {
  background: #355e3b;
  color: #fff;
  transform: scale(1); /* Slightly larger for selection effect */
  opacity: 1;
}

.feedback-card .quote {
  font-size: 2rem;
  color: inherit;
}

.feedback-card h3 {
  font-size: 1.2rem;
  color: inherit;
  margin-bottom: 1rem;
}

.feedback-card p {
  font-size: 1rem;
  color: inherit;
  line-height: 1.5;
}

.navigation {
  margin-top: 1.5rem;
}

.navigation button {
  background:#d4f4e1;
  border: none;
  color: #fff;
  padding: 10px 15px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.8s ease;
}

.navigation button:hover {
  background: #469960;
}

/* Mobile Devices */
@media (max-width: 768px) {
  .feedback-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }

  .feedback-container-wrapper {
    max-width: 100%; /* Full width for mobile */
    padding: 0 20px; /* Add padding for mobile responsiveness */
  }

  .feedback-container {
    flex-direction: column; /* Stack cards vertically */
    align-items: center;
    gap: 20px;
  }

  .feedback-card {
    width: 100%; /* Full width for cards on mobile */
    margin: 0; /* Remove left and right margin */
    padding: 15px; /* Adjust padding for smaller screens */
  }

  .navigation button {
    font-size: 0.9rem;
    padding: 8px 12px;
  }
}

/* Tablets */
@media (max-width: 1024px) {
  .feedback-section h2 {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
  }

  .feedback-container-wrapper {
    max-width: 100%;
    padding: 0 20px;
  }

  .feedback-container {
    flex-direction: row; /* Keep cards in row but allow space for smaller screens */
    gap: 15px;
  }

  .feedback-card {
    width: 45%; /* 2 cards per row on tablets */
    margin: 0; /* Remove left and right margin */
    padding: 18px;
  }

  .navigation button {
    font-size: 1rem;
    padding: 9px 14px;
  }
}

`;

const template = document.createElement("template");
template.innerHTML = `
<section class="feedback-section">
  <h2>Feedback Corner</h2>
  <div class="feedback-container-wrapper">
    <div class="feedback-container">
      <div class="feedback-card">
        <p class="quote"><img src ="${icon}"></p>
        <h3>Emily Wilson</h3>
        <p>The customer experience was exceptional from start to finish. The website is user-friendly, the checkout process was smooth, and the clothes I ordered fit perfectly. I'm beyond satisfied!</p>
      </div>
      <div class="feedback-card">
        <p class="quote"><img src ="${icon}"></p>
        <h3>Sarah Thompson</h3>
        <p>I absolutely love the quality and style of the clothing I purchased from this website. Customer service was outstanding, and I received my order quickly. Highly recommended!</p>
      </div>
      <div class="feedback-card">
        <p class="quote"><img src ="${icon}"></p>
        <h3>Olivia Martinez</h3>
        <p>I had a great experience shopping on this website. The clothes I bought are fashionable and comfortable. Highly satisfied!</p>
      </div>
      <div class="feedback-card">
        <p class="quote"><img src ="${icon}"></p>
        <h3>James Anderson</h3>
        <p>The delivery was quick, and the clothes are high quality. I'm very happy with my purchase and will shop again soon!</p>
      </div>
      <div class="feedback-card">
        <p class="quote"><img src ="${icon}"></p>
        <h3>Sophia Brown</h3>
        <p>Such a seamless shopping experience! The designs are beautiful, and I received compliments on my outfits. Great work!</p>
      </div>
    </div>
  </div>
  <div class="navigation">
    <button class="prev">❮</button>
    <button class="next">❯</button>
  </div>
</section>
`;

class FeedBack extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(style.cloneNode(true));
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const container = this.shadowRoot.querySelector(".feedback-container");
    const cards = Array.from(this.shadowRoot.querySelectorAll(".feedback-card"));
    const prevButton = this.shadowRoot.querySelector(".prev");
    const nextButton = this.shadowRoot.querySelector(".next");

    let currentIndex = 0; // Track the current "first visible card"

    // Function to update card positions and highlight the middle card
    function updateCarousel() {
      container.style.transform = `translateX(-${currentIndex * 320}px)`;

      // Remove "middle" class from all cards
      cards.forEach((card) => card.classList.remove("middle"));

      // Add "middle" class to the middle card (always the second card in visible set)
      const middleCardIndex = currentIndex + 1;
      if (cards[middleCardIndex]) {
        cards[middleCardIndex].classList.add("middle");
      }
    }

    // Move to the previous set of cards
    prevButton.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    // Move to the next set of cards
    nextButton.addEventListener("click", () => {
      if (currentIndex < cards.length - 3) {
        currentIndex++;
        updateCarousel();
      }
    });

    // Initial setup
    updateCarousel();
  }
}

customElements.define("app-feedback", FeedBack);

export { FeedBack };
