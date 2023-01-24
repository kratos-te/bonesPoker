/* eslint-disable prettier/prettier */
import { createContext, useState, useEffect, useContext, PropsWithChildren, FC } from "react";
import io, { Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../types/Socketio";
import getConfig from "next/config";

// const { publicRuntimeConfig } = getConfig();
// const SERVER_URL = publicRuntimeConfig.SERVER_URL;
// const SEVER_URL =

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

interface Context {
  socket?: SocketType;
}

const SEVER_URL = process.env.REACT_APP_SERVERURL;

const context = createContext<Context>({});

export const useSocket = () => useContext(context);

const SocketProvider = (props: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<SocketType>();

  useEffect(() => {
    // TODO: consider reconnect on page refresh
    // TODO: check why we call the provider twice, we only need one socket
    // TODO: when connecting from firefox we get "unhandledeRejection error"
    const serverUrl = SEVER_URL || "http://localhost:4000";

    const socket = io(serverUrl, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("connected to backend", socket.id);
    });
    socket.on("disconnect", () => {
      console.log("disconnected from backend", socket.id);
    });
    setSocket(socket);
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      setSocket(undefined);
    };
  }, []);

  return <context.Provider value={{ socket }}>{props.children}</context.Provider>;
};

export default SocketProvider;
