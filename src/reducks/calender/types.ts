import { CalenderInfo } from "@/types"

export type CalenderState = CalenderInfo

export type CalenderAction = {
    type: string;
    payload: CalenderState;
}