import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { FONTS, SPACING } from '../constants/fonts';
import Button from '../components/Button';

// Mock data for available therapists
const therapists = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cognitive Behavioral Therapy',
    experience: '10 years',
    rating: 4.9,
    avatar: '👩‍⚕️',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Mindfulness Therapy',
    experience: '8 years',
    rating: 4.8,
    avatar: '👨‍⚕️',
  },
  {
    id: '3',
    name: 'Dr. Emily Williams',
    specialty: 'Anxiety & Depression',
    experience: '12 years',
    rating: 4.9,
    avatar: '👩‍⚕️',
  },
];

// Mock data for available time slots
const generateTimeSlots = () => {
  const slots = [];
  const today = new Date();
  
  for (let i = 0; i < 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    const times = ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM', '5:00 PM'];
    slots.push({
      date: date.toDateString(),
      times: times.map(time => ({
        time,
        available: Math.random() > 0.3, // Randomly set availability
      })),
    });
  }
  
  return slots;
};

const timeSlots = generateTimeSlots();

const TherapistCard = ({ therapist, selected, onSelect }) => (
  <TouchableOpacity
    style={[
      styles.therapistCard,
      selected && styles.therapistCardSelected,
    ]}
    onPress={() => onSelect(therapist)}
  >
    <Text style={styles.therapistAvatar}>{therapist.avatar}</Text>
    <View style={styles.therapistInfo}>
      <Text style={styles.therapistName}>{therapist.name}</Text>
      <Text style={styles.therapistSpecialty}>{therapist.specialty}</Text>
      <Text style={styles.therapistExperience}>{therapist.experience}</Text>
    </View>
    <View style={styles.therapistRating}>
      <Text style={styles.ratingText}>⭐ {therapist.rating}</Text>
    </View>
  </TouchableOpacity>
);

const TimeSlotPicker = ({ slots, selectedDate, selectedTime, onSelectDate, onSelectTime }) => (
  <View style={styles.timeSlotContainer}>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.dateScroll}
    >
      {slots.map((slot) => (
        <TouchableOpacity
          key={slot.date}
          style={[
            styles.dateCard,
            selectedDate === slot.date && styles.dateCardSelected,
          ]}
          onPress={() => onSelectDate(slot.date)}
        >
          <Text style={[
            styles.dateText,
            selectedDate === slot.date && styles.dateTextSelected,
          ]}>
            {slot.date.split(' ').slice(0, 3).join(' ')}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    <View style={styles.timeGrid}>
      {slots
        .find(slot => slot.date === selectedDate)
        ?.times.map((slot, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.timeCard,
              !slot.available && styles.timeCardUnavailable,
              selectedTime === slot.time && styles.timeCardSelected,
            ]}
            onPress={() => slot.available && onSelectTime(slot.time)}
            disabled={!slot.available}
          >
            <Text style={[
              styles.timeText,
              !slot.available && styles.timeTextUnavailable,
              selectedTime === slot.time && styles.timeTextSelected,
            ]}>
              {slot.time}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  </View>
);

const AppointmentScreen = () => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(timeSlots[0].date);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleBookAppointment = () => {
    if (!selectedTherapist || !selectedTime) {
      Alert.alert(
        'Incomplete Selection',
        'Please select both a therapist and a time slot.'
      );
      return;
    }

    Alert.alert(
      'Confirm Appointment',
      `Would you like to book an appointment with ${selectedTherapist.name} on ${selectedDate} at ${selectedTime}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            // TODO: Implement actual booking logic
            Alert.alert(
              'Success',
              'Your appointment has been booked successfully!'
            );
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book an Appointment</Text>
        <Text style={styles.subtitle}>Select a therapist and available time slot</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Therapists</Text>
        {therapists.map((therapist) => (
          <TherapistCard
            key={therapist.id}
            therapist={therapist}
            selected={selectedTherapist?.id === therapist.id}
            onSelect={setSelectedTherapist}
          />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Date & Time</Text>
        <TimeSlotPicker
          slots={timeSlots}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onSelectDate={setSelectedDate}
          onSelectTime={setSelectedTime}
        />
      </View>

      <Button
        title="Book Appointment"
        onPress={handleBookAppointment}
        style={styles.bookButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: FONTS.sizes.xxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
  },
  section: {
    marginTop: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  therapistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginHorizontal: SPACING.xl,
    marginBottom: SPACING.md,
    padding: SPACING.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  therapistCardSelected: {
    borderColor: COLORS.primary,
  },
  therapistAvatar: {
    fontSize: FONTS.sizes.xxl,
    marginRight: SPACING.md,
  },
  therapistInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  therapistSpecialty: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
    marginBottom: SPACING.xs,
  },
  therapistExperience: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
  },
  therapistRating: {
    backgroundColor: COLORS.background,
    padding: SPACING.xs,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
  timeSlotContainer: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
  },
  dateScroll: {
    marginBottom: SPACING.lg,
  },
  dateCard: {
    padding: SPACING.md,
    marginRight: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  dateCardSelected: {
    backgroundColor: COLORS.primary,
  },
  dateText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
  },
  dateTextSelected: {
    color: COLORS.white,
    fontWeight: FONTS.weights.bold,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeCard: {
    width: '30%',
    padding: SPACING.md,
    marginBottom: SPACING.md,
    backgroundColor: COLORS.background,
    borderRadius: 8,
    alignItems: 'center',
  },
  timeCardSelected: {
    backgroundColor: COLORS.primary,
  },
  timeCardUnavailable: {
    backgroundColor: COLORS.background,
    opacity: 0.5,
  },
  timeText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
  },
  timeTextSelected: {
    color: COLORS.white,
    fontWeight: FONTS.weights.bold,
  },
  timeTextUnavailable: {
    color: COLORS.text.disabled,
  },
  bookButton: {
    margin: SPACING.xl,
  },
});

export default AppointmentScreen;