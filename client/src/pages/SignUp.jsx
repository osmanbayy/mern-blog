import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
        {/* left side */}
        <div className="flex-1">
          <Link to={"/"} className="text-4xl font-bold dark:text-white">
            <span className="px-2 py-1 text-white rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              OBAY's
            </span>
            Blog
          </Link>
          <p className="mt-5 text-sm">
            You can sign up with your email and password or with Google account.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="Your username..." />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                autoComplete="off"
              />
            </div>
            <div>
              <Label value="Your email..." />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                autoComplete="off"
              />
            </div>
            <div>
              <Label value="Your password..." />
              <TextInput
                type="password"
                placeholder="********"
                id="password"
                autoComplete="off"
              />
            </div>
            <Button gradientDuoTone="purpleToBlue" type="submit">
              Sign Up
            </Button>
            <div className="flex gap-4 mt-5 text-sm">
              <span>Have an account?</span>
              <Link to={'/sign-in'} className="text-blue-600">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
