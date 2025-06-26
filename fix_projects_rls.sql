-- هذا الملف يجب تنفيذه في محرر SQL في Supabase Dashboard

-- تعطيل سياسات أمان الصفوف على جدول المشاريع
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;

-- منح جميع الصلاحيات للمستخدم المجهول (anon)
GRANT ALL PRIVILEGES ON TABLE projects TO anon;

-- تأكد من عدم وجود سياسات تمنع الإدراج
DROP POLICY IF EXISTS "Users can insert own projects" ON projects;

-- للتأكد من عدم وجود مشاكل مع الجداول المرتبطة
ALTER TABLE IF EXISTS social_links DISABLE ROW LEVEL SECURITY;
GRANT ALL PRIVILEGES ON TABLE social_links TO anon;
