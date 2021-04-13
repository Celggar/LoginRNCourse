import React, {memo, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  Header as HeaderBase,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
} from 'native-base';

const Header = props => {
  const {title, onPress} = props;
  const [state, setState] = useState({
    backgroundColor: 'blue',
    tituloInterno: 'Titulo de la función',
  });

  useEffect(() => {
    console.log('TTTT -> SE CARGO EL COMPONENTE');
  }, []);

  return (
    <HeaderBase>
      <Left>
        {onPress && (
          <Button transparent onPress={onPress}>
            <Icon name="arrow-back" />
          </Button>
        )}
      </Left>
      <Body>
        <Title>Header</Title>
      </Body>
      <Right>
        <Button transparent>{/* <Icon name="menu" /> */}</Button>
      </Right>
    </HeaderBase>
  );
};

/* class Header extends React.Component {
  state = {
    backgroundColor: 'blue',
    tituloInterno: 'Hola',
  };
  componentDidMount() {
    console.log('SE CARGO EL COMPONENTE');
  }
  render() {
    return (
      <View
        style={[
          styles.headerCtnSl,
          {backgroundColor: this.state.backgroundColor},
        ]}>
        <TouchableOpacity
          onPress={() => {
            this.setState({backgroundColor: 'yellow'});
          }}>
          <Image
            style={styles.iconImageSl}
            source={require('../assets/back_arrow.png')}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.titleSl}>{this.state.tituloInterno}</Text>
      </View>
    );
  }
} */

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
