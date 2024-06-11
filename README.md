Application Link: https://rage-trade-front.vercel.app/

## How run the project

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

## Optimizations

1. This project uses `next/image` to automatically optimize and load images.
2. Using useCallback and useMemo for deriving state when it actually needs.
3. Using Promise.all to fetch all data at the same time.
4. This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
5. Using `multicall` from `wagmi` for fetching balances in 4 rpc requests.

## Architectural decisions

1. Used file structure which contains advantages of FSD and Classic structures.
2. Main provider is `TokenProvider` which fetches balances of all tokens in Optimism, Arbitrum chains. It also computes full balance, chain balances, wallet balances.
3. TailwindCSS was used for styling components. UI Kit is custom.
