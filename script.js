document.addEventListener("DOMContentLoaded", () => {
    // 1. Año Footer
    const yearEl = document.getElementById('year');
    if(yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Parallax Suave para Aurora (Blobs)
    // Usamos requestAnimationFrame para máxima suavidad en el scroll
    let scrollPos = 0;
    const blobs = document.querySelectorAll('.aurora-blob');
    
    const updateAurora = () => {
        scrollPos = window.pageYOffset;
        blobs.forEach((blob, i) => {
            const speed = (i + 1) * 0.05; // Velocidad reducida para sutileza
            blob.style.transform = `translateY(${scrollPos * speed}px)`;
        });
        requestAnimationFrame(updateAurora);
    };
    updateAurora();

    // 3. 3D Tilt Amortiguado (Damping)
    if (window.innerWidth > 1024) {
        const tiltCards = document.querySelectorAll('.tilt-card');
        
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                // Divisor aumentado (de 12 a 35) para un movimiento mucho más suave
                const rotateX = (y - centerY) / 35;
                const rotateY = (centerX - x) / 35;

                // Aplicamos el transform con un suavizado extra
                card.style.transition = 'transform 0.1s ease-out'; 
                card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
            });

            card.addEventListener('mouseleave', () => {
                // Al salir, el regreso es muy lento y elegante
                card.style.transition = 'transform 0.8s var(--ease-premium)';
                card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    }

    // 4. Smooth Scroll Reveal (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { 
        threshold: 0.05, // Se activa apenas entra un poco en pantalla
        rootMargin: "0px 0px -20px 0px" 
    });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
});