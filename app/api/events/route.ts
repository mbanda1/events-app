import { NextRequest, NextResponse } from "next/server";
import { eventSchema } from "../../schema";
import prisma from "@/prisma/client";

 export async function POST(request:NextRequest) {
    const body = await request.json()

    const validate = eventSchema.safeParse(body)
    if (!validate.success) 
    return NextResponse.json(validate.error.errors, { status: 400})

    const create = await prisma.events.create({
        data: {
            title: body.title,
            description: body.description,
        }
    })

    return NextResponse.json(create, {status: 201})
 }