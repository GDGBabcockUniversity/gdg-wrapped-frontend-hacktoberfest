# Contributing to GDG Wrapped Frontend

Thank you for your interest in contributing to the GDG Wrapped Frontend! This document provides guidelines and instructions for contributing to this project.

## 🤝 How to Contribute

### Reporting Issues

1. **Check existing issues** before creating a new one
2. **Use descriptive titles** that clearly explain the problem
3. **Provide detailed information** including:
   - Steps to reproduce the issue
   - Expected vs actual behavior
   - Browser and OS information
   - Screenshots or code snippets if applicable

### Submitting Pull Requests

1. **Fork the repository** to your GitHub account
2. **Create a new branch** from `main` for your feature/fix
3. **Make your changes** following our coding standards
4. **Test thoroughly** across different browsers and devices
5. **Update documentation** if necessary
6. **Submit a pull request** with a clear description

## 🏗️ Development Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Git

### Local Development

```bash
# Clone your fork
git clone https://github.com/your-username/gdg-wrapped-frontend-hacktoberfest.git

# Navigate to the project directory
cd gdg-wrapped-frontend-hacktoberfest

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 📝 Coding Standards

### TypeScript

- Use **strict TypeScript** configuration
- Define **proper interfaces** for all props and data structures
- Use **type guards** when necessary
- Avoid `any` types - use specific types or `unknown`

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

// Avoid
interface ButtonProps {
  label: any;
  onClick: any;
  variant?: any;
}
```

### React Components

- Use **functional components** with hooks
- Implement **proper error boundaries** where needed
- Use **forwardRef** for components that need ref access
- Follow **single responsibility principle**

```tsx
// Good
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ label, onClick, variant = 'primary' }, ref) => {
    return (
      <button ref={ref} onClick={onClick} className={getVariantClasses(variant)}>
        {label}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### Styling Guidelines

- Use **Tailwind CSS** classes for styling
- Implement **responsive design** with mobile-first approach
- Use **GDSC gradient** for branding elements
- Ensure **accessibility** with proper contrast ratios

```tsx
// Good - Uses GDSC gradient and responsive classes
<div className="bg-gdsc-gradient text-white p-4 md:p-6 rounded-lg shadow-lg">
  Content
</div>
```

### Naming Conventions

- **Components**: PascalCase (`PrimaryButton`, `LoadingSpinner`)
- **Files**: PascalCase for components (`PrimaryButton.tsx`)
- **Variables/Functions**: camelCase (`handleClick`, `isLoading`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: kebab-case (handled by Tailwind)

## 🎨 Design Guidelines

### GDSC Brand Colors

Always use the official GDSC colors for consistency:

- **Blue**: `#4285F4`
- **Red**: `#EA4335`
- **Yellow**: `#FBBC04`
- **Green**: `#34A853`

### Component Design Principles

1. **Consistency**: Follow established patterns from existing components
2. **Accessibility**: Include proper ARIA labels and keyboard navigation
3. **Responsiveness**: Ensure components work on all screen sizes
4. **Performance**: Optimize for fast loading and smooth interactions
5. **Flexibility**: Make components configurable with props

### Creating New Components

When creating new components, include:

1. **TypeScript interfaces** for all props
2. **Default props** for optional properties
3. **Multiple variants** when applicable
4. **GDSC gradient support** for branding
5. **Comprehensive documentation**
6. **Accessibility features**

Example component structure:

```tsx
export interface NewComponentProps {
  // Required props
  content: string;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const NewComponent: React.FC<NewComponentProps> = ({
  content,
  variant = 'primary',
  size = 'md',
  className = '',
}) => {
  // Component implementation
};
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write **unit tests** for utility functions
- Write **integration tests** for components
- Use **React Testing Library** for component testing
- Test **accessibility** features
- Test **responsive behavior**

## 📚 Documentation

### Component Documentation

When adding or updating components:

1. **Update component README** in `/src/components/README.md`
2. **Include usage examples** with code snippets
3. **Document all props** with types and descriptions
4. **Add accessibility notes** where relevant

### Code Comments

- Use **JSDoc comments** for functions and components
- Explain **complex logic** with inline comments
- Document **API integrations** and external dependencies
- Include **TODO comments** for future improvements

```typescript
/**
 * Calculates the appropriate CSS classes for button variants
 * @param variant - The button variant type
 * @param size - The button size
 * @returns CSS class string
 */
const getButtonClasses = (variant: ButtonVariant, size: ButtonSize): string => {
  // Implementation
};
```

## 🚀 Deployment

The project automatically deploys when changes are merged to the `main` branch. Ensure your changes:

- **Pass all tests** and linting checks
- **Build successfully** without warnings
- **Work correctly** in production environment
- **Don't break** existing functionality

## 🎯 Contribution Types

We welcome various types of contributions:

### 🐛 Bug Fixes
- Fix existing issues
- Improve error handling
- Resolve performance problems

### ✨ New Features
- Add new UI components
- Implement new functionality
- Enhance user experience

### 📖 Documentation
- Improve README files
- Add code examples
- Create tutorials or guides

### 🎨 Design Improvements
- Enhance visual design
- Improve accessibility
- Optimize responsive layouts

### ⚡ Performance Optimizations
- Reduce bundle size
- Improve loading times
- Optimize animations

## 🏆 Recognition

Contributors will be recognized in:

- Project README
- Release notes
- Hall of Fame section (if implemented)

## ❓ Getting Help

If you need help or have questions:

1. **Check the documentation** first
2. **Search existing issues** for similar problems
3. **Join our community** discussions
4. **Create a new issue** with detailed information

## 📋 Pull Request Checklist

Before submitting a pull request, ensure:

- [ ] Code follows project standards and conventions
- [ ] All tests pass successfully
- [ ] Documentation is updated (if applicable)
- [ ] Changes are responsive and accessible
- [ ] GDSC branding guidelines are followed
- [ ] No console errors or warnings
- [ ] Pull request description is clear and detailed

## 🎉 Thank You!

Thank you for contributing to the GDG Wrapped Frontend! Your contributions help make this project better for the entire GDG community.

---

For any questions about contributing, please reach out to the maintainers or open an issue.
