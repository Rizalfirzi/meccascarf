document.addEventListener("DOMContentLoaded", function() {
    // Ambil semua item link
    const linkItems = document.querySelectorAll(".links-container li");

    // Beri animasi fade-in satu per satu
    linkItems.forEach((item, index) => {
        // Beri jeda waktu berdasarkan urutan (index)
        setTimeout(() => {
            item.classList.add("visible");
        }, index * 150); // 150ms jeda antar link
    });

    // Animasi Latar Belakang Canvas
    const canvas = document.getElementById('background-canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = 50; // Jumlah partikel
    const particleColor = "rgba(212, 165, 154, 0.5)"; // Warna dusty rose transparan

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1; // Ukuran partikel
            this.speedY = Math.random() * 1 + 0.5; // Kecepatan jatuh
        }

        update() {
            this.y += this.speedY;
            if (this.y > canvas.height) {
                this.y = 0 - this.size;
                this.x = Math.random() * canvas.width;
            }
        }

        draw() {
            ctx.fillStyle = particleColor;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        requestAnimationFrame(animate);
    }

    init();
    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        particles = []; // Reset partikel saat ukuran jendela berubah
        init();
    });
});