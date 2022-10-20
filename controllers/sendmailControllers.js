const nodemailer = require("nodemailer");

const sendmailControllers = {
  sendmailConfirm: (email, password) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "Purple Chu Order" + process.env.EMAIL,
      to: email,
      subject: "Xác nhận đăng ký tài khoản thành công",
      html: `<h1>Đăng ký tài khoản thành công!</h1> <h4> Chào mừng bạn đến với Purple Chu Order. Bạn đã đăng ký tài khoản thành công! Thông tin tài khoản: </h4> <h5>Email: ${email}</h5> <h5>Password: ${password}</h5>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  },

  sendmailOrdered: (orderDetail, email, total) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "Purple Chu Order" + process.env.EMAIL,
      to: email,
      subject: "Xác nhận đặt hàng thành công",
      html: `<h1>Đơn hàng của bạn đã được tiếp nhận và trong quá trình xử lý!</h1> <h3>Cảm ơn bạn đã tin tưởng và mua hàng tại Purple Chu nha! Dưới đây là thông tin đơn hàng của bạn. Bạn vui lòng kiểm tra lại thông tin và nếu có sai sót bạn cũng có thể thay đổi tại website khi trạng thái là "đang xử lý". Mọi thông tin sẽ được xác nhận và bạn không thể thay đổi khi trạng thái đổi thành "chuẩn bị hàng".</h3> <h2>Thông tin đơn hàng</h2> <div className="history-page">
            <table 
                    style="margin: 30px auto;
                          width: 80%;
                          border: 1px solid #ddd;
                          border-collapse: collapse"
            >
              <thead>
                <tr style="border: 1px solid #ddd;
                border-collapse: collapse;">
                  <th style="border: 1px solid #ddd;
                            border-collapse: collapse;
                            text-align: center;
                            padding: 10px;
                            text-transform: capitalize;"
                    >
                    Tên người dùng
                  </th>
                  <th style="border: 1px solid #ddd;
                  border-collapse: collapse;
                  text-align: center;
                  padding: 10px;
                  text-transform: capitalize;">Địa chỉ</th>
                  <th style="border: 1px solid #ddd;
                  border-collapse: collapse;
                  text-align: center;
                  padding: 10px;
                  text-transform: capitalize;"}>Email</th>
                  <th style="border: 1px solid #ddd;
                  border-collapse: collapse;
                  text-align: center;
                  padding: 10px;
                  text-transform: capitalize;"}>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border: 1px solid #ddd;
                border-collapse: collapse;">
                  <td style="border: 1px solid #ddd;
                  border-collapse: collapse;
                  text-align: center;
                  padding: 10px;
                  text-transform: capitalize;"}>${orderDetail.name}</td>
                  <td style="border: 1px solid #ddd;
                  border-collapse: collapse;
                  text-align: center;
                  padding: 10px;
                  text-transform: capitalize;"}>${orderDetail.address}</td>
                  <td style="border: 1px solid #ddd;
                  border-collapse: collapse;
                  text-align: center;
                  padding: 10px;
                  text-transform: capitalize;"}>${orderDetail.email}</td>
                  <td style="border: 1px solid #ddd;
                  border-collapse: collapse;
                  text-align: center;
                  padding: 10px;
                  text-transform: capitalize;"}>${orderDetail.status}</td>
                </tr>
              </tbody>
            </table>
      
            <table 
                    style="margin: 30px auto;
                          width: 80%;
                          border: 1px solid #ddd;
                          border-collapse: collapse"
              >
              <thead>
                <tr style="border: 1px solid #ddd;
                border-collapse: collapse;">
                  <th style="border: 1px solid #ddd;
                            border-collapse: collapse;
                            text-align: center;
                            padding: 10px;
                            text-transform: capitalize;"}></th>
                  <th style="border: 1px solid #ddd;
                            border-collapse: collapse;
                            text-align: center;
                            padding: 10px;
                            text-transform: capitalize;"}>Sản phẩm</th>
                  <th style="border: 1px solid #ddd;
                            border-collapse: collapse;
                            text-align: center;
                            padding: 10px;
                            text-transform: capitalize;"}>Số lượng</th>
                  <th style="border: 1px solid #ddd;
                            border-collapse: collapse;
                            text-align: center;
                            padding: 10px;
                            text-transform: capitalize;"}>Tổng cộng</th>
                </tr>
              </thead>
              <tbody>
                ${orderDetail.cart.map(
                  (item) =>
                    `<tr key={item._id} style="border: 1px solid #ddd;
                    border-collapse: collapse;">
                    <td style="border: 1px solid #ddd;
                    border-collapse: collapse;
                    text-align: center;
                    padding: 10px;
                    text-transform: capitalize;"><img style="width: 70px;
                    height: 100px;
                    object-fit: cover;" src=${
                      item.images[0].url
                    } alt="" /></td>
                    <td style="border: 1px solid #ddd;
                            border-collapse: collapse;
                            text-align: center;
                            padding: 10px;
                            text-transform: capitalize;">${item.name}</td>
                    <td style="border: 1px solid #ddd;
                            border-collapse: collapse;
                            text-align: center;
                            padding: 10px;
                            text-transform: capitalize;">${item.quantity}</td>
                    <td style="border: 1px solid #ddd;
                            border-collapse: collapse;
                            text-align: center;
                            padding: 10px;
                            text-transform: capitalize;">${item.price * item.quantity}</td>
                  </tr>`
                )}
              </tbody>
            </table>
            <h3>Tổng cộng: ${total} VND</h3>
          </div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error" + error);
      } else {
        console.log("Email sent:" + info.response);
        res.status(201).json({ status: 201, info });
      }
    });
  },
};

module.exports = sendmailControllers;
