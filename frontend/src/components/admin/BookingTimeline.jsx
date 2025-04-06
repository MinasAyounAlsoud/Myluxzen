import { formatLocalDate, normalizeDate, formatLocalDateWithYear } from "../../utils/commenBookFunc";

export const BookingTimeline = ({ orders, startDate, endDate }) => {
    const queryStart = normalizeDate(new Date(startDate)).getTime();
    const queryEnd = normalizeDate(new Date(endDate)).getTime();
    const queryDuration = queryEnd - queryStart;
    // console.log("BookingTimeline,orders", orders);
    return (
    <div className="bg-gray-200 p-4 rounded w-4/5 mx-auto">
        <div className="text-center font-bold mb-2">
            {formatLocalDateWithYear(startDate)
        } bis {formatLocalDateWithYear(endDate)}
        </div>
        <div className="relative bg-gray-300 p-2 rounded flex flex-col gap-4">
            {orders.map((order, index) => {
                const start = normalizeDate(order.startDate).getTime();
                const end = normalizeDate(order.endDate).getTime();

                let offset = ((start - queryStart) / queryDuration) * 100;
                let width = ((end - start) / queryDuration) * 100;
                // Adjust for orders starting before queryStart or ending after queryEnd
                if (start < queryStart) {
                    width -= ((queryStart - start) / queryDuration) * 100; // Decrease width
                    offset = 0; // Start at the beginning
                }
                if (end > queryEnd) {
                    width -= ((end - queryEnd) / queryDuration) * 100; // Decrease width if it extends beyond queryEnd
                }
                // Adjust the offset and width to stay within bounds
                offset = Math.max(0, offset); // Ensure offset is not less than 0
                width = offset + width > 100 ? 100 - offset : width; // Adjust width if it extends beyond 100%

                return (
                <div key={index} className="relative mb-1" style={{ height: "20px" }}>
                    <div className="absolute left-0 right-0 h-1 bg-blue-500" style={{ left: `${offset}%`, width: `${width}%` }}>
                        {/* <span className="absolute left-0 -translate-x-1/2 bg-white text-xs px-1 text-gray-800">
                            {order.bookingNumber}
                        </span> */}
                        <span className="absolute left-0 -top-1 -translate-x-12 bg-white text-xs px-1 text-gray-800">
                            {formatLocalDate(order.startDate)}
                        </span>
                        <span className="absolute right-0 -top-1 translate-x-12 bg-white text-xs px-1 text-gray-800">
                            {formatLocalDate(order.endDate)}
                        </span>
                        <span className="absolute left-0 top-3 translate-x bg-gray-600 text-xs px-0 text-white">
                            {order.bookingNumber}
                        </span>
                    </div>
                </div>
                );
            })}
        </div>
    </div>
    );
};
