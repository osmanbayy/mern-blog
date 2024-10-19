/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, ModalBody, ModalHeader, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { TiTick, TiTimes  } from "react-icons/ti";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [ users, setUsers] = useState([]);
  const [ showMore, setShowMore] = useState(true);
  const [ showModal, setShowModal ] = useState(false);
  const [ userIdToDelete ,setUserIdToDelete ] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`/api/user/users`);
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users);
          if (data.users.length < 9 ) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const response = await fetch(`/api/user/users?startIndex=${startIndex}`);
      const data = await response.json();

      if (response.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const response = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE'
      });
      const data = response.json();
      if (!response.ok) {
        console.log(data.message);
      } else {
        setUsers((prev) => prev.filter((post) => post._id !== userIdToDelete));
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-3 overflow-x-scroll table-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table className="shadow-md" hoverable>
            <TableHead>
              <TableHeadCell>Date Created</TableHeadCell>
              <TableHeadCell>User Image</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            {users.map((user, index) => (
              <TableBody key={index}>
                <TableRow>
                  <TableCell>
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className="object-cover w-12 h-12 rounded-full"
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                  {
                    user.isAdmin ? <TiTick className="w-8 h-8 text-green-500" /> : <TiTimes className="w-8 h-8 text-red-500" />
                  }
                  </TableCell>
                  <TableCell className="font-medium text-red-500 cursor-pointer hover:scale-105">
                   <span 
                    onClick={() => {
                      setShowModal(true);
                      setUserIdToDelete(user._id);
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
        <h2>There is no user yet!</h2>
      )}
      {/* Delete post modal */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"/>
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this user?</h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>Yes, I&apos;m Sure!</Button>
              <Button color="gray" onClick={() => setShowModal(false)}>No, Cancel!</Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}
