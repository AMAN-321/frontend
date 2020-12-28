import React from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';
import {SearchOutlined} from '@ant-design/icons';
  

const Search = ()=>{
const dispatch = useDispatch();
const {search} = useSelector((state)=>({...state}));
const history = useHistory();
const {text} = search;

const handleChange = (e)=>{
    dispatch({
        type: 'SEARCH_QUERY',
        payload: {text:e.target.value},
    })

}
// ? means query
const handleSubmit = (e)=>{
    e.preventDefault();
    history.push(`/shop?${text}`)

}
// my mean margin at y axis 
return(
  <form className="form-inline my-2 my-lg-0"
  onSubmit={handleSubmit}
  >
      <input className='form-control mr-sm-2' placeholder='Search'
       onChange={ handleChange}
       type='search' value={text} />
       <SearchOutlined style={{cursor:'pointer'}}
        onClick={handleSubmit}/>

  </form>

);




}

export default Search;