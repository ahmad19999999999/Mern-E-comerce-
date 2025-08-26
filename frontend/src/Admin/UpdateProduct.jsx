import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';
import PageTitle from '../components/PageTitle';
import Footer from '../components/Footer';
import '../Style/AdminStyles/UpdateProduct.css';

const UpdateProduct = () => {
  const categories = ['electronic', 'women', 'men', 'jewelery', 'home', 'kids'];
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [previewImages, setPreviewImages] = useState([]);
  const navigate=useNavigate()

  // جلب بيانات المنتج
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:3000/api/v1/product/${id}`);
      return data.product || data;
    },
  });

  // تحويل الصور إلى Base64
  const handleImageChange = (e, setFieldValue) => {
    const files = Array.from(e.target.files);
    const readers = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((imagesBase64) => {
      setPreviewImages(imagesBase64);
      setFieldValue('images', imagesBase64);
    });
  };

  // تحديث المنتج
  const mutation = useMutation({
    mutationFn: async (values) => {
      const payload = {};
      if (values.name) payload.name = values.name;
      if (values.price) payload.price = values.price;
      if (values.description) payload.description = values.description;
      if (values.category) payload.category = values.category;
      if (values.stock) payload.stock = values.stock;
      if (values.images && values.images.length > 0) payload.images = values.images;

      const { data } = await axios.put(
        `http://localhost:3000/api/v1/admin/product/update/${id}`,
        payload,
        { withCredentials: true }
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      toast.success('Product updated successfully!', { position: 'top-center', autoClose: 3000 });
      navigate('/admin/products')
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Update failed', { position: 'top-center', autoClose: 3000 });
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <PageTitle title="Update Product" />
      <ToastContainer />
      <div className="update-product-wrapper">
        <h1 className="update-product-title">Update Product</h1>

        <Formik
          enableReinitialize
          initialValues={{
            name: product?.name || '',
            price: product?.price || '',
            description: product?.description || '',
            category: product?.category || '',
            stock: product?.stock || '',
            images: [],
          }}
          onSubmit={(values) => mutation.mutate(values)}
        >
          {({ setFieldValue }) => (
            <Form className="update-product-form">
              <label>Product Name</label>
              <Field type="text" name="name" className="update-product-input" />

              <label>Product Price</label>
              <Field type="number" name="price" className="update-product-input" />

              <label>Description</label>
              <Field as="textarea" name="description" className="update-product-textarea" />

              <label>Product Category</label>
              <Field as="select" name="category" className="update-product-select">
                <option value="">Choose a Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Field>

              <label>Stock</label>
              <Field type="number" name="stock" className="update-product-input" />

              <label>Product Images</label>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                className="update-product-file-input"
                onChange={(e) => handleImageChange(e, setFieldValue)}
              />

              <div className="update-product-preview-wrapper">
                {previewImages.map((img, i) => (
                  <img key={i} src={img} alt="Preview" className="update-product-preview-image" />
                ))}
              </div>

              <div className="update-product-old-images-wrapper">
                {product?.images?.map(
                  (img, i) => img.url && (
                    <img key={i} src={img.url} alt="Old Product" className="update-product-old-image" />
                  )
                )}
              </div>

              <button type="submit" className="update-product-submit-btn">Update</button>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  );
};

export default UpdateProduct;
