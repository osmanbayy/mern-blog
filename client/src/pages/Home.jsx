import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import { useEffect, useState } from "react";

export default function Home() {

  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async () => {
      const response = await fetch("/api/post/posts");
      const data = await response.json();
      setPosts(data.posts);
    }
    fetchPosts();
  },[]);

  return (
    <div>
      <div className="flex flex-col max-w-6xl gap-6 p-3 mx-auto lg:p-28">
        <h1 className="text-3xl font-bold lg:text-6xl">Welcome to my Blog!</h1>
        <p className="text-xs text-gray-500 sm:text-sm">
          Here you&apos;ll find a variety of articles and tutorials on topics
          such as web development, software engineering, and programming
          languages.
        </p>
        <Link to={'/search'} className="text-xs font-bold text-teal-500 sm:text-sm hover:underline">View all posts</Link>
      </div>

      <div className="bg-gradient-to-r dark:from-slate-800 dark:to-slate-600 from-zinc-300 to-zinc-200">
        <CallToAction />
      </div>

      <div className="flex flex-col max-w-6xl gap-8 p-3 mx-auto py-7">
        {
          posts && posts.length > 0 && (
            <div className="flex flex-col w-full gap-6">
              <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
              <div className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2 md:grid-cols-3">
                {
                  posts.map((post) => (
                    <PostCard key={post._id} post={post}/>
                  ))
                }
              </div>
              <Link to={'/search'} className="self-center text-lg font-bold text-teal-500 sm:text-sm hover:underline">View all posts</Link>
            </div>
          )
        }
      </div>
    </div>
  );
}
