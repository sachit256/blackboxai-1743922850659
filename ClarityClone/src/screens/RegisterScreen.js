import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COLORS } from '../constants/colors';
import { FONTS, SPACING } from '../constants/fonts';
import Button from '../components/Button';
import Input from '../components/Input';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Please confirm your password'),
});

const RegisterScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    try {
      setLoading(true);
      // TODO: Implement actual registration logic here
      console.log('Register values:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to main app after successful registration
      navigation.replace('MainApp');
    } catch (error) {
      console.error('Registration error:', error);
      // TODO: Show error message to user
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Start your mindfulness journey today</Text>
      </View>

      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={handleRegister}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <Input
              label="Full Name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder="Enter your full name"
              error={errors.name}
              touched={touched.name}
              autoCapitalize="words"
            />

            <Input
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Enter your email"
              keyboardType="email-address"
              error={errors.email}
              touched={touched.email}
              autoCapitalize="none"
            />

            <Input
              label="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="Create a password"
              secureTextEntry
              error={errors.password}
              touched={touched.password}
            />

            <Input
              label="Confirm Password"
              value={values.confirmPassword}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              placeholder="Confirm your password"
              secureTextEntry
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />

            <Button
              title="Create Account"
              onPress={handleSubmit}
              loading={loading}
              style={styles.registerButton}
            />

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.dividerLine} />
            </View>

            <Button
              title="Sign up with Google"
              variant="outline"
              onPress={() => {/* TODO: Implement Google Sign Up */}}
              style={styles.socialButton}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    padding: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONTS.sizes.xxxl,
    fontWeight: FONTS.weights.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.sizes.md,
    color: COLORS.text.secondary,
  },
  form: {
    marginTop: SPACING.lg,
  },
  registerButton: {
    marginBottom: SPACING.xl,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.text.secondary,
    paddingHorizontal: SPACING.md,
    fontSize: FONTS.sizes.sm,
  },
  socialButton: {
    marginBottom: SPACING.xl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: COLORS.text.secondary,
    fontSize: FONTS.sizes.sm,
  },
  signInText: {
    color: COLORS.primary,
    fontSize: FONTS.sizes.sm,
    fontWeight: FONTS.weights.medium,
  },
});

export default RegisterScreen;