import React ,{useState} from 'react';
import {Card ,Tabs,Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import {HeartOutlined,ShoppingCartOutlined,} from '@ant-design/icons';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from '../../images/laptop.png';
import ProductListItems from './ProductListItems';
import  StarRating from 'react-star-ratings';
import RatingModal from '../modal/RatingModal';
import {showAverage} from '../../functions/rating';
import _ from 'lodash';
import {useDispatch,useSelector} from 'react-redux';
import {addToWishlist} from '../../functions/user';
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom';

const {TabPane} = Tabs;


// this is a children component of Product page

const SingleProduct = ({product,onStarClick,star})=>{
    const dispatch = useDispatch();
    let history = useHistory();
    const {user,cart} = useSelector((state)=>({...state}));
    const [tooltip,setTooltip]= useState('Add to cart');

    const handleAddToCart = ()=>{
     
        // create cart array
        let cart = [];
        if(typeof window !== 'undefined'){
            // if already cart is in local storage get it
            if(localStorage.getItem('cart')){
                cart = JSON.parse(localStorage.getItem('cart'))

            }
            // push new product ot cart
            cart.push({
                ...product,
                count: 1,
            })
            // remove duplicates
            let unique = _.uniqWith(cart,_.isEqual);

            // save to local storage
            localStorage.setItem('cart',JSON.stringify(unique))
          
               // show tooltip
                setTooltip('added');
                // add to redux state
                dispatch({
                    type:"ADD_TO_CART",
                    payload: unique, 
                })

     // show cart in drawer visibility
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });

        }

    }





    const {title,
        
        images,
        description,
       _id,
      

    }
    
    = product;

  const  handleAddToWishlist = (e)=>{
      e.preventDefault();
      addToWishlist(product._id,user.token).then((res)=>{
          if(res.data.ok){
              toast.success("Added to your Wishlist");
              history.push('/user/wishlist');
          }
      })


  }




    return(
      <>

      <div className='col-md-7'>
        { images && images.length ?  
         <Carousel showArrows={true}
          autoPlay
          infiniteLoop
          
          >

              {images && images.map((i)=>{
                  return(
                      <img  key={i.public_id}
                      src={i.url}
                      
                      />
                  );

              })}


          </Carousel> : 

          <Card
          cover={
            <img style={{objectFit: 'contain'}}
            src={Laptop}
           
            className="mb-3 card-image"
            />
 
        }
          
          >

          </Card>
          
          }

          <Tabs type='card'>
              <TabPane tab='Description' key='1'>
                  {description && description}


              </TabPane>


              <TabPane tab='More' key='2'>
                 
              Call Us on XXXXXXXXXXX

              </TabPane>

          </Tabs>

      </div>

      <div className='col-md-5'>
          <h1 className='bg-info p-3'>
              {title}
          </h1>
         { product && product.ratings && 
         product.ratings.length >0 ?
          showAverage(product)  : <div className='text-center pt-1 pb-3'>
                                 No Ratings Yet
                                </div>    } 

 {/* // rating system */}

 

       
         
          <Card
           actions={[
            <>
            <Tooltip title={tooltip}>
            <a disabled={product.quantity<1}>
        <ShoppingCartOutlined
        onClick={handleAddToCart}
        className='text-danger'/> 
        <br/> {product.quantity<1 ? 'Out of Stock': 'Add to Cart'}
        </a>
       </Tooltip>
            </>,
          <a onClick={handleAddToWishlist}>
              <HeartOutlined className='text-info'/><br/>
               Add to Wishlist
          </a>,

<RatingModal>
<StarRating
   name={_id}
   numberOfStars ={5}
   rating = {star}
   changeRating = {onStarClick}
   isSelectable={true}
   starRatedColor='red'
  />
      


</RatingModal>,

        ]}
          
          >

              <ProductListItems product={product} />

      


          </Card>

      </div>
      
      
      </>


    );

}

export default SingleProduct;