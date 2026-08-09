"use client"

import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useParams, useRouter } from "next/navigation";
import { MdDelete, MdArrowBack } from "react-icons/md";
import { ImageUploader } from '@/components/ui/image-uploader'
import Image from 'next/image';

type GalleryItem = {
    _id: string;
    title: string;
    images: string[];
}

const GalleryItemPage = () => {

    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [galleryItem, setGalleryItem] = useState<GalleryItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [images, setImages] = useState<string[]>([]);
    const [newImage, setNewImage] = useState("");
    const [saving, setSaving] = useState(false);

    const fetchGalleryItem = async () => {
        try {
            const response = await fetch(`/api/admin/gallery/${id}`);
            if (response.ok) {
                const data = await response.json();
                setGalleryItem(data.data);
                setTitle(data.data.title);
                setImages(data.data.images ?? []);
            } else {
                const data = await response.json();
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching gallery item", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) fetchGalleryItem();
    }, [id]);

    const persist = async (payload: Partial<GalleryItem>) => {
        setSaving(true);
        try {
            const response = await fetch(`/api/admin/gallery/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success(data.message);
                return true;
            } else {
                toast.error(data.message);
                return false;
            }
        } catch (error) {
            console.error("Error saving gallery item", error);
            return false;
        } finally {
            setSaving(false);
        }
    }

    const handleSaveTitle = async () => {
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }
        await persist({ title });
    }

    // Adds the freshly uploaded image straight to the array and saves immediately,
    // so the admin doesn't lose the upload if they navigate away.
    const handleAddImage = async (url: string) => {
        if (!url) return;
        const updatedImages = [...images, url];
        setImages(updatedImages);
        setNewImage("");
        await persist({ images: updatedImages });
    }

    const handleRemoveImage = async (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
        await persist({ images: updatedImages });
    }

    if (loading) {
        return <div className="p-5">Loading...</div>
    }

    if (!galleryItem) {
        return <div className="p-5">Gallery item not found</div>
    }

    return (
        <div className='flex flex-col gap-5'>

            <div className="flex items-center gap-2 px-1">
                <button
                    type="button"
                    onClick={() => router.push('/admin/gallery')}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
                >
                    <MdArrowBack /> Back to Gallery
                </button>
            </div>

            <div className='p-5 rounded-md border border-black/10 flex flex-col gap-2'>
                <label className='font-bold text-sm'>Title</label>
                <div className="flex gap-2">
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Title'
                        className="border px-3 py-2 rounded flex-1"
                    />
                    <button
                        type="button"
                        disabled={saving}
                        onClick={handleSaveTitle}
                        className="px-4 py-2 bg-black text-white rounded text-sm disabled:opacity-50"
                    >
                        Save
                    </button>
                </div>
            </div>

            <div className='p-5 rounded-md border border-black/10 flex flex-col gap-4'>
                <div className="flex items-center justify-between">
                    <label className='font-bold text-sm'>Images ({images.length})</label>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
                    {images.map((img, index) => (
                        <div key={index} className='relative group border border-black/10 rounded-md overflow-hidden'>
                            <Image
                                src={img}
                                alt={`Gallery image ${index + 1}`}
                                width={200}
                                height={200}
                                className="h-32 w-full object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveImage(index)}
                                className="absolute top-1 right-1 bg-white/90 rounded-full p-1 shadow"
                            >
                                <MdDelete className="text-red-600" />
                            </button>
                        </div>
                    ))}

                    {/* Uploader tile for adding a new image */}
                    <div className='border border-dashed border-black/20 rounded-md flex items-center justify-center h-32'>
                        <ImageUploader
                            value={newImage}
                            onChange={handleAddImage}
                            recommendedDimension="Recommended: 800 x 800 (px)"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GalleryItemPage