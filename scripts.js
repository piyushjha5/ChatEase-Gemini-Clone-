// const typingForm = document.querySelector(".typing-form");
// const chatList = document.querySelector(".chat-list");
// const suggestions = document.querySelectorAll(".suggestion-list .suggestion");
// const toggleThemeButton = document.querySelector("#toggle-theme-button");
// const deleteChatButton = document.querySelector("#delete-chat-button");

// let userMessage = null;
// let isResponseGenerating = false;

// // API configuration
// const API_KEY = "AIzaSyD3tOYsDh0Jdlc1x_4ueUtZNgzG7fIO7NI";
// const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

// const loadLocalStorageData = () => {
//     const savedChats = localStorage.getItem("savedChats");
//     const isLightMode = (localStorage.getItem("themeColor") === "light_mode");

//     // Apply the stored theme
//     document.body.classList.toggle("light_mode", isLightMode);
//     toggleThemeButton.innerText = isLightMode ? "dark _mode" : "light_mode";

//     // Restore saved Chats
//     chatList.innerHTML = savedChats || "";

//     document.body.classList.toggle("hide-header", savedChats); // Hide the header once the chat started
//     chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
// }

// loadLocalStorageData();

// // create a new message element and return it
// const createMessageElement = (content, ...classes) => {
//     const div = document.createElement("div");
//     div.classList.add("message", ...classes);
//     div.innerHTML = content;
//     return div;
// }

// // Show typing effect by displaying words one by one
// const showTypingEffect = (text, textElement, incomingMessageDiv) => {
//     const words = text.split(' ');
//     let currentWordIndex = 0;

//     const typingInterval = setInterval(() => {
//         // Append each word to the text element with a space
//         textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
//         incomingMessageDiv.querySelector(".icon").classList.add("hide");

//         // If all words are displayed
//         if(currentWordIndex === words.length) {
//             clearInterval(typingInterval);
//             isResponseGenerating = false;
//             incomingMessageDiv.querySelector(".icon").classList.remove("hide");
//             localStorage.setItem("savedChats", chatList.innerHTML); // Save chats to local storage
//         }
//         chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
//     }, 75);
// }

// // Fetch response from the API based on user message
// const generateAPIResponse = async(incomingMessageDiv) => {
//     const textElement = incomingMessageDiv.querySelector(".text"); // Get text Element

//     // Send a POST request to the API with the user's message
//     try {
//         const response = await fetch(API_URL, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//                 contents: [{
//                     role: "user",
//                     parts: [{ text: userMessage}]
//                 }]
//             })
//         });

//         const data = await response.json();
//         if(!response.ok) throw new Error(data.error.message);
//         // Get the API response text
//         const apiResponse = data?.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');;
//         showTypingEffect(apiResponse, textElement, incomingMessageDiv);
//     } catch (error) {
//         isResponseGenerating = false;
//         textElement.innerText = error.message;
//         textElement.classList.add("error");
//     } finally {
//         incomingMessageDiv.classList.remove("loading");
//     }
// }

// // Show a loading animation while waiting for the API response
// const showLoadingAnimation = () => {
//     const html = `<div class="message-content">
//                     <img src="https://imgs.search.brave.com/EooA9dbfnpHGX225PpF6pVajAIFcfOlvwBPJzOwY_as/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTYvR29v/Z2xlLUdlbWluaS1M/b2dvLVBORy1QaG90/by0zMDB4MjI1LnBu/Zw" alt="Gemini Image" class="avatar">
//                     <p class="text"></p>
//                     <div class="loading-indicator">
//                         <div class="loading-bar"></div>
//                         <div class="loading-bar"></div>
//                         <div class="loading-bar"></div>
//                     </div>
//                 </div>
//                 <span onclick = "copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;

//     const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
//     chatList.appendChild(incomingMessageDiv);

//     chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
//     generateAPIResponse(incomingMessageDiv);
// }


