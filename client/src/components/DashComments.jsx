/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashComments() {
  const { currentUser } = useSelector((state) => state.user);
  const [ comments, setComments] = useState([]);
  const [ showMore, setShowMore] = useState(true);
  const [ showModal, setShowModal ] = useState(false);
  const [ commentIdToDelete ,setCommentIdToDelete ] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comment/all-comments`);
        const data = await response.json();
        if (response.ok) {
          setComments(data.comments)
          if (data.comments?.length < 9 ) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments?.length;
    try {
      const response = await fetch(`/api/comment/comments?startIndex=${startIndex}`);
      const data = await response.json();

      if (response.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments?.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const response = await fetch(`/api/comment/delete/${commentIdToDelete}`, {
        method: 'DELETE'
      });
      const data = response.json();
      if (!response.ok) {
        console.log(data.message);
      } else {
        setComments((prev) => prev.filter((post) => post._id !== commentIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-3 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && comments?.length > 0 ? (
        <>
          <Table className="shadow-md" hoverable>
            <TableHead>
              <TableHeadCell>Date Created</TableHeadCell>
              <TableHeadCell>Comment Content</TableHeadCell>
              <TableHeadCell>Like</TableHeadCell>
              <TableHeadCell>Post Id</TableHeadCell>
              <TableHeadCell>User Id</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            {comments.map((comment, index) => (
              <TableBody key={index}>
                <TableRow>
                  <TableCell>
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{comment.content}</TableCell>
                  <TableCell>{comment.numberOfLikes}</TableCell>
                  <TableCell>{comment.postId}</TableCell>
                  <TableCell>{comment.userId}</TableCell>
                  <TableCell className="font-medium text-red-500 cursor-pointer hover:scale-105">
                   <span 
                    onClick={() => {
                      setShowModal(true);
                      setCommentIdToDelete(comment._id);
                    }} 
                    className="flex items-center gap-1"><MdDeleteOutline className="w-6 h-6"/>Delete </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className="self-center w-full text-sm text-teal-500 py-7">Show More</button>
            )
          }
        </>
      ) : (
        <h2>There is no comment yet!</h2>
      )}
      {/* Delete post modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"/>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this comment?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteComment}>Yes, I&apos;m Sure!</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>No, Cancel!</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
