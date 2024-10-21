import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegComments } from "react-icons/fa";
import { LuArrowUp, LuFileText, LuUsers } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function DashboardComp() {
  const { currentUser } = useSelector((state) => state.user);

  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComment, setTotalComment] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/user/users?limit=5");
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/post/posts?limit=5");
        const data = await response.json();
        if (response.ok) {
          setLoading(false);
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    const fetchComments = async () => {
      try {
        const response = await fetch("/api/comment/all-comments?limit=5");
        const data = await response.json();
        if (response.ok) {
          setComments(data.comments);
          setTotalComment(data.totalComment);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);

  if (loading) 
    return (
      <div className="flex items-center justify-center w-full min-h-screen">
        <Spinner className="" size="xl" color="primary"></Spinner>
      </div>
    );

  return (
    <div className="w-full p-3 md:mx-auto">
      <div className="flex flex-wrap justify-center gap-4">
        <div className="flex flex-col w-full gap-4 p-3 rounded-md shadow-md dark:bg-slate-700 md:w-72">
          <div className="flex justify-between">
            <div className="">
              <h3 className="font-semibold text-gray-500 uppercase dark:text-slate-400 text-md">
                Total Users
              </h3>
              <p className="text-2xl">{totalUsers}</p>
            </div>

            <LuUsers className="p-3 text-5xl text-white bg-teal-600 rounded-full shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <LuArrowUp />
              {lastMonthUsers}
            </span>
            <div className="text-gray-500 dark:text-gray-400">Last Month</div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 p-3 rounded-md shadow-md dark:bg-slate-700 md:w-72">
          <div className="flex justify-between">
            <div className="">
              <h3 className="font-semibold text-gray-500 uppercase dark:text-slate-400 text-md">
                Total Comments
              </h3>
              <p className="text-2xl">{totalComment}</p>
            </div>

            <FaRegComments className="p-3 text-5xl text-white bg-teal-600 rounded-full shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <LuArrowUp />
              {lastMonthComments}
            </span>
            <div className="text-gray-500 dark:text-gray-400">Last Month</div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-4 p-3 rounded-md shadow-md dark:bg-slate-700 md:w-72">
          <div className="flex justify-between">
            <div className="">
              <h3 className="font-semibold text-gray-500 uppercase dark:text-slate-400 text-md">
                Total Posts
              </h3>
              <p className="text-2xl">{totalPosts}</p>
            </div>

            <LuFileText className="p-3 text-5xl text-white bg-teal-600 rounded-full shadow-lg" />
          </div>
          <div className="flex gap-2 text-sm">
            <span className="flex items-center text-green-500">
              <LuArrowUp />
              {lastMonthPosts}
            </span>
            <div className="text-gray-500 dark:text-gray-400">Last Month</div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 py-3 mx-auto ">
        <div className="flex flex-col w-full p-2 rounded-md shadow-md md:w-auto dark:bg-slate-700">
          <div className="flex items-center justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent Users</h1>
            <Button gradientDuoTone="purpleToPink" outline>
              <Link to={"/dashboard?tab=users"}>See All</Link>
            </Button>
          </div>

          <div className="">
            <Table hoverable>
              <TableHead>
                <TableHeadCell className="!bg-gray-500 text-white">
                  User Image
                </TableHeadCell>
                <TableHeadCell className="!bg-gray-500 text-white">
                  Username
                </TableHeadCell>
              </TableHead>
              {users &&
                users.map((user) => (
                  <TableBody key={user._id} className="divide-y">
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-slate-700">
                      <TableCell>
                        <img
                          src={user.profilePicture}
                          alt="user"
                          className="w-10 h-10 rounded-full"
                        />
                      </TableCell>
                      <TableCell>@{user.username}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
            </Table>
          </div>
        </div>

        <div className="flex flex-col w-full p-2 rounded-md shadow-md md:w-auto dark:bg-slate-700">
          <div className="flex items-center justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent Comments</h1>
            <Button gradientDuoTone="purpleToPink" outline>
              <Link to={"/dashboard?tab=comments"}>See All</Link>
            </Button>
          </div>

          <div className="">
            <Table hoverable>
              <TableHead>
                <TableHeadCell className="!bg-gray-500 text-white">
                  Comment Content
                </TableHeadCell>
                <TableHeadCell className="!bg-gray-500 text-white">
                  Likes
                </TableHeadCell>
              </TableHead>
              {comments &&
                comments.map((comment) => (
                  <TableBody key={comment._id} className="divide-y">
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-slate-700">
                      <TableCell className="w-96">
                        <p className="line-clamp-2">{comment.content}</p>
                      </TableCell>
                      <TableCell>{comment.numberOfLikes}</TableCell>
                    </TableRow>
                  </TableBody>
                ))}
            </Table>
          </div>
        </div>

        <div className="flex flex-col w-full p-2 rounded-md shadow-md md:w-auto dark:bg-slate-700">
          <div className="flex items-center justify-between p-3 text-sm font-semibold">
            <h1 className="p-2 text-center">Recent Posts</h1>
            <Button gradientDuoTone="purpleToPink" outline>
              <Link to={"/dashboard?tab=posts"}>See All</Link>
            </Button>
          </div>

          <div className="">
            <Table hoverable>
              <TableHead>
                <TableHeadCell className="!bg-gray-500 text-white">
                  Post Image
                </TableHeadCell>
                <TableHeadCell className="!bg-gray-500 text-white">
                  Post Title
                </TableHeadCell>
                <TableHeadCell className="!bg-gray-500 text-white">
                  Category
                </TableHeadCell>
              </TableHead>
              {posts &&
                posts.map((post) => (
                  <TableBody key={post._id} className="divide-y">
                    <TableRow className="bg-white dark:border-gray-700 dark:bg-slate-700">
                      <TableCell>
                        <img src={post.image} alt="post" className="h-10 rounded-md w-14 " />
                      </TableCell>
                      <TableCell className="w-96">
                        <p className="line-clamp-2">{post.title}</p>
                      </TableCell>
                      <TableCell className="w-5">
                        <p className="capitalize">{post.category}</p>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
