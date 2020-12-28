import React from "react";
import Jumbotron from '../components/cards/Jumbotron';
import NewArrivals from '../components/home/NewArrivals';
import BestSellers from '../components/home/BestSellers';
import  CategoryList from '../components/category/CategoryList';
import  SubList from '../components/sub/SubList';

const Home = () => {

  return(
    <>
  <div className='jumbotron text-danger h1 font-weight-bold
  text-center'>
    {/* {JSON.stringify(products)} */}
   <Jumbotron text={['LATEST PRODUCTS','NEW ARRIVALS', 'BEST SELLERS']}  />
  </div>

  <div className='text-center p-3 mt-5 mb-5 display-4 jumbotron' >
  New Arrivals
  </div>
  
  <NewArrivals/>

  <div className='text-center p-3 mt-5 mb-5 display-4 jumbotron' >
  Best Sellers
  </div>

  <BestSellers/><br/><br/>



  <div className='text-center p-3 mt-5 mb-5 display-4 jumbotron' >
  Categories
  </div>

  <CategoryList/><br/><br/>


  <div className='text-center p-3 mt-5 mb-5 display-4 jumbotron' >
   Sub Categories
  </div>

  <SubList/><br/><br/>

  </>
);


};

export default Home;
