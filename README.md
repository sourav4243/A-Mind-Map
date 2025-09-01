This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


# This is what i have used so far
- <code>npx shadcn@latest init</code>
- <code>npm install convex</code>
- convex dev deployment : <code>npx convex dev</code>, this will prompt you to login with github, create a project, and save your production and deployment urls, and also create a <code>convex/</code> folder to write backend api functions in. the dev command will then continue running to sync your functions with your dev deployment in the cloud.
- Note that using <code>npx conved dev</code> will also run our backend.. so do that to run backend
- Go to clerk and add email and google login and create application and copy paste your secret key in <code>.env.local</code> and run this command <code>npm install @clerk/nextjs</code>
- We will use a cobined provider for clerk and convex.. and how to do this? Written in <a href="https://docs.convex.dev/auth/clerk">convex documentation</a>.
- Before that, from that documentation , copy middleware code and paste in project directory (top level)
- Now we can follow documentation and go to clerk jwt , select convex and name it convex
- make covex/auth.config.ts
- Make a <code>provider</code> folder in root and make file <code>convex-client-provider.tsx</code>. write code and then wrap children in layout.tsx of app folder with the provider <code>ConexClientProvider</code>
- Make a dashboard and design side bar and organization sidebar
- Go to clerk and enable organization , and see in JWT convex that we can use various methods like <code>org.id</code> <code>org.name</code> <code>org.role</code> etc ( you can see more of such in already created jwt template), add org_role and org_id in claims.
- now we are going to add shadcn dialog, so install using <code>npx shadcn@latest add dialog</code>
- Now ew are goind to add shancn tooltip, so install using <code>npx shadcn@latest add tooltip</code>
- Added a plus button to sidebar to add organizatin
- Added a <code>list.tsx</code> which shows all current organization to sidebar above plus icon
- Added <code>item.tsx</code> to decorate the list items ( organization ) better (visually)
- You will get nextjs config error, for img.clerk.com not in config, as we used images of organization in decorating organizations better in sidebar , so update <code>next.config.ts</code> and images config
- Creating file <code>hint.tsx</code> for hinting on hover to any element.. this will be implemented using <code>tooltip</code> that we have downloaded before 
- 9:37pm 1-Sept-2025: Now working on Organization sidebar. 
- <code></code>
- <code></code>