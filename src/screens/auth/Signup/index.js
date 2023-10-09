import React, {useState} from 'react';
import {Image, Linking, SafeAreaView, Text, View} from 'react-native';
import Button from '../../../components/Button';
import styles from './styles';
import Input from '../../../components/Input';
import Title from '../../../components/Title';
import Checkbox from '../../../components/Checkbox';
import {
  PRIVACY_POLICY_LINK,
  TERMS_CONDITIONS_LINK,
} from '../../../constants/links';

const Signup = ({navigation}) => {
  const [agreed, setAgreed] = useState(false);

  const onCheckboxPress = () => {
    setAgreed(value => !value);
  };

  const onLinkPress = url => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title>Join Taskly today</Title>
      <Input placeholder="First Name" />
      <Input placeholder="Last Name" />
      <Input placeholder="Email" keyboardType="email-address" />
      <Input placeholder="Password" secureTextEntry />
      <Input placeholder="Confirm Password" secureTextEntry />
      <View style={styles.row}>
        <Checkbox checked={agreed} onPress={onCheckboxPress} />
        <Text style={styles.agreeText}>
          I agree to the{' '}
          <Text
            onPress={() => onLinkPress(TERMS_CONDITIONS_LINK)}
            style={styles.link}>
            Terms and Conditions
          </Text>{' '}
          and{' '}
          <Text
            onPress={() => onLinkPress(PRIVACY_POLICY_LINK)}
            style={styles.link}>
            Privacy Policy
          </Text>
        </Text>
      </View>
      <Button type={'blue'}>Create new account</Button>
      <Text style={styles.footerText}>
        Already a member?{' '}
        <Text
          onPress={() => navigation.navigate('Signin')}
          style={styles.footerLink}>
          Sign in!
        </Text>
      </Text>
    </SafeAreaView>
  );
};

export default React.memo(Signup);
