import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../utils/store';
import Events from '../components/Events';
import Schedule from '../components/Schedule';

const Home = () => {
  const navigation = useNavigation();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const token = await getData('token');
      if (!token) {
        navigation.navigate('Login');
      }
    })();
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            style={styles.logo}
            src="https://www.informio.ru/imgs/logos/12.jpg"
          />
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image
              style={styles.profile}
              src="https://img.icons8.com/?size=100&id=z-JBA_KtSkxG&format=png&color=000000"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab} onPress={() => setTabIndex(0)}>
            <Text
              style={[
                styles.tab_text,
                tabIndex === 0 ? styles.tab_text_active : {},
              ]}>
              Новости
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => setTabIndex(1)}>
            <Text
              style={[
                styles.tab_text,
                tabIndex === 1 ? styles.tab_text_active : {},
              ]}>
              Рассписание
            </Text>
          </TouchableOpacity>
        </View>
        <View>{tabIndex === 0 ? <Events /> : <Schedule />}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,
    paddingHorizontal: 20,

    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 30,   
  },

  tabs: {
    flexDirection: 'row',
    columnGap: 25,
  },

  tab: {},

  tab_text: {
    fontSize: 17,
  },

  tab_text_active: {
    color: 'rgb(47, 64, 219)',
    fontWeight: '600',

    borderBottomColor: 'rgb(47, 64, 219)',
    borderBottomWidth: 1,
  },

  logo: {
    width: 120,
    height: 50,
    objectFit: 'cover',
    marginBottom: 30,
  },

  profile: {
    width: 34,
    height: 34,
    transform: [{translateY: -10}],
  },
});

export default Home;
