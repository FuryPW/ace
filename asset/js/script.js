// script.js

const products = [
    { id: 1, name: 'ROG ZEPHYRUS M16 (2023)', price: 339995, description: 'For gamers who demand the absolute best motion and image clarity, the Zephyrus M16 offers an incredible Nebula HDR Display with a 240Hz refresh rate, 100% DCI-P3 coverage, and a staggering 1100 nits of peak brightness for stunning HDR gameplay. The 16-inch, 16:10 Mini LED panel provides incredibly deep blacks for content that jumps right off the screen, whether you’re watching a movie or playing a fast-moving arena shooter. On models without the Mini LED panel, the max brightness peaks at 500 nits, but both panels share QHD resolution and a 240Hz refresh rate, and all models share an incredible 92% screen-to-body ratio.', image: 'asset/img/laptop1.png', quantity: 1 },
    { id: 2, name: 'ROG STRIX G16 (2023)', price: 119995, description: 'Draw more frames and win more games with the brand new Strix G16 and Windows 11 Pro. Powered by up to a 13th Gen Intel® Core™ i9-13980HX Processor and up to an NVIDIA GeForce RTX 4080 Laptop GPU boasting a max TGP of 175W with Dynamic Boost, be ready to dominate the competition in all of the latest games. Backed up with a dedicated MUX Switch and NVIDIA Advanced Optimus support, the Strix G16 unlocks the true potential of its hardware. With PCIe Gen4x4 SSD storage and up to 32GB of 4800MHz DDR5 RAM, large game libraries and intense multitasking sessions are a breeze for this gaming machine', image: 'asset/img/laptop2.png', quantity: 1 },
    { id: 3, name: 'ROG STRIX G18 (2023)', price: 172900, description: 'Draw more frames and win more games with the brand new Strix G18 and Windows 11 Pro. Powered by up to a 13th Gen Intel® Core™ i9-13980HX Processor and up to an NVIDIA GeForce RTX 4080 Laptop GPU boasting a max TGP of 175W with Dynamic Boost, be ready to dominate the competition in all of the latest games. Backed up with a dedicated MUX Switch and NVIDIA Advanced Optimus support, the Strix G18 unlocks the true potential of its hardware. With PCIe Gen4x4 SSD storage and up to 32GB of 4800MHz DDR5 RAM, large game libraries and intense multitasking sessions are a breeze for this gaming machine.', image: 'asset/img/laptop3.png', quantity: 1 },
    { id: 4, name: 'ROG STRIX SCAR 18 (2023)', price: 294995, description: 'Dominate the Windows 11 Pro battlefield with the ROG Strix SCAR 18. Get the drop on the competition with a lightning-fast and crystal-clear 16-inch 2.5K 240Hz Nebula HDR display Mini LED panel with over 2000 dimming zones. Powered by Intel® Core™ i9 Processor 14900HX and up to NVIDIA® GeForce RTX™ 4090 Laptop GPU with a max TGP of 175W, the SCAR 18 easily handles even the most demanding games. It also comes with a dedicated MUX Switch with support for NVIDIA Advanced Optimus, enabling you to easily harness the true power of your GPU when gaming. With support for up to 64GB of DDR5 RAM and up to 4TB of PCIe Gen4x4 storage, the SCAR 18 can easily game, stream, and create content all at the same time without breaking a sweat. For the ultimate gaming laptop, look no further than the Strix SCAR 18', image: 'asset/img/laptop4.png', quantity: 1 },
    // Add more products as needed
];

let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    displayProducts(products);

    document.getElementById('search').addEventListener('input', searchProducts);
    document.getElementById('sort').addEventListener('change', sortProducts);
    document.getElementById('checkout').addEventListener('click', checkout);
});

function displayProducts(products) {
    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="product-description" id="desc-${product.id}">${truncateDescription(product.description)}</p>
            <p style="color: #ce2c32; font-weight: 700">Price: PHP ${product.price}</p>
            <label for="quantity-${product.id}">Quantity: <input type="number" id="quantity-${product.id}" name="quantity" value="${product.quantity}" min="1" style="width: 50px;"> <button onclick="addToCart(${product.id})">Add to Cart</button> </label>  
           
            <br>
            
        `;
        productContainer.appendChild(productElement);
    });
}

function truncateDescription(description) {
    return description.length > 350 ? description.substring(0, 350) + '...' : description;
}

function toggleDescription(id) {
    const descElement = document.getElementById(`desc-${id}`);
    const product = products.find(p => p.id === id);
    if (descElement.textContent.includes('...')) {
        descElement.textContent = product.description;
        descElement.nextElementSibling.textContent = 'Read less';
    } else {
        descElement.textContent = truncateDescription(product.description);
        descElement.nextElementSibling.textContent = 'Read more';
    }
}

function searchProducts() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    displayProducts(filteredProducts);
}

function sortProducts() {
    const sortBy = document.getElementById('sort').value;
    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'price') {
            return a.price - b.price;
        }
    });
    displayProducts(sortedProducts);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = parseInt(quantityInput.value);
    
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    
    updateCart();
}

function updateCart() {
    const cartContainer = document.getElementById('cart');
    cartContainer.innerHTML = '';
    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${item.name} - PHP ${item.price} x ${item.quantity}`;
        cartContainer.appendChild(cartItem);
    });
}

function checkout() {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Checking out: ${cart.map(item => `${item.name} x ${item.quantity}`).join(', ')}. Total: PHP ${total}`);
    cart = [];
    updateCart();
}
