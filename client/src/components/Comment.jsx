/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import moment from 'moment';

export default function Comment({ comment }) {

  const [ user, setUser ] = useState({});

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
      </div>
    </div>
  )
}
