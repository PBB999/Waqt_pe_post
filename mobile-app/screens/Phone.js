import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import * as Contacts from 'expo-contacts';
import { ScrollView } from 'react-native-gesture-handler';
import ContactList from '../components/ContactList';
import { Loader, LoaderPinwheel, LoaderPinwheelIcon } from 'lucide-react-native';

export default function App() {

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { status } = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const { data } = await Contacts.getContactsAsync({
                    fields: [Contacts.Fields.PhoneNumbers],
                });
                if (data.length > 0) {
                    setContacts(data.map(contact => {
                        return {
                            name: contact.name,
                            phoneNumbers: contact.phoneNumbers,
                        };
                    }));
                }
                setLoading(false);
            }
        })();
    }, []);

    return (
        <ScrollView>
            {loading ? <Text><LoaderPinwheelIcon/></Text> : <ContactList contacts={contacts} />}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
