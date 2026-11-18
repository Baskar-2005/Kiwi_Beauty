import {useEffect, useState, type FormEvent} from 'react';
import {Calendar, CheckCircle2, Clock, MessageCircle} from 'lucide-react';
import {STUDIO_CONFIG} from '../config/studioConfig';
import {
  buildBookingWhatsAppMessage,
  buildWhatsAppUrl,
  validateBookingEnquiry,
  type BookingEnquiryForm,
  type BookingServiceType,
} from '../utils/studioLogic';

interface BookingSectionProps {
  preselectedType: BookingServiceType;
  preselectedInterest?: string;
}

const SERVICE_OPTIONS: BookingServiceType[] = [
  'Beauty Service',
  'Tattoo',
  'Consultation',
];

const TIME_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '01:00 PM',
  '03:00 PM',
  '04:30 PM',
  '06:00 PM',
  '07:00 PM',
];

export function BookingSection({
  preselectedType,
  preselectedInterest,
}: BookingSectionProps) {
  const [form, setForm] = useState<BookingEnquiryForm>({
    name: '',
    phone: '',
    serviceType: preselectedType,
    specificInterest: preselectedInterest || '',
    preferredDate: '',
    preferredTime: '11:30 AM',
    message: '',
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof BookingEnquiryForm, string>>
  >({});
  const [submittedEnquiry, setSubmittedEnquiry] =
    useState<BookingEnquiryForm | null>(null);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      serviceType: preselectedType,
      specificInterest: preselectedInterest || '',
    }));
    setSubmittedEnquiry(null);
  }, [preselectedType, preselectedInterest]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validateBookingEnquiry(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setSubmittedEnquiry({...form});
  };

  const quickWhatsAppMessage =
    form.serviceType === 'Tattoo'
      ? STUDIO_CONFIG.whatsappMessages.tattoo
      : form.serviceType === 'Beauty Service'
        ? STUDIO_CONFIG.whatsappMessages.beauty
        : STUDIO_CONFIG.whatsappMessages.consultation;

  return (
    <section
      id="book"
      className="py-16 sm:py-20 lg:py-24 bg-[#F7F4EE] border-t border-[#141312]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Context Column */}
          <div className="lg:col-span-5">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7B6B5B]">
              Appointments &amp; Enquiries
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#141312]">
              Book Your Session
            </h2>
            <p className="mt-4 text-base text-[#4C4640] leading-relaxed">
              Reserve time for beauty care, discuss a custom tattoo idea, or
              schedule an in-studio consultation in {STUDIO_CONFIG.city}.
            </p>

            <div className="mt-8 space-y-4 pt-6 border-t border-[#141312]/10 text-sm text-[#4C4640]">
              <div className="flex items-start gap-3">
                <Clock
                  className="h-4 w-4 mt-0.5 text-[#8B7355] shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[#141312]">Studio Hours</p>
                  <p className="tabular-nums">
                    {STUDIO_CONFIG.openingDays} · {STUDIO_CONFIG.openingHours}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar
                  className="h-4 w-4 mt-0.5 text-[#8B7355] shrink-0"
                  aria-hidden="true"
                />
                <div>
                  <p className="font-semibold text-[#141312]">
                    Direct Confirmation
                  </p>
                  <p>
                    Send your preferred date and time here, or message directly
                    on WhatsApp for immediate slot confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-[#EFE9DF]/55 border border-[#141312]/12 rounded-2xl p-5 sm:p-8 lg:p-10">
            {submittedEnquiry ? (
              <div className="space-y-6" data-testid="booking-confirmation">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2
                    className="h-6 w-6 text-[#141312] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#141312]">
                      Appointment Request Ready
                    </h3>
                    <p className="mt-1.5 text-sm text-[#4C4640]">
                      Thank you, {submittedEnquiry.name}. Your enquiry details
                      are prepared below — send them on WhatsApp for the fastest
                      studio confirmation.
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-[#F7F4EE] border border-[#141312]/10 rounded-xl text-sm">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-[#7B6B5B]">
                      Service Type
                    </dt>
                    <dd className="mt-1 font-semibold text-[#141312]">
                      {submittedEnquiry.serviceType}
                      {submittedEnquiry.specificInterest
                        ? ` — ${submittedEnquiry.specificInterest}`
                        : ''}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-[#7B6B5B]">
                      Phone Number
                    </dt>
                    <dd className="mt-1 font-semibold tabular-nums text-[#141312]">
                      {submittedEnquiry.phone}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.14em] text-[#7B6B5B]">
                      Preferred Date &amp; Time
                    </dt>
                    <dd className="mt-1 font-semibold tabular-nums text-[#141312]">
                      {submittedEnquiry.preferredDate} ·{' '}
                      {submittedEnquiry.preferredTime}
                    </dd>
                  </div>
                  {submittedEnquiry.message && (
                    <div>
                      <dt className="text-[11px] uppercase tracking-[0.14em] text-[#7B6B5B]">
                        Notes
                      </dt>
                      <dd className="mt-1 text-[#2C2926]">
                        {submittedEnquiry.message}
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      STUDIO_CONFIG.whatsappNumber,
                      buildBookingWhatsAppMessage(submittedEnquiry),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 bg-[#141312] text-[#F7F4EE] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#2A2826] transition-colors"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Send Request via WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmittedEnquiry(null)}
                    className="inline-flex items-center justify-center min-h-[48px] px-6 py-3 border border-[#141312]/25 text-[#141312] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#EAE2D6] transition-colors cursor-pointer"
                  >
                    Edit Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-xs font-semibold tracking-[0.1em] uppercase text-[#2C2926]"
                    >
                      Name
                    </label>
                    <input
                      id="booking-name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm((prev) => ({...prev, name: e.target.value}))
                      }
                      placeholder="Your full name"
                      className="mt-2 w-full min-h-[46px] px-3.5 py-2.5 bg-[#F7F4EE] border border-[#141312]/20 rounded-lg text-sm text-[#141312] placeholder:text-[#8A8279] focus:outline-none focus:border-[#141312]"
                    />
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-[#9C2F2F]">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-xs font-semibold tracking-[0.1em] uppercase text-[#2C2926]"
                    >
                      Phone Number
                    </label>
                    <input
                      id="booking-phone"
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm((prev) => ({...prev, phone: e.target.value}))
                      }
                      placeholder="10-digit mobile / WhatsApp"
                      className="mt-2 w-full min-h-[46px] px-3.5 py-2.5 bg-[#F7F4EE] border border-[#141312]/20 rounded-lg text-sm tabular-nums text-[#141312] placeholder:text-[#8A8279] focus:outline-none focus:border-[#141312]"
                    />
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-[#9C2F2F]">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label
                      htmlFor="booking-service"
                      className="block text-xs font-semibold tracking-[0.1em] uppercase text-[#2C2926]"
                    >
                      Service
                    </label>
                    <select
                      id="booking-service"
                      name="serviceType"
                      value={form.serviceType}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          serviceType: e.target.value as BookingServiceType,
                        }))
                      }
                      className="mt-2 w-full min-h-[46px] px-3.5 py-2.5 bg-[#F7F4EE] border border-[#141312]/20 rounded-lg text-sm text-[#141312] focus:outline-none focus:border-[#141312]"
                    >
                      {SERVICE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block text-xs font-semibold tracking-[0.1em] uppercase text-[#2C2926]"
                    >
                      Preferred Date
                    </label>
                    <input
                      id="booking-date"
                      name="preferredDate"
                      type="date"
                      required
                      value={form.preferredDate}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          preferredDate: e.target.value,
                        }))
                      }
                      className="mt-2 w-full min-h-[46px] px-3.5 py-2.5 bg-[#F7F4EE] border border-[#141312]/20 rounded-lg text-sm tabular-nums text-[#141312] focus:outline-none focus:border-[#141312]"
                    />
                    {errors.preferredDate && (
                      <p className="mt-1.5 text-xs text-[#9C2F2F]">
                        {errors.preferredDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-time"
                      className="block text-xs font-semibold tracking-[0.1em] uppercase text-[#2C2926]"
                    >
                      Preferred Time
                    </label>
                    <select
                      id="booking-time"
                      name="preferredTime"
                      value={form.preferredTime}
                      onChange={(e) =>
                        setForm((prev) => ({
                          ...prev,
                          preferredTime: e.target.value,
                        }))
                      }
                      className="mt-2 w-full min-h-[46px] px-3.5 py-2.5 bg-[#F7F4EE] border border-[#141312]/20 rounded-lg text-sm tabular-nums text-[#141312] focus:outline-none focus:border-[#141312]"
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                    {errors.preferredTime && (
                      <p className="mt-1.5 text-xs text-[#9C2F2F]">
                        {errors.preferredTime}
                      </p>
                    )}
                  </div>
                </div>

                {form.specificInterest && (
                  <div className="flex items-center justify-between px-3.5 py-2 bg-[#F7F4EE] border border-[#141312]/12 rounded-lg text-xs text-[#4C4640]">
                    <span>
                      Selected focus:{' '}
                      <strong className="text-[#141312]">
                        {form.specificInterest}
                      </strong>
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({...prev, specificInterest: ''}))
                      }
                      className="underline text-[#5A544E] hover:text-[#141312] cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="booking-message"
                    className="block text-xs font-semibold tracking-[0.1em] uppercase text-[#2C2926]"
                  >
                    Message
                  </label>
                  <textarea
                    id="booking-message"
                    name="message"
                    rows={3}
                    value={form.message}
                    onChange={(e) =>
                      setForm((prev) => ({...prev, message: e.target.value}))
                    }
                    placeholder="Share your beauty service needs, tattoo idea, approximate size, or questions..."
                    className="mt-2 w-full px-3.5 py-2.5 bg-[#F7F4EE] border border-[#141312]/20 rounded-lg text-sm text-[#141312] placeholder:text-[#8A8279] focus:outline-none focus:border-[#141312]"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 bg-[#141312] text-[#F7F4EE] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#2A2826] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    Request Appointment
                  </button>

                  <a
                    href={buildWhatsAppUrl(
                      STUDIO_CONFIG.whatsappNumber,
                      quickWhatsAppMessage,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 border border-[#141312]/30 text-[#141312] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#EAE2D6]/80 transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
