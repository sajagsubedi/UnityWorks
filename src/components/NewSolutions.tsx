import { Coins, PiggyBank, Users, Car, FileText, Banknote } from "lucide-react";
import { FaUsers,FaBook,FaCarCrash,FaMoneyBillWave } from "react-icons/fa";
import { GiPayMoney,GiPiggyBank } from "react-icons/gi";

const services = [
  {
    icon: FaUsers,
    iconBg: "bg-purple-600",
    title: "Member Upliftment Loan",
    description: "Empowering Your Business Dreams with Flexible Financing",
    href: "#",
  },
  {
    icon: GiPayMoney,
    iconBg: "bg-pink-400",
    title: "Green Vehicle Loan",
    description: "Green Wheels, Green Future",
    href: "#",
  },
  {
    icon: GiPiggyBank,
    iconBg: "bg-orange-400",
    title: "Smart Sapati Loan",
    description: "Instant Balance, Anytime, Anywhere",
    href: "#",
  },
  {
    icon: FaBook,
    iconBg: "bg-red-600",
    title: "Bluebook Renewal",
    description: "Bluebook renewal and Tax payment service",
    href: "#",
  },
  {
    icon: FaCarCrash,
    iconBg: "bg-blue-600",
    title: "Insurance Service",
    description: "Life, non-life insurance services for our members",
    href: "#",
  },
  {
    icon: FaMoneyBillWave,
    iconBg: "bg-red-500",
    title: "Remittance Service",
    description: "Through more than 40 Remittance companies",
    href: "#",
  },
];

export default function Services() {
  return (
    <section className="w-full px-[10vw] py-10 relative">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-1">
        <div className=" w-full  flex flex-col items-center mb-10">
          <div className="h-1 w-20 bg-green-500 rounded"></div>
          <h2 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 text-center">
            WHATS NEW
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white overflow-hidden shadow-lg rounded-lg hover:scale-105 transition-all duration-300 ease-in-out border-green-500 border min-h-36 flex items-center"
            >
              <div className="py-6 px-4 md:py-8 flex items-center gap-2 h-full">
                <div className="flex items-center justify-center h-[100%]">
                  <service.icon
                    className={`w-14 h-14 text-white ${service.iconBg} rounded-full p-2`}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-green-600 text-left">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500 text-left">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
