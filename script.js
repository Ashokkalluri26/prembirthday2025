// Birthday Card Web App
class BirthdayCard {
    constructor() {
        this.mediaFiles = [
            { 
                src: './birthday2024.jpg', 
                type: 'image', 
                caption: 'Happy Birthday 2024 - A year full of joy and memories!' 
            },
            { 
                src: './frdsprem1.jpg', 
                type: 'image', 
                caption: 'With friends - The best times are shared with friends!' 
            },
            { 
                src: './makefunprem.jpg', 
                type: 'image', 
                caption: 'Making fun with you - Life is better when you\'re laughing!' 
            },
            { 
                src: './group_photo.jpg', 
                type: 'image', 
                caption: 'Movie time - Great stories shared together!' 
            },
            { 
                src: './premwithtrip.jpg', 
                type: 'image', 
                caption: 'Teaching moments - Knowledge shared is knowledge multiplied!' 
            },
            { 
                src: './premwithtrip.jpg', 
                type: 'image', 
                caption: 'Adventure time - Exploring the world, one trip at a time!' 
            },
            { 
                src: './snowboyprem.jpg', 
                type: 'image', 
                caption: 'Winter wonderland - Making snow angels and memories!' 
            },
            { 
                src: './group_photo.jpg', 
                type: 'image', 
                caption: 'With friends at the movies - Great times together!' 
            }
        ];
        
        this.currentMediaIndex = 0;
        this.slideInterval = null;
        this.birthDate = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadMedia();
        // Setup cake click after DOM is ready
        setTimeout(() => {
            this.setupCakeClick();
        }, 100);
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('dateForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleBirthdaySubmission();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetCard();
        });

