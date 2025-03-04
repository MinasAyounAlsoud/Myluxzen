# Myluxzen

Die benötigte Libraries 

## Frontend
- react-router-dom → Routing
- axios → API-Anfragen
- jwt-decode → JWT-Token-Handling
- @mui/material @mui/icons-material → UI-Komponenten
- react-toastify → Benachrichtigungen
- react-icons

npm install react-router-dom axios jwt-decode @mui/material @mui/icons-material react-toastify
npm install react-icons

## Backend
- express → Backend-Framework
- mongoose → MongoDB ORM
- bcryptjs → Passwort-Hashing
- jsonwebtoken → Auth mit JWT
- dotenv → Umgebungsvariablen
- cors → Cross-Origin Resource Sharing
- cookie-parser → Cookies für Auth
- multer → Datei-Uploads (z. B. Rechnungen)
- pdfkit → PDF-Generierung


npm install express mongoose bcryptjs jsonwebtoken dotenv cors cookie-parser multer pdfkit




 { code: "+33", name: "Frankreich" },
    { code: "+44", name: "Großbritannien" },
    { code: "+55", name: "Brasilien" },
    { code: "+86", name: "China" },
    { code: "+91", name: "Indien" },
    { code: "+34", name: "Spanien" },
    { code: "+39", name: "Italien" },
    { code: "+81", name: "Japan" },
    { code: "+7", name: "Russland" },
    { code: "+61", name: "Australien" },
    { code: "+41", name: "Schweiz" },
    { code: "+43", name: "Österreich" },
    { code: "+32", name: "Belgien" },
    { code: "+31", name: "Niederlande" },
    { code: "+46", name: "Schweden" },
    { code: "+47", name: "Norwegen" },
    { code: "+45", name: "Dänemark" },
    { code: "+351", name: "Portugal" },
    { code: "+20", name: "Ägypten" },
    { code: "+52", name: "Mexiko" },
    { code: "+54", name: "Argentinien" },
    { code: "+62", name: "Indonesien" },
    { code: "+92", name: "Pakistan" },
    { code: "+27", name: "Südafrika" },
    { code: "+82", name: "Südkorea" },
    { code: "+971", name: "Vereinigte Arabische Emirate" },
    { code: "+966", name: "Saudi-Arabien" },
    { code: "+90", name: "Türkei" },
    { code: "+48", name: "Polen" },
    { code: "+30", name: "Griechenland" },
    { code: "+358", name: "Finnland" },
    { code: "+421", name: "Slowakei" },
    { code: "+420", name: "Tschechien" },
    { code: "+36", name: "Ungarn" },
    { code: "+380", name: "Ukraine" },
    { code: "+375", name: "Weißrussland" },
    { code: "+356", name: "Malta" },
    { code: "+386", name: "Slowenien" },
    { code: "+372", name: "Estland" },
    { code: "+371", name: "Lettland" },
    { code: "+370", name: "Litauen" },
    { code: "+57", name: "Kolumbien" },
    { code: "+56", name: "Chile" },
    { code: "+593", name: "Ecuador" },
    { code: "+502", name: "Guatemala" },
    { code: "+595", name: "Paraguay" },
    { code: "+51", name: "Peru" },
    { code: "+63", name: "Philippinen" },
    { code: "+64", name: "Neuseeland" },
    { code: "+98", name: "Iran" },
    { code: "+964", name: "Irak" },
    { code: "+856", name: "Laos" },
    { code: "+84", name: "Vietnam" },
    { code: "+977", name: "Nepal" },
    { code: "+972", name: "Israel" },
    { code: "+994", name: "Aserbaidschan" },
    { code: "+374", name: "Armenien" },
    { code: "+880", name: "Bangladesch" },
    { code: "+373", name: "Moldawien" },
    { code: "+256", name: "Uganda" },
    { code: "+255", name: "Tansania" },
    { code: "+233", name: "Ghana" },
    { code: "+234", name: "Nigeria" },
    { code: "+509", name: "Haiti" },
    { code: "+53", name: "Kuba" },
    { code: "+592", name: "Guyana" },
    { code: "+501", name: "Belize" },
    { code: "+268", name: "Eswatini" },
    { code: "+691", name: "Mikronesien" },
    { code: "+675", name: "Papua-Neuguinea" },
    { code: "+685", name: "Samoa" },
    { code: "+678", name: "Vanuatu" }





    const countryList = [
    { code: "DE", name: "Deutschland" },
    { code: "US", name: "USA" },
    { code: "FR", name: "Frankreich" },
    { code: "GB", name: "Großbritannien" },
    { code: "IT", name: "Italien" },
    { code: "ES", name: "Spanien" },
    { code: "CN", name: "China" },
    { code: "IN", name: "Indien" },
    { code: "BR", name: "Brasilien" },
    { code: "JP", name: "Japan" },
    { code: "AU", name: "Australien" },
    { code: "CA", name: "Kanada" },
    { code: "MX", name: "Mexiko" },
    { code: "RU", name: "Russland" },
    { code: "TR", name: "Türkei" },
    { code: "SA", name: "Saudi-Arabien" },
    { code: "AE", name: "Vereinigte Arabische Emirate" },
    { code: "ZA", name: "Südafrika" },
    { code: "EG", name: "Ägypten" },
    { code: "NG", name: "Nigeria" },
    { code: "KE", name: "Kenia" },
    { code: "ID", name: "Indonesien" },
    { code: "PK", name: "Pakistan" },
    { code: "KR", name: "Südkorea" },
    { code: "TH", name: "Thailand" },
    { code: "VN", name: "Vietnam" },
    { code: "MY", name: "Malaysia" },
    { code: "SG", name: "Singapur" },
    { code: "PH", name: "Philippinen" },
    { code: "BD", name: "Bangladesch" },
    { code: "IR", name: "Iran" },
    { code: "IQ", name: "Irak" },
    { code: "IL", name: "Israel" },
    { code: "UA", name: "Ukraine" },
    { code: "PL", name: "Polen" },
    { code: "NL", name: "Niederlande" },
    { code: "BE", name: "Belgien" },
    { code: "SE", name: "Schweden" },
    { code: "NO", name: "Norwegen" },
    { code: "DK", name: "Dänemark" },
    { code: "FI", name: "Finnland" },
    { code: "CH", name: "Schweiz" },
];





 Sanfte Schatten & abgerundete Ecken: shadow-lg rounded-2xl
✅ Sanfter Hintergrund: bg-gray-50
✅ Überschriften in dunklem Grau: text-gray-800
✅ Beschreibungen & Labels in hellem Grau: text-gray-500
✅ Eingabefelder mit sanfterem Design: bg-gray-100 border-gray-300
✅ Buttons mit Hover-Effekten für Interaktivität