import Link from "next/link";

export default function Profile() {
    if(!(localStorage.getItem('token'))){
        window.location.href = "/";
    }
    return (
        <>
        profile page
        </>
    )
  }