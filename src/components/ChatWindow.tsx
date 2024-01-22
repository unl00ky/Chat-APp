import { Button } from "./Button";
import { Message } from "./Message";

interface IProps {
  isLoggedIn: boolean;
}

export const ChatWindow = ({ isLoggedIn }: IProps) => {
  return (
    <>
      <section className="w-full flex flex-col gap-2">
        <section className=" bg-primary text-white rounded-lg p-4 h-full">
          {isLoggedIn && <Message />}
        </section>
        <section className="bg-primary text-white rounded-lg p-4 flex gap-2 items-center">
          <textarea
            className="bg-transparent w-full resize-none rounded-lg px-4 py-2"
            placeholder={isLoggedIn ? "Type your message here..." : ""}
            disabled={!isLoggedIn}
          ></textarea>
          {isLoggedIn && <Button>Send</Button>}
        </section>
      </section>
    </>
  );
};
