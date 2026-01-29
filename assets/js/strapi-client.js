// Strapi API Configuration
const STRAPI_URL = 'https://cms.forenly.ai';

// Fetch blog posts from Strapi
async function fetchBlogPosts(category = null) {
    try {
        let url = `${STRAPI_URL}/api/bahadir-blog-posts?populate=*&sort=createdAt:desc`;

        if (category) {
            url += `&filters[category][$eq]=${category}`;
        }

        const response = await fetch(url);
        const data = await response.json();

        return data.data || [];
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
}

// Fetch single blog post by slug
async function fetchBlogPost(slug) {
    try {
        const url = `${STRAPI_URL}/api/bahadir-blog-posts?filters[slug][$eq]=${slug}&populate=*`;
        const response = await fetch(url);
        const data = await response.json();

        return data.data?.[0] || null;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

// Render blog posts list
function renderBlogList(posts, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (posts.length === 0) {
        container.innerHTML = '<p style="color: #888;">No posts yet. Coming soon!</p>';
        return;
    }

    const html = posts.map(post => {
        const attrs = post.attributes;
        const categoryLabels = {
            'GUIDE': 'GUIDE',
            'BUILD_LOG': 'UPDATES',
            'LIFESTYLE': 'LIFESTYLE',
            'TOOLS': 'TOOLS'
        };

        return `
            <a href="post.html?slug=${attrs.slug}" class="list-item">
                <div class="item-title">
                    ${attrs.title}
                    <span style="font-size: 0.7rem; background: #D4CFC4; color: #555; padding: 2px 8px; border-radius: 4px; margin-left: 10px; font-weight: normal;">
                        ${categoryLabels[attrs.category] || attrs.category}
                    </span>
                </div>
                <div class="item-desc">
                    ${attrs.excerpt || ''}
                </div>
            </a>
        `;
    }).join('');

    container.innerHTML = html;
}

// Render single blog post
function renderBlogPost(post, containerId) {
    const container = document.getElementById(containerId);
    if (!container || !post) return;

    const attrs = post.attributes;

    container.innerHTML = `
        <div class="hero-section" style="text-align: left;">
            <span style="font-size: 0.8rem; background: #D4CFC4; color: #555; padding: 4px 12px; border-radius: 4px;">
                ${attrs.category}
            </span>
            <h1 style="font-size: 2.2rem; margin: 1rem 0;">${attrs.title}</h1>
            <p style="color: #666; font-size: 0.9rem;">
                ${new Date(attrs.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
        </div>
        <div class="section" style="line-height: 1.8; color: #555;">
            ${attrs.content}
        </div>
    `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', async () => {
    // Check if we're on the blog list page
    const blogListContainer = document.getElementById('blog-posts');
    if (blogListContainer) {
        const posts = await fetchBlogPosts();
        renderBlogList(posts, 'blog-posts');
    }

    // Check if we're on a single post page
    const postContainer = document.getElementById('blog-post-content');
    if (postContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const slug = urlParams.get('slug');

        if (slug) {
            const post = await fetchBlogPost(slug);
            if (post) {
                renderBlogPost(post, 'blog-post-content');
                document.title = `${post.attributes.title} | Bahadir.ai`;
            } else {
                postContainer.innerHTML = '<p>Post not found.</p>';
            }
        }
    }
});
