-- حل نهائي لمشاكل RLS في Supabase
-- قم بتنفيذ هذا الملف في محرر SQL في Supabase Dashboard

-- تعطيل سياسات أمان الصفوف (RLS) على جميع الجداول الرئيسية
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE projects DISABLE ROW LEVEL SECURITY;
ALTER TABLE social_links DISABLE ROW LEVEL SECURITY;

-- تأكد من عدم وجود سياسات قد تمنع العمليات
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can delete own profile" ON users;

DROP POLICY IF EXISTS "Users can view projects" ON projects;
DROP POLICY IF EXISTS "Users can insert own projects" ON projects;
DROP POLICY IF EXISTS "Users can update own projects" ON projects;
DROP POLICY IF EXISTS "Users can delete own projects" ON projects;

DROP POLICY IF EXISTS "Users can view social links" ON social_links;
DROP POLICY IF EXISTS "Users can insert own social links" ON social_links;
DROP POLICY IF EXISTS "Users can update own social links" ON social_links;
DROP POLICY IF EXISTS "Users can delete own social links" ON social_links;

-- منح جميع الصلاحيات للمستخدم المجهول (للتطوير فقط!)
GRANT ALL PRIVILEGES ON TABLE users TO anon;
GRANT ALL PRIVILEGES ON TABLE projects TO anon;
GRANT ALL PRIVILEGES ON TABLE social_links TO anon;
GRANT USAGE ON SCHEMA public TO anon;

-- ملاحظة: بعد الانتهاء من التطوير وقبل النشر للإنتاج، قم بإعادة تفعيل RLS
-- مع إضافة سياسات مناسبة تسمح للمستخدمين بالوصول إلى بياناتهم الخاصة فقط
-- على سبيل المثال:
/*
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid()::text = github_id);
CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid()::text = github_id);
*/
