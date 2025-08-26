import React, { useState } from 'react' 
import {Link, useNavigate} from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CloseIcon from '@mui/icons-material/Close'
import MenuIcon from '@mui/icons-material/Menu'
import '../Style/componentStyles/Navbar.css'
import '../Style/pageStyles/Search.css'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [issearchopen,setissearchopen]=useState(false)
    const [searchQuery,setsearchQuery]=useState("")
    const [ismenuopen,setismenuopen]=useState(false)
    const toglesearch=()=>{
        setissearchopen(prev => !prev)
    }
    const toggelmenu=()=>setismenuopen(prev => !prev)
    const {isAuthenticated}=useSelector(state=>state.user)
    const navigate=useNavigate()
    const handelsearchsubmit=(e)=>{
        e.preventDefault()
        if(searchQuery.trim()){
            navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`)
        }else{
            navigate(`/products`)
        }
        setsearchQuery("")
        setissearchopen(false) // اغلق البحث بعد الإرسال
        setismenuopen(false) // اختياري: اغلق القائمة بعد البحث
    }
   // cart item
    const { cartItem } = useSelector(state => state.cart);
    
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <div className="navbar-logo">
                <Link to="/" onClick={()=>setismenuopen(false)}>
                ShopEsay
                </Link>
            </div>
            <div className={`navbar-links ${ismenuopen ? `active`:""}`}>
                <ul>
                    <li><Link to="/" onClick={()=>setismenuopen(false)}>Home</Link></li>
                    <li><Link to="/products" onClick={()=>setismenuopen(false)}>Products</Link></li>
                    <li><Link to="/About-us" onClick={()=>setismenuopen(false)}>About-us</Link></li>
                    <li><Link to="/contact-us" onClick={()=>setismenuopen(false)}>Contact-us</Link></li>
                </ul>
            </div>
            <div className="navbar-icons">
                <div className="search-container">
                    {issearchopen && (
                        <form className={`search-form active`} onSubmit={handelsearchsubmit}>
                            <input type="text" className='search-input' placeholder='search products ...' 
                            value={searchQuery} onChange={(e)=>setsearchQuery(e.target.value)} autoFocus/>
                        </form>
                    )}
                    <button 
                        type="button" 
                        className='search-icon' 
                        onClick={toglesearch} 
                        aria-label={issearchopen ? "Close search" : "Open search"}>
                        <SearchIcon focusable="false"/>
                    </button>
                </div>

                <div className="cart-container">
                    <Link to="/cart" onClick={()=>setismenuopen(false)}>
                    <ShoppingCartIcon className="icon"/>
                    <span className="cart-badge">{cartItem.length}</span>
                    </Link>
                </div>

                {!isAuthenticated && <Link to="/Register" className='register-link' onClick={()=>setismenuopen(false)}>
                <PersonAddIcon className="icon"/>
                </Link>}

                <div className="navbar-hamburger" onClick={toggelmenu}>
                    {ismenuopen ? <CloseIcon className="icon"/>:<MenuIcon className="icon"/>}
                </div>
            </div>

        </div>
    </nav>
  )
}

export default Navbar
