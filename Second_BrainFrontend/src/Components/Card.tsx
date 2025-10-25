import { ShareIcon } from "../Icons/shareIcon";

interface CardProps{
    title: String,
    link: string,
    type: "twitter" | "youtube"
}

export function Card({title,link,type}:CardProps) {
  return (
    <div className="flex  p-4">
      <div className="bg-white rounded-md border-gray-200 border w-72 h-auto p-3">
        <div className="flex justify-between items-center text-sm mb-3">
          <div className="flex items-center">
            <div className="pr-2 text-gray-500">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex">
            <div className="pr-2 text-gray-500">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <ShareIcon/>
              </a>
            </div>
            <div className="pr-2 text-gray-500">
              <ShareIcon />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
             {type==="youtube" && <iframe className="w-full" src={link.replace("youtu.be/","www.youtube.com/embed/")}
            title="YouTube video player" frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
             referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

            {type==="twitter" &&  <blockquote className="twitter-tweet" data-theme="dark" data-dnt="true">
            <a href={link.replace("x.com","twitter.com")}></a>
          </blockquote>}
        </div>
      </div>
    </div>
  );
}
