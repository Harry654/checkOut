import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
export default function MyDeliveries({ setDisplay, currentItem, favs, appendFavs, inFavs }){
    const price = (currentItem) => {
        //calculate item price
        return((parseFloat(currentItem.deliveryFee.slice(1,)) + parseFloat(currentItem.surcharge.slice(1,))).toFixed(2));
    }
    
    return(
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Delivery Details</Text>

            <TouchableOpacity onPress={() => setDisplay(0)} style={{position: 'absolute', marginLeft: 10, marginTop: 20, backgroundColor: 'black', borderRadius: 20, }}>
                <MaterialIcons name='arrow-back' size={25} color={'white'} />
            </TouchableOpacity>
            <View>

                <Text style={styles.sender_header}>Sender Details</Text>

                <View style={styles.sender_details}>
                    <MaterialIcons name='person' size={25} color={'white'} style={styles.person} />
                    <Text style={{color: 'white', fontSize: 20, alignSelf: 'center',}}>{currentItem.sender.name}</Text>
                </View>

                <View style={styles.sender_details}>
                    <MaterialIcons name='local-phone' size={25} color={'white'} style={styles.phone} />
                    <Text style={{color: 'white', fontSize: 20, alignSelf: 'center',}}>{currentItem.sender.phone}</Text>
                </View>

                <View style={styles.sender_details}>
                    <MaterialIcons name='email' size={25} color={'white'} style={styles.email} />
                    <Text style={{color: 'white', fontSize: 20, alignSelf: 'center',}}>{currentItem.sender.email}</Text>
                </View>
            </View>
            <View>
                <Text style={styles.route_header}>Route Details</Text>

                <View style={styles.route_details}>
                    <MaterialIcons name='location-pin' size={25} color={'white'} style={{position: 'absolute', alignSelf: 'flex-start', marginLeft: 10, }} />
                    <Text style={{color: 'white', fontSize: 20, alignSelf: 'center',}}>From: {currentItem.route.start}</Text>
                </View>
                
                <View style={styles.route_details}>
                <Ionicons name='md-flag' size={25} color={'white'} style={{position: 'absolute', alignSelf: 'flex-start', marginLeft: 10, }} />
                <Text style={{color: 'white', fontSize: 20, alignSelf: 'center', }}>To: {currentItem.route.end}</Text>
                </View>
            </View>

            <View style={styles.goods_to_deliver}>
                <Text style={{color: 'white', fontSize: 18, alignSelf: 'flex-start',}}>Goods to deliver</Text>
                <Image source={{uri: currentItem.goodsPicture}} style={{ height: 90, width: 90, borderRadius: 10, }} />
            </View>

            <View style={styles.remarks}>
                <Text style={{color: 'white'}}>{'Picked up at ' + currentItem.pickupTime}</Text>
                <Text style={{color: 'white'}}>{'Remarks: ' + currentItem.remarks}</Text>
            </View>

            <Text style={styles.price_header}>Price Details</Text>

            <View style={styles.price_details}>

                <View>
                <Text style={{color: 'white', fontSize: 18, alignSelf: 'flex-start',}}>Delivery Fee: </Text>
                <Text style={{color: 'white', position: 'absolute', fontSize: 18, alignSelf: 'flex-end',}}>{currentItem.deliveryFee}</Text>
                </View>

                <View>
                <Text style={{color: 'white', fontSize: 18, alignSelf: 'flex-start',}}>Surcharge: </Text>
                <Text style={{color: 'white', position: 'absolute', fontSize: 18, alignSelf: 'flex-end',}}>{currentItem.surcharge}</Text>
                </View>

                <View style={{borderBottomColor: 'white', borderBottomWidth: 1, borderRadius: 20, alignSelf: 'center', width: '90%',}}/>

                <View>
                <Text style={{color: 'white', fontSize: 18, alignSelf: 'flex-start',}}>Price: </Text>
                <Text style={{color: 'white', position: 'absolute', fontSize: 18, alignSelf: 'flex-end',}}>{'$' +  (price(currentItem))}</Text>
                </View>

            </View>

            <View style={styles.fav}>

                <TouchableOpacity onPress={appendFavs}>
                    <MaterialIcons name={inFavs() != -1 ? 'favorite' : 'favorite-outline'} size={40} color={'red'} />
                </TouchableOpacity>

                <Text style={{ color: 'black', }}>{inFavs() != -1 ? 'Remove from favorites' : 'Add to favorites'}</Text>
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
        paddingHorizontal: 35,
        marginTop: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: 'blue',
        borderRadius: 10,
        elevation: 20,
    },
    sender_header: {
        backgroundColor: 'cyan',
        borderRadius: 10,
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 10,
        marginLeft: 10,
        elevation: 10,
    },
    sender_details: {
        width: '95%',
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: 'orange',
        alignSelf: 'center',
        marginTop: 10,
        justifyContent: 'center',
    },
    person: {
        position: 'absolute', 
        alignSelf: 'flex-start',
        marginLeft: 10, 
    },
    phone: {
        position: 'absolute', 
        alignSelf: 'flex-start', 
        marginLeft: 10, 
    },
    email: {
        position: 'absolute', 
        alignSelf: 'flex-start', 
        marginLeft: 10, 
    },
    route_header: {
        backgroundColor: 'cyan',
        borderRadius: 10,
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 10,
        marginLeft: 10,
        elevation: 10,
        color: 'red',
    },
    route_details: {
        width: '95%',
        height: 50,
        paddingHorizontal: 10,
        borderRadius: 20,
        backgroundColor: 'orange',
        alignSelf: 'center',
        marginTop: 10,
        justifyContent: 'center',
    },
    goods_to_deliver: {
        width: '95%',
        height: 150,
        padding: 10,
        backgroundColor: 'orange',
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        alignSelf: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
    },
    price_header: {
        backgroundColor: 'cyan',
        borderRadius: 10,
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 10,
        marginLeft: 10,
        elevation: 10,
    },
    price_details: {
        width: '95%',
        height: 80,
        padding: 10,
        backgroundColor: 'orange',
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 10,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    remarks: {
        width: '95%',
        height: 80,
        padding: 10,
        backgroundColor: 'orange',
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        marginTop: 10,

    },
    fav: {
        width: '80%',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 20,
        paddingVertical: 10,
        borderRadius: 5,
    },
  });