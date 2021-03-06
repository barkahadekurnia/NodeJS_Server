import { sequelize } from "../models/init-models"

const findAll = async (req,res)=>{
    try {
        const employees = await req.context.models.employees.findAll()
        return res.send(employees)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const findOne = async (req,res)=>{
    try {
        const employees = await req.context.models.employees.findOne({
            where:{employee_id : req.params.id}
        })
        return res.send(employees)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const create = async (req,res)=>{
    const cekJobs = req.jobs
    const cekDep = req.departments
    try {
        const employees = await req.context.models.employees.create({
            employee_id : req.body.employee_id,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : req.body.hire_date,
            job_id : cekJobs.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : cekDep.department_id
        })
        return res.send(employees)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const createNext = async (req,res,next)=>{
    try {
        const employees = await req.context.models.employees.create({
            employee_id : req.body.employee_id,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : req.body.hire_date,
            job_id : req.body.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : req.body.department_id
        })
        req.employees = employees
        next()
    } catch (error) {
        return res.status(404).send(error)
    }
}

// const create = async (req,res)=>{
//     try {
//         const employees = await req.context.models.employees.create({
//             employee_id : req.body.employee_id,
//             first_name : req.body.first_name,
//             last_name : req.body.last_name,
//             email : req.body.email,
//             phone_number : req.body.phone_number,
//             hire_date : req.body.hire_date,
//             job_id : req.body.job_id,
//             salary : req.body.salary,
//             manager_id : req.body.manager_id,
//             department_id : req.body.department_id
//         })
//         return res.send(employees)
//     } catch (error) {
//         return res.status(404).send(error)
//     }
// }
const update = async (req,res)=>{
    try {
        const employees = await req.context.models.employees.update({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            email : req.body.email,
            phone_number : req.body.phone_number,
            hire_date : req.body.hire_date,
            job_id : req.body.job_id,
            salary : req.body.salary,
            manager_id : req.body.manager_id,
            department_id : req.body.department_id
        },{ returning : true , where:{employee_id : req.params.id}})
        return res.send(employees)
    } catch (error) {
        return res.status(404).send(error)
    }
}

const deleted = async (req,res)=>{
    try {
        const employees = await req.context.models.employees.destroy({
            where:{employee_id : req.params.id}
        })
        return res.send('delete '+employees+' rows')
    } catch (error) {
        return res.status(404).send(error)
    }
}

const querySQL = async(req,res)=>{
    try {
        await sequelize.query('SELECT * from employees JOIN jobs ON employees.job_id = jobs.job_id where employees.employee_id = :employeesId',
        {replacements : {employeesId : req.params.id},type : sequelize.QueryTypes.SELECT})
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