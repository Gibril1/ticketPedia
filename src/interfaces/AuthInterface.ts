import { Request } from "express";
import { IUser } from "../models/UserModel";

export interface IGetUserAuthInfoRequest extends Request {
    user: IUser
}


export interface IAmount {
    amount: number
}