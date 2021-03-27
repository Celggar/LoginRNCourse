import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const Input = props => {
  const {validation, password, onChangeText} = props;
  const [error, setError] = useState(false);
  const [secureEntry, setSecureEntry] = useState(password ? true : false);
  const handleOnChangeText = text => {
    password && validation && setError(!text.match(validation));
  };

  return (
    <View style={[styles.containerSl, {borderColor: error ? 'red' : '#ccc'}]}>
      <TextInput
        style={styles.inputSl}
        secureTextEntry={secureEntry}
        placeholder="Introduzca su contraseña"
        {...props}
        onChangeText={text => {
          onChangeText && onChangeText(text);
          handleOnChangeText(text);
        }}
      />
      {password && (
        <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
          <Image
            style={styles.iconSl}
            source={
              secureEntry
                ? require('../assets/invisible.png')
                : require('../assets/view.png')
            }
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = new StyleSheet.create({
  containerSl: {
    width: '100%',
    flexDirection: 'row',
    borderWidth: 0.5,
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
    borderColor: '#ccc',
  },
  inputSl: {
    width: '95%',
    height: 30,
  },
  iconSl: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default Input;
