// Toggle play/pause button
const playPauseBtn = document.querySelector('.play-pause');
const playPauseIcon = playPauseBtn.querySelector('i');

playPauseBtn.addEventListener('click', () => {
    if (playPauseIcon.classList.contains('fa-play')) {
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    } else {
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    }
});

// Update progress bar on click
const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');

progressBar.addEventListener('click', (e) => {
    const progressBarWidth = progressBar.clientWidth;
    const clickPosition = e.offsetX;
    const progressPercentage = (clickPosition / progressBarWidth) * 100;
    
    progress.style.width = `${progressPercentage}%`;
    
    // Update current time (simulated)
    const totalTime = 200; // 3:20 in seconds
    const currentTime = (progressPercentage / 100) * totalTime;
    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);
    
    document.querySelector('.time.current').textContent = 
        `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

// Toggle favorite heart
const heartIcons = document.querySelectorAll('.fa-heart');

heartIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = 'var(--danger)';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
        }
    });
});

// Card hover effects
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
        card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = 'none';
    });
});

// Track hover effects
const tracks = document.querySelectorAll('.track');

tracks.forEach(track => {
    track.addEventListener('mouseenter', () => {
        track.style.background = 'rgba(255, 255, 255, 0.08)';
    });
    
    track.addEventListener('mouseleave', () => {
        track.style.background = '';
    });
});

// Navigation active state
const navLinks = document.querySelectorAll('.nav-links li');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(item => item.classList.remove('active'));
        link.classList.add('active');
    });
});

// Simulate music playing with progress update
let isPlaying = false;
let progressInterval;

function simulatePlayback() {
    if (isPlaying) {
        progressInterval = setInterval(() => {
            const progressBar = document.querySelector('.progress');
            const currentWidth = parseFloat(progressBar.style.width) || 0;
            
            if (currentWidth < 100) {
                progressBar.style.width = `${currentWidth + 0.1}%`;
                
                // Update current time
                const totalTime = 200;
                const currentTime = (currentWidth / 100) * totalTime;
                const minutes = Math.floor(currentTime / 60);
                const seconds = Math.floor(currentTime % 60);
                
                document.querySelector('.time.current').textContent = 
                    `${minutes}:${seconds.toString().padStart(2, '0')}`;
            } else {
                clearInterval(progressInterval);
                playPauseIcon.classList.remove('fa-pause');
                playPauseIcon.classList.add('fa-play');
                isPlaying = false;
            }
        }, 100);
    } else {
        clearInterval(progressInterval);
    }
}

playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    simulatePlayback();
});