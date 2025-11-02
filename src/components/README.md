# Components Documentation

This directory contains reusable UI components for the GDG Wrapped Frontend application.

## Available Components

### PrimaryButton
A versatile button component with multiple variants and GDSC branding support.

**Props:**
- `label` - Button text
- `onClick` - Click handler function
- `variant` - 'blue' | 'red' | 'green' | 'yellow' | 'gradient' | 'outline'
- `size` - 'small' | 'medium' | 'large'
- `disabled` - Boolean for disabled state
- `loading` - Boolean for loading state
- `icon` - Optional icon element
- `className` - Additional CSS classes

**Usage:**
```tsx
import { PrimaryButton } from '@/components/PrimaryButton';

<PrimaryButton 
  label="Get Started" 
  variant="gradient" 
  size="large"
  onClick={() => console.log('Clicked!')}
/>
```

### Card
A flexible card component for displaying content with various styling options.

**Props:**
- `children` - Content to display inside the card
- `variant` - 'default' | 'elevated' | 'outline' | 'filled'
- `size` - 'sm' | 'md' | 'lg' | 'xl'
- `padding` - 'none' | 'sm' | 'md' | 'lg'
- `rounded` - 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `shadow` - 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `interactive` - Boolean for hover effects
- `className` - Additional CSS classes

**Usage:**
```tsx
import { Card } from '@/components/Card';

<Card variant="elevated" size="md" interactive>
  <h3>Card Title</h3>
  <p>Card content goes here...</p>
</Card>
```

### Loading
A comprehensive loading component with multiple animation variants.

**Props:**
- `size` - 'sm' | 'md' | 'lg' | 'xl'
- `variant` - 'spinner' | 'dots' | 'pulse' | 'skeleton'
- `color` - 'primary' | 'secondary' | 'gdsc'
- `text` - Optional loading text
- `className` - Additional CSS classes

**Usage:**
```tsx
import { Loading } from '@/components/Loading';

<Loading 
  variant="dots" 
  color="gdsc" 
  text="Loading your data..."
/>
```

### Input
A feature-rich input component with multiple variants and validation states.

**Props:**
- `variant` - 'default' | 'outline' | 'filled' | 'flushed'
- `inputSize` - 'sm' | 'md' | 'lg'
- `status` - 'default' | 'error' | 'success' | 'warning'
- `label` - Optional label text
- `helperText` - Helper text for guidance
- `errorText` - Error message text
- `leftIcon` - Icon on the left side
- `rightIcon` - Icon on the right side
- `isRequired` - Boolean for required field
- `isDisabled` - Boolean for disabled state
- `isLoading` - Boolean for loading state

**Usage:**
```tsx
import { Input } from '@/components/Input';

<Input 
  label="Email Address"
  placeholder="Enter your email"
  variant="outline"
  status="default"
  isRequired
/>
```

### Modal
A customizable modal component with various sizes and behaviors.

**Props:**
- `isOpen` - Boolean to control modal visibility
- `onClose` - Function to handle modal closing
- `title` - Optional modal title
- `size` - 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `closeOnOverlayClick` - Boolean for overlay click behavior
- `closeOnEscape` - Boolean for escape key behavior
- `showCloseButton` - Boolean to show close button
- `children` - Modal content
- `className` - Additional CSS classes

**Usage:**
```tsx
import { Modal } from '@/components/Modal';

<Modal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Confirmation"
  size="md"
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

### Badge
A versatile badge component for labels, status indicators, and notifications.

**Props:**
- `children` - Badge content
- `variant` - 'solid' | 'outline' | 'subtle' | 'ghost'
- `colorScheme` - 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'pink' | 'gray' | 'gdsc'
- `size` - 'sm' | 'md' | 'lg'
- `className` - Additional CSS classes

**Usage:**
```tsx
import { Badge } from '@/components/Badge';

<Badge 
  variant="solid" 
  colorScheme="gdsc" 
  size="md"
>
  New Feature
</Badge>
```

## GDSC Gradient Theme

All components support the official GDSC gradient theme using the `gdsc` color option or `gradient` variant. This applies the brand colors:
- Blue (#4285F4)
- Red (#EA4335) 
- Yellow (#FBBC04)
- Green (#34A853)

## Best Practices

1. **Consistent Styling**: Use the GDSC gradient for primary actions and branding elements
2. **Accessibility**: All components include proper ARIA labels and keyboard navigation
3. **Performance**: Components are optimized with proper React patterns and memoization
4. **Type Safety**: Full TypeScript support with comprehensive interfaces
5. **Responsive Design**: Components adapt to different screen sizes

## Contributing

When adding new components:
1. Follow the existing naming conventions
2. Include comprehensive TypeScript interfaces
3. Support the GDSC gradient theme
4. Add proper documentation
5. Include accessibility features
6. Test across different browsers and devices
