import { Booking} from "../utils/bookingSchema.js";
import { House } from "../utils/bookingSchema.js";

export const getAvailableBooking = async(req,res,next)=>{
    try {
        console.log("GET request to getAvailableBooking"); 
        const activeBookings = await Booking.find({ status: { $in: ['Active', 'CheckedIn'] }});
        console.log("activeBookings", activeBookings); 
        req.result = activeBookings;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

export const getBookingTicket = async(req,res,next)=>{
    try {
        console.log("GET request to getBookingTicket"); 
        const {bookingNumber} = req.params;
        const bookingTicket = await Booking.findOne({bookingNumber});
        req.result = bookingTicket;
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}
export const getAvailableRooms = async (req, res, next) => {
    try {
        const { startDate, endDate, guestCount } = req.body;
        console.log("startDate", startDate);
        console.log("endDate", endDate);

        console.log("guestCount", guestCount);

        // 获取所有符合条件的房源
        const availableHouses = await House.find({
            guestCount: { $gte: guestCount }  // 房子最多容纳的客人数量大于等于用户的客人数量
        });
        // 获取所有已被预订且有效的订单
        const activeBookings = await Booking.find({
            status: { $in: ['Active', 'CheckedIn'] },
            $or: [
                { 
                    startDate: { $lte: new Date(endDate) },  // 用户结束日期之前或相等
                    endDate: { $gte: new Date(startDate) }   // 用户开始日期之后或相等
                }
            ]
        });

        // 遍历房源，减少被预订的数量
        const updatedRooms = availableHouses.map(house => {
            let availableCount = house.availableCount;

            // 遍历有效订单，减少房源的可用数量
            activeBookings.forEach(booking => {
                const bookingStartDate = new Date(booking.startDate);
                const bookingEndDate = new Date(booking.endDate);
                const requestedStartDate = new Date(startDate);
                const requestedEndDate = new Date(endDate);
                
                // 判断是否有日期重叠
                const overlap = (bookingStartDate <= requestedEndDate) && (bookingEndDate >= requestedStartDate);
        
                if (overlap && house.houseType === booking.houseType) {
                    availableCount -= 1;  // 如果有重叠，减少一个房间
                }
            });

            // 确保可用房源数量不为负
            return {
                houseId: house.houseId,
                houseType: house.houseType,
                price: house.price,
                availableCount: availableCount >= 0 ? availableCount : 0,  // 如果可用数量为负，设为 0
            };
        });

        // 过滤掉没有可用房源的房型
        console.log("updatedRooms",updatedRooms)
        req.result = updatedRooms.filter(room => room.availableCount > 0);

        // 如果没有可用房源，返回错误
        if (req.result.length === 0) {
            return res.status(404).json({ message: "No available rooms found" });
        }

        next();  // 继续处理响应
    } catch (error) {
        console.log("Error in getAvailableRooms middleware:", error);
        next(error);
    }
};
export const createBookingMiddleware = async (req, res, next) => {
    try {
        const { guestCount, startDate, endDate, houseType, status } = req.body;

        // 检查必填字段
        if (!guestCount || !startDate || !endDate || !houseType || !status) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // 创建新的 Booking 文档
        const newBooking = new Booking({
            bookingNumber: `BOOK${Math.floor(1000 + Math.random() * 9000)}`, // 生成随机订单号
            ...req.body
        });

        // 保存到数据库
        await newBooking.save();

        // 把结果存入 req.result，传递给下一个中间件
        req.result = newBooking;
        next(); // 继续执行下一个中间件
    } catch (error) {
        // console.error("Error creating booking:", error);
        // res.status(500).json({ message: "Internal Server Error" });
        console.log("Error in createBookingMiddleware middleware:", error);
        next(error);
    }
};