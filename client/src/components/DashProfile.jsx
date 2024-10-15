/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Button, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { deleteFailure, deleteStart, deleteSuccess, updateFailure, updateStart, updateSuccess } from "../redux/user/userSlice";
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [ imageFile, setImageFile ] = useState(null);
  const [ imageFileUrl, setImageFileUrl ] = useState(null);
  const [ imageFileUploadingProgress, setImageFileUploadingProgress ] = useState(null);
  const [ imageFileUploadingError, setImageFileUploadingError ] = useState(null);
  const [ imageFileUploading, setImageFileUploading ] = useState(false);
  const [ updateUserSuccess, setUpdateUserSuccess ] = useState(null);
  const [ updateUserError, setUpdateUserError ] = useState(null);
  const [ showModal, setShowModal ] = useState(false);    // for deleting user popup
  const [ formData, setFormData ] = useState({});

  const dispatch = useDispatch();
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setImageFile(file)
      setImageFileUrl(URL.createObjectURL(file));
    }
  }

  const uploadImage = async () => {
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches('image/.*');
    //     }
    //   }
    // }
    setImageFileUploading(true);
    setImageFileUploadingError(null);
    
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadingProgress(progress.toFixed(0));   //no decimal
      },
      (error) => {
        setImageFileUploadingError('Could not upload image!', error);
        setImageFileUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false)
        });
      }
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if (Object.keys.length === 0) {
      setUpdateUserError('No Changes Made!');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Please Wait for Image to Upload!')
      return;
    }

    try {
      dispatch(updateStart());
  
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        dispatch(updateFailure(data.message));
        dispatch(setUpdateUserError(data.message));
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's Profile Updated Successfully!");
        setUpdateUserError(null);
      }
    } catch (error) {
      const errorMessage = error.message || "Something Went Wrong!";
      dispatch(updateFailure(errorMessage));
      setUpdateUserError(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteStart());
      const response = await fetch(`/api/user/delete/${currentUser._id}`, { method: 'DELETE' });
      const data = await response.json();

      if(!response.ok) {
        dispatch(deleteFailure(data.message));
      } else {
        dispatch(deleteSuccess(data));
      }
      
    } catch (error) {
      dispatch(deleteFailure(error.message));
    }
  }
 
  useEffect(()=>{
    if (imageFile) {
      uploadImage();
    }
  },[imageFile])

  return (
    <div className="w-full max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        
        <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} hidden/>
        {/* Using useRef, we removed the input view and turned the profile picture into input. */}
        <div className="relative self-center w-32 h-32 rounded-full shadow-2xl cursor-pointer">
          {
            imageFileUploadingProgress && 
              <CircularProgressbar 
                value={imageFileUploadingProgress || 0} 
                text={`${imageFileUploadingProgress}%`} 
                strokeWidth={5} 
                styles={{
                  root: { width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }, 
                  path: { color: `rgba(62, 152, 199, ${imageFileUploadingProgress / 100})` }, }}
              />
          }
          <img src={imageFileUrl || currentUser.profilePicture} alt="user" 
            className={`w-full h-full border-8 rounded-full object-cover border-[lightgray] 
                      ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-50'}`} 
            onClick={()=> filePickerRef.current.click()} />
        </div>

        {
          imageFileUploadingError && <Alert color="failure">{imageFileUploadingError}</Alert>
        }
        
        <TextInput onChange={handleChange} type="text" id="username" placeholder="username" defaultValue={currentUser.username} />
        <TextInput onChange={handleChange} type="email" id="email" placeholder="email" defaultValue={currentUser.email} />
        <TextInput onChange={handleChange} type="password" id="password" placeholder="password" />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline>Update</Button>
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
      {
        updateUserSuccess && (
          <Alert color="success" className="mt-5">
            {updateUserSuccess}
          </Alert>
        )
      }
      {
        updateUserError && (
          <Alert color="failure">
            {updateUserError}
          </Alert>
        )
      }
      {
        error && (
          <Alert color="failure">
            {error}
          </Alert>
        )
      }
      {/* Delete user popup window */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"/>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete your acconut?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>Yes, I&apos;m Sure!</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>No, Cancel!</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
