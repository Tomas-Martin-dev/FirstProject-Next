"use client"
import { getImagePath } from '@/src/utils';
import { PhotoIcon } from '@heroicons/react/16/solid'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image';
import { useState } from 'react';

export default function ImagenUpload({image}: {image: string | undefined}) {
    const [imageUrl, setImageUrl] = useState("");

    return (
        <CldUploadWidget
            uploadPreset="kioskoApp"
            onSuccess={(result, {widget})=>{
                if (result.event === "success") {
                    widget.close();
                    // @ts-ignore
                    setImageUrl(result.info.secure_url)
                }
            }}
            options={{
                sources: ['local', 'url', 'camera'],
                multiple: false,
                cropping: false,
                folder: 'productos',
            }}
        >
            {({ open }) => (
                <>
                    <div className="space-y-2">
                        <label className="text-slate-800">Imagen Producto:</label>
                        <div onClick={() => open()} className='relative cursor-pointer hover:opacity-70 transition py-12 shadow border-neutral-300 flex flex-col justify-center items-center gap-1 text-neutral-400 bg-slate-100'>
                            <PhotoIcon width={50} />
                            <p className="text-lg font-semibold">Agregar Imagen</p>

                            {imageUrl && (
                                <div className='absolute inset-0 w-full h-full'>
                                    <Image 
                                        fill
                                        style={{objectFit: "contain"}}
                                        src={imageUrl}
                                        alt='Imagen del producto'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {/* Imagen Actual cuando se esta editando */}
                    {image && !imageUrl && (
                        <div className='space-y-2'>
                            <label>Imagen Actual:</label>
                            <div className='relative w-64 h-64'>
                                <Image
                                    fill
                                    src={getImagePath(image)}
                                    alt='Imagen Actual'
                                    style={{objectFit: "contain"}}
                                />
                            </div>
                        </div>
                    )}

                    <input type="hidden" name="image" value={imageUrl ? imageUrl : image}/>
                </>
            )}
        </CldUploadWidget>
    );
}