import { Tweet } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import React, { Children, useCallback, useMemo } from "react";
import { CgProfile } from "react-icons/cg";
import { GiBirdTwitter } from "react-icons/gi";
import { GoHomeFill, GoSearch } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";
import { PiBookmarkSimpleBold, PiImageSquare } from "react-icons/pi";
import { SlEnvolope } from "react-icons/sl";
import FeedCard from "../FeedCard";
import Image from "next/image";
import toast from "react-hot-toast";
import { graphqlClient } from "@/client/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { link } from "fs";

interface TwitterLayoutInterface {
  children: React.ReactNode;
}
interface appSideBarItems {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const TwitterLayout: React.FC<TwitterLayoutInterface> = (props) => {
  const queryClient = useQueryClient();
  const { user } = useCurrentUser();

  const sideBarItems: appSideBarItems[] = useMemo(
    () => [
      {
        title: "",
        icon: <GiBirdTwitter />,
        link: "/",
      },
      {
        title: "Home",
        icon: <GoHomeFill />,
        link: "/",
      },
      {
        title: "Search",
        icon: <GoSearch />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <IoNotifications />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <SlEnvolope />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <PiBookmarkSimpleBold />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <CgProfile />,
        link: `/${user?.id}`,
      },
    ],
    [user?.id]
  );

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

  return (
    <div>
      <div className="grid grid-cols-12 h-screen w-screen sm:px-56">
        <div className="col-span-2 sm:col-span-3 pt-1 flex sm:justify-end pr-4 relative">
          <div className="mt-2  text-2xl font-medium">
            <ul>
              {sideBarItems.map((item) => (
                <Link href={item.link}>
                  <li className="flex justify-start items-center gap-4 text-2xl hover:bg-[#181818]  cursor-pointer p-4 rounded-full transition-all  w-fit ">
                    <span>{item.icon}</span>{" "}
                    <span className="hidden sm:block">{item.title}</span>{" "}
                  </li>
                </Link>
              ))}
            </ul>
            <button className="bg-white p-3 text-lg font-semibold w-full rounded-full px-20 mt-4 hover:bg-slate-200 transition-all text-black tracking-tight hidden sm:block ">
              Post
            </button>
          </div>
          {user && (
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
                <h3 className="text-xl hidden sm:block ">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-6 border-x overflow-y-scroll no-scrollbar h-screen border-zinc-800 ">
          {props.children}
        </div>

        <div className=" col-span-1 sm:col-span-3   ">
          {!user && (
            <div>
              <h1 className="text-2xl">New to Twixy</h1>
              <div className="   p-8 bg-slate-900 ">
                <GoogleLogin onSuccess={handleWithGoogle} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwitterLayout;
