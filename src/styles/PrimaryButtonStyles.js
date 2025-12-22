import { StyleSheet } from 'react-native';
import { radius, spacing, fonts, shadow } from '../theme';

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: fonts.semibold,
    letterSpacing: 0.3,
  },
});

export default styles;
