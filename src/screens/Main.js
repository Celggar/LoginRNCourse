import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  View,
  Button,
  Text,
  RefreshControl,
  Modal,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import Header from '../components/Header';
import MainItem from '../components/MainItem';
import Input from '../components/Input';
import {API} from '../helpers/constants';
import {getValuesFromObj, showAlert} from '../helpers/algorithms';

const Main = () => {
  const [state, setState] = useState({
    data: [],
    dataFiltered: null,
    currentPokemon: null,
    isPaging: false,
    isLoading: false,
    nextUrl: API.BASE_POKEMON_URL,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data,
    dataFiltered,
    isLoading,
    isPaging,
    nextUrl,
    currentPokemon,
  } = state;

  useEffect(() => {
    searchPokemon(nextUrl, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchPokemon = (url, isMainLoading) => {
    const loading = {isLoading: isMainLoading, isPaging: !isMainLoading};
    setState({...state, ...loading});
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

  const searchCurrentPokemon = (url, name) => {
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
    const {url, name} = item;

    return (
      <View>
        <MainItem
          title={`${index + 1}. ${name}`}
          onPress={() => {
            setIsModalVisible(true);
            searchCurrentPokemon(url, name);
          }}
        />
      </View>
    );
  };

  const renderModalItem = ({item, index}) => {
    const {url, name} = item;
    return <MainItem image={url} title={name} />;
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
    <>
      <SafeAreaView>
        <Header title="Pantalla Principal" />

        {/* {data.map((item, index) => {
        return <Text>{`${index + 1}: ${item.title}`}</Text>;
      })} */}

        <FlatList
          data={dataFiltered ? dataFiltered : data}
          style={styles.mainFlatListSl}
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
      <Modal
        style={styles.modalSl}
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalBtnCtnSl}>
                <Button
                  title="Cerrar"
                  onPress={() => setIsModalVisible(false)}
                />
              </View>
              <Text style={styles.modalText}>{currentPokemon?.name}</Text>
              {isLoading && <ActivityIndicator size="large" color="#ccc" />}
              <FlatList
                data={currentPokemon?.images}
                renderItem={renderModalItem}
                keyExtractor={item => item.url}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

const styles = new StyleSheet.create({
  mainImageSl: {
    height: 200,
    width: '100%',
  },
  centeredView: {
    backgroundColor: '#00000050',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSl: {backgroundColor: '#000'},
  modalView: {
    width: '90%',
    height: '90%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 30,
    textTransform: 'capitalize',
  },
  mainFlatListSl: {height: '93%'},
  mainFlatListContentSl: {flexGrow: 1},
  mainFlatListFooterSl: {flex: 1, justifyContent: 'flex-end'},
  modalBtnCtnSl: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
});

export default Main;
