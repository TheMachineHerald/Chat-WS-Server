import express from "express"

const app = express()

app.get("/", (req, res) => {
	res.send("[Nebuchadnezzar] is online...")
})

app.use((err, req, res, next) => {
	console.log(`error '${err.message}'`)
	res.status(500)
	res.json({ error: err.message })
})

export default app