// src/screens/TemplateScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const TemplateScreen = ({ navigation, route }) => {
  const { category } = route.params || {};

  const templates = [
    {
      id: 1,
      name: 'Classic Achievement',
      type: 'classic',
      description: 'Traditional certificate style'
    },
    {
      id: 2,
      name: 'Modern Design',
      type: 'modern',
      description: 'Contemporary certificate layout'
    },
    {
      id: 3,
      name: 'Fun Style',
      type: 'fun',
      description: 'Colorful and playful design'
    },
    {
      id: 4,
      name: 'Elegant',
      type: 'elegant',
      description: 'Sophisticated and formal look'
    }
  ];

  const navigateToCertificate = (templateType) => {
    navigation.navigate('Certificate', { 
      category: category || 'General', 
      template: templateType 
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Choose Template</Text>
        <Text style={styles.subtitle}>Category: {category || 'General'}</Text>
      </View>

      <View style={styles.templatesContainer}>
        {templates.map((template) => (
          <TouchableOpacity
            key={template.id}
            style={styles.templateCard}
            onPress={() => navigateToCertificate(template.type)}
          >
            <View style={[styles.templatePreview, styles[template.type]]}>
              <Text style={styles.previewText}>Preview</Text>
            </View>
            <View style={styles.templateInfo}>
              <Text style={styles.templateName}>{template.name}</Text>
              <Text style={styles.templateDescription}>{template.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
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
    backgroundColor: 'white',
    marginBottom: 10,
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
  templatesContainer: {
    padding: 10,
  },
  templateCard: {
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  templatePreview: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  templateInfo: {
    padding: 15,
  },
  templateName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  templateDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  previewText: {
    color: 'white',
    fontWeight: 'bold',
  },
  classic: { backgroundColor: '#8B4513' },
  modern: { backgroundColor: '#4F46E5' },
  fun: { backgroundColor: '#EC4899' },
  elegant: { backgroundColor: '#059669' },
});

export default TemplateScreen;