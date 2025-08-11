# 🏨 HotelHub - Hotel Management System

A beautiful and modern hotel management system built with Nuxt.js, featuring an attractive UI for both property owners and clients.

## ✨ Features

### For Clients (Travelers)
- **Beautiful Landing Page**: Eye-catching hero section with search functionality
- **Property Browsing**: Browse through various properties with detailed cards
- **Advanced Search & Filters**: Filter by location, dates, price, property type, and more
- **Property Details**: Comprehensive property pages with images, amenities, and reviews
- **Booking System**: Easy booking process with date selection and guest count
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### For Property Owners
- **Property Listing**: Comprehensive form to list properties with all details
- **Photo Upload**: Support for multiple high-quality photos
- **Amenity Management**: Select from various amenities and house rules
- **Pricing Control**: Set pricing and additional fees
- **Contact Information**: Manage owner contact details

## 🎨 Design Features

- **Modern UI/UX**: Clean, professional design with smooth animations
- **Gradient Backgrounds**: Beautiful color gradients throughout the interface
- **Card-based Layout**: Elegant property cards with hover effects
- **Responsive Grid**: Adaptive layouts for all screen sizes
- **Custom Animations**: Smooth transitions and hover effects
- **Professional Typography**: Inter font family for excellent readability
- **Color-coded Elements**: Consistent color scheme with blue primary theme

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. **Clone the repository**
```bash
   git clone <repository-url>
   cd vuehotel-management-system/project
   ```

2. **Install dependencies**
   ```bash
yarn install
```

3. **Start the development server**
```bash
yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
project/
├── app/
│   ├── assets/
│   │   └── css/
│   │       └── main.css          # Main stylesheet with Tailwind CSS
│   ├── components/               # Reusable Vue components
│   ├── pages/                    # Application pages
│   │   ├── properties.vue        # Properties listing page
│   │   ├── property/
│   │   │   └── [id].vue         # Individual property detail page
│   │   └── list-property.vue    # Property listing form
│   └── app.vue                   # Main application layout
├── public/                       # Static assets
├── nuxt.config.ts               # Nuxt.js configuration
├── package.json                  # Project dependencies
└── README.md                    # Project documentation
```

## 🎯 Pages Overview

### 1. Home Page (`/`)
- Hero section with search functionality
- Featured properties showcase
- Owner benefits section
- Professional footer

### 2. Properties Page (`/properties`)
- Advanced search and filtering
- Property grid with detailed cards
- Sorting options
- Pagination

### 3. Property Detail Page (`/property/[id]`)
- Large property images
- Detailed description and amenities
- Guest reviews and ratings
- Booking form with pricing
- Contact host functionality

### 4. List Property Page (`/list-property`)
- Multi-step property listing form
- Comprehensive property details
- Photo upload section
- Amenity selection
- Pricing configuration
- House rules setup

## 🛠️ Technologies Used

- **Nuxt.js 4**: Modern Vue.js framework
- **Vue.js 3**: Progressive JavaScript framework
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **Inter Font**: Modern, readable typography

## 🎨 Custom Styling

The project includes custom CSS with:
- **Custom Animations**: Fade-in, slide-in, and pulse effects
- **Gradient Backgrounds**: Beautiful color transitions
- **Custom Components**: Tailored button, card, and form styles
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Focus states and keyboard navigation

## 🔧 Configuration

### Tailwind CSS
The project is configured with a custom Tailwind CSS setup including:
- Custom color palette
- Extended animations
- Custom component classes
- Responsive utilities

### Nuxt.js
- CSS preprocessing
- Meta tags for SEO
- Font optimization
- Development tools enabled

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first approach**
- **Breakpoint system**: sm, md, lg, xl
- **Flexible grids**: Adapts to screen size
- **Touch-friendly**: Optimized for mobile interaction

## 🎯 Future Enhancements

- [ ] User authentication system
- [ ] Payment integration
- [ ] Real-time messaging
- [ ] Property management dashboard
- [ ] Review and rating system
- [ ] Booking calendar
- [ ] Email notifications
- [ ] Multi-language support
- [ ] Advanced search with maps
- [ ] Property availability calendar

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Nuxt.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Inter Font** for the beautiful typography
- **Vue.js Community** for the excellent ecosystem

---

**HotelHub** - Making travel accommodation beautiful and accessible! 🏨✨
