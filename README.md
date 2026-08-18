# Pushkar Chaudhary - Frontend Developer Portfolio

A modern, responsive portfolio website showcasing my frontend development projects and skills. Built with React, Vite, and Tailwind CSS with a focus on performance and accessibility.

## 🌐 Live Demo

Visit the live portfolio: **https://pushkar-codes.netlify.app**

## 🛠️ Tech Stack

- **React** 18+ - UI library
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Icons** - Icon library
- **Formspree** - Form submissions

## ✨ Features

- **Responsive Design** - Works seamlessly on all devices
- **Dark Mode Support** - Light/dark theme toggle
- **SEO Optimized** - JSON-LD structured data, meta tags, sitemap
- **Fast Performance** - Optimized bundle size, lazy loading
- **Accessible** - WCAG 2.1 compliant with proper aria labels
- **Hero Slider** - Animated image carousel
- **Project Showcase** - Featured and regular projects with demo links
- **Contact Form** - Direct messaging via Formspree
- **Timeline** - Educational and career journey

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── AboutMe.jsx       # Home page about section
│   ├── HeroSlider.jsx    # Image carousel
│   ├── Navbar.jsx        # Navigation bar with dark mode
│   ├── SEO.jsx           # Meta tags & structured data
│   ├── Theme.jsx         # Theme toggle component
│   └── TypingText.jsx    # Animated typing effect
├── pages/
│   ├── About.jsx         # About page with timeline
│   ├── contact.jsx       # Contact form page
│   ├── Dashboard.jsx     # Dashboard page
│   ├── Footer.jsx        # Footer with social links
│   ├── Home.jsx          # Home/landing page
│   └── Projects.jsx      # Projects showcase
├── assets/               # Images and static files
├── App.jsx               # Main app component
├── App.css               # App styles
├── index.css             # Global styles
└── main.jsx              # Entry point
```

## 🚀 Deployment

The portfolio is automatically deployed via **Netlify** and **Vercel**.

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel --prod
```

## 🔍 SEO & Google Indexing

The portfolio is optimized for search engines with:
- Automatic sitemap generation (`/sitemap.xml`)
- robots.txt configuration
- JSON-LD structured data (Person schema)
- Optimized meta tags and descriptions
- Mobile-friendly responsive design

**Google Search Console**: https://search.google.com/search-console

## 📊 Performance

- **Bundle Size**: ~296 KB JavaScript (95 KB gzipped)
- **CSS**: 33.55 KB (7.57 KB gzipped)
- **Build Time**: ~2.3 seconds
- **Lighthouse Score**: Optimized for Core Web Vitals

## 🎨 Customization

### Change Theme Colors
Edit Tailwind config or CSS variables in `src/index.css`

### Update Projects
Modify the projects array in `src/pages/Projects.jsx`

### Add New Pages
1. Create new component in `src/pages/`
2. Add route in `src/App.jsx`
3. Update navigation links

## 📝 Content to Update

- Profile image: `public/about-me.jpg`
- Social links in Navbar and Footer
- Project information and demo links
- Contact form endpoint (Formspree)
- Meta descriptions for better SEO

## 🤝 Contributing

This is a personal portfolio. For suggestions or improvements, feel free to reach out!

## 📧 Contact

- **Email**: pushkarchaudhary256@gmail.com
- **GitHub**: https://github.com/Pushkar-Chaudhary
- **LinkedIn**: https://www.linkedin.com/in/anik-chy/
- **Twitter/X**: https://x.com/pushkar_chau07

## 📄 License

© 2026 Pushkar Chaudhary. All rights reserved.

---

**Last Updated**: 2026-08-18
**Status**: ✅ Production Ready
