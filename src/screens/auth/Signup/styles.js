import {StyleSheet} from 'react-native';
import colors from '../../../constants/colors';

const styles = StyleSheet.create({
  container: {flex: 1, marginHorizontal: 24},
  footerText: {
    color: colors.grey,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
  footerLink: {
    color: colors.purple,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 16,
    marginTop: 8,
  },
  agreeText: {
    color: colors.grey,
    fontSize: 12,
    marginLeft: 8,
  },
  link: {
    textDecorationLine: 'underline',
  },
});

export default styles;
