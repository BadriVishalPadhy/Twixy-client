import React, { useCallback, useState } from "react";
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
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";

import { PiImageSquare } from "react-icons/pi";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { Tweet } from "@/gql/graphql";
import TwitterLayout from "@/components/Layout/TwitterLayout";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { GetServerSideProps } from "next";

interface HomeProps {
  tweets?: Tweet[];
}
export default function Home(props: HomeProps) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState<string>("");
  const { mutate } = useCreateTweet();
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

  const handleSelectedImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);
  const { user } = useCurrentUser();

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
  }, [content, mutate]);

  return (
    <div>
      <TwitterLayout>
        <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1">
              {user?.profileImageURL && (
                <Image
                  src={user?.profileImageURL}
                  alt="user-image"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
            </div>
            <div className="col-span-11 ">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What is happening?!"
                className="border-b border-gray-800 bg-transparent w-full p-2 text-xl  focus-outline-none "
              ></textarea>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <PiImageSquare
              onClick={handleSelectedImage}
              className="text-blue-300  text-xl "
            />
            <button
              onClick={handleCreateTweet}
              className=" bg-white  text-base font-semibold py-1 px-3 rounded-2xl  hover:bg-slate-200 transition-all text-black tracking-tight "
            >
              Post
            </button>
          </div>
        </div>

        {props.tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
      </TwitterLayout>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  context
) => {
  const allTweets = await graphqlClient.request(getAllTweetsQuery);
  return {
    props: {
      tweets: allTweets.getAllTweets as Tweet[],
    },
  };
};
