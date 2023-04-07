import prisma from "../../prisma/client";
import HttpException from "../models/http-exception";
import UserAddress from "../models/UserAddress";
import uuid from "uuid";

export const createUserAddress = async (UserAddress: UserAddress) => {
  try {
    if (!UserAddress?.userId)
      throw new HttpException(400, "User ID is required");

    if (
      !UserAddress?.address_line1 ||
      !UserAddress?.city ||
      !UserAddress?.state ||
      !UserAddress?.country ||
      !UserAddress?.pincode ||
      !UserAddress?.mobile
    ) {
      throw new HttpException(400, "Incomplete Details");
    }


    const userAddress = await prisma.userAddress.create({
      data: {
        id: uuid.v4(),
        userId: UserAddress?.userId,
        address_line1: UserAddress?.address_line1,
        address_line2: UserAddress?.address_line2 || "",
        city: UserAddress?.city,
        state: UserAddress?.state,
        country: UserAddress?.country,
        pincode: UserAddress?.pincode,
        mobile: UserAddress?.mobile,
        telephone: UserAddress?.telephone || "",
        updatedAt: new Date(),
      },
    });
    return userAddress;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const updateUserAddress = async (UserAddress: UserAddress) => {
  try {
    if (UserAddress?.id)
      throw new HttpException(400, "User Address ID is required");

    let userAddress = await getUserAddressbyId(UserAddress?.id);

    if (!userAddress)
      throw new HttpException(400, "User Address does not exist");

    const updatedUserAddress = await prisma.userAddress.update({
      where: {
        id: UserAddress?.id,
      },
      data: {
        address_line1: UserAddress?.address_line1 || userAddress?.address_line1,
        address_line2: UserAddress?.address_line2 || userAddress?.address_line2,
        city: UserAddress?.city || userAddress?.city,
        state: UserAddress?.state || userAddress?.state,
        country: UserAddress?.country || userAddress?.country,
        pincode: UserAddress?.pincode || userAddress?.pincode,
        mobile: UserAddress?.mobile || userAddress?.mobile,
        telephone: UserAddress?.telephone || userAddress?.telephone,
        updatedAt: new Date(),
      },
    });

    return updatedUserAddress;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const deleteUserAddress = async (id: string) => {
  try {
    if (!id) throw new HttpException(400, "User Address ID is required");

    let userAddress = await getUserAddressbyId(id);

    if (!userAddress)
      throw new HttpException(400, "User Address does not exist");

    await prisma.userAddress.delete({
      where: {
        id: id,
      },
    });

    return true;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const getUserAddressbyId = async (id: string) => {
  try {
    if (!id) throw new HttpException(400, "User Address ID is required");

    let userAddress = await prisma.userAddress.findUnique({
      where: {
        id: id,
      },
    });

    return userAddress;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};

export const getUserAddressbyUserId = async (userId: string) => {
  try {
    if (!userId) throw new HttpException(400, "User ID is required");

    let userAddress = await prisma.userAddress.findMany({
      where: {
        userId: userId,
      },
    });


    return userAddress;
  } catch (err: any) {
    throw new HttpException(500, err?.message);
  }
};
