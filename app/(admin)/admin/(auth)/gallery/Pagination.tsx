type PaginationProps = {
    page: number;
    totalPages: number;
    setPage: (page: number) => void;
};

export default function SmartPagination({
    page,
    totalPages,
    setPage,
}: PaginationProps) {
    const getPages = () => {
        const pages: (number | string)[] = [];

        const left = Math.max(1, page - 1);
        const right = Math.min(totalPages, page + 1);

        if (left > 1) {
            pages.push(1);
            if (left > 2) pages.push("...");
        }

        for (let i = left; i <= right; i++) {
            pages.push(i);
        }

        if (right < totalPages) {
            if (right < totalPages - 1) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {/* Prev */}
            <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-40 hover:bg-gray-100"
            >
                Prev
            </button>

            {pages.map((p, index) =>
                p === "..." ? (
                    <span key={`dots-${index}`} className="px-2 text-gray-500">
                        ...
                    </span>
                ) : (
                    <button
                        key={`page-${p}`}
                        onClick={() => setPage(p as number)}
                        className={`px-3 py-1 text-sm border rounded-md ${page === p
                            ? "bg-black text-white border-black"
                            : "hover:bg-gray-100"
                            }`}
                    >
                        {p}
                    </button>
                )
            )}

            {/* Next */}
            <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 border rounded-md text-sm disabled:opacity-40 hover:bg-gray-100"
            >
                Next
            </button>
        </div>
    );
}