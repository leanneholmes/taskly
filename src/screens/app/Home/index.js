import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../components/Header';
import PlusIcon from '../../../components/PlusIcon';
import Title from '../../../components/Title';
import styles from './styles';
import moment from 'moment';

const Home = ({navigation}) => {
  const user = useSelector(state => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Tasks')
      .get()
      .then(querySnapshot => {
        console.log('Total tasks ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'Task ID: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
        });
      });
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />

      <ScrollView>
        <Title type="thin">Daily Tasks:</Title>
      </ScrollView>

      <PlusIcon />
    </SafeAreaView>
  );
};

export default React.memo(Home);
