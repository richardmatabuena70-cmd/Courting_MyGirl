// Placeholder texts for the bubble (change these as needed)
const placeholderTexts = [
    "we sure kana?",
    "ayaw mo talaga?",
    "isang beses lang oh please?",
    "no talaga?💔",
    "awts ayaw mo?",
    "try mo naman yung yes",
    "awts yes or yes?",
    "minsan lang yes mo na?",
    "I really like you!",
    "Don't say noo!"
];

let textIndex = 0;
const noBtn = document.getElementById('no-btn');
const bubbleContainer = document.getElementById('bubble-container');

// Move button to random position on click
function moveButton(event) {
    event.stopPropagation();
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate safe area (keep button fully visible on screen)
    const padding = 30;
    const maxX = viewportWidth - btnRect.width - padding * 2;
    const maxY = viewportHeight - btnRect.height - padding * 2;
    
    // Random position within the viewport
    const randomX = Math.random() * maxX + padding;
    const randomY = Math.random() * maxY + padding;
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '1000';
    
    // Create bubble with text
    const bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    bubble.textContent = placeholderTexts[textIndex];
    bubbleContainer.innerHTML = ''; // Clear old bubbles
    bubbleContainer.appendChild(bubble);
    
    // Position bubble above button
    bubbleContainer.style.left = randomX + 'px';
    bubbleContainer.style.top = (randomY - 50) + 'px';
    
    // Change text index
    textIndex = (textIndex + 1) % placeholderTexts.length;

    // Remove bubble after 1.5 seconds
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.style.opacity = '0';
            bubble.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.remove();
                }
            }, 300);
        }
    }, 1500);
}

// Say Yes!
function sayYes() {
    document.getElementById('question-screen').classList.add('hidden');
    document.getElementById('yes-screen').style.display = 'block';
    createCelebration();
}

// Create floating hearts animation for yes screen
function createCelebration() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = ['❤️', '💕', '💗', '💖', '💘'][Math.floor(Math.random() * 5)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.animation = `float ${Math.random() * 3 + 2}s ease-out forwards`;
            heart.style.zIndex = '100';
            document.body.appendChild(heart);
            
            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}

// Create background floating hearts
function createBackgroundHearts() {
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.animationDelay = Math.random() * 5 + 's';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        document.body.appendChild(heart);
    }
}

// Create falling tulips animation
function createFallingTulip() {
    const tulip = document.createElement('div');
    tulip.innerHTML = '🌷';
    tulip.style.position = 'fixed';
    tulip.style.left = Math.random() * 100 + 'vw';
    tulip.style.top = '-50px';
    tulip.style.fontSize = (Math.random() * 20 + 20) + 'px';
    tulip.style.animation = `fallTulip ${Math.random() * 3 + 4}s linear forwards`;
    tulip.style.zIndex = '1';
    tulip.style.opacity = '0.7';
    document.body.appendChild(tulip);

    // Remove tulip after animation
    setTimeout(() => {
        tulip.remove();
    }, 7000);
}

// Start falling tulips loop
function startFallingTulips() {
    createFallingTulip();
    // Create new tulip every 300ms
    setInterval(createFallingTulip, 300);
}

// Add falling tulip animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fallTulip {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
        }
        100% {
            transform: translateY(110vh) rotate(360deg);
            opacity: 0.3;
        }
    }
`;
document.head.appendChild(style);

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    createBackgroundHearts();
    startFallingTulips();
    
    // Add click event to No button
    if (noBtn) {
        noBtn.addEventListener('click', moveButton);
    }
    
    // Add click event to Yes button
    const yesBtn = document.querySelector('.btn-yes');
    if (yesBtn) {
        yesBtn.addEventListener('click', sayYes);
    }
});
