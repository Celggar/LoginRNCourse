import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
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

  const renderItem = ({item, index}) => {
    const {url: image, name: title} = item;
    return <MainItem image={image} title={title} />;
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
});

export default PokemonDetail;
