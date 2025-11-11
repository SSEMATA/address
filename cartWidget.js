// cartWidget.js — Reusable floating cart icon

// Create the floating cart element dynamically
function renderCartWidget() {
  const existing = document.querySelector(".cart-icon");
  if (existing) return; // prevent duplicate

  const div = document.createElement("div");
  div.className = "cart-icon";
  div.innerHTML = `🛒<span id="cart-count">0</span>`;
  div.onclick = () => (window.location.href = "cart.html");
  document.body.appendChild(div);

  const style = document.createElement("style");
  style.textContent = `
    .cart-icon {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff7f00;
      color: white;
      font-size: 22px;
      border-radius: 50%;
      padding: 12px 16px;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0,0,0,0.2);
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s ease;
    }
    .cart-icon:hover { transform: scale(1.1); }
    #cart-count {
      background: white;
      color: #ff7f00;
      font-size: 14px;
      font-weight: bold;
      border-radius: 50%;
      padding: 3px 6px;
      margin-left: 5px;
    }
    @media (max-width:768px){
      .cart-icon { top:15px; right:15px; font-size:20px; padding:10px 14px; }
    }
    @keyframes cartBounce {
      0%,100%{transform:scale(1);}
      50%{transform:scale(1.3);}
    }
  `;
  document.head.appendChild(style);

  updateCartCount();
}

// Update count whenever cart changes
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = count;
    // Bounce animation
    const icon = document.querySelector(".cart-icon");
    if (icon) {
      icon.style.animation = "cartBounce 0.4s ease";
      setTimeout(() => (icon.style.animation = ""), 400);
    }
  }
}

// Listen for storage changes (sync across pages)
window.addEventListener("storage", updateCartCount);

// Initialize after page loads
window.addEventListener("DOMContentLoaded", renderCartWidget);
