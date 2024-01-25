import useWebSocket from "react-use-websocket";

import { useEffect } from "react";

interface Iprops {
  connectedUser: string;
  getMessages: (arg: string | undefined) => void;
  getDiscussions: (arg: string) => void;
  activeDiscussion: string | undefined;
}

export const WebSocket = ({
  connectedUser,
  getMessages,
  getDiscussions,
  activeDiscussion,
}: Iprops) => {
  const url = `ws://localhost:8000/ws/${connectedUser}`;
  const { lastJsonMessage } = useWebSocket(url, {
    share: false,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    console.log("lastjsonmessage", lastJsonMessage);
    if (lastJsonMessage === "new message") getMessages(activeDiscussion);
    if (lastJsonMessage === "new discussion") getDiscussions(connectedUser);
  }, [lastJsonMessage]);

  return <></>;
};
