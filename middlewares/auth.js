import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { authService } from "../services";


const protectedRoutes = ["/profile", "change-password"];
const authRoutes = ["/login", "/register", "forgot-password"];
const publicRoutes = ["/"];

export async function middleware(request) 
{
    const currentUser = authService.getUser();
    
    if (currentUser)
    {
       await authService.refreshToken();
    }

    if (protectedRoutes.includes(request.nextUrl.pathname))
    {
        authService.logout();
        const response = NextResponse.redirect(new URL("/login", request.url));
  
        return response;
    }
  
    if (authRoutes.includes(request.nextUrl.pathname) && currentUser)
    {
      return NextResponse.redirect(new URL("/profile", request.url));
    }
  }