import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage('Please fill out all fields!');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data =  await response.json();

      if(data.success === false){
        return setErrorMessage(data.message);
      }
      // if all functionality is true, stop loading
      setLoading(false);

      if(response.ok){
        navigate('/sign-in');
      }

    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">

        {/* Left Side */}
        <div className="flex-1">
          <Link to={""} className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              oBay&apos;s
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">This is a demo project! You can sign up with your email and password or with Google.</p>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="">
              <Label value="Your username" />
              <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
            </div>
            <div className="">
              <Label value="Your email" />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>
            <div className="">
              <Label value="Your password" />
              <TextInput type="password" placeholder="**********" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Sign Up'
              }
            </Button>
            <OAuth />

          </form>

          {/* Sign In Section */}
          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to={'/sign-in'} className="text-blue-500"> Sign In</Link>
          </div>
          {/* Error message */}
          {
            errorMessage && (
              <Alert className="mt-5 font-medium" color="failure">
                {errorMessage}
              </Alert>
            )
          }

        </div>
      </div>
    </div>
  );
}
