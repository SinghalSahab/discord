"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";
import { io, Socket } from "socket.io-client";


type SocketContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any | null;
  isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
});

export const useSocket = () => {
  return useContext(SocketContext);
}
const SocketProvider = ({children} : {children:React.ReactNode}) => {

    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const socketInstance = new (io as any)(process.env.NEXT_PUBLIC_SITE_URL!, {
            path: "/api/socket/io",
            addTrailingSlash: false
        });
        console.log("Socket instance created",socketInstance);
        socketInstance.on("connect", () => {
          console.log("Connected to socket");
            setIsConnected(true);
        })
        socketInstance.on("disconnect", () => {
          console.log("Disconnected from socket");
            setIsConnected(false);
        })
        setSocket(socketInstance);
        return () => {
            socketInstance.disconnect();
        }
    },[])
    
  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider