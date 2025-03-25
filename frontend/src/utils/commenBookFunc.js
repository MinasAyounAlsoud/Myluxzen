export async function fetchRequestNoRes(url, method, data) {
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        console.error('Error:', error);
        throw error;  
    }
};

export function convertUtcToLocal(utcDateString) {
    console.log("convertUtcToLocal, utcDateString")
    if (!utcDateString) return ""; 
    const utcDate = new Date(utcDateString);
    return utcDate.toLocaleString(); 
}

export function convertArrUtcToLocal(dataArray) {
    console.log("convertArrUtcToLocal, dataArray",dataArray)

    return dataArray.map(item => {
    if (item.startDate && item.startDate.trim() !== "") {
        item.startDate = convertUtcToLocal(item.startDate);
    }
    if (item.endDate && item.endDate.trim() !== "") {
        item.endDate = convertUtcToLocal(item.endDate);
    }
    return item;
    });
}

export const normalizeDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0); // 将时间设置为当天的午夜
    return date;
}; 

export function formatLocalDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit', // 两位数字的日
      month: '2-digit' // 两位数字的月
    });
}

