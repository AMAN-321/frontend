import React, { useState,useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {toast} from 'react-toastify';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {DeleteOutlined,} from '@ant-design/icons';

import {createCoupon, getCoupons, removeCoupon} from '../../../functions/coupon';
import AdminNav from '../../../components/nav/AdminNav';


const CreateCouponPage = ()=>{
    const [name ,setName] = useState('');
    const [expiry ,setExpiry] = useState('');
    const [discount ,setDiscount] = useState('');
    const [loading ,setLoading] = useState(false);
    const [coupons, setCoupons] = useState([]);

    const {user} = useSelector((state)=>({...state}));

    const dispatch = useDispatch();

    useEffect(()=>{
      loadAllCoupons();

    },[])

    const loadAllCoupons = ()=>{
        getCoupons()
        .then((res)=>{
          setCoupons(res.data);
        })
    }


    const handleSubmit =(e)=>{
        e.preventDefault();
        setLoading(true);
        console.table(name,discount,expiry);
        createCoupon({name,expiry,discount},user.token)
        .then((res)=>{
            setLoading(false);

          loadAllCoupons();

            setName('');
            setDiscount('');
            setExpiry('');
            toast.success(`${res.data.name} is Created`);

        }).catch((err)=>{
            console.log(err);
        })



    }

    const handleRemove = (couponId)=>{
        setLoading(true);
        if(window.confirm('Delete?')){
            removeCoupon(couponId,user.token).then((res)=>{
              
                loadAllCoupons();
                
                setLoading(false);
                toast.error(`Coupon "${res.data.name}" is Deleted`)

            }).catch((err)=>{
                console.log(err);
            })
        }

    }
   


    return(
        <div className='container-fluid'>
            
            <div className='row'>
                <div className='col-md-2'>
                    <AdminNav/>

                </div>

                <div className='col-md-10'>
                    {loading? <h4 className='text-danger'>Loading...</h4>:
                    <h4>Coupon</h4>
                    }
                

                <form onSubmit={handleSubmit}>
                    <div className='form-group'>
                    <label className='text-muted'>
                        Name
                    </label>

                    <input value={name}
                     onChange={(e)=>setName(e.target.value)}
                    type='text' className='form-control'
                    autoFocus required />
                      

                    </div>


                    <div className='form-group'>
                    <label className='text-muted'>
                        Discount %
                    </label>

                    <input value={discount}
                     onChange={(e)=>setDiscount(e.target.value)}
                    type='text' className='form-control'
                     required />
                      

                    </div>


                    <div className='form-group'>
                    <label className='text-muted'>
                        Expiry
                    </label><br/>

                   <DatePicker className='form-control'
                   selected={expiry? expiry : new Date()}
                    value={expiry} 
                   onChange={(date)=>setExpiry(date)}
                   required />
                      

                    </div>

                    <button className='btn btn-outline-primary '>
                    Save
                    </button>




                </form>

                <br/>

                {coupons.length}

                <table className='table table-bordered'>
                    <thead className='thead-light'>
                        <tr>
                            <th scope='col'>
                                Name
                            </th>

                            <th scope='col'>
                               
                                Expiry
                            </th>

                            <th scope='col'>
                            Discount
                            </th>

                            <th scope='col'>
                            Action
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        {coupons.map((c)=>(
                            <tr key={c._id}>

                                <td>
                                    {c.name}

                                </td>

                                <td>
                                    {new Date(c.expiry).toLocaleDateString()}

                                </td>

                                <td>
                                    {c.discount} %

                                </td>

                                <td className='text-center'>
                                     <DeleteOutlined  onClick={()=> handleRemove(c._id)}
                                     style={{cursor: 'pointer'}}
                                     className='text-danger'/>
 
                                </td>

                            </tr>

                        ))}
                    </tbody>

                </table>
                     
                </div>

            </div>

        </div>
    );
}


export default CreateCouponPage;
