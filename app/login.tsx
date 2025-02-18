import { useAuth } from '@/context/authContext';
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function LoginScreen() {
    const { login } = useAuth();
    const router = useRouter();

    const handleLogin = () => {
        login();
        router.replace('/(tabs)'); // Navigate to the main screen after login
    };

    return (
        <ThemedView>
            <ThemedText>Login Screen</ThemedText>
            <Button title="Log In" onPress={handleLogin} />
        </ThemedView>
    );
}
