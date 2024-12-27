import TwitterLayout from "@/components/Layout/TwitterLayout";
import { NextPage } from "next";
import Image from "next/image";
import { GoArrowLeft } from "react-icons/go";
import Router, { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/user";
import FeedCard from "@/components/FeedCard";
import { Tweet } from "@/gql/graphql";
const userProfilePage: NextPage = () => {
  const { user } = useCurrentUser();
  const router = useRouter();
  console.log(router.query);
  return (
    <TwitterLayout>
      <div>
        <nav className="flex gap-3">
          <div className="p-4">
            <GoArrowLeft className="text-2xl " />
          </div>
          <div>
            <div className="font-bold text-xl ">Badri Vishal Padhy</div>
            <span className=" text-sm text-slate-400 ">181 posts</span>
          </div>
        </nav>
        <div>
          {user?.profileImageURL && (
            <Image
              className="p-4 rounded-full "
              src={user?.profileImageURL}
              alt="pfp"
              height={150}
              width={150}
            />
          )}
          <div className="p-4 font-bold text-xl ">Badri Vishal Padhy</div>
        </div>
        <div>
          {user?.tweets?.map((tweet) => (
            <FeedCard data={tweet as Tweet} key={tweet?.id} />
          ))}
        </div>
      </div>
    </TwitterLayout>
  );
};
export default userProfilePage;
