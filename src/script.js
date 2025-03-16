// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particles background
    initializeParticles();
    
    // Initialize loading sequence
    initializeLoading();
    
    // Initialize interactive elements after main content loads
    initializeInteractiveElements();
    
    // Initialize syntax highlighting
    initializeSyntaxHighlighting();
    
    // Initialize the glitch text effect
    animateGlitchText();
    
    // Initialize the hero section after the loading screen
    setTimeout(() => {
        initializeHeroSection();
    }, 3500); // Wait a bit after the loading screen
});

/**
 * Initialize particles background for a premium feel
 */
function initializeParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-background';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    document.body.insertBefore(canvas, document.body.firstChild);
    
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Particle properties
    const particlesArray = [];
    const numberOfParticles = 80;
    
    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: Math.random() * 0.6 - 0.3,
            speedY: Math.random() * 0.6 - 0.3,
            opacity: Math.random() * 0.3 + 0.1,
            color: Math.random() > 0.5 ? 'rgba(80, 227, 194, ' : 'rgba(139, 92, 246, '
        });
    }
    
    // Draw and update particles
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particlesArray.length; i++) {
            const p = particlesArray[i];
            
            // Draw particle
            ctx.fillStyle = p.color + p.opacity + ')';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
            
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
        }
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

/**
 * Initialize loading screen with enhanced animations
 */
