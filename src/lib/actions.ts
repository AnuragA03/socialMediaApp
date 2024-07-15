"use server"

import { auth } from "@clerk/nextjs/server"
import prisma from "./client"


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