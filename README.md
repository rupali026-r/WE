# ⚕️Carewise AI

Carewise AI is an open-source, multilingual healthcare assistant web app. It helps users analyze symptoms, get home remedies, medicine suggestions, and find nearby hospitals. 
The app supports 18+ languages and is designed for accessibility and ease of use.


## Features

- **AI Symptom Checker:** Enter symptoms (e.g., "vomiting", "nausea") to get possible causes, home remedies, and medicine suggestions.
- **Multilingual Support:** Switch between 18+ languages instantly.
- **Personalized Recommendations:** Get health tips and advice based on your symptoms.
- **Community & Blogs:** Read and share health experiences with others.
- **Nearby Hospitals:** Find hospitals near your location (uses OpenStreetMap/Nominatim).
- **Voice Input:** Use speech-to-text for hands-free symptom entry (if enabled).
- **Mobile Friendly:** Responsive design for all devices.

## Getting Started

### Prerequisites
- Node.js (v16 or later recommended)
- npm (v8 or later)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/rupali026-r/carewise.git
   cd carewise/carewise
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).
## Project Structure
carewise/
├── public/
│   ├── index.html
│   ├── logo192.png / logo512.png
│   ├── manifest.json / robots.txt
│
├── src/
│   ├── components/           # Reusable UI and logic components
│   │   ├── common/           # Shared UI elements (Button, LoadingSpinner, ResultCard)
│   │   ├── Contact/          # Contact form and styles
│   │   ├── Home/             # Home page hero and styles
│   │   ├── hooks/            # Custom React hooks (useSymptomAnalysis)
│   │   ├── Layout/           # Layout components (Header, Footer, SideBar)
│   │   ├── Recommendations/  # Recommendations UI and logic
│   │   ├── services/         # API and data service helpers (api.js, symptomService.js)
│   │   ├── utils/            # Utility functions
│   │   ├── VoiceRecognition/ # Voice input logic
│   │   └── context/          # React context providers (if any)
│   │
│   ├── pages/                # Route-specific pages
│   │   ├── About/            # About page
│   │   ├── Community/        # Community/blog page
│   │   ├── SymptomChecker/   # Symptom checker logic and styles
│   │   ├── AboutPage.jsx / CommunityPage.jsx / ...
│   │
│   ├── translations/         # i18n translation files (en.json, hi.json, ...)
│   │
│   ├── App.js                # Root component
│   ├── App.css               # Global styles
│   ├── index.js              # Entry point
│   ├── index.css             # Global CSS
│   ├── i18n.js               # i18next configuration
│   ├── reportWebVitals.js
│   └── setupTests.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
## Usage
- On the home page, select your language.
- Use the sidebar to navigate:
  - **Symptom Checker:** Enter symptoms (e.g., "vomiting", "nausea") for analysis.
  - **Recommendations:** Get health tips.
  - **Community:** Read and share health stories.
  - **About/Contact:** Learn more or get in touch.

## Adding Symptom Data
- Symptom analysis data is in [`src/components/hooks/useSymptomAnalysis.jsx`](src/components/hooks/useSymptomAnalysis.jsx).
- To add or update symptoms, edit the `knowledgeBase` object.

## Technologies Used
- React 19
- React Router
- i18next (internationalization)
- OpenStreetMap/Nominatim (hospital search)
- Web Speech API (voice input)

## APIs Used

- **OpenFDA Drug Label API**  
  Used to fetch detailed medicine label information for suggested medicines in the Symptom Checker.  
  [https://open.fda.gov/apis/drug/label/](https://open.fda.gov/apis/drug/label/)

- **OpenStreetMap / Nominatim API**  
  Used to geocode user locations and search for nearby hospitals based on city or coordinates.  
  [https://nominatim.openstreetmap.org/](https://nominatim.openstreetmap.org/)

- **Google Translate API (Unofficial via Google Translate endpoint)**  
  Used to provide instant translation of symptom analysis and results for supported languages.  
  [https://translate.googleapis.com/](https://translate.googleapis.com/)

- **Google Maps (for hospital directions)**  
  Used to generate links for viewing hospital locations on Google Maps.

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License
[MIT](LICENSE)

## Acknowledgements
- [Create React App](https://github.com/facebook/create-react-app)
- [OpenStreetMap](https://www.openstreetmap.org/)
- [i18next](https://www.i18next.com/)
Contact:
Rathod Rupali | rupalirathod026@gmail.com
