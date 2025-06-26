-- هذا الملف يجب تنفيذه في محرر SQL في Supabase Dashboard

-- تعطيل سياسات أمان الصفوف على جدول المستخدمين
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- منح جميع الصلاحيات للمستخدم المجهول (anon)
GRANT ALL PRIVILEGES ON TABLE users TO anon;
GRANT USAGE ON SCHEMA public TO anon;

-- تأكد من عدم وجود سياسات تمنع الإدراج
DROP POLICY IF EXISTS "Users can insert own profile" ON users;

-- تعطيل RLS على جداول أخرى قد تكون مرتبطة
ALTER TABLE IF EXISTS projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS social_links DISABLE ROW LEVEL SECURITY;

-- منح صلاحيات إضافية
GRANT ALL PRIVILEGES ON TABLE projects TO anon;
GRANT ALL PRIVILEGES ON TABLE social_links TO anon;
