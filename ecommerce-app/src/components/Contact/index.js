import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Contact extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <h2>Contact Us</h2>
          <p>Reach out via email or phone for any inquiries.</p>
        </main>
        <Footer />
      </>
    );
  }
}

export default Contact;