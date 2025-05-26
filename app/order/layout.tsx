import OrderSiderbar from "@/components/order/OrderSiderbar";
import OrderSummary from "@/components/order/OrderSummary";
import ButtonBotom from "@/components/ui/ButtonBotom";
import ToastNotification from "@/components/ui/ToastNotification";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    return (
        <>
            <div className="lg:flex scrollbar-hide">
                <OrderSiderbar/>
                
                <main className="lg:flex-1 lg:h-screen lg:overflow-y-scroll p-5">
                    {children}
                </main>
                
                <ButtonBotom/>
                <OrderSummary/>
                <ToastNotification/>
            </div>
        </>
    )
}