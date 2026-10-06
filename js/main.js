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

const productSearch = document.getElementById('product-search');
const productCards = Array.from(document.querySelectorAll('.product-card'));
const emptyCatalogMessage = document.getElementById('catalog-empty');

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

if (productSearch && productCards.length) {
    productSearch.addEventListener('input', () => {
        const query = productSearch.value.trim().toLocaleLowerCase();
        let visibleCount = 0;

        productCards.forEach((card) => {
            const matches = card.textContent.toLocaleLowerCase().includes(query);
            card.hidden = !matches;

            if (matches) visibleCount += 1;
        });

        if (emptyCatalogMessage) {
            emptyCatalogMessage.hidden = visibleCount !== 0;
        }
    });
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