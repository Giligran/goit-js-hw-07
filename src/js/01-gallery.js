import { galleryItems } from "./gallery-items.js";
// Change code below this line
let instance
const gellery = document.querySelector(".gallery");

// Create markup for gallery
function createItemsGalleryMarkup(galleryItems) {
    const items = galleryItems
        .map(
            ({ original, preview, description }) =>
                `<li class="gallery-item">
                    <a class="gallery-link" href="${original}">
                        <img 
                        class="gallery-image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                        />
                    </a>
                </li>`
        )
        .join("");

    return items;
}

gellery.insertAdjacentHTML(
    "afterbegin",
    createItemsGalleryMarkup(galleryItems)
);

gellery.addEventListener('click', (event) => {
    event.preventDefault();

    const isGalleryImage = event.target.classList.contains("gallery-image");

    if (!isGalleryImage) {
        return;
    }

    const { target: galleryImgEl } = event;

    showModal(galleryImgEl);
});


function showModal({ dataset: { source }, alt }) {
    instance = basicLightbox.create(`<img src="${source}" alt="${alt}">`, {
        onShow: openModal,
        onClose: closeModal,
    });

    instance.show();
}

function openModal() {
    window.addEventListener("keydown", onKeyPress);
    bodyScrollLock();
}

function closeModal() {
    window.removeEventListener("keydown", onKeyPress);
    bodyScrollUnlock();
}

function bodyScrollLock() {
    const body = document.querySelector("body");
    const bodyStyle = window.getComputedStyle(body);
    const bodyWidth = body.offsetWidth + parseInt(bodyStyle.marginLeft) + parseInt(bodyStyle.marginRight);
    const verticalScrollBar = window.innerWidth - bodyWidth;

    body.style.overflow = "hidden";
    body.style.paddingRight = verticalScrollBar + "px";
}

function bodyScrollUnlock() {
    const body = document.querySelector("body");

    body.style.overflow = "";
    body.style.paddingRight = "";
}


function onKeyPress(e) {
    if (e.code !== "Escape") {
        return;
    }

    instance.close();
}