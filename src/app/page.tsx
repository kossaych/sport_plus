import Footer from "@/components/Home components/footer";
import Header from "@/components/Home components/header";
import Lives from "@/components/Home components/lives";
import Offer from "@/components/Home components/offer";
import Subjects from "@/components/Home components/subjects";
export default function Home() {
  return (
      <div className="">
        
        <Offer username="kossay" offer="no offer" expirationDate="27/05/2024" progress={50}></Offer>
        <Lives ></Lives>
        <Subjects></Subjects>
    
      </div>
  )
}
