import { Avatar, Menu } from "@mantine/core";

interface Iprops {
  message: Imessage;
  isMe: boolean;
  handleDeleteMsg: (arg: string) => void;
}

export const Message = ({ message, isMe, handleDeleteMsg }: Iprops) => {
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

            <p>{message.value}</p>
          </div>
        </div>
      ) : (
        <div className="bg-secondary p-4 rounded-lg max-w-[60%] ml-auto flex items-center mb-2 hover:bg-hover transition-all group">
          <div className="w-full">
            <div className="flex items-center">
              <span className=" bg-light-blue py-2 px-4 rounded-lg mr-auto opacity-0 group-hover:opacity-100 transition-all text-sm">
                {message.date}
              </span>
              <Menu
                width={200}
                styles={{
                  dropdown: { backgroundColor: "#181818", border: "none" },
                }}
              >
                <Menu.Target>
                  <button className="opacity-0 group-hover:opacity-100 transition-all mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </Menu.Target>

                <Menu.Dropdown className="w-full">
                  <Menu.Item className="text-white">Search</Menu.Item>
                  <Menu.Item
                    color="red"
                    className="flex"
                    onClick={() => handleDeleteMsg(message.id)}
                  >
                    Delete Message
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <h3 className="bg-light-blue w-fit py-2 px-4 rounded-lg">
                {message.name}
              </h3>
            </div>
            <p className="text-right">{message.value}</p>
          </div>
          <Avatar size="lg" className="ml-4">
            {message.name.charAt(0).toUpperCase()}
          </Avatar>
        </div>
      )}
    </>
  );
};
