
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongoose";
import User from "@/lib/models/User";


const SECRET = process.env.JWT_SECRET || "segredo";

export async function GET(req: Request) {
  try {
    await connectDB();

    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET) as { id: string };

    const usuario = await User.findById(decoded.id).select("-password");

    if (!usuario) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      usuario: {
        id_usuario: usuario._id.toString(),
        nome_usuario: usuario.firstName,
        sobrenome_usuario: usuario.lastName,
        cpf_usuario: usuario.cpf,
        email_usuario: usuario.email,
        telefone_usuario: usuario.phone,
        genero_usuario: usuario.gender,
        data_nascimento_usuario: usuario.birthDate,
        created_at_usuario: usuario.createdAt,
      },
    });
  } catch (err) {
    console.error("Erro ao buscar usuário:", err);
    return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
  }
}

// PUT

export async function PUT(req: Request) {
  try {
    await connectDB();

    const token = req.headers
      .get("cookie")
      ?.split("; ")
      .find((c) => c.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      return NextResponse.json({ error: "Token não encontrado" }, { status: 401 });
    }

    const decoded = jwt.verify(token, SECRET) as { id: string };

    const body = await req.json();
    const { type, data } = body;

    let updateData: any = {};

    if (type === "personal") {
      const cleanCPF = data.cpf_usuario.replace(/\D/g, "");
      updateData = {
        firstName: data.nome_usuario,
        lastName: data.sobrenome_usuario,
        cpf: cleanCPF,
        gender: data.genero_usuario,
        birthDate: data.data_nascimento_usuario,
      };
    } else if (type === "security") {
      const cleanphone = data.telefone_usuario.replace(/\D/g, "");
      updateData = {
        phone: cleanphone,
        email: data.email_usuario,
      };
    } else {
      return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
    }

    const usuarioAtualizado = await User.findByIdAndUpdate(
      decoded.id,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      message: "Usuário atualizado com sucesso!",
      usuario: {
        id_usuario: usuarioAtualizado?._id.toString(),
        nome_usuario: usuarioAtualizado?.firstName,
        sobrenome_usuario: usuarioAtualizado?.lastName,
        cpf_usuario: usuarioAtualizado?.cpf,
        email_usuario: usuarioAtualizado?.email,
        telefone_usuario: usuarioAtualizado?.phone,
        genero_usuario: usuarioAtualizado?.gender,
        data_nascimento_usuario: usuarioAtualizado?.birthDate,
      },
    });

  } catch (err) {
    console.error("Erro ao atualizar usuário:", err);
    return NextResponse.json({ error: "Erro ao atualizar usuário" }, { status: 500 });
  }
}
