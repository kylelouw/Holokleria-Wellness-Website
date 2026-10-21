const testimonials = [
    {
        text: 'Filler text for future testimonials. Will be replaced once confirmation of including testimonials is given. Adding filler text here. More filler text to act as a testimonial.',
        name: 'John Doe',
        initials: 'JD',
        image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=900&q=80'
    },
    {
        text: 'I felt calm, supported, and genuinely cared for from the very first session. The experience was grounding and restorative in every way.',
        name: 'Sarah M.',
        initials: 'SM',
        image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=900&q=80'
    },
    {
        text: 'The atmosphere is warm and welcoming, and the care I received made a real difference to how I feel day to day.',
        name: 'Alicia K.',
        initials: 'AK',
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80'
    }
];

const textEl = document.getElementById('testimonial-text');
const initialsEl = document.getElementById('testimonial-initials');
const nameEl = document.getElementById('testimonial-name');
const imageEl = document.querySelector('.testimonial-card-image');
const indicators = Array.from(document.querySelectorAll('.testimonial-indicator'));

document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
});

const productSearch = document.getElementById('product-search');
const productCards = Array.from(document.querySelectorAll('.product-card'));
const productCategories = Array.from(document.querySelectorAll('input[name="category"]'));
const emptyCatalogMessage = document.getElementById('catalog-empty');

const slideInElements = document.querySelectorAll('.slide-in');

if (slideInElements.length) {
    document.documentElement.classList.add('js-enabled');

    if ('IntersectionObserver' in window) {
        const slideInObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.15 });

        slideInElements.forEach((element) => slideInObserver.observe(element));
    } else {
        slideInElements.forEach((element) => element.classList.add('is-visible'));
    }
}

const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('.nav-links a').forEach((link) => {
    const linkPage = new URL(link.href, window.location.href).pathname.split('/').pop();
    const isCurrentPage = linkPage === currentPage;

    link.classList.toggle('active', isCurrentPage);

    if (isCurrentPage) {
        link.setAttribute('aria-current', 'page');
    } else {
        link.removeAttribute('aria-current');
    }
});

document.querySelectorAll('.navbar').forEach((navbar) => {
    const toggle = navbar.querySelector('.nav-menu-toggle');
    const navigation = navbar.querySelector('.nav-links');

    if (!toggle || !navigation) return;

    const setMenuOpen = (isOpen) => {
        navbar.classList.toggle('is-menu-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    };

    toggle.addEventListener('click', () => {
        setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', (event) => {
        if (event.target.closest('a')) setMenuOpen(false);
    });

    document.addEventListener('click', (event) => {
        if (!navbar.contains(event.target)) setMenuOpen(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false);
            toggle.focus();
        }
    });

    window.matchMedia('(min-width: 901px)').addEventListener('change', () => setMenuOpen(false));
});

if (productCards.length) {
    const updateProductFilters = () => {
        const query = productSearch?.value.trim().toLocaleLowerCase() ?? '';
        const selectedCategories = productCategories
            .filter((category) => category.checked)
            .map((category) => category.value);
        let visibleCount = 0;

        productCards.forEach((card) => {
            const matchesSearch = card.textContent.toLocaleLowerCase().includes(query);
            const matchesCategory = selectedCategories.length === 0
                || selectedCategories.includes(card.dataset.category);
            const isVisible = matchesSearch && matchesCategory;

            card.hidden = !isVisible;

            if (isVisible) visibleCount += 1;
        });

        if (emptyCatalogMessage) {
            emptyCatalogMessage.hidden = visibleCount !== 0;
        }
    };

    productSearch?.addEventListener('input', updateProductFilters);
    productCategories.forEach((category) => {
        category.addEventListener('change', updateProductFilters);
    });
    updateProductFilters();
}

let activeIndex = 0;

function renderTestimonial(index) {
    const testimonial = testimonials[index];

    if (!testimonial || !textEl || !initialsEl || !nameEl || !imageEl) return;

    textEl.textContent = testimonial.text;
    initialsEl.textContent = testimonial.initials;
    nameEl.textContent = testimonial.name;
    imageEl.style.backgroundImage = `url("${testimonial.image}")`;

    indicators.forEach((indicator, indicatorIndex) => {
        indicator.classList.toggle('active', indicatorIndex === index);
    });
}

function cycleTestimonials() {
    activeIndex = (activeIndex + 1) % testimonials.length;
    renderTestimonial(activeIndex);
}

indicators.forEach((indicator) => {
    indicator.addEventListener('click', () => {
        activeIndex = Number(indicator.dataset.index);
        renderTestimonial(activeIndex);
    });
});

renderTestimonial(activeIndex);
setInterval(cycleTestimonials, 4500);