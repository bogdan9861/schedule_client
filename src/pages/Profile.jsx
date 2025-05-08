import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DropDown from 'react-native-input-select';
import {Service} from '../api/Service';
import {useNavigation} from '@react-navigation/native';
import {removeData} from '../utils/store';

const Profile = () => {
  const [groups, setGroups] = useState([]);
  const [user, setUser] = useState(null);

  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [group, setGroup] = useState('');
  const [course, setCourse] = useState('');

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const {getAllGroups, currentUser, editUser} = Service();
  const navigation = useNavigation();

  useEffect(() => {
    getAllGroups()
      .then(res => {
        setGroups(res);
      })
      .catch(e => console.log(e));
  }, []);

  useEffect(() => {
    setLoading(true);

    currentUser()
      .then(res => {
        setUser(res.data);
        setLoading(false);

        setLogin(res.data.login);
        setName(res.data.name);
        setGroup(res.data.groupId);
        setCourse(res.data.group.course + '');
      })
      .catch(e => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setDisabled(
      user?.name !== name &&
        user?.groupId !== group &&
        course === user?.group.course,
    );
  }, []);

  const edit = () => {
    editUser({id: user.id, name, login, groupId: group})
      .then(res => {
        navigation.goBack();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const onExit = () => {
    removeData('token');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {!loading ? (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.goBack()}>
              <Image
                style={styles.back_img}
                src="https://img.icons8.com/?size=100&id=3164&format=png&color=000000"
              />
            </TouchableOpacity>
            <Text style={styles.header_title}>Профиль</Text>
            <TouchableOpacity onPress={onExit}>
              <Image
                style={{width: 30, height: 30}}
                src="https://img.icons8.com/?size=100&id=vZasO3UTBpQE&format=png&color=EC0D0D"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.list}>
            <View style={styles.input_wrapper}>
              <Text style={styles.input_label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setLogin(text)}
                value={login}
                keyboardType="email-address"
              />
            </View>
            <View style={styles.input_wrapper}>
              <Text style={styles.input_label}>Имя</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => setName(text)}
                value={name}
              />
            </View>
            <View style={styles.input_wrapper}>
              <Text style={styles.input_label}>Курс</Text>
              <TextInput style={styles.input} value={course} readOnly={true} />
            </View>
            <View style={styles.input_wrapper}>
              <Text style={styles.input_label}>Группа</Text>
              <DropDown
                placeholder="Выберите группу из списка"
                dropdownContainerStyle={{backgroundColor: '#FFF'}}
                dropdownStyle={{backgroundColor: '#fff'}}
                options={groups?.map(el => ({
                  label: el.name,
                  value: el.id,
                }))}
                selectedValue={group}
                onValueChange={id => setGroup(id)}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.save_btn} onPress={edit}>
            <Text style={styles.save_btn_text}>Сохранить</Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 70,
    paddingHorizontal: 20,
    height: '100%',
  },

  back_img: {
    width: 23,
    height: 23,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 50,
  },

  header_title: {
    fontSize: 23,
    fontWeight: '600',
  },

  button: {},

  input: {
    padding: 18,
    borderColor: 'rgba(71, 71, 71, 0.5)',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(59, 160, 255, 0.32)',
  },

  input_label: {
    marginBottom: 10,
    color: 'rgba(0,0,0,0.5)',
  },

  save_btn: {
    width: '100%',
    backgroundColor: 'rgb(65, 116, 255)',
    padding: 20,
    borderRadius: 10,
    marginTop: 'auto',
  },

  save_btn_text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Profile;