function initializeLoading() {
    const loaderText = document.querySelector('.loader-text');
    const statusDot = document.querySelector('.status-dot');
    const statusText = document.querySelector('.status-text');
    const loadingScreen = document.querySelector('.loading-screen');
    const finalAnimation = document.querySelector('.loading-final-animation');
    const finalLogo = document.querySelector('.final-logo');
    const finalRays = document.querySelector('.final-rays');
    const finalParticles = document.querySelector('.final-particles');
    const mainContent = document.querySelector('.main-content');
    const gaugeReading = document.querySelector('.gauge-reading');
    const chamberFill = document.querySelector('.chamber-fill');
    const chamberCore = document.querySelector('.chamber-core');
    
    // Ensure main content is hidden during load
    mainContent.classList.add('hidden');
    document.body.classList.add('loading');
    
    // Add dynamic particles to the chamber
    createParticles();
    
    // Dynamic gauge update
    let progress = 0;
    const gaugeInterval = setInterval(() => {
        progress += 1;
        if (progress <= 100) {
            gaugeReading.textContent = `${progress}%`;
            
            // Increase glow intensity as chamber fills
            if (chamberCore) {
                const glowSize = 5 + (progress / 5);
                const glowOpacity = 0.5 + (progress / 200);
                chamberCore.style.boxShadow = `0 0 ${glowSize}px rgba(80, 227, 194, ${glowOpacity})`;
                
                // Change chamber core color gradually
                if (progress > 80) {
                    chamberCore.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(80, 227, 194, 0.8) 60%)';
                } else if (progress > 50) {
                    chamberCore.style.background = 'radial-gradient(circle, rgba(80, 227, 194, 0.8) 0%, rgba(139, 92, 246, 0.8) 100%)';
                }
            }
        } else {
            clearInterval(gaugeInterval);
        }
    }, 40); // Update every 40ms for a 4-second total (100 * 40ms = 4000ms = 4s)
    
    // Create dynamic particles
    function createParticles() {
        const particlesContainer = document.querySelector('.chamber-particles');
        if (!particlesContainer) return;
        
        // Create dynamic particle elements
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('dynamic-particle');
            
            // Random position
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 3 + 1;
            
            // Random animation duration
            const duration = Math.random() * 5 + 3;
            
            // Random animation delay
            const delay = Math.random() * 5;
            
            // Set styles
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                top: ${top}%;
                background-color: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                box-shadow: 0 0 ${size}px rgba(80, 227, 194, 0.5);
                animation: floatParticle ${duration}s ease-in-out infinite;
                animation-delay: -${delay}s;
                opacity: 0;
            `;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    // Add keyframes for floating particles
    const styleSheet = document.styleSheets[0];
    const keyframes = `
    @keyframes floatParticle {
        0% { transform: translate(0, 0); opacity: 0; }
        25% { opacity: 0.7; }
        50% { transform: translate(10px, -10px); opacity: 0.5; }
        75% { opacity: 0.7; }
        100% { transform: translate(0, 0); opacity: 0; }
    }`;
    
    try {
        styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    } catch (e) {
        console.log("Could not add keyframes: ", e.message);
    }
    
    // Make the typing animation more realistic
    const typeWriter = (element, text, i = 0, speed = 30) => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(element, text, i, speed), speed);
        }
    };
    
    // Loading text animation with typing effect
    let loadingMessages = [
        "INITIALIZING SYSTEM",
        "ESTABLISHING CONNECTION",
        "LOADING INTERFACE",
        "CONFIGURING ENVIRONMENT",
        "CALIBRATING CHAMBER",
        "ENERGIZING CORE",
        "FINALIZING SETUP"
    ];
    
    let currentMsgIndex = 0;
    const updateLoadingText = () => {
        // Clear previous text
        loaderText.textContent = "";
        // Type new text
        typeWriter(loaderText, loadingMessages[currentMsgIndex]);
        currentMsgIndex = (currentMsgIndex + 1) % loadingMessages.length;
    };
    
    // Start the text cycling with typing effect
    updateLoadingText();
    let textInterval = setInterval(updateLoadingText, 2000); // Adjusted timing for typing effect
    
    // Update status text
    setTimeout(() => {
        statusDot.style.backgroundColor = "#FFC107"; // warning color
        statusText.textContent = "CONNECTING";
    }, 800);
    
    setTimeout(() => {
        statusDot.style.backgroundColor = "#4CD964"; // success color
        statusText.textContent = "CONNECTED";
    }, 2500);
    
    // Sync with the CSS animation duration for the chamber fill (4s)
    setTimeout(() => {
        clearInterval(textInterval);
        clearInterval(gaugeInterval);
        loaderText.textContent = "CHAMBER ENERGIZED";
        gaugeReading.textContent = "100%";
        
        // Energizing complete effect
        if (chamberCore) {
            chamberCore.style.boxShadow = '0 0 30px rgba(255, 255, 255, 0.8)';
            chamberCore.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(80, 227, 194, 0.9) 70%)';
            chamberCore.style.transform = 'translate(-50%, -50%) scale(1.3)';
            
            // Create energy pulse effect
            const energyPulse = document.createElement('div');
            energyPulse.classList.add('energy-pulse');
            document.querySelector('.loader-chamber').appendChild(energyPulse);
            
            // Pulse effect
            setTimeout(() => {
                chamberCore.style.transition = 'all 0.5s ease-out';
                chamberCore.style.transform = 'translate(-50%, -50%) scale(1.8)';
                chamberCore.style.opacity = '0.9';
                
                // Add audible ping sound
                const pingSound = new Audio('data:audio/wav;base64,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qqusra6vsLGys7S1tre4ubq7vL2+v8DBwsPExcbHyMnKy8zNzs/Q0dLT1NXW19jZ2ttKTlJVWVxfYmVoanBzd3p9gIOGiYyOkZOVl5mcnp+ho6SlpqipqqusrK2trq6vr7CwsLCwsLCwsLCwsbGxsbGxsbGxsbKysrKysrOzs7S0tLW1tre3uLm5uru8vb6/wMDBwsPExcbHyMjJysrLzMzNzc7Oz9DQ0dHR0tLS09PT09TU1NTU1NTV1dXV1dXV1dXV1tbW1tbW1tbW1tbW1tbW1tbW19fX19fX19fX19fX19fX2NjY2NjY2NjY2NjY2dnZ2dnZ2dnZ2dnZ2tra2tra2tra2tra2tra29vb29vb29vb3Nzc3Nzc3Nzc3Nzc3d3d3d3d3d3d3t7e3t7e3t7e39/f39/f39/f4ODg4ODg4eHh4eHh4uLi4uLi4uPj4+Pj4+Tk5OTk5OXl5eXl5ebm5ubm5ufn5+fn6Ojo6Ojp6enp6enq6urq6urr6+vr6+vs7Ozs7Ozt7e3t7e3t7u7u7u7u7+/v7+/v8PDw8PDw8fHx8fHx8vLy8vLy8/Pz8/Pz9PT09PT09fX19fX29vb29vb39/f39/f4+Pj4+Pj5+fn5+fn6+vr6+vv7+/v7+/z8/Pz8/P39/f39/v7+/v7+///////////////+/v7+/v39/f39/Pz8/Pz8+/v7+/v7+vr6+vr6+fn5+fn5+Pj4+Pj39/f39/f29vb29vb19fX19fX09PT09PTz8/Pz8/Py8vLy8vHx8fHx8fDw8PDw7+/v7+/v7u7u7u7u7e3t7e3t7Ozs7Ozs6+vr6+vr6urq6urq6enp6enp6Ojo6Ojo5+fn5+fn5ubm5ubl5eXl5eXl5OTk5OTkAwMGCAoNDxEUFhkbHiAiJScoKiwuMDI0Njg6PD5AQUNFR0lLTU9RU1VXWFpcXmBhY2VmaGlrbG5vcHFzdHV2d3h5ent8fX5/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaXmJmam5ydnp+goaKjpKWmp6ipqqusra6vsLGys7S1tre4ubq7vL2+v8DAwcLCw8TExcXGxsfHyMjJycrKy8vMzM3Nzs7Pz9DQ0dHS0tPT1NTV1dbW19fY2NnZ2trc3N3d3t7f3+Dg4eHi4uPj5OTl5ebm5+fo6Onp6urr6+zs7e3u7u/v8PDx8fLy8/P09PX19vb39/j4+fn6+vv7/Pz9/f7+//8AAf0B+wL5A/cE9QXzB/EI7grsC+kN5g/kEN8S3BPaFNYW0xfQGM0ZyhrHG8UcwhzAHb0euB+1ILIhryGsIqkjpiOjJKEkniWbJpgmlieTKJAojimMKYkqhyqEK4EsfS16LnYvcC9tMGkxZTJhM10zWjRWNVI2TTdKOEU5QTo9Ozk8NTwxPSw+Kj8lQCFBHUIZQxREEEUMRgdHA0b/RftG90bzR+9I60nmSuJL3kzazdKYhXp0bWdiW1dQSkM+NzEsJyIeGRUSDgsFAv37+Pby8O7r6Ofl4uDd29nW1NPQzszLyMXEwb+9vLq4t7a0s7KxsK+vrq6urayurq+vsLGys7W2uLm7vL/Aw8XIysvN0NLU1tna3N7g4ePl5+jr7O7w8vT29/n7/P////////////////////////////////////////////////////3693Py7uzq5+Xi3tnV0s7KxcG9ureyrrCrpqOfm5WSjouHhIB9eXZzcW5saWdlY2FfXl1cW1pZWVhYWFhYWVlaWltcXV5fYWJkZmdpa21vcXN1d3l7fX+Bg4aIioyPkZOVmJqdoKKlp6qtsbS3ur3Aw8XJzM/T1tne4uXq7vL2+v7/AgcLDxQYHSEley1JO0xdbnmEjpadprK7wsfM0dXZ3eDk5+rv8fT3+fv9/v///v38+/n39fPx7+3r6ejm5OPh39/d3NvZ2NfW1dTT0tLRz9DOzc3My8vLysnJycnJycnJysvLzMzNzs/Q0dLT1NXW19jZ2tvc3d7f4OHj5OXm5+nq6+zt7/Dx8vP19vf4+vv8/v8AAwcLDxMXGyAkKCwxNTk+QkdLUFRYXWJmaWxwc3d6foGFiIuPkpaZnaCkp6qtsLO2ubzAxMfKzdDT1tjb3uDj5unr7vDz9fj6/P4AAgQGCAsNDxEUFhgaHB8hIyUoKiwuMDI0Nzo8PkBBQ0VHSUpNTlBSU1VXWFpcXV9hYmRlZ2lqa2xtb3BxcnR1dnd4eXp7fX5/gIGCg4SFhoeIiYqLjI2Oj5CRkpOUlZaWl5iYmZqam5ucnJ2dnp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7/////////////////////////////////////////////////////////////////////////');
                pingSound.volume = 0.5;
                pingSound.play();
                
                setTimeout(() => {
                    chamberCore.style.transform = 'translate(-50%, -50%) scale(0.8)';
                    chamberCore.style.opacity = '0.7';
                    
                    setTimeout(() => {
                        chamberCore.style.transform = 'translate(-50%, -50%) scale(5)';
                        chamberCore.style.opacity = '0';
                        loadingScreen.classList.add('loading-complete');
                    }, 300);
                }, 300);
            }, 300);
        }
        
        setTimeout(() => {
            // Hide loading screen
            loadingScreen.style.opacity = "0";
            
            // Trigger final animation
            finalAnimation.classList.add('active');
            setTimeout(() => finalLogo.classList.add('active'), 100);
            setTimeout(() => finalRays.classList.add('active'), 600);
            setTimeout(() => finalParticles.classList.add('active'), 800);
            
            // Hide final animation and show content
            setTimeout(() => {
                finalAnimation.style.opacity = 0;
                finalAnimation.style.transition = 'opacity 0.8s ease-out';
                
                document.body.classList.remove('loading');
                mainContent.classList.remove('hidden');
                mainContent.classList.add('fade-in');
                
                // Initialize all components once loading is complete
                initializeNavbar();
                initializeInteractiveElements();
                initializeSyntaxHighlighting();
                initializeScrollAnimations();
                animateGlitchText();
                animateCodeBlocks();
                initializeTerminal();
                initializePricingToggle();
                initializeFAQAccordion();
                initializeHeroSection();
                initializePricing();
                initializeFAQ();
                
                // Remove loading elements from DOM after transition completes
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    finalAnimation.style.display = 'none';
                }, 1000);
            }, 3000);
        }, 1800);
    }, 4200); // Slightly longer than the fill animation (4s) to ensure it completes
}

/**
 * Initialize all interactive elements
 */
function initializeInteractiveElements() {
    // Navigation link highlighting with magnetic effect
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Add magnetic effect
        link.addEventListener('mousemove', (e) => {
            const bounds = link.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            const offsetX = (x - centerX) * 0.2;
            const offsetY = (y - centerY) * 0.2;
            
            link.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate(0, 0)';
        });
        
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Enhanced button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const bounds = button.getBoundingClientRect();
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            
            button.style.setProperty('--x-pos', `${x}px`);
            button.style.setProperty('--y-pos', `${y}px`);
        });
    });
    
    // Terminal animation
    initializeTerminal();
    
    // Code container 3D effect
    const codeContainer = document.querySelector('.code-container');
    if (codeContainer) {
        codeContainer.addEventListener('mousemove', (e) => {
            const bounds = codeContainer.getBoundingClientRect();
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            
            const rotateY = ((x - centerX) / centerX) * 10;
            const rotateX = -((y - centerY) / centerY) * 10;
            
            codeContainer.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        codeContainer.addEventListener('mouseleave', () => {
            codeContainer.style.transform = 'perspective(1000px) rotateX(0) rotateY(-5deg) translateZ(0)';
        });
    }
    
    // Feature cards 3D effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const bounds = card.getBoundingClientRect();
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            
            const rotateY = ((x - centerX) / centerX) * 5;
            const rotateX = -((y - centerY) / centerY) * 5;
            
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            card.style.boxShadow = `
                0 15px 35px rgba(0, 0, 0, 0.2),
                ${rotateY * 0.5}px ${rotateX * -0.5}px 20px rgba(76, 217, 100, 0.1)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });
    });
    
    // Initialize typing animation for code blocks
    animateCodeBlocks();
    
    // Initialize pricing toggle
    initializePricingToggle();
    
    // Initialize FAQ accordion
    initializeFAQAccordion();
}

