import React, {useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Title from '../../../components/Title';
import styles from './styles';
import Input from '../../../components/Input';
import Categories from '../../../components/Categories';
import categories from '../../../constants/categories';
import DateInput from '../../../components/DateInput';
import Button from '../../../components/Button';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

const AddTask = ({navigation}) => {
  const [title, setTitle] = useState();
  const [category, setCategory] = useState();
  const [deadline, setDeadline] = useState(new Date());
  const [loading, setLoading] = useState(false);

  const handleBack = () => {
    navigation.goBack();
  };

  const clearForm = () => {
    setTitle('');
    setCategory(null);
    setDeadline(new Date());
  };

  const onSubmit = () => {
    const today = moment(new Date()).format('YYYY-MM-DD');
    const deadlineFormatted = moment(deadline).format('YYYY-MM-DD');
    if (!title) {
      Alert.alert('Please enter a name for the task');
      return;
    }
    if (moment(deadlineFormatted).isBefore(today)) {
      Alert.alert('Due date cannot be in the past');
      return;
    }

    setLoading(true);
    firestore()
      .collection('Tasks')
      .doc('ABC')
      .set({
        title,
        deadline,
        category,
      })
      .then(() => {
        setLoading(false);
        clearForm();
        navigation.navigate('Tasks');
      })
      .catch(e => {
        console.log('Error trying to add task: ', e);
        Alert.alert(e.message);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backContainer} hitSlop={8} onPress={handleBack}>
        <Image
          style={styles.backIcon}
          source={require('../../../assets/back.png')}
        />
      </Pressable>
      <ScrollView>
        <Title type="thin">Add New Task</Title>
        <Text style={styles.label}>Enter a task name</Text>
        <Input
          outlined
          value={title}
          onChangeText={setTitle}
          placeholder="Type here..."
        />

        <Text style={styles.label}>Set priority</Text>
        <Categories
          categories={categories}
          selectedCategory={category}
          onCategoryPress={setCategory}
        />

        <Text style={styles.label}>Due by</Text>
        <DateInput value={deadline} onChange={setDeadline} />

        {loading ? (
          <ActivityIndicator style={{marginTop: 5}} />
        ) : (
          <Button style={styles.button} type="blue" onPress={onSubmit}>
            Add Task
          </Button>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(AddTask);
