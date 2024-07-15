import Image from "next/image"
import Comments from "./Comments"


const Post = () => {
    return (
        <div className="flex flex-col gap-4">
            {/* User */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image
                        src="https://images.pexels.com/photos/19786392/pexels-photo-19786392/free-photo-of-photo-of-pink-flowers-and-a-kitten-on-a-shelf.jpeg"
                        alt=""
                        className="w-10 h-10 rounded-full"
                        width={40}
                        height={40} />
                    <span className="font-medium">Ameer Ali</span>
                </div>
                <Image
                    src="/more.png"
                    alt=""
                    width={16}
                    height={16} />
            </div>

            {/* Desc */}
            <div className="flex flex-col gap-4">
                <div className="w-full min-h-96 relative">
                    <Image
                        src="https://images.pexels.com/photos/14727286/pexels-photo-14727286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt=""
                        fill
                        className="object-cover rounded-md" />
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus repellat minus blanditiis, magni sunt reprehenderit excepturi ea nihil! Dolore praesentium eaque quas, molestias sit, ex obcaecati quod, error necessitatibus repellat molestiae dicta? Animi.</p>
            </div>

            {/* Interaction */}
            {/* we have to create different components because it updates such as likes etc. */}
            <div className="flex items-center justify-between text-sm my-4">
                <div className="flex gap-8">
                    {/* Likes */}
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image
                            src="/like.png"
                            alt=""
                            height={16}
                            width={16}
                            className="cursor-pointer" />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">123<span className="hidden md:inline"> Likes</span> </span>
                    </div>

                    {/* Comment */}
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image
                            src="/comment.png"
                            alt=""
                            height={16}
                            width={16}
                            className="cursor-pointer" />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">123<span className="hidden md:inline"> Comments</span> </span>
                    </div>
                </div>
                <div className="">
                    <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
                        <Image
                            src="/share.png"
                            alt=""
                            height={16}
                            width={16}
                            className="cursor-pointer" />
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">123<span className="hidden md:inline"> Shares</span> </span>
                    </div>
                </div>
            </div>

            {/* Comments */}
            <Comments />

        </div>
    )
}

export default Post