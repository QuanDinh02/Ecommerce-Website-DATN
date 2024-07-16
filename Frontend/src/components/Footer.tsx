
const Footer = () => {

    return (
        <div className="footer">
            <div className="w-full border-t border-gray-300"></div>
            <div className="subscribe-section flex items-center justify-between">
                <div className="subscribe-text">Đăng ký để biết thêm thông tin về sản phẩm và các ưu đãi</div>
                <div className="subscribe-box">
                    <input type="text" placeholder="Địa chỉ email của bạn" />
                    <div className="subscribe-btn">
                        <span className="text-black font-medium">Đăng ký</span>
                    </div>
                </div>
            </div>
            {/* <div className="w-full border-t border-gray-300"></div>
            <div className="links-section">
                <div className="links-item">
                    <div className="title">Liên hệ</div>
                    <div className="link">Gọi chúng tôi 24/7</div>
                    <div className="my-2 text-xl text-primary-color">090 123 4567</div>
                </div>
                <div className="links-item">
                    <div className="title">Nhận hỗ trợ</div>
                    <div className="link">Trung tâm trợ giúp</div>
                    <div className="link">Trò chuyện trực tiếp</div>
                    <div className="link">Kiểm tra trạng thái đơn hàng</div>
                </div>
                <div className="links-item">
                    <div className="title">Nhận hỗ trợ</div>
                    <div className="link">Trung tâm trợ giúp</div>
                    <div className="link">Trò chuyện trực tiếp</div>
                    <div className="link">Kiểm tra trạng thái đơn hàng</div>
                </div>
                <div className="links-item">
                    <div className="title">Làm quen với chúng tôi</div>
                    <div className="link">Giới thiệu về FoxMart</div>
                </div>
            </div> */}
            {/* <div className="social-media-apps-section">
                <div className="icons">
                    <FaSquareFacebook className="icon" />
                    <FaTwitter className="icon" />
                    <GrInstagram className="icon" />
                    <FaYoutube className="icon" />
                </div>
                <div className="platforms">
                    <img src={AppStore} alt="" />
                    <img src={GooglePlay} alt="" />
                </div>
            </div> */}
            <div className="copyright h-full bg-[#F5F5F5] text-gray-700 py-2 text-center">
                <div className="mb-3 text-red-500 font-medium">Website này chỉ mang tính chất học thuật</div>
                <div className="mb-3 text-red-500 font-medium">Mọi nội dung và tài liệu được cung cấp chỉ nhằm mục đích học tập và nghiên cứu.</div>
                <div>© 2023-2024 FoxMart.com</div>
            </div>
        </div>
    )
}

export default Footer;