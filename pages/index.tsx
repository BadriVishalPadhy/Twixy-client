import React, { useCallback } from "react";
import { GiBirdTwitter } from "react-icons/gi";
import { GoHomeFill } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";
import { SlEnvolope } from "react-icons/sl";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import FeedCard from "@/components/FeedCard";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { graphql } from "@/gql";
import { verify } from "crypto";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { graphqlClient } from "@/client/api";
import { Token } from "graphql";
import { useCurrentUser } from "@/hooks/user";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

export default function Home() {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();
  const handleWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) return toast.error("no user found");
      const { verifyGoogletokens } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Success");
      console.log(verifyGoogletokens);
      if (verifyGoogletokens)
        window.localStorage.setItem("__twixy_token", verifyGoogletokens);

      await queryClient.invalidateQueries({ queryKey: ["currentuser"] });
    },
    [queryClient]
  );

  interface appSideBarItems {
    title: string;
    icon: React.ReactNode;
  }

  const sideBarItems: appSideBarItems[] = [
    {
      title: "Home",
      icon: <GoHomeFill />,
    },
    {
      title: "Search",
      icon: <GoSearch />,
    },
    {
      title: "Notifications",
      icon: <IoNotifications />,
    },
    {
      title: "Messages",
      icon: <SlEnvolope />,
    },
    {
      title: "Bookmarks",
      icon: <PiBookmarkSimpleBold />,
    },
    {
      title: "Profile",
      icon: <CgProfile />,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-12 w-screen h-screen px-28">
        <div className="col-span-3 flex justify-start flex-col px-4 pt-2 relative">
          <div
            className="text-4xl cursor-pointer w-fit h-fit hover:bg-[#181818]   p-6 rounded-full 
           transition-all"
          >
            <GiBirdTwitter />
          </div>
          <div className="mt-2  text-2xl font-medium">
            <ul>
              {sideBarItems.map((item) => (
                <li className="flex justify-start items-center gap-4 text-2xl hover:bg-[#181818] px-6 cursor-pointer py-4 rounded-full transition-all  w-fit ">
                  <span>{item.icon}</span> <span>{item.title}</span>{" "}
                </li>
              ))}
            </ul>
            <button className="bg-white p-3 text-lg font-semibold w-full rounded-full px-20 mt-4 hover:bg-slate-200 transition-all text-black tracking-tight ">
              Post
            </button>
          </div>
         {
          user && (
            <div className="absolute bottom-5 gap-2 flex items-center ">
            {user && user.profileImageURL && (
              <Image
                src={user?.profileImageURL}
                alt="user-image"
                width={50}
                height={50}
                className="rounded-full"
              />
            )}
            <div>
              <h3 className="text-xl">
                {user.firstName}  {user.lastName}
              </h3>
            </div>
          </div>
    
          )
         }
        </div>
        <div className="col-span-6 border-x overflow-y-scroll no-scrollbar h-screen border-zinc-800 ">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        {!user && (
          <div className="col-span-3   ">
            <h1 className="text-2xl">New to Twixy</h1>
            <div className="   p-8 bg-slate-900 ">
              <GoogleLogin onSuccess={handleWithGoogle} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
