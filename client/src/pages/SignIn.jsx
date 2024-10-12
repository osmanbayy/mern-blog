import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from "../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure('Please fill out all fields!'));
    }
    try {
      dispatch(signInStart())
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data =  await response.json();

      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      // if all functionality is true, stop loading

      if(response.ok){
        dispatch(signInSuccess(data))
        navigate('/');
      }

    } catch (error) {
      dispatch(signInFailure(error.message));
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
          <p className="mt-5 text-sm">This is a demo project! You can sign in with your email and password or with Google.</p>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                ) : 'Sign In'
              }
            </Button>
            <OAuth />
            
          </form>

          {/* Sign In Section */}
          <div className="flex gap-2 mt-5 text-sm">
            <span>Don&apos;t have an account?</span>
            <Link to={'/sign-up'} className="text-blue-500"> Sign Up</Link>
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
