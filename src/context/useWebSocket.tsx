import {useEffect,useRef,useState} from 'react'

const useWebSocket=(url:string)=>{
    const [isConnected,setIsConnected]=useState(false);
    const [messages,setMessages]=useState<any[]>([]);
    const socketref = useRef<WebSocket|null>(null);
    const ws=socketref?.current;

    const connect = () => {

        return new Promise<void>((resolve,reject)=>{
            if (socketref.current){ 
                resolve();
                return;
            }

            const socket = new WebSocket(url);
        socketref.current = socket;

        socket.onopen = () => {
            console.log("ws connected");
            setIsConnected(true);
            resolve();
        }

        socket.onmessage = (event) => {
            console.log("Message Received: ",event.data);
            const message= JSON.parse(event.data);
            console.log("on message recieved",message);
            if(message==='ping'){
                socket.send('pong')
            }
            setMessages((prev)=>[...prev,message]);
        }

        socket.onclose = (event) => {
            console.warn("ws closed:", event.reason);
            setIsConnected(false);
            socketref.current = null;
        }

        socket.onerror = (error) => {
            console.log("ws error", error);
            socket.close();
            reject(error);
        }
    })
    }

    const disconnect = () => {
        if (socketref.current) {
            socketref.current.close();
            socketref.current = null;
            setIsConnected(false);
        }
    }

    useEffect(()=>{
        return () => {
            disconnect();
        };
    },[url])

    const sendMessage = (message:any) =>{
        console.log("send Messahge called: ", message);
        if(ws && ws.readyState == WebSocket.OPEN){
            ws.send(JSON.stringify(message));
            return true;
        }else{
            console.warn("WebSocket is not open");
            return false;
        }
    };

    return {isConnected,messages, sendMessage, connect, disconnect};
};

export default useWebSocket;