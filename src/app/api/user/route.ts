import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "segredo";

export async function GET(req: Request) {
  try {
    // Pegar cookies
    const token = req.headers.get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
    }

    // Verificar e decodificar o token
    const decoded = jwt.verify(token, SECRET) as { id: number; email: string };

    // Buscar o usuário no banco
    const usuario = await prisma.usuarios.findUnique({
      where: { id_usuario: decoded.id },
      select: {
        id_usuario: true,
        nome_usuario: true,
        sobrenome_usuario: true,
        email_usuario: true,
        telefone_usuario: true,
        genero_usuario: true,
        data_nascimento_usuario: true,
        created_at_usuario: true,
      },
    });

    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ usuario });
  } catch (err: any) {
    console.error("Erro ao buscar usuário:", err);
    return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
  }
}
