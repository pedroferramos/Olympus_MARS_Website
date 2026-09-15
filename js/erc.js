/* Page-specific behavior for erc.html: expandable task cards */
function toggleTask(card) {
    var wasActive = card.classList.contains('active');
    document.querySelectorAll('.task-card').forEach(function (c) { c.classList.remove('active'); });
    if (!wasActive) card.classList.add('active');
}
