import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import {LoadingOutlined} from '@ant-design/icons';

import { useSelector } from "react-redux";
import {
  createProduct,
  
 
} from "../../../functions/product";

import {
    
    getCategories,
    getCategorySubs,
   
  } from "../../../functions/category";
 
import ProductCreateForm from '../../../components/forms/ProductCreateForm';
import FileUpload from '../../../components/forms/FileUpload';




 const initialState ={
    title: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', "Brown", "Silver", "White", 'Blue',"Red"],
    brands: ["Apple",'Samsung','Lenovo','Microsoft', 'ASUS'],
    color: '',
    brand: '',

 };


const ProductCreate = ()=>{
    const [values, setValues] = useState(initialState);
    const {user} = useSelector((state)=> ({...state}));
    const [subOptions,setSubOptions] = useState([]);
    const [showSub,setShowSub] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadCategories();
      }, []);
    
      const loadCategories = () =>
        getCategories()
        .then((c) => setValues({...values, categories: c.data }));

    

    const handleSubmit = (e)=>{
        e.preventDefault();
        createProduct(values,user.token)
        .then((res)=>{
            console.log(res);
            window.alert (`"${res.data.title}" is created`);
            window.location.reload();
        }).catch((err)=>{
            console.log(err);
            // if(err.response.status ===400) toast.error(err.response.data);
           toast.error(err.response.data.err);
        })


    }

    const handleChange = (e) =>{
        
    setValues({...values, [e.target.name]: e.target.value });


    }

    const handleCategoryChange = (e)=>{
        e.preventDefault();
        console.log(e.target.value);
        setValues({...values, subs:[] ,
            category: e.target.value });
         getCategorySubs(e.target.value)
         .then((res)=>{
             console.log(res);
             setSubOptions (res.data);

         })
         setShowSub(true);
   
    }

    return(
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>

                    <AdminNav/>

                </div>

                <div className='col-md-10'>
                   { loading ?
                    <LoadingOutlined className="text-danger h2"/> 
                   : <h4>Product Create</h4>}
                    
                    <hr/>
                  

                    <div className='p-3'>
                        <FileUpload
                        values={values}
                        setValues={setValues}
                        setLoading={setLoading}/>

                    </div>


                    <ProductCreateForm handleSubmit={handleSubmit}
                    handleChange={handleChange} values={values}
                    handleCategoryChange={handleCategoryChange}
                    subOptions={subOptions}
                    showSub={showSub}
                    setValues={setValues} />


                   

                </div>

            </div>

        </div>
    );

}

export default ProductCreate;