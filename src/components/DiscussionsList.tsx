import { Avatar, Select } from "@mantine/core";

import { useState } from "react";

import { MESSAGES_ENDPOINT } from "../constants/URL";

interface Idiscussion {
  id?: string;
  contacts: [];
  name?: string;
  group_name?: string;
  status?: string;
}

interface IProps {
  isLoggedIn: boolean;
  userDiscussions: Idiscussion[];
  setDiscussionMessages: (arg: []) => void;
}

export const DiscussionsList = ({
  isLoggedIn,
  userDiscussions,
  setDiscussionMessages,
}: IProps) => {
  const [selectedDiscussion, setSelectedDiscussion] = useState<Idiscussion>();

  const getMessages = async (discusson_id: string | undefined) => {
    const url = `${MESSAGES_ENDPOINT}/?discussion_id=${discusson_id}`;
    const response = await fetch(url);
    const data = await response.json();
    setDiscussionMessages(data);
  };

  return (
    <aside className="bg-primary text-white p-4 rounded-lg overflow-auto w-full max-w-[30%] h-full">
      <ul className="">
        {isLoggedIn && (
          <Select
            label="Discussions"
            placeholder="Select a discussion"
            data={userDiscussions.map((discussion) => {
              return { value: discussion.id, label: discussion.name };
            })}
            maxDropdownHeight={200}
            dropdownOpened
            clearable
            onChange={(selectedDiscussion) => {
              getMessages(selectedDiscussion);
            }}
            style={{ backgroundColor: "transparent" }}
          />
        )}
        {!isLoggedIn && (
          <div>
            <Avatar className="mx-auto mb-4 w-64 h-64" />
            <p className="mx-auto text-3xl font-bold bg-secondary w-fit py-2 px-4 rounded-lg">
              Please log in
            </p>
          </div>
        )}
      </ul>
    </aside>
  );
};
