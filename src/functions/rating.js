import React from 'react';
import StarRating from 'react-star-ratings';

// reduce work like if you have 1,4,7, 8 then 1+4 = 5 then 5 + the next value 7
export const showAverage = (p)=>{
    if(p && p.ratings){
        let ratingsArray = p && p.ratings;
        let total = [];
        let length = ratingsArray.length;

        ratingsArray.map((r)=>{
            return (total.push(r.star))
        })
        // 0 is intial value of total reduced
        let totalReduced = total.reduce((p,n)=> p+n , 0) 
      let highest = length * 5;
      let result = (totalReduced*5) / highest;

      return(
          <div className='text-center pt-1 pb-3'>
              <span>
                  <StarRating starDimension='20px'
                  starSpacing='2px'
                  starRatedColor='red'
                  editing ={false}
                  rating={result}
                  
                  />{" "}  ({p.ratings.length})
              </span>

          </div>
      );
   
    }

}