/**
 * Initialize scroll-based animations with enhanced effects
 */
function initializeScrollAnimations() {
    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.feature-card, .pricing-card, .terminal, .hero-content h1, .hero-content p, .hero-buttons, .hero-stats');
    
    // Create an intersection observer with enhanced animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
                
                // Add staggered animation to children if applicable
                if (entry.target.classList.contains('hero-buttons') || 
                    entry.target.classList.contains('hero-stats') ||
                    entry.target.classList.contains('features-grid')) {
                        
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, 100 * index);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
    });
    
    // Observe each element
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Parallax effect for sections
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const offsetTop = section.offsetTop;
            const distance = scrollPosition - offsetTop;
            
            if (Math.abs(distance) < window.innerHeight) {
                section.style.backgroundPositionY = `${distance * 0.1}px`;
                
                // Parallax for section children
                const firstLevelChildren = section.querySelectorAll(':scope > div > *:not(div)');
                firstLevelChildren.forEach((child, index) => {
                    const factor = 0.05 * (index % 3 + 1);
                    child.style.transform = `translateY(${distance * factor}px)`;
                });
            }
        });
    });
    
    // Enhanced sticky nav effect
    const nav = document.querySelector('nav');
    let lastScrollPosition = 0;
    
    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;
        
        if (currentScrollPosition > 100) {
            nav.classList.add('nav-scrolled');
            
            // Hide nav when scrolling down, show when scrolling up
            if (currentScrollPosition > lastScrollPosition) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        } else {
            nav.classList.remove('nav-scrolled');
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollPosition = currentScrollPosition;
    });
}

