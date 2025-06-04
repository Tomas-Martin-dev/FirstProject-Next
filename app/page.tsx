"use client"
import Logo from "@/components/ui/Logo";
import ToastNotification from "@/components/ui/ToastNotification";
import { BuildingStorefrontIcon, CheckBadgeIcon, ReceiptPercentIcon } from "@heroicons/react/16/solid";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";

const schemmaAdminForm = z.object({
  admin: z.string().trim().min(1, { message: "Tienes que definir un Admin" })
})

export default function Home() {
  const [showLinks, setShowLinks] = useState(false);
  const [adminName, setAdminName] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {
      admin: formData.get("admin"),
    };

    const result = schemmaAdminForm.safeParse(data);
    if (!result.success) {
      result.error.issues.forEach(error => {
        toast.error(error.message);
      })
      return
    }
    
    setAdminName(data.admin as string);
    setShowLinks(true);
  }

  if (showLinks) {
    return (
      <>
        <div className="h-screen flex flex-col items-center justify-center px-10">
          <div className="bg-white p-4 md:px-20 md:py-10 shadow-xl max-w-2xl w-full text-center">
            <Logo />
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">¡Hola {adminName}!</h2>
            <p className="text-gray-600 mb-8">Haz clic en cada enlace para abrir las ventanas:</p>
            
            <div className="space-y-4">
              <a 
                href="/admin/orders" 
                target="_blank"
                className="flex justify-center gap-1 w-full px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium text-lg rounded transition-colors"
              >
                <ReceiptPercentIcon width={30}/>
                Abrir Panel de Administración
              </a>
              
              <a 
                href="/order/cafe" 
                target="_blank"
                className="flex justify-center gap-1 w-full px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-medium text-lg rounded transition-colors"
              >
                <BuildingStorefrontIcon width={30}/>
                Abrir Shop
              </a>
              
              <a 
                href="/orders" 
                target="_blank"
                className="flex justify-center gap-1 w-full px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-medium text-lg rounded transition-colors"
              >
                <CheckBadgeIcon width={30}/>
                Abrir Órdenes Listas
              </a>
            </div>

            <div className="mt-8">
              <button 
                onClick={() => setShowLinks(false)}
                className="text-gray-500 hover:text-gray-700 underline"
              >
                ← Volver al formulario
              </button>
            </div>

            <div className="mt-6 p-3 text-center bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-700">
              💡 <strong>Informacio:</strong> Mantén presionado Ctrl/Cmd mientras haces clic para abrir todas las ventanas rápidamente
            </div>
          </div>
        </div>
        <ToastNotification />
      </>
    )
  }
  
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center px-10">
        <div className="bg-white p-4 md:px-20 md:py-10 shadow-xl max-w-2xl w-full">
          <Logo />
          <h2 className="text-center mt-3 font-semibold text-3xl md:text-4xl">Bienvenido</h2>
          <form className="w-full mt-14 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label className="font-medium uppercase text-sm lg:text-base">Admin</label>
              <input type="text" name="admin" placeholder="Escriba el nombre del administrador" className="border border-gray-200 w-full p-2" />
            </div>
            <input type="submit" className="px-8 py-4 bg-amber-400 hover:bg-amber-500 rounded cursor-pointer transition-colors font-medium text-lg w-full" value="Comenzar"></input>
          </form>
        </div>
      </div>
      <ToastNotification />
    </>
  )
}