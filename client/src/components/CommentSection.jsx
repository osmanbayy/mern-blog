/* eslint-disable react/prop-types */
import { Alert, Button, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }

    try {
      const response = await fetch("/api/comment/create", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      
      const data = await response.json();
    
      if (response.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
        setCommentError(error.message)
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await fetch(`/api/comment/comments/${postId}`);
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, [postId]);
  
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate('/sign-in');
        return;
      }
      const res = await fetch(`/api/comment/like/${commentId}`, {
        method: 'PUT',
      });
      if (res.ok) {
        const data = await res.json();
        setComments(comments.map((comment) => 
          comment._id === commentId 
            ? { ...comment, likes: data.likes, numberOfLikes: data.likes.length }
            : comment
        ));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEdit = (commentId, editedContent) => {
    setComments(
      comments.map((c) => { c._id === comment._id ? { ...c, content: editedContent } : c })
    )
  }

  return (
    <div className="w-full max-w-2xl p-3 mx-auto">
      {currentUser ? (
        <div className="flex items-center gap-1 my-5 text-sm text-gray-500">
          <p>Signed in as: </p>
          <img className="object-cover w-5 h-5 rounded-full" src={currentUser.profilePicture} alt={currentUser.username}/>
          <Link to={"/dashboard?tab=profile"} className="text-xs text-cyan-600 hover:underline">
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-1 my-5 text-sm text-teal-500">
          You must be signed in to comment!
          <Link className="text-blue-700" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSubmit} className="p-3 border border-teal-500 rounded-md">
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />

          <div className="flex items-center justify-between mt-5">
            <p className="text-xs text-gray-500">
              {200 - comment.length} Characters Left Remaining
            </p>
            <Button type="submit" gradientDuoTone="purpleToBlue" outline>
              Submit
            </Button>
          </div>
          {/* Error Message */}
          { commentError && <Alert color="failure" className="mt-5">{commentError}</Alert> }
        </form>
      )}
      {
        comments.length === 0 ? (
          <p className="my-5 text-sm">No comments yet!</p>
        ) : (
          <>
            <div className="flex items-center gap-1 my-5 text-sm">
              <p>Comments</p>
              <div className="px-2 py-1 border border-gray-500 rounded-sm">
                <p>{comments.length}</p>
              </div>
            </div>
            {
              comments.map((comment, index) => (
                <Comment key={index} comment={comment} onLike={handleLike} onEdit={handleEdit}/>
              ))
            }
          </>
        )
      }
    </div>
  );
}