        // Slideshow controls
        document.getElementById('prevBtn').addEventListener('click', () => {
            this.previousSlide();
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            this.nextSlide();
        });
    }

    handleBirthdaySubmission() {
        const birthDateInput = document.getElementById('birthDate').value;
        
        if (!birthDateInput) {
            alert('Please select your birth date!');
            return;
        }

        this.birthDate = new Date(birthDateInput);
        this.calculateAge();
        this.showBirthdayCard();
        this.startCelebration();
        this.startSlideshow();
    }

    calculateAge() {
        const now = new Date();
        const birth = this.birthDate;

        // Calculate exact age in years
        let ageYears = now.getFullYear() - birth.getFullYear();
        const monthDiff = now.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < birth.getDate())) {
            ageYears--;
        }

        // Calculate total time lived
        const totalMilliseconds = now.getTime() - birth.getTime();
        const totalSeconds = Math.floor(totalMilliseconds / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        // Update display with animated counting
        this.animateNumber('ageYears', ageYears);
        this.animateNumber('totalDays', totalDays);
        this.animateNumber('totalHours', totalHours);
        this.animateNumber('totalMinutes', totalMinutes);
        this.animateNumber('totalSeconds', totalSeconds);

        // Continue updating seconds in real-time
        this.startRealTimeUpdate();
    }

    animateNumber(elementId, targetValue) {
        const element = document.getElementById(elementId);
        const duration = 2000; // 2 seconds
        const startTime = Date.now();
        const startValue = 0;

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
            
            element.textContent = currentValue.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    startRealTimeUpdate() {
        // Update seconds counter every second
        setInterval(() => {
            if (this.birthDate) {
                const now = new Date();
                const totalMilliseconds = now.getTime() - this.birthDate.getTime();
                const totalSeconds = Math.floor(totalMilliseconds / 1000);
                document.getElementById('totalSeconds').textContent = totalSeconds.toLocaleString();
                // Start celebration animation
                this.startCelebration();
                // Show the birthday card
                document.getElementById('birthdayForm').classList.add('hidden');
                document.getElementById('birthdayCard').classList.remove('hidden');
                // Setup cake click after card is shown
                setTimeout(() => {
                    this.setupCakeClick();
                }, 500);
            }
        }, 1000);
    }

    showBirthdayCard() {
        document.getElementById('birthdayForm').classList.add('hidden');
        document.getElementById('birthdayCard').classList.remove('hidden');
    }

    resetCard() {
        document.getElementById('birthdayCard').classList.add('hidden');
        document.getElementById('birthdayForm').classList.remove('hidden');
        document.getElementById('birthDate').value = '';
        this.stopSlideshow();
        this.currentMediaIndex = 0;
    }

    startCelebration() {
        // Add celebration class for animation
        document.querySelector('.celebration-header').classList.add('celebration');
    }

    createBalloons() {
        const balloonContainer = document.getElementById('balloonContainer');
        const balloonEmojis = ['🎈'];
        
        // Clear existing balloons
        balloonContainer.innerHTML = '';

        // Create multiple waves of balloons
        for (let wave = 0; wave < 3; wave++) {
            setTimeout(() => {
                for (let i = 0; i < 15; i++) {
                    setTimeout(() => {
                        this.createSingleBalloon(balloonContainer, balloonEmojis);
                    }, i * 200);
                }
            }, wave * 1500);
        }
    }

    setupCakeClick() {
        // Wait for birthday card to be visible
        const checkAndSetup = () => {
            const cake = document.getElementById('birthdayCake');
            const cakeMessage = document.getElementById('cakeMessage');
            
            if (cake && cakeMessage) {
                console.log('Setting up cake click event');
                cake.addEventListener('click', () => {
                    console.log('Cake clicked!');
                    cakeMessage.textContent = '🎉 Happy Birthday Prem! 🎉';
                    cakeMessage.style.fontSize = '1.8em';
                    cakeMessage.style.color = '#ff6b9d';
                    cakeMessage.style.textShadow = '0 0 15px rgba(255, 107, 157, 0.8)';
                    
                    // Add celebration effect
                    cake.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        cake.style.transform = 'scale(1)';
                    }, 300);
                });
            } else {
                console.log('Cake elements not found, retrying...');
                setTimeout(checkAndSetup, 500);
            }
        };
        
        checkAndSetup();
    }

    createSingleBalloon(container, emojis) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random horizontal position
        balloon.style.left = Math.random() * 100 + '%';
        
        // Random animation duration
        balloon.style.animationDuration = (3 + Math.random() * 2) + 's';
        
        // Random horizontal drift
        balloon.style.animationName = 'float-up';
        
        container.appendChild(balloon);
        
        // Remove balloon after animation
        setTimeout(() => {
            if (balloon.parentNode) {
                balloon.parentNode.removeChild(balloon);
            }
        }, 5000);
    }

    setupSlideshow() {
        this.loadMedia(0);
        this.createIndicators();
    }

    loadMedia(index) {
        const mediaContainer = document.getElementById('mediaContainer');
        const captionElement = document.getElementById('mediaCaption');
        const media = this.mediaFiles[index];

        // Clear previous media
        mediaContainer.innerHTML = '';

        if (media.type === 'image') {
            const mediaElement = document.createElement('img');
            mediaElement.src = media.src;
            mediaElement.alt = media.caption;
            mediaElement.className = 'media-item';
            mediaElement.style.opacity = '0';
            
            mediaElement.addEventListener('load', () => {
                this.fadeInMedia(mediaElement);
            });
            mediaElement.addEventListener('error', () => {
                console.error('Failed to load image:', media.src);
                mediaElement.style.opacity = '1';
            });

            mediaContainer.appendChild(mediaElement);
        } else if (media.type === 'video') {
            const mediaElement = document.createElement('video');
            mediaElement.className = 'media-item';
            mediaElement.controls = true;
            mediaElement.muted = true;
            mediaElement.autoplay = false;
            mediaElement.preload = 'auto';
            mediaElement.style.width = '100%';
            mediaElement.style.height = '100%';
            mediaElement.style.objectFit = 'cover';
            mediaElement.style.background = '#000';
            mediaElement.style.opacity = '0';
            
            // Set source directly
            mediaElement.src = media.src;
            
            // Add event listeners
            mediaElement.addEventListener('loadeddata', () => {
                this.fadeInMedia(mediaElement);
            });
            
            mediaElement.addEventListener('canplay', () => {
                this.fadeInMedia(mediaElement);
            });
            
            mediaElement.addEventListener('error', (e) => {
                console.error('Video error:', e);
                // Show a placeholder message
                mediaElement.style.opacity = '1';
                mediaElement.style.display = 'flex';
                mediaElement.style.alignItems = 'center';
                mediaElement.style.justifyContent = 'center';
                mediaElement.style.color = 'white';
                mediaElement.innerHTML = '<div style="text-align: center; padding: 20px;">🎬<br>Video Loading...</div>';
            });
            
            // Force load
            mediaElement.load();
            
            mediaContainer.appendChild(mediaElement);
        }

        // Fallback for immediate display
        setTimeout(() => {
            const element = media.type === 'video' ? 
                mediaContainer.querySelector('video') : 
                mediaContainer.querySelector('img');
            if (element) {
                this.fadeInMedia(element);
            }
        }, 1000);

        captionElement.textContent = media.caption;
        this.updateIndicators(index);
    }

    fadeInMedia(element) {
        element.style.transition = 'opacity 0.5s ease-in-out';
        element.style.opacity = '1';
    }

    createIndicators() {
        const indicatorsContainer = document.getElementById('indicators');
        indicatorsContainer.innerHTML = '';

        this.mediaFiles.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator';
            if (index === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
            
            indicatorsContainer.appendChild(indicator);
        });
    }

    updateIndicators(activeIndex) {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndex);
        });
    }

    nextSlide() {
        this.currentMediaIndex = (this.currentMediaIndex + 1) % this.mediaFiles.length;
        this.loadMedia(this.currentMediaIndex);
    }

    previousSlide() {
        this.currentMediaIndex = (this.currentMediaIndex - 1 + this.mediaFiles.length) % this.mediaFiles.length;
        this.loadMedia(this.currentMediaIndex);
    }

    goToSlide(index) {
        this.currentMediaIndex = index;
        this.loadMedia(this.currentMediaIndex);
    }

    startSlideshow() {
        // Auto-advance slides every 5 seconds
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopSlideshow() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Initialize the birthday card when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayCard();
});

// Add some extra sparkle effects
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-primary') || e.target.classList.contains('btn-secondary')) {
        createSparkleEffect(e.target);
    }
});

function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    const sparkles = ['✨', '⭐', '🌟', '💫'];
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'fixed';
            sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
            sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = 'sparkleFloat 1s ease-out forwards';
            
            document.body.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 1000);
        }, i * 100);
    }
}

// Add sparkle animation CSS
const sparkleCSS = `
@keyframes sparkleFloat {
    0% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    100% {
        opacity: 0;
        transform: translateY(-50px) scale(0.5);
    }
}
`;

const style = document.createElement('style');
style.textContent = sparkleCSS;
document.head.appendChild(style);
