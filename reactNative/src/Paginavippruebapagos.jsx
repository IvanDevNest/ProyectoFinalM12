import React, { useState, useContext } from "react";
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const Paginavip = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

  //   function ConfirmPayment(id) {
  //     navigation.navigate('ConfirmPayment', { objectId: id});
  // } 
  function ConfirmPayment() {
    navigation.navigate('ConfirmPayment');
  }
  return (
    <View style={styles.container}>
      <Image
        source={require('./vip.png')}
        style={styles.image}
      />
      <Text style={styles.title}>¡Conviértete en VIP!</Text>
      <Text style={styles.description}>
        Disfruta de beneficios exclusivos por tan solo:
      </Text>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>1.99€ al mes o 11.99€ al año</Text>
      </View>

      <Text>Elige tu suscripción:</Text>



      <Button
        title="¡Hazte VIP ahora!"
        onPress={() => ConfirmPayment()}
        style={styles.button}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    width: 200,
  },
});

export default Paginavip;
