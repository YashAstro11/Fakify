// src/screens/TemplateScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const TemplateScreen = ({ navigation, route }) => {
  const { category } = route.params || {};

  const templates = [
    {
      id: 1,
      name: 'Classic Achievement',
      type: 'classic',
      description: 'Elegant traditional design with golden accents',
      gradient: ['#D97706', '#B45309'],
      icon: '🏛️',
      features: ['Golden Borders', 'Formal Style', 'Traditional Look']
    },
    {
      id: 2,
      name: 'Modern Design',
      type: 'modern',
      description: 'Clean contemporary layout with vibrant colors',
      gradient: ['#7C3AED', '#5B21B6'],
      icon: '🚀',
      features: ['Clean Lines', 'Vibrant Colors', 'Contemporary']
    },
    {
      id: 3,
      name: 'Fun Style',
      type: 'fun',
      description: 'Playful and colorful perfect for celebrations',
      gradient: ['#EC4899', '#BE185D'],
      icon: '🎨',
      features: ['Colorful', 'Playful', 'Celebratory']
    },
    {
      id: 4,
      name: 'Elegant',
      type: 'elegant',
      description: 'Sophisticated design for formal recognition',
      gradient: ['#059669', '#047857'],
      icon: '✨',
      features: ['Sophisticated', 'Formal', 'Professional']
    },
    {
      id: 5,
      name: 'Minimalist',
      type: 'minimalist',
      description: 'Simple and clean with focus on content',
      gradient: ['#3B82F6', '#1D4ED8'],
      icon: '⚪',
      features: ['Simple', 'Clean', 'Content-Focused']
    },
    {
      id: 6,
      name: 'Vintage',
      type: 'vintage',
      description: 'Retro design with classic paper texture',
      gradient: ['#92400E', '#78350F'],
      icon: '📜',
      features: ['Retro Style', 'Classic', 'Timeless']
    }
  ];

  const navigateToCertificate = (templateType) => {
    navigation.navigate('Certificate', { 
      category: category || 'General', 
      template: templateType 
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#7C3AED', '#5B21B6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Choose Your Style</Text>
            <Text style={styles.subtitle}>for {category || 'General'} Certificates</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Introduction */}
      <View style={styles.introSection}>
        <Text style={styles.introTitle}>🎨 Pick a Template</Text>
        <Text style={styles.introDescription}>
          Select a design that matches your style. Each template offers a unique look and feel for your certificate.
        </Text>
      </View>

      {/* Templates Grid */}
      <View style={styles.templatesContainer}>
        <View style={styles.templatesGrid}>
          {templates.map((template) => (
            <TouchableOpacity
              key={template.id}
              style={styles.templateCard}
              onPress={() => navigateToCertificate(template.type)}
            >
              <LinearGradient
                colors={template.gradient}
                style={styles.templateGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {/* Template Header */}
                <View style={styles.templateHeader}>
                  <View style={styles.templateIconContainer}>
                    <Text style={styles.templateIcon}>{template.icon}</Text>
                  </View>
                  <View style={styles.templateBadge}>
                    <Ionicons name="star" size={12} color="#fff" />
                  </View>
                </View>
                
                {/* Template Preview */}
                <View style={styles.templatePreview}>
                  <View style={styles.previewContent}>
                    <View style={styles.previewTitle} />
                    <View style={styles.previewLine} />
                    <View style={styles.previewLineShort} />
                    <View style={styles.previewLine} />
                  </View>
                </View>
                
                {/* Template Info */}
                <View style={styles.templateInfo}>
                  <Text style={styles.templateName}>{template.name}</Text>
                  <Text style={styles.templateDescription}>{template.description}</Text>
                  
                  {/* Features */}
                  <View style={styles.featuresContainer}>
                    {template.features.map((feature, index) => (
                      <View key={index} style={styles.featureTag}>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                </View>
                
                {/* Action Button */}
                <View style={styles.templateFooter}>
                  <View style={styles.selectButton}>
                    <Text style={styles.selectButtonText}>Use This Template</Text>
                    <Ionicons name="chevron-forward" size={16} color="#fff" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Help Section */}
      <View style={styles.helpSection}>
        <View style={styles.helpHeader}>
          <Ionicons name="help-circle" size={24} color="#7C3AED" />
          <Text style={styles.helpTitle}>Not sure which to choose?</Text>
        </View>
        <View style={styles.helpTips}>
          <View style={styles.helpTip}>
            <Ionicons name="color-palette" size={20} color="#7C3AED" />
            <Text style={styles.helpTipText}>
              <Text style={styles.tipHighlight}>Classic</Text> - Perfect for formal achievements
            </Text>
          </View>
          <View style={styles.helpTip}>
            <Ionicons name="heart" size={20} color="#7C3AED" />
            <Text style={styles.helpTipText}>
              <Text style={styles.tipHighlight}>Fun & Modern</Text> - Great for casual celebrations
            </Text>
          </View>
          <View style={styles.helpTip}>
            <Ionicons name="sparkles" size={20} color="#7C3AED" />
            <Text style={styles.helpTipText}>
              <Text style={styles.tipHighlight}>Elegant</Text> - Ideal for special recognitions
            </Text>
          </View>
        </View>
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
    padding: 20,
    paddingTop: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#E9D5FF',
    fontWeight: '600',
  },
  introSection: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
  },
  introDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  templatesContainer: {
    padding: 20,
    paddingTop: 0,
  },
  templatesGrid: {
    gap: 20,
  },
  templateCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 6,
  },
  templateGradient: {
    padding: 20,
    borderRadius: 20,
  },
  templateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  templateIconContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 12,
  },
  templateIcon: {
    fontSize: 20,
  },
  templateBadge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    padding: 4,
    borderRadius: 8,
  },
  templatePreview: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  previewContent: {
    width: '100%',
    gap: 8,
    alignItems: 'center',
  },
  previewTitle: {
    width: '60%',
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 3,
  },
  previewLine: {
    width: '80%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 2,
  },
  previewLineShort: {
    width: '50%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.4)',
    borderRadius: 2,
  },
  templateInfo: {
    marginBottom: 15,
  },
  templateName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  templateDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
    marginBottom: 12,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  featureTag: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  featureText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: '600',
  },
  templateFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  helpSection: {
    backgroundColor: '#fff',
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  helpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 15,
  },
  helpTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
  },
  helpTips: {
    gap: 12,
  },
  helpTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  helpTipText: {
    flex: 1,
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  tipHighlight: {
    fontWeight: '600',
    color: '#7C3AED',
  },
});

export default TemplateScreen;