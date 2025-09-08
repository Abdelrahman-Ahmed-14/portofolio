// Image Gallery Functionality for Dashboard Project
class ImageGallery {
    constructor() {
        this.currentImageIndex = 0;
        this.images = [];
        this.modal = document.getElementById('imageModal');
        this.modalImg = document.getElementById('modalImage');
        this.imageTitle = document.getElementById('imageTitle');
        this.imageDescription = document.getElementById('imageDescription');
        this.prevBtn = document.getElementById('prevImage');
        this.nextBtn = document.getElementById('nextImage');
        this.closeBtn = document.getElementById('closeModal');
        this.imageCounter = document.getElementById('imageCounter');

        this.init();
    }

    init() {
        this.attachEventListeners();
        this.setupImageClickListeners();
    }

    attachEventListeners() {
        // Close modal events
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Navigation events
        this.prevBtn.addEventListener('click', () => this.showPreviousImage());
        this.nextBtn.addEventListener('click', () => this.showNextImage());

        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (!this.modal.classList.contains('hidden')) {
                switch (e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.showPreviousImage();
                        break;
                    case 'ArrowRight':
                        this.showNextImage();
                        break;
                }
            }
        });
    }

    setupImageClickListeners() {
        const galleryImages = document.querySelectorAll('.universal-card img');

        galleryImages.forEach((img, index) => {
            // Wrap image in container with overlay
            const parent = img.parentElement;
            const imageContainer = document.createElement('div');
            imageContainer.className = 'image-expand-container';

            // Create overlay with expand icon
            const overlay = document.createElement('div');
            overlay.className = 'image-expand-overlay';
            overlay.innerHTML = '<i class="fas fa-eye expand-icon"></i>';

            // Wrap the image
            parent.insertBefore(imageContainer, img);
            imageContainer.appendChild(img);
            imageContainer.appendChild(overlay);

            // Set up click listener on container
            imageContainer.style.cursor = 'pointer';
            imageContainer.addEventListener('click', () => {
                this.openModal(img, index);
            });
        });
    }

    openModal(clickedImg, clickedIndex) {
        // Collect all images from gallery
        const allImages = document.querySelectorAll('.universal-card img');

        this.images = Array.from(allImages).map(img => {
            const card = img.closest('.universal-card');
            const title = card ? card.querySelector('h3')?.textContent || 'Project Image' : 'Project Image';
            const description = card ? card.querySelector('p')?.textContent || '' : '';

            return {
                src: img.src,
                alt: img.alt || title,
                title: title,
                description: description
            };
        });

        this.currentImageIndex = clickedIndex;
        this.showCurrentImage();
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    showCurrentImage() {
        const currentImage = this.images[this.currentImageIndex];

        this.modalImg.src = currentImage.src;
        this.modalImg.alt = currentImage.alt;
        this.imageTitle.textContent = currentImage.title;
        this.imageDescription.textContent = currentImage.description;
        this.imageCounter.textContent = `${this.currentImageIndex + 1} of ${this.images.length}`;

        // Update navigation buttons visibility
        this.prevBtn.style.display = this.images.length > 1 ? 'block' : 'none';
        this.nextBtn.style.display = this.images.length > 1 ? 'block' : 'none';
    }

    showPreviousImage() {
        this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
        this.showCurrentImage();
    }

    showNextImage() {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
        this.showCurrentImage();
    }
}

// Initialize gallery when page loads
document.addEventListener('DOMContentLoaded', () => {
    new ImageGallery();
});
