import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = props => {
  const {title} = props;
  return (
    <View style={styles.titleCtnSl}>
      <Text>{title}</Text>
    </View>
  );
};

const styles = new StyleSheet.create({
  titleCtnSl: {
    backgroundColor: '#cccccc50',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Header;
