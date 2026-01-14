import  prismaClient  from "@/lib/prismaClient";
import { NextResponse } from "next/server";


const prisma = prismaClient;

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
try {
    const {id} = params
    const deleteUser = await prisma.user.delete({
        where: {id}
    })
    return NextResponse.json({
        data: deleteUser,
        message: "User deleted successfully"
    }, {status: 200});
} catch (error) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
}}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
    try {
        const {id} = params;
        const body = await request.json();
    
        const updateUser = await prisma.user.update({
            where: {id},
            data: body
        })
        return NextResponse.json({data: updateUser, message: "User updated successfully"}, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }}