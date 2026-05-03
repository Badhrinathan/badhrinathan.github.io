// Portfolio Interactivity Script

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    const phrases = window.TYPEWRITER_PHRASES || [
        "Cybersecurity Practitioner",
        "Full-Stack Developer",
        "VAPT Specialist",
        "Bug Hunter"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        typewriterElement.innerHTML = `> ${currentPhrase.substring(0, charIndex)}<span class="cursor"></span>`;
        
        if (isDeleting) {
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            charIndex++;
            typeSpeed = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length + 1) {
            typeSpeed = 2000; // Pause at the end of phrase
            isDeleting = true;
            charIndex--; // Set back to full length for deletion
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(type, typeSpeed);
    }

    // Start the typing effect
    setTimeout(type, 1000);


    // --- 2. Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed if you only want it to happen once
                // observer.unobserve(entry.target); 
            }
        });
    };

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before the bottom
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });


    // --- 3. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg', 'bg-cyber-black/90');
            navbar.classList.remove('bg-cyber-black/50');
        } else {
            navbar.classList.add('bg-cyber-black/50');
            navbar.classList.remove('shadow-lg', 'bg-cyber-black/90');
        }
    });


    // --- 4. Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 64, // Adjust for navbar height (h-16 = 64px)
                    behavior: 'smooth'
                });
            }
        });
    });

});
