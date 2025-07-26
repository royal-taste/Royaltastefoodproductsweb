import { useState } from 'react';
import { ContactFormType, ContactFormSchema } from '../../shared/types';

interface FormErrors {
  [key: string]: string;
}

export function useContactForm() {
  const [formData, setFormData] = useState<ContactFormType>({
    name: '',
    email: '',
    phone: '',
    subject: 'Product Inquiry',
    message: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const updateField = (field: keyof ContactFormType, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    try {
      ContactFormSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const formErrors: FormErrors = {};
      error.errors?.forEach((err: any) => {
        const field = err.path[0];
        formErrors[field] = err.message;
      });
      setErrors(formErrors);
      return false;
    }
  };

  const submitForm = async (): Promise<boolean> => {
    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: 'Product Inquiry',
          message: ''
        });
        return true;
      } else {
        setSubmitStatus('error');
        return false;
      }
    } catch (error) {
      // Log error only in development
      if (import.meta.env.DEV) {
        console.error('Form submission error:', error);
      }
      setSubmitStatus('error');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    updateField,
    submitForm
  };
}
