import React, { useContext } from "react";
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { UserContext } from "./userContext";

const Paginavip = () => {
  let { userRole } = useContext(UserContext);
console.log(userRole)
  return (
    <>
      {userRole != 'vip' ?
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
          <Button
            title="¡Hazte VIP ahora!"
            onPress={() => {
              alert("De momento no hay implementado sistema de pago :D")
              // Aquí puedes agregar la lógica para redirigir a la página de pago o cualquier otra acción
            }}
            style={styles.button}
          />
        </View>
        : <View style={styles.container}>
          <Image
            source={require('./vip.png')}
            style={styles.image}
          />
          <Text style={styles.title}> !Ya eres VIP!</Text>
          <Text style={styles.title}> !Muchas Gracias!</Text>
       
        </View>}
    </>

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
