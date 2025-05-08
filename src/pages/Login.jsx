import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Service} from '../api/Service';
import {getData, storeData} from '../utils/store';

const Login = () => {
  const navigation = useNavigation();

  const [loginText, setLoginText] = useState('');
  const [password, setPassword] = useState('');

  const {login} = Service();

  useEffect(() => {
    (async () => {
      const token = await getData('token');

      if (token) {
        navigation.navigate('Home');
      }
    })();
  }, []);

  const onSubmit = () => {
    login({login: loginText, password})
      .then(res => {
        storeData('token', res.token);
        navigation.navigate('Home');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        src="https://www.informio.ru/imgs/logos/12.jpg"
      />
      <View style={styles.inner}>
        <View style={styles.wrapper}>
          <TextInput
            style={styles.input}
            placeholder="Логин"
            placeholderTextColor="rgb(199, 199, 199)"
            onChangeText={text => setLoginText(text)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Пароль"
            placeholderTextColor="rgb(199, 199, 199)"
            onChangeText={text => setPassword(text)}
          />

          <TouchableOpacity style={styles.btn} onPress={onSubmit}>
            <Text style={styles.btn_text}>Войти</Text>
            <Image
              style={styles.btn_img}
              src="https://img.icons8.com/?size=100&id=60671&format=png&color=FFFFFF"
            />
          </TouchableOpacity>
          <View style={styles.divider}>
            <Text style={styles.divider_text}>Или</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={[
              styles.btn,
              {
                marginTop: 40,
                backgroundColor: 'transparent',
                borderColor: '#4B60E4',
                borderWidth: 4,
                borderRadius: 100,
              },
            ]}>
            <Text style={[styles.btn_text, {color: '#4B60E4'}]}>Создать</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,

    backgroundColor: '#fff',
  },

  logo: {
    width: 120,
    height: 50,
    objectFit: 'contain',
    marginBottom: 120,
    marginHorizontal: 'auto',
  },

  inner: {
    height: '100%',
    paddingHorizontal: 30,
  },

  wrapper: {
    width: '100%',
  },

  input: {
    color: 'rgb(49, 49, 49)',
    borderBottomColor: 'rgb(199, 199, 199)',
    borderBottomWidth: 1,
    marginBottom: 20,
    paddingBottom: 25,
    fontWeight: '600',
    fontSize: 15,
  },

  btn: {
    width: '100%',
    backgroundColor: '#4B60E4',
    padding: 20,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

    marginTop: 40,
    marginBottom: 30,
  },

  btn_text: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 18,
  },

  btn_img: {
    width: 23,
    height: 23,
    position: 'absolute',
    right: 15,
  },

  divider: {
    width: '100%',
    borderBottomColor: 'rgba(199, 199, 199, 0.52)',
    borderBottomWidth: 1,
    position: 'relative',
  },

  divider_text: {
    position: 'absolute',
    left: '50%',
    transform: [{translateX: '-50%'}, {translateY: '-50%'}],
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});

export default Login;
