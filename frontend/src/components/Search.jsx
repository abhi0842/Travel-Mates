import React, { useState } from 'react';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, Heart, MessageCircle } from 'lucide-react';

const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchType, setSearchType] = useState('user');
    const navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim().length === 0) {
            setSearchResults([]);
            return;
        }

        try {
            setIsLoading(true);
            const endpoint = searchType === 'user' 
                ? `/api/v1/search/users?query=${encodeURIComponent(query)}`
                : `/api/v1/search/posts?query=${encodeURIComponent(query)}`;
            
            console.log('Fetching:', `${API_BASE}${endpoint}`);
            const res = await axios.get(`${API_BASE}${endpoint}`, { withCredentials: true });
            
            console.log('Response:', res.data);
            if (res.data.success) {
                setSearchResults(searchType === 'user' ? res.data.users : res.data.posts);
            }
        } catch (error) {
            console.error('Search error:', error);
            toast.error(error?.response?.data?.message || 'Search failed');
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserClick = (userId) => {
        navigate(`/profile/${userId}`);
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div className='w-full min-h-screen bg-white'>
            {/* Header with Search Bar */}
            <div className='border-b border-gray-300 sticky top-0 z-20 bg-white'>
                <div className='max-w-4xl mx-auto px-4 py-4'>
                    <div className='flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2'>
                        <SearchIcon className='w-5 h-5 text-gray-500' />
                        <Input
                            placeholder='Search users, posts...'
                            value={searchQuery}
                            onChange={handleSearch}
                            className='bg-transparent border-0 placeholder-gray-500 focus:outline-none'
                        />
                        {searchQuery && (
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSearchResults([]);
                                }}
                                className='text-gray-500 hover:text-black font-bold'
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Search Type Toggle */}
                    {searchQuery && (
                        <div className='flex gap-2 mt-4'>
                            <button
                                onClick={() => {
                                    setSearchType('user');
                                    setSearchResults([]);
                                    // Re-trigger search with new type
                                    setTimeout(() => {
                                        const event = { target: { value: searchQuery } };
                                        handleSearch(event);
                                    }, 0);
                                }}
                                className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                                    searchType === 'user'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-black hover:bg-gray-300'
                                }`}
                            >
                                👥 Users
                            </button>
                            <button
                                onClick={() => {
                                    setSearchType('post');
                                    setSearchResults([]);
                                    // Re-trigger search with new type
                                    setTimeout(() => {
                                        const event = { target: { value: searchQuery } };
                                        handleSearch(event);
                                    }, 0);
                                }}
                                className={`px-4 py-2 rounded-full font-semibold transition-all text-sm ${
                                    searchType === 'post'
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-black hover:bg-gray-300'
                                }`}
                            >
                                📸 Posts
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className='flex justify-center items-center py-20 min-h-[400px]'>
                    <div className='flex flex-col items-center gap-3'>
                        <div className='w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
                        <p className='text-gray-500'>Searching...</p>
                    </div>
                </div>
            )}

            {/* Empty/Initial State */}
            {!searchQuery && !isLoading && searchResults.length === 0 && (
                <div className='flex justify-center items-center py-20 min-h-[400px]'>
                    <div className='text-center'>
                        <SearchIcon className='w-16 h-16 text-gray-300 mx-auto mb-4' />
                        <p className='text-lg text-gray-600'>Search for users or posts</p>
                        <p className='text-sm text-gray-500 mt-2'>Try searching for "john", "travel", etc.</p>
                    </div>
                </div>
            )}

            {/* No Results State */}
            {searchQuery && searchResults.length === 0 && !isLoading && (
                <div className='flex justify-center items-center py-20 min-h-[400px]'>
                    <div className='text-center'>
                        <p className='text-lg text-gray-600'>No {searchType}s found</p>
                        <p className='text-sm text-gray-500 mt-2'>Try different search terms</p>
                    </div>
                </div>
            )}

            {/* Search Results */}
            <div className='max-w-4xl mx-auto px-4 py-8'>
                {searchType === 'user' 
                    ? (
                        // Users Results
                        <div className='space-y-3'>
                            {searchResults.map((user) => (
                                <div
                                    key={user._id}
                                    onClick={() => handleUserClick(user._id)}
                                    className='flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md hover:bg-gray-50 cursor-pointer transition-all'
                                >
                                    <div className='flex items-center gap-4 flex-1'>
                                        <Avatar className='w-12 h-12'>
                                            <AvatarImage src={user.profilePicture} alt={user.username} />
                                            <AvatarFallback className='text-lg bg-gray-300 font-bold'>
                                                {user.username.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className='flex-1'>
                                            <p className='font-bold text-base'>{user.username}</p>
                                            <p className='text-sm text-gray-500 line-clamp-1'>
                                                {user.bio || 'No bio added'}
                                            </p>
                                            <p className='text-xs text-gray-400 mt-1'>
                                                👥 {user.followers?.length || 0} followers
                                            </p>
                                        </div>
                                    </div>
                                    <div className='text-gray-400'>
                                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                                        </svg>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) 
                    : (
                        // Posts Results Grid
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {searchResults.map((post) => (
                                <div
                                    key={post._id}
                                    className='group cursor-pointer rounded-lg overflow-hidden bg-white border border-gray-200 hover:shadow-lg transition-all duration-300'
                                >
                                    {/* Post Image Container */}
                                    <div className='relative aspect-square overflow-hidden bg-gray-100'>
                                        <img
                                            src={post.image}
                                            alt='post'
                                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'
                                        />

                                        {/* Overlay on Hover */}
                                        <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-8 opacity-0 group-hover:opacity-100'>
                                            <div className='flex items-center gap-2 text-white'>
                                                <Heart className='w-6 h-6 fill-white' />
                                                <span className='font-semibold'>
                                                    {post.likes?.length || 0}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-2 text-white'>
                                                <MessageCircle className='w-6 h-6' />
                                                <span className='font-semibold'>
                                                    {post.comments?.length || 0}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Post Info */}
                                    <div className='p-4 bg-white'>
                                        {/* Author Info */}
                                        <div className='flex items-center gap-3 mb-3'>
                                            <Avatar className='w-8 h-8 cursor-pointer hover:ring-2 ring-gray-300'>
                                                <AvatarImage
                                                    src={post.author?.profilePicture}
                                                    alt={post.author?.username}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleUserClick(post.author?._id);
                                                    }}
                                                />
                                                <AvatarFallback className='text-xs bg-gray-300 font-bold'>
                                                    {post.author?.username?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div
                                                className='flex-1 cursor-pointer hover:underline'
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleUserClick(post.author?._id);
                                                }}
                                            >
                                                <p className='font-semibold text-sm line-clamp-1'>
                                                    {post.author?.username}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Caption */}
                                        {post.caption && (
                                            <p className='text-gray-700 text-sm line-clamp-2 mb-3'>
                                                {post.caption}
                                            </p>
                                        )}

                                        {/* Stats */}
                                        <div className='flex justify-between text-xs text-gray-500 pt-3 border-t border-gray-200'>
                                            <span className='font-semibold flex items-center gap-1'>
                                                ❤️ {post.likes?.length || 0}
                                            </span>
                                            <span className='font-semibold flex items-center gap-1'>
                                                💬 {post.comments?.length || 0}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Search;
