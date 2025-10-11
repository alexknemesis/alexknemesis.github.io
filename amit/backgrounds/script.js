let currentFilter = 'all';
let filteredData = imageData;
let currentImageIndex = 0;

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    setupFilters();
    setupKeyboardNavigation();
});

// Render gallery
function renderGallery() {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    filteredData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'gallery-item';
        card.onclick = () => openModal(index);
        const num = String(item.id).padStart(2, '0');

        card.innerHTML = `
            <div class="image-container">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="image-overlay">
                    <div class="overlay-content">
                        <h3><span class="index-badge">${num}</span> ${item.title}</h3>
                        <span class="category-badge">${item.category}</span>
                    </div>
                </div>
            </div>
        `;
        
        gallery.appendChild(card);
    });
}

// Setup filter buttons
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter data
            const filter = btn.dataset.filter;
            currentFilter = filter;
            
            if (filter === 'all') {
                filteredData = imageData;
            } else {
                filteredData = imageData.filter(item => item.category === filter);
            }
            
            renderGallery();
        });
    });
}

// Open modal
function openModal(index) {
    currentImageIndex = index;
    const item = filteredData[currentImageIndex];
    
    document.getElementById('modal-image').src = item.image;
    const num = String(item.id).padStart(2, '0');
    document.getElementById('modal-title').textContent = `${num} - ${item.title}`;
    document.getElementById('modal-description').textContent = item.description;
    document.getElementById('image-counter').textContent = `${currentImageIndex + 1} / ${filteredData.length}`;
    
    document.getElementById('modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    document.getElementById('modal').classList.remove('active');
    document.body.style.overflow = '';
}

// Navigate between images in modal
function navigateImage(direction) {
    currentImageIndex += direction;
    
    // Loop around
    if (currentImageIndex < 0) {
        currentImageIndex = filteredData.length - 1;
    } else if (currentImageIndex >= filteredData.length) {
        currentImageIndex = 0;
    }
    
    const item = filteredData[currentImageIndex];
    
    // Add fade effect
    const modalImage = document.getElementById('modal-image');
    modalImage.style.opacity = '0';
    
    setTimeout(() => {
        modalImage.src = item.image;
        const num = String(item.id).padStart(2, '0');
        document.getElementById('modal-title').textContent = `${num} - ${item.title}`;
        document.getElementById('modal-description').textContent = item.description;
        document.getElementById('image-counter').textContent = `${currentImageIndex + 1} / ${filteredData.length}`;
        modalImage.style.opacity = '1';
    }, 200);
}

// Keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('modal');
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            navigateImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateImage(1);
        }
    });
}
