import React, {useState} from 'react';
import {Alert, SafeAreaView, Text} from 'react-native';
import Button from '../../../components/Button';
import styles from './styles';
import Title from '../../../components/Title';
import Input from '../../../components/Input';
import auth from '@react-native-firebase/auth';

const Signin = ({navigation}) => {
  const [values, setValues] = useState();

  const onChange = (value, key) => {
    setValues(vals => ({
      ...vals,
      [key]: value,
    }));
  };

  const onSubmit = () => {
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        console.log('User signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/wrong-password') {
          Alert.alert('That password is incorrect.');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid.');
        } else {
          Alert.alert(error.message);
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title>Welcome back!</Title>
      <Input
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={val => onChange(val, 'email')}
      />
      <Input
        onChangeText={val => onChange(val, 'password')}
        placeholder="Password"
        secureTextEntry
      />
      <Button onPress={onSubmit}>Login</Button>
      <Text style={styles.footerText}>
        Not Registered?{' '}
        <Text
          onPress={() => navigation.navigate('Signup')}
          style={styles.footerLink}>
          Sign up!
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default React.memo(Signin);
