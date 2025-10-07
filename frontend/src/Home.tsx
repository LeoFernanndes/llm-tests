import React, { useEffect, useRef, useState } from 'react';


type Message = {
    sender: 'ai' | 'human' | 'system',
    content: string
}


export default function Home(){

    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('');
    const scrollRef = useRef(null);

    const scrollToElement = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
          }
      };

    useEffect(() => {        
        scrollToElement();
        console.log('effect')
    }, [JSON.stringify(messages)]);


    const handleMessageStringChange = (event: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        setMessage(event.target.value)
    }

    const handleSendMessage = (event) => {
                
        event.preventDefault();
  
        const _m = [{
            sender: 'human',
            content: message
        }]

        const tempMessageArray = messages
        tempMessageArray.push(_m[0])
        setMessages(tempMessageArray)
        
        const options: RequestInit = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({messages: messages, context_name: 'high_school_counselor'}),
          };
        
        console.log(messages)

        fetch('http://localhost:8000/openai-messages/', options).then(response => {
            response.json().then(messagesResponse => {
                const _message: Message = {
                    sender: messagesResponse.sender,
                    content: messagesResponse.content
                }
                const tempMessages = messages
                tempMessages.push(_message)
                setMessages(tempMessages)
                const inputElement = document.getElementById("input-message");
                inputElement!.value = '';
                setMessage('')
        })})           
    }

    return (
        <div className="w-dvw h-dvh flex justify-center items-center bg-gray-200">
            <div className="w-240 h-144 flex flex-col">
                <div className="h-12 flex justify-center">
                    <h1 className="text-3xl">LLM Tests</h1>
                </div>                
                <div className="w-full h-132 flex flex-col items-center bg-white rounded-md">
                    <div className="w-full h-114 my-2 ">
                        <ul className="h-full overflow-y-auto" id="scrollable-ul" ref={scrollRef}>
                            {messages.map((m, i) => {
                                return (
                                    <div className="flex w-full py-1" key={i}>
                                        <p className="w-30 pr-1 font-semibold text-end ">{m.sender} says:</p><p className="w-210 pr-10">{m.content}</p>
                                    </div>
                                )
                            })}
                            <div ></div>
                        </ul>
                    </div>
                    <form className="w-220 h-12 mb-2 p-1 flex justify-between border-2 rounded-md" onSubmit={event => handleSendMessage(event)}>
                        <input className="w-195 px-2 focus:outline-none" type="text" id="input-message" placeholder='Your question here...' onChange={handleMessageStringChange} />
                        <button className="w-20 flex justify-center items-center bg-gray-800 rounded-sm cursor-pointer text-gray-100" type="button" onClick={handleSendMessage}>Send</button>
                    </form>
                </div>
            </div>
              
        </div>           
    )
}