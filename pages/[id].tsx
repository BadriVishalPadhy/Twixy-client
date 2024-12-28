import TwitterLayout from "@/components/Layout/TwitterLayout";
import { NextPage, GetServerSideProps } from "next";
import Image from "next/image";
import { GoArrowLeft } from "react-icons/go";
import Router, { useRouter } from "next/router";
import { useCurrentUser } from "@/hooks/user";
import FeedCard from "@/components/FeedCard";
import { Tweet, User } from "@/gql/graphql";
import { notFound } from "next/navigation";
import { graphqlClient } from "@/client/api";
import { getCurrentUserIdQuery } from "@/graphql/query/user";
import { userInfo } from "os";

interface ServerProps {
  userInfo?: User;
}

const UserProfilePage: NextPage<ServerProps> = (props: ServerProps) => {
  const { user } = useCurrentUser();
  const router = useRouter();
  console.log(router.query);
  console.log(props.userInfo);
  return (
    <TwitterLayout>
      <div>
        <nav className="flex gap-3">
          <div className="p-4">
            <GoArrowLeft className="text-2xl " />
          </div>
          <div>
            <div className="font-bold text-xl ">
              {props.userInfo?.firstName}
            </div>
            <span className=" text-sm text-slate-400 ">181 posts</span>
          </div>
        </nav>
        <div>
          {props.userInfo?.profileImageURL && (
            <Image
              className="p-4 rounded-full "
              src={props.userInfo?.profileImageURL}
              alt="pfp"
              height={150}
              width={150}
            />
          )}
          <div className="p-4 font-bold text-xl ">Badri Vishal Padhy</div>
        </div>
        <div>
          {props.userInfo?.tweets?.map((tweet) => (
            <FeedCard data={tweet as Tweet} key={tweet?.id} />
          ))}
        </div>
      </div>
    </TwitterLayout>
  );
};

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  context
) => {
  const id = context.query.id as string | undefined;
  if (!id) return { notFound: true, props: { userInfo: undefined } };
  const userInfo = await graphqlClient.request(getCurrentUserIdQuery, { id });
  if (!userInfo?.getUserById) return { notFound: true };

  return {
    props: {
      userInfo: userInfo.getUserById as User,
    },
  };
};

export default UserProfilePage;
