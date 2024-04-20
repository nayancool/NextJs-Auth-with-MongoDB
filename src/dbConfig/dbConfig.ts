import mongoose from 'mongoose';

export async function connect() {
    try {
        //const uri = "mongodb+srv://nayan:12345@cluster0.6kfejfx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
        mongoose.connect(process.env.MONGO_URI!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })

        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            process.exit();
        })

    } catch (error) {
        console.log('Something goes wrong!');
        console.log(error);
    }
}