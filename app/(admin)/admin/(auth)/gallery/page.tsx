"use client"

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import SmartPagination from "./Pagination";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { IoIosClose } from 'react-icons/io'
import Image from 'next/image';

type GalleryItem = {
    _id: string;
    title: string;
    images: string[];
}

const AdminGallery = () => {

    const searchParams = useSearchParams();
    const pageFromUrl = Number(searchParams.get("page")) || 1;
    const [galleryItems, setGalleryItems] = useState<GalleryItem[] | []>([])
    const [refetch, setRefetch] = useState(false)
    const [page, setPage] = useState(pageFromUrl);
    const [totalPages, setTotalPages] = useState(1);
    const router = useRouter();
    const pathname = usePathname();
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [creating, setCreating] = useState(false);

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const changePage = (newPage: number) => {
        setPage(newPage);
        router.push(`${pathname}?page=${newPage}`);
    };

    useEffect(() => {
        const fetchGalleryData = async () => {
            try {
                const query = new URLSearchParams({
                    page: String(page),
                    limit: "10",
                });

                const response = await fetch(`/api/admin/gallery?${query.toString()}`);

                if (response.ok) {
                    const data = await response.json();
                    setGalleryItems(data.data);
                    setTotalPages(data.totalPages);
                }
            } catch (error) {
                console.error("Error fetching gallery:", error);
            }
        };

        fetchGalleryData()
    }, [page, refetch])

    const toggleSelectAll = () => {
        if (selectedIds.length === galleryItems.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(galleryItems.map((item) => item._id));
        }
    };

    const handleBulkDelete = async () => {
        if (selectedIds.length === 0) {
            toast.error("No items selected");
            return;
        }

        try {
            const response = await fetch(`/api/admin/gallery/bulk-delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids: selectedIds }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                setSelectedIds([]);
                setRefetch((prev) => !prev);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteSingle = async (id: string) => {
        try {
            const response = await fetch(`/api/admin/gallery/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                setRefetch((prev) => !prev);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateGalleryItem = async () => {
        if (!newTitle.trim()) {
            toast.error("Title is required");
            return;
        }

        setCreating(true);
        try {
            const response = await fetch(`/api/admin/gallery`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: newTitle, images: [] }),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
                setShowAddModal(false);
                setNewTitle("");
                // Send the user straight into the item so they can start adding images
                router.push(`/admin/gallery/${data.data._id}`);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className='flex flex-col gap-5'>

            <div className='flex flex-col gap-3 min-h-[calc(100vh-200px)]'>
                <div className="flex items-center gap-10 justify-between px-1">
                    <div className='flex justify-between items-center'>
                        <h1 className='text-xl'>Gallery</h1>
                    </div>
                    <div>
                        {selectedIds.length > 0 && (
                            <div className="relative inline-flex">
                                <MdDelete
                                    className="text-red-600 cursor-pointer text-2xl"
                                    onClick={handleBulkDelete}
                                />
                                <span className="absolute -top-2 -right-2 bg-red-600 text-white flex items-center justify-center text-[10px] rounded-full h-[15px] w-[15px]">
                                    {selectedIds.length}
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-3 items-center">
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="px-3 py-1 bg-black text-white rounded"
                        >
                            Add Gallery Item
                        </button>
                    </div>
                </div>

                {galleryItems && galleryItems.length > 0 ? (
                    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
                        <table className="w-full text-left text-sm text-gray-700">
                            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                                <tr>
                                    <th scope="col" className="px-4 py-3">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.length === galleryItems.length}
                                            onChange={toggleSelectAll}
                                        />
                                    </th>
                                    <th scope="col" className="px-4 py-3">Cover</th>
                                    <th scope="col" className="px-4 py-3">Title</th>
                                    <th scope="col" className="px-4 py-3">Images</th>
                                    <th scope="col" className="px-4 py-3 text-center">Manage</th>
                                    <th scope="col" className="px-4 py-3 text-center">Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {galleryItems.map((item, i) => (
                                    <tr
                                        key={item._id ?? i}
                                        className="border-b border-gray-200 bg-white hover:bg-gray-50"
                                    >
                                        <td className="px-4 py-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(item._id)}
                                                onChange={() => toggleSelect(item._id)}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            {item.images?.[0] ? (
                                                <Image
                                                    src={item.images[0]}
                                                    alt={item.title}
                                                    width={48}
                                                    height={48}
                                                    className="h-12 w-12 object-cover rounded-md"
                                                />
                                            ) : (
                                                <div className="h-12 w-12 rounded-md bg-gray-100 flex items-center justify-center text-[10px] text-gray-400">
                                                    No image
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900">
                                            {item.title}
                                        </td>
                                        <td className="px-4 py-3">{item.images?.length ?? 0}</td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                type="button"
                                                onClick={() => router.push(`/admin/gallery/${item._id}`)}
                                                className="px-3 py-1 border rounded text-xs"
                                            >
                                                Manage Images
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button onClick={() => handleDeleteSingle(item._id)}>
                                                <MdDelete className="mx-auto text-lg text-red-600 cursor-pointer" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>No gallery items available</div>
                )}

                {showAddModal && (
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="p-5 flex flex-col gap-5 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                                    <button
                                        type="button"
                                        className="absolute top-3 right-3"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        <IoIosClose className="text-2xl" />
                                    </button>

                                    <h2 className="text-lg font-semibold">New Gallery Item</h2>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-semibold text-gray-600 text-sm">Title</label>
                                        <input
                                            type="text"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            placeholder="e.g. Annual Day 2026"
                                            className="border px-3 py-2 rounded"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setShowAddModal(false)}
                                            className="px-3 py-2 border rounded text-sm"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            disabled={creating}
                                            onClick={handleCreateGalleryItem}
                                            className="px-3 py-2 bg-black text-white rounded text-sm disabled:opacity-50"
                                        >
                                            {creating ? "Creating..." : "Create & Add Images"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {galleryItems && galleryItems.length > 0 && (
                <div className='mb-10'>
                    <SmartPagination
                        page={page}
                        totalPages={totalPages}
                        setPage={changePage}
                    />
                </div>
            )}
        </div>
    )
}

export default AdminGallery