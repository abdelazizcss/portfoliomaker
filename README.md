# Portfolio Maker

Portfolio Maker is a modern web application that allows users to create professional portfolios quickly and easily using a unified template. Built with Next.js, Chakra UI, NextAuth.js, and Supabase.

## ✨ Features

- 🎨 **Beautiful UI** - Built with Chakra UI for a modern, responsive design
- 🔐 **GitHub Authentication** - Secure login with GitHub OAuth
- 📊 **Dashboard** - Intuitive interface for managing portfolio content
- 🚀 **Instant Portfolios** - Generate professional portfolios in minutes
- 🌙 **Dark Mode** - Support for light and dark themes
- 📱 **Responsive Design** - Works perfectly on all devices
- 💼 **Project Showcase** - Display your projects with descriptions and technologies
- 🔗 **Social Links** - Connect all your professional social profiles
- 📄 **CV Integration** - Upload and link to your resume

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI Library**: Chakra UI 2.x
- **Authentication**: NextAuth.js with GitHub OAuth
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Deployment**: Vercel (Frontend), Supabase (Backend)
- **Icons**: React Icons

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- GitHub account for OAuth
- Supabase account for database

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Next.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # GitHub OAuth
   GITHUB_ID=your-github-client-id
   GITHUB_SECRET=your-github-client-secret
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚙️ Configuration

### GitHub OAuth Setup

1. Go to GitHub Settings > Developer settings > OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to your `.env.local`

### Supabase Setup

1. Create a new Supabase project
2. Create the following tables in your database:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR NOT NULL,
  username VARCHAR UNIQUE,
  avatar_url TEXT,
  github_username VARCHAR,
  github_url TEXT,
  bio TEXT,
  location VARCHAR,
  website TEXT,
  linkedin TEXT,
  twitter TEXT,
  cv_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR NOT NULL,
  description TEXT,
  github_link TEXT,
  demo_link TEXT,
  technologies TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Social Links table
CREATE TABLE social_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  platform VARCHAR NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

3. Set up Row Level Security (RLS) policies
4. Copy your project URL and keys to `.env.local`

## 📁 Project Structure

```
portfolio-app/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   └── auth/          # NextAuth.js routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # User dashboard
│   │   ├── portfolio/         # Portfolio display pages
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   ├── lib/                   # Utility libraries
│   ├── theme/                 # Chakra UI theme
│   └── types/                 # TypeScript types
├── public/                    # Static assets
└── package.json
```

## 🎯 Usage

1. **Sign Up**: Visit the homepage and click "Get Started"
2. **Authenticate**: Sign in with your GitHub account
3. **Set Up Profile**: Complete your profile information in the dashboard
4. **Add Projects**: Add your projects with descriptions and technologies
5. **Share**: Share your portfolio using the generated URL

## 🌐 Deployment

### Deploy to Vercel

✅ **نعم، يمكنك استضافة الواجهة والخلفية معًا على Vercel!**

تطبيق Next.js يمكن أن يستضيف كلا من:
- واجهة المستخدم (الصفحات والمكونات)
- واجهة برمجة التطبيقات (API Routes)

هذا يعني أنه يمكنك نشر التطبيق بالكامل على Vercel دون الحاجة إلى خدمة استضافة منفصلة للخلفية. خدمات API تعمل كوظائف خادمية (Serverless Functions) على Vercel.

لتفاصيل أكثر حول النشر على Vercel، اتبع الخطوات في [دليل النشر على Vercel](./VERCEL_DEPLOY_GUIDE_AR.md).

خطوات سريعة للنشر:
1. ارفع الكود إلى GitHub
2. قم بتسجيل الدخول إلى [Vercel](https://vercel.com)
3. أنشئ مشروع جديد واختر مستودع GitHub الخاص بك
4. أضف متغيرات البيئة المطلوبة
5. اضغط على زر "Deploy"

### Environment Variables for Production

تأكد من ضبط جميع متغيرات البيئة في منصة النشر:
- `NEXTAUTH_URL` (عنوان موقعك في الإنتاج)
- `NEXTAUTH_SECRET` (مفتاح سري للتشفير)
- `GITHUB_ID` (معرف تطبيق GitHub OAuth)
- `GITHUB_SECRET` (سر تطبيق GitHub OAuth)
- `NEXT_PUBLIC_SUPABASE_URL` (رابط مشروع Supabase)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` (المفتاح العام لـ Supabase)
- `SUPABASE_SERVICE_ROLE_KEY` (مفتاح خدمة Supabase)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Chakra UI](https://chakra-ui.com/) for the beautiful component library
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Supabase](https://supabase.com/) for the backend infrastructure
- [Vercel](https://vercel.com/) for hosting

## 📞 Support

If you have any questions or need help, please open an issue or contact the maintainers.

---

**Portfolio Maker** - Create professional portfolios in minutes! 🚀
