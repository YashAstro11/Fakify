// src/screens/CertificateScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import CertificateSVG from '../components/CertificateSVG';

const CertificateScreen = ({ navigation, route }) => {
  const { category = 'General', template = 'classic' } = route.params || {};
  const [name, setName] = useState('');
  const [achievement, setAchievement] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [issuedBy, setIssuedBy] = useState('Certificate Maker App');

  const handleCreateCertificate = () => {
    if (!name.trim() || !achievement.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    Alert.alert(
      'Certificate Created!',
      'Your fun certificate has been generated successfully!\n\nRemember: This is for entertainment purposes only.',
      [{ text: 'OK', style: 'default' }]
    );
  };

  const getFunAchievements = () => {
    const achievements = {
      'Office Fun': [
        'Coffee Master',
        'Meeting Survivor',
        'Excel Wizard',
        'Office Comedian',
        'Deadline Champion'
      ],
      'Personal Achievements': [
        'Pizza Eating Champion',
        'Netflix Binge Master',
        'Sleeping Expert',
        'Procrastination Pro',
        'Social Media Guru'
      ],
      'Friends & Family': [
        'Best Friend Forever',
        'Awesome Sibling',
        'Family Hero',
        'Supportive Friend',
        'Funniest Relative'
      ],
      'Gaming': [
        'Noob Slayer',
        'Lag Master',
        'Achievement Hunter',
        'Boss Fighter',
        'Game Collector'
      ]
    };
    return achievements[category] || ['Awesome Achievement'];
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Certificate</Text>
        <Text style={styles.subtitle}>{category} - {template} Template</Text>
      </View>

      <View style={styles.previewSection}>
        <Text style={styles.sectionTitle}>Preview</Text>
        <View style={styles.certificateContainer}>
          <CertificateSVG
            name={name || "Recipient Name"}
            achievement={achievement || "Amazing Achievement"}
            date={date}
            issuedBy={issuedBy}
            template={template}
          />
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Certificate Details</Text>
        
        <Text style={styles.label}>Recipient Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter recipient's name"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Achievement</Text>
        <TextInput
          style={styles.input}
          value={achievement}
          onChangeText={setAchievement}
          placeholder="Enter the achievement"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Quick Achievement Ideas</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.achievementList}
          contentContainerStyle={styles.achievementContent}
        >
          {getFunAchievements().map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.achievementChip}
              onPress={() => setAchievement(item)}
            >
              <Text style={styles.achievementChipText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={date}
          onChangeText={setDate}
          placeholder="Enter date"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Issued By</Text>
        <TextInput
          style={styles.input}
          value={issuedBy}
          onChangeText={setIssuedBy}
          placeholder="Enter issuer name"
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.createButton} onPress={handleCreateCertificate}>
          <Text style={styles.createButtonText}>Create Certificate</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          Note: This certificate is for entertainment purposes only and has no official validity.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  previewSection: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  certificateContainer: {
    alignItems: 'center',
    padding: 10,
  },
  formSection: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  achievementList: {
    marginBottom: 15,
  },
  achievementContent: {
    paddingRight: 10,
  },
  achievementChip: {
    backgroundColor: '#4F46E5',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  achievementChipText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  createButton: {
    backgroundColor: '#4F46E5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disclaimer: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 10,
  },
});

export default CertificateScreen;