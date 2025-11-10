// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const categories = [
    {
      id: 1,
      title: 'Office Fun',
      icon: 'business',
      description: 'Create fun certificates for coworkers',
      gradient: ['#667eea', '#764ba2'],
      emoji: '💼'
    },
    {
      id: 2,
      title: 'Personal Achievements',
      icon: 'trophy',
      description: 'Celebrate personal milestones',
      gradient: ['#f093fb', '#f5576c'],
      emoji: '🏆'
    },
    {
      id: 3,
      title: 'Friends & Family',
      icon: 'heart',
      description: 'Create certificates for loved ones',
      gradient: ['#4facfe', '#00f2fe'],
      emoji: '❤️'
    },
    {
      id: 4,
      title: 'Gaming',
      icon: 'game-controller',
      description: 'Game achievements and stats',
      gradient: ['#43e97b', '#38f9d7'],
      emoji: '🎮'
    }
  ];

  const showDisclaimer = () => {
    Alert.alert(
      '🎭 Important Notice',
      'Fakify creates novelty certificates for entertainment purposes only. These certificates have no legal or official validity.\n\nHave fun but be responsible!',
      [
        { 
          text: 'I Understand', 
          style: 'default' 
        }
      ]
    );
  };

  const navigateToCategory = (categoryTitle) => {
    navigation.navigate('Template', { category: categoryTitle });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <LinearGradient
        colors={['#7C3AED', '#5B21B6']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.title}>🎉 Fakify</Text>
          <Text style={styles.subtitle}>Create Amazing Certificates for Fun!</Text>
          <Text style={styles.tagline}>Turn any moment into a celebration with custom certificates</Text>
        </View>
      </LinearGradient>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>4+</Text>
          <Text style={styles.statLabel}>Categories</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>∞</Text>
          <Text style={styles.statLabel}>Designs</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statLabel}>Fun</Text>
        </View>
      </View>

      {/* Disclaimer */}
      <TouchableOpacity style={styles.disclaimerButton} onPress={showDisclaimer}>
        <Ionicons name="shield-checkmark" size={22} color="#F59E0B" />
        <Text style={styles.disclaimerText}>For Entertainment Only</Text>
        <Ionicons name="chevron-forward" size={18} color="#F59E0B" />
      </TouchableOpacity>

      {/* Categories Grid */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Choose Category</Text>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={styles.categoryCard}
              onPress={() => navigateToCategory(category.title)}
            >
              <LinearGradient
                colors={category.gradient}
                style={styles.categoryGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.categoryEmoji}>{category.emoji}</Text>
                <Text style={styles.categoryTitle}>{category.title}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
                <View style={styles.categoryArrow}>
                  <Ionicons name="arrow-forward" size={16} color="#fff" />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Why Choose Fakify?</Text>
        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#DBEAFE' }]}>
              <Ionicons name="sparkles" size={24} color="#3B82F6" />
            </View>
            <Text style={styles.featureTitle}>Easy to Use</Text>
            <Text style={styles.featureDescription}>Create certificates in minutes with our simple interface</Text>
          </View>
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#F3E8FF' }]}>
              <Ionicons name="color-palette" size={24} color="#7C3AED" />
            </View>
            <Text style={styles.featureTitle}>Beautiful Templates</Text>
            <Text style={styles.featureDescription}>Multiple stunning designs for every occasion</Text>
          </View>
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#DCFCE7' }]}>
              <Ionicons name="share-social" size={24} color="#16A34A" />
            </View>
            <Text style={styles.featureTitle}>Share Instantly</Text>
            <Text style={styles.featureDescription}>Share your creations with friends and family</Text>
          </View>
          <View style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#FEF3C7' }]}>
              <Ionicons name="infinite" size={24} color="#D97706" />
            </View>
            <Text style={styles.featureTitle}>Endless Fun</Text>
            <Text style={styles.featureDescription}>Unlimited possibilities for creativity and humor</Text>
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Ready to Create Magic?</Text>
        <Text style={styles.ctaDescription}>Start making unforgettable certificates today!</Text>
        <TouchableOpacity 
          style={styles.ctaButton}
          onPress={() => navigateToCategory('Personal Achievements')}
        >
          <LinearGradient
            colors={['#7C3AED', '#5B21B6']}
            style={styles.ctaGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.ctaButtonText}>Get Started Now</Text>
            <Ionicons name="rocket" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 30,
    paddingTop: 50,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E9D5FF',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: '#C4B5FD',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 20,
    marginTop: -30,
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#7C3AED',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 10,
  },
  disclaimerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    padding: 16,
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    borderColor: '#F59E0B',
    borderWidth: 1,
  },
  disclaimerText: {
    flex: 1,
    marginLeft: 12,
    color: '#D97706',
    fontWeight: '600',
    fontSize: 14,
  },
  categoriesSection: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 20,
  },
  categoriesGrid: {
    gap: 16,
  },
  categoryCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  categoryGradient: {
    padding: 24,
    borderRadius: 20,
  },
  categoryEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  categoryArrow: {
    alignSelf: 'flex-end',
  },
  featuresSection: {
    padding: 20,
    paddingTop: 10,
  },
  featuresGrid: {
    gap: 16,
  },
  featureCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  ctaSection: {
    padding: 20,
    paddingTop: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
    textAlign: 'center',
  },
  ctaButton: {
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginRight: 8,
  },
});

export default HomeScreen;