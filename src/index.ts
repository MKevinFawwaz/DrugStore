import Express from "express";
import medicineroute from "./router/medicineRoute"

const app = Express()
/**allow to read a body request with JSON format  */

app.use(Express.json())

/**prefix for medicine route */
app.use('/medicine',medicineroute) //

const PORT = 1992
app.listen(PORT,() => {
    console.log(`Server Drugsore run on port ${PORT}`)
})