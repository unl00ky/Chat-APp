import { Avatar } from "@mantine/core";

interface Iprops {
  message: Imessage;
  isMe: boolean;
}

export const Message = ({ message, isMe }: Iprops) => {
  return (
    <>
      {!isMe ? (
        <div className="bg-secondary p-4 rounded-lg max-w-[60%] flex items-center mb-2 hover:bg-hover transition-all group">
          <Avatar size="lg" className="mr-4">
            {message.name.charAt(0).toUpperCase()}
          </Avatar>
          <div className="w-full">
            <div className="flex items-center w-full">
              <h3 className="bg-light-blue w-fit py-2 px-4 rounded-lg">
                {message.name}
              </h3>
              <span className="ml-auto bg-light-blue py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-all text-sm">
                {message.date}
              </span>
            </div>

            <p className="block">{message.value}</p>
          </div>
        </div>
      ) : (
        <div className="bg-secondary p-4 rounded-lg max-w-[60%] ml-auto flex items-center mb-2 hover:bg-hover transition-all group">
          <div className="w-full ">
            <div className="flex items-center justify-end w-full">
              <span className=" bg-light-blue py-2 px-4 rounded-lg mr-auto opacity-0 group-hover:opacity-100 transition-all text-sm">
                {message.date}
              </span>
              <h3 className="bg-light-blue w-fit py-2 px-4 rounded-lg">
                {message.name}
              </h3>
              <Avatar size="lg" className="ml-4">
                {message.name.charAt(0).toUpperCase()}
              </Avatar>
            </div>
            <p className="block text-right">{message.value}</p>
          </div>
        </div>
      )}
    </>
  );
};
