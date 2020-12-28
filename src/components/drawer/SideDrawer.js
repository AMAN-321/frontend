import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {Drawer,Button} from 'antd';
import {Link} from 'react-router-dom';
import laptop from '../../images/laptop.png';

const SideDrawer = ()=>{
  const {drawer,cart} = useSelector((state)=>({...state}));
  const dispatch = useDispatch();
  
  const imageStyle = {
      width: '100%',
      height: '50px',
      objectFit: 'cover'
  }

// placement in Drawer compnent can be right left ... default is right side of the page
    return(
       <Drawer className='text-center'
       placement='right'
       closable={true}
       title={`CART / ${cart.length} Product`}
       onClose={()=>{
     // show cart in drawer visibility to false
      dispatch({
        type: "SET_VISIBLE",
        payload: false,
      });
       }}
       visible={drawer}>

       {cart.map((p)=>(
           <div key={p._id} className='row'>
               <div className='col'>
                   {p.images[0] ? 
                   <>
                  <img 
                   src ={p.images[0].url} style={imageStyle}
                   /> 
                   <p className='text-center bg-secondary text-light'>
                       {p.title} X {p.count}
                   </p>
                  </>
                   :
                  <>
                   <img src={laptop} style={imageStyle} />
                   <p className='text-center bg-secondary text-light'>
                   {p.title} X {p.count}
               </p>
              </>

                   
                
                }


               </div>

           </div>
       ))}

           {/* {JSON.stringify(cart)} */}

        
               <Link to='/cart'>
                   <button onClick={()=>{
                       dispatch({
                           type: 'SET_VISIBLE',
                           payload: false,
                       })
                   }}
                   className='text-center btn btn-primary btn-raised btn-block'>
                       GO to CART
                   </button>
                   
               </Link>
           

       </Drawer>
    );
}

export default SideDrawer;