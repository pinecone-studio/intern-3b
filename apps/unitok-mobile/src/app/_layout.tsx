import '../../global.css';
import { Stack } from 'expo-router';
// import { ClerkProvider } from '@clerk/clerk-expo';

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
