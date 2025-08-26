import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import '../Style/AdminStyles/CreateProduct.css'

const categories = ['electronic', 'women', 'men', 'jewelery', 'home', 'kids']

const CreateProduct = () => {
  const [images, setImages] = useState([])
  const [preview, setPreview] = useState([])

  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    price: Yup.number().positive('Price must be positive').required('Price is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    stock: Yup.number().min(0, 'Stock cannot be negative').required('Stock is required'),
  })

  const createProductMutation = useMutation({
    mutationFn: async (productData) => {
      const { data } = await axios.post(
        'http://localhost:3000/api/v1/admin/product/create',
        productData,
        { withCredentials: true }
      )
      return data
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong', {
        position: 'top-center',
        autoClose: 3000,
      })
    },
  })

  const handleSubmit = (values, { resetForm }) => {
    const productData = { ...values, images }

    createProductMutation.mutate(productData, {
      onSuccess: () => {
        toast.success('Product created successfully', { position: 'top-center', autoClose: 3000 })
        resetForm()
        setImages([])
        setPreview([])
      },
    })
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    const newImages = []
    const newPreview = []

    files.forEach((file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        newImages.push(reader.result)
        newPreview.push(reader.result)
        if (newImages.length === files.length) {
          setImages((prev) => [...prev, ...newImages])
          setPreview((prev) => [...prev, ...newPreview])
        }
      }
    })
  }

  return (
    <>
      <PageTitle title="Create Product" />
      <Navbar />
      <div className="create-product-container">
        <h1 className="form-title">Create Product</h1>
        <Formik
          initialValues={{ name: '', price: '', description: '', category: '', stock: '' }}
         validationSchema={validationSchema}
          onSubmit={(values, formikHelpers) => {
         handleSubmit(values, formikHelpers)
                                      }}
           enableReinitialize={true} // مهم لإعادة تعيين الفورم
                   >

          {({ isSubmitting }) => (
            <Form className="product-form">
              <Field type="text" name="name" placeholder="Enter product name" className="form-input" />
              <ErrorMessage name="name" component="div" className="error-msg" />

              <Field type="number" name="price" placeholder="Enter product price" className="form-input" />
              <ErrorMessage name="price" component="div" className="error-msg" />

              <Field type="text" name="description" placeholder="Enter product description" className="form-input" />
              <ErrorMessage name="description" component="div" className="error-msg" />

              <Field as="select" name="category" className="form-select">
                <option value="">Choose a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="error-msg" />

              <Field type="number" name="stock" placeholder="Enter product stock" className="form-input" />
              <ErrorMessage name="stock" component="div" className="error-msg" />

              <div className="file-input-container">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="form-input-file"
                />
              </div>

              <div className="image-preview-container">
                {preview.map((img, i) => (
                  <img src={img} alt="product preview" key={i} className="image-preview" />
                ))}
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting || createProductMutation.isLoading}
              >
                {createProductMutation.isLoading ? 'Creating...' : 'Create'}
              </button>

              {createProductMutation.isLoading && <Loader />}
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  )
}

export default CreateProduct
