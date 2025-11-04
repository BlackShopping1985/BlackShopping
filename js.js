


const itemList = raw.map(([img, itemName]) => `
            <div class="product-card">
                <div class="product-image"><img src="${img}"></div>
                <div class="product-info">
                    <div class="product-title">${itemName}</div>                    
                </div>
            </div>
`).join('')





window.addEventListener('DOMContentLoaded', () => {
    const indexItem = document.querySelector('.products-grid');
    if (indexItem) indexItem.innerHTML = itemList;
});

