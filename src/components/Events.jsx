import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Service} from '../api/Service';
import {setFile} from '../utils/setFile';
import {formatDate} from '../utils/formatDate';
import NoContent from './NoContent';

const Events = () => {
  const {getEvent} = Service();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getEvent()
      .then(res => {
        setLoading(false);

        setEvents(res);
      })
      .catch(e => setLoading(false));
  }, []);

  return (
    <View style={styles.wrapper}>
      {!events.length && !loading ? (
        <NoContent />
      ) : !loading ? (
        <FlatList
          data={events}
          renderItem={({item}) => (
            <View style={styles.item}>
              <Text style={styles.date}>{formatDate(item.date)}</Text>
              <Image style={styles.image} src={setFile(item.file)} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    paddingBottom: 40,
  },

  item: {
    backgroundColor: 'rgba(244, 243, 255, 0.63)',
    padding: 15,
    borderRadius: 20,
    borderColor: 'rgba(62, 146, 255, 0.5)',
    borderWidth: 1,
    marginBottom: 20,
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 13,
  },

  title: {
    fontSize: 19,
    fontWeight: '700',
    color: 'rgba(0,0,0,0.85)',
    marginBottom: 10,
  },

  date: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.6)',
    marginTop: 5,
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.8)',
    fontWeight: '500',
  },
});

export default Events;
