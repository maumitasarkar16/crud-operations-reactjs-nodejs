import express from 'express';
import BasicForm from '../model/basicFormModel.js';
import bcrypt from 'bcrypt';
import Joi from 'joi'

const router = express.Router();

//Add data via Basic Form Submission
router.post("/", async (req, res) => {
    //schema for backend
    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().required(),
        email: Joi.string().max(200).required().email(),
        password: Joi.string().min(5).max(200).required(),
        //confirmPassword: Joi.string().min(5).max(200).required(),
    });

    //data coming from backend
    console.log("req.body---", req.body)

    //validating
    const { error } = schema.validate(req.body);
    console.log("error===", error)

    if (error) return res.status(400).send(error.details[0].message);


    let formData = await BasicForm.findOne({ email: req.body.email });
    if (formData) return res.status(400).send("User already exists...");

    formData = new BasicForm({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        //confirmPassword: req.body.confirmPassword,
    })

    const salt = await bcrypt.genSalt(10);
    formData.password = await bcrypt.hash(formData.password, salt);
    formData = await formData.save();
    res.send(formData)

})



// Get all records of Basic Form Collection
router.get("/getAllFormData", async (req, res) => {
	const getAllRecords = await BasicForm.find()
	res.send(getAllRecords)
})

//Get individual Record of Form Collection
router.get("/getFormDataList/:id", async (req, res) => {
    try {
	    const getFormData = await BasicForm.findOne({ _id: req.params.id })
	    res.send(getFormData)
    }catch {
        res.status(404)
		res.send({ error: "Record doesn't exist!" })
    }
})


//update form data
router.patch("/updateFormData/:id", async (req, res) => {
	try {
		const editForm = await BasicForm.findOne({ _id: req.params.id })

		if (req.body.name) {
			editForm.name = req.body.name
		}

		if (req.body.age) {
			editForm.age = req.body.age
		}

        if (req.body.email) {
			editForm.email = req.body.email
		}

		await editForm.save()
		res.send(editForm)
	} catch {
		res.status(404)
		res.send({ error: "Record doesn't exist!" })
	}
})

//delete Form Data
router.delete("/deleteFormData/:id", async (req, res) => {
	try {
		await BasicForm.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Record  doesn't exist!" })
	}
})



export default router