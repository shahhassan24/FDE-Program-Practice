const API_URL = "http://127.0.0.1:8000";

function errorText(body) {
  if (typeof body.detail === "string") {
    return body.detail;
  }
  if (Array.isArray(body.detail)) {
    return body.detail.map((error) => error.msg).join(". ");
  }
  return "Something went wrong.";
}

async function loadLowStock() {
  const message = document.querySelector("#stock-message");
  const list = document.querySelector("#low-stock");
  try {
    const response = await fetch(`${API_URL}/products/low-stock`);
    if (!response.ok) {
      throw new Error(`The API answered ${response.status}`);
    }
    const products = await response.json();
    list.replaceChildren();
    for (const product of products) {
      const item = document.createElement("li");
      const name = document.createElement("span");
      name.textContent = product.name;
      const stock = document.createElement("strong");
      stock.className = "low";
      stock.textContent = `${product.stock_quantity} left`;
      item.append(name, stock);
      list.append(item);
    }
    message.textContent =
      products.length === 0 ? "Nothing is running low." : "";
  } catch (error) {
    message.textContent = `Couldn't load stock. ${error.message}`;
  }
}

async function confirmOrder(orderId) {
  const message = document.querySelector("#orders-message");
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "confirmed" }),
    });
    if (!response.ok) {
      const body = await response.json();
      throw new Error(errorText(body));
    }
    message.textContent = `Order ${orderId} confirmed.`;
    loadPendingOrders();
  } catch (error) {
    message.textContent = `Couldn't confirm order ${orderId}. ${error.message}`;
  }
}

async function loadPendingOrders() {
  const message = document.querySelector("#orders-message");
  const list = document.querySelector("#pending-orders");
  try {
    const response = await fetch(`${API_URL}/orders?status=pending&limit=20`);
    if (!response.ok) {
      throw new Error(`The API answered ${response.status}`);
    }
    const orders = await response.json();
    list.replaceChildren();
    for (const order of orders) {
      const item = document.createElement("li");
      const text = document.createElement("span");
      const time = new Date(order.ordered_at).toLocaleString("en-PK");
      text.textContent = `#${order.order_id} · ${order.customer_name} · ${time}`;
      const button = document.createElement("button");
      button.textContent = "Confirm";
      button.addEventListener("click", () => confirmOrder(order.order_id));
      item.append(text, button);
      list.append(item);
    }
  } catch (error) {
    message.textContent = `Couldn't load orders. ${error.message}`;
  }
}

loadLowStock();
loadPendingOrders();
