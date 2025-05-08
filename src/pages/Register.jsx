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
import Dropdown from 'react-native-input-select';
import {Service} from '../api/Service';
import {getData, storeData} from '../utils/store';

const Register = () => {
  const navigation = useNavigation();
  const {getAllGroups, register} = Service();

  const [groups, setGroups] = useState([]);

  const [login, setLogin] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    (async () => {
      const token = await getData('token');
      if (token) {
        navigation.navigate('Home');
      }
    })();
  }, []);

  useEffect(() => {
    getAllGroups()
      .then(res => {
        console.log(res);

        setGroups(res);
      })
      .catch(e => console.log(e));
  }, []);

  const onSubmit = () => {
    register({name, login, password, groupId: group})
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
            placeholder="Имя"
            placeholderTextColor="rgb(199, 199, 199)"
            onChangeText={text => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Логин"
            placeholderTextColor="rgb(199, 199, 199)"
            onChangeText={text => setLogin(text)}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Пароль"
            placeholderTextColor="rgb(199, 199, 199)"
            onChangeText={text => setPassword(text)}
          />
          <Dropdown
            placeholder="Выберите группу из списка"
            dropdownContainerStyle={{backgroundColor: '#FFF'}}
            dropdownStyle={{backgroundColor: '#fff'}}
            options={groups?.map(el => ({
              label: el.name,
              value: el.id,
            }))}
            onValueChange={id => setGroup(id)}
          />

          <TouchableOpacity style={styles.btn} onPress={onSubmit}>
            <Text style={styles.btn_text}>Создать</Text>
            <Image
              style={styles.btn_img}
              src="https://img.icons8.com/?size=100&id=60671&format=png&color=FFFFFF"
            />
          </TouchableOpacity>
          <View style={styles.divider}>
            <Text style={styles.divider_text}>Или</Text>
          </View>
          <TouchableOpacity
            style={[
              styles.btn,
              {
                marginTop: 40,
                backgroundColor: 'transparent',
                borderColor: '#4B60E4',
                borderWidth: 4,
                borderRadius: 100,
              },
            ]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.btn_text, {color: '#4B60E4'}]}>Войти</Text>
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

    marginTop: 20,
    marginBottom: 40,
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

export default Register;