/**
 * Initialize terminal typing animation with enhanced effects
 */
function initializeTerminal() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    let currentIndex = 0;
    
    // Terminal glow effect
    const terminal = document.querySelector('.terminal');
    if (terminal) {
        terminal.classList.add('terminal-glow');
    }
    
    // Hide all lines except the first
    for (let i = 1; i < terminalLines.length; i++) {
        terminalLines[i].style.display = 'none';
    }
    
    // Function to show a line with typing animation
    function showLine(index) {
        if (index >= terminalLines.length) return;
        
        const line = terminalLines[index];
        line.style.display = 'flex';
        
        // If it's a prompt line (with user input), animate typing
        if (line.querySelector('.terminal-prompt')) {
            const promptContent = line.textContent.replace('$', '').trim();
            const promptSpan = line.querySelector('.terminal-prompt');
            
            // Reset content to just the prompt
            if (!line.querySelector('.terminal-cursor')) {
                line.innerHTML = '';
                line.appendChild(promptSpan);
                
                // Add cursor
                const cursor = document.createElement('span');
                cursor.classList.add('terminal-cursor');
                line.appendChild(cursor);
                
                // Animate typing with variable speed for realism
                let charIndex = 0;
                let typeDelay = 0;
                
                const typeInterval = setInterval(() => {
                    if (charIndex < promptContent.length) {
                        cursor.insertAdjacentText('beforebegin', promptContent[charIndex]);
                        
                        // Add random typing speed variations for realism
                        typeDelay = Math.random() > 0.8 ? 300 : 50 + Math.random() * 50;
                        
                        charIndex++;
                    } else {
                        clearInterval(typeInterval);
                        
                        // Show next line after brief pause
                        setTimeout(() => {
                            // Remove cursor from current line
                            if (cursor) cursor.remove();
                            
                            // Show next line
                            currentIndex++;
                            showLine(currentIndex);
                        }, 500);
                    }
                }, typeDelay);
            } else {
                // If this is the last line with cursor, don't advance
                if (index === terminalLines.length - 1) return;
                
                // Advance to next line
                currentIndex++;
                showLine(currentIndex);
            }
        } else {
            // For output lines, show with a subtle fade-in effect
            line.classList.add('terminal-line-reveal');
            
            setTimeout(() => {
                currentIndex++;
                showLine(currentIndex);
            }, 500);
        }
    }
    
    // Start the animation after a short delay
    setTimeout(() => {
        showLine(currentIndex);
    }, 1000);
}

