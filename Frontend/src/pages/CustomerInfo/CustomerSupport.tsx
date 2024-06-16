import { CATEGORIES_SUPPORT, FAQS } from "./CustomerSupport/SupportDataSample";
import { BsTelephone } from "react-icons/bs";
import { VscMail } from "react-icons/vsc";

const CustomerSupport = () => {
    return (
        <div className="customer-support-container w-full py-5 px-10 bg-white h-full">
            <div className="customer-support__title text-2xl mb-6 pb-5 border-b border-gray-300 text-center">Hỗ trợ khách hàng</div>
            <div className="customer-support__category mb-6">
                <div className="text-xl font-medium mb-4 tracking-wide">Danh mục</div>
                <div className="category-list grid grid-cols-4 gap-y-3 gap-x-2">
                    {
                        CATEGORIES_SUPPORT.map((item, index) => {
                            return (
                                <div className="category-item h-[4.5rem] border border-gray-300 flex items-center justify-center gap-x-4 px-3 cursor-pointer" key={`support-category-item-${index}`}>
                                    <div className={`w-10 h-10 rounded-full ${item.bg_color} flex items-center justify-center w-1/3`}>{item.icon}</div>
                                    <div className="w-2/3 text-sm">{item.name}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className="customer-support__faq mb-8">
                <div className="text-xl font-medium tracking-wide mb-4">Câu hỏi thường gặp</div>
                <div className="w-full border-t border-gray-300 border-dashed mb-2"></div>
                {
                    FAQS.map((item, index) => {
                        return (
                            <div className="faq-question border-b border-gray-300 border-dashed pb-4 mb-2" key={`faq-item-${index}`}>{item.message}</div>
                        )
                    })
                }
            </div>
            <div className="customer-support__contact-info">
                <div className="text-xl font-medium tracking-wide mb-4">Thông tin liên hệ</div>
                <div className="contact-info__main grid grid-cols-4 gap-y-3 gap-x-2">
                    <div className="category-item h-[4.5rem] border border-gray-300 flex items-center justify-center gap-x-4 px-3 cursor-pointer">
                        <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center w-1/3"><BsTelephone/></div>
                        <div className="w-2/3 text-sm">1900 123 123</div>
                    </div>
                    <div className="category-item h-[4.5rem] border border-gray-300 flex items-center justify-center gap-x-4 px-3 cursor-pointer">
                        <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center w-1/3"><VscMail/></div>
                        <div className="w-2/3 text-sm">
                            <div className="font-medium">Email</div>
                            <div className="text-gray-400">Gửi câu hỏi của bạn!</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerSupport;