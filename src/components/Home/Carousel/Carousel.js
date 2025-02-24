import { Header } from "../../../common/Header.js";

const videoone = 'src/assets/video/8561149-hd_1920_1080_25fps.mp4';
const videotwo = 'src/assets/video/10491729-hd_1920_1080_25fps.mp4';
const videothree = 'src/assets/video/8084289-uhd_3840_2160_24fps.mp4';
const videofour = 'src/assets/video/4k1.mp4';

const template = document.createElement('template');
template.innerHTML = `
<div class="background-container">
    <app-header class="header-overlay"></app-header>
    <video id="video-player" class="background-image" autoplay muted loop>
        <source src="/src/assets/video/6008256_4k_Attractive_3840x2160.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>
    <div class="overlay-content">
        <p class="button">Elevate Your Style with Effortless Elegance.</p>
        <button class="button" data-text="Awesome">
            <span class="actual-text">&nbsp;SHOP&nbspNOW&nbsp;</span>
            <span aria-hidden="true" class="hover-text">&nbsp;SHOP&nbspNOW&nbsp;</span>
        </button>
    </div>
</div>
`;

const style = document.createElement('style');
style.textContent = `
/* Base styles */
.background-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

.background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.header-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    color: white;
    padding: 10px 20px;
    background: rgba(182, 194, 132, 0.03);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.4px);
    -webkit-backdrop-filter: blur(4.4px);
    margin-top: 0.5px;
}

.overlay-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: white;
    z-index: 1;
    margin-top: 280px;
}

.overlay-content p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
    color: white;
}

.overlay-button {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.overlay-button:hover {
    background-color: rgba(255, 255, 255, 1);
}

.button {
    margin: 0;
    height: auto;
    background: transparent;
    padding: 0;
    border: none;
    cursor: pointer;
}

/* button styling */
.button {
    --border-right: 6px;
    --text-stroke-color: rgba(255, 255, 255, 0.6);
    --animation-color: #37FF8B;
    --fs-size: 2em;
    letter-spacing: 3px;
    text-decoration: none;
    font-size: var(--fs-size);
    font-family: "Arial";
    position: relative;
    text-transform: uppercase;
    color: transparent;
    -webkit-text-stroke: 1px var(--text-stroke-color);
}

/* text when hovering on the button */
.hover-text {
    position: absolute;
    box-sizing: border-box;
    content: attr(data-text);
    color: var(--animation-color);
    width: 0%;
    inset: 0;
    border-right: var(--border-right) solid var(--animation-color);
    overflow: hidden;
    transition: 0.5s;
    -webkit-text-stroke: 1px var(--animation-color);
}

/* hover */
.button:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 23px var(--animation-color))
}

/* Media Queries */

/* For tablet screens */
@media screen and (max-width: 768px) {
    .overlay-content p {
        font-size: 1rem; /* Reduce text size */
    }

    .text {
        font-size: 60px; /* Reduce text size for smaller screens */
        right: -200px; /* Adjust positioning */
    }

    .header-overlay {
        padding: 8px 16px; /* Adjust padding */
    }

    .button {
        --fs-size: 1.5em; /* Reduce button font size */
    }

    #video-container {
        height: 50vh; /* Reduce video container height */
    }
}

/* For mobile screens */
@media screen and (max-width: 480px) {
    .overlay-content {
        margin-top: 150px; /* Adjust the margin */
    }

    .overlay-content p {
        font-size: 1rem; /* Smaller text for mobile */
        margin-bottom: 1rem;
    }

    .text {
        font-size: 40px; /* Adjust text size for mobile */
        right: -150px; /* Adjust text positioning */
    }

    .header-overlay {
        padding: 5px 10px; /* Adjust header padding */
    }

    .button {
        --fs-size: 1.2em; /* Reduce button font size for mobile */
    }

    #video-container {
        height: 40vh; /* Further reduce video height */
    }
}
`;

class Carousel extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const videoPlayer = this.shadowRoot.querySelector('#video-player');
        const videos = [videoone, videotwo, videothree, videofour];
    
        let currentVideoIndex = 0;
    
        const loadAndPlayVideo = (index) => {
            console.log(`Loading video at index: ${index}`);
            currentVideoIndex = index;
            videoPlayer.src = videos[currentVideoIndex];
            videoPlayer.load();  // Ensure the video is fully loaded before playing
            videoPlayer.play().catch((err) => console.error('Error playing video:', err));
        };
    
        const playNextVideo = () => {

            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            loadAndPlayVideo(currentVideoIndex);
        };
    
        videoPlayer.addEventListener('ended', playNextVideo); // Automatically plays next video when the current one ends
        videoPlayer.addEventListener('click', playNextVideo); // Plays next video on click
    
        // Ensure that the video starts by playing the first video
        loadAndPlayVideo(currentVideoIndex);
    }
}

customElements.define('carousel-box', Carousel);

export default Carousel;
