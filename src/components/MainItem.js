import React from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const MainItem = props => {
  const {title, image, onPress} = props;
  return (
    <TouchableOpacity style={styles.itemCtnSl} onPress={onPress}>
      <Image
        style={styles.iconImageSl}
        source={image ? {uri: image} : require('../assets/pokemon_default.png')}
        resizeMode="contain"
      />
      <Text style={{textTransform: 'capitalize'}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = new StyleSheet.create({
  itemCtnSl: {
    flexDirection: 'row',
    maxWidth: '95%',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 3,
  },
  iconImageSl: {
    height: 50,
    width: 50,
    marginRight: 20,
  },
});

export default MainItem;
