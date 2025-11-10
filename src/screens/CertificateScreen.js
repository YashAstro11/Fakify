// src/screens/CertificateScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';
import CertificateSVG from '../components/CertificateSVG';

const CertificateScreen = ({ navigation, route }) => {
  const { category = 'General', template = 'classic' } = route.params || {};
  const [name, setName] = useState('');
  const [achievement, setAchievement] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [issuedBy, setIssuedBy] = useState('Fakify App');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const fadeAnim = useState(new Animated.Value(0))[0];
  
  const certificateRef = useRef();

  const templateColors = {
    classic: { primary: '#D97706', secondary: '#FEF3C7', gradient: ['#D97706', '#B45309'] },
    modern: { primary: '#7C3AED', secondary: '#EDE9FE', gradient: ['#7C3AED', '#5B21B6'] },
    fun: { primary: '#EC4899', secondary: '#FCE7F3', gradient: ['#EC4899', '#BE185D'] },
    elegant: { primary: '#059669', secondary: '#D1FAE5', gradient: ['#059669', '#047857'] },
    minimalist: { primary: '#3B82F6', secondary: '#DBEAFE', gradient: ['#3B82F6', '#1D4ED8'] },
    vintage: { primary: '#92400E', secondary: '#FEF3C7', gradient: ['#92400E', '#78350F'] }
  };

  const colors = templateColors[template] || templateColors.modern;

  const handleCreateCertificate = () => {
    if (!name.trim() || !achievement.trim()) {
      Alert.alert('⚠️ Missing Information', 'Please fill in all fields to create your certificate.', [
        { text: 'Got it', style: 'default' }
      ]);
      return;
    }

    setIsGenerating(true);
    
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      setIsGenerating(false);
      Alert.alert(
        '🎉 Certificate Created!',
        `Your "${achievement}" certificate for ${name} has been generated successfully!\n\nRemember: This is for entertainment purposes only.`,
        [
          { 
            text: 'Create Another', 
            style: 'cancel',
            onPress: () => {
              setName('');
              setAchievement('');
            }
          },
          { 
            text: 'Download Certificate', 
            style: 'default',
            onPress: handleDownloadCertificate
          }
        ]
      );
    }, 2000);
  };

  const handleDownloadCertificate = async () => {
    if (!name.trim() || !achievement.trim()) {
      Alert.alert('⚠️ No Certificate', 'Please create a certificate first before downloading.');
      return;
    }

    setIsDownloading(true);

    try {
      // Capture the certificate as an image - use 'tmpfile' instead of 'base64'
      const uri = await captureRef(certificateRef, {
        format: 'png',
        quality: 1.0,
        result: 'tmpfile' // This returns a file URI directly
      });

      // Create a filename
      const filename = `Fakify_Certificate_${name.replace(/\s+/g, '_')}_${Date.now()}.png`;
      
      // For tmpfile result, we can use the URI directly
      const fileUri = uri;

      // Check if sharing is available
      const canShare = await Sharing.isAvailableAsync();
      
      if (canShare) {
        // Share the file directly
        await Sharing.shareAsync(fileUri, {
          mimeType: 'image/png',
          dialogTitle: 'Save Your Certificate',
          UTI: 'image/png'
        });
        
        Alert.alert(
          '✅ Certificate Ready!',
          `Your certificate has been generated and is ready to share/save!\n\nYou can save it to your photos or share it with friends.`,
          [{ text: 'Awesome!', style: 'default' }]
        );
      } else {
        // Fallback: Show success message with instructions
        Alert.alert(
          '✅ Certificate Generated!',
          `Your certificate has been generated successfully!\n\nTo save it:\n1. Take a screenshot\n2. Crop to the certificate\n3. Save to your photos`,
          [{ text: 'Got it!', style: 'default' }]
        );
      }

    } catch (error) {
      console.error('Error saving certificate:', error);
      
      // Fallback to screenshot instructions
      Alert.alert(
        '📸 Save Your Certificate',
        `Your certificate is ready! To save it:\n\n1. Take a screenshot now\n2. Crop the image to show just the certificate\n3. Save it to your photos\n\nYou can also share this screen to save the certificate.`,
        [{ text: 'OK', style: 'default' }]
      );
    } finally {
      setIsDownloading(false);
    }
  };

  // Alternative method using data-uri format (if tmpfile doesn't work)
  const handleDownloadCertificateAlternative = async () => {
    if (!name.trim() || !achievement.trim()) {
      Alert.alert('⚠️ No Certificate', 'Please create a certificate first before downloading.');
      return;
    }

    setIsDownloading(true);

    try {
      // Capture the certificate as an image using data-uri format
      const dataUri = await captureRef(certificateRef, {
        format: 'png',
        quality: 1.0,
        result: 'data-uri'
      });

      // Extract base64 data from data URI
      const base64Data = dataUri.split(',')[1];
      
      // Create a filename
      const filename = `Fakify_Certificate_${name.replace(/\s+/g, '_')}_${Date.now()}.png`;
      const fileUri = FileSystem.documentDirectory + filename;

      // Write the file using base64
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Check if sharing is available
      const canShare = await Sharing.isAvailableAsync();
      
      if (canShare) {
        await Sharing.shareAsync(fileUri, {
          mimeType: 'image/png',
          dialogTitle: 'Save Your Certificate',
          UTI: 'image/png'
        });
        
        Alert.alert(
          '✅ Certificate Ready!',
          `Your certificate has been generated and is ready to share/save!`,
          [{ text: 'Awesome!', style: 'default' }]
        );
      } else {
        Alert.alert(
          '✅ Certificate Generated!',
          `Your certificate has been generated successfully!\n\nTo save it:\n1. Take a screenshot\n2. Crop to the certificate\n3. Save to your photos`,
          [{ text: 'Got it!', style: 'default' }]
        );
      }

    } catch (error) {
      console.error('Error saving certificate:', error);
      handleScreenshotInstructions();
    } finally {
      setIsDownloading(false);
    }
  };

  // Simple screenshot method as fallback
  const handleScreenshotInstructions = () => {
    Alert.alert(
      '📸 How to Save Your Certificate',
      `To save your certificate:\n\n1. Take a screenshot of this screen\n2. Open your photos app\n3. Crop the image to show just the certificate\n4. Save the cropped image\n\nThis works on both iOS and Android!`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Take Screenshot Now', style: 'default' }
      ]
    );
  };

  const getFunAchievements = () => {
    const achievements = {
      'Office Fun': [
        '☕ Coffee Master',
        '💼 Meeting Survivor',
        '📊 Excel Wizard',
        '😂 Office Comedian',
        '⏰ Deadline Champion',
        '📞 Conference Call Pro'
      ],
      'Personal Achievements': [
        '🍕 Pizza Eating Champion',
        '📺 Netflix Binge Master',
        '😴 Sleeping Expert',
        '🔄 Procrastination Pro',
        '📱 Social Media Guru',
        '🏠 Couch Potato Elite'
      ],
      'Friends & Family': [
        '💖 Best Friend Forever',
        '👨‍👩‍👧‍👦 Awesome Sibling',
        '🦸 Family Hero',
        '🤗 Supportive Friend',
        '😄 Funniest Relative',
        '🎁 Perfect Gift Giver'
      ],
      'Gaming': [
        '🎯 Noob Slayer',
        '⚡ Lag Master',
        '🏆 Achievement Hunter',
        '🐉 Boss Fighter',
        '🎮 Game Collector',
        '💀 Hardcore Gamer'
      ]
    };
    return achievements[category] || ['🌟 Awesome Achievement'];
  };

  const quickDates = [
    'Today',
    'Yesterday', 
    'Right Now!',
    new Date().toLocaleDateString()
  ];

  const quickIssuers = [
    'Fakify App',
    'The Certificate Committee',
    'Official Recognition Board',
    'Your Awesome Self'
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={colors.gradient}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.headerText}>
            <Text style={styles.title}>Create Certificate</Text>
            <Text style={styles.subtitle}>{category} • {template} Style</Text>
          </View>
          <View style={styles.templateBadge}>
            <Text style={styles.templateBadgeText}>{template}</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Preview Section */}
        <View style={styles.previewSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>🎨 Live Preview</Text>
            <View style={[styles.templateIndicator, { backgroundColor: colors.primary }]}>
              <Text style={styles.templateIndicatorText}>{template}</Text>
            </View>
          </View>
          
          <View style={styles.certificateContainer}>
            <View 
              ref={certificateRef}
              style={[styles.certificateWrapper, { borderColor: colors.primary }]}
            >
              <CertificateSVG
                name={name || "Recipient Name"}
                achievement={achievement || "Amazing Achievement"}
                date={date}
                issuedBy={issuedBy}
                template={template}
              />
            </View>
            
            {isGenerating && (
              <Animated.View style={[styles.generatingOverlay, { opacity: fadeAnim }]}>
                <LinearGradient
                  colors={['rgba(124, 58, 237, 0.9)', 'rgba(91, 33, 182, 0.9)']}
                  style={styles.generatingGradient}
                >
                  <Ionicons name="sparkles" size={40} color="#fff" />
                  <Text style={styles.generatingText}>Creating Your Certificate...</Text>
                </LinearGradient>
              </Animated.View>
            )}
          </View>

          <View style={styles.previewStats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{name ? name.length : 0}</Text>
              <Text style={styles.statLabel}>Name Length</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{achievement ? achievement.length : 0}</Text>
              <Text style={styles.statLabel}>Achievement Length</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons 
                name={name && achievement ? "checkmark-circle" : "alert-circle"} 
                size={20} 
                color={name && achievement ? "#10B981" : "#F59E0B"} 
              />
              <Text style={styles.statLabel}>Ready</Text>
            </View>
          </View>

          {/* Download Buttons */}
          {name && achievement && (
            <View style={styles.downloadButtonsContainer}>
              <TouchableOpacity 
                style={[styles.downloadButton, { backgroundColor: colors.primary }]}
                onPress={handleDownloadCertificate}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <Ionicons name="download" size={20} color="#fff" />
                    <Text style={styles.downloadButtonText}>Preparing...</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="share-outline" size={20} color="#fff" />
                    <Text style={styles.downloadButtonText}>Share Certificate</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.screenshotButton, { borderColor: colors.primary }]}
                onPress={handleScreenshotInstructions}
              >
                <Ionicons name="camera-outline" size={20} color={colors.primary} />
                <Text style={[styles.screenshotButtonText, { color: colors.primary }]}>
                  Screenshot Guide
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>📝 Certificate Details</Text>
          
          {/* Recipient Name */}
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Text style={styles.label}>👤 Recipient Name</Text>
              {name && <Ionicons name="checkmark" size={16} color="#10B981" />}
            </View>
            <TextInput
              style={[styles.input, name && styles.inputFilled]}
              value={name}
              onChangeText={setName}
              placeholder="Enter the lucky person's name..."
              placeholderTextColor="#94A3B8"
            />
          </View>

          {/* Achievement */}
          <View style={styles.inputGroup}>
            <View style={styles.inputHeader}>
              <Text style={styles.label}>🏆 Achievement</Text>
              {achievement && <Ionicons name="checkmark" size={16} color="#10B981" />}
            </View>
            <TextInput
              style={[styles.input, styles.textArea, achievement && styles.inputFilled]}
              value={achievement}
              onChangeText={setAchievement}
              placeholder="What amazing thing did they accomplish?"
              placeholderTextColor="#94A3B8"
              multiline
              numberOfLines={3}
            />
            
            <Text style={styles.label}>Quick Achievement Ideas</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.chipsContainer}
              contentContainerStyle={styles.chipsContent}
            >
              {getFunAchievements().map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.chip, { backgroundColor: colors.secondary }]}
                  onPress={() => setAchievement(item.replace(/[^a-zA-Z\s]/g, '').trim())}
                >
                  <Text style={[styles.chipText, { color: colors.primary }]}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Date */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>📅 Date</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
              placeholder="When was this achieved?"
              placeholderTextColor="#94A3B8"
            />
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.chipsContainer}
              contentContainerStyle={styles.chipsContent}
            >
              {quickDates.map((quickDate, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.chip, { backgroundColor: '#E2E8F0' }]}
                  onPress={() => setDate(quickDate === 'Today' ? new Date().toLocaleDateString() : quickDate)}
                >
                  <Text style={[styles.chipText, { color: '#475569' }]}>{quickDate}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Issued By */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>🏛️ Issued By</Text>
            <TextInput
              style={styles.input}
              value={issuedBy}
              onChangeText={setIssuedBy}
              placeholder="Who is issuing this certificate?"
              placeholderTextColor="#94A3B8"
            />
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.chipsContainer}
              contentContainerStyle={styles.chipsContent}
            >
              {quickIssuers.map((issuer, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.chip, { backgroundColor: '#E2E8F0' }]}
                  onPress={() => setIssuedBy(issuer)}
                >
                  <Text style={[styles.chipText, { color: '#475569' }]}>{issuer}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsContainer}>
            <TouchableOpacity 
              style={[styles.secondaryButton, { borderColor: colors.primary }]}
              onPress={() => {
                setName('');
                setAchievement('');
                setDate(new Date().toLocaleDateString());
                setIssuedBy('Fakify App');
              }}
            >
              <Ionicons name="refresh" size={20} color={colors.primary} />
              <Text style={[styles.secondaryButtonText, { color: colors.primary }]}>Reset All</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.primaryButton, 
                (!name || !achievement) && styles.primaryButtonDisabled
              ]}
              onPress={handleCreateCertificate}
              disabled={!name || !achievement || isGenerating}
            >
              <LinearGradient
                colors={!name || !achievement ? ['#CBD5E1', '#94A3B8'] : colors.gradient}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                {isGenerating ? (
                  <>
                    <Ionicons name="sparkles" size={20} color="#fff" />
                    <Text style={styles.primaryButtonText}>Creating...</Text>
                  </>
                ) : (
                  <>
                    <Ionicons name="create" size={20} color="#fff" />
                    <Text style={styles.primaryButtonText}>
                      {!name || !achievement ? 'Fill Details' : 'Create Certificate'}
                    </Text>
                  </>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Disclaimer */}
          <View style={styles.disclaimer}>
            <Ionicons name="information-circle" size={20} color="#6B7280" />
            <Text style={styles.disclaimerText}>
              This certificate is created for entertainment purposes only and has no official validity. Have fun! 🎉
            </Text>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

// ... (keep all the same styles from previous version)

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
    height: 160,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
  },
  headerText: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#E9D5FF',
    fontWeight: '600',
  },
  templateBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  templateBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  scrollView: {
    flex: 1,
    marginTop: -20,
  },
  scrollViewContent: {
    paddingTop: 40,
  },
  previewSection: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 25,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1E293B',
  },
  templateIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  templateIndicatorText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  certificateContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  certificateWrapper: {
    borderWidth: 2,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#fff',
  },
  generatingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  generatingGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  generatingText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  previewStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F8FAFC',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7C3AED',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  downloadButtonsContainer: {
    gap: 12,
    marginTop: 10,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  screenshotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    gap: 8,
    backgroundColor: '#fff',
  },
  screenshotButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  formSection: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 25,
  },
  inputHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#1E293B',
  },
  inputFilled: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  chipsContainer: {
    marginTop: 10,
  },
  chipsContent: {
    paddingRight: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    gap: 15,
    marginVertical: 20,
  },
  primaryButton: {
    flex: 2,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#7C3AED',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonDisabled: {
    shadowColor: 'transparent',
    elevation: 0,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 15,
    gap: 8,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 15,
    padding: 16,
    gap: 8,
    backgroundColor: '#fff',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FEF3C7',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    gap: 12,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  bottomSpacing: {
    height: 30,
  },
});

export default CertificateScreen;