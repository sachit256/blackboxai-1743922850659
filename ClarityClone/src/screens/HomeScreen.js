import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import { FONTS, SPACING } from '../constants/fonts';

const FeatureCard = ({ title, description, icon, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardIcon}>
      <Text style={styles.cardIconText}>{icon}</Text>
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({ navigation }) => {
  const features = [
    {
      title: 'Video Journal',
      description: 'Record and reflect on your thoughts and feelings',
      icon: '📹',
      onPress: () => navigation.navigate('Record'),
    },
    {
      title: 'Guided Meditation',
      description: 'Find peace with guided meditation sessions',
      icon: '🧘‍♀️',
      onPress: () => navigation.navigate('Meditate'),
    },
    {
      title: 'Book Appointment',
      description: 'Schedule a session with a therapist',
      icon: '📅',
      onPress: () => navigation.navigate('Appointments'),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good Morning</Text>
          <Text style={styles.name}>Sarah</Text>
        </View>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => navigation.navigate('Profile')}
        >
          <Text style={styles.profileButtonText}>👤</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Quote Section */}
      <View style={styles.quoteCard}>
        <Text style={styles.quoteText}>
          "The only way to do great work is to love what you do."
        </Text>
        <Text style={styles.quoteAuthor}>- Steve Jobs</Text>
      </View>

      {/* Mood Tracker Section */}
      <View style={styles.moodSection}>
        <Text style={styles.sectionTitle}>How are you feeling today?</Text>
        <View style={styles.moodRow}>
          {['😊', '😐', '😔', '😡', '😴'].map((mood, index) => (
            <TouchableOpacity 
              key={index}
              style={styles.moodButton}
              onPress={() => console.log('Mood selected:', mood)}
            >
              <Text style={styles.moodEmoji}>{mood}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Features Section */}
      <Text style={styles.sectionTitle}>Features</Text>
      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            onPress={feature.onPress}
          />
        ))}
      </View>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionIcon}>🎯</Text>
            <Text style={styles.quickActionText}>Set Goals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionIcon}>📝</Text>
            <Text style={styles.quickActionText}>Journal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionButton}>
            <Text style={styles.quickActionIcon}>🧘‍♀️</Text>
            <Text style={styles.quickActionText}>Breathe</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
  },
  greeting: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
  },
  name: {
    fontSize: FONTS.sizes.xl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButtonText: {
    fontSize: FONTS.sizes.lg,
  },
  quoteCard: {
    margin: SPACING.xl,
    padding: SPACING.xl,
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  quoteText: {
    fontSize: FONTS.sizes.md,
    color: COLORS.white,
    fontWeight: FONTS.weights.medium,
    marginBottom: SPACING.sm,
  },
  quoteAuthor: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.white,
    opacity: 0.8,
  },
  moodSection: {
    padding: SPACING.xl,
    backgroundColor: COLORS.white,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONTS.sizes.lg,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
    paddingHorizontal: SPACING.xl,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  moodButton: {
    padding: SPACING.sm,
  },
  moodEmoji: {
    fontSize: FONTS.sizes.xl,
  },
  featuresContainer: {
    padding: SPACING.xl,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.lg,
  },
  cardIconText: {
    fontSize: FONTS.sizes.xl,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: FONTS.sizes.md,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  cardDescription: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.secondary,
  },
  quickActions: {
    marginBottom: SPACING.xl,
  },
  quickActionButton: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.lg,
    marginLeft: SPACING.xl,
    alignItems: 'center',
    width: 100,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionIcon: {
    fontSize: FONTS.sizes.xl,
    marginBottom: SPACING.xs,
  },
  quickActionText: {
    fontSize: FONTS.sizes.sm,
    color: COLORS.text.primary,
    fontWeight: FONTS.weights.medium,
  },
});

export default HomeScreen;