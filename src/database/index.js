import mongoose from "mongoose";


const connectToDB = async () => {
  const connectToURL =
    "mongodb+srv://asifxyz:ASIF2025@cluster0.mdwnx.mongodb.net/";
  mongoose
    .connect(connectToURL)
    .then(() => console.log("blog database connection is succesfull"))
    .catch((error) => console.log(error));
};
// try {
//   await mongoose.connect(connectToURL);
//   console.log("blog database connection is successful");
// } catch (error) {
//   console.log(error);
// }
export default connectToDB;