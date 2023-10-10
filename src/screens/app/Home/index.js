import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../../components/Header';
import PlusIcon from '../../../components/PlusIcon';
import Title from '../../../components/Title';
import {setTasks} from '../../../store/tasks';
import styles from './styles';
import moment from 'moment';
import StatusCard from '../../../components/StatusCard';

const Home = ({navigation}) => {
  const [counts, setCounts] = useState({});
  const tasks = useSelector(state => state.tasks.data);
  const user = useSelector(state => state.user.data);
  const toUpdate = useSelector(state => state.tasks.toUpdate);
  const dispatch = useDispatch();

  useEffect(() => {
    firestore()
      .collection('Tasks')
      .where('userId', '==', user?.uid)
      .get()
      .then(querySnapshot => {
        const tasksList = [];

        querySnapshot.forEach(documentSnapshot => {
          tasksList.push({
            uid: documentSnapshot.id,
            ...(documentSnapshot.data() || {}),
          });
        });

        dispatch(setTasks(tasksList));
      });
  }, [user, toUpdate, dispatch]);

  useEffect(() => {
    if (tasks?.length) {
      const highPriority = tasks?.filter(
        task =>
          (task?.category === 'urgent' && task?.checked === false) ||
          (task?.category === 'important' && task?.checked === false),
      );
      const today = moment(new Date()).format('YYYY-MM-DD');
      const overdue = tasks?.filter(task => {
        const deadline = task?.deadline?.seconds * 1000;
        const deadlineFormatted = moment(deadline).format('YYYY-MM-DD');
        return (moment(deadlineFormatted).isBefore(today) && task?.checked === false);
      });
      const quickWin = tasks?.filter(
        task => (task?.category === 'quick_task' && task?.checked === false),
      );

      setCounts({
        highPriority: highPriority?.length,
        overdue: overdue?.length,
        quickWin: quickWin?.length,
      });
    }
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Home" />

      <ScrollView>
        <Title type="thin">Tasks Overview:</Title>
        <View style={styles.row}>
          <StatusCard label="High Priority" count={counts?.highPriority} />
          <StatusCard type="error" label="Past Due" count={counts?.overdue} />
          <StatusCard label="Quick Wins" count={counts?.quickWin} />
        </View>

        <View style={styles.wrapper}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => navigation.navigate('Tasks')}>
            <View style={styles.boxRow}>
              <Text style={styles.title}>Check all my tasks</Text>
              <Image
                style={styles.icon}
                source={require('../../../assets/rightArrow.png')}
              />
            </View>
            <Text style={styles.subtitle}>
              See all tasks and filter them by categories you have selected when
              creating them
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <PlusIcon />
    </SafeAreaView>
  );
};

export default React.memo(Home);
