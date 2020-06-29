import React,{useState} from 'react';
import SockJsClient from 'react-stomp';
import LoginForm from './components/Login/LoginForm';
import Messages from './components/Messages/Messages';
import Input from './components/Input/Input';

import chatAPI from './services/chatAPI';
import {randomColor} from './utils/commonUtils';
import './App.css';

const SOCKET_URL = 'http://localhost:8080/ws-chat/';

const App = ()=>{
 const [messages,setMessages] = useState([]);
 const [user,setUser] = useState(null);
 let onConnected = ()=>{
   console.log("connected");
 }

 let onMessageReceived = (msg) =>{
 console.log("new message",msg);
 setMessages(messages.concat(msg));
 }

 let onSendMessage = (msgText)=>{
   chatAPI.sendMessage(user.username,msgText).then(res=>{
     console.log('Sent',res)
   }).catch(err => {
    console.log('Error Occured while sending message to api');
  })
 }
 let handleLoginSubmit = (username) => {
  console.log(username, " Logged in..");

  setUser({
    username: username,
    color: randomColor()
  })
  }

  return (
    <div className="App">
      {!!user ?
        (
          <>
            <SockJsClient
              url={SOCKET_URL}
              topics={['/topic/group']}
              onConnect={onConnected}
              onDisconnect={console.log("Disconnected!")}
              onMessage={msg => onMessageReceived(msg)}
              debug={false}
            />
            <Messages
              messages={messages}
              currentUser={user}
            />
            <Input onSendMessage={onSendMessage} />
          </>
        ) :
        <LoginForm onSubmit={handleLoginSubmit} />
      }
    </div>
  );


}

export default App;
