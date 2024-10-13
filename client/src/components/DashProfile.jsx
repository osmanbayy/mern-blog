/* eslint-disable react-hooks/exhaustive-deps */
import { Alert, Button, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase"
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [ imageFile, setImageFile ] = useState(null);
  const [ imageFileUrl, setImageFileUrl ] = useState(null);
  const [ imageFileUploadingProgress, setImageFileUploadingProgress ] = useState(null);
  const [ imageFileUploadingError, setImageFileUploadingError ] = useState(null);

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
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => setImageFileUrl(downloadURL));
      }
      
    )
  }
 
  useEffect(()=>{
    if (imageFile) {
      uploadImage();
    }
  },[imageFile])

  return (
    <div className="w-full max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        
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
        
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} />
        <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email} />
        <TextInput type="password" id="password" placeholder="password" />

        <Button type="submit" gradientDuoTone="purpleToBlue" outline>Update</Button>
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
