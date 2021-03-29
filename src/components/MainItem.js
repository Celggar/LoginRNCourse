import React from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

const MainItem = props => {
  const {title, image, onPress} = props;
  return (
    <TouchableOpacity style={styles.itemCtnSl} onPress={onPress}>
      {image && (
        <Image
          style={styles.iconImageSl}
          source={{uri: image}}
          resizeMode="contain"
        />
      )}
      <Text style={{textTransform: 'capitalize'}}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = new StyleSheet.create({
  itemCtnSl: {
    flexDirection: 'row',
    minHeight: 45,
    maxWidth: '95%',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 10,
    borderColor: '#ccc',
    borderWidth: 3,
  },
  iconImageSl: {
    height: 80,
    width: 80,
    marginRight: 20,
  },
});

export default MainItem;
