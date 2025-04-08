# BabyBloom AI

**BabyBloom AI** is a mobile-first baby and mom health companion that blends AI, journaling, and tracking to empower new parents. Designed with care for Southeast Asian markets, the app includes baby growth tracking, cry analysis, feeding/sleep logging, diaper image detection, food safety analysis for moms, and postpartum support — all wrapped in a delightful and local-first UX.

---

##  Key Features

### 👶 Baby Dashboard
- Breastfeeding timer & side selector
- Sleep duration logger
- Diaper change tracker with AI stool analysis (image-based)
- Growth tracking (weight, height, head) with visual charts
- Vaccination reminders
- Cry Translator using simulated AI sentiment recognition
- Health and food AI shortcuts

### 👩 Mom Dashboard
- Mood tracker with emoji slider
- Journal with voice-to-text and emotional context
- Postpartum recovery tracker (physical, emotional, breastfeeding)
- Sleep summary and optimization
- AI Wellness Chatbot for mental health support

### 👥 Community Features
- Group-based community by month, location, or parenting stage
- Expert Q&A from pediatricians/lactation consultants
- Invite system with referral codes and bonuses

### Profile + Settings
- Add/manage family members
- Language, notifications, and upgrade options

---

## 🧠 AI-Powered Modules

- **Cry Translator:** Simulated analysis of baby cries (reason + confidence %)
- **Food Analyzer:** Nutritional + suitability analysis for pregnancy/postpartum
- **Diaper AI:** Stool analysis using color, consistency, and image inputs
- **Chat AI:** AI wellness coach for postpartum mental/emotional health
- **Growth Chart AI:** Percentile predictions and smart feedback

> Note: AI functions are currently simulated but designed to integrate with real APIs in production.

---

## Tech Stack

| Category      | Tech Used                    |
|---------------|------------------------------|
| Frontend      | React + TypeScript           |
| Styling       | Tailwind CSS                 |
| Charting      | ECharts                      |
| Icons         | FontAwesome                  |
| State Mgmt    | useState, useEffect          |
| AI Modules    | Placeholder simulations      |
| Data Storage  | In-memory (to be integrated with Firebase or Supabase in v1.1) |


---

## Setup Instructions

1. Clone the repo:
   ```bash
   git clone https://github.com/your-org/babybloom-ai.git
   cd babybloom-ai

2. Install dependencies:

```bash
   npm install

3. Run the app:

```bash
   npm start

4. Visit http://localhost:3000

Tailwind CSS is required — ensure it is set up in your dev environment.

## Future Enhancements
Firebase backend

Real-time chat with pediatricians

Secure login and profile storage

Multi-language support (Bahasa, Thai, Vietnamese, Tagalog)

AI feedback loop based on user logs


