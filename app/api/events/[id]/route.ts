import authOptions from "@/app/auth/authOptions";
import { eventSchema } from "@/app/schema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest,
    { params }: { params: { id: string } }) {
   const session = await getServerSession(authOptions)
   if (!session) return NextResponse.json({}, {status: 401})

    const body = await request.json()
    const validate = eventSchema.safeParse(body)
    if (!validate.success)
        return NextResponse.json(validate.error.errors, { status: 400 }) // bad request

    const checkEvent = await prisma.events.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!checkEvent)
        return NextResponse.json('Not found', { status: 404 })

    const updatedEvent = await prisma.events.update({
        where: { id: parseInt(params.id) },
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(updatedEvent, { status: 200 })
}

export async function DELETE(request: NextRequest,
    { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({}, {status: 401})

    const checkEvent = await prisma.events.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!checkEvent)
        return NextResponse.json('Invalid event', { status: 404 })

    await prisma.events.delete({
        where: { id: parseInt(params.id) }
    })

    return NextResponse.json({}, { status: 200 })
}