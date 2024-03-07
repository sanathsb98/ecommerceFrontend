import React,{useState} from 'react';
import '../upload/UploadModale.css';
import uploadimage from '/src/images/uploadimage.png';
import { useDispatch } from 'react-redux';
import { uploadModaleStatus } from '../../features/modalSlice';

const UploadModale = () => {

 const[uploadedImage,setUploadedImage] = useState(null)
 const[imageCaptions,setImageCaptions] = useState("")

 console.log(imageCaptions)

  const handleDragOver = (event) => {
    event.preventDefault()
  }
  const handleDrop = (event) => {
    event.preventDefault()
    const image = event.dataTransfer.files[0]
    if (image) {
      const reader = new FileReader;
      reader.readAsDataURL(image)
      reader.onloadend = () => {
        setUploadedImage(reader.result)
      }
    }
  }

  const handleFileChange = (event) => {
    //prevent reloading of page:
    event.preventDefault()

    const image = event.target.files[0]
   

    if (image) {
      const reader = new FileReader()
      reader.readAsDataURL(image)
      reader.onloadend = () => {
        setUploadedImage(reader.result)
        console.log(uploadedImage)
      }
    }
  
  }

  const dispatch = useDispatch()
  return (
    <div className='modale-container'>
      <div className='upload-post-content'>
        <div className='close-icon'>
          <svg onClick={() => { dispatch(uploadModaleStatus({ status: false })) }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" /></svg>
        </div>

        <div className='upload-post-title'>File Upload !</div>
        <div className='upload-post-image' onDragOver={handleDragOver} onDrop={handleDrop}>

          {uploadedImage ? (<img src={uploadedImage} width='100px' height='100px' />):( <img src={uploadimage} width='60px' height='60px' />)}
         


          <div className='drag-drop-text'><span className='drag-drop-bold'>Drag & drop files</span> or <label htmlFor='imageuploadbtn' className='browse'>Browse</label></div>
          <input accept='.jpg, .jpeg, .png, .gif' style={{display: 'none'}} id='imageuploadbtn' type='file' onChange={handleFileChange}/>
          <div className='supported-formats'>Supported formates: JPEG, PNG, GIF</div>
        </div>
        <div className='upload-post-description'>
          <textarea onChange={(e)=>{setImageCaptions(e.target.value)}} className='upload-post-input' type='text' placeholder='add a caption' />
        </div>
        <div onClick={() => { dispatch(uploadModaleStatus({ status: true })) }} className='upload-post-button'>Upload</div>
      </div>
    </div>
  )
}

export default UploadModale