// // Copy message text to the clipboard
// const copyMessage = (copyIcon) => {
//     const messageText = copyIcon.parentElement.querySelector(".text").innerText;

//     navigator.clipboard.writeText(messageText);
//     copyIcon.innerText = "done"; // Show tick icon
//     setTimeout(() => copyIcon.innerText = "content_copy", 1000); // Revert icon after 1 second
// }

// const handleOutgoingChat = () => {
//     userMessage = typingForm.querySelector(".typing-input").value.trim() || userMessage;
//     if(!userMessage || isResponseGenerating) return; //Exit if there is no message

//     isResponseGenerating = true;

//     const html = `<div class="message-content">
//                     <img src="https://imgs.search.brave.com/UqIPtFQTN21z71iv43mJL78qBF20hlF1ovB4k3qLq5Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzE5LzI2LzQ2/LzM2MF9GXzYxOTI2/NDY4MF94MlBCZEdM/RjU0c0ZlN2tUQnRB/dlpuUHlYZ3ZhUncw/WS5qcGc" alt="User Image" class="avatar">
//                     <p class="text"></p>
//                 </div>`;

//     const outgoingMessageDiv = createMessageElement(html, "outgoing");
//     outgoingMessageDiv.querySelector(".text").innerHTML = userMessage;
//     chatList.appendChild(outgoingMessageDiv);

//     typingForm.reset(); // clear input field
//     chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
//     document.body.classList.add("hide-header"); // Hide the header once the chat started
//     setTimeout(showLoadingAnimation, 500); // Show loading animation after a delay
// }

// // Set userMessage and handle outgoing chat when a suggestion is clicked
// suggestions.forEach(suggestion => {
//     suggestion.addEventListener("click", () => {
//         userMessage = suggestion.querySelector(".text").innerText;
//         handleOutgoingChat();
//     });
// });

// // Toggle between light and dark themes
// toggleThemeButton.addEventListener("click", () => {
//    const isLightMode = document.body.classList.toggle("light_mode");
//    localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
//    toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
// });


// // Delete all chats from local storage when button is clicked
// deleteChatButton.addEventListener("click", () => {
//     if(confirm("Are you sure you want to delete all messages?")) {
//         localStorage.removeItem("savedChats");
//         loadLocalStorageData();
//     }
// })

// // Prevent default form submission and handle outgoing chat
// typingForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     handleOutgoingChat();
// });









const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");
const suggestions = document.querySelectorAll(".suggestion-list .suggestion");
const toggleThemeButton = document.querySelector("#toggle-theme-button");
const deleteChatButton = document.querySelector("#delete-chat-button");

let userMessage = null;
let isResponseGenerating = false;

// API configuration
const API_KEY = "AIzaSyD3tOYsDh0Jdlc1x_4ueUtZNgzG7fIO7NI"; // Make sure to replace with your actual API key
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;

const loadLocalStorageData = () => {
    const savedChats = localStorage.getItem("savedChats");
    const isLightMode = (localStorage.getItem("themeColor") === "light_mode");

    // Apply the stored theme
    document.body.classList.toggle("light_mode", isLightMode);
    toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";

    // Restore saved Chats
    chatList.innerHTML = savedChats || "";

    document.body.classList.toggle("hide-header", savedChats); // Hide the header once the chat started
    chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
}

loadLocalStorageData();

// create a new message element and return it
const createMessageElement = (content, ...classes) => {
    const div = document.createElement("div");
    div.classList.add("message", ...classes);
    div.innerHTML = content;
    return div;
}

