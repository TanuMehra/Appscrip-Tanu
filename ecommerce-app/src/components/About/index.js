import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

class About extends React.Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <h2>About Us</h2>
          <p>Learn about our company and story.</p>
        </main>
        <Footer />
      </>
    );
  }
}

export default About;