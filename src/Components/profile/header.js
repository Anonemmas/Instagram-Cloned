import React, {useState, useEffect} from "react"
import useUser from "../../hooks/use-User";
import Drizzy from "../../images/Drizzy.jpg"
import Skeleton from "react-loading-skeleton";
import {toggleFollow, isUserFollowingProfile} from "../../services/Firebase"

export default function Header({
    photosCount,
    followerCount,
    setFollowerCount,
    username,
    profile: { docId: profileDocId, userId: profileUserId, fullName, following }
}){
    
    const {user} = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user && user.username && user.username !== username;
   
    const handleToggleFollow = async() => {
        setIsFollowingProfile(prevIsFollowingProfile => !prevIsFollowingProfile)
        setFollowerCount({ followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1 })

        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId)
    }

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(isFollowing);
        };
        
        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile();   
        }
    }, [user.username, profileUserId]);

    return (
        <div className="grid grid-cols-4 md:grid-cols-3 ml-4 md:ml-0 gap-4 justify-between mt-4 mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                <img
                    className="rounded-full h-20 w-20 md:h-32 md:w-32 flex"
                    alt={`${username}`}
                    src={Drizzy}
                />
            </div>
            <div className="flex items-center justify-initial flex-col col-span-3 md:col-span-2">
                <div className="container flex items-center">
                    <p className="text-2xl mr-4">{username}</p>
                    {activeBtnFollow && (
                        <button
                            className="bg-blue-500 font-bold text-sm rounded text-white w-20 h-8 focus:outline-none"
                            type="button"
                            onClick={handleToggleFollow}   
                        >
                            {isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                    {!profileDocId ? (
                        <div className="flex flex-col">
                            <Skeleton count={1} height={20} width={300}/>
                            <Skeleton count={1} height={20} width={200}/>
                        </div>
                    ) : (
                        <>
                            <p className="mr-10">
                                <span className="font-bold">{photosCount}</span> posts
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{followerCount}</span> {" "}
                                {followerCount === 1 ? "follower" : "followers"}
                            </p>
                            <p className="mr-10">
                                <span className="font-bold">{following.length}</span> following
                            </p>
                        </>
                        
                    )}
                </div>
                <div className="fullName flex items-start w-full mt-4">
                   { !fullName ? (
                        null
                    ) : (
                        <span className="font-bold font-medium">{fullName}</span>
                    )}
                </div>
            </div>
        </div>
    )
}