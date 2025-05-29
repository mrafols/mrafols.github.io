# PWA Icons Requirements

## Required Icons for PWA

To complete the PWA setup, the following icons are needed in the `/assets/img/` directory:

### App Icons (Square, with padding)
- `icon-192x192.png` - 192x192px (required for PWA)
- `icon-512x512.png` - 512x512px (required for PWA)
- `icon-maskable-192x192.png` - 192x192px (maskable for Android)
- `icon-maskable-512x512.png` - 512x512px (maskable for Android)

### Favicon Variants
- `favicon-16x16.png` - 16x16px
- `favicon-32x32.png` - 32x32px
- `favicon-96x96.png` - 96x96px

### Apple Touch Icons
- `apple-touch-icon.png` - 180x180px (already exists)
- `apple-touch-icon-152x152.png` - 152x152px (for iPad)
- `apple-touch-icon-167x167.png` - 167x167px (for iPad Pro)

### Microsoft Tiles
- `mstile-150x150.png` - 150x150px
- `mstile-310x310.png` - 310x310px

## Design Guidelines

1. **Base Design**: Use the existing logo/branding from the portfolio
2. **Colors**: Primary blue (#0c77f2) on white background
3. **Padding**: For app icons, include 20% padding around the logo
4. **Maskable Icons**: Include 40% safe area for adaptive icons

## Current Status

✅ `apple-touch-icon.png` - Exists
✅ `favicon.png` - Exists
❌ `icon-192x192.png` - Missing (critical for PWA)
❌ `icon-512x512.png` - Missing (critical for PWA)
❌ Other variants - Missing

## Instructions

1. Create the base 512x512 icon with the portfolio logo
2. Generate all required sizes from the base icon
3. Update manifest.json to reference the correct icon paths
4. Test the PWA installation on mobile devices

## Tools for Icon Generation

- Use online tools like RealFaviconGenerator.net
- Or use command line tools like ImageMagick
- Adobe Illustrator/Photoshop for manual creation

Example ImageMagick commands:
```bash
# Generate from base 512x512 image
convert icon-512x512.png -resize 192x192 icon-192x192.png
convert icon-512x512.png -resize 32x32 favicon-32x32.png
convert icon-512x512.png -resize 16x16 favicon-16x16.png
```
