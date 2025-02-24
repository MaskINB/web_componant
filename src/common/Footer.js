// Create and configure style
const iconPath = 'src/assets/images/stylish-woman-summer-outfit-isolated-posing-fashion-trend-isolated.jpg';
const style = document.createElement('style');
style.textContent = `
  /* styles.css */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color:#1a4b2e;
  color: #fff;
}

.footer {
  background-color:#1a4b2e;
  padding: 50px;
  color: #ccc;
  margin-top: 50px;

}

.footer-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-between;
}

.footer-column {
  flex: 1;
  min-width: 250px;
}

.footer-column h3 {
  color: #fff;
  margin-bottom: 15px;
}

.footer-column p {
  font-size: 14px;
  line-height: 1.6;
}

.contact-info {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.contact-info li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.contact-info li span {
  margin-right: 10px;
  font-size: 16px;
}

.newsletter {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.newsletter input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
}

.newsletter button {
  background-color: orange;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.newsletter button:hover {
  background-color: #e67e22;
}

.tweets {
  list-style: none;
  padding: 0;
}

.tweets li {
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 10px;
}

.instagram-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
}

.instagram-gallery img {
  width: 70%;
  height: auto;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.instagram-gallery img:hover {
  transform: scale(1.05);
}

.footer-bottom {
  margin-top: 40px;
  border-top: 1px solid #333;
  padding-top: 20px;
  text-align: center;
}

.footer-links {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
}

.footer-links li a {
  text-decoration: none;
  color: #ccc;
  font-size: 14px;
  transition: color 0.3s ease;
}

.footer-links li a:hover {
  color: orange;
}

.footer-bottom p {
  font-size: 12px;
  color: #666;
}

@media screen and (max-width: 768px) {
  .footer-container {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .footer-column {
    min-width: 100%;
    text-align: center;
  }

  .newsletter {
    flex-direction: column;
    gap: 15px;
  }

  .instagram-gallery {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    padding-top: 15px;
  }

  .footer-links {
    flex-direction: column;
    align-items: center;
  }

  .footer-links li {
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 480px) {
  .footer {
    padding: 30px;
  }

  .footer-column h3 {
    font-size: 18px;
  }

  .footer-column p {
    font-size: 13px;
  }

  .contact-info li span {
    font-size: 14px;
  }

  .newsletter input {
    padding: 8px;
  }

  .newsletter button {
    padding: 8px 12px;
  }

  .tweets li {
    font-size: 12px;
  }

  .footer-bottom p {
    font-size: 10px;
  }
}

`;

// Create and configure template
const template = document.createElement('template');
template.innerHTML = `
    <footer class="footer">
    <div class="footer-container">
      <!-- About Us Section -->
      <div class="footer-column">
        <h3>About Us</h3>
        <p>At E-Clothing, we offer stylish, high-quality fashion for every occasion, ensuring comfort and affordability with every purchase.</p>
        <ul class="contact-info">
          <li><span>📞</span> +94 57-20-357</li>
          <li><span>✉️</span> eclothingweb@gmail.com</li>
        </ul>
        <form class="newsletter">
          <input type="email" placeholder="Enter your e-mail" required>
          <button type="submit">Send</button>
        </form>
      </div>
      <!-- Latest Tweets Section -->
      <div class="footer-column">
        <h3>Latest Tweet</h3>
        <ul class="tweets">
          <li>🕊️ "Discover timeless fashion at E-Clothing! Shop the latest trends, premium styles, and unbeatable quality today. #Fashion #Style #EClothing".</li>
          <li>🕊️ "Discover timeless fashion at E-Clothing! Shop the latest trends, premium styles, and unbeatable quality today. #Fashion #Style #EClothing"</li>
          <li>🕊️ "Discover timeless fashion at E-Clothing! Shop the latest trends, premium styles, and unbeatable quality today. #Fashion #Style #EClothing"</li>
        </ul>
      </div>
      <!-- Instagram Section -->
      <div class="footer-column">
        <h3>Instagram</h3>
        <div class="instagram-gallery">
          <img src="${iconPath}" alt="Instagram 1">
          <img src="${iconPath}" alt="Instagram 2">
        </div>
      </div>
    </div>
    <!-- Footer Links -->
    <div class="footer-bottom">
      <ul class="footer-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Our Works</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Blog</a></li>
        <li><a href="#">Contacts</a></li>
      </ul>
      <p>© 2024 Colorlib. All rights reserved.</p>
    </div>
  </footer>
`;

// Define the Footer custom element
class Footer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style.cloneNode(true));
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    
    connectedCallback() {
        // Any additional setup if needed
        document.querySelector(".newsletter").addEventListener("submit", function (e) {
            e.preventDefault();
            const email = this.querySelector("input").value;
            if (!email || !email.includes("@")) {
              alert("Please enter a valid email address.");
              return;
            }
            alert("Thank you for subscribing!");
            this.reset();
          });
          
    }
}

// Define the custom element
customElements.define('app-footer', Footer);

// Export the custom element class (typically, you use this in your HTML directly)
const FooterApp = () => {
    return `
        <app-footer></app-footer>
    `
}

export { FooterApp };
