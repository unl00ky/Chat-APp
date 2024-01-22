import { Avatar } from "@mantine/core";

import { useState } from "react";

interface IProps {
  connectedUser: Iuser | null;
  userDiscussions: Idiscussion[];
}

export const DiscussionsList = ({ connectedUser, userDiscussions }: IProps) => {
  const [activeDiscussion, setActiveDiscussion] = useState<number | null>(null);

  const handleActiveDiscussion = (index: number) => {
    setActiveDiscussion((prev) => (prev === index ? null : index));
  };

  return (
    <aside className="bg-primary text-white p-4 rounded-lg overflow-auto w-full max-w-[30%] h-full">
      {connectedUser ? (
        <ul>
          {userDiscussions.map((discussion, index) => {
            return (
              <li
                key={discussion.id}
                onClick={() => handleActiveDiscussion(index)}
                className={`${
                  activeDiscussion === index ? "bg-light-blue" : "bg-secondary"
                } w-full  rounded-lg py-2 px-4 hover:bg-hover transition-all cursor-pointer mb-2`}
              >
                {discussion.name}
              </li>
            );
          })}
        </ul>
      ) : (
        <div>
          <Avatar className="mx-auto mb-4 w-64 h-64" />
          <p className="mx-auto text-3xl font-bold bg-secondary w-fit py-2 px-4 rounded-lg">
            Please log in
          </p>
        </div>
      )}
    </aside>
  );
};
