import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {getSubs}  from '../../functions/sub';



const SubList = ()=>{
 const [subs, setSubs] = useState([]);
 const [loading, setLoading] = useState(false);
 

 useEffect(()=>{
     setLoading(true);

    getSubs().then((s)=>{
        setSubs(s.data);
        setLoading(false);

    })

 },[])

 const showSubs = ()=>{
     return (

        subs.map((s)=>{
            return(
                
                <Link to={`/sub/${s.slug}`} key={s._id} className='col btn btn-outlined-primary btn-lg btn-block btn-raised m-3'>
               
               {s.name}
               
               
                
                </Link>
            );
        })



     );
    
   
    }
 



    return(
        <div className='container'>
            {/* {JSON.stringify(categories)} */}
            <div className='row'>
   {loading ? (<h4 className='text-center'>Loading..</h4>) : showSubs() }
            </div>

        </div>
    );
}


export default SubList;

