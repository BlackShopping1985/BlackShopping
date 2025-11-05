


const itemList = raw.map(([[img], itemName], idx) => `
    <div class="product-card" data-id="${idx}" >
        <div class="product-image">
            <img src="${img}" alt="${itemName}">
        </div>
        <div class="product-info">
            <div class="product-title">${itemName}</div>      
        </div> 
    </div>
`).join('')





document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.products-grid');
    if (grid) {
        grid.innerHTML = itemList;
        // 统一事件委托（省内存）
        grid.addEventListener('click', e => {
            const card = e.target.closest('.product-card');
            if (!card) return;
            const id = card.dataset.id;
            // 跳详情页并带参数
            location.href = `detail.html?id=${id}`;
        });
    }
});



window.addEventListener('DOMContentLoaded', () => {
    const indexItem = document.querySelector('.products-grid');
    if (indexItem) indexItem.innerHTML = itemList;
});

