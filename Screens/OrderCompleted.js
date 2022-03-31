import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import firebase from 'firebase';
import MenuItems from '../Components/restaurantDetail/MenuItems';

export default function OrderCompleted() {
  const [lastOrder, setLastOder] = useState({
    items: [],
  });
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

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot(snapshot => {
        snapshot.docs.map(doc => {
          setLastOder(doc.data());
        });
      });

    return () => unsubscribe();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{margin: 15, alignItems: 'center', height: '100%'}}>
        <LottieView
          style={{height: 100, alignSelf: 'center', marginBottom: 30}}
          source={require('../assets/animations/check-mark.json')}
          autoPlay
          speed={0.5}
          loop={false}
        />
        <Text style={{color: 'green', fontSize: 20, fontWeight: 'bold'}}>
          Your order at {restaurantName} has been placed for {finalUSD}
        </Text>
        <ScrollView>
          <MenuItems foods={lastOrder.items} hideCheckbox={true} />
          <LottieView
            style={{height: 200, alignSelf: 'center'}}
            source={require('../assets/animations/cooking.json')}
            autoPlay
            speed={0.5}
          />
        </ScrollView>
      </View>
    </View>
  );
}
