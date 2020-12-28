import React,{useEffect,useState} from "react";
import UserNav from "../../components/nav/UserNav";
import {removeWishlist,getWishlist} from '../../functions/user';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {DeleteOutlined} from '@ant-design/icons';

const Wishlist = () =>{
  const [wishlist,setWishlist] = useState([]);

const {user} = useSelector((state)=>({...state}));

useEffect(()=>{
  loadWishlist();
},[]);

const loadWishlist = ()=>{
  getWishlist(user.token).then((res)=>{
    setWishlist(res.data.wishlist);

  })
}

const handleRemove = (productId)=>{
  removeWishlist(productId,user.token).then((res)=>{
    loadWishlist();
    if(res.data.ok){
      toast.success('Product Removed from Wishlist');
    }
  })

}

return (
  <div className="container-fluid">
    <div className="row">
      <div className="col-md-2">
        <UserNav />
      </div>
      <div className="col">
        <h4>WishList</h4>
      {wishlist.map((p)=>(
        <div className='alert alert-secondary' key={p._id}>
         <Link style={{fontSize: '25px'}} to={`/product/${p.slug}`}>
           {p.title} {" || "} Price: ${p.price} {"   ||  "} Quantity left: {p.quantity}
         </Link>
         <span onClick={()=>handleRemove(p._id)} 
         className='btn btn-sm float-right'><DeleteOutlined className='text-danger' /></span>

        </div>
      ))}
      
      </div>
    </div>
  </div>
)};

export default Wishlist;
