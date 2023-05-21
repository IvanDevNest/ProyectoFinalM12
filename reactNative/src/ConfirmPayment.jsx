import React, { useState, useContext } from "react";
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useRoute } from '@react-navigation/native';

const ConfirmPayment = () => {

    const { confirmPayment } = useStripe();
    const [paymentError, setPaymentError] = useState(null);

    const handlePayment = async () => {
        try {
            const response = await fetch('http://equip04.insjoaquimmir.cat/subscribe');
            const data = await response.json();
            
            const { clientSecret } = data;
        
            const { paymentIntent, error } = await confirmPayment(clientSecret, {
              type: 'Card',
            });

            if (error) {
                setPaymentError(error.message);
            } else if (paymentIntent) {
                // Pago exitoso, puedes realizar las acciones necesarias aquí
                console.log('Pago exitoso:', paymentIntent);
            }
        } catch (e) {
            console.log('Error al confirmar el pago:', e);
            setPaymentError('Error al confirmar el pago');
        }
    }
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
            />
            {paymentError && <Text style={{ color: 'red' }}>{paymentError}</Text>}
            <Button title="Pagar" onPress={handlePayment} />
        </View>

    )
}

export default ConfirmPayment