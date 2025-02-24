const iconPath = 'src/assets/images/image.png';

const style = document.createElement('style');
style.textContent = `
/* Offer container styling */
.offer-container{
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d4f4e1;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 50px;
  transform: translateX(-100%);
  opacity: 0;
  transition: transform 0.9s ease-out, opacity 0.9s ease-out;
  margin-top: 60px;
  margin-bottom: 0px;
}

/* Offer container visible state */
.offer-container.visible {
  transform: translateX(0);
  opacity: 1;
}

/* Offer content styling */
.offer-content {
  display: flex;
  flex-wrap: wrap;
  max-width: 1000px;
  gap: 120px;
}

/* Image section */
.image-section {
  flex: 1;
  display: flex;
  position: relative;
  top: -65px;
  left: -150px;
}

.offer-image {
  width: 100%;
  height: auto;
  width: 350px; /* Set your desired image width */
  height: auto; /* Maintain aspect ratio */
  position: absolute; /* Positioning relative to the container */
  top: -58px;
  left: 85px;
}

/* Text section */
.text-section {
  flex: 2;
  color: #285e5a;
}

.text-section h2 {
  font-size: 70px;
  font-weight: bold;
  margin-bottom: 10px;
}

.text-section p {
  font-size: 1rem;
  margin-bottom: 20px;
}

/* Countdown timer styling */
.countdown-timer {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  justify-content: center;
}

.time-box {
  background-color: #ffffff;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  justify-content: center;
}

.time-box h3 {
  font-size: 1.5rem;
  margin: 0;
}

.time-box p {
  font-size: 0.8rem;
  margin: 0;
  color: #888;
}

/* Buy Now button */
.buy-now-btn {
  background-color: #285e5a;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buy-now-btn:hover {
  background-color: #1f4947;
}

/* Media Queries */

/* For Tablets and Medium Screens (max-width: 1024px) */
@media (max-width: 1024px) {
  .offer-content {
    gap: 60px; /* Reduce gap between image and text sections */
  }

  .image-section {
    top: -30px;
    left: -100px;
  }

  .offer-image {
    width: 280px; /* Reduce image width */
    left: 50px; /* Adjust image positioning */
  }

  .text-section h2 {
    font-size: 50px; /* Reduce font size for headings */
  }

  .text-section p {
    font-size: 0.9rem; /* Slightly smaller paragraph text */
  }

  .countdown-timer {
    gap: 10px; /* Reduce the gap between countdown timer boxes */
  }
}

/* For Mobile Screens (max-width: 600px) */
@media (max-width: 600px) {
  .offer-container {
    flex-direction: column; /* Stack the content vertically */
    align-items: center;
    margin: 20px; /* Reduced margin */
    padding: 15px; /* Reduced padding */
  }

  .offer-content {
    gap: 30px; /* Reduce the gap between sections */
  }

  .image-section {
    position: relative;
    top: 0;
    left: 0;
    margin-bottom: 20px; /* Added margin for spacing */
  }

  .offer-image {
    width: 250px; /* Smaller image width */
    left: 0; /* Center image */
    top: 0; /* Center image vertically */
  }

  .text-section h2 {
    font-size: 40px; /* Further reduce font size */
  }

  .text-section p {
    font-size: 0.85rem; /* Slightly smaller paragraph text */
  }

  .countdown-timer {
    flex-direction: column; /* Stack the countdown boxes vertically */
    gap: 5px; /* Reduce the gap between timer boxes */
  }

  .buy-now-btn {
    padding: 8px 16px; /* Smaller button */
    font-size: 0.9rem; /* Smaller button text */
  }
}

/* For Very Small Screens (max-width: 480px) */
@media (max-width: 480px) {
  .offer-container {
    margin: 10px; /* Very small margin for tiny screens */
    padding: 10px; /* Very small padding */
  }

  .offer-image {
    width: 200px; /* Further reduce image width */
    top: 0;
    left: 0;
  }

  .text-section h2 {
    font-size: 30px; /* Smaller heading for small screens */
  }

  .text-section p {
    font-size: 0.8rem; /* Further reduced paragraph text size */
  }

  .buy-now-btn {
    width: 100%; /* Make button full width */
    padding: 12px; /* Larger padding for ease of clicking */
    font-size: 1rem; /* Adjust text size */
  }
}

`;

const template = document.createElement('template');
template.innerHTML = `
  <div class="offer-container">
    <div class="offer-content">
      <div class="image-section">
        <img src="${iconPath}" alt="Exclusive Offer Image" class="offer-image" />
      </div>
      <div class="text-section">
        <h2>Exclusive Offer</h2>
        <p>
          Unlock the ultimate style upgrade with our exclusive offer. Enjoy savings of up to 40% off on our latest New Arrivals.
        </p>
        <div class="countdown-timer">
          <div class="time-box">
            <h3 id="days">00</h3>
            <p>Days</p>
          </div>
          <div class="time-box">
            <h3 id="hours">00</h3>
            <p>Hours</p>
          </div>
          <div class="time-box">
            <h3 id="minutes">00</h3>
            <p>Min</p>
          </div>
        </div>
        <button class="buy-now-btn">Buy Now</button>
      </div>
    </div>
  </div>
`;

class OfferBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(style.cloneNode(true));
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const container = this.shadowRoot.querySelector('.offer-container');

    // Set up the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.classList.add('visible'); // Add the visible class when in view
          } else {
            container.classList.remove('visible'); // Remove the visible class when out of view
          }
        });
      },
      { threshold: 0.1 } // Trigger when at least 10% of the component is visible
    );

    observer.observe(this);
  }
}

customElements.define('app-offerbar', OfferBar);

export { OfferBar };

