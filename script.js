// Setup intersection observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    // Current year for footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Intersection Observer callback
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    };

    // Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    // Initialize observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Target all elements with .animate-on-scroll
    const targetElements = document.querySelectorAll('.animate-on-scroll');
    targetElements.forEach(element => {
        observer.observe(element);
    });

    // Optional: Subtle parallax effect for background pattern based on mouse movement
    const bgPattern = document.getElementById('bg-pattern');
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Slight movement inverse to mouse position
        const moveX = (mouseX - 0.5) * -20;
        const moveY = (mouseY - 0.5) * -20;

        if(bgPattern) {
            bgPattern.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});
