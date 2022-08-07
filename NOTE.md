# json-server

rooms change id:
old new
2 1
3 2
1 3
4 4
5 5

# filter dates

# options rooms - guests

# problem:

1. bookingNumber (save data bookingInfoState local) \ error get data old not update new data

2. Cancel Booking \* ok \*
3. Collapse at admin tableData.js \* ok \* ok old
4. fetch data bookings again after post data bookingInfo to server. \* ok \* error because api not function
5. list user Booking History \*
6. fetch data bookings before loading MainBookingPage. \* ok
7. bookingNumber (update length booking) \* ok
8. sticky UI search \* ok
9. searchBar in HomePage \* ok
10. Select button RoomItem:

- Minus quantity room when onClick Select button, \* ok
- When quantity (Room === 0) ===> disable Select Button ===> SOLD OUT btn \* ok

8. Remove button RoomOrdered: \* ok

- Plus quantity room when onClick Remove button, \* ok

6. validate password register \* ok error of server

# server

const jsonServer = require("json-server");
const auth = require("json-server-auth");
const server = jsonServer.create();
const router = jsonServer.router("db.json"); //chổ này nếu bạn đăt tên file json khác thì sửa ở đây
const middlewares = jsonServer.defaults();

server.db = router.db;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
server.use(auth);

// Add custom routes before JSON Server router
server.get("/echo", (req, res) => {
res.jsonp(req.query);
});

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
if (req.method === "POST") {
req.body.createdAt = Date.now(); //chổ này là tự động tạo ngày tạo đối với phương thức post
req.body.updateAt = Date.now(); // chổ này tự động tạo ngày update vào đối tượng khi có sự thay đổi
}
// Continue to JSON Server router
next();
});

// Use default router
server.use("/api/auth", auth); // chổ này là cấu hình đường dẫn cho phần auth vd đường dẫn base là http://localhost:3001/
//thì đường dẫn vào trang đăng kí sẽ là http://localhost:3001/api/auth/resgister
server.use("/api", router); // chổ này là cấu hình đường dẫn vào api chính
server.listen(3050, () => {
// nếu muốn thay đổi cổng lắng nghe thì đổi ở đây mặc định mình để 3003 để tránh trùng với reactjs
console.log("JSON Server is running on port 3050");
});
