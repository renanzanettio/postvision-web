import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import * as jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "segredo";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Permitir acesso livre às rotas públicas e de API de login/cadastro
  if (
    pathname.startsWith("/public") ||
    pathname.startsWith("/api/login") ||
    pathname.startsWith("/api/cadastro")
  ) {
    return NextResponse.next();
  }

  // Bloquear /dashboard sem token
  if (pathname.startsWith("/dashboard")) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.redirect(new URL("/public", req.url));
    }

    const token = authHeader.split(" ")[1];

    try {
      jwt.verify(token, SECRET);
      return NextResponse.next(); // Token válido → libera
    } catch {
      return NextResponse.redirect(new URL("/public", req.url)); // Token inválido
    }
  }

  return NextResponse.next();
}

// Aplica o middleware apenas nessas rotas
export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
