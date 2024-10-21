/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { Button, Textarea } from 'flowbite-react'
export default function Comment({ comment, onLike, onEdit, onDelete }) {

  const [ user, setUser ] = useState({});
  const { currentUser } = useSelector(state => state.user);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ editedContent, setEditedContent ] = useState(comment.content);

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

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  }

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/comment/edit/${comment._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editedContent })
      })
      if (response.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
        
    } catch (error) {
      console.log(error);
    }
  }

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
        {
          isEditing ? (
            <>
              <Textarea 
                className="mb-2 resize-none" 
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
              />
              <div className="flex justify-end gap-1 text-xs">
                <Button onClick={handleSave} type="button" size="sm" gradientDuoTone="purpleToBlue">Save</Button>
                <Button onClick={() => setIsEditing(false)} type="button" size="sm" gradientDuoTone="purpleToBlue" outline>Cancel</Button>
              </div>
            </>
          ) : (
            <>
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
                {
                  currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && 
                  (
                    <>
                      <button onClick={handleEdit} className="text-xs text-gray-400 hover:text-blue-500" type="button">
                        Edit
                      </button>
                      <button onClick={() => onDelete(comment._id)} className="text-xs text-gray-400 hover:text-red-500" type="button">
                        Delete
                      </button>
                    </>
                  ) 
                }
              </div>
            </>
          )
        }
        
      </div>
    </div>
  )
}
