import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.blue,
    width: 56,
    height: 56,
    position: 'absolute',
    bottom: 24,
    right: 24,
  },
  plus: {
    fontSize: 28,
    color: colors.white,
    fontWeight: '600',
  },
});

export default styles;
