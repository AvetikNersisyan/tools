import React, { useState } from 'react';
import { Modal } from './Modal';
import { leadsStorage, generateId } from '../utils/storage';
import { getCurrentISOString } from '../utils/time';
import { getContactUrls, CONTACT } from '../config';
import { PRODUCT } from '../data/sampleData';
import type { Lead, ContactMethod, ValidationErrors } from '../types';

/**
 * LeadForm component props
 */
interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

/**
 * Form data interface
 */
interface FormData {
  name: string;
  phone: string;
  email: string;
  preferred_contact: ContactMethod;
  note: string;
}

/**
 * Success state component
 */
const SuccessState: React.FC<{ 
  onClose: () => void; 
  contactUrl: string; 
  contactMethod: ContactMethod; 
}> = ({ onClose, contactUrl, contactMethod }) => {
  const handleContactClick = () => {
    window.open(contactUrl, '_blank');
    onClose();
  };

  const contactLabels = {
    phone: 'Զանգահարել հիմա',
    telegram: 'Բացել Telegram',
    whatsapp: 'Բացել WhatsApp',
  };

  return (
    <div className="text-center py-6">
      {/* Success icon */}
      <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>

      {/* Success message */}
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Շնորհակալություն ձեր հետաքրքրության համար:
      </h3>
      
      <p className="text-secondary mb-6 leading-relaxed">
        Ձեր տվյալները ստացվել են։ Մենք շուտով կկապվենք ձեզ հետ՝ քննարկելու ձեր կարիքները և տրամադրելու անհատական գնանշում {PRODUCT.title}-ի համար:
      </p>

      {/* Contact action */}
      <div className="space-y-4">
        <button
          onClick={handleContactClick}
          className="btn btn-primary btn-lg w-full"
        >
          <span className="mr-2">
            {contactMethod === 'phone' ? '📞' : 
             contactMethod === 'telegram' ? '💬' : 
             '📱'}
          </span>
          {contactLabels[contactMethod]}
        </button>

        <button
          onClick={onClose}
          className="btn btn-secondary w-full"
        >
          Շարունակել դիտարկումը
        </button>
      </div>

      {/* Additional contact info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-secondary mb-2">
          <strong>Alternative contact methods:</strong>
        </p>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span>📞 {CONTACT.PHONE}</span>
          <span>💬 @{CONTACT.TELEGRAM_USERNAME}</span>
          <span>📱 WhatsApp: {CONTACT.WHATSAPP_NUMBER}</span>
        </div>
      </div>
    </div>
  );
};

/**
 * Lead capture form with validation and contact integration
 */
export const LeadForm: React.FC<LeadFormProps> = ({ isOpen, onClose, className = '' }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    preferred_contact: 'whatsapp',
    note: '',
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [contactUrl, setContactUrl] = useState('');

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          preferred_contact: 'whatsapp',
          note: '',
        });
        setErrors({});
        setShowSuccess(false);
        setContactUrl('');
      }, 300);
    }
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Phone validation
    const phonePattern = /^[0-9+\-\s()]{6,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phonePattern.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Email validation (optional)
    if (formData.email.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Note validation (optional, but if provided should be reasonable length)
    if (formData.note.trim() && formData.note.trim().length > 500) {
      newErrors.note = 'Note must be less than 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create lead object
      const lead: Lead = {
        id: generateId(),
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        preferred_contact: formData.preferred_contact,
        note: formData.note.trim() || undefined,
        created_at: getCurrentISOString(),
      };

      // Save to localStorage
      leadsStorage.append(lead);

      // Generate contact URL
      const urls = getContactUrls(lead.name, PRODUCT.title);
      setContactUrl(urls[lead.preferred_contact]);

      // Track analytics
      if (window.trackEvent) {
        window.trackEvent('lead_submitted', {
          preferred_contact: lead.preferred_contact,
          has_email: Boolean(lead.email),
          has_note: Boolean(lead.note),
          name_length: lead.name.length,
          phone_length: lead.phone.length,
        });
      }

      // Show success state
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to submit lead:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (window.trackEvent) {
      window.trackEvent('lead_form_closed', {
        completed: showSuccess,
        had_data: Boolean(formData.name || formData.phone || formData.email),
      });
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={showSuccess ? undefined : 'Ստացեք ձեր գնանշումը'}
      className={className}
    >
      {showSuccess ? (
        <SuccessState
          onClose={handleClose}
          contactUrl={contactUrl}
          contactMethod={formData.preferred_contact}
        />
      ) : (
        <div>
          {/* Header */}
          <div className="text-center mb-6">
            <p className="text-lg text-secondary leading-relaxed">
              Ստացեք անմիջական գնանշում և անհատական խորհրդատվություն {PRODUCT.title}-ի համար։
              Պարտավորություն չի պահանջվում։
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* General error */}
            {errors.general && (
              <div className="alert alert-error">
                {errors.general}
              </div>
            )}

            {/* Name field */}
            <div className="field">
              <label htmlFor="lead-name" className="field-label">
                Լրիվ անուն *
              </label>
              <input
                id="lead-name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`input ${errors.name ? 'error' : ''}`}
                placeholder="Մուտքագրեք ձեր լրիվ անունը"
                disabled={isSubmitting}
                required
              />
              {errors.name && (
                <span className="field-error">{errors.name}</span>
              )}
            </div>

            {/* Phone field */}
            <div className="field">
              <label htmlFor="lead-phone" className="field-label">
                Հեռախոսահամար *
              </label>
              <input
                id="lead-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className={`input ${errors.phone ? 'error' : ''}`}
                placeholder="+1 (555) 123-4567"
                disabled={isSubmitting}
                required
              />
              {errors.phone && (
                <span className="field-error">{errors.phone}</span>
              )}
            </div>

            {/* Email field */}
            <div className="field">
              <label htmlFor="lead-email" className="field-label">
                Էլեկտրոնային հասցե (ցանկալի)
              </label>
              <input
                id="lead-email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`input ${errors.email ? 'error' : ''}`}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
              {errors.email && (
                <span className="field-error">{errors.email}</span>
              )}
            </div>

            {/* Preferred contact method */}
            <div className="field">
              <label htmlFor="lead-contact" className="field-label">
                Նախընտրելի կապի միջոց
              </label>
              <select
                id="lead-contact"
                value={formData.preferred_contact}
                onChange={(e) => handleInputChange('preferred_contact', e.target.value as ContactMethod)}
                className="input select"
                disabled={isSubmitting}
              >
                <option value="whatsapp">WhatsApp</option>
                <option value="phone">Հեռախոսային զանգ</option>
                <option value="telegram">Telegram</option>
              </select>
            </div>

            {/* Note field */}
            <div className="field">
              <label htmlFor="lead-note" className="field-label">
                Լրացուցիչ նշումներ (ցանկալի)
              </label>
              <textarea
                id="lead-note"
                value={formData.note}
                onChange={(e) => handleInputChange('note', e.target.value)}
                className={`input textarea ${errors.note ? 'error' : ''}`}
                placeholder="Պատմեք այն մասին, թե ինչ հատուկ կարիքներ կամ հարցեր ունեք..."
                rows={3}
                maxLength={500}
                disabled={isSubmitting}
              />
              {errors.note && (
                <span className="field-error">{errors.note}</span>
              )}
              <div className="text-sm text-secondary mt-1">
                {formData.note.length}/500 characters
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-lg w-full"
              >
                {isSubmitting && <div className="spinner mr-2" />}
                {isSubmitting ? 'Ուղարկվում է...' : 'Ստանալ գնանշում հիմա'}
              </button>
            </div>

            {/* Privacy note */}
            <p className="text-xs text-secondary text-center leading-relaxed">
              Այս ուղարկելով՝ դուք համաձայնվում եք, որ մեզ հետ կապ հաստատեն մեր ապրանքների մասին։
              Մենք հարգում ենք ձեր գաղտնիությունը և կապվում ենք միայն այս հարցումի նկատմամբ։
            </p>
          </form>
        </div>
      )}
    </Modal>
  );
};