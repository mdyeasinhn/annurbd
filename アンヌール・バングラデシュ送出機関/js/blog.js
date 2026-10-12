document.addEventListener('DOMContentLoaded', function() {
    loadBlogPostsForBlogPage();
});

function loadBlogPostsForBlogPage() {
    const container = document.getElementById('blog-posts-grid');
    if (!container) return;

    container.innerHTML = data.blogPosts.map(post => `
        <div class="card rounded-lg shadow-sm overflow-hidden">
            <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover">
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${post.title}</h3>
                <p class="text-muted mb-4">${post.excerpt}</p>
                <div class="flex items-center justify-between text-sm text-muted">
                    <span>By ${post.author}</span>
                    <span>${formatDate(post.date)}</span>
                </div>
            </div>
        </div>
    `).join('');
}