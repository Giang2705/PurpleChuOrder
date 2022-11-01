import React, { useContext, useState } from 'react'
import { GlobalState } from "../../GlobalState"
import axios from 'axios'

const Contact = () => {
  const state = useContext(GlobalState)
  const [userID] = state.userAPI.id;
  const [callback, setCallback] = state.userAPI.callback
  const [isLogged] = state.userAPI.isLogged
  const [username] = state.userAPI.name;
  const [email] = state.userAPI.email;
  const [inquiries, setInquiries] = useState({
    user_id: '', name: '', email: '', subject: '', content: '', answer: '' 
  })

  const onChangeInput = e => {
    const {name, value} = e.target;
    setInquiries({...inquiries, user_id: userID, name: username, email: email, [name]: value, answer: ""})
  }

  const inquirySubmit = async e => {
    e.preventDefault()
    try {
       if (axios.post('/api/inquiries', {...inquiries})) {
        alert('Cám ơn bạn đã gửi thắc mắc, chúng tôi sẽ cố gắng trả lời sớm nhất có thể.')
        setCallback(!callback)
        inquiries.subject = ""
        inquiries.content = ""
       }

    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <div className="contact-page">
      <div className="information">
        <div className="contactInfo">
          <h2>Thông tin liên lạc</h2>
        </div>

        <div className="emailForContact">
          <h2>Album giá sỉ</h2>
          <p>
            - Để được hỗ trợ về mua hàng giá sỉ, bạn vui lòng email trực tiếp
            qua email{" "}
            <a href="mailto: purplechuorder.service@gmail.com">
              purplechuorder.service@gmail.com
            </a>{" "}
            để nhận được phản hồi sớm nhất.
          </p>
        </div>

        <div className="qna">
          <h2>Các câu hỏi thường gặp</h2>
          <h4>1. Thời gian nhận hàng: </h4>
          <p>
            - Đối với đơn sẵn: hàng sẽ giao trong 2-3 ngày. <br />- Đối với đơn
            order: đơn hàng phải chờ web ship hàng đến kho, sau đó từ kho chuyển
            về việt nam. Thời gian dự kiến cho từ kho về việt nam là 1-5 ngày.
            Sau đó bên shop sẽ tiến hành đóng đơn và gửi cho khách.
          </p>

          <h4>2. Đổi trả/ đền bù hàng hóa</h4>
          <p>
            - Yêu cầu để đổi trả và đền bù: Ảnh cận phiếu giao hàng, hình chụp
            toàn bộ đơn hàng, video mở hộp có đủ 6 mặt của đơn hàng (số hình ảnh
            và video unbox phải tương đương với số kiện bạn nhận được). KHÔNG CÓ
            VIDEO KHÔNG CÓ ĐỀN BÙ VÀ HOÀN TRẢ. <br />
            - Các trường hợp được nhận đổi trả và đền bù: Đơn hàng bị thiếu hoặc
            sai sản phẩm đặt hàng, đơn hàng bị hư hỏng do cách đóng gói của
            shop. Các đơn do bên vận chuyển thì sẽ phải đợi bên đvvc xử lý.{" "}
            <br />- Các trường hợp không nhận đổi trả và đền bù: Không có video
            unboxing, df card pre order từ các web (card pob mặc định có df),
            móp nhẹ do vận chuyển từ nước ngoài về, các lỗi do bên sản xuất (như
            thiếu card trong album, in sai,…) và khui hàng không cẩn thận.
          </p>

          <h4>3. Thay đổi thông tin nhận hàng.</h4>
          <p>
            Bạn có thể thay đổi thông tin nhận hàng khi đơn hàng chưa có thông
            báo chuẩn bị hàng và đã có mã vận đơn.
          </p>

          <h4>4. Đơn hàng bị hoàn về shop</h4>
          <p>
            Các đơn mua qua web sẽ được thông báo mã vận đơn nên mọi người vui
            lòng chú ý và cập nhập thường xuyên. Các đơn hoàn về sẽ phải chịu
            thêm phí hoàn và thời gian xử lý cũng sẽ lâu hơn.
          </p>

          <h4>5. Lựa chọn hình thức giao nhận hàng</h4>
          <p>
            - Giao cho đơn vị vận chuyển: Bên mình sẽ giao cho cho các đơn vị
            vận chuyển trong nước. <br />- Nhận hàng tại cửa hàng: Các bạn sẽ
            kiểm tra đơn mình có hay chưa ở trạng thái đơn hàng. Nếu trạng thái
            đơn hàng của bạn hiện đã có hàng, thì bạn có thể sang địa chỉ 453/32
            Nguyễn Đình Chiểu, p.5, q.3, TP.HCM để nhận hàng. Lưu ý thời gian mở
            cửa bên shop: 9h AM - 4h PM.
          </p>
        </div>
      </div>

      {
        isLogged ? 
        (
          <div className="contactForm">
        <div className="title">
          <h2>Góc thắc mắc</h2>
          <p style={{fontWeight: 900}}>Nếu bạn có thắc mắc hay vấn đề gì cần giải quyết, bạn có thể điền vào form dưới đây và admin sẽ trả lời câu hỏi của bạn sớm nhất có thể.</p>
        </div>
        <form action="" onSubmit={inquirySubmit}>
          <label htmlFor="subject">Vấn đề cần hỏi: </label>
          <input name='subject' type="text" id="subject" className="subject" value={inquiries.subject} onChange={onChangeInput}/>

          <br />

          <label htmlFor="content">Nội dung: </label>
          <textarea name='content' type="text" id="content" rows="5" className="content" value={inquiries.content} onChange={onChangeInput}/>

          <br />

          <button type="submit">Gửi thắc mắc</button>
        </form>
      </div>
        ) : null 
      }
    </div>
  );
};

export default Contact;