import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import {Link} from 'react-router-dom';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import { useSelector } from "react-redux";
import {
  createSub,
  getSubs,
  getSub,


  removeSub,
} from "../../../functions/sub";

import {getCategories} from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'; 
import LocalSearch from '../../../components/forms/LocalSearch';



const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [subs, setSubs] = useState([]);

  // searching / filtering
  // step 1
  const [keyword,setKeyword] = useState('');


  useEffect( () => {
    loadCategories();
    loadSubs();

   

    
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));


    const loadSubs = () =>
    getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(name);
    setLoading(true);
    createSub({ name, parent:category }, user.token)
      .then((res) => {
        // console.log(res)
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
        
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

 const handleRemove = async (slug) =>{
   if(window.confirm('Delete?')){
     setLoading(true);
     removeSub(slug,user.token)
     .then((res)=>{
       setLoading(false);
       toast.error(`${res.data.name} is deleted!`);
       loadSubs();

     })
     .catch((err)=>{
       setLoading(false);
       if (err.response.status === 400) toast.error(err.response.data);
     })
   }
 }


  // const categoryForm = () => (
  //   <form onSubmit={handleSubmit}>
  //     <div className="form-group">
  //       <label>Name</label>
  //       <input
  //         type="text"
  //         className="form-control"
  //         onChange={(e) => setName(e.target.value)}
  //         value={name}
  //         autoFocus
  //         required
  //       />
  //       <br />
  //       <button className="btn btn-outline-primary">Save</button>
  //     </div>
  //   </form>
  // );




  // step 4

  const searched = (keyword) => (s)=> s.name.toLowerCase().includes(keyword)

  




  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Create Sub category</h4>
          )}

          <div className='form-group'>
              <label>Parent Category</label>
              <select name='category' className='form-control'
              onChange={(e)=>setCategory(e.target.value)} >
                  <option>Please Select</option>
                  {categories.length>0 && categories.map((c)=>{
                      return(
                          
                          <option key={c._id}  value={c._id}>
                              {c.name}
                          </option>
                      );
                  })}

              </select>
            

          </div>
          {/* {JSON.stringify(category)} */}
          
          
          <CategoryForm handleSubmit={handleSubmit}
          setName={setName} name={name}/>
          
          <LocalSearch keyword={keyword} setKeyword={setKeyword}  />
           
           

         
            {/* step 5 */}
           
          {subs.filter(searched(keyword)).map((s)=>{
           return (<div className='alert alert-primary' key={s._id}>
             {s.name}

             <span onClick={()=>{handleRemove(s.slug)}}
              className='btn btn-sm float-right'>
               <DeleteOutlined className='text-danger'/></span>
             <span className='btn btn-sm float-right'>
               <Link to={`/admin/sub/${s.slug}`}>
                 <EditOutlined className='text-warning'/></Link></span>

           </div>);
          })}
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
