import { Category } from "@prisma/client";

export  function formatCurrency(amunt: number){
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amunt)
}

// export function formatCategory(cat: Category[], id: Category["id"]){
//     const isOk = cat.find( c => c.id === id );
//     return isOk?.name
// } una fomra de iterar y sacar el name de categoria por id, termine sacando del get ya que la tabla tiene una relacion de categoria con toda la info


export function getImagePath(path: string) {
    const cloudinaryBaseUrl = "https://res.cloudinary.com";
    if (path.startsWith(cloudinaryBaseUrl)) {
        return path
    }else{
        return `/products/${path}.jpg`
    }
}