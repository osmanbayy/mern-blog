import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";
export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/post/posts?slug=${postSlug}`);
        const data = await response.json();

        if (!response.ok) {
          setError(true);
          setLoading(false);
          return;
        } else {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      } catch (error) {
        setError(true, error);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const response = await fetch(`/api/post/posts?limit=3`);
        const data = await response.json();
        if (response.ok) {
          setRecentPosts(data.posts);
        }
      }
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  }, [])

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="xl" color="primary" />
      </div>
    );

  return (
    <main className="flex flex-col max-w-6xl min-h-screen p-3 mx-auto">
      
      <h1 className="max-w-2xl p-3 mx-auto mt-10 text-3xl text-center capitalize lg:text-4xl">{post && post.title}</h1>
      
      <Link to={`/search?category=${post && post.category}`} className="self-center mt-5">
        <Button className="capitalize" color="gray" pill size="xs">{post && post.category}</Button>
      
      </Link>
      
      <img src={post && post.image} alt={post.title} className="p-3 mt-10 max-h-[400px] w-full object-cover" />

      <div className="flex justify-between w-full max-w-2xl p-3 mx-auto text-xs border-b border-slate-500">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>

      <div dangerouslySetInnerHTML={{__html: post && post.content}} className="w-full max-w-2xl p-3 mx-auto post-content">
        
      </div>

      <div className="w-full max-w-4xl mx-auto">
        <CallToAction />
      </div>

      <CommentSection postId={post._id} />

      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="mt-5 text-xl">Recent Articles</h1>

        <div className="flex flex-col justify-center gap-1 sm:gap-3 sm:flex-row">
          {
            recentPosts && recentPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))
          }
        </div>
      </div>
    </main>
  );
}
