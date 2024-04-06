import connectDB from "./lib/connectDB.js";
import app from "./app.js";
import "dotenv/config.js"

const PORT = process.env.PORT || 3000

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`listening on http://localhost:${PORT}`);
    })
})
.catch((err) => {
    console.log(err);
})
