import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT ?? 4321

app.use(cors())
app.use(express.json())

app.post('/user-data', (req, res) => {
	res.json(req.body)
})

const start = async () => {
	try {
		app.listen(PORT, () => {
			console.log('START ==>', PORT)
		})
	} catch (error) {
		console.error(error)
	}
}
start()
