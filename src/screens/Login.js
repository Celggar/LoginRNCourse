import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import Header from '../../src/components/Header';
import Input from '../components/Input';
import {showAlert} from '../helpers/algorithms';
import {setProfile} from '../redux/auth/auth.actions';

const Login = props => {
  const {navigation} = props;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    user: '',
    pass: '',
  });

  const setLogged = () => {
    dispatch(setProfile(null, true));
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: '100%'}}>
      <Header title="Pantalla principal" />
      <Image
        style={styles.imageSl}
        source={require('../assets/auth.png')}
        resizeMode="contain"
      />
      <View style={styles.inputCtnSl}>
        <Input
          validation="^.{3,}$"
          label="Usuario"
          errorMessage="El usuario debe tener más de 2 caracteres"
          onChangeText={text => setState({...state, user: text})}
        />
      </View>
      <View style={styles.inputCtnSl}>
        <Input
          showIcon
          label="Contraseña"
          validation="^.{5,}$"
          errorMessage="La contraseña debe tener más de 4 caracteres"
          onChangeText={text => setState({...state, pass: text})}
        />
      </View>
      <View style={styles.inputCtnSl}>
        <Button
          title="Continuar"
          onPress={() => {
            const {user, pass} = state;
            if (user.toLocaleLowerCase() === 'test' && pass === '12345') {
              // navigation.navigate('PantallaPrincipal');
              setLogged();
            } else {
              showAlert('El usuario y la contraseña no son válidos');
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  imageSl: {
    width: '100%',
    height: 290,
  },
  inputCtnSl: {marginTop: 25, marginHorizontal: 20},
});

export default Login;
