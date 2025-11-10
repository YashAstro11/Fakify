// src/screens/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const categories = [
    {
      id: 1,
      title: 'Office Fun',
      icon: 'business',
      description: 'Create fun certificates for coworkers'
    },
    {
      id: 2,
      title: 'Personal Achievements',
      icon: 'trophy',
      description: 'Celebrate personal milestones'
    },
    {
      id: 3,
      title: 'Friends & Family',
      icon: 'heart',
      description: 'Create certificates for loved ones'
    },
    {
      id: 4,
      title: 'Gaming',
      icon: 'game-controller',
      description: 'Game achievements and stats'
    }
  ];

  const showDisclaimer = () => {
    Alert.alert(
      'Important Notice',
      'This app creates novelty certificates for entertainment purposes only. These certificates have no legal or official validity.',
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Certificate Maker</Text>
        <Text style={styles.subtitle}>Create fun certificates for any occasion!</Text>
      </View>

      <TouchableOpacity style={styles.disclaimerButton} onPress={showDisclaimer}>
        <Ionicons name="warning" size={20} color="#FFA000" />
        <Text style={styles.disclaimerText}>Important Notice</Text>
      </TouchableOpacity>

      <View style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => navigateToCategory(category.title)}
          >
            <Ionicons name={category.icon} size={32} color="#4F46E5" />
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <Text style={styles.categoryDescription}>{category.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Features:</Text>
        <Text style={styles.featureItem}>• Multiple certificate templates</Text>
        <Text style={styles.featureItem}>• Custom text and names</Text>
        <Text style={styles.featureItem}>• Fun achievement categories</Text>
        <Text style={styles.featureItem}>• Share with friends</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  disclaimerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3CD',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    borderColor: '#FFA000',
    borderWidth: 1,
  },
  disclaimerText: {
    marginLeft: 10,
    color: '#856404',
    fontWeight: '600',
  },
  categoriesContainer: {
    padding: 10,
  },
  categoryCard: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
  features: {
    backgroundColor: 'white',
    margin: 10,
    padding: 20,
    borderRadius: 10,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default HomeScreen;