/**
 * Initialize syntax highlighting for code blocks
 */
function initializeSyntaxHighlighting() {
    const codeElements = document.querySelectorAll('.code-container code');
    
    // Lua specific syntax highlighting
    const luaKeywords = [
        'and', 'break', 'do', 'else', 'elseif', 'end', 'false', 'for', 'function', 
        'if', 'in', 'local', 'nil', 'not', 'or', 'repeat', 'return', 'then', 
        'true', 'until', 'while'
    ];
    
    const luaBuiltInFunctions = [
        'print', 'error', 'assert', 'collectgarbage', 'dofile', 'getmetatable', 
        'ipairs', 'load', 'loadfile', 'next', 'pairs', 'pcall', 'rawequal', 
        'rawget', 'rawset', 'require', 'select', 'setmetatable', 'tonumber', 
        'tostring', 'type', 'xpcall'
    ];
    
    codeElements.forEach(codeElement => {
        if (codeElement.classList.contains('language-lua')) {
            let content = codeElement.innerHTML;
            
            // Store original content to prevent double-highlighting
            const originalContent = content;
            
            // Create regex patterns for different code elements
            const keywordPattern = new RegExp(`\\b(${luaKeywords.join('|')})\\b`, 'g');
            const builtInFuncPattern = new RegExp(`\\b(${luaBuiltInFunctions.join('|')})\\b`, 'g');
            const customFuncPattern = /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
            const stringPattern = /(["'])(.*?)\1/g;
            const commentPattern = /(--[^\n]*)/g;
            const numberPattern = /\b(\d+\.?\d*)\b/g;
            
            // Escape HTML to prevent breaking the markup
            const escapeHtml = (unsafe) => {
                return unsafe
                    .replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#039;");
            };
            
            // Apply highlighting in a specific order to avoid conflicts
            
            // First escape HTML to prevent issues
            content = escapeHtml(content);
            
            // Apply highlighting in order: comments, strings, keywords, functions, numbers
            content = content.replace(commentPattern, '<span class="code-comment">$1</span>');
            content = content.replace(stringPattern, '<span class="code-string">$1$2$1</span>');
            content = content.replace(keywordPattern, '<span class="code-keyword">$1</span>');
            content = content.replace(builtInFuncPattern, '<span class="code-function">$1</span>');
            content = content.replace(customFuncPattern, '<span class="code-custom-function">$1</span>(');
            content = content.replace(numberPattern, '<span class="code-number">$1</span>');
            
            // Apply the highlighted content
            codeElement.innerHTML = content;
        }
    });
}

/**
 * Animate the glitch text effect for headings with enhanced 3D effects
 */
function animateGlitchText() {
    const glitchTexts = document.querySelectorAll('.glitch-text');
    
    glitchTexts.forEach(text => {
        // Create the glitch effect layers
        const content = text.textContent;
        
        // Reset content
        text.innerHTML = '';
        
        // Create enhanced 3D layers
        const before1 = document.createElement('span');
        before1.classList.add('glitch-layer', 'glitch-before1');
        before1.setAttribute('data-text', content);
        before1.style.setProperty('--depth', '-4px');
        
        const before2 = document.createElement('span');
        before2.classList.add('glitch-layer', 'glitch-before2');
        before2.setAttribute('data-text', content);
        before2.style.setProperty('--depth', '-2px');
        
        const base = document.createElement('span');
        base.classList.add('glitch-layer', 'glitch-base');
        base.textContent = content;
        base.style.setProperty('--depth', '0');
        
        const after1 = document.createElement('span');
        after1.classList.add('glitch-layer', 'glitch-after1');
        after1.setAttribute('data-text', content);
        after1.style.setProperty('--depth', '2px');
        
        const after2 = document.createElement('span');
        after2.classList.add('glitch-layer', 'glitch-after2');
        after2.setAttribute('data-text', content);
        after2.style.setProperty('--depth', '4px');
        
        // Append all layers
        text.appendChild(before1);
        text.appendChild(before2);
        text.appendChild(base);
        text.appendChild(after1);
        text.appendChild(after2);
        
        // Add mousemove 3D effect
        text.addEventListener('mousemove', (e) => {
            const bounds = text.getBoundingClientRect();
            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;
            
            const x = e.clientX - bounds.left;
            const y = e.clientY - bounds.top;
            
            const rotateY = ((x - centerX) / centerX) * 15;
            const rotateX = -((y - centerY) / centerY) * 15;
            
            text.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            
            // Update layer positions
            const layers = text.querySelectorAll('.glitch-layer');
            layers.forEach(layer => {
                const depth = parseFloat(layer.style.getPropertyValue('--depth'));
                layer.style.transform = `translateX(${rotateY * 0.3 * depth}px) translateY(${rotateX * 0.3 * depth}px)`;
            });
        });
        
        text.addEventListener('mouseleave', () => {
            text.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            
            const layers = text.querySelectorAll('.glitch-layer');
            layers.forEach(layer => {
                layer.style.transform = 'translateX(0) translateY(0)';
            });
        });
    });
}

/**
 * Add dynamic type animation for code blocks with enhanced effects
 */
function animateCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(code => {
        const originalContent = code.innerHTML;
        code.innerHTML = '';
        
        let index = 0;
        let typeDelay = 5; // Base typing speed
        
        // Add a cursor element
        const cursor = document.createElement('span');
        cursor.classList.add('code-cursor');
        code.appendChild(cursor);
        
        const typeInterval = setInterval(() => {
            if (index < originalContent.length) {
                const char = originalContent.charAt(index);
                
                // Remove cursor
                if (cursor.parentNode === code) {
                    code.removeChild(cursor);
                }
                
                // Add character
                if (char === '<') {
                    // Handle HTML tags (for syntax highlighting)
                    const closeTagIndex = originalContent.indexOf('>', index);
                    if (closeTagIndex !== -1) {
                        const tag = originalContent.substring(index, closeTagIndex + 1);
                        code.innerHTML += tag;
                        index = closeTagIndex + 1;
                    } else {
                        code.innerHTML += char;
                        index++;
                    }
                } else {
                    code.innerHTML += char;
                    index++;
                    
                    // Random typing speed for realism
                    typeDelay = Math.random() > 0.9 ? 30 : 5;
                }
                
                // Re-add cursor at the end
                code.appendChild(cursor);
                
                // Auto-scroll to reveal new content
                code.scrollTop = code.scrollHeight;
            } else {
                clearInterval(typeInterval);
                
                // Remove cursor after typing is complete
                if (cursor.parentNode === code) {
                    setTimeout(() => {
                        code.removeChild(cursor);
                    }, 1000);
                }
            }
        }, typeDelay);
    });
}

/**
 * Initialize pricing toggle switch functionality
 */
function initializePricingToggle() {
    const pricingToggle = document.querySelector('.pricing-toggle input');
    const monthlyPricing = document.querySelector('.pricing-toggle .pricing-period:first-child');
    const annualPricing = document.querySelector('.pricing-toggle .pricing-period:last-child');
    
    if (pricingToggle && monthlyPricing && annualPricing) {
        // Set initial state
        monthlyPricing.classList.add('active');
        
        pricingToggle.addEventListener('change', () => {
            if (pricingToggle.checked) {
                // Annual pricing
                monthlyPricing.classList.remove('active');
                annualPricing.classList.add('active');
                
                // Update pricing display (20% discount for annual)
                const priceElements = document.querySelectorAll('.price');
                priceElements.forEach(price => {
                    const priceValue = price.getAttribute('data-monthly');
                    if (priceValue && priceValue !== '0' && priceValue !== 'Custom') {
                        const annualPrice = Math.round(parseFloat(priceValue) * 0.8);
                        price.innerHTML = `$${annualPrice}<span>/month</span>`;
                    }
                });
            } else {
                // Monthly pricing
                annualPricing.classList.remove('active');
                monthlyPricing.classList.add('active');
                
                // Reset to monthly pricing
                const priceElements = document.querySelectorAll('.price');
                priceElements.forEach(price => {
                    const priceValue = price.getAttribute('data-monthly');
                    if (priceValue) {
                        if (priceValue === 'Custom') {
                            price.innerHTML = `${priceValue}<span> pricing</span>`;
                        } else {
                            price.innerHTML = `$${priceValue}<span>/month</span>`;
                        }
                    }
                });
            }
        });
        
        // Store monthly prices as data attributes for reference
        document.querySelectorAll('.price').forEach(price => {
            const priceText = price.textContent.trim();
            const priceMatch = priceText.match(/\$(\d+)/);
            if (priceMatch) {
                price.setAttribute('data-monthly', priceMatch[1]);
            } else if (priceText.includes('Custom')) {
                price.setAttribute('data-monthly', 'Custom');
            } else {
                price.setAttribute('data-monthly', '0');
            }
        });
    }
}

/**
 * Initialize FAQ accordion functionality
 */
function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle active class on this item
                item.classList.toggle('active');
                
                // Close other open items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        }
    });
}

