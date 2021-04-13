import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, StyleSheet, Image} from 'react-native';
import {
  ActionSheet,
  Card,
  CardItem,
  Left,
  Body,
  Text,
  Button,
  Right,
  Icon,
} from 'native-base';
import Header from '../components/Header';
import MainItem from '../components/MainItem';
import {getValuesFromObj, showAlert} from '../helpers/algorithms';

const PokemonDetail = props => {
  const {route, navigation} = props;
  const {params} = route;
  const {url, name} = params;
  const [state, setState] = useState({
    currentPokemon: null,
    isLoading: false,
  });
  const {currentPokemon} = state;

  useEffect(
    () => searchCurrentPokemon(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const searchCurrentPokemon = () => {
    const loading = {isLoading: true};
    setState({...state, ...loading, currentPokemon: {name}});
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const {sprites} = response;
        return getValuesFromObj(sprites);
      })
      .then(images => {
        setState({
          ...state,
          isLoading: false,
          currentPokemon: {name, images},
        });
      })
      .catch(error => {
        setState({...state, isLoading: false});
        showAlert(
          `No se encontró información sobre el pokémon. \n ${error.message}`,
        );
      });
  };

  const showOptions = () => {
    const buttons = ['Option 0', 'Option 1', 'Option 2', 'Delete', 'Cancel'];
    ActionSheet.show(
      {
        options: buttons,
        cancelButtonIndex: 4,
        destructiveButtonIndex: 3,
        title: 'Mi menu',
      },
      buttonIndex => {},
    );
  };

  const renderItem = ({item, index}) => {
    const {url: image, name: title} = item;
    // return <MainItem image={image} title={title} onPress={showOptions} />;
    return (
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text>NativeBase</Text>
              <Text note>GeekyAnts</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem
          cardBody
          style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={styles.iconImageSl}
            source={{uri: image}}
            resizeMode="contain"
          />
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent>
              <Icon active name="thumbs-up" />
              <Text>12 Likes</Text>
            </Button>
          </Left>
          <Body>
            <Button transparent>
              <Icon active name="chatbubbles" />
              <Text>4 Comments</Text>
            </Button>
          </Body>
          <Right>
            <Text>11h ago</Text>
          </Right>
        </CardItem>
      </Card>
    );
  };

  console.log(url);

  return (
    <SafeAreaView>
      <Header
        title={`Información sobre: ${name}`}
        onPress={() => navigation.goBack()}
      />
      <FlatList
        contentContainerStyle={styles.detailFlatListCtnSl}
        data={currentPokemon?.images}
        renderItem={renderItem}
        keyExtractor={item => item.url}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  detailFlatListCtnSl: {paddingBottom: 50},
  iconImageSl: {
    height: 80,
    width: 80,
    marginRight: 20,
  },
});

export default PokemonDetail;
