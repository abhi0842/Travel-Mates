import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Bookmark } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

const Explore = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const navigate = useNavigate();

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    useEffect(() => {
        fetchExplorePosts();
    }, []);

    const fetchExplorePosts = async () => {
        try {
            setIsLoading(true);
            console.log('Fetching explore posts from:', `${API_BASE}/api/v1/search/explore`);
            const res = await axios.get(`${API_BASE}/api/v1/search/explore`, {
                withCredentials: true,
            });

            console.log('[EXPLORE] Full response:', res);
            console.log('[EXPLORE] Response data:', res.data);
            console.log('[EXPLORE] Posts array:', res.data.posts);
            console.log('[EXPLORE] Posts count:', res.data.posts?.length);
            
            if (res.data.success) {
                const postsData = res.data.posts || [];
                console.log('[EXPLORE] Setting posts to state:', postsData);
                setPosts(postsData);
                
                if (postsData.length === 0) {
                    console.warn('[EXPLORE] No posts found in response');
                    // Don't show error, just show empty state
                }
            } else {
                toast.error(res.data.message || 'Failed to fetch posts');
            }
        } catch (error) {
            console.error('[EXPLORE] Fetch error:', error);
            console.error('[EXPLORE] Error response:', error?.response?.data);
            toast.error(error?.response?.data?.message || 'Failed to load explore posts');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUserClick = (userId, e) => {
        if (e) e.stopPropagation();
        navigate(`/profile/${userId}`);
    };

    const handlePostClick = (post) => {
        setSelectedPost(post);
    };

    return (
        <div className='w-full min-h-screen bg-white'>
            {/* Header */}
            <div className='border-b border-gray-300 sticky top-0 z-20 bg-white'>
                <div className='max-w-7xl mx-auto px-4 py-4'>
                    <h1 className='text-2xl font-bold'>Explore</h1>
                    <p className='text-sm text-gray-500'>Discover posts from all users</p>
                </div>
            </div>

            {/* Loading State */}
            {isLoading && (
                <div className='flex justify-center items-center py-20 min-h-[400px]'>
                    <div className='flex flex-col items-center gap-3'>
                        <div className='w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
                        <p className='text-gray-500'>Loading posts...</p>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {posts.length === 0 && !isLoading && (
                <div className='flex justify-center items-center py-20 min-h-[400px]'>
                    <div className='text-center'>
                        <p className='text-3xl mb-2'>📸</p>
                        <p className='text-lg text-gray-600'>No posts yet</p>
                        <p className='text-sm text-gray-500 mt-2'>Start following users and exploring posts</p>
                    </div>
                </div>
            )}

            {/* Posts Grid - Instagram Matrix Style */}
            {posts.length > 0 && (
                <div className='max-w-7xl mx-auto px-4 py-8'>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-1'>
                        {posts.map((post) => (
                            <div
                                key={post._id}
                                onClick={() => handlePostClick(post)}
                                className='group relative aspect-square overflow-hidden bg-gray-100 cursor-pointer hover:bg-gray-200 transition-all'
                            >
                                {/* Post Image */}
                                <img
                                    src={post.image}
                                    alt='post'
                                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-300'
                                />

                                {/* Dark Overlay on Hover */}
                                <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center gap-8 opacity-0 group-hover:opacity-100'>
                                    <div className='flex items-center gap-2 text-white'>
                                        <Heart className='w-7 h-7 fill-white' />
                                        <span className='font-bold text-lg'>
                                            {post.likes?.length || 0}
                                        </span>
                                    </div>
                                    <div className='flex items-center gap-2 text-white'>
                                        <MessageCircle className='w-7 h-7' />
                                        <span className='font-bold text-lg'>
                                            {post.comments?.length || 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Post Detail Modal */}
            {selectedPost && (
                <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
                    <DialogContent className='max-w-4xl max-h-[90vh] p-0 bg-white'>
                        <div className='grid grid-cols-5 min-h-[500px]'>
                            {/* Post Image - Large */}
                            <div className='col-span-3 bg-black flex items-center justify-center'>
                                <img
                                    src={selectedPost.image}
                                    alt='post'
                                    className='w-full h-full object-contain'
                                />
                            </div>

                            {/* Post Details - Right Side */}
                            <div className='col-span-2 flex flex-col bg-white'>
                                {/* Header */}
                                <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                                    <div className='flex items-center gap-3 flex-1'>
                                        <Avatar className='w-10 h-10'>
                                            <AvatarImage
                                                src={selectedPost.author?.profilePicture}
                                                alt={selectedPost.author?.username}
                                            />
                                            <AvatarFallback>
                                                {selectedPost.author?.username?.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div
                                            className='cursor-pointer hover:underline'
                                            onClick={(e) => {
                                                handleUserClick(selectedPost.author?._id, e);
                                                setSelectedPost(null);
                                            }}
                                        >
                                            <p className='font-bold text-sm'>
                                                {selectedPost.author?.username}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Caption */}
                                <div className='flex-1 p-4 overflow-y-auto'>
                                    {selectedPost.caption && (
                                        <div className='flex gap-3 mb-4'>
                                            <Avatar className='w-10 h-10'>
                                                <AvatarImage
                                                    src={selectedPost.author?.profilePicture}
                                                    alt={selectedPost.author?.username}
                                                />
                                                <AvatarFallback>
                                                    {selectedPost.author?.username?.charAt(0).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className='flex-1'>
                                                <div className='flex gap-2'>
                                                    <span className='font-bold text-sm'>
                                                        {selectedPost.author?.username}
                                                    </span>
                                                    <span className='text-sm text-gray-700'>
                                                        {selectedPost.caption}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Comments Section */}
                                    {selectedPost.comments && selectedPost.comments.length > 0 && (
                                        <div className='space-y-4'>
                                            {selectedPost.comments.map((comment, idx) => (
                                                <div key={idx} className='flex gap-3'>
                                                    <Avatar className='w-8 h-8'>
                                                        <AvatarImage src='' alt='user' />
                                                        <AvatarFallback>U</AvatarFallback>
                                                    </Avatar>
                                                    <div className='flex-1'>
                                                        <div className='flex items-center gap-2'>
                                                            <span className='font-bold text-xs'>User</span>
                                                            <span className='text-xs text-gray-700'>
                                                                {comment.text}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className='p-4 border-t border-gray-200 space-y-3'>
                                    <div className='flex justify-between items-center'>
                                        <div className='flex gap-4'>
                                            <Heart className='w-6 h-6 cursor-pointer hover:text-red-600' />
                                            <MessageCircle className='w-6 h-6 cursor-pointer' />
                                        </div>
                                        <Bookmark className='w-6 h-6 cursor-pointer' />
                                    </div>
                                    <div className='text-sm font-bold'>
                                        {selectedPost.likes?.length || 0} likes
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
};

export default Explore;
