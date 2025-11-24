// Content Script

// Configuration
const MIN_IMAGE_SIZE = 200; // Minimum width/height to be considered a product image

// Styles are injected via styles.css

function init() {
    observeImages();
}

function observeImages() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element
                    if (node.tagName === 'IMG') {
                        processImage(node);
                    } else {
                        const images = node.querySelectorAll('img');
                        images.forEach(processImage);
                    }
                }
            });
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Process existing images
    document.querySelectorAll('img').forEach(processImage);
}

function processImage(img) {
    // Filter out small images, icons, or already processed images
    if (img.width < MIN_IMAGE_SIZE || img.height < MIN_IMAGE_SIZE || img.dataset.vtoProcessed) {
        return;
    }

    // Check if it's likely a product image (heuristic)
    // For AliExpress/Jumia, main images are usually wrapped in specific containers, but size is a good proxy for now.

    // Mark as processed
    img.dataset.vtoProcessed = "true";

    // Create wrapper if needed or position absolute
    // We'll use a container to position the button
    const container = document.createElement('div');
    container.className = 'vto-container';

    // We need to insert the container and move the image inside it, 
    // OR just position the button relative to the image's parent if it's positioned.
    // A safer approach that breaks less layout is to append the button to the image's parent 
    // and ensure the parent is relative.

    const parent = img.parentElement;
    if (!parent) return;

    // Ensure parent is relative so we can absolute position the button
    const parentStyle = window.getComputedStyle(parent);
    if (parentStyle.position === 'static') {
        parent.style.position = 'relative';
    }

    const btn = document.createElement('button');
    btn.className = 'vto-btn';
    btn.innerHTML = '✨ Try On';
    btn.title = 'Virtual Try-On with your photo';

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        startTryOn(img, btn);
    });

    parent.appendChild(btn);
}

async function startTryOn(img, btn) {
    // 1. Show Loading State
    btn.classList.add('loading');
    btn.innerHTML = '⏳ Generating...';
    btn.disabled = true;

    // Create overlay for the image
    const overlay = document.createElement('div');
    overlay.className = 'vto-overlay loading-overlay';
    overlay.innerHTML = '<div class="vto-spinner"></div>';

    // Position overlay over the image
    positionOverlay(overlay, img);
    img.parentElement.appendChild(overlay);

    try {
        // 2. Send message to background script
        const response = await chrome.runtime.sendMessage({
            action: "generateTryOn",
            productImageUrl: img.src
        });

        // 3. Handle Response
        if (response && response.success) {
            showResult(img, response.imageUrl, overlay);
        } else {
            showError(btn, response?.error || "Failed to generate");
            overlay.remove();
        }

    } catch (error) {
        console.error(error);
        showError(btn, "Error occurred");
        overlay.remove();
    } finally {
        btn.classList.remove('loading');
        if (btn.innerText !== '❌ Error') {
            btn.innerHTML = '✨ Try On';
            btn.disabled = false;
        }
    }
}

function showResult(originalImg, resultImageUrl, loadingOverlay) {
    // Remove loading overlay
    loadingOverlay.remove();

    // Create result overlay
    const resultOverlay = document.createElement('div');
    resultOverlay.className = 'vto-result-overlay';

    const resultImg = document.createElement('img');
    resultImg.src = resultImageUrl;
    resultImg.className = 'vto-result-img';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'vto-close-btn';
    closeBtn.innerHTML = '×';
    closeBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        resultOverlay.remove();
    };

    resultOverlay.appendChild(resultImg);
    resultOverlay.appendChild(closeBtn);

    positionOverlay(resultOverlay, originalImg);
    originalImg.parentElement.appendChild(resultOverlay);
}

function positionOverlay(overlay, targetImg) {
    // We assume the overlay is appended to the same parent as targetImg
    // and that the parent is relative.
    // We just need to match the geometry if the parent is larger than the image.

    // Actually, if we append to parent, and parent is relative, 
    // we can just use top/left/width/height of the image relative to parent.

    overlay.style.position = 'absolute';
    overlay.style.top = targetImg.offsetTop + 'px';
    overlay.style.left = targetImg.offsetLeft + 'px';
    overlay.style.width = targetImg.offsetWidth + 'px';
    overlay.style.height = targetImg.offsetHeight + 'px';
}

function showError(btn, msg) {
    const originalText = btn.innerHTML;
    btn.innerHTML = '❌ Error';
    btn.title = msg;
    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 3000);
}

// Run init
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
