import { Webhook } from "svix"
import { userModel } from "../models/user.model.js"
// API CONTROLLER function to manage clerk user with database
// https://localhost:4000/api/user/webhooks
const ClerkWebHooks = async (req,res)=>{
    try {
        
        // create svix instance with clerk webhook secret
        const wHook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        await wHook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"],

        })


        const {data,type} = req.body

        switch (type) {
            case "user.created":{

                const userData = {
                    clerkId : data.id,
                    email: data.email_addresses[0].email_address,
                    firstname:data.first_name,
                    lastname:data.last_name,
                    photo:data.image_url
                }

                await userModel.create(userData)
                res.json({})
                break;
            }


            case "user.updated":{


                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstname:data.first_name,
                    lastname:data.last_name,
                    photo:data.image_url
                }

                await userModel.findOneAndUpdate({clerkId:data.id},userData)
                res.json({})

                break;
            }

            case "user.deleted":{

                await userModel.findOneAndDelete({clerkId:data.id})
                res.json({})


                break;
            }

            default:
                break;
        }


    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}
export {ClerkWebHooks}