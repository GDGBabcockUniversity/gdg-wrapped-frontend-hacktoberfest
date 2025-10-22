# Accessibility Testing Guide

This guide provides comprehensive instructions for testing accessibility features in the GDG Wrapped Frontend application.

## 🎯 Overview

Accessibility testing ensures our application is usable by people with disabilities and follows WCAG 2.1 guidelines. This includes users who rely on:

- Screen readers
- Keyboard navigation
- Voice recognition software
- High contrast modes
- Reduced motion settings

## 🛠️ Testing Tools

### Automated Testing Tools

1. **axe DevTools** (Browser Extension)
   - Install from Chrome/Firefox extension store
   - Run automated accessibility scans
   - Provides detailed violation reports

2. **WAVE** (Web Accessibility Evaluation Tool)
   - Browser extension for visual accessibility testing
   - Identifies errors, alerts, and features

3. **Lighthouse Accessibility Audit**
   - Built into Chrome DevTools
   - Provides accessibility score and recommendations

4. **Pa11y** (Command Line Tool)
   ```bash
   npm install -g pa11y
   pa11y http://localhost:3000
   ```

### Manual Testing Tools

1. **Screen Readers**
   - **macOS**: VoiceOver (built-in)
   - **Windows**: NVDA (free) or JAWS
   - **Linux**: Orca

2. **Keyboard Navigation**
   - Test using only Tab, Shift+Tab, Enter, Space, and Arrow keys

3. **Browser Developer Tools**
   - Accessibility tree inspection
   - Focus outline testing
   - Color contrast analysis

## 🔍 Testing Checklist

### Keyboard Navigation

- [ ] All interactive elements are reachable via Tab key
- [ ] Tab order is logical and intuitive
- [ ] Focus indicators are clearly visible
- [ ] Enter/Space keys activate buttons and links
- [ ] Escape key closes modals and dropdowns
- [ ] Arrow keys navigate through menus and lists
- [ ] No keyboard traps (focus can always move)

**How to Test:**
1. Unplug your mouse or use only keyboard
2. Navigate through the entire application
3. Verify all functionality is accessible

### Screen Reader Testing

- [ ] All images have appropriate alt text
- [ ] Headings are properly structured (h1, h2, h3, etc.)
- [ ] Form labels are associated with inputs
- [ ] Error messages are announced
- [ ] Dynamic content changes are announced
- [ ] Skip links are present and functional

**How to Test:**
1. Enable screen reader (VoiceOver on Mac: Cmd+F5)
2. Navigate through the application
3. Listen for clear, meaningful announcements

### Visual Testing

- [ ] Text has sufficient color contrast (4.5:1 minimum)
- [ ] UI elements maintain 3:1 contrast ratio
- [ ] Content is readable at 200% zoom
- [ ] No information conveyed by color alone
- [ ] Focus indicators are visible and clear
- [ ] Text spacing can be increased without loss of functionality

**How to Test:**
1. Use browser zoom to test at 200%
2. Check color contrast with DevTools
3. Test with high contrast mode enabled

### Motor Disabilities

- [ ] Click targets are at least 44x44 pixels
- [ ] Sufficient spacing between interactive elements
- [ ] Drag and drop has keyboard alternatives
- [ ] No content requires precise timing
- [ ] Hover content is accessible via keyboard

### Cognitive Disabilities

- [ ] Clear and simple language
- [ ] Consistent navigation patterns
- [ ] Error messages are clear and helpful
- [ ] Important actions have confirmation dialogs
- [ ] Users can control time-sensitive content

## 🧪 Component-Specific Tests

### PrimaryButton Component

```tsx
// Test all variants and states
<PrimaryButton 
  label="Test Button" 
  onClick={handleClick}
  aria-label="Detailed description for screen readers"
  disabled={false}
  loading={false}
/>
```

**Tests:**
- [ ] Button announces label correctly
- [ ] Disabled state prevents interaction
- [ ] Loading state announces "loading" or similar
- [ ] Focus indicator is visible
- [ ] Activated by Enter and Space keys

### Input Component

```tsx
// Test with proper labeling
<Input
  label="Email Address"
  placeholder="Enter your email"
  required
  errorText="Please enter a valid email"
  aria-describedby="email-help"
/>
```

