import React from 'react';
import {View, Text, Image} from 'react-native';

const yelpRestaurantInfo = {
  name: 'Biryani Corner',
  image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?1',
  price: '$$',
  reviews: '1500',
  rating: 4.5,
  categories: [{title: 'Pakistani'}, {title: 'Spicy'}],
};

export default function About(props) {
  const {name, image, price, reviews, rating, categories} = props.route.params;

  const formattedCategories = categories.map(cat => cat.title).join(' • ');

  const description = `${formattedCategories} ${
    price ? ' • ' + price : ' '
  } • 🎫 • ${rating} ⭐ (${reviews}+) `;

  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
    </View>
  );
}

const RestaurantImage = props => (
  <Image source={{uri: props.image}} style={{width: '100%', height: 180}} />
);

const RestaurantName = props => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: '600',
      marginTop: 10,
      marginHorizontal: 15,
      color: 'green',
    }}>
    {props.name}
  </Text>
);

const RestaurantDescription = props => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: '400',
      color: 'green',
    }}>
    {props.description}
  </Text>
);
