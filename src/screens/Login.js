import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  View,
  Button,
} from 'react-native';
import Input from '../components/Input';

const Login = () => {
  const [state, setstate] = useState({
    user: '',
    pass: '',
  });
  const handleButtonPressed = params => {
    alert(`El usuario es: ${state.user}\n\n y el Password es: ${state.pass}`);
  };
  const handleOnChangeText = (name, text) => {
    setstate({...state, [name]: text});
  };

  return (
    <SafeAreaView>
      <View style={styles.titleSl}>
        <Text>LOGIN SCREEN</Text>
      </View>
      <Image
        style={styles.imageSl}
        source={require('../assets/undraw_secure_login_pdn4.png')}
      />
      <View style={{marginHorizontal: 20}}>
        <Input onChangeText={text => handleOnChangeText('user', text)} />
      </View>

      <View style={{marginHorizontal: 20, marginTop: 10}}>
        <Input
          validation={'^.{5,}$'}
          password
          onChangeText={text => handleOnChangeText('pass', text)}
        />
      </View>

      <View style={styles.btnCtnSl}>
        <Button title="Continuar" onPress={handleButtonPressed} />
      </View>
    </SafeAreaView>
  );
};

const styles = new StyleSheet.create({
  containerSl: {},
  titleSl: {
    height: 45,
    backgroundColor: '#CCCCCC20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSl: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  imageSl: {
    width: '100%',
    height: 200,
    marginTop: 50,
    resizeMode: 'contain',
  },
  btnCtnSl: {
    marginTop: 50,
  },
});

export default Login;
