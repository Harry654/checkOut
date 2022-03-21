import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import MyDeliveries from './app/screens/MyDeliveries';
import DeliveryDetails from './app/screens/DeliveryDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [display, setDisplay] = useState(0);
  const [currentItem, setCurrentItem] = useState({});
  const [favs, setFavs] = useState([]);

  const inFavs = () => {
    return(favs.indexOf(currentItem.id));
  }

  const appendFavs = () => {
    if(inFavs() == -1){
      let tempFavs = favs; // temporary favorites array
      tempFavs.push(currentItem.id);
      saveFavs(tempFavs);
    }else{
      let tempFavs = favs;
      tempFavs = tempFavs.filter((id) => id != currentItem.id);
      saveFavs(tempFavs);
    }
  }

  const saveFavs = async (favs) => {
    try{
      await AsyncStorage.setItem('@favs', JSON.stringify(favs));
      loadFavs();
    }catch(error){
      console.warn('Error saveFavs: ' + error);
    }
  }

  const loadFavs = async () => {
    try{
      let favsData = await AsyncStorage.getItem('@favs');
      favsData = JSON.parse(favsData);
      if(favsData !== null || typeof favsData !== 'object'){
        setFavs(favsData);
      }
    }catch(error){
      console.warn('Error loadFavs: ' + error);
    }
  }


  useEffect(() => {
    loadFavs();
  }, []);


    if(!display){
      return(
        <View style={styles.container}>
          
          <MyDeliveries 
            favs={favs} 
            setDisplay={setDisplay} 
            setCurrentItem={setCurrentItem}
          />
        </View>
      );
    }else{
      return(
        <View style={styles.container}>
           <DeliveryDetails 
            inFavs={inFavs} 
            appendFavs={appendFavs} 
            setFavs={setFavs} 
            currentItem={currentItem} 
            setDisplay={setDisplay}
           />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: StatusBar.currentHeight,
  },
});
