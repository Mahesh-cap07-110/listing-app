const productList = document.getElementById('product-list');
const categorySelect = document.getElementById('category-select');
const priceSort = document.getElementById('price-sort');
const searchInput = document.getElementById('search-input');

let products = [];
let categories = [];
let filteredProducts = [];

async function fetchData() {
  try {
    const productsResponse = await fetch('https://fakestoreapi.com/products');
    const categoriesResponse = await fetch('https://fakestoreapi.com/products/categories');

    products = await productsResponse.json();
    categories = await categoriesResponse.json();

    
    categories.unshift('All Categories'); 
    categories.forEach(category => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });

    renderProducts(products);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


function renderProducts(products) {
  productList.innerHTML = '';
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
    `;
    productList.appendChild(productCard);
  });
}

categorySelect.addEventListener('change', () => {
  const selectedCategory = categorySelect.value;
  if (selectedCategory === 'All Categories') {
    filteredProducts = products;
  } else {
    filteredProducts = products.filter(product => product.category === selectedCategory);
  }
  applyFiltersAndSort();
});


priceSort.addEventListener('change', () => {
  const sortOrder = priceSort.value;
  if (sortOrder === 'asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else {
    filteredProducts = [...products]; 
  }
  applyFiltersAndSort();
});


searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm)
  );
  applyFiltersAndSort();
});


function applyFiltersAndSort() {
  renderProducts(filteredProducts);
}


fetchData();