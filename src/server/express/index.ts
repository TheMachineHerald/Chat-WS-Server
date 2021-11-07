import express, {
	Application,
	Request,
	Response,
	NextFunction
} from "express"

const app: Application = express()

app.get("/", (req: Request, res: Response): void => {
	res.send("[Nebuchadnezzar] is online...")
})

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
	console.log(`error '${err.message}'`)
	res.status(500)
	res.json({ error: err.message })
})

export default app