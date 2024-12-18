document.addEventListener('DOMContentLoaded', () => {
    // Hide splash screen after 2 seconds
    setTimeout(() => {
        const splashScreen = document.getElementById('splash-screen');
        splashScreen.classList.add('hidden');
        
        // Remove splash screen from DOM after animation completes
        setTimeout(() => {
            splashScreen.remove();
        }, 500);
    }, 2000);

    // Scroll to top functionality
    const scrollButton = document.getElementById('scroll-to-top');
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });

    // Scroll to top when button is clicked
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Santa Animation
    const giftBox = document.getElementById('gift-box');
    const santa = document.getElementById('walking-santa');
    const flyingSanta = document.getElementById('flying-santa');
    const santaSound = document.getElementById('santa-sound');
    let isAnimating = false;

    giftBox.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (isAnimating) return;
        
        isAnimating = true;
        santa.classList.add('active');
        flyingSanta.classList.add('active');
        
        // Play Santa sound
        santaSound.currentTime = 0; // Reset sound to start
        try {
            let playPromise = santaSound.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Playback started successfully
                })
                .catch(error => {
                    console.log("Audio playback failed:", error);
                });
            }
        } catch (error) {
            console.log("Audio playback failed:", error);
        }
        
        // Remove santa and reset after animation completes
        setTimeout(() => {
            santa.classList.remove('active');
            flyingSanta.classList.remove('active');
            isAnimating = false;
        }, 10000); // Match this with animation duration (10s)

        // Remove flying santa earlier since its animation is shorter
        setTimeout(() => {
            flyingSanta.classList.remove('active');
        }, 4000); // Match this with flying animation duration (4s)
    });
});

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting
        if(this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 100;

        if(this.isDeleting) {
            typeSpeed /= 2;
        }

        // If word is complete
        if(!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.getElementById('typed-text');
    const words = [
        'Web Development',
        'Frontend Development',
        'UI / UX Designing'
    ];
    const wait = 3000;
    // Init TypeWriter
    new TypeWriter(txtElement, words, wait);
} 

function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.innerHTML = '❄';
    
    // Array of winter-themed colors
    const colors = [
        '#ffffff', // white
        '#e6f2ff', // light blue
        '#f0f8ff', // alice blue
        '#b3e0ff', // lighter blue
        '#ccf2ff', // very light cyan
    ];
    
    // Select random color
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    snowflake.style.color = randomColor;
    
    // Random starting position
    snowflake.style.left = Math.random() * 100 + 'vw';
    
    // Random animation duration between 5 and 10 seconds
    const animationDuration = Math.random() * 5 + 5;
    snowflake.style.animationDuration = animationDuration + 's';
    
    // Add to container
    document.getElementById('snow-container').appendChild(snowflake);
    
    // Remove snowflake after animation
    setTimeout(() => {
        snowflake.remove();
    }, animationDuration * 1000);
}

// Create new snowflakes every 500ms
setInterval(createSnowflake, 1000);