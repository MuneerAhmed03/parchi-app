import {useEffect,useRef,useState} from 'react'

const useWebSocket=(url:string)=>{
    const [isConnected,setIsConnected]=useState(false);
    const [messages,setMessages]=useState<any[]>([]);
    const socketref = useRef<WebSocket|null>(null);
    const ws=socketref?.current;

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

    useEffect(()=>{
        const connect = ()=>{
            const socket = new WebSocket(url);
            socketref.current=socket;

            socket.onopen=()=>{
                console.log("ws connected");
                setIsConnected(true);
            }

            socket.onmessage=(event)=>{
                console.log("Message Received: ",event.data);
                const message= JSON.parse(event.data);
                console.log("on message recieved",message);
                if(message==='ping'){
                    socket.send('pong')
                }
                setMessages((prev)=>[...prev,message]);
            }

            socket.onclose=(event)=>{
                console.warn("ws closed:", event.reason);
                setIsConnected(false);
                setTimeout(()=>connect(),5000);
            }

            socket.onerror=(error)=>{
                console.log("ws error",error);
                socket.close();
            }

            
        }
        connect();

        return () => {
          socketref.current?.close();
        };
    },[url])

    return {isConnected,messages, sendMessage};
};

export default useWebSocket;