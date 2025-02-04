import prismadb from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

export async function GET(
    _req: Request,
    { params }: { params: { billboardId: string } }
) {
    try {
        if (!params.billboardId) {
            return new NextResponse('Billboard id is required', { status: 400 })
        }

        const billbaord = await prismadb.billboard.findUnique({
            where: {
                id: params.billboardId,
            }
        })

        return NextResponse.json(billbaord)
    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, billbaordId: string } }
) {
    try {
        const { userId } = auth()
        const body = await req.json()

        const { label, imageUrl } = body

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 })
        }

        if (!label) {
            return new NextResponse('Label is required', { status: 400 })
        }

        if (!imageUrl) {
            return new NextResponse('Image Url is required', { status: 400 })
        }

        if (!params.billbaordId) {
            return new NextResponse('billbaord id is required', { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse('Unauthorized', { status: 403 })
        }

        const billbaord = await prismadb.billboard.updateMany({
            where: {
                id: params.billbaordId,
            },
            data: {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billbaord)
    } catch (error) {
        console.log('[BILLBOARD_PATCH]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: { storeId: string, billboardId: string } }
) {
    try {
        const { userId } = auth()

        if (!userId) {
            return new NextResponse('Unauthenticated', { status: 401 })
        }

        if (!params.billboardId) {
            return new NextResponse('Billboard id is required', { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse('Unauthorized', { status: 403 })
        }

        const billbaord = await prismadb.billboard.deleteMany({
            where: {
                id: params.billboardId,
            }
        })

        return NextResponse.json(billbaord)
    } catch (error) {
        console.log('[BILLBOARD_DELETE]', error)
        return new NextResponse('Internal error', { status: 500 })
    }
}