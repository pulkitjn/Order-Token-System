import OrderItem from "../../models/orderItemModel.js";

const changeOrderItemStatus = async (req,res) =>{
    try{
        const {id} = req.params;
        if(!id){
            console.log(`No order item id recieved`);
            return res.status(400).json({error: `No order item id recieved`});
        }
        const { status} = req.body;
        if(!['inqueue','inprocess','prepared','collected'].includes(status)){
            console.log(`Invalid status: ${status}`);
            return res.status(400).json({error: `Invaild status recieved`});
        }
        const result = await OrderItem.findByIdAndUpdate(id,{status});
        if(!result){
            console.log(`Order Item with id ${id} not found`);
            return res.status(404).json({error: `Order Item not found`});
        }
        console.log(`Order Item updated successfully ${result}`);
        return res.status(200).json({result});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export default changeOrderItemStatus;