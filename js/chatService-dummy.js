function parseText(text) {
    return "this is a reply of: " + text;
}

const chatService = function() {

    let messageArray = [
        {
            username: "Bot",
            message: "First message"
        }
    ];
    
    return {
        fetchMessages: function() {
            $.each(messageArray, function(index, value) {
                let messageList;

                if (value.username !== "Bot") {
                    messageList = `
                    <div class="received-chats old-chats">
                    <div class="received-chats-img">
                        <img src="./assets/human.png" alt="Avatar" class="avatar">
                    </div>

                    <div class="received-msg">
                        <div class="received-msg-inbox">
                            <p>${value.message}</p>
                        </div>
                    </div>
                </div>                    
                    `
                } else {
                    messageList = `
                    <div class="outgoing-chats old-chats">
                        <div class="outgoing-chats-msg">
                            <p>${value.message}</p>
                        </div>
                        <div class="outgoing-chats-img">
                            <img src="./assets/robot.png" alt="" class="avatar">
                        </div>
                    </div>
`
                }

                $('#group-message-holder').append(messageList);
            });
            this.scrollToBottom();
        },
        sendMessage: function(message){
            messageArray.push(message);
        },
        onMessageReceived: function() {
            let reply = {
                username: "Bot",
                message: parseText(messageArray.slice(-1)[0].message)
            }
            messageArray.push(reply)

            $.each(messageArray, function(index, value) {
                let messageList;

                if (value.username !== "Bot") {
                    messageList = `
                    <div class="received-chats old-chats">
                    <div class="received-chats-img">
                        <img src="./assets/human.png" alt="Avatar" class="avatar">
                    </div>

                    <div class="received-msg">
                        <div class="received-msg-inbox">
                            <p>${value.message}</p>
                        </div>
                    </div>
                </div>                    
                    `
                } else {
                    messageList = `
                    <div class="outgoing-chats ongoing old-chats">
                        <div class="outgoing-chats-msg">
                            <p>${value.message}</p>
                        </div>
                        <div class="outgoing-chats-img">
                            <img src="./assets/robot.png" alt="" class="avatar">
                        </div>
                    </div>
`
                }
                $('#group-message-holder').append(messageList);
            });
            this.scrollToBottom();
        },
        scrollToBottom() {
            const chat = document.getElementById("msg-page");
            chat.scrollTo(0, chat.scrollHeight + 30);
        }
    }
}();