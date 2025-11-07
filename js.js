/* =====  读取 web/data.json 并生成卡片  ===== */
const loadProducts = async () => {
  try {
    const res  = await fetch('web/data.json');      // 同目录
    const list = await res.json();                  // [{name:"..",pics:[..]}, ..]

    const itemList = list.map((item, idx) => {
      const img = item.pics?.[0] || 'img/placeholder.jpg'; // 首张图或占位
      return `
        <div class="product-card" data-id="${idx}">
          <div class="product-image">
            <img src="${img}" alt="${item.name}">
          </div>
          <div class="product-info">
            <div class="product-title">${item.name}</div>
          </div>
        </div>`;
    }).join('');

    // 填充页面
    const grid = document.querySelector('.products-grid');
    if (grid) grid.innerHTML = itemList;
  } catch (e) {
    console.error(e);
    document.querySelector('.products-grid').innerHTML =
      '<p style="text-align:center;">加载失败，稍后再试</p>';
  }
};

/* =====  页面加载完成后执行  ===== */
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();                       // 异步拉取 & 渲染

  /* 保留你原来事件委托跳转 */
  const grid = document.querySelector('.products-grid');
  if (grid) {
    grid.addEventListener('click', e => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      location.href = `detail.html?id=${card.dataset.id}`;
    });
  }
});
