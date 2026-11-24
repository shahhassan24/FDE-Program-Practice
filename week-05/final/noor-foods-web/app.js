const API_URL = "http://127.0.0.1:8000";

function stockLabel(product) {
  if (product.is_discontinued) {
    return "No longer sold";
  } else if (product.stock_quantity === 0) {
    return "Out of stock";
  } else if (product.stock_quantity < 50) {
    return `Only ${product.stock_quantity} left`;
  } else {
    return "In stock";
  }
}

function formatPrice(text) {
  return `Rs ${Number(text).toLocaleString("en-PK")}`;
}

function productCard(product) {
  const card = document.createElement("li");
  card.className = "product-card";

  const name = document.createElement("h3");
  name.textContent = product.name;

  const price = document.createElement("p");
  price.className = "price";
  price.textContent = formatPrice(product.unit_price);

  const stock = document.createElement("p");
  stock.className = product.stock_quantity < 50 ? "stock low" : "stock";
  stock.textContent = stockLabel(product);

  card.append(name, price, stock);
  return card;
}

function showProducts(products) {
  const list = document.querySelector("#product-list");
  list.replaceChildren();
  for (const product of products) {
    list.append(productCard(product));
  }
}

function showMessage(text) {
  document.querySelector("#message").textContent = text;
}

async function loadCategories() {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    return;
  }
  const categories = await response.json();
  const select = document.querySelector("#search-form select");
  for (const category of categories) {
    const option = document.createElement("option");
    option.value = category.category_id;
    option.textContent = category.name;
    select.append(option);
  }
}

function errorText(body) {
  if (typeof body.detail === "string") {
    return body.detail;
  }
  if (Array.isArray(body.detail)) {
    return body.detail.map((error) => error.msg).join(". ");
  }
  return "Something went wrong.";
}

async function loadProducts(params = new URLSearchParams()) {
  params.set("limit", "100");
  showMessage("Loading products...");
  try {
    const response = await fetch(`${API_URL}/products?${params}`);
    if (!response.ok) {
      throw new Error(`The API answered ${response.status}`);
    }
    const products = await response.json();
    showProducts(products);
    showMessage(`${products.length} products`);
  } catch (error) {
    showMessage(`Couldn't load products. ${error.message}`);
  }
}

const searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(searchForm);
  const params = new URLSearchParams();

  const search = data.get("search").trim();
  if (search) {
    params.set("search", search);
  }
  if (data.get("category_id")) {
    params.set("category_id", data.get("category_id"));
  }
  if (data.get("in_stock")) {
    params.set("in_stock", "true");
  }

  loadProducts(params);
});

const orderForm = document.querySelector("#order-form");

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(orderForm);
  const message = document.querySelector("#order-message");

  const order = {
    items: [
      {
        product_id: Number(data.get("product_id")),
        quantity: Number(data.get("quantity")),
      },
    ],
  };

  message.textContent = "Placing order...";
  try {
    const response = await fetch(
      `${API_URL}/customers/${data.get("customer_id")}/orders`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      },
    );
    const body = await response.json();

    if (response.ok) {
      message.textContent =
        `Order ${body.order_id} placed for ${body.customer_name}. ` +
        `Total ${formatPrice(body.items_total)} plus ` +
        `${formatPrice(body.delivery_fee)} delivery.`;
      orderForm.reset();
      loadProducts();
    } else {
      message.textContent = `Order not placed: ${errorText(body)}`;
    }
  } catch (error) {
    message.textContent = `Couldn't reach the shop's system. ${error.message}`;
  }
});

loadProducts();
loadCategories();
