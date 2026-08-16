"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';

export interface HomeFormProps {
    bannerSection: {
        title: string;
        subTitle: string;
        description: string;
        buttons: {
            text: string;
            link: string;
        }[];
    };
    secondSection: {
        items: {
            number: string;
            value: string;
        }[];
    };
    thirdSection: {
        title: string;
        subTitle: string;
        description: string;
    };
    fourthSection: {
        title: string;
        subTitle: string;
        description: string;
    };
    fifthSection: {
        title: string;
        subTitle: string;
    };
}

const HomePage = () => {

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<HomeFormProps>();

    const { fields: bannerButtons, append: bannerButtonsAppend, remove: bannerButtonsRemove } = useFieldArray({
        control,
        name: "bannerSection.buttons"
    });

    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const handleAddHome = async (data: HomeFormProps) => {
        try {
            const response = await fetch(`/api/admin/home`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/commitment");
            }
        } catch (error) {
            console.log("Error in adding home", error);
        }
    }

    const fetchHomeData = async () => {
        try {
            const response = await fetch(`/api/admin/home`);
            if (response.ok) {
                const data = await response.json();
                setValue("bannerSection", data.data.bannerSection);
                setValue("bannerSection.buttons", data.data.bannerSection.buttons);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("thirdSection", data.data.thirdSection);
                setValue("fourthSection", data.data.fourthSection);
                setValue("fifthSection", data.data.fifthSection);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching home data", error);
        }
    }

    useEffect(() => {
        fetchHomeData();
    }, []);

    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddHome)}>

                <AdminItemContainer>
                    <Label main>Banner Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Title</Label>
                                <Input type='text' placeholder='Title' {...register("bannerSection.title", {
                                    required: "Title is required"
                                })} />
                                {errors.bannerSection?.title && <p className='text-red-500'>{errors.bannerSection?.title.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Sub Title</Label>
                                <Input type='text' placeholder='Sub Title' {...register("bannerSection.subTitle", {
                                    required: "Sub Title is required"
                                })} />
                                {errors.bannerSection?.subTitle && <p className='text-red-500'>{errors.bannerSection?.subTitle.message}</p>}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <Label className='font-bold'>Description</Label>
                                <Controller name="bannerSection.description" control={control} render={({ field }) => {
                                    return <Textarea value={field.value} onChange={field.onChange} />
                                }} />
                            </div>
                        </div>

                        <div>
                            <Label className='font-bold'>Buttons</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                {bannerButtons.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => bannerButtonsRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Text</Label>
                                            <Input type='text' placeholder='Button Text' {...register(`bannerSection.buttons.${index}.text`, {
                                                required: "Text is required"
                                            })} />
                                            {errors.bannerSection?.buttons?.[index]?.text && (
                                                <p className='text-red-500'>{errors.bannerSection?.buttons?.[index]?.text.message}</p>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Link</Label>
                                            <Input type='text' placeholder='/link-or-url' {...register(`bannerSection.buttons.${index}.link`, {
                                                required: "Link is required"
                                            })} />
                                            {errors.bannerSection?.buttons?.[index]?.link && (
                                                <p className='text-red-500'>{errors.bannerSection?.buttons?.[index]?.link.message}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => bannerButtonsAppend({ text: "", link: "" })}>Add Button</Button>
                            </div>
                        </div>

                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Second Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>

                                {secondSectionItems.map((field, index) => (
                                    <div key={field.id} className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-5 last:border-b-0'>
                                        <div className='absolute top-2 right-2'>
                                            <RiDeleteBinLine onClick={() => secondSectionRemove(index)} className='cursor-pointer text-red-600' />
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Number</Label>
                                            <Input type='text' placeholder='e.g. 500+' {...register(`secondSection.items.${index}.number`, {
                                                required: "Number is required"
                                            })} />
                                            {errors.secondSection?.items?.[index]?.number && (
                                                <p className='text-red-500'>{errors.secondSection?.items?.[index]?.number.message}</p>
                                            )}
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <Label className='font-bold'>Value</Label>
                                            <Input type='text' placeholder='e.g. Members' {...register(`secondSection.items.${index}.value`, {
                                                required: "Value is required"
                                            })} />
                                            {errors.secondSection?.items?.[index]?.value && (
                                                <p className='text-red-500'>{errors.secondSection?.items?.[index]?.value.message}</p>
                                            )}
                                        </div>
                                    </div>
                                ))}

                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => secondSectionAppend({ number: "", value: "" })}>Add Item</Button>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Third Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("thirdSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.thirdSection?.title && <p className='text-red-500'>{errors.thirdSection?.title.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Sub Title</Label>
                            <Input type='text' placeholder='Sub Title' {...register("thirdSection.subTitle", {
                                required: "Sub Title is required"
                            })} />
                            {errors.thirdSection?.subTitle && <p className='text-red-500'>{errors.thirdSection?.subTitle.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="thirdSection.description" control={control} render={({ field }) => {
                                return <Textarea value={field.value} onChange={field.onChange} />
                            }} />
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Fourth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("fourthSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.fourthSection?.title && <p className='text-red-500'>{errors.fourthSection?.title.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Sub Title</Label>
                            <Input type='text' placeholder='Sub Title' {...register("fourthSection.subTitle", {
                                required: "Sub Title is required"
                            })} />
                            {errors.fourthSection?.subTitle && <p className='text-red-500'>{errors.fourthSection?.subTitle.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="fourthSection.description" control={control} render={({ field }) => {
                                return <Textarea value={field.value} onChange={field.onChange} />
                            }} />
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Fifth Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("fifthSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.fifthSection?.title && <p className='text-red-500'>{errors.fifthSection?.title.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Sub Title</Label>
                            <Input type='text' placeholder='Sub Title' {...register("fifthSection.subTitle", {
                                required: "Sub Title is required"
                            })} />
                            {errors.fifthSection?.subTitle && <p className='text-red-500'>{errors.fifthSection?.subTitle.message}</p>}
                        </div>
                    </div>
                </AdminItemContainer>

                <div className='flex'>
                    <Button type='submit' className="cursor-pointer text-white text-[16px] w-full">Submit</Button>
                </div>

            </form>
        </div>
    )
}

export default HomePage