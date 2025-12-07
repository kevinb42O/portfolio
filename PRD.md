# Planning Guide

A treasure trove portfolio website that transforms browsing developer projects into an exciting journey of discovery, revealing hidden gems and showcasing creative work with the reverence and presentation it deserves.

**Experience Qualities**:
1. **Curiosity-Driven** - The interface invites exploration through mystery, intrigue, and progressive revelation, making visitors want to uncover every project.
2. **Premium** - Each project is presented as a valuable artifact with museum-quality attention to detail, generous spacing, and rich visual presentation.
3. **Playful** - Interactions feel delightful and unexpected, with animations and micro-interactions that spark joy and maintain engagement throughout the browsing experience.

**Complexity Level**: Light Application (multiple features with basic state)
This is a project showcase with filtering, detailed views, and dynamic content loading from GitHub repositories, but remains focused on content presentation rather than complex state management.

## Essential Features

**Repository Fetching & Display**
- Functionality: Automatically fetches all public repositories from the user's GitHub account using the Spark user API and displays them as discoverable cards
- Purpose: Eliminates manual data entry and ensures the portfolio stays current with actual projects
- Trigger: On initial page load
- Progression: App loads → Fetch user info → Retrieve repositories → Parse and enrich data → Display project cards in grid
- Success criteria: All public repositories appear with metadata (name, description, language, stars, last updated)

**Project Card Reveal System**
- Functionality: Projects appear as mysterious cards that reveal details on hover/tap with smooth animations and visual flourishes
- Purpose: Creates the "hidden gems" discovery experience that makes browsing feel like treasure hunting
- Trigger: Mouse hover or tap on project card
- Progression: Cursor approaches card → Card lifts/glows → Details fade in → Screenshot reveals → Full information displayed
- Success criteria: Smooth 60fps animations, clear visual hierarchy, and satisfying interaction feedback

**Project Detail Modal**
- Functionality: Click any project to open an immersive full-screen view with screenshots, detailed description, tech stack, and links
- Purpose: Provides deep-dive information without leaving the browsing flow
- Trigger: Click on project card
- Progression: Card clicked → Modal slides up from card position → Full details animate in → User can navigate between projects → Close returns to grid
- Success criteria: Modal maintains scroll position, includes prev/next navigation, and feels native to the experience

**Dynamic Filtering & Search**
- Functionality: Filter projects by technology, language, or search by keyword with instant visual feedback
- Purpose: Helps visitors find specific types of work while maintaining the discovery aesthetic
- Trigger: Type in search bar or click filter tag
- Progression: User interacts with filter → Cards smoothly filter out → Remaining cards reflow → Empty state shows if no matches
- Success criteria: Sub-200ms filter response, smooth card repositioning, clear active filter states

**About Section**
- Functionality: A compelling personal introduction that establishes personality and credibility
- Purpose: Helps visitors connect with the creator behind the projects
- Trigger: Scroll to hero section or click about link
- Progression: Page loads → Hero section visible → User reads about section → Enticed to explore projects below
- Success criteria: Memorable copy that conveys expertise and personality, visually distinct from project grid

## Edge Case Handling

- **No Repositories Found**: Display a beautifully designed empty state with encouraging message and link to GitHub profile
- **Loading States**: Show skeleton cards with subtle shimmer effects that maintain layout during data fetch
- **Missing Screenshots**: Use generated gradient patterns or technology-based visuals when project images aren't available
- **Long Descriptions**: Truncate with elegant fade-out effect and "read more" expansion in modal view
- **Failed API Calls**: Graceful error message with retry button, maintaining the aesthetic quality of the site
- **Mobile Touch Interactions**: Cards reveal immediately on tap since hover states don't translate; optimized spacing for thumb navigation

## Design Direction

The design should evoke the feeling of discovering a secret gallery filled with precious artifacts - part museum exhibition, part treasure hunt. Think dark, rich backgrounds with projects that glow and shimmer like gems catching light. The aesthetic should be modern and sophisticated with unexpected playful touches that delight without feeling childish. It should feel exclusive and premium, like you've stumbled upon something truly special.

## Color Selection

A rich, dark jewel-toned palette that makes projects pop like illuminated treasures in a gallery.

- **Primary Color**: Deep cosmic purple `oklch(0.25 0.1 290)` - Creates a mysterious, premium foundation that suggests depth and sophistication
- **Secondary Colors**: 
  - Rich navy `oklch(0.2 0.05 250)` for cards and elevated surfaces
  - Warm gold accent `oklch(0.75 0.15 85)` for highlights and interactive elements
  - Soft amber `oklch(0.65 0.12 70)` for secondary actions and tags
