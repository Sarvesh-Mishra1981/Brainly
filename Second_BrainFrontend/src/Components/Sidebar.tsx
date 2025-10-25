import { Logo } from "../Icons/Logo";
import { TwitterIcon} from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { SidebarItem } from "./SideItem";

export function SideBar(){
    return <div className="bg-white h-screen w-72 fixed left-0 top-0 pl-4 pt-4">
        <div className="px-2 text-lg flex items-center justify-center text-purple-800">
            <div className="px-2">
                <Logo/>
            </div>
            <h1>Brainly</h1>
        </div>
        <div className="pt-4">
            <SidebarItem text="Youtube" icon={<YoutubeIcon/>}></SidebarItem>
            <SidebarItem text="Twitter" icon={<TwitterIcon/>}></SidebarItem>
        </div>

    </div>
}