import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';
import Header from '../../../components/Header';
import PlusIcon from '../../../components/PlusIcon';
import Title from '../../../components/Title';
import Checkbox from '../../../components/Checkbox';
import Categories from '../../../components/Categories';
import categories from '../../../constants/categories';
import {setToUpdate} from '../../../store/tasks';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.data);
  const [category, setCategory] = useState('all');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    if (category && category != 'all') {
      const filtered = tasks?.filter(task => task?.category === category);
      setFilteredTasks(filtered);
    } else {
      setFilteredTasks(tasks);
    }
  }, [category, tasks]);

  const onTaskUpdate = item => {
    firestore()
      .collection('Tasks')
      .doc(item?.uid)
      .update({
        checked: !item.checked,
      })
      .then(() => {
        dispatch(setToUpdate());
      });
  };

  const renderTask = ({item}) => {
    return (
      <View style={styles.row}>
        <Checkbox checked={item.checked} onPress={() => onTaskUpdate(item)} />
        <Text style={[styles.taskText, item?.checked ? styles.checked : {}]}>
          {item.title}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Tasks" />

      <FlatList
        ListHeaderComponent={
          <>
            <Title type="thin">To do Tasks</Title>
            <View style={styles.break}></View>
            <Categories
              categories={[{label: 'All', value: 'all'}, ...categories]}
              selectedCategory={category}
              onCategoryPress={setCategory}
            />
          </>
        }
        data={filteredTasks}
        renderItem={renderTask}
        keyExtractor={item => String(item?.uid)}
      />

      <PlusIcon />
    </SafeAreaView>
  );
};

export default React.memo(Tasks);
