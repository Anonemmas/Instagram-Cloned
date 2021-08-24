import React, {useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { getAllUsers } from "../services/Firebase"
import Drizzy from "../images/Drizzy.jpg"

export default function Search({searchRef}){
    const [profiles, setProfiles] = useState([])
    const [filteredProfiles, setFilteredProfiles] = useState([])
    const [searchInput, setSearchInput] = useState("")

    console.log(profiles)

    useEffect(() => {
        async function getUsersForSearch(){
            const response = await getAllUsers()
            setProfiles(response)
        }
        getUsersForSearch()
    }, [])

    const handleFilteredProfiles = ({target}) => {
        const searchWord = target.value
        const newFilter = profiles.filter(value => value.username.includes(searchWord.toLocaleLowerCase()))

        if(searchWord === ''){
            setFilteredProfiles([])
        }
        else if(filteredProfiles) {
            setFilteredProfiles(newFilter)
        }
        setSearchInput(searchWord)
    }

    return (
        <div className="search pr-2  md:pr-0 md:block relative">
            <div>
                <input 
                    ref={searchRef}
                    className="searchbar border opacity-0 focus:opacity-10 md:block rounded-md border-gray-300 text-center text-sm px-8 py-1 focus:outline-none"
                    type="text"
                    placeholder="Search"
                    onChange={handleFilteredProfiles}
                />
            </div>

            {filteredProfiles.length > 0 && searchInput ? (
                <div className="renderedList mt-2 absolute border border-gray-300 w-full bg-white h-56 overflow-hidden overflow-y-auto">
                    <div className="arrow h-2 w-2 border-l border-t border-gray-300"></div>
                        {filteredProfiles.map(profile => (
                            <Link 
                                to={`/p/${profile.username}`} 
                                className="w-full mr-0"
                                onClick={() => setSearchInput('')}
                            >
                                <div key={profile.docId} className="p-2 pt-1 hover:bg-gray-100 w-full
                                grid grid-cols-3"
                                >
                                    <div className="picture col-span-1 w-12 h-12">
                                        <img className="rounded-full" src={Drizzy} alt={`${profile.username}`}/>
                                    </div>
                                    <div className="grid col-span-2 text-xs">
                                        <span className="font-bold">{profile.username}</span>
                                        <span>{profile.fullName}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
            ) : filteredProfiles.length === 0 && searchInput ? (
                <div className="renderedList mt-2 absolute border border-gray-300 w-full bg-white">
                    <p className="text-sm text-center p-2">No results found</p>
                </div>
            ) : null
            }
        </div>
    )
}