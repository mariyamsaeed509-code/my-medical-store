import React, { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "First Aid Kit",
    price: 1250,
    category: "First Aid",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446a50?w=500"
  },
  {
    id: 2,
    name: "Digital Thermometer",
    price: 850,
    category: "Health Devices",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=500"
  },
  {
    id: 3,
    name: "Hand Sanitizer",
    price: 320,
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=500"
  },
  {
    id: 4,
    name: "Skin Care Lotion",
    price: 690,
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500"
  },
  {
    id: 5,
    name: "Medical Face Masks",
    price: 450,
    category: "Personal Care",
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?w=500"
  },
  {
    id: 6,
    name: "Baby Care Pack",
    price: 1150,
    category: "Baby Care",
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=500"
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    setCart((oldCart) => {
      const found = oldCart.find(item => item.id === product.id);

      if (found) {
        return oldCart.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...oldCart, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const orderWhatsApp = () => {
    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }

    const message = cart.map(item =>
      `${item.name} x ${item.qty} = Rs. ${item.price * item.qty}`
    ).join("\n");

    const url = `https://wa.me/?text=${encodeURIComponent(
      "Hello! I want to order:\n" + message +
      "\nTotal: Rs. " + total
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div>
      <header>
        <h1>💊 MediCare Pharmacy</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#cart">Cart ({cart.length})</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="home">
        <div>
          <h2>Your Health, Our Priority!</h2>
          <p>
            Welcome to MediCare Pharmacy.
            Quality healthcare products at your service.
          </p>
          <a href="#products" className="shop-btn">
            Shop Now
          </a>
        </div>
      </section>

      <section className="products" id="products">
        <h2>Our Medical Products</h2>

        <input
          className="search"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="product-grid">
          {filteredProducts.map(product => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <h4>Rs. {product.price}</h4>

              <button onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="cart-section" id="cart">
        <h2>🛒 Shopping Cart</h2>

        {cart.length === 0 && <p>Your cart is empty.</p>}

        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <span>{item.name} × {item.qty}</span>
            <span>Rs. {item.price * item.qty}</span>
            <button onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))}

        <h3>Total: Rs. {total}</h3>

        <button className="order-btn" onClick={orderWhatsApp}>
          Order on WhatsApp
        </button>
      </section>

      <footer id="contact">
        <h2>MediCare Pharmacy</h2>
        <p>Your Health, Our Priority!</p>
        <p>Pakistan | Contact: Add Your Phone Number</p>
        <p>© 2026 MediCare Pharmacy</p>
      </footer>
    </div>
  );
}

export default App;
