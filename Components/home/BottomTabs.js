import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function BottomTabs() {
  return (
    <View
      style={{
        flexDirection: 'row',
        margin: 10,
        marginHorizontal: 30,
        justifyContent: 'space-between',
        color: 'white',
      }}>
      <Icon icon="home" text="Home" />
      <Icon icon="search" text="browse" />
      <Icon icon="shopping-bag" text="Grocery" />
      <Icon icon="receipt" text="Order" />
      <Icon icon="user" text="Account" />
    </View>
  );
}

const Icon = props => {
  return (
    <TouchableOpacity>
      <View>
        <FontAwesome5
          name={props.icon}
          size={25}
          style={{marginBottom: 3, alignSelf: 'center', color: 'green'}}
        />
        <Text style={{color: 'black'}}>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );
};
