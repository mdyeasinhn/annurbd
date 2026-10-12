// Sample data for the website
const data = {
    teamMembers: [
        {
            id: '1',
            name: 'アル・マムーン',
            position: '最高経営責任者・創設者',
            image: 'img/CEO.png',
            bio: 'バングラデシュ・ダッカ大学経営学部卒業。日本企業での5年間の勤務経験を活かし、日本とバングラデシュの架け橋として活動。Japan Qualityを重視した人材育成に情熱を注いでいます。',
            skills: ['リーダーシップ', '戦略的企画', '異文化経営', '日本語'],
            experience: '8年',
            education: 'ダッカ大学 経営学部'
        },
        {
            id: '2',
            name: 'AL エムラン',
            position: '共同創設者兼マネージャー',
            image: 'img/team6.jpg',
            bio: 'バングラデシュ工科大学出身。技術分野での豊富な経験を持ち、特にIT・製造業分野での人材育成を担当。日本の技術基準に精通し、高品質な人材の育成に取り組んでいます。',
            skills: ['技術管理', 'プロジェクト管理', 'IT技術', '品質管理'],
            experience: '6年',
            education: 'バングラデシュ工科大学'
        },
        {
            id: '3',
            name: '中村駿',
            position: '研修責任者',
            image: 'img/team14.jpg',
            bio: 'ダッカ大学日本語学科卒業。日本語教育のスペシャリストとして、実践的な日本語カリキュラムの開発と指導を担当。文化研修も含めた総合的な教育プログラムを提供しています。',
            skills: ['日本語教育', '文化研修', 'カリキュラム開発', 'コミュニケーション'],
            experience: '5年',
            education: 'ダッカ大学 日本語学科'
        }
    ],
    blogPosts: [
        {
            id: 1,
            title: 'バングラデシュ人材の日本語習得の秘密',
            excerpt: 'なぜバングラデシュ人は日本語習得が早いのか？文法構造の類似性と効果的な学習方法について解説します。',
            author: 'Abdul Rahman',
            date: '2024-01-15',
            image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500'
        },
        {
            id: 2,
            title: '技能実習生制度の最新動向',
            excerpt: '2024年の技能実習生制度改正点と、企業が知っておくべき重要なポイントをまとめました。',
            author: 'Mohammad Hassan',
            date: '2024-01-10',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500'
        },
        {
            id: 3,
            title: '特定技能制度活用のメリット',
            excerpt: '特定技能制度を活用することで得られる企業側のメリットと成功事例をご紹介します。',
            author: 'Fatima Khatun',
            date: '2024-01-05',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500'
        }
    ],
    newsletters: [
        {
            id: 1,
            title: '2024年1月号 - 新年のご挨拶',
            date: '2024-01-01',
            excerpt: '新年明けましておめでとうございます。2024年の展望と新しい取り組みについてお知らせします。',
            content: '詳細な内容はこちらでご確認いただけます...'
        },
        {
            id: 2,
            title: '2023年12月号 - 年末総括',
            date: '2023-12-01',
            excerpt: '2023年の活動総括と来年に向けての計画をお伝えします。',
            content: '詳細な内容はこちらでご確認いただけます...'
        }
    ]
};

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    const teamContainer = document.getElementById('team-members');
    if (teamContainer) {
        loadTeamMembers();
    }

    const blogContainer = document.getElementById('blog-posts');
    if (blogContainer) {
        loadBlogPosts();
    }

    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }

    initAnimations();
    const currentSection = window.location.hash ? window.location.hash.substring(1) : '';
    const currentNav = document.querySelector(`.nav-link[href="#${currentSection}"]`);
    if(currentNav) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('text-blue-600'));
        currentNav.classList.add('text-blue-600');
    }

    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.transition = 'transform 0.2s ease';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        });
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });
});

function loadTeamMembers() {
    const container = document.getElementById('team-members');
    if (!container) return;

    container.innerHTML = data.teamMembers.map(member => `
        <div class="card p-6 rounded-lg shadow-sm text-center">
            <img src="${member.image}" alt="${member.name}" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover">
            <h3 class="text-xl font-semibold mb-2">${member.name}</h3>
            <p class="text-muted mb-4">${member.position}</p>
            <p class="text-sm text-muted">${member.bio}</p>
            <a href="candidate-information.html?id=${member.id}" class="inline-block mt-4 text-blue-600 hover:underline">View Profile</a>
        </div>
    `).join('');
}

function loadBlogPosts() {
    const container = document.getElementById('blog-posts');
    if (!container) return;

    container.innerHTML = data.blogPosts.slice(0, 3).map(post => `
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

function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;

    alert(`ご登録ありがとうございます。メールアドレス: ${email}`);
    e.target.reset();
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('section > div');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100 && sectionTop > -section.offsetHeight) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-600');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('text-blue-600');
        }
    });
});