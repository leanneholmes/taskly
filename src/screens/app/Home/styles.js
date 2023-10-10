import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {flex: 1},
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 12,
  },
  wrapper: {
    width: '95%',
  },
  box: {
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
    padding: 22,
    marginHorizontal: 24,
    marginVertical: 72,
  },
  title: {
    color: colors.purple,
    fontSize: 16,
  },
  subtitle: {
    color: 'rgba(64,53,114,0.5)',
    fontSize: 12,
    marginTop: 8,
  },
  boxRow: {
    flexDirection: 'row',
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 10,
    marginTop: -1,
  },
});

export default styles;
