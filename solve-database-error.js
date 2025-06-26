/**
 * سكريبت لعرض خطوات حل مشكلة "Database error" في تطبيق portfolio-maker
 */

console.log('\n🔧 خطوات حل مشكلة "Database error" عند حفظ البروفايل:\n');

console.log('1️⃣ الخطوة الأولى: التحقق من الاتصال بـ Supabase');
console.log('   - تأكد من أن مفاتيح الاتصال بـ Supabase صحيحة في ملف .env.local');
console.log('   - يمكنك تشغيل سكريبت test-supabase-fixed.js للتحقق من الاتصال:');
console.log('     $ node test-supabase-fixed.js\n');

console.log('2️⃣ الخطوة الثانية: تعطيل سياسات أمان الصفوف (RLS)');
console.log('   - قم بالذهاب إلى لوحة تحكم Supabase');
console.log('   - انتقل إلى قسم SQL Editor');
console.log('   - قم بتنفيذ محتوى ملف disable_rls.sql:');
console.log('     ALTER TABLE users DISABLE ROW LEVEL SECURITY;');
console.log('     ALTER TABLE projects DISABLE ROW LEVEL SECURITY;');
console.log('     ALTER TABLE social_links DISABLE ROW LEVEL SECURITY;\n');

console.log('3️⃣ الخطوة الثالثة: إنشاء الجداول إذا لم تكن موجودة');
console.log('   - قم بتنفيذ محتوى ملف create_tables.sql في SQL Editor');
console.log('   - هذا سيضمن إنشاء جميع الجداول والمؤشرات اللازمة\n');

console.log('4️⃣ الخطوة الرابعة: منح صلاحيات للمستخدم المجهول');
console.log('   - قم بتنفيذ الأوامر التالية في SQL Editor:');
console.log('     GRANT ALL PRIVILEGES ON TABLE users TO anon;');
console.log('     GRANT ALL PRIVILEGES ON TABLE projects TO anon;');
console.log('     GRANT ALL PRIVILEGES ON TABLE social_links TO anon;\n');

console.log('5️⃣ الخطوة الخامسة: إعادة تشغيل التطبيق وتجربة حفظ البروفايل');
console.log('   - $ npm run dev\n');

console.log('6️⃣ الخطوة السادسة: لاحقاً، عند الانتهاء من تطوير التطبيق، أعد تفعيل RLS وأضف سياسات مناسبة');
console.log('   - ALTER TABLE users ENABLE ROW LEVEL SECURITY;');
console.log('   - CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid()::text = github_id);\n');

console.log('✅ بعد تنفيذ هذه الخطوات، يجب أن تعمل ميزة حفظ البروفايل بشكل صحيح!');
console.log('   وإذا واجهت أي مشاكل أخرى، راجع سجلات التصحيح المضافة للحصول على مزيد من المعلومات.\n');
