////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import {allIds ,fetchOrderById} from "../task2/index.js";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = async() => {
    const ids = allIds;
    let arrayOfOrders = [];
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
    await Promise.all(ids.map(async (id) => {
        const contents = await fetchOrderById(id)
        arrayOfOrders.push(contents)
      }));
    return arrayOfOrders;
};

const bucketOrdersByUsers = async() => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    let allOrders=await fetchAllOrders()
    allOrders.forEach((order) => {        
        if(Array.isArray(ordersByUsers[order.userId])){
       ordersByUsers[order.userId].push(order)
        }
        else{
            ordersByUsers[order.userId] =[]
        }
    })
    return ordersByUsers;
};

const getLast2WeeksOrders = async() => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
    let lastTwoWeeksOrders = [];
    let allOrders = await fetchAllOrders();
    allOrders.forEach((order)=>{
        let numberOfDays=getNumberOfDays(order.timestamp,new Date().getTime())
        if(numberOfDays <= 14){
            lastTwoWeeksOrders.push(order)
        }
    })
    return lastTwoWeeksOrders;
};


const bucketOrdersByDate = async () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    let last2WeeksOrders = await getLast2WeeksOrders()
    last2WeeksOrders.forEach((order) => {
        let day = getTheDayInTheWeek(order.timestamp)
        if(Array.isArray(ordersByDate[day])){
            ordersByDate[day].push(order)
             }
             else{
                ordersByDate[day] =[]
             }
    })
    return ordersByDate;
};

fetchAllOrders();
// .then(console.log);

bucketOrdersByUsers();
// // .then(console.log);

getLast2WeeksOrders();
// // .then(console.log);

 bucketOrdersByDate();
// .then(console.log);

////////////////////////////////////////

function getNumberOfDays(start, end) {
    const date1 = new Date(start);
    const date2 = new Date(end);

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

function getTheDayInTheWeek(unixTimestamp){
        var a = new Date(unixTimestamp*1000);
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var dayOfWeek = days[a.getDay()]
        return dayOfWeek
}
