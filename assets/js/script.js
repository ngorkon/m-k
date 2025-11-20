document.addEventListener('DOMContentLoaded', () => {

    // --- FADE-IN ON SCROLL ANIMATION ---
    function reveal() {
        const reveals = document.querySelectorAll(".reveal");
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 100;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", reveal);
    reveal(); // Initial call to show elements already in view

    // --- PROJECT VIEW TOGGLE LOGIC ---
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.dataset.view;
            const projectGrid = button.closest('.projects').querySelector('.project-grid');
            
            if (button.parentElement.querySelector('.active')) {
                button.parentElement.querySelector('.active').classList.remove('active');
            }
            button.classList.add('active');

            projectGrid.querySelectorAll('.project-card').forEach(card => {
                const engView = card.querySelector('.engineering-view');
                const mgmtView = card.querySelector('.management-view');
                if (engView && mgmtView) {
                    engView.style.display = (view === 'engineering') ? 'block' : 'none';
                    mgmtView.style.display = (view === 'management') ? 'block' : 'none';
                }
            });
        });
    });

    const leadershipButton = document.querySelector('.hero-cta-btn[data-view-target="management"]');
    if (leadershipButton) {
        leadershipButton.addEventListener('click', (e) => {
            e.preventDefault();
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    const managementBtn = document.querySelector('.toggle-btn[data-view="management"]');
                    if (managementBtn) managementBtn.click();
                }, 700);
            }
        });
    }

    // --- GANTT CHART ---
    const ganttCtx = document.getElementById('ganttChart');
    if (ganttCtx) {
        new Chart(ganttCtx, {
            type: 'bar',
            data: {
                labels: ['Analysis', 'Design', 'Development', 'Testing', 'Deployment'],
                datasets: [{
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
    
    // --- CONSTELLATION BACKGROUND ---
    const constellationCanvas = document.getElementById('constellation-canvas');
    if (constellationCanvas) {
        const ctx = constellationCanvas.getContext('2d');
        let particlesArray = [];
        
        const setCanvasSize = () => {
            const container = constellationCanvas.parentElement;
            if(container) {
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
                    let distance = Math.sqrt(((particlesArray[a].x - particlesArray[b].x) ** 2) + ((particlesArray[a].y - particlesArray[b].y) ** 2));
                    if (distance < 100) {
                        let opacity = 1 - (distance / 100);
                        ctx.strokeStyle = `rgba(0, 191, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke();
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

    // --- KNOWLEDGE GRAPH ---
    const networkContainer = document.getElementById('skill-network');
    if (networkContainer) {
        const nodes = new vis.DataSet([
            { id: 1, label: '<b>Physics-Math</b>', group: 'physics', title: 'Core foundation in analytical and theoretical physics.'},
            { id: 2, label: '<b>Chemistry</b>', group: 'chem', title: 'Understanding molecular structures and reactions.'},
            { id: 3, label: '<b>CompSci</b>', group: 'cs', title: 'Core principles of software development.'},
            { id: 10, label: 'Computational\nPhysics', group: 'sub', title: 'Simulating physical systems.'},
            { id: 11, label: 'Quantum\nMechanics', group: 'sub', title: 'Modeling atomic-scale behavior.'},
            { id: 12, label: 'Organic\nChemistry', group: 'sub', title: 'Study of carbon compounds.'},
            { id: 20, label: 'Quantum ML', group: 'interest', title: 'Applying quantum principles to ML.'},
            { id: 21, label: 'Computational\nChemistry', group: 'interest', title: 'Solving chemical problems with code.'},
            { id: 22, label: 'Data-Driven\nMaterials Science', group: 'interest', title: 'Discovering materials with data.'}
        ]);
        const edges = new vis.DataSet([
            { from: 1, to: 10 }, { from: 1, to: 11 }, { from: 3, to: 10 }, { from: 2, to: 11 }, { from: 2, to: 12 },
            { from: 11, to: 20 }, { from: 3, to: 20 }, { from: 10, to: 21 }, { from: 12, to: 21 }, { from: 10, to: 22 }, { from: 3, to: 22 }
        ]);
        const data = { nodes, edges };
        const options = {
            nodes: {
                borderWidth: 2,
                shape: 'dot',
                size: 25,
                font: { multi: true, bold: { color: '#fff', size: 14, face: 'Inter' } },
                scaling: { label: { enabled: true, min: 14, max: 20 } }
            },
            edges: { color: { color: 'rgba(255,255,255,0.2)', highlight: '#00bfff' }, smooth: { type: 'continuous' } },
            groups: {
                physics: { color: { background: '#90caf9', border: '#fff' }, font: { color: '#000' } },
                chem: { color: { background: '#f48fb1', border: '#fff' }, font: { color: '#000' } },
                cs: { color: { background: '#a5d6a7', border: '#fff' }, font: { color: '#000' } },
                sub: { shape: 'box', color: '#333', font: { color: '#ddd', face: 'Roboto Mono', size: 12 }, shapeProperties: { borderRadius: 3 } },
                interest: { shape:'ellipse', color: { background: '#00bfff', border: '#fff' }, font: { color: '#000', size: 14, face: 'Inter', weight: 'bold' } }
            },
            physics: { solver: 'barnesHut', barnesHut: { gravitationalConstant: -20000, springConstant: 0.05, springLength: 180 }, stabilization: { iterations: 200 } },
            interaction: { hover: true, tooltipDelay: 200 }
        };
        const network = new vis.Network(networkContainer, data, options);
    }
});
