import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from "../firebase.js";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function CreatePost() {

  const [ file, setFile ] = useState(null);
  const [ imageUploadProgress, setImageUploadProgress ] = useState(null);
  const [ imageUploadError, setImageUploadError ] = useState(null);
  const [ formData, setFormData ] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image!');
        return;
      }
      setImageUploadError(null);
      
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed!', error);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL })
          })
        }
      )
    } catch (error) {
      setImageUploadError('Image upload failed!', error);
      setImageUploadProgress(null);
    }
  }

  return (
    <div className="max-w-3xl min-h-screen p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Post</h1>

      <form className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
            <TextInput type="text" placeholder="Title" required id="title" className="flex-1" />
            <Select>
                <option value="uncategorized">Select a Category</option>
                <option value="javascript">Javascript</option>
                <option value="reactjs">React.js</option>
                <option value="expressjs">Express.js</option>
            </Select>
        </div>

        <div className="flex items-center justify-between gap-4 p-3 border-2 border-teal-400 rounded-lg">
            <FileInput type='file' accept="image/*" onChange={(e) => setFile(e.target.files[0])}/>
            <Button type="button" gradientDuoTone="purpleToBlue" outline size="sm" disabled={imageUploadProgress} onClick={handleUploadImage} >
              {
                imageUploadProgress ? (
                  <div className="w-16 h-16">
                    <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                  </div>
                ) : "Upload Image"
              }
            </Button>
        </div>
        {/* Image Upload Error */}
        {
          imageUploadError &&
            <Alert color="failure">{imageUploadError}</Alert>
        }
        {/* Uploaded Image */}
        {
          formData.image && (
            <img src={formData.image} alt="upload" className="object-cover w-full h-36" />
          )
        }
        <ReactQuill theme="snow" placeholder="Write Somethings..." className="mb-12 h-72" required />
        <Button type="button" gradientDuoTone="purpleToPink">Publish</Button>
      </form>
    </div>
  )
}
