import {Image, View} from 'react-native';
import styles from './styles';

const Onboarding = () => {
  return (
    <View>
      <Image
        style={styles.image}
        source={require('../../../assets/onboarding.png')}
      />
    </View>
  );
};

export default React.memo(Onboarding);
