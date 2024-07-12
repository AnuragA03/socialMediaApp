import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image"

const AddPost = () => {

    const {userId} = auth();
    // console.log(userId)

    // const testAction = async (formData:FormData) => {
    //     "use server"

    //     // if not authenticated return
    //     if (!userId) {
    //         return;
    //     }

    //     const desc = formData.get("desc") as string;
    //     try {
    //         const res = await prisma.post.create({
    //             data: {
    //                 userId:userId,
    //                 desc: desc,
    //             },
    //         });

    //         console.log(res)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
            {/* Avatar */}
            <Image
                src="https://images.pexels.com/photos/25568965/pexels-photo-25568965/free-photo-of-a-woman-in-a-leopard-print-dress-and-cowboy-hat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                width={48}
                height={48}
                className="w-12 h-12 object-cover rounded-full" />

            {/* Post */}
            <div className="flex-1">
                {/* Text Input */}
                <form action="" className="flex gap-4">
                    <textarea placeholder="What's on your mind?" className="bg-slate-100 rounded-lg flex-1 p-2"
                    name="desc"></textarea>
                    <Image
                        src="/emoji.png"
                        alt=""
                        width={20}
                        height={20}
                        className="w-5 h-5 cursor-pointer self-end" />
                    <button type="submit">Send</button>
                </form>

                {/* Post Options */}
                <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                            src="/addimage.png"
                            alt=""
                            width={20}
                            height={20} />
                            Photo
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                            src="/addvideo.png"
                            alt=""
                            width={20}
                            height={20} />
                            Video
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                            src="/poll.png"
                            alt=""
                            width={20}
                            height={20} />
                            Poll
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <Image
                            src="/addevent.png"
                            alt=""
                            width={20}
                            height={20} />
                            Event
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost