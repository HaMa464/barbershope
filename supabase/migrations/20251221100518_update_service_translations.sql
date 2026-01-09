/*
  # Update Service Translations

  1. Changes
    - Update Kurdish translations to use correct terms
    - Ensure all translations are accurate for GitHub deployment
*/

UPDATE services
SET name_ku = 'ردێن کردن'
WHERE name = 'Beard Trim';

UPDATE services
SET name_ku = 'قژ + ردێن'
WHERE name = 'Hair + Beard';