import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import OrderItem from './OrderItem';
import firebase from '../../firebase';

export default function ViewCart({navigation}) {
  const {items, restaurantName} = useSelector(
    state => state.cartReducer.selectedItems,
  );

  const total = items
    .map(item => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0);

  const totalUSD = total.toLocaleString('en', {
    style: 'currency',
    currency: 'USD',
  });
  const finalUSD = '$' + totalUSD;

  const [modalVisible, setModalVisible] = useState(false);

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },

    modalCheckoutContainer: {
      backgroundColor: 'white',
      padding: 16,
      height: 500,
      borderWidth: 1,
    },

    restaurantName: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 18,
      marginBottom: 10,
      color: 'black',
    },

    subtotalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },

    subtotalText: {
      textAlign: 'left',
      fontWeight: '600',
      fontSize: 15,
      marginBottom: 10,
      color: 'black',
      fontSize: 17,
    },
  });

  const addOrderToFireBase = () => {
    const db = firebase.firestore();
    db.collection('orders').add({
      items: items,
      restaurantName: restaurantName,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    navigation.navigate('OrderCompleted');
  };

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem item={item} key={index} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text style={{fontSize: 17}}>{finalUSD}</Text>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: 'green',
                  alignItems: 'center',
                  padding: 13,
                  borderRadius: 30,
                  width: 300,
                  position: 'relative',
                }}
                onPress={() => {
                  addOrderToFireBase();
                  setModalVisible(false);
                }}>
                <Text style={{color: 'white', fontSize: 20}}>Checkout</Text>
                <Text
                  style={{
                    position: 'absolute',
                    right: 20,
                    color: 'white',
                    fontSize: 17,
                    top: 17,
                  }}>
                  {total ? finalUSD : ''}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}>
        {checkoutModalContent()}
      </Modal>

      {total ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            position: 'absolute',
            bottom: 250,
            zIndex: 999,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                marginTop: 20,
                backgroundColor: 'green',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                padding: 15,
                borderRadius: 30,
                width: 300,
                position: 'relative',
              }}>
              <Text style={{color: 'white', fontSize: 20, marginRight: 30}}>
                View Cart
              </Text>
              <Text style={{color: 'white', fontSize: 20}}>{finalUSD}</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <></>
      )}
    </>
  );
}
