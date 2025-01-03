Twixy is a app that allows users to create and post tweets, follow other users, like, and view their own profile and the profiles of other users.

# Tech Stack

- **Node.js** for our backend code which would be running graphql server inside node.js environment.
- **GraphQL** for our API, which provides a flexible and efficient way to define our data model and query it.
- **Prisma ORM** for our database ORM, which provides a type-safe and easy-to-use interface for interacting with our PostgreSQL database.
- **PostgreSQL** as our database, which is a powerful and reliable relational database system.
- **Supabase** for hosting and managing cloud postgresql db.
- **Redis** for query caching on server side and increase query speeds
- **Google OAuth** for Signin with Google
- **JSON WEB TOKENS** for authentication
- **Next.js** for our frontend, which is a popular framework for building React applications with server-side rendering and optimized performance.
- **TailwindCSS** for styling and re-useable components.
- **Codegen** for typesafe graphql queries and mitations.
- **Graphql-Request**  as API client for client server communication
- **React-Query** for client side data caching and query caching
- **Typescript** to maintain code quality and write type-safe code.
- **Amazon Web Services** for storage and deployments.


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
