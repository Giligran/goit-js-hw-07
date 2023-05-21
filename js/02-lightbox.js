import { galleryItems } from './gallery-items.js';
// Change code below this line

const gellery = document.querySelector(".gallery");

console.log(galleryItems);
function createItemsGalleryMarkup(galleryItems) {
    const items = galleryItems
        .map(
            ({ original, preview, description }) =>
                `<li class="gallery-item">
                    <a class="gallery-link" href="${original}">
                        <img 
                        class="gallery-image"
                        src="${preview}"
                        alt="${description}"
                        />
                    </a>
                </li>`
        )
        .join("");

    return items;
}

gellery.insertAdjacentHTML(
    "beforeend",
    createItemsGalleryMarkup(galleryItems)
);

const lightBox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250,
    disableScroll: false,
});

lightBox.on("show.simplelightbox", () => {
    const body = document.querySelector("body");
    const bodyStyle = window.getComputedStyle(body);
    const bodyWidth =
        body.offsetWidth +
        parseInt(bodyStyle.marginLeft) +
        parseInt(bodyStyle.marginRight);
    const verticalScrollBar = window.innerWidth - bodyWidth;

    body.style.overflow = "hidden";
    body.style.paddingRight = verticalScrollBar + "px";
});

lightBox.on("close.simplelightbox", () => {
    const body = document.querySelector("body");

    setTimeout(() => {
        body.style.overflow = "auto";
        body.style.paddingRight = "";
    }, 250);
})
