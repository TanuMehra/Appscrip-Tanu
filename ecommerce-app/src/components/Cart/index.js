import React from "react";
import Cookies from "js-cookie";

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
  }

  componentDidMount() {
    this.loadCart();
  }

  loadCart = () => {
    const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : {};
    const products = Object.keys(cart).map((id) => ({
      id,
      title: `Product ${id}`,
      image: "https://cdn.pixabay.com/photo/2016/11/19/14/00/shopping-1835416_1280.jpg",
      qty: cart[id],
    }));
    this.setState({ products });
  };

  removeItem = (id) => {
    const cart = Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : {};
    delete cart[id];
    Cookies.set("cart", JSON.stringify(cart), { expires: 7 });
    this.loadCart();
    this.props.updateCartCount();
  };

  render() {
    return (
      <main className="main-content">
        <h1>Your Cart</h1>
        {this.state.products.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="cartList">
            {this.state.products.map((p) => (
              <div key={p.id} className="cartItem">
                <img src={p.image} alt={p.title} className="cartImage" />
                <div className="cartInfo">
                  <h3>{p.title}</h3>
                  <p>Quantity: {p.qty}</p>
                  <button onClick={() => this.removeItem(p.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    );
  }
}

export default Cart;