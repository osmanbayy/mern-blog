/* eslint-disable react-hooks/exhaustive-deps */
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [ userPosts, setUserPosts] = useState([]);
  const [ showMore, setShowMore] = useState(true);

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
                   <span className="flex items-center gap-1"><MdDeleteOutline className="w-6 h-6"/>Delete </span>
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
    </div>
  );
}
