import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  BackHandler,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { updateCreatingParcel } from "../redux/parcel/parcelSlice";
import axios from "axios";


const ScheduleScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const receiverId = useSelector((state) => state.parcel.creatingParcel.receiverId._id);
  const [suggestedTimeSlot, setSuggestedTimeSlot] = useState(null);

  const getData = async () => {
    try {
      console.log("api called")
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const response = await axios.get(`${apiUrl}/api/predict/user/${receiverId}`);
      console.log("Suggested Time Slot Response:", response.data);

      let startHour = response.data.hours.start;
      let endHour = response.data.hours.end;
      let formattedStartHour = new Date();
      formattedStartHour.setUTCHours(Number(startHour), 0, 0, 0);

      let formattedEndHour = new Date();
      formattedEndHour.setUTCHours(Number(startHour), 30, 0, 0);

      const startISOString = formattedStartHour.toISOString();
      const endISOString = formattedEndHour.toISOString();

      console.log(startISOString);
      console.log(endISOString);

      setSuggestedTimeSlot({
        start: startISOString,
        end: endISOString,
      });

      console.log("Suggested Time Slot:", {
        start: startISOString,
        end: endISOString,
      });
    } catch (error) {
      console.error("Error fetching suggested time slot:", error);
    }
  };
  ``


  useEffect(() => {
    if (!receiverId) return;
    getData();
  }, [receiverId]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      navigation.goBack();
      return true;
    });

    return () => backHandler.remove();
  }, [navigation]);

  const generateTimeSlots = (date) => {
    const slots = [];
    let startTime = new Date(date);
    startTime.setHours(9, 0, 0, 0);
    const endTime = new Date(date);
    endTime.setHours(18, 0, 0, 0);

    while (startTime < endTime) {
      const slotStart = new Date(startTime);
      const slotEnd = new Date(startTime);
      slotEnd.setMinutes(slotStart.getMinutes() + 30);

      slots.push({ start: slotStart, end: slotEnd });
      startTime.setMinutes(startTime.getMinutes() + 30);
    }

    return slots;
  };

  useEffect(() => {
    setTimeSlots(generateTimeSlots(selectedDate));
  }, [selectedDate]);

  const handleDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) setSelectedDate(date);
  };

  const handleTimeSlotSelect = (slot) => {
    setSelectedTimeSlot(slot);
    dispatch(
      updateCreatingParcel({
        timeSlot: {
          startTime: slot.start.toISOString(),
          endTime: slot.end.toISOString(),
        },
      })
    );

    Alert.alert(
      "Selected Slot",
      `You selected ${slot.start.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} - ${slot.end.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    );
  };

  const handleTimeSlotSelect1 = (slot) => {
    const startDate = new Date(slot.start);
    const endDate = new Date(slot.end);

    setSelectedTimeSlot(slot);
    dispatch(
      updateCreatingParcel({
        timeSlot: {
          startTime: startDate.toISOString(),
          endTime: endDate.toISOString(),
        },
      })
    );

    Alert.alert(
      "Selected Slot",
      `You selected ${startDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })} - ${endDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    );
  };

  const handleNext = () => navigation.navigate("SummaryScreen");

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.progressContainer}>
          <View style={styles.progressItem}>
            <View style={styles.completedStepCircle} />
            <Text style={styles.completedStepText}>ADDRESS</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressItem}>
            <View style={styles.completedStepCircle} />
            <Text style={styles.completedStepText}>PACKAGE</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressItem}>
            <View style={styles.activeStepCircle} />
            <Text style={styles.activeStepText}>SCHEDULE</Text>
          </View>
          <View style={styles.progressLine} />
          <View style={styles.progressItem}>
            <View style={styles.inactiveStepCircle} />
            <Text style={styles.inactiveStepText}>SUMMARY</Text>
          </View>
        </View>

        <View style={styles.datePickerContainer}>
          <Text style={styles.sectionTitle}>Receiving Date</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.datePickerButton}
          >
            <Text style={styles.datePickerButtonText}>Choose a Date</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="calendar"
            onChange={handleDateChange}
          />
        )}

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[...Array(7)].map((_, index) => {
            const date = new Date();
            date.setDate(selectedDate.getDate() + index);
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateOption,
                  isSelected && styles.selectedDateOption,
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text
                  style={[
                    styles.dateText,
                    isSelected && styles.selectedDateText,
                  ]}
                >
                  {date.toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                  })}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Text style={styles.sectionTitle}>Predicted Time Slot</Text>
        <View style={styles.timeSlotsContainer}>
          {suggestedTimeSlot && (
            <TouchableOpacity
              style={[styles.button]}
              onPress={() => handleTimeSlotSelect1(suggestedTimeSlot)}
            >
              <Text style={styles.buttonText}>
                {`${new Date(suggestedTimeSlot.start).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${new Date(suggestedTimeSlot.end).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              </Text>
            </TouchableOpacity>
          )}

        </View>
        <Text style={styles.sectionTitle}>Receiving Time Slots</Text>
        <View style={styles.timeSlotsContainer}>
          {timeSlots.map((slot, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                selectedTimeSlot === slot && styles.selectedTimeSlot,
              ]}
              onPress={() => handleTimeSlotSelect(slot)}
            >
              <Text style={styles.timeSlotText}>
                {`${slot.start.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })} - ${slot.end.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`}
              </Text>
            </TouchableOpacity>
          ))}
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
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    padding: 16,
    paddingBottom: 80,
  },
  icon: {
    marginRight: 8,
    color: "#fff",
  },
  button: {
    backgroundColor: '#d9534f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  progressItem: {
    flexDirection: "column",
    alignItems: "center",
  },
  progressLine: {
    width: 48,
    height: 2,
    backgroundColor: "green",
  },
  completedStepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "green",
  },
  completedStepText: {
    marginTop: 4,
    color: "green",
    fontSize: 12,
  },
  activeStepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "green",
  },
  activeStepText: {
    marginTop: 4,
    color: "blue",
    fontSize: 12,
  },
  inactiveStepCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ccc",
  },
  inactiveStepText: {
    marginTop: 4,
    color: "#ccc",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
  },
  dateOption: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    height: 40,
  },
  selectedDateOption: {
    backgroundColor: "#d9534f",
    borderColor: "#007bff",
  },
  dateText: {
    fontSize: 14,
    color: "#333",
  },
  selectedDateText: {
    color: "#fff",
  },
  countdownContainer: {
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginVertical: 12,
  },
  countdownText: {
    fontSize: 14,
    color: "#333",
  },
  pickupInfo: {
    fontSize: 12,
    color: "#888",
  },
  timeSlotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  timeSlot: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  pTimeSlot: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  selectedTimeSlot: {
    backgroundColor: "#d9534f",
  },
  timeSlotText: {
    fontSize: 14,
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#d9534f",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 16,
    backgroundColor: "#fff",
  },
  datePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  datePickerButton: {
    backgroundColor: "#d9534f",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  datePickerButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default ScheduleScreen;
