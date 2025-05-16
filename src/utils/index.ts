export  function formatCurrency(amunt: number){
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    }).format(amunt)
}