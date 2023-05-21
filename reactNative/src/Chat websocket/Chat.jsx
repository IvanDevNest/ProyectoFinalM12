import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
// import CreateMessage from './CreateMessage';
import CreateMessage from './CreateMessage';
import { UserContext } from '../userContext';
import io from 'socket.io-client';

import Echo from 'laravel-echo';

const Chat = () => {
    // const [messages, setMessages] = useState([])
    const [imageMessages, setImageMessages] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    let { authToken, setAuthToken, usuari, myAvatarUrl, reload } = useContext(UserContext);
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [echo, setEcho] = useState(null);

    useEffect(() => {
        const echoInstance = new Echo({
            host: 'http://equip04.insjoaquimmir.cat:6001',
            broadcaster: 'socket.io',
            client: io,
            encrypted: false,
            transports: ['websocket'],
        });
        console.log("entra1 useEffect" + echoInstance)
        echoInstance.connector.socket.on('connect', () => {
            console.log('conected');
        })
        setEcho(echoInstance);

        return () => {
            echoInstance.disconnect();
        };
    }, []);
 
    useEffect(() => {
        if (echo) {
            
            echo.connector.socket.on('connect', () => {
                console.log('conected');
            })
            //         console.log(echo.channel)

            //         const channel = echo.channel('message-events');
            // console.log(channel.listen('.message'))
            // echo.channel('message-events').listen('eventListenerName', ev => {
            //     console.log('Received event:', ev);
            // });
            
            // channel.listen('.message', (message) => {
            //     console.log('Received message:', message);
            //     handleNewMessage(message);
            // });

        }
    }, [echo]);

    const getMessages = () => {
        if (echo) {

            echo.connector.socket.on('connect', () => {
                console.log('conected');

                          });
      
                        //   echo.connector.socket.__invoke('index', (messageList) => {
                        //     console.log('Received messages:', messageList);
                        //     setMessages(messageList);
                        //     setIsLoading(false);
                        // });
    }
};
console.log(messages)


useEffect(() => {
    getMessages();
}, [usuari.route_id, reload, echo]);

const getImagesMessage = async (id) => {
    if (id) {
        try {
            const data = await fetch(`http://equip04.insjoaquimmir.cat/api/files/${id}`);
            const resposta = await data.json();
            if (resposta.success === true) {
                // console.log("imagesMessage: " + JSON.stringify(resposta))
                setImageMessages((prevImageMessages) => ({
                    ...prevImageMessages,
                    [id]: resposta.data,
                }));;
            } else setError(resposta.message);
        } catch (e) {
            console.log("catch getImagesPost: " + e.message);
        };
    }

}
const renderMessage = (message) => {
    // console.log("rendermessage " + JSON.stringify(message))
    if (message.file_id) {
        const imageMessage = imageMessages[message.file_id];
        if (message.user_id == usuari.id) {
            // console.log(imageMessage)
            return (
                <View >
                    <Image source={{ uri: imageMessage }} style={{ width: 200, height: 200, }} />
                    <View style={[styles.messageContainer, styles.myMessageContainer]}>

                        <Text style={styles.timeText}>{message.date}</Text>
                        <Text style={styles.myMessageText}>{message.text}</Text>
                    </View>
                </View>

            );
        } else {
            return (
                <View style={styles.messageContainer}>
                    <Image source={{ uri: message.img_author_message }} style={styles.profileImage} />
                    <Text style={styles.senderName}>{message.author_name}</Text>
                    <Text style={styles.messageText}>{message.text}</Text>
                    <Text style={styles.timeText}>{message.date}</Text>
                </View>
            );
        }
    } else {
        if (message.user_id == usuari.id) {
            return (
                <View style={[styles.messageContainer, styles.myMessageContainer]}>
                    <Text style={styles.timeText}>{message.date}</Text>
                    <Text style={styles.myMessageText}>{message.text}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.messageContainer}>
                    <Image source={{ uri: message.img_author_message }} style={styles.profileImage} />
                    <Text style={styles.senderName}>{message.author_name}</Text>
                    <Text style={styles.messageText}>{message.text}</Text>
                    <Text style={styles.timeText}>{message.date}</Text>
                </View>
            );
        }
    }

};

return (
    <>{isLoading ?
        <Text>Cargando...</Text>
        :
        <View style={styles.container}>
            <Text style={styles.title}>Chat Grupal</Text>
            <ScrollView style={styles.messagesContainer}>
                {messages.map((message) => (
                    <View key={message.id}>{renderMessage(message)}</View>
                ))}

            </ScrollView>
            {/* <CreateMessage /> */}
        </View>}
    </>

);
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F2F2F2',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    messagesContainer: {
        flex: 1,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 8,
        paddingHorizontal: 8,
    },
    myMessageContainer: {
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    profileImage: {
        width: 24,
        height: 24,
        borderRadius: 12,
        marginRight: 8,
    },
    senderName: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 2,
        textAlign: 'right',
    },
    messageText: {
        backgroundColor: '#FFFFFF',
        padding: 8,
        borderRadius: 8,
        marginRight: 8,
    },
    myMessageText: {
        backgroundColor: '#DCF8C6',
        padding: 8,
        borderRadius: 8,
    },
    timeText: {
        fontSize: 10,
        color: '#808080',
        marginTop: 2,
        textAlign: 'right',
    },
});

export default Chat
