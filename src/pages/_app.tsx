import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      </QueryClientProvider>
    </ClerkProvider>
  );
}