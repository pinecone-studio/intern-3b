import  PrismaClient  from "@/lib/prismaClient";
import { NextResponse } from "next/server";



const prisma = PrismaClient;

export async function GET(){
    try {
        const users = await prisma.user.findMany()
        return NextResponse.json(users, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function POST(request: Request){
    try {
        const body = await request.json();
        const {name, role, lessonId} = body;
        const newUser = await prisma.user.create({
            data: {
                name,
                role,
                lessonId
            }
        })
        return NextResponse.json(
  { 
    data: newUser, 
    message: "User created successfully" 
  }, 
  { status: 201 }
);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }}