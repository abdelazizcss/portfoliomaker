#!/usr/bin/env node

/**
 * حل مشكلة RLS في Supabase
 * يجب تنفيذ هذا السكريبت بعد تنفيذ الأوامر SQL في لوحة تحكم Supabase
 */

console.log('\n🚨 تم تحديد المشكلة: سياسات أمان الصفوف (RLS) في Supabase تمنع إضافة بيانات المستخدم! 🚨\n');

console.log('💡 الحل:\n');
console.log('1️⃣ انتقل إلى لوحة تحكم Supabase (https://app.supabase.io)');
console.log('2️⃣ اختر مشروعك وانتقل إلى قسم "SQL Editor"');
console.log('3️⃣ انسخ الأوامر التالية وقم بتنفيذها:');

console.log(`
-- تعطيل سياسات أمان الصفوف على جدول المستخدمين
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- منح جميع الصلاحيات للمستخدم المجهول (anon)
GRANT ALL PRIVILEGES ON TABLE users TO anon;
GRANT USAGE ON SCHEMA public TO anon;
`);

console.log('4️⃣ بعد تنفيذ هذه الأوامر، قم بإعادة تشغيل التطبيق وتجربة حفظ البروفايل مرة أخرى.\n');

console.log('📌 ملاحظة مهمة: هذا الحل هو لبيئة التطوير فقط! في الإنتاج، يجب استخدام سياسات RLS مناسبة للأمان.\n');

console.log('🔍 لماذا حدثت المشكلة؟');
console.log('سياسات RLS تقييد الوصول إلى البيانات. في هذه الحالة، كانت سياسة RLS منعت إدراج بيانات جديدة.');
console.log('الخطأ الذي ظهر: "new row violates row-level security policy for table "users""');
console.log('هذا يعني أن سياسة RLS تمنع المستخدم المجهول (anon) من إضافة صفوف في جدول users.\n');

console.log('✅ بعد تعطيل RLS، سيتمكن التطبيق من إدراج وتحديث البيانات في قاعدة البيانات بنجاح!\n');

// دعونا نتحقق من حالة التطبيق الحالية
const fs = require('fs');
const path = require('path');

// تحقق من وجود ملف التكوين
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('💾 تم العثور على ملف .env.local - تكوين Supabase متاح.');
  
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('NEXT_PUBLIC_SUPABASE_URL') && 
        envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY')) {
      console.log('✅ مفاتيح Supabase موجودة في ملف التكوين.');
    }
  } catch (e) {
    console.log('⚠️ حدث خطأ أثناء قراءة ملف التكوين.');
  }
}

console.log('\n🎉 حظًا موفقًا! المشروع جميل ويستحق الإكمال! 🎉');
