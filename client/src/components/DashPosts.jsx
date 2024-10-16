/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [ userPosts, setUserPosts] = useState([]);
  const [ showMore, setShowMore] = useState(true);
  const [ showModal, setShowModal ] = useState(false);
  const [ postIdToDelete ,setPostIdToDelete ] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/post/posts?userId=${currentUser._id}`);
        const data = await response.json();
        if (response.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9 ){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const response = await fetch(`/api/post/posts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await response.json();

      if (response.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.post.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const response = await fetch(`/api/post/delete/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = response.json();
      if (!response.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-3 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table className="shadow-md" hoverable>
            <TableHead>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
              <TableHeadCell>
                <span>Edit</span>
              </TableHeadCell>
            </TableHead>
            {userPosts.map((post, index) => (
              <TableBody key={index}>
                <TableRow className="capitalize">
                  <TableCell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="object-cover w-20 h-10"
                      />
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>{post.title}</Link>
                  </TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell className="font-medium text-red-500 cursor-pointer hover:scale-105">
                   <span 
                    onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }} 
                    className="flex items-center gap-1"><MdDeleteOutline className="w-6 h-6"/>Delete </span>
                  </TableCell>
                  <TableCell>
                    <Link to={`/update-post/${post._id}`} className="text-teal-500">
                      <span className="flex items-center gap-1"><TbEdit className="w-6 h-6"/>Edit</span>
                    </Link>
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
        <h2>You have no posts yet!</h2>
      )}
      {/* Delete post modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"/>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this post?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>Yes, I&apos;m Sure!</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>No, Cancel!</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
