"use client"
import { toast } from "react-toastify"
import { useStore } from "@/src/store"
import ProductDetails from "./ProductDetails"
import { useMemo } from "react"
import { formatCurrency } from "@/src/utils"
import { createOrder } from "@/actions/createOrder-action"
import { OrderSchemma } from "@/src/schemma"

export default function OrderSummary() {
  const { clearOrder } = useStore()

  const order = useStore( (state)=>state.order )
  const total = useMemo(()=> order.reduce((total,item) => total + (item.quantity * item.price), 0),[order])
  
  const handleCreateOrder = async (formData : FormData)=>{
    const data = {
      name: formData.get("name"),
      total,
      order
    };

    const result = OrderSchemma.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach( issue => {
        toast.error(issue.message)
      });

      return
    };

    const response = await createOrder(data);
    if (response?.errors) {
      response.errors.forEach( issue => {
        toast.error(issue.message)
      });
    };

    //Zona segura
    toast.success("Pedido Realizado");
    clearOrder()
  }


  return (
    <aside className="lg:h-screen lg:overflow-y-scroll lg:w-64 xl:w-96 p-5 md:px-15 lg:px-2 scrollbar-hide" id="summary">
      <h1 className="text-4xl text-center font-black">Mi Pedido</h1>
      {order.length === 0 ? <p className="text-center my-10">El pedido esta vacio</p> : (
        <div className="mt-5">
          {order.map(item => (
            <ProductDetails key={item.id} item={item}/>
          ))}
        </div>
      )}

      <p className="text-2xl mt-20 text-center font-bold">Total a pagar: {""}
        <span className="font-semibold text-xl">{formatCurrency(total)}</span>
      </p>

      <form 
        className="w-full mt-10 space-y-5"
        action={handleCreateOrder}
      >

        <input 
          type="text"
          placeholder="Tu Nombre"
          className="bg-white border border-gray-200 p-2 w-full" 
          name="name" 
        />
        <input 
          type="submit" 
          value="Confirmar Pedido" 
          className="py-2 rounded uppercase text-white bg-black hover:bg-stone-950 transition-colors w-full text-center cursor-pointer font-semibold"
        />
      </form>
    </aside>
  )
}