// Show typing effect by displaying words one by one
const showTypingEffect = (text, textElement, incomingMessageDiv) => {
    const words = text.split(' ');
    let currentWordIndex = 0;

    const typingInterval = setInterval(() => {
        // Append each word to the text element with a space
        textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
        incomingMessageDiv.querySelector(".icon").classList.add("hide");

        // If all words are displayed
        if (currentWordIndex === words.length) {
            clearInterval(typingInterval);
            isResponseGenerating = false;
            incomingMessageDiv.querySelector(".icon").classList.remove("hide");
            localStorage.setItem("savedChats", chatList.innerHTML); // Save chats to local storage
        }
        chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
    }, 75);
}

// Fetch response from the API based on user message
const generateAPIResponse = async (incomingMessageDiv) => {
    const textElement = incomingMessageDiv.querySelector(".text"); // Get text Element

    // Send a POST request to the API with the user's message
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: userMessage }]
                }]
            })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message);

        // Get the API response text
        const apiResponse = data?.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1');
        showTypingEffect(apiResponse, textElement, incomingMessageDiv);
    } catch (error) {
        isResponseGenerating = false;
        textElement.innerText = error.message;
        textElement.classList.add("error");
    } finally {
        incomingMessageDiv.classList.remove("loading");
    }
}

// Show a loading animation while waiting for the API response
const showLoadingAnimation = () => {
    const html = `<div class="message-content">
                    <img src="https://imgs.search.brave.com/EooA9dbfnpHGX225PpF6pVajAIFcfOlvwBPJzOwY_as/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nYWxsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMTYvR29v/Z2xlLUdlbWluaS1M/b2dvLVBORy1QaG90/by0zMDB4MjI1LnBu/Zw" alt="Gemini Image" class="avatar">
                    <p class="text"></p>
                    <div class="loading-indicator">
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                        <div class="loading-bar"></div>
                    </div>
                </div>
                <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;

    const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
    chatList.appendChild(incomingMessageDiv);

    chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
    generateAPIResponse(incomingMessageDiv);
}

// Copy message text to the clipboard
const copyMessage = (copyIcon) => {
    const messageText = copyIcon.parentElement.querySelector(".text").innerText;

    navigator.clipboard.writeText(messageText);
    copyIcon.innerText = "done"; // Show tick icon
    setTimeout(() => copyIcon.innerText = "content_copy", 1000); // Revert icon after 1 second
}

const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim() || userMessage;
    if (!userMessage || isResponseGenerating) return; // Exit if there is no message

    isResponseGenerating = true;

    const html = `<div class="message-content">
                    <img src="https://imgs.search.brave.com/UqIPtFQTN21z71iv43mJL78qBF20hlF1ovB4k3qLq5Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA2LzE5LzI2LzQ2/LzM2MF9GXzYxOTI2/NDY4MF94MlBCZEdM/RjU0c0ZlN2tUQnRB/dlpuUHlYZ3ZhUncw/WS5qcGc" alt="User Image" class="avatar">
                    <p class="text"></p>
                </div>`;

    const outgoingMessageDiv = createMessageElement(html, "outgoing");
    outgoingMessageDiv.querySelector(".text").innerHTML = userMessage;
    chatList.appendChild(outgoingMessageDiv);

    typingForm.reset(); // clear input field
    chatList.scrollTo(0, chatList.scrollHeight); // Scroll to the bottom
    document.body.classList.add("hide-header"); // Hide the header once the chat started
    setTimeout(showLoadingAnimation, 500); // Show loading animation after a delay
}

// Set userMessage and handle outgoing chat when a suggestion is clicked
suggestions.forEach(suggestion => {
    suggestion.addEventListener("click", () => {
        userMessage = suggestion.querySelector(".text").innerText;
        handleOutgoingChat();
    });
});

// Toggle between light and dark themes
toggleThemeButton.addEventListener("click", () => {
    const isLightMode = document.body.classList.toggle("light_mode");
    localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
    toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
});

// Delete all chats from local storage when button is clicked
deleteChatButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all messages?")) {
        localStorage.removeItem("savedChats");
        loadLocalStorageData();
    }
});

// Prevent default form submission and handle outgoing chat
typingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleOutgoingChat();
});