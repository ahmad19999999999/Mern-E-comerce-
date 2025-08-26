import React, { useEffect } from 'react'
import '../Style/AdminStyles/ProductsList.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { Delete, Edit } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteProduct, FetchAdminProduct, removeAccess, removeError } from '../features/admin/AdminSlice'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const ProductsList = () => {
    const {products,loading,error} = useSelector((state)=>state.admin)
    console.log(products)
    const dispatch=useDispatch()

    useEffect(() =>{
        dispatch(FetchAdminProduct())

    },[dispatch])

    useEffect(() => {
      if (error) {
        toast.error(
          typeof error === 'string' ? error : error?.message || 'somthing is wrong',
          {
            position: 'top-center',
            autoClose: 3000,
          }
        );
        dispatch(removeError());
      }
    }, [dispatch, error]);

    if(!products || products.length === 0) {
        return(
            <div className='product-list-container'>
                <h1 className='product-list-title'>Admin Products</h1>
                <p className='no-admin-products'>No product Found</p>
            </div>
             
        )
    }

  const handleDelete = async (productId) => {
  const isConfirm = window.confirm('Are you sure you want to delete this product?');
  if (!isConfirm) return;

  try {
     await dispatch(DeleteProduct(productId)).unwrap(); // افترض أنّ الـ dispatch يرجع Promise
    toast.success('Product deleted successfully', { position: 'top-center', autoClose: 3000 });
    dispatch(removeAccess())
  } catch (error) {
    toast.error(error.message || 'Failed to delete product', { position: 'top-center', autoClose: 3000 });
    dispatch(removeError())
  }
};


  return (
    <>
   {loading ? (<Loader/>):(<>
    <PageTitle title='All Products'/>
    <Navbar/>
    <div className='product-list-container'>
        <h1 className='product-list-title'>All Products</h1>

        <table className='product-table'>
            <thead>
                <tr>
                    <th>Sl No</th>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Rating</th>
                    <th>Categorie</th>
                    <th>stock</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
               {products.map((item,index)=> 
               <tr key={item._id}>
                    <td>{index+1}</td>
                    <td><img src={item.images[0]?.url} alt={item.name} className='admin-product-image'/></td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.rating}</td>
                    <td>{item.category}</td>
                    <td>{item.stock}</td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                    <td>
                        <Link to={`/admin/product/${item._id}`} className='action-icon edit-icon'><Edit/></Link>
                        <button className='action-icon delete-icon' onClick={()=>handleDelete(item._id)}><Delete/></button>
                        
                    </td>
                </tr>) 
              }
            </tbody>
        </table>
    </div>
    <Footer/>
    </>)}
    </>
  )
}

export default ProductsList