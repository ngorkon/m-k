document.addEventListener('DOMContentLoaded', () => {
    hljs.highlightAll();

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

    const timelineContainer = document.getElementById('project-timeline');
    if (timelineContainer) {
        const items = new vis.DataSet([ { id: 1, content: 'Research', start: '2025-09-01', end: '2025-09-14', group: 1 }, { id: 2, content: 'Kinematic Model', start: '2025-09-15', end: '2025-10-10', group: 2 }, { id: 3, content: 'Control Loop', start: '2025-10-11', end: '2025-11-05', group: 2 }, { id: 4, content: 'Integration & Testing', start: '2025-11-06', end: '2025-11-18', group: 3 }, { id: 5, content: 'Delivery', start: '2025-11-19', end: '2025-11-22', group: 1 } ]);
        const groups = new vis.DataSet([ {id: 1, content: 'Management'}, {id: 2, content: 'Development'}, {id: 3, content: 'QA'}, ]);
        new vis.Timeline(timelineContainer, items, groups, { stack: false, width: '100%', height: '300px', margin: { item: 20 }, orientation: 'top', template: item => `<div class="vis-item-content">${item.content}</div>` });
    }
});
