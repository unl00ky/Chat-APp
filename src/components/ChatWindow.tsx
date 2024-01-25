import { Alert } from "@mantine/core";

import { useEffect, useRef, useState } from "react";

import { Button } from "./Button";
import { Message } from "./Message";
import { MESSAGES_ENDPOINT } from "../constants/URL";

interface IProps {
  connectedUser: Iuser | null;
  discussionMessages: Imessage[];
  activeDiscussion: Idiscussion | null;
}

export const ChatWindow = ({
  connectedUser,
  discussionMessages,
  activeDiscussion,
}: IProps) => {
  const [message, setMessage] = useState<string>("");

  const createMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeDiscussion) {
      console.log("nu avem active discussion");
      return;
    }
    const body = {
      discussion_id: activeDiscussion.id,
      user_id: connectedUser?.id,
      value: message,
    };
    try {
      const response = await fetch(MESSAGES_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setMessage("");
      if (!response.ok)
        throw new Error("A fost o problema la creearea unui mesaj");
      const data = await response.json();
      console.log("create message data", data);
    } catch (err) {
      console.log(err);
    }
  };

  const chatMessaagesWindow = useRef(null);
  const scrollToBottom = () => {
    if (chatMessaagesWindow.current) {
      chatMessaagesWindow.current.scrollTop =
        chatMessaagesWindow.current.scrollHeight;
      // idk what to do
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [discussionMessages]);

  const handleDeleteMsg = async (message_id: string) => {
    const url = `${MESSAGES_ENDPOINT}?message_id=${message_id}&discussion_id=${activeDiscussion?.id}`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok)
        throw new Error("There was a problem when deleting a message");
    } catch (err) {
      console.log(err);
    }
    console.log("deleted");
  };

  return (
    <>
      <section className="w-full flex flex-col gap-2">
        <section
          ref={chatMessaagesWindow}
          className=" bg-primary text-white rounded-lg p-4 h-full overflow-auto"
        >
          {connectedUser && (
            <div>
              {discussionMessages.map((message) => {
                return (
                  <Message
                    key={message.id}
                    message={message}
                    isMe={message.user_id === connectedUser?.id}
                    handleDeleteMsg={handleDeleteMsg}
                  />
                );
              })}
            </div>
          )}
        </section>
        <form
          onSubmit={createMessage}
          className="bg-primary text-white rounded-lg p-4 flex gap-2 items-center"
        >
          {connectedUser && (
            <div>
              {!activeDiscussion && (
                <Alert
                  variant="light"
                  color="blue"
                  title="Please select a discussion before trying to type"
                  className="absolute bottom-[15vh]"
                ></Alert>
              )}
            </div>
          )}

          <textarea
            className="bg-transparent w-full resize-none rounded-lg px-4 py-2"
            placeholder={connectedUser ? "Type your message here..." : ""}
            disabled={!connectedUser}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          {connectedUser && <Button>Send</Button>}
        </form>
      </section>
    </>
  );
};
