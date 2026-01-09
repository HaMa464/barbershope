import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Barber {
  id: string;
  name: string;
  active: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  name_ku: string;
  name_ar: string;
  price: number;
  created_at: string;
}

export interface Appointment {
  id: string;
  barber_id: string;
  service_id: string;
  customer_name: string;
  appointment_date: string;
  appointment_time: string;
  created_at: string;
}
