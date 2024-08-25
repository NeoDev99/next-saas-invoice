# SaaS Invoice

![GitHub repo size](https://img.shields.io/github/repo-size/UmbrellaSkiies/next-saas-invoice)
![GitHub stars](https://img.shields.io/github/stars/UmbrellaSkiies/next-saas-invoice?style=social)
![GitHub repo file count](https://img.shields.io/github/directory-file-count/UmbrellaSkiies/next-saas-invoice)
![GitHub forks](https://img.shields.io/github/forks/UmbrellaSkiies/next-saas-invoice?style=social)
![GitHub followers](https://img.shields.io/github/followers/UmbrellaSkiies?label=Followers&logoColor=blue&style=flat)

This is a SaaS Invoice web application built using **Next.js** with the **App Router**, **TypeScript**, and **Tailwind CSS**. The application allows users to create, manage, and send invoices, as well as manage customer information and bank details.


## Table of Contents
- [SaaS Invoice](#saas-invoice)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Setup \& Installation](#setup--installation)
  - [Scripts](#scripts)
  - [Technologies Used](#technologies-used)
  - [Project Structure](#project-structure)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)


## Prerequisites

Before you begin, ensure you have met the following requirements:

* [Git](https://git-scm.com/downloads "Download Git") must be installed on your operating system.


## Setup & Installation

To install **SaaS Invoice**, follow these steps:

1. Clone the repository:

Linux and macOS:

    ```bash
    sudo git clone https://github.com/UmbrellaSkiies/next-saas-invoice.git
    ```

Windows:

    ```bash
    git clone https://github.com/UmbrellaSkiies/next-saas-invoice.git
    cd next-saas-invoice
    ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env.local` file in the root directory and add your environment variables:

   ```env
   DATABASE_URL=your_database_url
   NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
   CLERK_API_KEY=your_clerk_api_key
   RESEND_API_KEY=your_resend_api_key
   ```


## Scripts

   - Development: npm run dev
   - Build: npm run build
   - Start: npm run start
  
   - Migrate Database: npx drizzle-kit generate
   - Push to Database: npx drizzle-kit push


## Technologies Used

  - *Next.js 14*: React framework with server-side rendering and static site generation.
  - *TypeScript*: Static type checking.
  - *Tailwind CSS*: Utility-first CSS framework.
  - *ShadCN UI*: Custom UI components.
  - *Lucide Icons*: Icons used throughout the application.
  - *Drizzle ORM*: Type-safe ORM for database management.
  - *Neon Serverless*: Database hosting.
  - *Clerk*: Authentication provider.
  - *React-to-Print*: For printing React components as PDFs.
  - *Resend*: For sending digital invoices.


## Project Structure

```bash
📁 next-saas-invoice (root)
|
├─ 📁 app
|  ├─ 📁 api
|  |  ├─ 📁 bank-info
|  |  |  |_ 📄 route.ts
|  |  ├─ 📁 customers
|  |  |  |_ 📄 route.ts
|  |  ├─ 📁 invoices
|  |     |_ 📄 route.ts
|  ├─ 📁 home
|  |  |_ 📄 page.tsx
|  |  |_ 📄 layout.tsx
|  ├─ 📁 dashboard
|  |  |_ 📄 page.tsx
|  |  |_ 📄 layout.tsx
|  ├─ 📄 layout.tsx
|  |_ 📄 page.tsx
|
├─ 📁 components
|  ├─ 📁 ui
|  |  |_ 📄 Button.tsx
|  |  |_ 📄 Card.tsx
|  |  |_ 📄 Modal.tsx
|  ├─ 📁 dashboard
|  |  |_ 📄 CustomersTable.tsx
|  |  |_ 📄 InvoiceTable.tsx
|  |_ 📁 layout
|     |_ 📄 DesktopNav.tsx
|     |_ 📄 Footer.tsx
|     |_ 📄 Navbar.tsx
|
├─ 📁 lib
|  |_ 📄 utils.ts
|
├─ 📁 hooks
|  |_ 📄 useUser.ts
|  |_ 📄 useActiveLink.ts
|
├─ 📁 types
|  |_ 📄 types.d.ts
|
├─ 📁 styles
|  |_ 📄 globals.css
|  |_ 📄 variables.css
|
├─ 📁 public
|  |_ 📁 images
|  |  |_ 📄 logo.svg
|  |  |_ 📄 hero-image.png
|  |_ 📁 fonts
|     |_ 📄 custom-font.woff2
|
├─ 📁 config
|  |_ 📄 seo.ts
|  |_ 📄 navigation.ts
|
├─ 📄 next.config.js
├─ 📄 package.json
├─ 📄 tsconfig.json
├─ 📄 .env.local
├─ 📄 .gitignore
```


## Contributing

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a Pull Request.


## License

This project is **free to use** and does not contain any license.


## Contact

If you want to contact me you can reach me at [LinkedIn](https://linkedin.com/in/neo-titebe-120536254) or [Instagram](https://instagram.com/9teen_99).
