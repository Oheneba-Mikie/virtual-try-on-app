document.addEventListener('DOMContentLoaded', () => {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
    const placeholderText = document.querySelector('.placeholder-text');
    const saveBtn = document.getElementById('saveBtn');
    const status = document.getElementById('status');

    // Load saved image
    chrome.storage.local.get(['userImage'], (result) => {
        if (result.userImage) {
            showPreview(result.userImage);
            saveBtn.disabled = false;
            saveBtn.textContent = "Update Photo";
        }
    });

    // Handle click on upload area
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // Handle file selection
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64String = event.target.result;
                showPreview(base64String);
                saveBtn.disabled = false;
                saveBtn.textContent = "Save Photo";
                status.textContent = "";
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle save button
    saveBtn.addEventListener('click', () => {
        const imageSrc = preview.src;
        if (!imageSrc) return;

        saveBtn.disabled = true;
        saveBtn.textContent = "Saving...";

        chrome.storage.local.set({ userImage: imageSrc }, () => {
            saveBtn.disabled = false;
            saveBtn.textContent = "Photo Saved!";
            status.className = "success";
            status.textContent = "Your photo has been saved successfully.";

            setTimeout(() => {
                saveBtn.textContent = "Update Photo";
                status.textContent = "";
            }, 2000);
        });
    });

    function showPreview(src) {
        preview.src = src;
        preview.style.display = 'block';
        placeholderText.style.display = 'none';
    }
});
