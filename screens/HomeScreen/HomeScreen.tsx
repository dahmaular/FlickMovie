import React, { useState, useEffect } from 'react';
import { Image, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Auth } from 'aws-amplify';
import { Text, View } from '../../components/Themed';
import { DataStore } from 'aws-amplify';

import styles from './styles';
// import categories from '../../assets/data/categories';
import HomeCategory from '../../components/HomeCategory';
import { Category } from '../../src/models'

const HomeScreen = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [user, setUser] = useState(null);

  async function checkUser() {
    try {
      const data = await Auth.currentUserPoolUser()
      const userInfo = { username: data.username, ...data.attributes, }
      setUser(userInfo);
      console.log(userInfo);
      
    } catch (err) { console.log('error: ', err) }
  }

  useEffect(() => {
    checkUser();
    const fetchCategories = async () => {
      const response = await DataStore.query(Category);
      setCategories(response);
      console.log(response);
      
    };
    fetchCategories();
  }, [])
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={style.userContainer}>
      <Image
       style={{width:20, height:20}}
        source={require('../../assets/images/netflix.jpg')}
      />
      {user ? (
         <Text style={style.name}> {user?.username}</Text>
      ) : (
        <></>
      )}
      </View>
      
     
        {/* List of categories */}
        <FlatList
            data={categories}
            renderItem={({item}) => 
            <HomeCategory category={item} />}
        />
    </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF'
  },
  userContainer: {
    backgroundColor: '#000000',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    // marginLeft: '80%',
    flexDirection: 'row',
    alignContent: 'flex-end',
    marginBottom: 10
  }
});

export default HomeScreen;
