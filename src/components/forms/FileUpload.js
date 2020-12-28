import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import {useSelector}  from 'react-redux';
import {Avatar,Badge} from 'antd';


const FileUpload = ({values, setValues,setLoading})=>{

    const {user} = useSelector((state)=>({...state}));

    const fileUploadAndResize = (e)=>{
        console.log(e.target.files);
 // resize
   let files = e.target.files;
   let allUploadedFiles = values.images;
   if(files){
       setLoading(true);
       for (let i = 0; i<files.length; i++){
           Resizer.imageFileResizer(files[i],
            720,720,'JPEG',100,0 ,(uri)=>{
                // console.log(uri);
                axios.post(`${process.env.REACT_APP_API}/uploadimages`,
              {image: uri, } ,
              {
                  headers: {
                      authtoken: user? user.token: '',
                  }
              }).then((res)=>{
                  console.log(res);
                  setLoading(false);
                  allUploadedFiles.push(res.data);

                  setValues({...values, images: allUploadedFiles});

              }).catch((err)=>{
                  console.log(err);
                  setLoading(false);
              })


            },
             'base64'
            );
            
       }
   }
 // send back to server to upload to cloudinary
 // set url to images[] in the parent component which is ProductCreate
        

    }


    const handleImageRemove = (public_id)=>{
      setLoading(true);
      console.log(public_id);
      axios.post(`${process.env.REACT_APP_API}/removeimage`,{
          public_id: public_id
      },{
          headers: {
              authtoken: user? user.token: '',
          }
      }).then((res)=>{
         setLoading(false);
          const {images} = values;
          let filteredImages = images.filter((item)=>{
              return item.public_id !== public_id;
          });
          setValues({...values,images: filteredImages})

          

      }).catch((err)=>{
          setLoading(false);
          console.log(err);

      })


    };

    return(
         <>
         <div className='row'>
             {values.images && values.images.map((image)=>{
                 return(
                     <Badge onClick ={()=>{handleImageRemove(image.public_id)}}
                      key={image.public_id}
                      style={{cursor:'pointer'}} count='X'>
                     <Avatar 
                     src={image.url} size={100}
                     className='ml-3' shape='square'  />
                     </Badge>
                 );
             })}

         </div> <br/>
        <div className='row'>
            <label className='btn btn-primary btn-raised'>Choose File
            <input hidden type='file' multiple accept='images/*'
           onChange={fileUploadAndResize} /></label>

        </div>
        </>
    );

}


export default FileUpload;