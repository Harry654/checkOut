import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyDeliveries({ setDisplay, setCurrentItem, favs }){
    const [items, setItems] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true);
    const [factor, setFactor] = useState(0);
    let limit = 20;
    let offset = limit * factor;
    const details = (item) => {
        // change to details page
        setCurrentItem(item); 
        setDisplay(1);
    }
    const price = (item) => {
        // calculate item price
        return((parseFloat(item.deliveryFee.slice(1,)) + parseFloat(item.surcharge.slice(1,))).toFixed(2));
    }
    const next = () =>{
        // function to fetch more pages
        let tempFactor = factor + 1;
        setFactor(tempFactor);
        getDeliveries(offset, limit);
    }
    const prev = () =>{
        // function to fetch less pages
        let tempFactor = factor - 1;
        if(!(tempFactor < 0)){
            setFactor(tempFactor);
            getDeliveries(offset, limit);
        }
   }
    const getDeliveries = async (offset, limit) => {
        let APIURL = 'https://mock-api-mobile.dev.lalamove.com/v2/deliveries';
        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        
        
        await fetch((APIURL + '?offset=' + offset + '&limit=' + limit), { //fetch deliveries from API
            method: 'GET',
            headers: headers,
        }
        )
        .then((response) => response.json())
        .then((response) => {
            saveDeliveries(response);
        })
        .catch((error) => {
            console.warn('Error fetching: ' + error);
        })
    }
    
    const saveDeliveries = async (response) => {
        // save deliveries to ocal storage
        try{
            await AsyncStorage.setItem('MyDeliveries', JSON.stringify(response));
            await AsyncStorage.setItem('@factor', factor.toString());
            loadDeliveries();
        }catch(error){
            console.warn('Error saveDeliveries: ' + error);
        }
    }
    
    const loadDeliveries = async () => {
        //load cached deliveries
        try {
            let deliveries = await AsyncStorage.getItem('MyDeliveries');
            deliveries = JSON.parse(deliveries);
            let factor = await AsyncStorage.getItem('@factor');
            if (deliveries !== null || typeof deliveries !== 'object'){
                setItems(deliveries);
                if (firstLoad){
                    // update factor from memory for the first time
                    setFactor(factor);
                    setFirstLoad(false);
                }
            }else{
                getDeliveries(offset, limit);
            }
        }catch(error){
            console.warn('Error loadDeliveries: ' + error);
        }
    }

    useEffect(() => {
        loadDeliveries();
    }, [])
    
   
            
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.header}>My Deliveries</Text>
            <TextInput
                placeholder={"Search goods by index"}
                returnKeyType="next"
                onChangeText={(text) => {text ? getDeliveries(text, 1) : getDeliveries(0, 20)}}
                textContentType="telephoneNumber"
                keyboardType="number-pad"
                style={styles.input}
            />
            {items.map((item, index) => 
            
                <TouchableOpacity key={item.id} style={styles.item_box} onPress={() => details(item)}>
                    <Image source={{uri: item.goodsPicture}} style={styles.item_image} />
                    <View style={styles.item_desc}>
                        {
                            favs.includes(item.id) ? 
                            <MaterialIcons name='favorite' size={80} color={'rgba(0, 0, 0, 0.3)'} style={{ position: 'absolute', alignSelf: 'center', padding: 20 }}/> : <Text>{''}</Text>
                        }
                        <Text style={{color: 'black', fontSize: 15, }}>From: {item.route.start}</Text>
                        <Text style={{color: 'black', fontSize: 15, }}>To: {item.route.end}</Text>
                        <Text style={{color: 'black', fontSize: 15, alignSelf: 'flex-end'}}>{'$' + price(item)}</Text>
                    </View>
                </TouchableOpacity>
            )}

            <View style={{width: '90%', alignSelf: 'center', justifyContent: 'center', marginTop: 10, }}>
                <TouchableOpacity onPress={() => prev()} style={{
                    alignSelf: 'flex-start',
                    width: 50,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5,
                    fontSize: 20,
                    color: 'white',
                    borderTopLeftRadius: 10,
                    borderBottomLeftRadius: 10,
                    position: 'absolute',
                    backgroundColor: factor !== 0 ? 'orange' : 'cyan',
                }}>
                    <Text style={{color: 'white', fontSize: 25, }}>{'<'}</Text>
                </TouchableOpacity>

                <Text style={styles.pageNum}>{parseInt(offset) + ' - ' + ((parseInt(offset)) + parseInt(limit))} </Text>

                <TouchableOpacity onPress={() => next()} style={styles.next}>
                    <Text style={{color: 'white', fontSize: 25, }}>{'>'}</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      marginBottom: 10,
    },
    header: {
        alignSelf: 'center',
        paddingVertical: 15,
        paddingHorizontal: 40,
        marginTop: 5,
        fontSize: 20,
        color: 'white',
        backgroundColor: 'blue',
        borderRadius: 10,
    },
    input: {
        width: '100%', 
        height: 50, 
        backgroundColor: 'cyan', 
        shadowColor: 'black', 
        shadowOpacity: 1, 
        elevation: 10, 
        borderRadius: 30, 
        paddingHorizontal: 40, 
        fontSize: 20, 
        marginTop: 20, 
        alignItems: 'center', 
    },
    item_image: {
        backgroundColor: 'blue',
        width: 100,
        height: '100%',
        borderRadius: 20,
        borderBottomLeftRadius: 0,
    },
    item_box: {
        height: 100,
        width: "95%",
        backgroundColor: 'rgba(255, 255, 255, .8)',
        elevation: 10,
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        alignSelf: 'center',
        marginTop: 10,
    },
    item_desc: {
        width: 200,
        height: '100%',
        padding: 10,
        position: 'absolute',
        alignSelf: 'flex-end',
        justifyContent: 'center',
    },
    next: {
        alignSelf: 'flex-end',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        backgroundColor: 'blue',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    pageNum: { 
        height: 50, 
        paddingHorizontal: 50, 
        paddingVertical: 10, 
        color: 'white', 
        backgroundColor: 'orange', 
        position: 'absolute', 
        fontSize: 20, 
        alignSelf: 'center', 
    },
  });