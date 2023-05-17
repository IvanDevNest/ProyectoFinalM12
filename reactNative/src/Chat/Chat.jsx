import React,{useEffect,useState,useContext} from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import CreateMessage from './CreateMessage';

const Chat = () => {
    const [messages,setMessages]=useState([])

    const getMessages = async () => {
        try {
          const data = await fetch("http://equip04.insjoaquimmir.cat/api/messages", {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              'Authorization': 'Bearer ' + authToken,
            },
            method: "GET",
          });
          const resposta = await data.json();
          if (resposta.success === true) {
            console.log("resposta messages: " + JSON.stringify(resposta.data))
           
            resposta.data.map((message) => {
                message.id_route == usuari.route_id?
                setMessages(messages => [...messages, message])
                :
                <></>
            })
            setIsLoading(false)
          }
          else setError(resposta.message);
        } catch (err) {
          console.log("catch getMessages: " + err.message);
          alert("Catchch");
        };
      }
      useEffect(() => {
        getMessages()
      }, []);

  const renderMessage = (message) => {
    if (message.isMe) {
      return (
        <View style={[styles.messageContainer, styles.myMessageContainer]}>
          <Text style={styles.myMessageText}>{message.tex}</Text>
          <Text style={styles.timeText}>{message.date}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.messageContainer}>
          <Image source={message.sender.img_author_message} style={styles.profileImage} />
          <Text style={styles.senderName}>{message.author_name}</Text>
          <Text style={styles.messageText}>{message.text}</Text>
          <Text style={styles.timeText}>{message.date}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat Grupal</Text>
      <ScrollView style={styles.messagesContainer}>
        {messages.map((message) => (
          <View key={message.id}>{renderMessage(message)}</View>
        ))}
      </ScrollView>
      <CreateMessage/> 
    </View>
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
