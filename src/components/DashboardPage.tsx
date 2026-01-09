import { useState, useEffect } from 'react';
import { Calendar, Clock, Users, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { supabase, Barber, Appointment, Service } from '../lib/supabase';

interface AppointmentWithDetails extends Appointment {
  barber?: Barber;
  service?: Service;
}

export default function DashboardPage() {
  const { t, isRTL } = useLanguage();
  const [barbers, setBarbers] = useState<Barber[]>([]);
  const [appointments, setAppointments] = useState<AppointmentWithDetails[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [barbersRes, appointmentsRes, servicesRes] = await Promise.all([
      supabase.from('barbers').select('*').eq('active', true).order('name'),
      supabase.from('appointments').select('*').order('appointment_date', { ascending: true }),
      supabase.from('services').select('*'),
    ]);

    if (barbersRes.data) setBarbers(barbersRes.data);
    if (servicesRes.data) setServices(servicesRes.data);

    if (appointmentsRes.data && barbersRes.data && servicesRes.data) {
      const appointmentsWithDetails = appointmentsRes.data.map((apt) => ({
        ...apt,
        barber: barbersRes.data.find((b) => b.id === apt.barber_id),
        service: servicesRes.data.find((s) => s.id === apt.service_id),
      }));
      setAppointments(appointmentsWithDetails);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter((apt) => apt.appointment_date === today);

  const getUpcomingAppointments = (barberId: string) => {
    const now = new Date();
    return appointments.filter((apt) => {
      const aptDate = new Date(apt.appointment_date);
      return apt.barber_id === barberId && aptDate >= now;
    });
  };

  const getTodayAppointments = (barberId: string) => {
    return todaysAppointments.filter((apt) => apt.barber_id === barberId);
  };

  const getTotalAppointments = (barberId: string) => {
    return appointments.filter((apt) => apt.barber_id === barberId).length;
  };

  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm(t('confirmCancel'))) {
      (async () => {
        const { error } = await supabase
          .from('appointments')
          .delete()
          .eq('id', appointmentId);

        if (!error) {
          alert(t('appointmentCancelled'));
          fetchData();
        } else {
          alert('Error cancelling appointment');
        }
      })();
    }
  };

  return (
    <div className="min-h-screen bg-slate-800" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 mb-2">{t('totalAppointments')}</div>
                <div className="text-4xl font-bold text-slate-800">{appointments.length}</div>
              </div>
              <Calendar className="w-16 h-16 text-blue-200" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 mb-2">{t('todaysBookings')}</div>
                <div className="text-4xl font-bold text-slate-800">{todaysAppointments.length}</div>
              </div>
              <Clock className="w-16 h-16 text-orange-200" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-slate-600 mb-2">{t('activeBarbers')}</div>
                <div className="text-4xl font-bold text-slate-800">{barbers.length}</div>
              </div>
              <Users className="w-16 h-16 text-purple-200" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {barbers.map((barber) => {
            const upcomingApts = getUpcomingAppointments(barber.id);
            const todayApts = getTodayAppointments(barber.id);
            const totalApts = getTotalAppointments(barber.id);

            return (
              <div key={barber.id} className="bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">{barber.name}</h2>
                  <div className="text-right">
                    <div className="text-white/80 text-sm">{t('upcoming')}</div>
                    <div className="text-4xl font-bold text-white">{upcomingApts.length}</div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <div className="text-slate-600 mb-1">{t('total')}</div>
                      <div className="text-3xl font-bold text-slate-800">{totalApts}</div>
                    </div>
                    <div>
                      <div className="text-slate-600 mb-1">{t('today')}</div>
                      <div className="text-3xl font-bold text-orange-500">{todayApts.length}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-800 mb-3">{t('upcomingAppointments')}</h3>
                    {upcomingApts.length === 0 ? (
                      <p className="text-center text-slate-400 py-8">{t('noUpcomingAppointments')}</p>
                    ) : (
                      <div className="space-y-2 max-h-64 overflow-y-auto">
                        {upcomingApts.slice(0, 5).map((apt) => (
                          <div
                            key={apt.id}
                            className="p-3 bg-slate-50 rounded-lg border border-slate-200"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex-1">
                                <div className="font-semibold text-slate-800">
                                  {apt.customer_name || 'Anonymous'}
                                </div>
                                <div className="text-sm text-slate-600">
                                  {apt.service?.name}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium text-slate-700">
                                  {new Date(apt.appointment_date).toLocaleDateString()}
                                </div>
                                <div className="text-sm text-slate-600">{apt.appointment_time}</div>
                              </div>
                              <button
                                onClick={() => handleCancelAppointment(apt.id)}
                                className="p-1.5 text-red-500 hover:bg-red-50 rounded transition-colors"
                                title={t('cancel')}
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-slate-700 rounded-2xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-6">{t('allAppointments')}</h2>
          {appointments.length === 0 ? (
            <p className="text-center text-slate-400 py-12">{t('noAppointmentsYet')}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                      {t('yourName')}
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                      {t('chooseYourBarber')}
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                      {t('selectService')}
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                      {t('date')}
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                      {t('time')}
                    </th>
                    <th className="text-left py-3 px-4 text-slate-300 font-semibold">
                      {t('cancel')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="border-b border-slate-600/50 hover:bg-slate-600/30">
                      <td className="py-3 px-4 text-white">
                        {apt.customer_name || 'Anonymous'}
                      </td>
                      <td className="py-3 px-4 text-white">{apt.barber?.name}</td>
                      <td className="py-3 px-4 text-white">{apt.service?.name}</td>
                      <td className="py-3 px-4 text-white">
                        {new Date(apt.appointment_date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-white">{apt.appointment_time}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleCancelAppointment(apt.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded transition-colors"
                          title={t('cancel')}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
