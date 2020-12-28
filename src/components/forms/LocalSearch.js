import React from 'react';

const LocalSearch = ({keyword,setKeyword})=>{

    const handleSearchChange = (e)=>{
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    
      }

    return(
        
            <input type='search' placeholder='filter'
           value={keyword} onChange={(e)=>handleSearchChange(e)}
           className='form-control mb-4' />
       
        
    );

}

export default LocalSearch;