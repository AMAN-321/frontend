import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {getCategories}  from '../../functions/category';



const CategoryList = ()=>{
 const [categories, setCategories] = useState([]);
 const [loading, setLoading] = useState(false);
 

 useEffect(()=>{
     setLoading(true);

    getCategories().then((c)=>{
        setCategories(c.data);
        setLoading(false);

    })

 },[])

 const showCategories = ()=>{
     return (

        categories.map((c)=>{
            return(
                
                <Link to={`/category/${c.slug}`} key={c._id} className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
               
               {c.name}
               
               
                
                </Link>
            );
        })



     );
    
   
    }
 



    return(
        <div className='container'>
            {/* {JSON.stringify(categories)} */}
            <div className='row'>
   {loading ? (<h4 className='text-center'>Loading..</h4>) : showCategories() }
            </div>

        </div>
    );
}


export default CategoryList;

