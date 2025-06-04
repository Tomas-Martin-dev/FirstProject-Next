import Link from "next/link";

type Props = {
    page: number,
    totalPages: number,
}
export default function ProductsPAgination({ page, totalPages }: Props) {
    const pages = Array.from({length: totalPages}, (_, i) => i + 1 );

    return (
        <nav className="flex justify-center py-10 gap-1">
            {page > 1 && (
                <Link
                    href={`/admin/products?page=${page - 1}`}
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 rounded-xs"
                >&laquo;</Link>
            )}
            
            <div className="flex justify-center gap-0.5">
                {pages.map( pageNumber => (
                    <Link
                        key={pageNumber}
                        href={`/admin/products?page=${pageNumber}`}
                        className={`${pageNumber === page ? "bg-gray-50 font-medium" : "bg-white"} px-4 py-2 text-sm text-gray-900 ring-1 rounded-xs ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0`}
                    >{pageNumber}
                    </Link>
                ) )}
            </div>

            {page < totalPages && (
                <Link
                    href={`/admin/products?page=${page + 1}`}
                    className="bg-white px-4 py-2 text-sm text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0 rounded-xs"
                >&raquo;</Link>
            )}
        </nav>
    )
}
