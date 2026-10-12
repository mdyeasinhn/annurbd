// Newsletter functionality
document.addEventListener('DOMContentLoaded', function() {
    loadNewsletters();
});

// Load newsletter list
function loadNewsletters() {
    const container = document.getElementById('newsletter-list');
    if (!container) return;

    container.innerHTML = data.newsletters.map(newsletter => `
        <div class="card p-6 rounded-lg shadow-sm">
            <div class="flex justify-between items-start mb-4">
                <div>
                    <h3 class="text-xl font-semibold mb-2">${newsletter.title}</h3>
                    <p class="text-muted">${newsletter.subject}</p>
                </div>
                <span class="text-sm text-muted">${formatDate(newsletter.date)}</span>
            </div>
            <p class="text-muted mb-4">${newsletter.content}</p>
            <div class="flex justify-between items-center">
                <span class="text-sm text-muted">${newsletter.subscribers} subscribers</span>
                <button class="text-blue-600 hover:underline font-medium" onclick="viewNewsletter('${newsletter.id}')">
                    View Full Newsletter
                </button>
            </div>
        </div>
    `).join('');
}

function viewNewsletter(newsletterId) {
    const newsletter = data.newsletters.find(n => n.id === newsletterId);
    if (newsletter) {
        alert(`Newsletter: ${newsletter.title}\n\nSubject: ${newsletter.subject}\n\nContent: ${newsletter.content}`);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    loadNewsletters();
});

function loadNewsletters() {
    const container = document.getElementById('newsletter-list');
    if (!container) return;

    container.innerHTML = data.newsletters.map(newsletter => `
        <div class="card p-8 rounded-lg shadow-sm">
            <div class="flex items-start justify-between mb-4">
                <div>
                    <h3 class="text-2xl font-bold mb-2">${newsletter.title}</h3>
                    <p class="text-muted mb-2">${newsletter.subject}</p>
                    <p class="text-sm text-muted">${formatDate(newsletter.date)} • ${newsletter.subscribers}人の購読者</p>
                </div>
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    ニュースレター
                </span>
            </div>
            <p class="text-muted mb-6">${newsletter.content}</p>
            <button class="btn-primary px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity">
                全文を読む
            </button>
        </div>
    `).join('');
}
