/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux';

export default function Comment({ comment, onLike }) {

  const [ user, setUser ] = useState({});
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${comment.userId}`)
        const data = await response.json();
        if (response.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [comment]) 

  return (
    <div className="flex p-4 text-sm border-b dark:border-gray-500">
      <div className="flex-shrink-0 me-3">
        <img className="w-10 h-10 bg-gray-200 rounded-full" src={user.profilePicture} alt={user.username} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-bold truncate me-1">{user ? `@${user.username}` : 'anonymus user'}</span>
          <span className="text-xs text-gray-500">{moment(comment.createdAt).fromNow()}</span>
        </div>
        <p className="mb-2 text-gray-500">{comment.content}</p>
        <div className="flex items-center gap-2 pt-2 border-t dark:border-gray-700 max-w-fit">
          <button type="button" onClick={() => onLike(comment._id)} 
          className={`text-gray-400 hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
            <FaThumbsUp className="text-sm" />
          </button>
          <p className="text-xs text-gray-400">
            {
              comment.numberOfLikes > 0 && comment.numberOfLikes + " " + (comment.numberOfLikes === 1 ? "like" : "likes")
            }
          </p>
        </div>
      </div>
    </div>
  )
}
