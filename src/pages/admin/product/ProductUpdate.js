import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import {LoadingOutlined} from '@ant-design/icons';

import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'

import { useSelector } from "react-redux";
import {
  getProduct,
  updateProduct
  
 
} from "../../../functions/product";

import {
    
    getCategories,
    getCategorySubs,
   
  } from "../../../functions/category";
 

import FileUpload from '../../../components/forms/FileUpload';



const initialState ={
    title: '',
    description: '',
    price: '',
    
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




const ProductUpdate = ({match,history})=>{
    // destructure slug from match
    const {slug} = match.params;

    const [values, setValues] = useState(initialState);
    const [subOptions,setSubOptions] = useState([]);
    const [categories,setCategories] = useState([]);
    const [arrayOfSubs,setArrayOfSubs] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const {user} = useSelector((state)=> ({...state}));
  
    useEffect(()=>{
        loadProduct();
        loadCategories();

    },[])

    const loadProduct = ()=>{
        getProduct(slug)
        .then((res)=>{
            console.log(res.data);
            // populate the intial state with fetched product
            setValues({...values, ...res.data});

            // first time category loaded and sub option is fetched
            getCategorySubs(res.data.category._id)
             .then((res)=>{
                 console.log(res);
                 setSubOptions (res.data)
             })

       // prepare array of sub ids to show as default sub values in antd select 
         let arr = [];
         res.data.subs.map((s)=>{
             arr.push(s._id);

         });
         setArrayOfSubs((prev)=> arr);  // required t ant design's select to work


        }).catch((err)=>{
            console.log(err); 
        })
    }


    const loadCategories = () =>
    getCategories()
    .then((c) => setCategories(c.data));




    const handleSubmit = (e)=>{
        e.preventDefault();
      setLoading(true);

      values.subs = arrayOfSubs;
      updateProduct(slug,values,user.token)
      .then((res)=>{
          setLoading(false);
          toast.success(`${res.data.title}  is updated`)
          history.push('/admin/products');

      }).catch((err)=>{
        setLoading(false);
          console.log(err);
          toast.error(err.response.data.err);
      })



    }
    const handleChange = (e) =>{
        
        setValues({...values,
             [e.target.name]: e.target.value });
    
    
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

             setArrayOfSubs([]);
           
       
        }

 


    return(
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2'>

                    <AdminNav/>

                </div>

                <div className='col-md-10'>

                { loading? <LoadingOutlined className='h2 text-danger'/> 
                 : <h4>Product Update</h4>}
                 {/* {JSON.stringify(subOptions)}
                 {JSON.stringify(values)} */}
                    
                    <hr/>

                    <div className='p-3'>
                        <FileUpload
                        values={values}
                        setValues={setValues}
                        setLoading={setLoading}/>

                    </div>
                   

                    <ProductUpdateForm
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    setValues={setValues}
                    values ={values}
                    handleCategoryChange={handleCategoryChange}
                    categories={categories}
                    subOptions={subOptions}
                    arrayOfSubs={arrayOfSubs}
                    setArrayOfSubs={setArrayOfSubs}
                    />
                  

                </div>

            </div>

        </div>
    );

}

export default ProductUpdate;