import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ku' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const translations = {
  en: {
    premiumBarber: 'Premium Barber',
    bookNow: 'Book Now',
    dashboard: 'Dashboard',
    bookYourAppointment: 'Book Your Appointment',
    selectPreferredBarber: 'Select your preferred barber and time slot',
    chooseYourBarber: 'Choose Your Barber',
    selectService: 'Select Service',
    yourName: 'Your Name',
    optional: '(Optional)',
    enterYourName: 'Enter your name',
    date: 'Date',
    time: 'Time',
    selectTime: 'Select time',
    confirmAppointment: 'Confirm Appointment',
    hoursOfOperation: 'Hours of Operation',
    friday: 'Friday',
    otherDays: 'Other Days',
    ourBarbers: 'Our Barbers',
    services: 'Services',
    totalAppointments: 'Total Appointments',
    todaysBookings: "Today's Bookings",
    activeBarbers: 'Active Barbers',
    upcoming: 'Upcoming',
    total: 'Total',
    today: 'Today',
    upcomingAppointments: 'Upcoming Appointments',
    noUpcomingAppointments: 'No upcoming appointments',
    allAppointments: 'All Appointments',
    noAppointmentsYet: 'No appointments yet',
    iqd: 'IQD',
    madeBy: 'Made by',
    cancel: 'Cancel',
    confirmCancel: 'Are you sure you want to cancel this appointment?',
    appointmentCancelled: 'Appointment cancelled successfully',
  },
  ku: {
    premiumBarber: 'سەلمانێری پریمیۆم',
    bookNow: 'نۆرە بگرە',
    dashboard: 'داشبۆرد',
    bookYourAppointment: 'نۆرەکەت بگرە',
    selectPreferredBarber: 'سەلمانێر و کاتەکەت هەڵبژێرە',
    chooseYourBarber: 'سەلمانێرەکەت هەڵبژێرە',
    selectService: 'خزمەتگوزاری هەڵبژێرە',
    yourName: 'ناوت',
    optional: '(ئارەزوومەندانە)',
    enterYourName: 'ناوت بنووسە',
    date: 'بەروار',
    time: 'کات',
    selectTime: 'کات هەڵبژێرە',
    confirmAppointment: 'نۆرە پشتڕاست بکەرەوە',
    hoursOfOperation: 'کاتی کارکردن',
    friday: 'هەینی',
    otherDays: 'ڕۆژانی تر',
    ourBarbers: 'سەلمانێرەکانمان',
    services: 'خزمەتگوزاریەکان',
    totalAppointments: 'کۆی نۆرەکان',
    todaysBookings: 'نۆرەکانی ئەمڕۆ',
    activeBarbers: 'سەلمانێرە چالاکەکان',
    upcoming: 'داهاتوو',
    total: 'کۆ',
    today: 'ئەمڕۆ',
    upcomingAppointments: 'نۆرە داهاتووەکان',
    noUpcomingAppointments: 'هیچ نۆرەیەکی داهاتوو نییە',
    allAppointments: 'هەموو نۆرەکان',
    noAppointmentsYet: 'هێشتا هیچ نۆرەیەک نییە',
    iqd: 'د.ع',
    madeBy: 'دروستکراوە لەلایەن',
    cancel: 'لابردن',
    confirmCancel: 'ئایا دڵنیایت کە دەتەوێ ئەم نۆرە لابدەی؟',
    appointmentCancelled: 'نۆرە بە سەرکەوتویی لابرا',
  },
  ar: {
    premiumBarber: 'حلاق بريميوم',
    bookNow: 'احجز الآن',
    dashboard: 'لوحة التحكم',
    bookYourAppointment: 'احجز موعدك',
    selectPreferredBarber: 'اختر الحلاق والوقت المفضل',
    chooseYourBarber: 'اختر الحلاق',
    selectService: 'اختر الخدمة',
    yourName: 'اسمك',
    optional: '(اختياري)',
    enterYourName: 'أدخل اسمك',
    date: 'التاريخ',
    time: 'الوقت',
    selectTime: 'اختر الوقت',
    confirmAppointment: 'تأكيد الموعد',
    hoursOfOperation: 'ساعات العمل',
    friday: 'الجمعة',
    otherDays: 'الأيام الأخرى',
    ourBarbers: 'حلاقونا',
    services: 'الخدمات',
    totalAppointments: 'إجمالي المواعيد',
    todaysBookings: 'حجوزات اليوم',
    activeBarbers: 'الحلاقون النشطون',
    upcoming: 'القادمة',
    total: 'الإجمالي',
    today: 'اليوم',
    upcomingAppointments: 'المواعيد القادمة',
    noUpcomingAppointments: 'لا توجد مواعيد قادمة',
    allAppointments: 'جميع المواعيد',
    noAppointmentsYet: 'لا توجد مواعيد بعد',
    iqd: 'د.ع',
    madeBy: 'صنع بواسطة',
    cancel: 'إلغاء',
    confirmCancel: 'هل تريد بالتأكيد إلغاء هذا الموعد؟',
    appointmentCancelled: 'تم إلغاء الموعد بنجاح',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  const isRTL = language === 'ar' || language === 'ku';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
