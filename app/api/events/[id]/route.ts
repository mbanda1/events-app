import { eventSchema } from "@/app/schema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(request: NextRequest,
    { params }: { params: { id: string } }) {

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