import React, {useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

const Input = props => {
  const {showIcon, validation, errorMessage, onChangeText, label} = props;
  const [visible, setVisible] = useState(true);
  const [error, setError] = useState(false);

  const handleIconPressed = () => {
    setVisible(!visible);
  };

  const handleOnchangeText = text => {
    validation && setError(!new RegExp(validation).exec(text));
  };

  return (
    <View>
      <Text style={styles.labelSl}>{label}</Text>
      <View style={[styles.containerSl, error && {borderColor: 'red'}]}>
        <TextInput
          style={styles.inputSl}
          secureTextEntry={!visible}
          {...props}
          onChangeText={text => {
            onChangeText && onChangeText(text);
            handleOnchangeText(text);
          }}
        />
        {props.showIcon && (
          <TouchableOpacity onPress={handleIconPressed}>
            <Image
              style={styles.iconSl}
              source={
                visible
                  ? require('../assets/view.png')
                  : require('../assets/invisible.png')
              }
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.textSl}>{errorMessage}</Text>}
    </View>
  );
};

const styles = new StyleSheet.create({
  containerSl: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputSl: {
    width: '90%',
    height: 45,
    paddingHorizontal: 5,
  },
  iconSl: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  textSl: {
    color: 'red',
  },
  labelSl: {
    color: '#ccc',
  },
});
export default Input;
