import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import { date } from "joi";

/** create object of prisma */
const prisma = new PrismaClient()
type DrugType = "Syrup" | "Tablet" | "Powde"
const createMedicine = async (req: Request, res: Response) => {
    try {
        const name: string = req.body.name
        const stock: number = Number(req.body.stock)
        const exp_date: Date = new Date(req.body.exp_date)
        const price: number = Number(req.body.price)
        const type: DrugType = req.body.type

        /** save a new medicine to DB */
        const newMedicine = await prisma.medicine.create({
            data: {
                name, stock, exp_date, price, type
            }
        })
        return res.status(200)
            .json({
                message: "Medicine created successfully",
                data: newMedicine
            })
    } catch (error) {
        console.log(error)
        return res.status(500)
            .json(error)
    }
}

const readMedicine = async (
    req: Request,
    res: Response
) => {
    try {
        const search = req.query.search
        /**get all medicine */
        const allMedicine = await prisma.medicine.findMany({
            where: {
                OR: [
                    { name: { contains: search?.toString() || "" }}
                ]
            }
        })
        return res.status(200)
            .json({
                message: `medicine has been retrieved`,
                data: allMedicine
            })
    } catch (error) {
        res.status(500)
            .json(error)
    }
}

const updateMedicine = async (req: Request, res: Response) => {
    try {
        /**read "id" of medicine that sent at parameter URL */
        const id = req.params.id
        /**check existing medicine based ono id */
        const findMedicine = await prisma.medicine.findFirst({
            where: { id: Number(id) }
        })

        if (!findMedicine) {
            return res.status(200).json({ message: "Medicine not found" })
        }

        /**read property of medicine from req.body */
        const { name, stock, price, type, exp_date } = req.body

        /**update medicine */
        const saveMedicine = await prisma.medicine.update({
            where: { id: Number(id) },
            data: {
                name: name ?? findMedicine.name,
                stock: stock ? Number(stock) : findMedicine.stock,
                price: price ? Number(price) : findMedicine.price,
                exp_date: exp_date ? new Date(exp_date) : findMedicine.exp_date,
                type: type ? type : findMedicine.type
            }
        })

        return res.status(200)
            .json({
                message: `Medicine has been updated`,
                data: saveMedicine
            })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

const deleteMedicine = async (req: Request, res: Response) => {
    try {
        /** read id of medicine from request parameter */
        const id = req.params.id
        /**check existing medicine  */
        const findMedicine = await prisma.medicine.findFirst({
            where: { id: Number(id) }
        })

        if (!findMedicine) {
            return res.status(200).json({
                message: "Medicine not found"
            })
        }
        const saveMedicine = await prisma.medicine.delete({
            where: { id: Number(id) }
        })
        return res.status(200).json({
            message: `Medicine has been removed`
        })
    } catch (error) {
        return res.status(500)
            .json(error)
    }
}

export { createMedicine, readMedicine, updateMedicine, deleteMedicine } 