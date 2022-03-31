import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {Divider} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';

export default function MenuItems({
  restaurantName,
  hideCheckbox,
  marginLeft,
  foods,
}) {
  const dispatch = useDispatch();

  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });

  const cartItems = useSelector(state => state.cartReducer.selectedItems.items);

  const isFoodInCart = (food, cartItems) =>
    Boolean(cartItems.find(item => item.title === food.title));

  return (
    <ScrollView>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.menuItemStyle}>
            {hideCheckbox ? (
              <></>
            ) : (
              <BouncyCheckbox
                iconStyle={{borderColor: 'gray', borderRadius: 0}}
                fillColor={'green'}
                onPress={checkboxValue => selectItem(food, checkboxValue)}
                isChecked={isFoodInCart(food, cartItems)}
              />
            )}
            <FoodInfo food={food} marginLeft={marginLeft ? marginLeft : 0} />
            <FoodImage food={food} />
          </View>
          <Divider
            width={0.5}
            orientation="vertical"
            style={{marginHorizontal: 20}}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  menuItemStyle: {
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  foodInfoStyle: {
    width: 200,
  },
});

const FoodInfo = props => {
  return (
    <View style={styles.foodInfoStyle}>
      <Text style={{color: 'green', fontSize: 18, fontWeight: '600'}}>
        {props.food.title}
      </Text>
      <Text style={{marginVertical: 2}}>{props.food.description}</Text>
      <Text style={{color: 'black'}}>{props.food.price}</Text>
    </View>
  );
};

const FoodImage = props => {
  return (
    <View>
      <Image
        style={{width: 85, height: 85, borderRadius: 10}}
        source={{uri: props.food.image}}
      />
    </View>
  );
};
