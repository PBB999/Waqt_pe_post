import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const FeedbackScreen = () => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [otherSuggestions, setOtherSuggestions] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const navigation = useNavigation();

  const tags = [
    'Overall Service',
    'Customer Support',
    'Pickup & Delivery Service',
    'Service & Efficiency',
    'Transparency',
  ];

  const handleTagPress = (tag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
    );
  };

  const handleSubmit = () => {
    if (selectedRating === 0) {
      setErrorModalVisible(true);
    } else {
      setSuccessModalVisible(true);
      navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate Your Experience</Text>

      <View style={styles.starContainer}>
        {Array.from({ length: 5 }, (_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedRating(index + 1)}
          >
            <Icon
              name="star"
              size={40}
              color={index < selectedRating ? '#FFD700' : '#BDBDBD'}
            />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subtitle}>Tell us what can be improved ?</Text>
      <View style={styles.tagContainer}>
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tag,
              selectedTags.includes(tag) ? styles.tagSelected : null,
            ]}
            onPress={() => handleTagPress(tag)}
          >
            <Text
              style={[
                styles.tagText,
                selectedTags.includes(tag) ? styles.tagTextSelected : null,
              ]}
            >
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Other suggestions..."
        value={otherSuggestions}
        onChangeText={setOtherSuggestions}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

      <Modal visible={errorModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="error" size={40} color="#FF5252" />
            <Text style={styles.modalText}>Please provide a rating before submitting.</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setErrorModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={successModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Icon name="check-circle" size={40} color="#4CAF50" />
            <Text style={styles.modalText}>Thanks for submitting your feedback!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  starContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20, },
  subtitle: { fontSize: 18, marginBottom: 10, fontWeight: 'bold' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    margin: 5,
    borderRadius: 20,
  },
  tagSelected: { backgroundColor: '#d9534f' },
  tagText: { fontSize: 14, color: '#757575' },
  tagTextSelected: { color: '#FFFFFF' },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
  },
  submitButton: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: { fontSize: 16, fontWeight: '500', marginVertical: 10 },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#d9534f',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: { color: '#FFFFFF', fontWeight: 'bold' },
});

export default FeedbackScreen;
