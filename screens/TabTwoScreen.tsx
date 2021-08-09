import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  const [user, setUser] = useState(null);
  const onLogout =() => {
    Auth.signOut();
  }

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
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dear {user?.username}, </Text>
      <Text style={styles.title}>Coming soon screen</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
      <TouchableOpacity onPress={onLogout} style={{padding:15, borderRadius: 10, backgroundColor:'darkgrey'}}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
