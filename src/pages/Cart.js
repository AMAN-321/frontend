import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import ProductCardInCheckOut from '../components/cards/ProductCardInCheckOut'
import {userCart} from '../functions/user';


const Cart = ({history}) =>{
    const {cart,user} = useSelector((state)=>({...state}));
    const dispatch = useDispatch();

    const getTotal = ()=>{
        return cart.reduce((currentValue,nextValue)=>{
            return currentValue + nextValue.count * nextValue.price

        },0)

    }

const saveOrderToDb = ()=>{
    // console.log(JSON.stringify(cart));
    // alert('save to DB')
    dispatch({
        type: "COD",
        payload: false,
    })

    userCart(cart,user.token)
    .then((res)=>{
        console.log(res);
        if(res.data.ok){
            history.push('/checkout');
        }
    }).catch((err)=>{
        console.log(err);
    })
    

}    


const saveCashOrderToDb = ()=>{
    // console.log(JSON.stringify(cart));
    // alert('save to DB')
    dispatch({
        type: "COD",
        payload: true,
    })
    userCart(cart,user.token)
    .then((res)=>{
        console.log(res);
        if(res.data.ok){
            history.push('/checkout');
        }
    }).catch((err)=>{
        console.log(err);
    })
    

}  

const showCartItems = ()=>{
   return (<table className='table table-bordered'>

        <thead className='thead-light'>
            <tr>
           <th scope='col'>
               Image

           </th>

           <th scope='col'>
               Title

           </th>

           <th scope='col'>
               Price

           </th>
           <th scope='col'>
               Brand

           </th>
           <th scope='col'>
               Color

           </th>
           <th scope='col'>
               Quantity

           </th>
           <th scope='col'>
               Shipping

           </th>
           <th scope='col'>
               Remove

           </th>

            </tr>

        </thead>

        {cart.map((p)=>(
            <ProductCardInCheckOut p={p} key={p._id}/>

        ))}

    </table>);
}

    return(
        <div className='container-fluid pt-2'>
        

            <div className='row'>
                <div className='col-md-9'>
                <h4>
                    Cart / {cart.length} Product
                </h4>
                    { !cart.length ? <h4>
                        No Products in cart. <br/><br/><br/>
                        <Link to='/shop'>
                        continue shopping {`>>`}
                        </Link>
                    </h4> :

                    showCartItems ()

                    }

                </div>

                <div className='col-md-3'>
                <h4>
                    Order Summery
                </h4>
                <hr/>
                <p>
                    Products
                </p>
             {cart.map((c,i)=>(
                 <div key={i}>
                     <p>
                       {c.title} X {c.count} = $ {c.price * c.count}  
                     </p>

                 </div>
             ))}  <hr/>
                  Total: <strong>$ {getTotal()}</strong>
             <hr/>

             {
                 user ? (
                     <>
                     <button disabled={!cart.length}
                     onClick={saveOrderToDb}
                      className="btn btn-sm btn-primary mt-2" >
                      Proceed to CheckOUT
                     </button>

                     <br/>
                     <button  className='btn btn-sm btn-danger btn raised'>OR</button>
                     <br/>

                     <button disabled={!cart.length}
                     onClick={saveCashOrderToDb}
                      className="btn btn-sm btn-primary mt-2" >
                      Proceed to Cash on Delivery
                     </button>
                     
                     
                     </>
                 ) : 
                 (
                    <button className="btn btn-sm btn-primary mt-2" >
                   <Link to={{
                       pathname: '/login',
                       state: {
                           from: 'cart'
                       }
                   }}>
                   Log in to CheckOUT
                   </Link>
                   </button>
                 )
             }


                </div>

            </div>

        </div>
    );

}

export default Cart;