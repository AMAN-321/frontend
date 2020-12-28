import React, { useEffect,useState } from 'react';
import {getUserCart,createCashOrderForUser,emptyUserCart,saveUserAddress ,applyCoupon,savePhone} from '.././functions/user';
import {useSelector,useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const Checkout = ({history})=>{
    const [products, setProducts] = useState([]);
    const [total,setTotal] = useState(0);
    const [address,setAddress] = useState('');
    const [addressSaved, setAddressSaved] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [phone,setPhone] = useState('');
    const [phoneSaved,setPhoneSaved] = useState(false);
    // discount price
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountError, setDiscountError] = useState('');


    const {user,COD} = useSelector((state)=>({...state}));
    const couponTrueOrFalse = useSelector((state)=>state.coupon);
     const dispatch = useDispatch();



    useEffect(()=>{
        

        getUserCart(user.token)
        .then((res)=>{
            console.log(JSON.stringify(res.data,null,4)); // null and 4 for addtional formating to json stringify
            setProducts(res.data.products);
            setTotal(res.data.cartTotal)

        })


    },[])

    const saveAddressToDb = ()=>{
        // console.log(address);
        saveUserAddress(user.token,address)
        .then((res)=>{
            console.log(res);
            if(res.data.ok){
                setAddressSaved(true);
                toast.success('Address Saved');
            }
        })

    }

    const emptyCart = ()=>{
        if(typeof window !== 'undefined'){
            localStorage.removeItem('cart');

        }
        // remove from redux
        dispatch({
            type: 'ADD_TO_CART',
            payload: [],
        })
        // remove from backend
        emptyUserCart(user.token)
        .then((res)=>{
            console.log(res.data);
            setProducts([]);
            setTotal(0);
            setTotalAfterDiscount(0);
            setCoupon('');

              // update redux coupon applied
              dispatch({
                type: 'COUPON_APPLIED',
                payload: false,
            })
            toast.success('Cart is empty, Continue Shopping')
        })
        

    }

    const applyDiscountCoupon = (e)=>{
        // e.preventDefault();
        console.log(coupon);
        applyCoupon(user.token, coupon).then((res)=>{
             console.log(res.data);
             if(res.data){
                 setTotalAfterDiscount(res.data);

                    // update redux coupon applied
                    dispatch({
                        type: 'COUPON_APPLIED',
                        payload: true,
                    })
             }
             // Error
             if(res.data.err){
                 setDiscountError(res.data.err);
                 // update redux coupon applied
                 dispatch({
                    type: 'COUPON_APPLIED',
                    payload: false,
                })
                 

             }
        })

    }

    const showAddress = ()=>{
        return(
            <>

                   <h4>
                    Dilivery Address
                </h4>
                <br/>
                <br/>
                
              <ReactQuill onChange={setAddress}
               theme='snow' value={address} />

                <button onClick={saveAddressToDb}
                 className='btn btn-primary mt-2'>
                 Save
                </button>
                <hr/>
            
            
            </>

        );

    }

  

   const showProductSummary = ()=>{
       return(
           <>
           <p>Products {products.length} </p>
                <hr/>
             {products.map((p,i)=>(
                 <div key={i}>
                     <p>
                       {p.product.title}  ({p.color}) X
                        {p.count} = {p.product.price * p.count}
                     </p>

                 </div>

             ))}
                



           </>


       );
   }

  const showApplyCoupon = ()=>{
      return(
           <>

           <input onChange={e=> {
               setCoupon(e.target.value)
               setDiscountError('');
           }}
            type='text' className='form-control'
            value={coupon} />

            <button onClick={applyDiscountCoupon}
             className='btn btn-primary mt-2'>
            Apply
            </button>


           </>

      );

  }

  const showphoneInput = ()=>{
      return(<>
      {JSON.stringify(phone)}
      <h4>Your Phone Number:</h4>
          <input className='form-control'
          value={phone} type='number'
          onChange={e=>setPhone(e.target.value)}
          />
          <button disabled={phone==='' || phone.length>11}
           onClick={savePhoneToDb}
          className='btn btn-primary mt-2' >
          Save
          </button>

          </>
      );
  }

  const savePhoneToDb = ()=>{
      savePhone(user.token,phone).then((res)=>{
          if(res.data.ok){
              setPhoneSaved(true);
              toast.success("Phone Number Saved")
          }
      })

  }

  const createCashOrder = ()=>{
      console.log(couponTrueOrFalse)
      createCashOrderForUser(user.token,COD,couponTrueOrFalse).then((res)=>{
        // empty cart redux local storage reset coupon reset cod redirect to history page
        
        
        console.log(res.data)
           if(res.data.ok){

            if(typeof window !=='undefined'){
                localStorage.removeItem('cart');
            }

               dispatch({
                   type:'ADD_TO_CART',
                   payload: [],
               })

               dispatch({
                type:'COUPON_APPLIED',
                payload: false,
            })

            dispatch({
                type:'COD',
                payload: false,
            })
            // empty cart from backend
            emptyUserCart(user.token);
            // redirect
            toast.success('Redirecting you...')
           setTimeout(()=>{
            history.push('/user/history');

           },1000)



           }
      })

  }


    return(
        <div className='row'>
            <div className='col-md-6'>

                {showAddress()}

                {showphoneInput()}

                <h4>Got A Cupon?</h4>
                <br/>

                {showApplyCoupon()}
                <br/>
                {discountError &&  <p className='bg-danger p-2'>
                   {discountError}
                    </p>}
              
                

            </div>

            <div className='col-md-6'>
                <h4>
                    Order Summary
                </h4>
               
                <hr/>

            {showProductSummary()}

            <hr/>
               <h4> Cart Total: ${total} </h4>

               {totalAfterDiscount > 0  &&
                 <h3 className='bg-success p-2' >
                   Discount Applied,  Total payable: ${totalAfterDiscount}
                 </h3>
               }

                

             <div className='row'>
                 <div className='col-md-6'>
                     {COD ? 
                      <button onClick={createCashOrder}
                      disabled={!addressSaved || !products.length || !phoneSaved}
                       className='btn btn-primary'>
                             Place Order
                           </button>
                     :
                     
                     <button onClick={()=> history.push('/payment')}
                     disabled={!addressSaved || !products.length || !phoneSaved}
                      className='btn btn-primary'>
                            Place Order
                          </button>
                    
                    }
                

                 </div>

                 <div className='col-md-6'>
                     <button  disabled={!products.length}
                     onClick={emptyCart}
                      className='btn btn-primary'>
                       Empty Cart
                     </button>

                 </div>

             </div>


</div>

        </div>
    );
}

export default Checkout;