- **Accent Color**: Luminous gold `oklch(0.85 0.18 90)` - Catches the eye for CTAs, active states, and "treasure" highlights
- **Foreground/Background Pairings**:
  - Background (Deep purple oklch(0.25 0.1 290)): Soft white text (oklch(0.95 0.01 290)) - Ratio 11.2:1 ✓
  - Card (Rich navy oklch(0.2 0.05 250)): Light gray text (oklch(0.9 0.02 250)) - Ratio 10.5:1 ✓
  - Accent (Luminous gold oklch(0.85 0.18 90)): Dark purple text (oklch(0.25 0.1 290)) - Ratio 8.4:1 ✓
  - Muted elements (oklch(0.35 0.05 270)): Medium gray text (oklch(0.65 0.03 270)) - Ratio 4.8:1 ✓

## Font Selection

Typefaces should convey technical sophistication while remaining highly readable, with distinctive character that sets this portfolio apart from generic developer sites.

- **Primary**: Space Grotesk - A geometric sans-serif with technical precision and modern character, perfect for headings and project titles
- **Secondary**: Inter Variable - Clean, highly readable for body text and descriptions with excellent screen optimization
- **Accent**: JetBrains Mono - Monospace font for code snippets, tech tags, and data points that reinforces technical credibility

- **Typographic Hierarchy**:
  - H1 (Hero Title): Space Grotesk Bold/56px/tight (-0.02em) letter spacing - Commands attention
  - H2 (Project Titles): Space Grotesk SemiBold/32px/normal letter spacing - Clear hierarchy
  - H3 (Section Headers): Space Grotesk Medium/24px/normal letter spacing - Guides navigation
  - Body (Descriptions): Inter Regular/16px/relaxed (1.6) line height - Optimal readability
  - Small (Metadata): Inter Medium/14px/normal - Clear but not distracting
  - Code/Tags: JetBrains Mono Regular/13px/normal - Technical distinction

## Animations

Animations should create a sense of discovery and wonder - cards that "wake up" when you approach them, details that unfold like opening a treasure chest, smooth morphing transitions that maintain spatial relationships. Every interaction should feel like revealing something precious.

Key moments:
- Cards: Float up slightly on hover with gentle glow appearing around edges (200ms ease-out)
- Details reveal: Cascade fade-in from top to bottom when hovering (150ms stagger)
- Modal opening: Scale up from card position with backdrop blur fade-in (350ms ease-out)
- Filter transitions: Smooth height/opacity changes as cards filter in/out (300ms ease-in-out)
- Scroll reveals: Projects fade in with subtle slide-up as they enter viewport (400ms ease-out)
- Tag hovers: Quick scale pulse with color shift (150ms ease-out)

## Component Selection

- **Components**:
  - Card: Base structure for project display with custom hover effects and glassmorphism
  - Dialog: Full-screen project detail modals with backdrop blur
  - Badge: Technology tags and metadata labels with custom colors per tech
  - Button: Primary CTAs (View Project, Visit Repo) and secondary actions (filter, close)
  - Input: Search field with icon and clear button
  - Tabs: Filter categories for technology types
  - Skeleton: Loading states for cards during data fetch
  - Avatar: User profile image in header/about section
  - ScrollArea: Smooth scrolling in modal content
  
- **Customizations**:
  - Custom card component with animated gradient borders and hover lift effects
  - Screenshot viewer with zoom and lightbox capabilities
  - Project navigation arrows within modals
  - Animated grid layout that responds to filtering
  - Custom empty states with illustrations
  
- **States**:
  - Buttons: Default (gold), hover (brighter gold with glow), active (pressed inward), disabled (muted gray)
  - Cards: Rest (subtle glow), hover (lifted with bright glow), active (scale down slightly), loading (pulsing skeleton)
  - Input: Default (border glow), focus (gold border with ring), filled (subtle highlight), error (red accent)
  - Tags: Default (muted badge), hover (color-coded per technology), active/selected (solid color)
  
- **Icon Selection**:
  - MagnifyingGlass: Search functionality
  - Star: Repository stars/favorites
  - GitBranch: Repository info
  - Eye: View/preview action
  - ArrowUpRight: External links
  - X: Close modals/clear filters
  - Sparkle: Featured/highlighted projects
  - Code: Technology tags
  - Calendar: Last updated dates
  - Funnel: Filter controls
  
- **Spacing**:
  - Container padding: px-6 md:px-12 (24px/48px)
  - Section spacing: space-y-16 md:space-y-24 (64px/96px)
  - Card grid gaps: gap-6 md:gap-8 (24px/32px)
  - Card internal padding: p-6 md:p-8 (24px/32px)
  - Text spacing: space-y-4 for paragraphs (16px)
  - Button spacing: px-6 py-3 (24px horizontal, 12px vertical)
  
- **Mobile**:
  - Single column grid on mobile, 2 columns at md, 3 columns at lg, 4 at xl
  - Touch-optimized card sizes (min 280px width)
  - Bottom sheet style modals on mobile instead of center dialogs
  - Sticky filter bar that collapses on scroll
  - Simplified animations on mobile for performance (reduced motion)
  - Larger touch targets (min 44px) for all interactive elements
  - Hamburger menu for navigation if needed
