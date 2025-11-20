document.addEventListener('DOMContentLoaded', () => {

    // --- FADE-IN ON SCROLL ANIMATION ---
    // This is the function that makes hidden sections appear on scroll.
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100; // Distance from bottom of viewport to trigger animation

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add("active");
            }
        });
    }
    // Add event listener to run the function on every scroll.
    window.addEventListener("scroll", reveal);
    // Run the function once on page load to reveal any visible elements.
    reveal();

    // --- PROJECT VIEW TOGGLE LOGIC ---
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.dataset.view;
            const projectGrid = button.closest('.projects').querySelector('.project-grid');
            
            // Update active state on buttons
            if (button.parentElement.querySelector('.active')) {
                button.parentElement.querySelector('.active').classList.remove('active');
            }
            button.classList.add('active');

            // Toggle project views
            projectGrid.querySelectorAll('.project-card').forEach(card => {
                const engineeringView = card.querySelector('.engineering-view');
                const managementView = card.querySelector('.management-view');
                if(engineeringView && managementView){
                    engineeringView.style.display = (view === 'engineering') ? 'block' : 'none';
                    managementView.style.display = (view === 'management') ? 'block' : 'none';
                }
            });
        });
    });

    const leadershipButton = document.querySelector('.hero-cta-btn[data-view-target="management"]');
    if(leadershipButton) {
        leadershipButton.addEventListener('click', (e) => {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
                // Wait for scroll to finish before clicking the button
                setTimeout(() => {
                    const managementBtn = document.querySelector('.toggle-btn[data-view="management"]');
                    if (managementBtn) managementBtn.click();
                }, 700);
            }
        });
    }

    // --- GANTT CHART (for Management View) ---
    const ganttCtx = document.getElementById('ganttChart');
    if (ganttCtx) {
        new Chart(ganttCtx, {
            type: 'bar',
            data: {
                labels: ['Analysis', 'Design', 'Development', 'Testing', 'Deployment'],
                datasets: [{
                    label: 'Weeks',
                    data: [ [0, 2], [2, 5], [3, 10], [10, 11], [11, 12] ],
                    backgroundColor: 'rgba(0, 191, 255, 0.6)',
                    borderColor: 'rgba(0, 191, 255, 1)',
                    borderWidth: 1, barPercentage: 0.5, borderRadius: 3,
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    x: { min: 0, max: 12, ticks: { color: '#aaa' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } },
                    y: { ticks: { color: '#e0e0e0', font: { family: "'Roboto Mono', monospace" } }, grid: { color: 'rgba(255, 255, 255, 0.05)' } }
                },
                plugins: { legend: { display: false } }
            }
        });
    }
    
    // --- CONSTELLATION BACKGROUND (for Knowledge Graph) ---
    const constellationCanvas = document.getElementById('constellation-canvas');
    if(constellationCanvas) {
        const ctx = constellationCanvas.getContext('2d');
        let particlesArray = [];
        
        const setCanvasSize = () => {
            const container = constellationCanvas.parentElement;
            if (container) {
                constellationCanvas.width = container.offsetWidth;
                constellationCanvas.height = container.offsetHeight;
            }
        };

        class Particle {
             constructor() {
                this.x = Math.random() * constellationCanvas.width; this.y = Math.random() * constellationCanvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = (Math.random() * 0.4) - 0.2; this.speedY = (Math.random() * 0.4) - 0.2;
                this.color = 'rgba(0, 191, 255, 0.8)';
            }
            update() {
                if (this.x > constellationCanvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > constellationCanvas.height || this.y < 0) this.speedY = -this.speedY;
                this.x += this.speedX; this.y += this.speedY;
            }
            draw() {
                ctx.fillStyle = this.color; ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (constellationCanvas.width * constellationCanvas.height) / 12000;
            for (let i = 0; i < numberOfParticles; i++) { particlesArray.push(new Particle()); }
        }

        function connect() {
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = Math.sqrt(Math.pow(particlesArray[a].x - particlesArray[b].x, 2) + Math.pow(particlesArray[a].y - particlesArray[b].y, 2));
                    if (distance < 100) {
                        let opacity = 1 - (distance / 100);
                        ctx.strokeStyle = `rgba(0, 191, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            ctx.clearRect(0, 0, constellationCanvas.width, constellationCanvas.height);
            particlesArray.forEach(p => { p.update(); p.draw(); });
            connect();
            requestAnimationFrame(animate);
        }

        setCanvasSize(); init(); animate();
        window.addEventListener('resize', () => { setCanvasSize(); init(); });
    }

    // --- KNOWLEDGE GRAPH (vis-network) ---
    const networkContainer = document.getElementById('skill-network');
    if (networkContainer) {
        const nodes = new vis.DataSet([
            { id: 1, label: '<b>Physics-Math</b>', group: 'physics', title: 'Core foundation in analytical and theoretical physics.' },
            { id: 2, label: '<b>Chemistry</b>', group: 'chem', title: 'Understanding molecular structures and reactions.' },
            { id: 3, label: '<b>CompSci</b>', group: 'cs', title: 'Core principles of software development.' },
            { id: 10, label: 'Computational\nPhysics', group: 'sub', title: 'Simulating physical systems using numerical methods.' },
            { id: 11, label: 'Quantum\nMechanics', group: 'sub', title: 'Modeling the behavior of matter and energy at the atomic scale.' },
            { id: 12, label: 'Organic\nChemistry', group: 'sub', title: 'The study of carbon compounds, essential for materials.' },
            { id: 20, label: 'Quantum ML', group: 'interest', title: 'Applying quantum principles to machine learning.' },
            { id: 21, label: 'Computational\nChemistry', group: 'interest', title: 'Using computers to solve chemical problems.' },
            { id: 22, label: 'Data-Driven\nMaterials Science', group: 'interest', title: 'Discovering new materials through data analysis.' }
        ]);

        const edges = new vis.DataSet([
            { from: 1, to: 10 }, { from: 1, to: 11 }, { from: 3, to: 10 }, { from: 2, to: 11 }, { from: 2, to: 12 },
            { from: 11, to: 20 }, { from: 3, to: 20 }, { from: 10, to: 21 }, { from: 12, to: 21 }, { from: 10, to: 22 }, { from: 3, to: 22 }
        ]);
        
        const data = { nodes, edges };
        const options = {
            nodes: {
                borderWidth: 3, shape: 'dot', size: 30,
                font: { multi: true, bold: { color: '#fff', size: 16, face: 'Inter' } },
                scaling: { label: { enabled: true, min: 14, max: 24 } }
            },
            edges: { color: { color: 'rgba(255,255,255,0.2)', highlight: '#00bfff' }, smooth: { type: 'continuous' } },
            groups: {
                physics: { color: { background: '#90caf9', border: '#fff' }, font: { color: '#000' } },
                chem: { color: { background: '#f48fb1', border: '#fff' }, font: { color: '#000' } },
                cs: { color: { background: '#a5d6a7', border: '#fff' }, font: { color: '#000' } },
                sub: { shape: 'box', color: '#444', font: { color: '#eee', face: 'Roboto Mono', size: 14 }, shapeProperties: { borderRadius: 4 } },
                interest: { shape:'ellipse', color: { background: '#00bfff', border: '#fff' }, font: { color: '#000', size: 16, face: 'Inter', weight: 'bold' } }
            },
            physics: { solver: 'barnesHut', barnesHut: { gravitationalConstant: -30000, springConstant: 0.04, springLength: 200 }, stabilization: { iterations: 250 } },
            interaction: { hover: true, tooltipDelay: 200, hoverConnectedEdges: false },
        };
        
        const network = new vis.Network(networkContainer, data, options);
    }
});
