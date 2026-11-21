# Triport Properties - Dynamic Real Estate & Land Investment Advisory Website

> **"Every Route Leads to Growth. Join the Growth Corridor."**

A premium, modern, fully responsive, and dynamic real estate and land investment advisory platform developed for **Triport Properties**, focusing on land opportunities across the **Tirupati–Naidupeta Growth Corridor** in Andhra Pradesh, India.

---

## 🎨 Design System & Visual Identity

The design adheres strictly to the client's brand identity, specifications, and layout wireframe:

- **Sky Blue (`#38BDF8`)**: Sticky header, primary accents, badges, and brand highlights.
- **Black (`#111111`)**: Distinctive page heading banners (`About the company`, `Importance of the Triport city`), and primary action buttons.
- **White (`#FFFFFF`)**: Clean, spacious main website background and high-contrast property cards.
- **Rich Brown (`#5C4033`)**: Elegant corporate footer with statutory disclaimers, office information, and quick links.
- **Typography**: Poppins & Inter for clean modern corporate body, with distinctive heading font accents inspired by the client wireframe.

---

## 🚀 Key Features

### 1. Public Website Pages
- **Home Page**:
  - Full-width hero banner with dark gradient overlay, headline, subheadline, and dual CTA buttons.
  - Black heading section: **"About the company"** with stylish script font accent.
  - **Your Trusted Partner in Land Investment** introduction with 3 core approach pillars.
  - **Why This Corridor?** 3 strategic cards: *Faith and Tourism* (Tirupati), *Industry* (Naidupeta-Sullurpeta-Tada), and *Ports and Trade* (Krishnapatnam, Dugarajapatnam, Ramayapatnam).
  - **Featured Corridor Projects**: Fetched dynamically from MongoDB with badges, plot sizes, road access, and pricing.
  - Black heading section: **"Importance of the Triport city"**.
  - **Services Overview**: 6 land advisory categories.
  - **Our Clients Speak**: Genuine client feedback cards as depicted in the client mockup.
  - **Call to Action**: "Not Sure Where to Invest?" with interactive consultation modal.
- **About Us Page**:
  - Company background, Our Approach, Highlighted Core Promise: *"We recommend only the land we would be comfortable buying ourselves."*
  - Vision, Mission, Local Ground Expertise, and Commitment to Transparency.
- **Services Page**:
  - 6 dedicated service verticals: Residential Plots (TUDA/DTCP), Commercial Plots, Open Plots, Open Land for Investment, Farm Lands, Land Bank for Companies.
  - One-click **Enquire** button that auto-selects the service in the consultation modal.
- **Projects Showcase & Project Details**:
  - Real-time catalog with filter by Category, Corridor Zone, and Keyword search.
  - Detailed single project page (`/projects/:slug`) featuring high-resolution image galleries, specifications matrix, road connectivity, nearby infrastructure, Google Maps embed, and direct project enquiry form.
- **Locations & Connectivity**:
  - In-depth infrastructure breakdown for Tirupati, Naidupeta-Sullurpeta-Tada, National Highways (NH-71 & NH-16), Tirupati Airport (TIR), and Seaports.
  - Verified distance metrics, travel times, and statutory infrastructure disclaimer.
- **NRI Services**:
  - Tailored guidance for overseas Indians (Zoom/Meet remote consultations, video walkthroughs, family site visits, documentation, and High Court advocate coordination).
  - Clear statutory notice regarding FEMA / RBI restrictions on agricultural land for NRIs and OCIs.
  - Dedicated NRI enquiry form with country of residence and WhatsApp number.
- **Safe Investment Guide**:
  - 5-step interactive process timeline: *1. Tell Us Your Goal -> 2. Shortlist Locations -> 3. Verify the Land -> 4. Visit With Us -> 5. Complete the Purchase*.
- **Listings Page**:
  - Granular plot-level inventory separate from parent projects.
  - Availability status badges: `Available` (Green), `Reserved` (Amber), `Sold` (Red).
  - Search, filter by land type, and instant plot availability request button.
- **Corporate Land Bank**:
  - Institutional aggregation for industrial parks, manufacturing plants, and warehousing.
  - 4-step corporate framework & corporate enquiry form.
- **Insights & Blog**:
  - Infrastructure updates, buying checklists, and land-use basics.
  - Every article cites official government and infrastructure sources (NHAI, TUDA, APCRDA, Indian Ports Association).
- **Contact Us Page**:
  - Office address, phone, direct email, office hours, interactive Google Map, and instant WhatsApp chat integration.
  - Validated enquiry form connected directly to MongoDB.

---

### 2. Admin Management Dashboard (`/admin`)
Separate, secure corporate management portal:

- **JWT Authentication** with bcrypt password hashing.
- **Summary Metrics**:
  - Total Projects, Total Listings, Available Properties, Sold Properties, Total Enquiries, New Enquiries, Blog Articles.
- **Enquiries & Leads Management**:
  - Real-time table of all enquiries (General, Project, Listing, NRI, Corporate).
  - Status updates: `New`, `Contacted`, `Interested`, `Converted`, `Closed`.
  - Detailed lead drawer with customer message and internal follow-up notes.
  - **One-click CSV Export** (`/api/enquiries/export-csv`).
- **Projects Management**:
  - Add, edit, delete projects, manage plot sizes, pricing, approvals, road widths, and toggle homepage feature.
- **Listings Management**:
  - Manage individual plot records, update status (Available / Reserved / Sold), facing, and document verifications.
- **Services Management**:
  - Update service descriptions, benefits, and imagery.
- **Locations Management**:
  - Manage corridor nodes, verified distances, and travel times.
- **Blogs Management**:
  - Create, edit, publish/unpublish articles, and maintain official government source links.
- **Testimonials Management**:
  - Add, edit, and publish genuine client reviews.
- **Page Content Management**:
  - Edit Home page hero headline, subheadline, intro, promise, and vision without code modifications.
- **Website & Security Settings**:
  - Update company name, phone, WhatsApp number, email, office address, hours, footer disclaimer, and admin password change.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router DOM v6, Lucide React, AOS (Animate on Scroll), Axios |
| **Backend** | Node.js, Express.js, MongoDB (Mongoose), JWT, Bcryptjs, Multer |
| **Design** | Sky Blue `#38BDF8`, Black `#111111`, White `#FFFFFF`, Rich Brown `#5C4033`, Poppins & Inter |

---

## 🔑 Default Admin Credentials

- **URL**: `http://localhost:5000/admin` (or `/admin/login`)
- **Email**: `admin@triportproperties.com`
- **Password**: `admin123`

---

## 🚦 How to Run the Application

### Option A: Unified Full-Stack Run (Recommended)
The backend is configured to serve both the REST API and the compiled React production frontend from a single port (`5000`):

```bash
# 1. Start the server (from root directory)
npm start
```
Open **[http://localhost:5000](http://localhost:5000)** in your browser.

### Option B: Development Mode (Hot-Reloading)

```bash
# Terminal 1: Backend API
cd backend
node server.js

# Terminal 2: React Frontend with Vite
cd frontend
npm run dev
```
- Frontend dev server: `http://localhost:5173`
- Backend API server: `http://localhost:5000`
- API calls and uploads are automatically proxied from `5173` to `5000`.

### Database Seeding
To re-populate initial verified corridor projects, listings, locations, and settings:
```bash
cd backend
node seed.js
```
*(The server also auto-seeds automatically on first launch if the database is empty!)*
