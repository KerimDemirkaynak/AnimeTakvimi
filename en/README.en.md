# Anime Schedule
[**English**](README.en.md) | [**Türkçe**](../README.md)

[![License](https://img.shields.io/badge/LICENSE-MIT-blue.svg?color=97CA01&logoColor=blue&style=for-the-badge)](https://opensource.org/license/mit/)
[![Website](https://img.shields.io/badge/Website-kerimdemirkaynak.github.io-00215E?style=for-the-badge)](https://kerimdemirkaynak.github.io/AnimeTakvimi/en)

A real-time anime release schedule. It shows when new episodes will air and pulls data from the Anilist GraphQL API. It offers users the ability to filter by genre.

![Anime Schedule Screenshot](https://github.com/user-attachments/assets/3c23a8a8-8e08-4fbb-800e-3abdd116aa95)

## 🌐 Demo
*   **Turkish:** [Live Demo](https://kerimdemirkaynak.github.io/AnimeTakvimi)
*   **English:** [Live Demo](https://kerimdemirkaynak.github.io/AnimeTakvimi/en)

## ✨ Features

*   **Real-time Countdown:** Shows the time remaining until new anime episodes air or how long ago they were released.
*   **Anilist Integration:** Fetches up-to-date anime data directly from the Anilist API.
*   **Filter by Genre:** Allows users to filter anime by specific genres (supports multi-select).
*   **Localized UI Elements:** While the Turkish version uses Turkish translations for genres and themes, this English version uses the original English names provided by the API or direct English UI text.
*   **Detailed Info Modal:** Displays additional information for each anime, such as start date, studio, genres, themes (original English names used here), and score, in a stylish modal window.
*   **Platform Links:** Provides direct links to official streaming platforms like Crunchyroll, HIDIVE, YouTube, Netflix (if available).
*   **Link to Anilist Page:** Clicking on an anime's title or the button in the modal redirects to its respective Anilist page.
*   **Responsive Design:** Displays correctly on different screen sizes (mobile, tablet, desktop). The header and filter bar are sticky on mobile devices.
*   **Adult Content Filter:** Adult-oriented content like Hentai is not listed.
*   **Recent & Upcoming Releases:** By default, lists anime that have aired in the last 7 days or will air in the next 7 days.
*   **Modern UI:** Enhanced user interface with Google Fonts (Russo One and Poppins) and Font Awesome icons.

## 🛠️ Technologies Used

*   HTML5
*   CSS3 (Flexbox, Grid, Animations)
*   Vanilla JavaScript (ES6+)
*   [Anilist GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/)
*   [Google Fonts (Russo One & Poppins)](https://fonts.google.com/)
*   [Font Awesome](https://fontawesome.com/) (for icons)

## 🚀 Setup and Running

To run the project on your local machine:

1.  Clone this repository:
    ```bash
    git clone https://github.com/kerimdemirkaynak/AnimeTakvimi.git
    ```
2.  Navigate to the project directory:
    ```bash
    cd AnimeTakvimi
    ```
3.  Open the `index.html` file (for the Turkish version) or `en/index.html` (for the English version) in your browser.

No compilation or complex dependency installation is required.

## 📊 API Usage

This project uses the [Anilist GraphQL API](https://anilist.gitbook.io/anilist-apiv2-docs/) to fetch anime data. It queries for popular anime from the current season, those that are currently airing or not yet released, and filters them to show those aired/airing within the last/next 7 days. Adult content (`isAdult`) is excluded.
