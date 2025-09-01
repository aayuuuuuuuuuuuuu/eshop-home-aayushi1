document.addEventListener('DOMContentLoaded', () => {
    initializeCarousel();
    initializeScrollToTop(); // now it works!
    initializeProducts();
    setupEventListeners();
    initializeCart();
    initializePagination();
});

// Pagination Configuration
const ITEMS_PER_PAGE = 2; // Changed to 2 to ensure multiple pages for testing
const MAX_VISIBLE_PAGES = 5;

function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (!scrollToTopBtn) return;

    scrollToTopBtn.addEventListener('click', () => {
        console.log('Scroll to top button clicked!');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    // Ensure the button is hidden initially if not scrolled down
    scrollToTopBtn.style.display = 'none';
}

function initializePagination() {
    const table = document.querySelector('.min-w-full');
    if (!table) return;

    const rows = Array.from(table.querySelectorAll('tbody tr'));
    const totalPages = Math.ceil(rows.length / ITEMS_PER_PAGE);
    let currentPage = 1;

    // Check for existing pagination elements or create them
    let paginationNumbers = document.querySelector('.pagination-numbers');
    let prevButton = document.querySelector('.pagination-button.prev');
    let nextButton = document.querySelector('.pagination-button.next');
    let loadingBar = document.querySelector('.pagination-loading');

    if (!paginationNumbers || !prevButton || !nextButton) {
        const paginationContainer = document.createElement('div');
        paginationContainer.className = 'pagination-container flex items-center justify-center space-x-2 mt-4';

        prevButton = document.createElement('button');
        prevButton.className = 'pagination-button prev bg-pink-500 text-white px-1.5 py-1 rounded hover:bg-pink-600 transition';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i> Prev';

        nextButton = document.createElement('button');
        nextButton.className = 'pagination-button next bg-pink-500 text-white px-1.5 py-1 rounded hover:bg-pink-600 transition';
        nextButton.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';

        paginationNumbers = document.createElement('div');
        paginationNumbers.className = 'pagination-numbers flex space-x-2 transition';

        paginationContainer.appendChild(prevButton);
        paginationContainer.appendChild(paginationNumbers);
        paginationContainer.appendChild(nextButton);

        table.parentElement.appendChild(paginationContainer);
    }

    function updatePagination() {
        paginationNumbers.innerHTML = '';

        let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
        let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

        if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
            startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
        }

        if (startPage > 1) {
            addPageButton(1);
            if (startPage > 2) addEllipsis();
        }

        for (let i = startPage; i <= endPage; i++) {
            addPageButton(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) addEllipsis();
            addPageButton(totalPages);
        }

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    function addPageButton(pageNum) {
        const button = document.createElement('button');
        button.className = `pagination-button w-5 h-5 flex items-center justify-center rounded-lg transition-all
            ${pageNum === currentPage 
                ? 'bg-pink-300 text-white' 
                : 'bg-white text-pink-300 hover:bg-pink-50'}`;
        button.textContent = pageNum;
        button.addEventListener('click', () => goToPage(pageNum));
        paginationNumbers.appendChild(button);
    }

    function addEllipsis() {
        const span = document.createElement('span');
        span.className = 'pagination-dots px-2 text-pink-600';
        span.textContent = '•••';
        paginationNumbers.appendChild(span);
    }

    function showLoading() {
        if (loadingBar) {
            loadingBar.style.opacity = '1';
        }
        table.style.opacity = '0.5';
    }

    function hideLoading() {
        if (loadingBar) {
            loadingBar.style.opacity = '0';
        }
        table.style.opacity = '1';
    }

    function goToPage(page) {
        if (page === currentPage) return;

        showLoading();

        setTimeout(() => {
            currentPage = page;
            updateVisibleRows();
            updatePagination();
            hideLoading();
        }, 300);
    }

    function updateVisibleRows() {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;

        rows.forEach((row, index) => {
            row.style.display = (index >= startIndex && index < endIndex) ? '' : 'none';
            if (index >= startIndex && index < endIndex) {
                row.style.animation = 'fadeIn 0.3s ease-in-out';
            }
        });
    }

    prevButton.addEventListener('click', () => {
        if (currentPage > 1) goToPage(currentPage - 1);
    });

    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) goToPage(currentPage + 1);
    });

    updatePagination();
    updateVisibleRows();
}

// Placeholder functions for other initializations
function initializeCarousel() {
    console.log('initializeCarousel called');
    // Carousel initialization logic would go here
}

function initializeProducts() {
    console.log('initializeProducts called');
    // Product loading and display logic would go here
}

function setupEventListeners() {
    console.log('setupEventListeners called');
    // Global event listeners would go here
}

function initializeCart() {
    console.log('initializeCart called');
    // Shopping cart initialization logic would go here
}
