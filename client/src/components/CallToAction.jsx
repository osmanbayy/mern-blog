import { Button } from "flowbite-react";
import github from '../assets/github.png'

export default function CallToAction() {
  return (
    <div className="flex flex-col items-center justify-between gap-4 p-3 border border-teal-500 rounded-br-3xl sm:flex-row rounded-tl-3xl">
      <div className="flex flex-col justify-center flex-1">
        <h2 className="text-2xl">Want to learn more about Javascript?</h2>
        <p className="my-2 text-gray-500">Checkout these resources with more Javascript projects!</p>
        <Button className="rounded-bl-none rounded-tl-xl" gradientDuoTone="purpleToPink">
            <a href="https://github.com/osmanbayy" target="_blank" rel="noopener noreferrer">
                Visit my Github
            </a>
        </Button>
      </div>
      <div className="flex-1">
        <img src={github} alt="" />
      </div>
    </div>
  )
}
