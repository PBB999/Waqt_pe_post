import React, { useState, useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { updateCreatingParcel } from '../redux/parcel/parcelSlice';
const PackageScreen = () => {
  const navigation = useNavigation();
  const [selectedPackage, setSelectedPackage] = useState('');
  const [customPackage, setCustomPackage] = useState('');
  const [showSizes, setShowSizes] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [showDimensions, setShowDimensions] = useState(false);
  const [length, setLength] = useState('');
  const [breadth, setBreadth] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedContent, setSelectedContent] = useState('');
  const [customContent, setCustomContent] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);
  const packageOptions = [
    { label: 'Envelope / Pouch', value: 'envelope', icon: require('../assets/envelope.jpg') },
    { label: 'Box / Carton', value: 'box', icon: require('../assets/box.jpg') },
    { label: 'Suitcase / Luggage', value: 'suitcase', icon: require('../assets/suitcase.jpg') },
    { label: 'Backpack / Hand Bag', value: 'backpack', icon: require('../assets/backpack.jpg') },
    { label: 'Others', value: 'others', icon: require('../assets/other.jpg') },
  ];

  const sizeOptions = [
    { label: 'XS (up to 0.5 Kg)', value: 'xs' },
    { label: 'S (0.5 - 2 Kg)', value: 's' },
    { label: 'M (2 - 5 Kg)', value: 'm' },
    { label: 'L (5+ Kg)', value: 'l' },
  ];

  const contentOptions = [
    { label: 'Electronics', value: 'electronics', icon: require('../assets/electronics.jpg') },
    { label: 'Clothes', value: 'clothes', icon: require('../assets/clothes.jpg') },
    { label: 'Books/Documents', value: 'documents', icon: require('../assets/documents.jpg') },
    { label: 'Kitchenware', value: 'kitchenware', icon: require('../assets/kitchenware.jpg') },
    { label: 'Sports', value: 'Sports', icon: require('../assets/Sports.jpg') },
    { label: 'Other', value: 'other', icon: require('../assets/others.jpg') },
  ];

  const handlePackageSelect = (value) => {
    setSelectedPackage(value);

    if (value === 'others') {
      setShowSizes(true);
      setShowDimensions(true);
    } else {
      setShowSizes(true);
      setShowDimensions(false);
    }

    setCustomPackage('');
    setSelectedSize('');
    setLength('');
    setBreadth('');
    setHeight('');
    setWeight('');
  };
  const handleSizeSelect = (value) => {
    setSelectedSize(value);
    setShowDimensions(true);
  };



  const handleNext = () => {
    dispatch(updateCreatingParcel({
      packageDetails: {
        selectedPackage,
        customPackage,
        selectedSize,
        dimensions: {
          length,
          breadth,
          height,
        },
        weight,
        selectedContent,
        customContent,
      },
    }));

    navigation.navigate('ScheduleScreen');
  };


  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <View style={styles.activeStepCircle} />
            <Text style={styles.inactiveStepText}>ADDRESS</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressItem}>
            <View style={styles.activeStepCircle} />
            <Text style={styles.activeStepText}>PACKAGE</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressItem}>
            <View style={styles.inactiveStepCircle} />
            <Text style={styles.inactiveStepText}>SCHEDULE</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressItem}>
            <View style={styles.inactiveStepCircle} />
            <Text style={styles.inactiveStepText}>SUMMARY</Text>
          </View>
        </View>
        <Text style={styles.title}>Choose Your Package</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.packageScroll}
        >
          {packageOptions.map((option) => (
            <View key={option.value}>
              <TouchableOpacity
                style={[
                  styles.packageOption,
                  selectedPackage === option.value && styles.selectedOption,
                ]}
                onPress={() => handlePackageSelect(option.value)}
              >
                <Image source={option.icon} style={styles.icon} />
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {selectedPackage === 'others' && (
          <TextInput
            style={styles.input}
            placeholder="ex: Kitchen Equipment"
            value={customPackage}
            onChangeText={setCustomPackage}
          />
        )}
        {showSizes && (
          <View style={styles.sizeOptions}>
            <Text style={styles.sizeTitle}>Choose Package Size:</Text>
            <View style={styles.sizeGrid}>
              {sizeOptions.map((size) => (
                <TouchableOpacity
                  key={size.value}
                  style={[
                    styles.sizeOption,
                    selectedSize === size.value && styles.selectedSize,
                  ]}
                  onPress={() => handleSizeSelect(size.value)}
                >
                  <Text style={styles.sizeText}>{size.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
        {showDimensions && (
          <View>
            <View style={styles.dimensionInputContainer}>
              <Text style={styles.dimensionTitle}>Enter Package Dimensions (cm):</Text>
              <View style={styles.dimensionInputRow}>
                <TextInput
                  style={styles.dimensionInput}
                  placeholder="Length (L)"
                  keyboardType="numeric"
                  value={length}
                  onChangeText={setLength}
                />
                <TextInput
                  style={styles.dimensionInput}
                  placeholder="Breadth (B)"
                  keyboardType="numeric"
                  value={breadth}
                  onChangeText={setBreadth}
                />
                <TextInput
                  style={styles.dimensionInput}
                  placeholder="Height (H)"
                  keyboardType="numeric"
                  value={height}
                  onChangeText={setHeight}
                />
              </View>
            </View>
            <View style={styles.weightInputContainer}>
              <Text style={styles.weightLabel}>Enter Package Weight (Kg):</Text>
              <TextInput
                style={styles.input}
                placeholder="Weight"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
              />
            </View>
          </View>
        )}
        <View style={styles.contentInputContainer}>
          <Text style={styles.contentLabel}>Select Package Content:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.contentScroll}
          >
            {contentOptions.map((content) => (
              <TouchableOpacity
                key={content.value}
                style={[
                  styles.contentOption,
                  selectedContent === content.value && styles.selectedContentOption,
                ]}
                onPress={() => setSelectedContent(content.value)}
              >
                <Image source={content.icon} style={styles.contentIcon} />
                <Text style={styles.contentText}>{content.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {selectedContent === 'other' && (
            <TextInput
              style={styles.contentSearchInput}
              placeholder="ex: Kitchen Equipment"
              value={customContent}
              onChangeText={setCustomContent}
            />
          )}
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressItem: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  progressLine: {
    width: 46,
    height: 2,
    backgroundColor: 'green',
  },
  completedStepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  completedStepText: {
    marginTop: 4,
    color: 'green',
    fontSize: 12,
  },
  activeStepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'green',
  },
  activeStepText: {
    marginTop: 4,
    color: 'blue',
    fontSize: 12,
  },
  inactiveStepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  inactiveStepText: {
    marginTop: 4,
    color: '#ccc',
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  packageScroll: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  packageOption: {
    width: 100,
    height: 100,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedOption: {
    backgroundColor: '#d0ebff',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  optionText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    marginBottom: 16,
    marginTop: 20,
  },
  sizeOptions: {
    marginBottom: 20,
  },
  sizeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sizeOption: {
    width: '48%',
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  selectedSize: {
    backgroundColor: '#d0ebff',
    borderWidth: 1,
    borderColor: '#007bff',
  },
  sizeText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  dimensionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  dimensionInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 16,
  },
  dimensionInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginHorizontal: 8,
    textAlign: 'center',
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    maxWidth: 100,
  },
  weightInputContainer: {
    marginBottom: 16,
  },
  weightLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentInputContainer: {
    marginBottom: 16,
  },
  contentLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentScroll: {
    flexDirection: 'row',
  },
  contentOption: {
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginRight: 12,
  },
  selectedContentOption: {
    backgroundColor: '#d0ebff',
    borderColor: '#007bff',
    borderWidth: 1,
  },
  contentText: {
    fontSize: 14,
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  contentIcon: {
    width: 40,
    height: 40,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  contentSearchInput: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    fontSize: 14,
    marginTop: 20,
    marginBottom: 16,
  },
});


export default PackageScreen;
