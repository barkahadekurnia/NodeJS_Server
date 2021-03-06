import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
    try {
        const departments = await req.context.models.departments.findAll({
            include: [{
               all: true
            }]
        })
        return res.send(departments)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const findOne = async (req,res)=>{
    try {
        const departments = await req.context.models.departments.findOne({
            where:{department_id : req.params.id}
        })
        return res.send(departments)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    const cekLoc = req.locations
    try {
        const departments = await req.context.models.departments.create({
            department_id : req.body.department_id,
            department_name : req.body.department_name,
            location_id : cekLoc.location_id
        })
        return res.send(departments)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const createNext = async (req,res,next)=>{
    try {
        const departments = await req.context.models.departments.create({
            department_id : req.body.department_id,
            department_name : req.body.department_name,
            location_id : req.body.location_id
        })
        req.departments = departments
        next()
    } catch (error) {
        return res.status(404).send(error)
    }
}

// const create = async (req,res)=>{
//     try {
//         const departments = await req.context.models.departments.create({
//             department_id : req.body.department_id,
//             department_name : req.body.department_name,
//             location_id : req.body.location_id
//         })
//         return res.send(departments)
//     } catch (error) {
//         return res.status(404).send(error)
//     }
// }

const update = async (req,res)=>{
    try {
        const departments = await req.context.models.departments.update({
            department_name : req.body.department_name,
            location_id : req.body.location_id
        },{ returning : true , where:{department_id : req.params.id}})
        return res.send(departments)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const departments = await req.context.models.departments.destroy({
            where:{department_id : req.params.id}
        })
        return res.send('delete '+departments+' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('UPDATE departments SET department_name = :departmentName where department_id = :departmentId',
        {replacements : {
            departmentId : req.params.id,
            departmentName : req.body.department_name
            },
            type : sequelize.QueryTypes.UPDATE})
        .then(result =>{
            return res.send(result)
        })
    } catch (error) {
        return res.status(404).send(error)
    }
}

export default {
    findAll,
    findOne,
    create,
    createNext,
    update,
    deleted,
    querySQL
}