import { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, Barber, Service } from '../lib/supabase';

export default function BookingPage() {
  const { t, isRTL, language } = useLanguage();
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<string>('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [customerName, setCustomerName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBarbers();
    fetchServices();
  }, []);

  const fetchBarbers = async () => {
    const { data } = await supabase
      .from('barbers')
      .select('*')
      .eq('active', true)
      .order('name');
    if (data) setBarbers(data);
  };

  const fetchServices = async () => {
    const { data } = await supabase.from('services').select('*').order('price');
    if (data) setServices(data);
  };

  const handleSubmit = async () => {
    if (!selectedBarber || !selectedService || !appointmentDate || !appointmentTime) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from('appointments').insert({
      barber_id: selectedBarber,
      service_id: selectedService,
      customer_name: customerName,
      appointment_date: appointmentDate,
      appointment_time: appointmentTime,
    });

    setIsSubmitting(false);

    if (error) {
      alert('Error booking appointment');
    } else {
      alert('Appointment confirmed!');
      setSelectedBarber('');
      setSelectedService('');
      setCustomerName('');
      setAppointmentDate('');
      setAppointmentTime('');
    }
  };

  const getServiceName = (service: Service) => {
    if (language === 'ku') return service.name_ku;
    if (language === 'ar') return service.name_ar;
    return service.name;
  };

  const timeSlots = [
    '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM', '07:00 AM',
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM',
    '08:00 PM', '09:00 PM', '10:00 PM',
  ];

  return (
    <div className="min-h-screen bg-slate-800" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-t-2xl p-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {t('bookYourAppointment')}
              </h1>
              <p className="text-white/90">{t('selectPreferredBarber')}</p>
            </div>

            <div className="bg-white rounded-b-2xl p-8 shadow-xl">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                  {t('chooseYourBarber')}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {barbers.map((barber) => (
                    <button
                      key={barber.id}
                      onClick={() => setSelectedBarber(barber.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-center font-semibold text-slate-800 ${
                        selectedBarber === barber.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-slate-200 hover:border-orange-300'
                      }`}
                    >
                      {barber.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold text-slate-800 mb-4">
                  {t('selectService')}
                </h2>
                <div className="space-y-3">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`w-full p-5 rounded-xl border-2 transition-all text-${
                        isRTL ? 'right' : 'left'
                      } ${
                        selectedService === service.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-slate-200 hover:border-orange-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-800 mb-1">
                        {getServiceName(service)}
                      </div>
                      <div className="text-slate-500">
                        {service.price.toLocaleString()} {t('iqd')}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <label className="block text-slate-800 font-bold mb-2">
                  {t('yourName')} <span className="text-slate-500 font-normal">{t('optional')}</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={t('enterYourName')}
                  className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div>
                  <label className="flex items-center gap-2 text-slate-800 font-bold mb-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    {t('date')}
                  </label>
                  <input
                    type="date"
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-slate-800 font-bold mb-2">
                    <Clock className="w-5 h-5 text-orange-500" />
                    {t('time')}
                  </label>
                  <select
                    value={appointmentTime}
                    onChange={(e) => setAppointmentTime(e.target.value)}
                    className="w-full p-4 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:outline-none bg-white"
                  >
                    <option value="">{t('selectTime')}</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-slate-500 hover:bg-slate-600 text-white font-bold py-4 px-6 rounded-xl transition-colors disabled:opacity-50"
              >
                {t('confirmAppointment')}
              </button>
            </div>
          </div>

          <div className="lg:w-96">
            <div className="bg-white rounded-2xl p-6 shadow-xl sticky top-8">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">
                  {t('hoursOfOperation')}
                </h3>
                <div className="space-y-2">
                  <div>
                    <div className="text-slate-700 font-semibold">{t('friday')}</div>
                    <div className="text-orange-500 font-bold">10:00 AM - 12:00 AM</div>
                  </div>
                  <div>
                    <div className="text-slate-700 font-semibold">{t('otherDays')}</div>
                    <div className="text-orange-500 font-bold">2:00 AM - 10:00 PM</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800 mb-3">
                  {t('ourBarbers')}
                </h3>
                <div className="space-y-2">
                  {barbers.map((barber) => (
                    <div key={barber.id} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-slate-700">{barber.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-3">
                  {t('services')}
                </h3>
                <div className="space-y-3">
                  {services.map((service) => (
                    <div key={service.id}>
                      <div className="text-slate-700 font-medium">
                        {getServiceName(service)}
                      </div>
                      <div className="text-orange-500 font-bold">
                        {service.price.toLocaleString()} {t('iqd')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
