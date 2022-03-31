import React, {useEffect, useState} from 'react';
import HeaderTabs from '../Components/home/HeaderTabs';
import SearchBar from '../Components/home/SearchBar';
import Categories from '../Components/home/Categories';
import {View, SafeAreaView, ScrollView, Image} from 'react-native';
import RestaurantItems from '../Components/home/RestaurantItems';
import {localRestaurants} from '../Components/home/RestaurantItems';
import {Divider} from 'react-native-elements';
import BottomTabs from '../Components/home/BottomTabs';

const YELP_API_KEY =
  'ro1A6nsnE5nTDTOHfjlZlZWTX5r1peyDtOFFAghxRqvzNllYFNZUNFyIXSY3Yk96bv1yoEJLmS6hCy17d6UkBKadAqUz8ujoZQPY6hVMXqYsSf38_TaVJryZYbcIYnYx';

const Home = ({navigation}) => {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 500);
  }, []);
  const [activeTab, setActiveTab] = useState('Delivery');
  const [restaurantData, setRestaurantData] = useState([localRestaurants]);
  const [city, setCity] = useState('Melbourne');

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then(res => res.json())
      .then(json => setRestaurantData(json.businesses));
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return splash ? (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={require('../assets/images/OZ.png')} />
    </View>
  ) : (
    <SafeAreaView style={{backgroundColor: '#eee', flex: 1}}>
      <View style={{backgroundColor: 'white', padding: 15}}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems
          restaurantData={restaurantData}
          navigation={navigation}
        />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  );
};

export default Home;
