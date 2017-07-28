import React from 'react';
import logo from 'static/react-logo.svg';

const IndexPage = () => (
  <div class="IndexPage">
    <div class="header">
      <img src={logo} class="logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <style jsx>{`
      .IndexPage {
        text-align: center;

        .logo {
          animation: rotate infinite 20s linear;
          height: 80px;
        }

        .header {
          background-color: #222;
          height: 150px;
          padding: 20px;
          color: white;
        }

        img {
          display: block;
          width: 100px;
          margin: 25px auto;
          animation: rotate infinite 20s linear;
        }
      }

      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

export default IndexPage;