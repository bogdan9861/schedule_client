import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const NoContent = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.image_wrapper}>
        <Image
          style={styles.image}
          src="https://img.icons8.com/?size=100&id=61239&format=png&color=000000"
        />
      </View>
      <Text style={styles.text}>Данные не найдены</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    marginTop: 80,
  },

  image_wrapper: {
    backgroundColor: 'rgba(75, 0, 250, 0.24)',
    borderRadius: 100,
    width: 100,
    height: 100,
    padding: 10,

    alignItems: 'center',
    justifyContent: 'center',

    borderColor: 'rgba(75, 0, 250, 0.42)',
    borderWidth: 1,

    marginHorizontal: 'auto',

    marginBottom: 13,
  },

  image: {
    width: 70,
    height: 70,
  },

  text: {
    fontSize: 19,
  },
});

export default NoContent;
