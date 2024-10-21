/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="mt-5 relative w-full  border-teal-200 h-[300px] group overflow-hidden rounded-lg ">
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
          className="z-20 w-full transition-all duration-300 h-52 group-hover:scale-105 group-hover:w-full"
        />
      </Link>
      <div className="flex flex-col gap-2 p-3">
        <p className="text-lg font-semibold capitalize line-clamp-2" title={post.title}>{post.title}</p>
        <span className="text-xs italic capitalize">{post.category}</span>
        {/* <Link
          className="transition-all duration-300 group-hover:bottom-0 bottom-[-200px] absolute left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white py-2 rounded-md text-center !rounded-tl-none !rounded-tr-none"
          to={`/post/${post.slug}`}
        >
          Read Article
        </Link> */}
      </div>
    </div>
  );
}
