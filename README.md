## Getting Started

(1) Install all the dependencies:

```bash
npm install
```

(2) Make sure you have a database server running:

- XAMPP
- WAMP

I am using WAMPSERVER https://www.wampserver.com/. There is no need to create an account.

(3) Create an empty database in WAMP with a name of **iaboc**

(4) Create tables and seed the database:

```bash
npx prisma db push
npx prisma generate
npx prisma db seed
```

(5) Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn about Next.js

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
