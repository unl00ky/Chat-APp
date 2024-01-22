import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";

import { Button } from "./Button";

import { AUTHENTICATE_ENDPOINT } from "../constants/URL";

interface IProps {
  setConnectedUser: (arg: Iuser | null) => void;
}

export const LogInNav = ({ setConnectedUser }: IProps) => {
  const [authOpened, { open: authOpen, close: authClose }] =
    useDisclosure(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const logIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (username.length < 4 || password.length < 4) return;
    const body = {
      name: username,
      password: password,
    };

    try {
      const response = await fetch(AUTHENTICATE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error("There was a problem ");
      const data = await response.json();
      console.log("data", data);

      setConnectedUser(data);
      authClose();
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="ml-auto">
      <Button click={authOpen}>Log in</Button>

      <Modal
        opened={authOpened}
        onClose={authClose}
        centered
        styles={{
          content: { backgroundColor: "#121212" },
          header: { backgroundColor: "#121212" },
        }}
      >
        <form
          onSubmit={logIn}
          className=" bg-primary p-8 rounded-lg text-xl text-white"
        >
          <fieldset>
            <label htmlFor="username">Username</label>
            <div className="bg-secondary my-4 py-2 px-4 rounded-lg flex focus-within:outline outline-2 outline-offset-2">
              <input
                className="bg-transparent w-full outline-none"
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <p
              className={`text-red-500 bg-light-blue py-2 px-4 rounded-lg mb-4 ${
                username.length < 4 ? "block" : "hidden"
              }`}
            >
              Please put your username (4chars)
            </p>
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <div className="bg-secondary my-4 py-2 px-4 rounded-lg flex items-center focus-within:outline outline-2 outline-offset-2">
              <input
                className="bg-transparent block w-full outline-none"
                type={`${isPasswordVisible ? "text" : "password"}`}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                className="ml-4 cursor-pointer"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {!isPasswordVisible ? (
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
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </div>
            </div>

            <p
              className={`text-red-500 bg-light-blue py-2 px-4 rounded-lg mb-4 ${
                password.length < 4 ? "block" : "hidden"
              }`}
            >
              Please put your password (4chars)
            </p>
          </fieldset>
          <input
            className="w-full bg-white text-black py-2 px-4 rounded-lg font-bold transition-all active:scale-95"
            type="submit"
          />
        </form>
      </Modal>
    </div>
  );
};
