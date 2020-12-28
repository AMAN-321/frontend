import React from 'react';
import {CheckCircleOutlined,CloseCircleOutlined} from '@ant-design/icons';
import ShowPaymentInfo from '../cards/ShowPaymentInfo';

const Orders = ({orders,handleStatusChange})=> {

    const showOrderInTable = (order)=>(
        <table className='table table-bordered'>
          <thead className='thead-light'>
            <tr>
              <th scope='col'>Title</th>
              <th scope='col'>Price</th>
              <th scope='col'>Brand</th>
              <th scope='col'>Color</th>
              <th scope='col'>Count</th>
              <th scope='col'>Shipping</th>
      
            </tr>
      
          </thead>
      
          <tbody>
            {order.products.map((p,i)=>(
              <tr key={i}>
      
                <td><b>{p.product.title}</b></td>
                <td>${p.product.price}</td>
                <td>{p.product.brand}</td>
                <td>{p.color}</td>
                <td>{p.count}</td>
                <td>{p.product.shipping === 'Yes'? 
                <CheckCircleOutlined className='text-success'/>:
                 <CloseCircleOutlined className='text-danger'/>}</td>
      
              </tr>
      
            ))}
      
          </tbody>
      
        </table>
      );


   return(
    <>
    {orders.map((order)=>(
        <div className='row pb-5' key={order._id}>
        
        <div className='btn btn-block bg-light'>

        <ShowPaymentInfo showStatus={false}
         order={order}/>

<div className='row'>
    <div className='col-md-4'>
        dilevery Status
{/* enum: ['Not Processed','processing',
'Dispatched','Cancelled','Completed',], */}



    </div>
    <div className='col-md-8'>
      <select className='form-control'
      defaultValue={order.orderStatus} name='status'
      onChange={(e)=> 
       handleStatusChange(order._id,e.target.value)}>
          <option value='Cash On Delivery'>
          Cash On Delivery
             </option> 
         <option value='Not Processed'>
             Not Processed
             </option> 
             <option value='processing'>
             processing
             </option>  
             <option value='Dispatched'>
             Dispatched
             </option>  
             <option value='Cancelled'>
             Cancelled
             </option>  
             <option value='Completed'>
             Completed
             </option>  
            

      </select>
    </div>

</div>

        </div>
        {showOrderInTable(order)}

       { order.orderdBy.address && <div>
          Delivery Address: {order.orderdBy.address.replace(/<[^>]+>/g, '')} <br/>
          Phone Number: {order.orderdBy.phone}
        </div>}

        </div>
        

    ))}
    
    
    </>
);
}

export default Orders;