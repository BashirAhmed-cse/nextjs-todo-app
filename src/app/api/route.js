import { connect } from "@/lib/config/db";
import TodoModel from "@/lib/models/TodoModels";
import { NextResponse } from "next/server";

const LoadDB = async () => {
    await connect();
}

export async function POST(request) {
    try {
        await LoadDB(); // Ensure DB connection is established

        const { title, description } = await request.json(); // Await request.json() to get the JSON data

        if (!title || !description) {
            return NextResponse.json({ error: "Title and description are required." }, { status: 400 });
        }

        const newTodo = await TodoModel.create({
            title,
            description
        });

        return NextResponse.json({ msg: "Todo Created", todo: newTodo },{
            status:201
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create Todo", details: error.message }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        await LoadDB(); // Ensure DB connection is established

        const Todos = await TodoModel.find({});

        return NextResponse.json({ Todos });
    } catch (error) {
        return NextResponse.json({ error: "Failed to get Todo", details: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await LoadDB(); // Ensure DB connection is established

        const id = request.nextUrl.searchParams.get("id");
        // console.log(request.nextUrl.searchParams.get("id"));
        await TodoModel.findByIdAndDelete(id);
        return NextResponse.json({  msg: "Todo Deleted" },{
            status:200
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to get Todo", details: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await LoadDB(); // Ensure DB connection is established

        const id = request.nextUrl.searchParams.get("id");
        // console.log(request.nextUrl.searchParams.get("id"));
        await TodoModel.findByIdAndUpdate(id,{
          $set:{
            isCompleted:true
          }  
        });
        return NextResponse.json({  msg: "Todo Updated" },{
            status:200
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to get Todo", details: error.message }, { status: 500 });
    }
}
