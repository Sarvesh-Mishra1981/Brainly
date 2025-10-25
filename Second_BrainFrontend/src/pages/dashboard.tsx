import { useState } from "react";
import { Button } from "../Components/Button";
import { Card } from "../Components/Card";
import { CreateContextModel } from "../Components/CreateContentModel";
import { PlusIcon } from "../Icons/plusIcon";
import { ShareIcon } from "../Icons/shareIcon";
import { SideBar } from "../Components/Sidebar";
import { useContent } from "../Hooks/useContent";
import axios from "axios";
import { Backend_URL } from "../config";

export function Dashboard() {
  const [modal, setModal] = useState(false);
  const content=useContent()

  return (
    <>
      <SideBar />
      <div className="ml-72 px-6 py-6 min-h-screen bg-gray-100">

        <CreateContextModel open={modal} onClose={() => setModal(false)} />


        <div className="flex flex-wrap justify-end gap-4 mb-6">
          <Button
            onClick={() => setModal(true)}
            varient="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
          />
          <Button
          onClick={async ()=>{
            const response=await axios.post(`${Backend_URL}/api/v1/share`,{
                share:true
            },{
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            const shareurl=`http://localhost:5173/share/${response.data.hash}`
            alert(shareurl)
          }}
            varient="secondary"
            text="Share Content"
            startIcon={<ShareIcon />}
          />
        </div>
        <div className="flex flex-wrap gap-6">
            {content.map(({title,link,type})=>
            <Card
            title={title}
            link={link}
            type={type}
          />)}
        </div>
      </div>
    </>
  );
}
