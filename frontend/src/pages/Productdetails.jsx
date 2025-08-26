import React, { useEffect, useState } from 'react';
import '../Style/pageStyles/ProductDetails.css';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CreatReviw, getproductDetails, reportError } from '../features/products/productslice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddItemsToCart, removeMessage } from '../features/cart/Cartslice';

const Productdetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState('');
  const [userrating, setUserRating] = useState(0);
  const [selectimage, setselectimage] = useState('');

  const dispatch = useDispatch();

  const { loading, error, product, reviwsuccess, reviwloading } = useSelector(
    (state) => state.products
  );

  const { id } = useParams();

  const {
    message,
    success: cartSuccess,
    error: cartError,
    loading: cartLoading,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setselectimage(product.images[0].url);
    }
  }, [product]);

  useEffect(() => {
    if (id) dispatch(getproductDetails(id));
    return () => dispatch(reportError());
  }, [dispatch, id]);

  useEffect(() => {
    if (error) {
      toast.error(
        typeof error === 'string' ? error : error?.message || 'Something went wrong',
        { position: 'top-center', autoClose: 3000 }
      );
    }
  }, [error]);

  useEffect(() => {
    if (cartSuccess && message) {
      toast.success(message, { position: 'top-center', autoClose: 3000 });
      dispatch(removeMessage());
    }
    if (cartError) {
      toast.error(typeof cartError === 'string' ? cartError : 'Failed to add to cart', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  }, [cartSuccess, cartError, message, dispatch]);

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error('Quantity cannot be less than 1', { position: 'top-center', autoClose: 3000 });
      return;
    }
    setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    if (product.stock <= quantity) {
      toast.error('Quantity is not available', { position: 'top-center', autoClose: 3000 });
      return;
    }
    setQuantity(quantity + 1);
  };

  const addToCart = () => {
    dispatch(AddItemsToCart({ id, quantity }));
  };

  const handleRatingChange = (newRating) => {
    setUserRating(newRating);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!userrating) {
      toast.error('Please provide a rating', { position: 'top-center', autoClose: 3000 });
      return;
    }
    dispatch(CreatReviw({ productId: id, rating: userrating, comment }));
  };

  useEffect(() => {
    if (reviwsuccess) {
      toast.success('Review submitted successfully!', { position: 'top-center', autoClose: 3000 });
      setUserRating(0);
      setComment('');
      dispatch(getproductDetails(id));
    }
  }, [reviwsuccess, dispatch, id]);

  if (loading) return <Loader />;

  if (error || !product)
    return (
      <>
        <PageTitle title="Product Details" />
        <Navbar />
        <Footer />
      </>
    );

  return (
    <>
      <PageTitle title={`${product.name} - Details`} />
      <Navbar />

      <div className="product-details-container">
        <div className="product-detail-container">
          {/* صورة المنتج */}
          <div className="product-image-container">
            <img
              src={selectimage}
              alt={product.name}
              className="product-detail-image"
            />

            {product.images?.length > 1 && (
              <div className="product-thumbnails">
                {product.images.map((item, index) => (
                  <img
                    key={index}
                    src={item.url}
                    alt={`thumbnail ${index + 1}`}
                    className={`thumbnail-image`
                     }
                    onClick={() => setselectimage(item.url)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* معلومات المنتج */}
          <div className="product-info">
            <h2>{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">{product.price}/-</p>

            {/* تقييم المنتج */}
            <div className="product-rating">
              <Rating value={product.rating} disabled={true} />
              <span className="productCardSpan">({product.numOfReviews} Reviews)</span>
            </div>

            {/* حالة المخزون */}
            <div className="stock-status">
              <span className={product.stock > 0 ? 'in-stock' : 'out-of-stock'}>
                {product.stock > 0
                  ? `In Stock (${product.stock} Available)`
                  : 'Out of Stock'}
              </span>
            </div>

            {/* التحكم في الكمية وإضافة للعربة */}
            {product.stock > 0 && (
              <>
                <div className="quantity-controls">
                  <span className="quantity-label">Quantity:</span>
                  <button className="quantity-button" onClick={decreaseQuantity}>
                    -
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    className="quantity-value"
                    readOnly
                  />
                  <button className="quantity-button" onClick={increaseQuantity}>
                    +
                  </button>
                </div>

                <button className="add-to-cart-btn" onClick={addToCart} disabled={cartLoading}>
                  {cartLoading ? 'Adding...' : 'Add To Cart'}
                </button>
              </>
            )}

            {/* نموذج تقييم المنتج */}
            <form className="review-form" onSubmit={handleReviewSubmit}>
              <h3>Write Review</h3>
              <Rating
                value={userrating}
                disabled={false}
                onRatingChange={handleRatingChange}
              />
              <textarea
                placeholder="Write your review here..."
                className="review-input"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button type="submit" className="submit-review-btn" disabled={reviwloading}>
                {reviwloading ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </div>
        </div>

        {/* مراجعات المستخدمين */}
        <div className="reviews-container">
          <h3>Customer Reviews</h3>
          <div className="reviews-section">
            {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div className="review-item" key={review._id || index}>
                  <div className="review-header">
                    <Rating value={review.rating} disabled={true} />
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <p className="review-name">by {review.name}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Productdetails;
