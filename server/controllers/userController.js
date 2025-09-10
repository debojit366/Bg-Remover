import { Webhook } from "svix";
import { userModel } from "../models/user.model.js";
// API CONTROLLER function to manage clerk user with database
// https://localhost:4000/api/user/webhooks
const ClerkWebHooks = async (req, res) => {
  try {
    console.log("Webhook received:", req.body.type);

    // create svix instance with clerk webhook secret
    const wHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await wHook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
    console.log("Webhook data:", JSON.stringify(data, null, 2));

    switch (type) {
      case "user.created": {
        // Handle email/password signups that might have missing data
        const userData = {
          clerkId: data.id,
          email:
            data.email_addresses?.[0]?.email_address || "no-email@example.com",
          firstname: data.first_name || "User",
          lastname: data.last_name || "Name",
          photo: data.image_url || "https://via.placeholder.com/150",
        };

        console.log("Creating user with data:", userData);
        const newUser = await userModel.create(userData);
        console.log("User created successfully:", newUser);
        res.json({ success: true, message: "User created successfully" });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses?.[0]?.email_address,
          firstname: data.first_name,
          lastname: data.last_name,
          photo: data.image_url,
        };

        // Remove undefined values
        Object.keys(userData).forEach((key) => {
          if (userData[key] === undefined) {
            delete userData[key];
          }
        });

        console.log("Updating user with data:", userData);
        const updatedUser = await userModel.findOneAndUpdate(
          { clerkId: data.id },
          userData
        );
        console.log("User updated successfully:", updatedUser);
        res.json({ success: true, message: "User updated successfully" });
        break;
      }

      case "user.deleted": {
        console.log("Deleting user:", data.id);
        const deletedUser = await userModel.findOneAndDelete({
          clerkId: data.id,
        });
        console.log("User deleted successfully:", deletedUser);
        res.json({ success: true, message: "User deleted successfully" });
        break;
      }

      default:
        console.log("Unhandled webhook type:", type);
        res.json({ success: false, message: "Unhandled webhook type" });
        break;
    }
  } catch (error) {
    console.error("Webhook error:", error.message);
    console.error("Full error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export { ClerkWebHooks };