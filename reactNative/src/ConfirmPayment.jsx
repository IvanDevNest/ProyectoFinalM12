import React, { useState, useContext } from "react";
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useRoute } from '@react-navigation/native';
import { useEffect } from "react";

const ConfirmPayment = () => {

    const [subscriptionType, setSubscriptionType] = useState('monthly');


    const { confirmPayment } = useStripe();
    const [paymentError, setPaymentError] = useState(null);
    const [cardData, setCardData] = useState({});
    const [clientSecret, setClientSecret] = useState(null);

    console.log(cardData)

    const handleCardComplete = (cardDetails) => {
        setCardData(cardDetails);
      };
     const handlePayment = async () => {
        console.log(subscriptionType)
        try {
            const data = await fetch('http://equip04.insjoaquimmir.cat/api/subscribe', {
                headers: {
                    Accept: 'application/json',
                },
                method: 'POST',
                body: JSON.stringify({ cardData, subscription: subscriptionType }),
            });
            const resposta = await data.json();
            console.log("resposta: " + JSON.stringify(resposta))

            if (resposta.success === true) {
                // setRutas(resposta);
                console.log("resposta: " + JSON.stringify(resposta))
                setClientSecret(resposta.data);


            }
            // else setError(resposta.message);
        } catch (e) {
            console.log(e.message);
        }
    }
    useEffect(() => {
     console.log(subscriptionType)
      }, [subscriptionType]);
  
 
    return (
        <View>
            <CardField
                postalCodeEnabled={false}
                placeholder={{
                    number: 'Número de tarjeta',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 20,
                }}
                onComplete={handleCardComplete}
            />
            
            <View style={styles.subscriptionButtons}>
                <Button
                    title="Pagar Mensualmente"
                    onPress={() => setSubscriptionType('monthly')}
                    color={subscriptionType === 'monthly' ? '#007bff' : '#999999'}
                />
                <Button
                    title="Pagar Anualmente"
                    onPress={() => setSubscriptionType('annual')}
                    color={subscriptionType === 'annual' ? '#007bff' : '#999999'}
                />
            </View>
            
            {paymentError && <Text style={{ color: 'red' }}>{paymentError}</Text>}
            <Button title="Pagar" onPress={handlePayment} /> 
        </View>
    )
}

const styles = StyleSheet.create({
    subscriptionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});

export default ConfirmPayment;