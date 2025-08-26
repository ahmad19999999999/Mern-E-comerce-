import React, { useEffect } from 'react';
import '../Style/pageStyles/Home.css';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ImageSlider from '../components/ImageSlider';
import Product from '../components/Products';
import PageTitle from '../components/PageTitle';
import { useSelector, useDispatch } from 'react-redux';
import { getproducts ,reportError} from '../features/products/productslice.js';
import Loader from '../components/Loader.jsx';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error, productCount } = useSelector((state) => state.products);
  

  useEffect(() => {
    dispatch(getproducts({keyword:""}));
  }, [dispatch]);

useEffect(() => {
  if (error) {
    toast.error(
      typeof error === 'string' ? error : error?.message || 'somthing is wrong',
      {
        position: 'top-center',
        autoClose: 3000,
      }
    );
    dispatch(reportError());
  }
}, [dispatch, error]);


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <PageTitle title="my-website" />
          <Navbar />
          <ImageSlider />
          <div className="home-container">
            <h2 className="home-heading">Trending Now</h2>

            <div className="home-product-container">
              {products && products.length > 0 ? (
                products.map((product) => (
                  <Product product={product} key={product._id || product.id} />
                ))
              ) : (
                <p>No products available.</p>
              )}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
