import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    const [followingMap, setFollowingMap] = useState({});
    const [loading, setLoading] = useState({});

    const handleFollowOrUnfollow = async (userId) => {
        try {
            setLoading(prev => ({ ...prev, [userId]: true }));
            const res = await axios.post(
                `http://localhost:8000/api/v1/user/followorunfollow/${userId}`,
                {},
                { withCredentials: true }
            );
            if (res.data.success) {
                setFollowingMap(prev => ({ ...prev, [userId]: !prev[userId] }));
                toast.success(res.data.message);
            }
        } catch (error) {
            const msg = error?.response?.data?.message || error.message || 'Something went wrong';
            toast.error(msg);
        } finally {
            setLoading(prev => ({ ...prev, [userId]: false }));
        }
    }
    return (
        <div className='my-10'>
            <div className='flex items-center justify-between text-sm'>
                <h1 className='font-semibold text-gray-600'>Suggested for you</h1>
                <span className='font-medium cursor-pointer'>See All</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        <div key={user._id} className='flex items-center justify-between my-5'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt="post_image" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <h1 className='font-semibold text-sm'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
                                    <span className='text-gray-600 text-sm'>{user?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            <Button 
                              onClick={() => handleFollowOrUnfollow(user?._id)} 
                              disabled={loading[user?._id]} 
                              className='bg-[#0095F6] hover:bg-[#3192d2] text-xs font-bold h-8'
                            >
                              {followingMap[user?._id] ? 'Following' : 'Follow'}
                            </Button>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers