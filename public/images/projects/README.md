# Project Screenshots & Images

This directory should contain screenshots and images for the project details modal.

## Image Organization

Images should be named with the project ID as a prefix followed by a number:
- `{project-id}-1.jpg`
- `{project-id}-2.jpg`
- `{project-id}-3.jpg`

### Examples:
- `unityai-scene-builder-1.jpg`
- `unityai-scene-builder-2.jpg`
- `mini-diamond-hunt-1.jpg`
- `azeroth-survivors-1.jpg`

## Image Specifications

- **Format**: JPG, PNG, or WebP
- **Resolution**: 1280x720 or higher (16:9 aspect ratio recommended)
- **File Size**: Keep under 500KB per image for optimal loading
- **Content**: Clear screenshots showing key features, UI, or gameplay

## Tips for Screenshots

1. **Capture at high resolution** - Take screenshots at native resolution or higher
2. **Show key features** - Focus on the most impressive or important aspects
3. **Clean UI** - Remove debug info, personal data, or development artifacts
4. **Consistent style** - Use similar lighting, themes, or settings across images
5. **Compress optimally** - Use tools like TinyPNG or ImageOptim to reduce file size while maintaining quality

## Fallback Behavior

If images are not available:
- The modal will display a placeholder with an icon and message
- The modal will still show all other project information (description, features, links, etc.)
- This ensures the modal remains functional even without images

## Adding Images to Projects

Edit `src/lib/projects.ts` and add the `images` array to your project:

```typescript
{
  id: 'my-project',
  title: 'My Project',
  // ... other fields
  images: [
    '/images/projects/my-project-1.jpg',
    '/images/projects/my-project-2.jpg',
    '/images/projects/my-project-3.jpg'
  ]
}
```
