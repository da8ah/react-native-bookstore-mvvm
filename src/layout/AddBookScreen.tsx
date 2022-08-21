import { SafeAreaView, Text, View } from 'react-native';
import { AddBookScreenProps } from './ScreenTypes';

const AddBookScreen = ({ navigation }: AddBookScreenProps) => (
    <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ width: '50%' }}>New</Text>
        </View>
    </SafeAreaView>
);

export default AddBookScreen;