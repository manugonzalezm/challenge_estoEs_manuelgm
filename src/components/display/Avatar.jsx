import React, { useEffect, useState } from 'react'
import {
    Gabriela_Fuentes,
    Ignacio_Truffa,
    Juan_Perez,
    Manuel_Gonzalez,
    Pedro_Sanchez,
    Walt_Cosani
} from '../../assets/images';

const Avatar = ({ user }) => {
    const [userImage, setUserImage] = useState("")

    useEffect(() => {
        switch (user) {
            case "Gabriela Fuentes":
                setUserImage(Gabriela_Fuentes)
                break;
            case "Ignacio Truffa":
                setUserImage(Ignacio_Truffa)
                break;
            case "Juan Perez":
                setUserImage(Juan_Perez)
                break;
            case "Manuel Gonzalez":
                setUserImage(Manuel_Gonzalez)
                break;
            case "Pedro Sanchez":
                setUserImage(Pedro_Sanchez)
                break;
            case "Walt Cosani":
                setUserImage(Walt_Cosani)
                break;
            default:
                setUserImage("")
        }
    }, [user])
    

    return (
        <>
            {userImage === "" ?
                <></>
                :
                <img src={userImage} alt={`Avatar ${user}`} className="avatar" />
            }
        </>
    )
}

export default Avatar