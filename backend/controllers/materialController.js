const Material = require("../models/materialModel")
const mongoose = require("mongoose")

// get all materials, sort by descending order makes newest rise to top
// assigning user_id as current logged in user protects api/materials route return only that users documents
const getMaterials = async (req, res) => {
    const user_id = req.user._id

    const materials = await Material.find({ user_id }).sort({ createdAt: -1 })
    res.status(200).json(materials)
}

//get a single material 
const getMaterial = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Document not found" })
    }
    const material = await Material.findById(id)

    if (!material) {
        return res.status(404).json({ error: "Document not found" })
    }

    res.status(200).json(material)
}

// create new material 

const createMaterial = async (req, res) => {
    const { title, body, tags } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push("title")
    }
    if (!body) {
        emptyFields.push("body")
    }
    if (!tags) {
        emptyFields.push("tags")
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: "Please complete all the boxes.", emptyFields })
    }

    // add doc to db
    try {
        const user_id = req.user._id
        const material = await Material.create({ title, body, tags, user_id })
        res.status(200).json(material)
    } catch (error) {
        res.status(400).json({ error: error.message })

    }

}



// delete a material

const deleteMaterial = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Document not found" })
    }

    const material = await Material.findOneAndDelete({ _id: id })

    if (!material) {
        return res.status(400).json({ error: "Document not found" })
    }

    res.status(200).json(material)
}

// update a material 

const updateMaterial = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Document not found" })
    }

    const material = await Material.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!material) {
        return res.status(400).json({ error: "Document not found" })
    }

    res.status(200).json(material)

}

module.exports = {
    getMaterials,
    getMaterial,
    createMaterial,
    deleteMaterial,
    updateMaterial
}