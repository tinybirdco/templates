Build multi-tenant apps with Clerk and Tinybird.

## Prerequisites

1. A Clerk account. [Sign up for free](https://clerk.com).
2. A Tinybird account and workspace. [Sign up for free](https://tinybird.co/signup).

## Configure the .env

Create a `.env` file in the root of the project and add the following variables:

```
# Tinybird API URL (replace with your Tinybird region host)
NEXT_PUBLIC_TINYBIRD_API_URL=https://api.tinybird.co
# Tinybird workspace ID for multi-tenant JWT tokens
TINYBIRD_WORKSPACE_ID=
# Tinybird workspace admin token for multi-tenant JWT tokens
TINYBIRD_JWT_SECRET=
# Tinybird default key for unauthenticated requests
NEXT_PUBLIC_TINYBIRD_API_KEY=

# Clerk publishable key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
# Clerk secret key
CLERK_SECRET_KEY=
# Clerk sign in URL
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```

## How to use the JWT token

This is your root layout:

```javascript
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const token = headersList.get('x-tinybird-token') || ''
  const orgName = headersList.get('x-org-name') || ''

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <TinybirdProvider>
            <RootLayoutContent initialToken={token} initialOrgName={orgName}>
              {children}
            </RootLayoutContent>
          </TinybirdProvider>
        </ClerkProvider>
      </body>
    </html>
  )
} 
```

Then you can get the token from any component with:

```javascript
const { token } = useTinybirdToken()
```

## Customize the JWT token

Implement your user management policies and permissions in your Clerk organization (see [Clerk docs](https://clerk.com/docs/organizations/roles-permissions)).

Then you can customize the JWT token by modifying the `clerkMiddleware` function and the signJWT function.

```javascript
const token = await new jose.SignJWT({
    workspace_id: process.env.TINYBIRD_WORKSPACE_ID,
    name: `frontend_jwt_user_${userId}`,
    exp: Math.floor(Date.now() / 1000) + (60 * 15), // 15 minute expiration
    iat: Math.floor(Date.now() / 1000),
    scopes: [
    {
        type: "PIPES:READ",
        resource: "your_pipe",
        fixed_params: { user_id: userId, org_permission: orgName }
    }
    ],
    limits: {
    rps: 10
    }
})
    .setProtectedHeader({ alg: 'HS256' })
    .sign(secret)
```

See this guide for more details: [Multi-tenant real-time APIs with Clerk and Tinybird](https://tinybird.co/docs/publish/api-endpoints/guides/multitenant-real-time-apis-with-clerk-and-tinybird).