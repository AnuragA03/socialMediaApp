"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "./client"
import { z } from "zod"


export const switchFollow = async (userId: string) => {
    const { userId: currentUserId } = auth()

    //The currentUserId is your ID, representing the authenticated user who is performing the follow or unfollow action.

    if (!currentUserId) {
        throw new Error("User is not authenticated!!")
    }

    try {
        const existingFollow = await prisma.follower.findFirst({
            where: {
                followerId: currentUserId,

                // the userId parameter in the switchFollow function represents the ID of the user you want to follow or unfollow.
                followingId: userId
            }
        });

        if (existingFollow) {
            await prisma.follower.delete({
                where: {
                    id: existingFollow.id,
                }
            })
        }
        // which means we are not following the user
        else {
            const existingFollowRequest = await prisma.followRequest.findFirst({
                where: {
                    senderId: currentUserId,
                    receiverId: userId
                }
            })

            // if follow request already sent
            if (existingFollowRequest) {
                await prisma.followRequest.delete({
                    where: {
                        id: existingFollowRequest.id,
                    }
                })
            }

            //else if we never sent a follow request before
            else {
                await prisma.followRequest.create({
                    data: {
                        senderId: currentUserId,
                        receiverId: userId
                    }
                })
            }
        }
    } catch (error) {
        console.log(error)
    }
}


export const switchBlock = async (userId: string) => {
    const { userId: currentUserId } = auth()

    if (!currentUserId) {
        throw new Error("User is not authenticated!!")
    }

    try {
        const existingBlock = await prisma.block.findFirst({
            where: {
                blockerId: currentUserId,
                blockedId: userId,
            }
        });

        if (existingBlock) {
            await prisma.block.delete({
                where: {
                    id: existingBlock.id,
                }
            })
        }

        //if no block was created before
        else {
            await prisma.block.create({
                data: {
                    blockerId: currentUserId,
                    blockedId: userId
                }
            })
        }
    } catch (error) {
        console.log(error)
        throw new Error("Something went wrong");

    }
}


// Action for accepting Friend Requests

export const acceptFollowRequests = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error("User is not authenticated!!")
    }

    try {
        const existingFollowRequest = await prisma.followRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId,
            }
        });

        if (existingFollowRequest) {
            await prisma.followRequest.delete({
                where: {
                    id: existingFollowRequest.id,
                }
            })
        };

        await prisma.follower.create({
            data: {
                followerId: userId,
                followingId: currentUserId,
            }
        })
    }

    catch (err) {
        console.log(err)
        throw new Error("Something went wrong");
    }
}

// Action for Declining Friend Requests
export const declineFollowRequests = async (userId: string) => {
    const { userId: currentUserId } = auth();

    if (!currentUserId) {
        throw new Error("User is not authenticated!!")
    }

    try {
        const existingFollowRequest = await prisma.followRequest.findFirst({
            where: {
                senderId: userId,
                receiverId: currentUserId,
            }
        });

        if (existingFollowRequest) {
            await prisma.followRequest.delete({
                where: {
                    id: existingFollowRequest.id,
                }
            })
        };
    }

    catch (err) {
        console.log(err)
        throw new Error("Something went wrong");
    }
}


// Server actions to send input to update user profile
export const updateProfile = async (formData: FormData) => {

    const fields = Object.fromEntries(formData)

    // if you have an emprty string in one field we are not gonna teke them
    const filteredFields = Object.fromEntries(
        Object.entries(fields).filter(([key, value]) => value !== "")
    )

    console.log(fields)

    const Profile = z.object({
        cover:z.string().optional(),
        name:z.string().max(60).optional(),
        surname:z.string().max(60).optional(),
        description:z.string().max(255).optional(),
        city:z.string().max(60).optional(),
        school:z.string().max(60).optional(),
        work:z.string().max(60).optional(),
        website:z.string().max(60).optional(),
    })

    const validatedFields = Profile.safeParse(filteredFields)

    if(!validatedFields.success){
        console.log(validatedFields.error.flatten().fieldErrors)
        return "err"
    }

    const { userId } = auth();

    if(!userId){
        return "err"
    }

    try {
        await prisma.user.update({
            where: {
                id: userId
            },
            data: validatedFields.data
        })
    } catch (error) {
        console.log(error)
    }

}