# Next-Gen Blogs

Welcome to **Next-Gen Blogs**, a modern blogging platform designed to showcase the best of contemporary web technologies. This project combines a robust backend, a sleek frontend, and a seamless developer experience.

This is the **successor** of the [Blog-Next](https://github.com/om-baji/blog-next) repository, bringing enhanced functionality, improved performance, and a more refined user experience.

---

## Features

- **Backend**:
  - Built with **Hono.js**, deployed to **Cloudflare Workers** for high performance and scalability.
  - **TypeScript**-powered for strong typing and maintainability.
  - Database integration with **Prisma** and **PostgreSQL**.
  - Class-based controllers to ensure clean, reusable, and organized code.
  - Webhook integration to handle **Clerk Auth** user creation events.

- **Frontend**:
  - Developed with **Vite** and **React** for blazing-fast builds and modern UI.
  - **TypeScript** ensures type safety across the application.
  - Styled with **Acertainty UI** and **ShadCN** for a polished and component-driven design.
  - **Clerk Auth** for secure and easy user authentication.

---

## Tech Stack

### Backend:
- **Hono.js**: Fast, lightweight, and optimized for serverless deployments.
- **Cloudflare Workers**: A powerful platform for running backend services close to your users.
- **TypeScript**: For enhanced code quality and developer experience.
- **Prisma**: Elegant and efficient database ORM.
- **PostgreSQL**: A reliable and scalable relational database.

### Frontend:
- **Vite**: Lightning-fast development server and build tool.
- **React**: A popular library for building user interfaces.
- **Acertainty UI**: Modern and customizable components for an intuitive design.
- **ShadCN**: Beautiful and consistent design system.
- **Clerk Auth**: A complete authentication solution.

---

## Key Functionalities

1. **Blog Website**:
   - Create, edit, and delete blog posts with ease.
   - **Markdown-based Rich Text Editor** with live preview for crafting beautiful and dynamic content.
   - Live preview feature makes the editing experience seamless and unique.

2. **Personal Notes**:
   - A dedicated feature for users to maintain private notes.
   - Secure and accessible only to the user.

3. **Authentication**:
   - Secure user authentication using Clerk Auth.
   - Webhook triggered on new user creation, enabling backend updates.

4. **Modern Design**:
   - Responsive and visually appealing UI.
   - Minimalistic and accessible design principles.

---

## Installation and Setup

### Prerequisites:
- Node.js
- PostgreSQL database

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/om-baji/next-gen-blogs.git
   ```
2. Navigate to the project directory:
   ```bash
   cd next-gen-blogs
   ```
3. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```
4. Configure environment variables for the backend in `.env.local`:
   ```env
   DATABASE_URL=your_postgres_database_url
   CLERK_API_KEY=your_clerk_api_key
   ```
5. Start the backend:
   ```bash
   npm start
   ```
6. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```
7. Configure environment variables for the frontend in `.env.local`:
   ```env
   VITE_CLERK_FRONTEND_API=your_clerk_frontend_api
   ```
8. Start the frontend:
   ```bash
   npm run dev
   ```

---

## Deployment

### Backend:
Deployed to **Cloudflare Workers** for seamless scalability and performance. Update your Cloudflare Worker settings in the `wrangler.toml` file.

### Frontend:
Use any modern hosting platform (e.g., Vercel, Netlify) to deploy the Vite-based frontend.

---

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact

For any questions or feedback, feel free to reach out:
- GitHub: [om-baji](https://github.com/om-baji)