**Tests:**
- [ ] Label is announced with input
- [ ] Required attribute is announced
- [ ] Error messages are announced immediately
- [ ] Placeholder text is accessible
- [ ] Focus moves logically between fields

### Modal Component

```tsx
// Test focus management
<Modal
  isOpen={true}
  onClose={handleClose}
  title="Confirmation Dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
>
  <p id="modal-description">Are you sure you want to continue?</p>
</Modal>
```

**Tests:**
- [ ] Focus moves to modal when opened
- [ ] Focus is trapped within modal
- [ ] Escape key closes modal
- [ ] Focus returns to trigger when closed
- [ ] Modal content is announced properly

## 🔬 Advanced Testing

### Screen Reader Commands

**VoiceOver (macOS):**
- `VO + A`: Read all
- `VO + Right Arrow`: Next item
- `VO + Left Arrow`: Previous item
- `VO + U`: Rotor menu
- `Control`: Stop speaking

**NVDA (Windows):**
- `Insert + Down Arrow`: Say all
- `H`: Next heading
- `F`: Next form field
- `B`: Next button
- `Insert + F7`: Elements list

### Reduced Motion Testing

```css
/* Test with reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  /* Animations should be minimal or disabled */
}
```

**How to Test:**
1. Enable reduced motion in OS settings
2. Verify animations are reduced or removed
3. Ensure functionality isn't lost

### High Contrast Testing

**Windows:**
- Left Alt + Left Shift + Print Screen

**macOS:**
- System Preferences > Accessibility > Display > Increase Contrast

**Tests:**
- [ ] All content remains visible
- [ ] Borders and focus indicators are clear
- [ ] Custom colors adapt appropriately

## 🐛 Common Issues and Fixes

### Missing Alt Text
```tsx
// ❌ Bad
<img src="logo.png" />

// ✅ Good
<img src="logo.png" alt="GDG Babcock University Logo" />

// ✅ Decorative images
<img src="decoration.png" alt="" role="presentation" />
```

### Poor Color Contrast
```css
/* ❌ Bad - insufficient contrast */
.text { color: #777; background: #fff; } /* 2.8:1 ratio */

/* ✅ Good - sufficient contrast */
.text { color: #333; background: #fff; } /* 4.5:1 ratio */
```

### Missing Form Labels
```tsx
// ❌ Bad
<input type="email" placeholder="Email" />

// ✅ Good
<label htmlFor="email">Email Address</label>
<input id="email" type="email" placeholder="Enter your email" />
```

### Keyboard Traps
```tsx
// ❌ Bad - focus gets trapped
const Modal = () => {
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault(); // Don't do this!
    }
  };
  // ...
};

// ✅ Good - proper focus management
const Modal = () => {
  // Use FocusTrap component or proper focus cycling
};
```

## 📊 Accessibility Scoring

### Target Scores
- **WAVE**: 0 errors, minimal alerts
- **Lighthouse**: 95+ accessibility score
- **axe DevTools**: 0 violations

### Regular Testing Schedule
- **Daily**: Automated tests in CI/CD
- **Weekly**: Manual keyboard testing
- **Monthly**: Full screen reader testing
- **Release**: Comprehensive accessibility audit

## 📚 Resources

### Documentation
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices-1.1/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)

### Tools
- [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/)
- [Accessibility Insights](https://accessibilityinsights.io/)
- [Stark (Figma Plugin)](https://www.getstark.co/)

### Communities
- [A11Y Slack Community](https://web-a11y.slack.com/)
- [WebAIM Mailing List](https://webaim.org/discussion/)
- [Accessibility Reddit](https://www.reddit.com/r/accessibility/)

## 🎉 Success Criteria

Your feature is accessibility-ready when:

1. ✅ Automated tools show no critical violations
2. ✅ All functionality works with keyboard only
3. ✅ Screen readers announce content clearly
4. ✅ Content is readable at 200% zoom
5. ✅ Color contrast meets WCAG AA standards
6. ✅ Focus indicators are always visible
7. ✅ Error states are clearly communicated
8. ✅ No accessibility regressions in testing

Remember: Accessibility is not a checklist - it's about creating inclusive experiences for all users!
