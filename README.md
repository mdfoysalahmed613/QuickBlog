# QuickBlog

> **Live Demo:** [quickblog.foysal.me](https://quickblog.foysal.me)

## 📝 Description

QuickBlog is a fully functional, modern blog application. It allows users (administrators) to create, manage, and publish posts with a rich-text editor, while providing a clean and responsive interface for readers.

This project showcases my ability to develop a full-stack application, handle user authentication, manage a persistent database, and implement a scalable, component-based frontend architecture.

## ✨ Key Features

* **User Authentication:** Custom Clerk authentication flow.
* **Post Management (CRUD):** Complete functionality to Create, Read, Update, and Delete blog posts.
* **Rich Text Editor:** Utilize a feature-rich editor (Tip Tap) for formatting posts.
* **Markdown Support (Optional):** *(If applicable, otherwise remove)*
* **Image Upload:** Ability to upload and store images associated with posts using Imagekit.
* **Responsive Design:** Optimized viewing experience across all devices (desktop, tablet, mobile).
* **Search & Filtering:** I used TanStack Query for data fetching and using modern search and filtering options.
* **Category/Tag Support:** Organize posts with categories.

## 💻 Technologies Used

This project was built using a **NextJs Full Stack Web App**

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | [NextJs/Typescript/Tanstack/React Form Hook/Clerk] | Modern UI library for building the user interface. |
| **Styling** | [Tailwind CSS/Shadcn UI] | Utility-first CSS framework for rapid styling. |
| **Backend** | Node.js/Express/Typescript | Runtime environment/framework for the server-side logic. |
| **Database** | MongoDB/Mongoose | Persistent data storage for posts, users, etc. |
| **Deployment** | Vercel | Hosting platform for the live application. |

## 🚀 Getting Started (Local Setup)

Follow these steps to set up and run the QuickBlog application on your local machine.

### Prerequisites

You need the following installed:

* [Node.js](https://nodejs.org/) (version 18+)
* [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/mdfoysalahmed613/QuickBlog.git
    cd quickblog
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

<!-- 3.  **Configure Environment Variables:**
    Create a file named `.env` in the root of the server directory and add your configuration:
    ```
    # Example .env file
    PORT=5000
    MONGODB_URI=[YOUR_MONGODB_CONNECTION_STRING]
    JWT_SECRET=[A_LONG_RANDOM_STRING_FOR_SECURITY]
    ``` -->

4.  **Run the application:**
    ```bash
    pnpm dev
    ```
    The application should now be running at `http://localhost:3000`.

## 🧑‍💻 Author

| **Foysal** |
| :---: |
| [![GitHub Badge](https://img.shields.io/badge/-GitHub-100000?style=flat-square&logo=github&logoColor=white)]([https://github.com/mdfoysalahmed613]) |
| [![LinkedIn Badge](https://img.shields.io/badge/-LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)]([https://www.linkedin.com/in/foysal-ahmed-b86699259]) |
| **Portfolio:** [https://foysal.me] |

<!-- ## 🙏 Acknowledgements -->

<!-- * [e.g., Font Awesome](https://fontawesome.com/) for icons.
* [e.g., Axios](https://axios-http.com/) for API requests.
* *(Any tutorials, libraries, or resources that provided significant help)* -->