# GDG Wrapped Frontend

A modern, interactive web application showcasing Google Developer Groups activities and achievements. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern React Architecture**: Built with Next.js 14 and TypeScript
- **GDSC Branding**: Custom gradient themes matching official Google Developer Student Clubs colors
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Library**: Comprehensive set of reusable UI components
- **Performance Optimized**: Fast loading and smooth interactions
- **Accessibility**: WCAG compliant components with proper ARIA support

## 📦 Installation

Before you start, make sure you have a recent version of Node.js installed. You can download Node.js from [here](https://nodejs.org/en/download/).

### Clone the repository:

```sh
git clone https://github.com/GDGBabcockUniversity/gdg-wrapped-frontend-hacktoberfest.git
```

### Navigate into the project directory

```sh
cd gdg-wrapped-frontend-hacktoberfest
```

### Create your local environment file

```sh
cp .env.example .env.local

```

###  Update API URL

NEXT_PUBLIC_API_BASE_URL=https://gdsc-wrapped.onrender.com

### Install the dependencies:

```sh
npm install 
```

## 🛠️ Development

### To start the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### To create an optimized build:

```sh
npm run build
```

### To start the application in production mode:

```sh
npm run start
```

### To run tests:

```sh
npm run test
```

### To run linting:

```sh
npm run lint
```

## 🎨 Custom Theming

This project uses Tailwind CSS for styling and includes custom theme extensions specifically designed for GDSC branding.

### GDSC Gradient

We have a custom gradient defined for GDSC branding colors (blue, red, yellow, green).

**Config Key**: `gdsc-gradient` (in tailwind.config.ts)  
**Class Name**: `bg-gdsc-gradient`

Use this class whenever you need to apply the official GDSC brand gradient to a background.

**Example Usage**:
```jsx
<div className="bg-gdsc-gradient text-white p-4 rounded-lg">
  GDSC Branded Content
</div>
```

### Color Palette

- **Blue**: `#4285F4` (Google Blue)
- **Red**: `#EA4335` (Google Red)  
- **Yellow**: `#FBBC04` (Google Yellow)
- **Green**: `#34A853` (Google Green)

## 🧩 Component Library

The project includes a comprehensive component library located in `/src/components/`. For detailed documentation on available components, see [Component Documentation](./src/components/README.md).

### Available Components:

- **PrimaryButton**: Versatile button with GDSC gradient support
- **Card**: Flexible content containers
- **Loading**: Multiple loading animations
- **Input**: Feature-rich form inputs
- **Modal**: Customizable modal dialogs
- **Badge**: Status and label indicators

### Quick Import:

```tsx
import { PrimaryButton, Card, Loading } from '@/components';
```

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── layouts/            # Layout components
├── services/           # API services
├── types/              # TypeScript type definitions
└── utilities/          # Helper functions
```

## 🤝 Contributing

We welcome contributions to improve the GDG Wrapped Frontend! Please see our [Contributing Guidelines](./CONTRIBUTING.md) for details.

### Steps to Contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines:

- Follow TypeScript best practices
- Use the GDSC gradient theme for branding elements
- Ensure components are accessible (WCAG compliant)
- Write meaningful commit messages
- Test your changes across different browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔗 Links

- [GDG Babcock University](https://gdg.community.dev/gdg-babcock-university/)
- [Google Developer Student Clubs](https://developers.google.com/community/gdsc)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)

## 🆘 Support

If you have any questions or need help, please:

1. Check the [documentation](./src/components/README.md)
2. Open an [issue](https://github.com/GDGBabcockUniversity/gdg-wrapped-frontend-hacktoberfest/issues)
3. Contact the maintainers

---

Made with ❤️ by the GDG Babcock University community