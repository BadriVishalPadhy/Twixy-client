import React from "react";
import Image from "next/image";
import { BsChat } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa6";
import { IoIosHeartEmpty } from "react-icons/io";
import { VscGraph } from "react-icons/vsc";
import { FiShare } from "react-icons/fi";
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";
import { GetServerSideProps } from "next";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  return (
    <div className=" border border-zinc-800 border-x-0  border-b-0  cursor-pointer hover:bg-gray-800 transition-all p-3">
      <div className="grid gap-2  grid-cols-12">
        <div className="col-span-1  rounded-full ">
          {data.author?.profileImageURL && (
            <Image
              className="rounded-full"
              src={data.author?.profileImageURL}
              height={50}
              width={50}
              alt={"image"}
            />
          )}
        </div>
        <div className="col-span-11 ">
          <h5 className=" font-semibold ">
            <Link href={`/data.author?.id`}>
              {" "}
              {data.author?.firstName} {data.author?.lastName}
            </Link>
          </h5>
          <p>{data.content}</p>
          <div className="flex gap-24 pt-5 ">
            <div className=" hover:text-blue-500 transition-all ">
              <BsChat />
            </div>
            <div className="hover:text-green-500  transition-all">
              <FaRetweet />
            </div>
            <div className="hover:text-pink-600  transition-all">
              <IoIosHeartEmpty />
            </div>
            <div className=" hover:text-blue-500  transition-all">
              <VscGraph />
            </div>
            <div className="flex gap-4  ">
              <span className=" hover:text-blue-500 ">
                <FiShare />
              </span>
              <span className=" hover:text-blue-500 ">
                <PiBookmarkSimpleBold />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
