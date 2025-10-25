import { useRef, useState } from "react";
import { CrossIcon } from "../Icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import axios from "axios";
import { Backend_URL } from "../config";

const ContentType = {
  Youtube: "youtube",
  Twitter: "twitter",
} as const;
type ContentType = typeof ContentType[keyof typeof ContentType];

interface CreateContextModelProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContextModel({ open, onClose }: CreateContextModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType | "">("");

  async function update() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    if (!title || !link || !type) {
      alert("Please fill all fields and select a type!");
      return;
    }
    await axios.post(Backend_URL +"/api/v1/content",{
      title,
      link,
      type
    },{
      headers:{
        authorization:localStorage.getItem("token")
      }
    })
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white rounded-2xl shadow-2xl w-[400px] p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-700">Add New Content</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <CrossIcon />
          </button>
        </div>

        <div className="flex flex-col gap-4 mb-6">
          <Input ref={titleRef} placeholder="Enter title" />
          <Input ref={linkRef} placeholder="Enter link" />
        </div>

        <div className="flex justify-between mb-6">
          <Button
            onClick={() => setType(ContentType.Youtube)}
            text="YouTube"
            varient={type === ContentType.Youtube ? "primary" : "secondary"}
          />
          <Button
            onClick={() => setType(ContentType.Twitter)}
            text="Twitter"
            varient={type === ContentType.Twitter ? "primary" : "secondary"}
          />
        </div>

        <div className="flex justify-center">
          <Button onClick={update} varient="secondary" text="Upload" />
        </div>
      </div>
    </div>
  );
}
