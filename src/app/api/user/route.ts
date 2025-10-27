import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "segredo";

// ============================
// GET → Retorna dados do usuário
// ============================
export async function GET(req: Request) {
  try {
    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET) as { id: number; email: string };

    const usuario = await prisma.usuarios.findUnique({
      where: { id_usuario: decoded.id },
      select: {
        id_usuario: true,
        nome_usuario: true,
        sobrenome_usuario: true,
        cpf_usuario: true,
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

// ============================
// PUT → Atualiza dados do usuário
// ============================
export async function PUT(req: Request) {
  try {
    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET) as { id: number; email: string };

    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json({ error: "Tipo de atualização ou dados inválidos" }, { status: 400 });
    }

    let updateData: any = {};

    // Seção pessoal
    if (type === "personal") {
      updateData = {
        nome_usuario: data.nome_usuario,
        sobrenome_usuario: data.sobrenome_usuario,
        cpf_usuario: data.cpf_usuario,
        genero_usuario: data.genero_usuario,
        data_nascimento_usuario: data.data_nascimento_usuario ? new Date(data.data_nascimento_usuario) : undefined,
      };
    }
    // Seção segurança
    else if (type === "security") {
      updateData = {
        telefone_usuario: data.telefone_usuario,
        email_usuario: data.email_usuario,
      };
    } else {
      return NextResponse.json({ error: "Tipo de edição inválido" }, { status: 400 });
    }

    // Remove undefined para não sobrescrever
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) delete updateData[key];
    });

    const usuarioAtualizado = await prisma.usuarios.update({
      where: { id_usuario: decoded.id },
      data: updateData,
      select: {
        id_usuario: true,
        nome_usuario: true,
        sobrenome_usuario: true,
        cpf_usuario: true,
        email_usuario: true,
        telefone_usuario: true,
        genero_usuario: true,
        data_nascimento_usuario: true,
      },
    });

    return NextResponse.json({
      message: "Usuário atualizado com sucesso!",
      usuario: usuarioAtualizado,
    });
  } catch (err: any) {
    console.error("Erro ao atualizar usuário:", err);
    return NextResponse.json({ error: "Erro ao atualizar dados do usuário" }, { status: 500 });
  }
}
