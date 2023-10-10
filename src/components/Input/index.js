import React from 'react';
import {Text, TextInput} from 'react-native';
import styles from './styles';
import colors from '../../constants/colors';

const Input = ({outlined, ...props}) => {
  return (
    <TextInput
      placeholderTextColor={colors.midGrey}
      style={[styles.input, outlined ? styles.outlined : {}]}
      {...props}></TextInput>
  );
};

export default React.memo(Input);
