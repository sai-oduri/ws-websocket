import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [val, setVal] = useState("");

  useEffect(() => {
    const soc = new WebSocket('ws://localhost:8080');

    soc.onopen = () => {
      console.log("connected");
      setSocket(soc);
    }

    soc.onmessage = (message) => {
      console.log("Received message : ", message.data);
      setLatestMessage(message.data);
    }

    return () => {
      socket?.close();
    }

  }, [])

  if (!socket) {
    return (
      <div>
        Connecting to WebSocker Server...
      </div>
    )
  }
  return (
    <>
      <input type="text" onChange={(e) => setVal(e.target.value)} />
      <button onClick={() => { socket.send(val) }}>Send</button>

      {latestMessage}
    </>
  )
}

export default App
