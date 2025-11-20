document.addEventListener('DOMContentLoaded', () => {

    // --- Initialize Syntax Highlighting ---
    hljs.highlightAll();

    // --- A.R.C. Tab Switching Logic ---
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', () => {
            const tabId = link.dataset.tab;
            tabLinks.forEach(item => item.classList.remove('active'));
            link.classList.add('active');

            tabContents.forEach(content => {
                content.classList.toggle('active', content.id === tabId);
            });
        });
    });

    // --- ENHANCED Interactive Timeline ---
    const timelineContainer = document.getElementById('project-timeline');
    if (timelineContainer) {
        // More detailed data items and milestones
        const items = new vis.DataSet([
            // Phase 1: Research
            { id: 1, content: 'Research & Scoping', start: '2025-09-01', end: '2025-09-10', group: 'planning', className: 'vis-item-research' },
            
            // Phase 2: Core Development
            { id: 2, content: 'Kinematic Model Dev', start: '2025-09-11', end: '2025-10-05', group: 'dev', className: 'vis-item-dev' },
            { id: 3, content: 'Control Loop Logic', start: '2025-10-06', end: '2025-10-25', group: 'dev', className: 'vis-item-dev' },
            { id: 7, content: 'Milestone: Core Logic Complete', start: '2025-10-25', type: 'point', group: 'dev', className: 'vis-item-milestone' },

            // Phase 3: Refinement & Testing
            { id: 4, content: 'PID Controller Tuning', start: '2025-10-26', end: '2025-11-10', group: 'qa', className: 'vis-item-qa' },
            { id: 5, content: 'Integration & Bug Fixing', start: '2025-11-11', end: '2025-11-20', group: 'qa', className: 'vis-item-qa' },
            
            // Phase 4: Delivery
            { id: 6, content: 'Final Report & Submission', start: '2025-11-21', end: '2025-11-25', group: 'planning', className: 'vis-item-delivery' },
            { id: 8, content: 'Project Delivered', start: '2025-11-25', type: 'point', group: 'planning', className: 'vis-item-milestone-final' }
        ]);
        
        // Updated descriptive groups
        const groups = new vis.DataSet([
            {id: 'planning', content: 'Planning & Delivery'},
            {id: 'dev', content: 'Core Development'},
            {id: 'qa', content: 'Testing & Refinement'},
        ]);

        // Enhanced styling options for the timeline
        const options = {
            stack: false,
            width: '100%',
            height: '350px',
            margin: { item: 15, axis: 20 },
            orientation: 'top',
            showMajorLabels: false,
            zoomable: false,
            moveable: false,
            timeAxis: {
                scale: 'day',
                step: 5
            }
        };
        
        new vis.Timeline(timelineContainer, items, groups, options);
    }
});
