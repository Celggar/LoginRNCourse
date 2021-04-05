import React, {memo} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const Header = props => {
  const {title, onPress} = props;
  return (
    <View style={styles.headerCtnSl}>
      {onPress && (
        <TouchableOpacity onPress={onPress}>
          <Image
            style={styles.iconImageSl}
            source={require('../assets/back_arrow.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <Text style={styles.titleSl}>{title}</Text>
    </View>
  );
};

const styles = new StyleSheet.create({
  headerCtnSl: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#cccccc50',
    height: 50,
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  iconImageSl: {
    width: 20,
    height: 20,
  },
  titleSl: {marginLeft: 50},
});
export default memo(Header);
