/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const response = await fetch(`/api/post/posts?${searchQuery}`);
      if (!response.ok) {
        setLoading(false);
        return;
      }
      if (response.ok) {
        const data = await response.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });   
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category: category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }

  const showTextInput = () => {
    const searchIcon = document.querySelector('.search-icon');
    const searchBar = document.querySelector('.search-bar');

    searchIcon.addEventListener('click', () => {
        searchBar.classList.toggle('hidden');
    })
  }

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const response = await fetch(`/api/post/posts?${searchQuery}`);
    if(!response.ok){
      return;
    }
    if(response.ok){
      const data = await response.json();
      setPosts([...posts, ...data.posts]);
      if(data.posts.length === 9){
          setShowMore(true);
      } else {
          setShowMore(false);
      }
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
        {/* Filters */}
      <div className="relative border-b border-gray-500 shadow-lg p-7">
        <form onSubmit={handleSubmit} className="flex justify-between gap-1 sm:gap-8">
          <div className="flex items-center gap-3">
            <label className="hidden font-semibold sm:inline whitespace-nowrap">
              Search Term:
            </label>
            <TextInput
              type="text"
              rightIcon={LuSearch}
              className="hidden sm:w-40 lg:w-96 sm:inline"
              placeholder="Search..."
              id="searchTerm"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
            <LuSearch className="inline -ml-4 cursor-pointer search-icon w-7 h-7 sm:hidden" onClick={showTextInput} />
            <TextInput placeholder="Search..." id="searchTerm" onChange={handleChange} value={sidebarData.searchTerm} className="absolute hidden sm:w-40 md:w-60 lg:w-96 search-bar top-24 md:hidden"/>
          </div>
          <div className="flex gap-1 sm:gap-6">
            <div className="flex items-center gap-3">
              <label className="hidden font-semibold whitespace-nowrap md:inline">Sort:</label>
              <Select onChange={handleChange} value={sidebarData.sort} id="sort">
                <option value="desc">Latest</option>
                <option value="asc">Oldest</option>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <label className="hidden font-semibold whitespace-nowrap md:inline">Category:</label>
              <Select onChange={handleChange} value={sidebarData.category} id="category">
                <option value="uncategorized">Uncategorized</option>
                <option value="javascript">Javascript</option>
                <option value="reactjs">React.js</option>
                <option value="expressjs">Express.js</option>
              </Select>
            </div>
            <Button size="sm" type="submit" gradientDuoTone="purpleToPink" outline className="whitespace-nowrap">Apply</Button>
          </div>
        </form>
      </div>
      {/* Main Content */}
      <div className="w-full">
        <h1 className="p-3 my-5 text-3xl italic font-semibold border-gray-500 sm:border-b">Post Results</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-7">
            {
                !loading && posts.length === 0 && <p className="text-xl text-gray-500">No posts found!</p>
            }
            {
                loading && (
                    <p className="text-xl text-gray-500">Loading...</p>
                )
            }
            {
                !loading && posts && posts.map((post) => <PostCard key={post._id} post={post} />)
            }
            {
                showMore && <button onClick={handleShowMore} className="w-full text-lg text-teal-500 p-7 hover:underline">Show More</button>
            }
        </div>
      </div>
    </div>
  );
}
