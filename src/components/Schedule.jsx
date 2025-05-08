import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Service} from '../api/Service';
import {removeData, storeData} from '../utils/store';
import {setFile} from '../utils/setFile';

const Schedule = () => {
  const {getSchedule} = Service();

  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getSchedule()
      .then(res => {
        console.log(res);

        setSchedules(res);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={schedules}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => Linking.openURL(setFile(item.file))}>
            <View style={styles.item_inner}>
              <Image
                style={styles.item_icon}
                src="https://img.icons8.com/?size=100&id=13593&format=png&color=000000"
              />
              <Text style={styles.group}>{item.group.name}</Text>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(37, 77, 14, 0.72)',
                paddingVertical: 5,
                paddingHorizontal: 12,
                borderRadius: 10,

                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.name}>{item.fileName}</Text>
              <Image
                style={{width: 30, height: 30, transform: [{translateX: '-100%'}]}}
                src="https://img.icons8.com/?size=100&id=20FjgTazh8FG&format=png&color=FFFFFF"
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 40,
  },

  item: {
    width: '100%',
    height: 'auto',
    backgroundColor: 'rgba(37, 77, 14, 0.72)',

    borderColor: 'rgba(1, 59, 9, 0.5)',
    borderWidth: 1,

    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 20,
  },

  item_icon: {
    width: 24,
    height: 24,
    transform: [{translateY: 0}],
  },

  group: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 10,
  },

  item_inner: {
    flexDirection: 'row',
    columnGap: 10,

    width: '100%',
  },

  name: {
    color: '#fff',
    width: '100%',
    fontSize: 14,
    lineHeight: 19
  },
});

export default Schedule;
