/**
 * تطبيق تحديث قاعدة البيانات لإضافة حقل رابط الموقع المنشور
 * 
 * هذا السكريبت يقوم بتنفيذ ملف SQL لإضافة عمود deployed_site_url إلى جدول المستخدمين
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// قراءة متغيرات البيئة من ملف .env.local إذا كان موجوداً
try {
  const envFile = path.join(__dirname, '.env.local');
  if (fs.existsSync(envFile)) {
    const envContent = fs.readFileSync(envFile, 'utf8');
    envContent.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
  }
} catch (error) {
  console.error('خطأ في قراءة ملف .env.local:', error);
}

// التحقق من متغيرات البيئة
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('خطأ: متغيرات البيئة غير محددة بشكل صحيح');
  console.error('تأكد من وجود NEXT_PUBLIC_SUPABASE_URL و SUPABASE_SERVICE_ROLE_KEY في ملف .env.local');
  process.exit(1);
}

// إنشاء عميل Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// قراءة ملف SQL
const sqlFilePath = path.join(__dirname, 'add_deployed_url_field.sql');
if (!fs.existsSync(sqlFilePath)) {
  console.error(`خطأ: ملف SQL غير موجود في المسار: ${sqlFilePath}`);
  process.exit(1);
}

const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');

// تنفيذ استعلام SQL
async function executeQuery() {
  try {
    console.log('جاري تنفيذ استعلام SQL لإضافة حقل deployed_site_url...');
    const { error } = await supabase.rpc('exec_sql', { query: sqlQuery });

    if (error) {
      console.error('خطأ في تنفيذ الاستعلام:', error.message);
      return;
    }

    console.log('تم تنفيذ الاستعلام بنجاح. تم إضافة حقل deployed_site_url إلى جدول المستخدمين.');
    
    // التحقق من وجود العمود في الجدول
    const { data, error: tableError } = await supabase
      .from('users')
      .select('deployed_site_url')
      .limit(1);

    if (tableError) {
      if (tableError.code === '42703') {
        console.error('خطأ: لم يتم إضافة العمود بشكل صحيح');
      } else {
        console.error('خطأ في التحقق من الجدول:', tableError.message);
      }
      return;
    }

    console.log('تم التحقق من وجود العمود بنجاح. قاعدة البيانات جاهزة لاستخدام ميزة نشر المواقع.');
  } catch (err) {
    console.error('خطأ غير متوقع:', err);
  }
}

executeQuery();
