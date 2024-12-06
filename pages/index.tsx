import { GiBirdTwitter } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";

export default function Home() {
  return (
    <div>
      <div className="grid grid-cols-12 w-screen h-screen px-28"  >
        <div className="col-span-3 flex justify-start flex-col pt-8" >
          <GiBirdTwitter className="text-5xl  h-fit hover:bg-gray-800 p-2 rounded-full 
           transition-all"/>
          <GoHomeFill className="text-5xl  h-fit hover:bg-gray-800 p-2 rounded-full"/>
        </div>
        <div className="col-span-6 border-x  border-zinc-800" ></div>
        <div className="col-span-3 " ></div>
    </div>npm install react-icons --save
    </div>
  );
}
