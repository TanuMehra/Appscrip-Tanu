import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cookies from 'js-cookie';
import './index.css';

class Sales extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  async componentDidMount() {
    try {
      // 20 products laa rahe hain fakestoreapi se
      const res = await fetch('https://fakestoreapi.com/products?limit=20');
      let data = await res.json();

      // Random discount aur discounted price calculate karte hain
      data = data.map((p) => {
        const discount = Math.floor(Math.random() * 40) + 10; // 10–50%
        const discountedPrice = (p.price * (1 - discount / 100)).toFixed(2);
        return { ...p, discount, discountedPrice };
      });

      this.setState({ products: data });
    } catch (err) {
      console.error('Error loading products:', err);
    }
  }

  addToCart = (product) => {
    const cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : {};
    cart[product.id] = cart[product.id] ? cart[product.id] + 1 : 1;
    Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
    alert`(${product.title} added to cart!)`;
  };

  render() {
    const { products } = this.state;

    return (
      <>
        <Header />
        <main className="sales-page">
          <div className="sales-header">
            <h1>🔥 Big Sale is Live!</h1>
            <p>Grab your favorite products at up to 50% OFF!</p>
          </div>

          <section className="productsGrid">
            {products.length > 0 ? (
              products.map((p) => (
                <div className="product-card sale" key={p.id}>
                  <div className="image-container">
                    <img src={p.image} alt={p.title} />
                    <div className="discount-badge">-{p.discount}%</div>
                  </div>

                  <h4>{p.title.length > 50 ? p.title.slice(0, 50) + '...' : p.title}</h4>

                  <div className="price-section">
                    <span className="old-price">${p.price.toFixed(2)}</span>
                    <span className="new-price">${p.discountedPrice}</span>
                  </div>

                  <button
                    className="buy-btn"
                    onClick={() => this.addToCart(p)}
                  >
                    Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p>Loading products...</p>
            )}
          </section>
        </main>
        <Footer />
      </>
    );
  }
}

export default Sales;