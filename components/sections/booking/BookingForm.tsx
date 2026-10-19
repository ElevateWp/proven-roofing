'use client';

import React, { useState } from 'react';
import { SERVICES, CLINIC_INFO } from '@/lib/clinic-data';
import Button from '@/components/ui/Button';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  service: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  service?: string;
  preferredDate?: string;
}

export default function BookingForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    service: 'roof-repairs',
    preferredDate: '',
    preferredTime: 'Morning (09:00 – 12:00)',
    notes: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      newErrors.phone = 'Please provide a valid phone number.';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Please select a preferred quote request date.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief technical triage intake
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="p-8 md:p-12 bg-forest text-paper transition-all duration-500 ease-nova-ease">
        <span className="font-body text-13 text-lime block mb-2 font-medium uppercase tracking-wider">
          Request Received
        </span>
      <h3 className="font-display text-33 md:text-41 text-paper mb-4">
          Quote request received
        </h3>
        <p className="font-body text-17 text-paper/90 leading-relaxed mb-6">
          Thank you, {formData.fullName}. Our team will review your request and contact you at <strong className="text-lime">{formData.phone}</strong> to discuss an assessment.
        </p>

        <div className="p-6 bg-paper/10 border border-mist/20 mb-8 space-y-2 font-body text-15">
          <div className="flex justify-between">
            <span className="text-paper/60">Requested service:</span>
            <span className="text-paper font-medium">
              {SERVICES.find((s) => s.slug === formData.service)?.name || formData.service}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-paper/60">Preferred Date:</span>
            <span className="text-paper font-medium">{formData.preferredDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-paper/60">Preferred Window:</span>
            <span className="text-paper font-medium">{formData.preferredTime}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                fullName: '',
                phone: '',
                email: '',
                service: 'roof-repairs',
                preferredDate: '',
                preferredTime: 'Morning (09:00 – 12:00)',
                notes: '',
              });
            }}
            className="text-paper border-paper/30 hover:border-paper hover:bg-paper/10"
          >
            Submit another request
          </Button>
          <a
            href={`tel:${CLINIC_INFO.contact.phone.replace(/[^0-9+]/g, '')}`}
            className="font-body text-13 text-paper/80 hover:text-lime underline underline-offset-4"
          >
            Need help? Call: {CLINIC_INFO.contact.phone}
          </a>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 md:p-12 bg-paper border border-mist flex flex-col space-y-6"
      noValidate
    >
      <div>
        <h3 className="font-display text-26 md:text-33 text-forest-ink mb-2">
          Request a Roofing Quote
        </h3>
        <p className="font-body text-15 text-forest-ink/70">
          Tell us what you would like to improve. Our team will contact you to discuss the project and next steps.
        </p>
      </div>

      {/* Full Name */}
      <div className="flex flex-col space-y-1.5">
        <label htmlFor="fullName" className="font-body text-13 text-forest-ink/70">
          Full Name <span className="text-forest">*</span>
        </label>
        <input
          id="fullName"
          type="text"
          value={formData.fullName}
          onChange={(e) => {
            setFormData({ ...formData, fullName: e.target.value });
            if (errors.fullName) setErrors({ ...errors, fullName: undefined });
          }}
          placeholder="e.g. Eleanor Vance"
          className="w-full px-4 py-3 text-15 focus:border-forest transition-colors"
          required
        />
        {errors.fullName && (
          <span className="font-body text-13 text-[#68798D] transition-all duration-200">
            {errors.fullName}
          </span>
        )}
      </div>

      {/* Phone & Email Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="phone" className="font-body text-13 text-forest-ink/70">
            Telephone Number <span className="text-forest">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => {
              setFormData({ ...formData, phone: e.target.value });
              if (errors.phone) setErrors({ ...errors, phone: undefined });
            }}
            placeholder="+353 87 069 0272"
            className="w-full px-4 py-3 text-15 focus:border-forest transition-colors"
            required
          />
          {errors.phone && (
            <span className="font-body text-13 text-[#68798D]">{errors.phone}</span>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="email" className="font-body text-13 text-forest-ink/70">
            Email Address <span className="text-forest">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
              if (errors.email) setErrors({ ...errors, email: undefined });
            }}
            placeholder="eleanor@example.com"
            className="w-full px-4 py-3 text-15 focus:border-forest transition-colors"
            required
          />
          {errors.email && (
            <span className="font-body text-13 text-[#68798D]">{errors.email}</span>
          )}
        </div>
      </div>

      {/* Service Selection */}
      <div className="flex flex-col space-y-1.5">
        <label htmlFor="service" className="font-body text-13 text-forest-ink/70">
          Project Type <span className="text-forest">*</span>
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className="w-full px-4 py-3 text-15 focus:border-forest transition-colors bg-paper cursor-pointer"
        >
          {SERVICES.map((s) => (
            <option key={s.slug} value={s.slug}>
              {s.name}
            </option>
          ))}
          <option value="general-consultation">Other roofing work project</option>
        </select>
      </div>

      {/* Preferred Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col space-y-1.5">
          <label htmlFor="preferredDate" className="font-body text-13 text-forest-ink/70">
            Preferred Date <span className="text-forest">*</span>
          </label>
          <input
            id="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={(e) => {
              setFormData({ ...formData, preferredDate: e.target.value });
              if (errors.preferredDate) setErrors({ ...errors, preferredDate: undefined });
            }}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 text-15 focus:border-forest transition-colors"
            required
          />
          {errors.preferredDate && (
            <span className="font-body text-13 text-[#68798D]">{errors.preferredDate}</span>
          )}
        </div>

        <div className="flex flex-col space-y-1.5">
          <label htmlFor="preferredTime" className="font-body text-13 text-forest-ink/70">
            Preferred Time
          </label>
          <select
            id="preferredTime"
            value={formData.preferredTime}
            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
            className="w-full px-4 py-3 text-15 focus:border-forest transition-colors bg-paper cursor-pointer"
          >
            <option value="Morning (08:00 – 12:00)">Morning (08:00 – 12:00)</option>
            <option value="Afternoon (12:00 – 16:00)">Afternoon (12:00 – 16:00)</option>
            <option value="Late Afternoon (16:00 – 17:30)">Late Afternoon (16:00 – 17:30)</option>
          </select>
        </div>
      </div>

      {/* Additional project notes */}
      <div className="flex flex-col space-y-1.5">
        <label htmlFor="notes" className="font-body text-13 text-forest-ink/70">
          Tell Us About the Work (Optional)
        </label>
        <textarea
          id="notes"
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Tell us what you would like to change, the rooms involved and any details about your project..."
          className="w-full px-4 py-3 text-15 focus:border-forest transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-mist flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button
          type="submit"
          variant="forest"
          size="lg"
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? 'Sending request...' : 'Request a Quote'}
        </Button>
        <span className="font-body text-13 text-forest-ink/60">
          Your details will be used to respond to your enquiry.
        </span>
      </div>
    </form>
  );
}
