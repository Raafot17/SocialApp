"use client";

import * as React from "react";
import { Suspense } from "react";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../theme";
import { store } from "@/lib/store";
import { Provider } from "react-redux";
import ToasterProvider from "./_component/Toaster/page";
import { Skeleton, Box } from "@mui/material";

// ✅ Lazy Loading Components
const Navbar = React.lazy(() => import("./_component/Navbar/page"));

// ✅ Skeleton Components
function NavbarSkeleton() {
  return (
    <Box sx={{ width: "100%", height: 60, bgcolor: "grey.200" }}>
      <Skeleton variant="rectangular" width="100%" height={60} />
    </Box>
  );
}

function SidebarSkeleton() {
  return (
    <Box sx={{ width: 240, height: "100vh", bgcolor: "grey.100", p: 2 }}>
      <Skeleton variant="text" width="80%" height={40} />
      <Skeleton variant="text" width="60%" height={40} />
      <Skeleton variant="text" width="70%" height={40} />
    </Box>
  );
}

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
              <Suspense fallback={<NavbarSkeleton />}>
                <Navbar />
              </Suspense>

      
       
              {children}

         
              <ToasterProvider />
            </Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
