import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  View,
  Button,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import MainItem from '../components/MainItem';
import Input from '../components/Input';
import {API} from '../helpers/constants';
import {showAlert} from '../helpers/algorithms';
import {setProfile} from '../redux/auth/auth.actions';

const Main = props => {
  const {navigation} = props;
  const [state, setState] = useState({
    data: [],
    dataFiltered: null,
    currentPokemon: null,
    isPaging: false,
    isLoading: false,
    nextUrl: API.BASE_POKEMON_URL,
  });

  const {data, dataFiltered, isLoading, isPaging, nextUrl} = state;

  const dispatch = useDispatch();

  useEffect(() => {
    searchPokemon(nextUrl, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchPokemon = (url, isMainLoading) => {
    const loading = {isLoading: isMainLoading, isPaging: !isMainLoading};
    setState({...state, ...loading});
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(response => {
        const {results, next} = response;
        setState({
          ...state,
          isLoading: false,
          isPaging: false,
          data: isMainLoading ? results : [...state.data, ...results],
          nextUrl: next,
        });
      })
      .catch(error => {
        setState({...state, isLoading: false, isPaging: false});
        state.data.length === 0 &&
          showAlert(`No se encontraron pokémon. \n ${error.message}`);
      });
  };

  const renderItem = ({item, index}) => {
    const {name} = item;

    return (
      <View>
        <MainItem
          title={`${index + 1}. ${name}`}
          onPress={() => {
            // setIsModalVisible(true);
            navigation.navigate('Detail', item);
            // searchCurrentPokemon(url, name);
          }}
        />
      </View>
    );
  };

  const renderFooter = () => {
    return (
      nextUrl != null &&
      isPaging &&
      !dataFiltered && <ActivityIndicator size="large" color="grey" />
    );
  };

  const onLocalSearch = text => {
    const newData = text
      ? data.filter(item => item.name.includes(text.toLowerCase()))
      : null;
    setState({...state, dataFiltered: newData});
  };

  return (
    <SafeAreaView>
      <Header title="Pantalla Principal" />
      {/* {data.map((item, index) => {
        return <Text>{`${index + 1}: ${item.title}`}</Text>;
      })} */}
      <FlatList
        data={dataFiltered ? dataFiltered : data}
        contentContainerStyle={styles.mainFlatListContentSl}
        ListFooterComponentStyle={styles.mainFlatListFooterSl}
        renderItem={renderItem}
        keyExtractor={item => item.name}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => searchPokemon(API.BASE_POKEMON_URL, true)}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => !dataFiltered && searchPokemon(nextUrl)}
        ListHeaderComponent={
          <View>
            <Input
              autoCorrect={false}
              onChangeText={onLocalSearch}
              placeholder="Buscar pokémon en el listado..."
            />
            {!dataFiltered && (
              <>
                <Image
                  style={styles.mainImageSl}
                  source={require('../assets/main.png')}
                  resizeMode="contain"
                />
                <Header />
              </>
            )}

            <Button
              title="Cerrar sesión"
              onPress={() => dispatch(setProfile(null, false))}
            />
          </View>
        }
        ListEmptyComponent={
          <Image
            style={styles.mainImageSl}
            source={require('../assets/default_empty.png')}
            resizeMode="contain"
          />
        }
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  mainImageSl: {
    height: 200,
    width: '100%',
  },
  mainFlatListContentSl: {flexGrow: 1, paddingBottom: 50},
  mainFlatListFooterSl: {flex: 1, justifyContent: 'flex-end'},
});

export default Main;
