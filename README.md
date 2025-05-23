# Cost Estimator App

An AI-powered application that generates ballpark cost estimates for various projects and services.

## Features

- Simple interface for entering project descriptions
- Detailed cost breakdowns with low, medium, and high estimates
- Multiple view modes for displaying estimates
- Export options for PDF and CSV formats
- Responsive design for all device sizes

## Technology Stack

- React - Frontend UI library
- Next.js - React framework
- Tailwind CSS - Utility-first CSS framework
- @react-pdf/renderer - PDF generation

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/cost-estimator-app.git
cd cost-estimator-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Usage

1. Enter a detailed description of your project in the form
2. (Optional) Specify your location for more accurate estimates
3. Click "Generate Estimate" to get your cost breakdown
4. View your estimate in different formats (standard, detailed, or comparison)
5. Export your estimate as a PDF or CSV file if needed

## Project Structure

- `/pages` - Next.js pages including the main app and API routes
- `/components` - React components used throughout the application
- `/styles` - Global CSS and Tailwind configuration
- `/public` - Static assets like images and icons

## API Endpoint

The application uses a mock API endpoint at `/api/generate-estimate` that simulates AI-generated estimates. In a production environment, this would connect to a real AI service.

## License

MIT #   c o s t m o d e l  
 