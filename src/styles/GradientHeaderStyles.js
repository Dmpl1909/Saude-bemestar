import { StyleSheet, Platform } from 'react-native';
import { colors, gradients, radius, spacing, fonts, shadow } from '../theme';

const styles = StyleSheet.create({
  container: {
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
    paddingTop: Platform.select({ ios: 58, android: 24 }),
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    ...shadow.soft,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
  },
  titleBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontFamily: fonts.bold,
    letterSpacing: 0.3,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    marginTop: 4,
    fontSize: 12,
    fontFamily: fonts.regular,
  },
});

export default styles;
