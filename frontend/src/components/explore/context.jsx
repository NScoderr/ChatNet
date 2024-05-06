import React, { createContext, useState, useContext, useEffect } from 'react';
import { Users } from '../../../dummyData';
import { BACKEND_URL } from '../backend-url';
import axios from 'axios';
import { useAsyncError } from 'react-router-dom';

// Create a new context
const AppContext = createContext();

// Create a custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Context Provider component
export const AppProvider = ({ children }) => {


  const exampleResponse = "Hey there! I'm doing well, thanks for asking. Did you know that octopuses have three hearts? It's pretty fascinating how nature comes up with these unique designs. Speaking of nature, have you ever tried stargazing on a clear night? The universe can be so awe-inspiring when you take a moment to appreciate it. Any exciting plans or projects you're working on lately?";
  const greetText = "How may I help you today?"
  const [currentUser, setCurrentUser] = useState(null);
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPromts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  const [greeting, setGreeting] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get(BACKEND_URL + "/", {
        headers: {
            Authorization: token
        }
    })
    .then(res => {
        setCurrentUser(res.data);
    })

  },[])


  const displayGreeting = async() => {
    for(let i = 0; i < greetText.length; i++) {
        await new Promise(resolve => {
            setTimeout(() => {
                setGreeting(prev => prev + greetText[i]);
            },(i + 1) * 100);
            resolve();
        })
    }
  }
  useEffect(() => {
    displayGreeting();
  },[])

  const onSend = async () => {
            
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        setPrevPromts(prev => [...prev, input])

        //send backend request
        // await new Promise(resolve => {
        //     setTimeout(() => {
        //         console.log("wait complete");
        //         resolve();
        //     }, 3000);
        // });
        const res = await axios.post(BACKEND_URL + "/find_users", {
          prompt: input
        })
        setSuggestions(res.data);
        console.log("HELLO");
        console.log(res.data.users);

        
        let newResponseArray = exampleResponse.split(" ");
        setLoading(false);
        setInput("");
        for(let i = 0; i < newResponseArray.length; i++) {
            const nextWord = newResponseArray[i];
            delayPara(i, nextWord);
        }
    
    }

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord+" ")
        }, 50 * index)
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

  return (
    <AppContext.Provider
      value={{
        currentUser,
        exampleResponse,
        input,setInput,
        recentPrompt, setRecentPrompt,
        prevPrompts, setPrevPromts,
        showResult, setShowResult,
        loading, setLoading,
        resultData,setResultData,
        onSend,
        delayPara,
        newChat,
        greeting,
        suggestions,setSuggestions
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
