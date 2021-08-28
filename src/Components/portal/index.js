import React, { useContext, useEffect, useState } from "react"
import { getPostByPostId } from "../../services/Firebase"
import Header from "./Header"
import Photo from "./Photo"

export default function Portal({photo}){

    console.log(photo)

    return (
        <div className="portal">
            <div className="w-full">
                <Header photo={photo}/>
                <Photo photo={photo}/>
            </div>
        </div>
    )
}