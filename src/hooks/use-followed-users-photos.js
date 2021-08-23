import{ useState, useContext, useEffect } from "react"
import { userContext } from "../context/userContext"
import { getUserByUserId, getUserFollowedPhotos } from "../services/Firebase"

export default function useFollowedUsersPhotos(){
    const {user : {uid: userId = ''}} = useContext(userContext)
    const [photos, setPhotos] = useState(null)

    useEffect(() => {
        const getTimelinePhotos = async () => {
            const followingUserIds = await getUserByUserId(userId);

            if (followingUserIds && followingUserIds[0].following.length > 0) {
                const followedUserPhotos = await getUserFollowedPhotos(userId, followingUserIds[0].following);
                // we need to call a function that will get us the photos
                await followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
                setPhotos(followedUserPhotos);
            }
        }

        getTimelinePhotos()
    }, [userId])

    return {photos}
}
