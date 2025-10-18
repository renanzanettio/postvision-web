// src/app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const {
      nome,
      sobrenome,
      email,
      senha,
      nascimento,
      genero,
      cpf,
      telefone,
    } = await req.json();

    // Verificação básica
    if (!nome || !sobrenome || !email || !senha || !nascimento || !genero || !cpf || !telefone) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios!" },
        { status: 400 }
      );
    }

    // Verifica se o email já está cadastrado
    const usuarioExistente = await prisma.usuarios.findUnique({
      where: { email_usuario: email },
    });

    if (usuarioExistente) {
      return NextResponse.json(
        { error: "E-mail já cadastrado!" },
        { status: 400 }
      );
    }

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const novoUsuario = await prisma.usuarios.create({
      data: {
        nome_usuario: nome,
        sobrenome_usuario: sobrenome,
        email_usuario: email,
        senha_usuario: senhaHash,
        data_nascimento_usuario: new Date(nascimento),
        genero_usuario: genero,
        cpf_usuario: cpf,
        telefone_usuario: telefone,
        created_at_usuario: new Date(), // data atual
      },
    });

    return NextResponse.json({
      message: "Usuário criado com sucesso!",
      usuario: {
        id_usuario: novoUsuario.id_usuario,
        nome_usuario: novoUsuario.nome_usuario,
        sobrenome_usuario: novoUsuario.sobrenome_usuario,
        email_usuario: novoUsuario.email_usuario,
      },
    });
  } catch (err) {
    console.error("Erro no cadastro:", err);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
