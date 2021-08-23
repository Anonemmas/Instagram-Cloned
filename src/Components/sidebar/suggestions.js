import React, {memo, useState, useEffect} from "react"
import Skeleton from "react-loading-skeleton"
import SuggestedProfile from "./suggested-profile"
import {getSuggestedProfiles} from "../../services/Firebase"

const Suggestions = ({userId}) => {
    const [profiles, setProfiles] = useState(null)

    useEffect(() => {
        async function suggestedProfiles() {
            const response = await getSuggestedProfiles(userId)
            setProfiles(response)
        }
        if (userId) {
            suggestedProfiles();
        }
    }, [userId])

    return (
        !profiles ? (
            <div className="flex flex-col">
                <Skeleton count={1} height={150} width={150} className="mt-5"/>
                <Skeleton count={1} height={150} width={150} className="mt-5"/>
            </div>
        ) : profiles.length > 0 ? (
            <div className="flex flex-col">
                <div className="flex items-center align-items justify-between my-2">
                    <p className="font-medium text-sm text-gray-500 opacity-5">Suggestions for you</p>
                </div>
                <div className="grid gap-5 mt-4">
                    {profiles.map((profile) => (
                        <SuggestedProfile
                            key={profile.docId}
                            userDocId={profile.docId}
                            username={profile.username}
                            profileId={profile.userId}
                            userId={userId}
                        />
                    ))}
                </div>
            </div>
        ) : <p>Not showing</p>
    )
}

export default memo(Suggestions)