/**
 * Animate the stats in the hero section
 */
function animateStats() {
    const statElements = document.querySelectorAll('.stat-value');
    
    if (!statElements.length) return;
    
    statElements.forEach(stat => {
        // Try to get the target from data-count, then data-value, then from text content
        let targetValue = parseInt(stat.getAttribute('data-count') || 
                                stat.getAttribute('data-value') || 
                                stat.textContent.replace(/[^\d]/g, ''), 10);
        
        // Get prefix and suffix if available
        const prefix = stat.getAttribute('data-prefix') || '';
        const suffix = stat.getAttribute('data-suffix') || '';
        
        let currentValue = 0;
        const duration = 2000; // 2 seconds
        const interval = 30; // Update faster for smoother animation
        const steps = duration / interval;
        const increment = targetValue / steps;
        
        // Store original text for units like "99.9%" or "15M+"
        const originalText = stat.textContent;
        const hasDecimal = originalText.includes('.');
        const hasPlus = originalText.includes('+');
        const hasPercent = originalText.includes('%');
        
        const counter = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(counter);
                
                // Restore original format after reaching the target
                if (hasDecimal || hasPlus || hasPercent) {
                    stat.textContent = originalText;
                    return;
                }
            }
            
            // Format display value based on original format
            let displayValue;
            if (hasDecimal) {
                displayValue = currentValue.toFixed(1);
            } else {
                displayValue = Math.floor(currentValue);
            }
            
            // Add prefix/suffix and any special characters
            let formattedValue = prefix + displayValue + suffix;
            if (hasPlus && !formattedValue.includes('+')) {
                formattedValue += '+';
            }
            if (hasPercent && !formattedValue.includes('%')) {
                formattedValue += '%';
            }
            
            stat.textContent = formattedValue;
        }, interval);
    });
}

