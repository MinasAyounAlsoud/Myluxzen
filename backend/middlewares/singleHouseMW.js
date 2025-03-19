import { SingleHouse } from "../models/SingleHouseSchema.js";

export const getHouses = async(req,res,next)=>{
    try {
        console.log("GET request to getHouses"); 
        const {houseType} = req.params;
        console.log("houseType", houseType);
        const houses = await SingleHouse.find({houseType})
                                        .populate('hausBeschreibung');
        req.result = houses;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const editSingleHouse = async(req,res,next)=>{
    const { houseNum } = req.params;
    const { isAvailable,bookingNum, guestName} = req.body;
    // console.log("editSingleHouse,req.body", req.body)
    try {
        const filter =  { houseNum}; 
        // const filter = {id};
        // const test = await SingleHouse.findOne(filter);
        console.log("GET request to editSingleHouse", houseNum); 
        console.log("GET request to editSingleHouse", req.body); 
        let updateData = {};
        //check in process
        if(!isAvailable){
            updateData = {
                $set: {
                    isAvailable: false,
                    bookingNum: bookingNum,
                    guestName: guestName
                }
            };
        }else{
            //checkout process
            updateData = {
                $set: {
                    isAvailable: true,
                    bookingNum: "",
                    guestName: []
                }
            };
        }
        const singleHouse = await SingleHouse.updateOne(filter, updateData);
        console.log("singleHouse",singleHouse)
        req.bookingNum = bookingNum;
        req.houseNum = houseNum;
        console.log("editSingleHouse req.bookingNum",req.bookingNum)
        next(); 
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const querySingleHouses = async(req,res,next)=>{
    const { houseType,isAvailable,houseNum, page = 1 } = req.query;
    const limit = 15;
    const skip = (page - 1) * limit;

    let query = {};
    if (houseType) query.houseType = houseType;
    if (isAvailable) query.isAvailable = isAvailable;
    if (houseNum) query.houseNum = houseNum;

    console.log("query API", query);
    try {
        const singleHouses = await SingleHouse.find(query)
                                    .sort({ createdAt: -1 }) 
                                    .limit(limit + 1)
                                    .skip(skip);
        const hasMore = singleHouses.length > limit;
        if (hasMore) singleHouses.pop();
        console.log("bookingTickets.length", singleHouses.length);
        console.log("hasMore", hasMore);
        req.result = {
            singleHouses: singleHouses,
            hasMore: hasMore
        };
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}
