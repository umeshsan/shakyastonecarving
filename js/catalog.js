// Get DOM elements
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const catalogContainer = document.getElementById('catalog-container');

let currentCategory = 'all';
let itemsPerLoad = 12;
let loadedItems = 0;
let isLoading = false;

// -----------------------------
// Hamburger & Sidebar Toggle
// -----------------------------
hamburger.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});
closeBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

function closeMenu() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// -----------------------------
// Load Products Function
// -----------------------------
function loadProducts(reset = false) {
    if (reset) {
        catalogContainer.innerHTML = '';
        loadedItems = 0;
    }

    const filtered = allProducts.filter(
        p => currentCategory === 'all' || p.category === currentCategory
    );

    const nextProducts = filtered.slice(loadedItems, loadedItems + itemsPerLoad);

    nextProducts.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.category = p.category;
        card.setAttribute('data-aos', 'fade-up');
        card.innerHTML = `
            <div class="product-images">
                <a class="image-box" data-fancybox="gallery-${p.id}" href="${p.mainImage}">
                    <img src="${p.mainImage}" class="main-image" alt="${p.title}" loading="lazy">
                </a>
                <div class="thumbnail-images">
                    ${p.thumbnails.map(t => `<a data-fancybox="gallery-${p.id}" href="${t}"><img src="${t}" alt="" loading="lazy"></a>`).join('')}
                </div>
            </div>
            <h3>${p.title}</h3>
            <p>Stone Type: ${p.stoneType}</p>
            <p>Size: ${p.size} | Weight: ${p.weight}</p>
        `;
        catalogContainer.appendChild(card);

        // Thumbnail click updates main image
        const mainImg = card.querySelector('.main-image');
        card.querySelectorAll('.thumbnail-images img').forEach(thumb => {
            thumb.addEventListener('click', () => { mainImg.src = thumb.src; });
        });
    });

    loadedItems += nextProducts.length;

    // Equal height cards
    matchCardHeights();

    // Rebind Fancybox for new products
    Fancybox.bind("[data-fancybox]");

    // Refresh AOS for animations
    AOS.refresh();
}

// -----------------------------
// Equal Height Cards
// -----------------------------
function matchCardHeights() {
    const cards = document.querySelectorAll('.product-card');
    let maxHeight = 0;
    cards.forEach(c => c.style.height = 'auto');
    cards.forEach(c => { if (c.offsetHeight > maxHeight) maxHeight = c.offsetHeight; });
    cards.forEach(c => c.style.height = maxHeight + 'px');
}

// -----------------------------
// Category Filter
// -----------------------------
const menuLinks = document.querySelectorAll('.menu-list a');
menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        menuLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        currentCategory = link.dataset.category;
        loadProducts(true);
        closeMenu();
    });
});

// -----------------------------
// Infinite Scroll
// -----------------------------
window.addEventListener('scroll', () => {
    if (isLoading) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        const filtered = allProducts.filter(p => currentCategory === 'all' || p.category === currentCategory);
        if (loadedItems < filtered.length) {
            isLoading = true;
            loadProducts();
            isLoading = false;
        }
    }
});

// -----------------------------
// Window Resize
// -----------------------------
window.addEventListener('resize', matchCardHeights);

// -----------------------------
// Initialize AOS
// -----------------------------
AOS.init({
    duration: 800,
    easing: 'ease-in-out-sine',
    once: true
});

// -----------------------------
// Inline Product JSON
// -----------------------------
const allProducts = [{
        "id": "buddha-1",
        "category": "buddha",
        "title": "Hand Carved Buddha Statue",
        "mainImage": "images/buddha/buddha-1-main.jpg",
        "thumbnails": [
            "images/buddha/buddha-1-1.jpg",
            "images/buddha/buddha-1-2.jpg",
            "images/buddha/buddha-1-3.jpg"
        ],
        "stoneType": "Black Stone",
        "size": "24 x 12 in",
        "weight": "18 kg"
    },
    {
        "id": "chaitya-1",
        "category": "chaitya",
        "title": "Stone Chaitya Carving",
        "mainImage": "images/chaitya/chaitya-1-main.jpg",
        "thumbnails": [
            "images/chaitya/chaitya-1-1.jpg",
            "images/chaitya/chaitya-1-2.jpg",
            "images/chaitya/chaitya-1-3.jpg"
        ],
        "stoneType": "Gray Stone",
        "size": "30 x 15 in",
        "weight": "22 kg"
    },
    {
        "id": "ganesh-1",
        "category": "ganesh",
        "title": "Ganesh Stone Carving",
        "mainImage": "images/ganesh/ganesh-1-main.jpg",
        "thumbnails": [
            "images/ganesh/ganesh-1-1.jpg",
            "images/ganesh/ganesh-1-2.jpg",
            "images/ganesh/ganesh-1-3.jpg"
        ],
        "stoneType": "Turquoise",
        "size": "20 x 10 in",
        "weight": "15 kg"
    },
    {
        "id": "kuber-1",
        "category": "kuber",
        "title": "Kuber Stone Carving",
        "mainImage": "images/kuber/kuber-1-main.jpg",
        "thumbnails": [
            "images/kuber/kuber-1-1.jpg",
            "images/kuber/kuber-1-2.jpg",
            "images/kuber/kuber-1-3.jpg"
        ],
        "stoneType": "Lapis",
        "size": "28 x 14 in",
        "weight": "20 kg"
    },
    {
        "id": "lokeshwar-1",
        "category": "lokeshwar",
        "title": "Lokeshwar Stone Carving",
        "mainImage": "images/lokeshwar/lokeshwar-1-main.jpg",
        "thumbnails": [
            "images/lokeshwar/lokeshwar-1-1.jpg",
            "images/lokeshwar/lokeshwar-1-2.jpg",
            "images/lokeshwar/lokeshwar-1-3.jpg"
        ],
        "stoneType": "Black Stone",
        "size": "22 x 12 in",
        "weight": "17 kg"
    },
    {
        "id": "mahankaal-1",
        "category": "mahankaal",
        "title": "Mahankaal Stone Carving",
        "mainImage": "images/mahankaal/mahankaal-1-main.jpg",
        "thumbnails": [
            "images/mahankaal/mahankaal-1-1.jpg",
            "images/mahankaal/mahankaal-1-2.jpg",
            "images/mahankaal/mahankaal-1-3.jpg"
        ],
        "stoneType": "Gray Stone",
        "size": "26 x 14 in",
        "weight": "19 kg"
    },
    {
        "id": "tara-1",
        "category": "tara",
        "title": "Tara Stone Carving",
        "mainImage": "images/tara/tara-1-main.jpg",
        "thumbnails": [
            "images/tara/tara-1-1.jpg",
            "images/tara/tara-1-2.jpg",
            "images/tara/tara-1-3.jpg"
        ],
        "stoneType": "Turquoise",
        "size": "24 x 12 in",
        "weight": "18 kg"
    }
];

// -----------------------------
// Initial Load
// -----------------------------
loadProducts(true);