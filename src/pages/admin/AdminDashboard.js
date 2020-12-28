import React, {useEffect,useState} from "react";
import AdminNav from "../../components/nav/AdminNav";
import {getOrders,changeStatus} from '../../functions/admin';
import {useSelector,useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

import Orders from '../../components/order/Orders';

const AdminDashboard = () => {
  const [orders,setOrders]= useState([]);



  const {user} = useSelector((state)=>({...state}));
  const dispatch = useDispatch();

  useEffect(()=>{
    loadOrders();

  },[])

  const loadOrders = ()=>{
    getOrders(user.token).then((res)=>{
      console.log(JSON.stringify(res.data,null,4));
      setOrders(res.data);
    })
  }
 
  const handleStatusChange = (orderId,orderStatus)=>{

    changeStatus(orderId,orderStatus,user.token)
    .then((res)=>{
      console.log(res.data);
      toast.success('Status Updated')
      loadOrders();
    })

  }




  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
       
        <div className="col-md-10">
       
        <h4>Admin Dashboard</h4>
        

        <Orders handleStatusChange={handleStatusChange}
        orders={orders}/>
       
  

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