/**
 * Initialize the hero section effects
 */
function initializeHeroSection() {
    // Animate the stats after a short delay
    setTimeout(animateStats, 800);
    
    // Highlight the code
    initializeSyntaxHighlighting();
    
    // Add enhanced hover effect for the scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('mouseenter', () => {
            scrollIndicator.classList.add('hover');
            scrollIndicator.style.transform = 'translateY(5px)';
        });
        
        scrollIndicator.addEventListener('mouseleave', () => {
            scrollIndicator.classList.remove('hover');
            scrollIndicator.style.transform = 'translateY(0)';
        });
        
        // Scroll to features section when clicked
        scrollIndicator.addEventListener('click', () => {
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

/**
 * Initialize pricing section toggle
 */
function initializePricing() {
    const toggleInput = document.getElementById('pricing-toggle-input');
    const pricingPeriods = document.querySelectorAll('.pricing-period');
    
    if (toggleInput) {
        toggleInput.addEventListener('change', function() {
            if (this.checked) {
                // Switch to annual pricing
                document.body.classList.add('annual-pricing');
                pricingPeriods[0].classList.remove('active');
                pricingPeriods[1].classList.add('active');
            } else {
                // Switch to monthly pricing
                document.body.classList.remove('annual-pricing');
                pricingPeriods[0].classList.add('active');
                pricingPeriods[1].classList.remove('active');
            }
        });
    }
    
    // Initialize monthly prices to be visible by default
    const monthlyPrices = document.querySelectorAll('.price.monthly');
    const annualPrices = document.querySelectorAll('.price.annual');
    
    monthlyPrices.forEach(price => price.classList.add('active'));
    annualPrices.forEach(price => price.classList.remove('active'));
}

/**
 * Initialize FAQ accordion functionality
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = null;
            });
            
            // Toggle current FAQ item
            if (!isOpen) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
}

/**
 * Initialize the navbar with scrolling effects and status updates
 */
function initializeNavbar() {
    const nav = document.querySelector('nav');
    const statusItems = document.querySelectorAll('.status-item');
    
    // Update status with real values from floating elements
    const floatingElements = document.querySelectorAll('.floating-ui-elements .indicator-text, .floating-ui-elements .status-text');
    if (floatingElements.length > 0 && statusItems.length > 0) {
        floatingElements.forEach((element, index) => {
            if (statusItems[index]) {
                statusItems[index].querySelector('span:last-child').textContent = element.textContent;
            }
        });
    }

    // Variables for scroll direction detection
    let lastScrollTop = 0;
    let scrollDirection = 'up';
    
    // Hide/show navbar on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        
        // Determine scroll direction
        if (scrollTop > lastScrollTop) {
            scrollDirection = 'down';
            if (scrollTop > 80) {
                nav.classList.add('hidden');
            }
        } else {
            scrollDirection = 'up';
            nav.classList.remove('hidden');
        }
        
        // Apply scrolled class for styling
        if (scrollTop > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    }, { passive: true });
}

/**
 * Main initialization function
 */
function initializeApp() {
    // Add loading class to body immediately
    document.body.classList.add('loading');
    
    // Hide the main content
    const mainContent = document.querySelector('.main-content');
    mainContent.classList.add('hidden');
    
    // Initialize loading screen immediately (before page fully loads)
    initializeLoading();
    
    // Initialize components after the loading animation completes
    // (This is now handled within the initializeLoading function)
    document.addEventListener('DOMContentLoaded', function() {
        // Other initializations will be called after loading completes
        // in the initializeLoading function
        
        // Pre-initialize some components that don't affect the UI
        initializeParticles();
    });
}

// Start the application immediately
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});
