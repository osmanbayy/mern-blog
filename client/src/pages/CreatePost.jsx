import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <div className="max-w-3xl min-h-screen p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Create a Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
          />
          <Select>
            <option value="uncategorized">Select a Category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="expressjs">Express.js</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 p-3">
          <FileInput type="file" accept="image/*" />
          <Button type="button" gradientDuoTone="purpleToBlue" outline>
            Upload Image
          </Button>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="mb-12 h-72"
          required
        />
        <Button type="submit" gradientDuoTone='purpleToPink'>Publish</Button>
      </form>
    </div>
  );
}
