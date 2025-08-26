import React, { useEffect, useState } from 'react';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../Style/pageStyles/Products.css';
import { useDispatch, useSelector } from 'react-redux';
import { getproducts, reportError } from '../features/products/productslice.js';
import Product from '../components/Products.jsx'; // تصحيح هنا
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Noproduct from '../components/Noproduct.jsx';
import Pagination from '../components/Pagination.jsx';

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, products, error, resultPerPage, productCount, totalPages } = useSelector((state) => state.products);
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('keyword') || '';
  const categorie = searchParams.get('categorie')
  const pagefromurl = parseInt(searchParams.get('page'), 10) || 1;
  const [currentpage, setcurrentpage] = useState(pagefromurl);
  const categories=["laptop","mobile","shirt","tv","glass"]

  const handelpagechange = (page) => {
    if (page !== currentpage) {
      setcurrentpage(page);
      const newsearchParams = new URLSearchParams(location.search);
      if (page === 1) {
        newsearchParams.delete('page');
      } else {
        newsearchParams.set('page', page);
      }
      navigate(`?${newsearchParams.toString()}`);
    }
  };
  const handelCategoryClick=(categorie)=>{
    const newsearchParams = new URLSearchParams(location.search);
    newsearchParams.set('categorie',categorie);
     newsearchParams.delete('page');
      navigate(`?${newsearchParams.toString()}`);

  }

  useEffect(() => {
    dispatch(getproducts({ keyword, page: currentpage,categorie }));
  }, [dispatch, keyword, currentpage,categorie]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === 'string' ? error : error?.message || 'Something is wrong',
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
          <PageTitle title="All Products" />
          <Navbar />
          <div className="products-layout">
            <div className="filter-section">
              <h3 className="filter-heading">CATEGORIES</h3>
              <ul>
              {
                categories.map((categorie)=>{

                  return(
                    <li key={categorie} onClick={()=>handelCategoryClick(categorie)}>
                      {categorie}
                    </li>
                  )

                })
              }
              </ul>
            </div>

            <div className="products-section">
              <div className="products-product-container">
                {products && products.length > 0 ? (
                  <>
                    {products.map((product) => (
                      <Product product={product} key={product._id || product.id} />
                    ))}
                    <Pagination
                      currentpage={currentpage}
                       onpagechange={handelpagechange}
                      
                    />
                  </>
                ) : (
                  <Noproduct keyword={keyword} />
                )}
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Products;
