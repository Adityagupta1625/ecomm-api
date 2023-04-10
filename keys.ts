import dotenv from "dotenv";
dotenv.config();

const keys = {
    firebase: {
        projectId: process.env.FB_PROJECT_ID || "",
        clientEmail: process.env.FB_CLIENT_EMAIL || "",
        privateKey: process.env.FB_PRIVATE_KEY || "",
    }
};

export default keys;