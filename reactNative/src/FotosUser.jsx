import { View, Text, Button, Image } from 'react-native';
import Rutas from './Routes'
import Fotos from './Fotos'
import FotoUser from './FotoUser'
import { FlatList } from 'react-native'


const FotosUser = () => {
  return (

    <FlatList data={Fotos} numColumns={2}
    renderItem={({ item: foto }) => (
       
          <FotoUser {...foto} />

    )}>
  </FlatList>

 
  );
};


export default FotosUser;