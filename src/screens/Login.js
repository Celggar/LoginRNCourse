import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet, Image, Button} from 'react-native';
import Header from '../../src/components/Header';
import Input from '../components/Input';

const Login = () => {
  /* const [user, setUser] = useState('');
  const [pass, setPass] = useState(''); */
  const [state, setState] = useState({
    user: '',
    pass: '',
  });

  return (
    <SafeAreaView>
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
            alert(`user: ${user}, pass: ${pass}`);
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
