import React ,{useEffect,useState} from 'react';
import {getCategory} from '../../functions/category';
import {Link} from 'react-router-dom';
import ProductCard from '../../components/cards/ProductCard';

const CategoryHome = ({match})=>{
const [category, setCategory] = useState({});
const [loading,setLoading] = useState(false);
const [products, setProducts] = useState([]);
  const {slug} = match.params;

useEffect(()=>{
    setLoading(true);
    getCategory(slug).then((res)=>{
        setCategory(res.data.category);
        setLoading(false);
        console.log(res.data.category);
        setProducts(res.data.products);
    })

},[])


  


    
    
    return(
        <div className='container-fluid'>
          <div className='row'>
              <div className='col'>
                  {loading? <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron' >Loading...</h4>: 
                 <h4 className='text-center p-3 mt-5 mb-5 display-4 jumbotron' >
                     {products.length} Products in "{category.name}" Category
                     </h4>   }

              </div>

          </div>
     <div className='row'>
         {products.map((p)=>
         <div key={p._id} className='col-md-4 mb-4 '>
             <ProductCard 
             product={p}/>

         </div>
         )}

     </div>


        </div>

    );
}

export default CategoryHome;