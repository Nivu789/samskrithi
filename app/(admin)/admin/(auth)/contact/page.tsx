"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';

export interface ContactFormProps {
    hero: {
        subTitle: string;
        title: string;
        description: string;
    };
    infoPanel: {
        subTitle: string;
        title: string;
        description: string;
    };
    contactDetails: {
        icon: string;
        title: string;
        info: string;
    }[];
    interests: {
        value: string;
    }[];
}

const ContactAdminPage = () => {

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<ContactFormProps>();

    const { fields: contactDetailFields, append: contactDetailAppend, remove: contactDetailRemove } = useFieldArray({
        control,
        name: "contactDetails"
    });

    const { fields: interestFields, append: interestAppend, remove: interestRemove } = useFieldArray({
        control,
        // @ts-ignore - interests is a string[] on the model, treated as {value}[] in the form
        name: "interests"
    });

    const handleUpdateContact = async (data: ContactFormProps) => {
        try {
            const payload = {
                hero: data.hero,
                infoPanel: data.infoPanel,
                contactDetails: data.contactDetails,
                // Flatten {value}[] back down to string[] for storage
                interests: (data.interests || []).map((item: any) => item.value),
            };

            const response = await fetch(`/api/admin/contact`, {
                method: "PATCH",
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in updating contact", error);
        }
    }

    const fetchContactData = async () => {
        try {
            const response = await fetch(`/api/admin/contact`);
            if (response.ok) {
                const data = await response.json();
                setValue("hero", data.data.hero);
                setValue("infoPanel", data.data.infoPanel);
                setValue("contactDetails", data.data.contactDetails);
                // Wrap plain strings into {value} objects so useFieldArray can key them
                setValue(
                    "interests",
                    (data.data.interests || []).map((value: string) => ({ value })),
                );
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching contact data", error);
        }
    }

    useEffect(() => {
        fetchContactData();
    }, []);

    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleUpdateContact)}>

                <AdminItemContainer>
                    <Label main>Hero Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Sub Title</Label>
                            <Input type='text' placeholder='e.g. Get In Touch' {...register("hero.subTitle", {
                                required: "Sub Title is required"
                            })} />
                            {errors.hero?.subTitle && <p className='text-red-500'>{errors.hero?.subTitle.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='e.g. Contact Us' {...register("hero.title", {
                                required: "Title is required"
                            })} />
                            {errors.hero?.title && <p className='text-red-500'>{errors.hero?.title.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="hero.description" control={control} render={({ field }) => {
                                return <Textarea value={field.value} onChange={field.onChange} />
                            }} />
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Info Panel (Left Column)</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Sub Title</Label>
                            <Input type='text' placeholder='e.g. Find Us' {...register("infoPanel.subTitle", {
                                required: "Sub Title is required"
                            })} />
                            {errors.infoPanel?.subTitle && <p className='text-red-500'>{errors.infoPanel?.subTitle.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder="e.g. Let's Connect" {...register("infoPanel.title", {
                                required: "Title is required"
                            })} />
                            {errors.infoPanel?.title && <p className='text-red-500'>{errors.infoPanel?.title.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="infoPanel.description" control={control} render={({ field }) => {
                                return <Textarea value={field.value} onChange={field.onChange} />
                            }} />
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Contact Details</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>
                            {contactDetailFields.map((field, index) => (
                                <div key={field.id} className='grid grid-cols-3 gap-2 relative border-b border-black/20 pb-5 last:border-b-0'>
                                    <div className='absolute top-2 right-2'>
                                        <RiDeleteBinLine onClick={() => contactDetailRemove(index)} className='cursor-pointer text-red-600' />
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Icon (emoji)</Label>
                                        <Input type='text' placeholder='📍' {...register(`contactDetails.${index}.icon`, {
                                            required: "Icon is required"
                                        })} />
                                        {errors.contactDetails?.[index]?.icon && <p className='text-red-500'>{errors.contactDetails?.[index]?.icon.message}</p>}
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Title</Label>
                                        <Input type='text' placeholder='e.g. Address' {...register(`contactDetails.${index}.title`, {
                                            required: "Title is required"
                                        })} />
                                        {errors.contactDetails?.[index]?.title && <p className='text-red-500'>{errors.contactDetails?.[index]?.title.message}</p>}
                                    </div>

                                    <div className='flex flex-col gap-2'>
                                        <Label className='font-bold'>Info</Label>
                                        <Textarea placeholder={'Use a new line for a second line, e.g.\nMon – Sat, 9 AM – 6 PM'} {...register(`contactDetails.${index}.info`, {
                                            required: "Info is required"
                                        })} />
                                        {errors.contactDetails?.[index]?.info && <p className='text-red-500'>{errors.contactDetails?.[index]?.info.message}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => contactDetailAppend({ icon: "", title: "", info: "" })}>Add Item</Button>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Interest Options</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <p className='text-sm text-black/60'>
                            These populate the &quot;I&apos;m Interested In&quot; dropdown on the contact form.
                        </p>
                        <div className='border border-black/20 p-2 rounded-md flex flex-col gap-2'>
                            {interestFields.map((field, index) => (
                                <div key={field.id} className='flex items-center gap-2'>
                                    <Input type='text' placeholder='e.g. Joining Badminton' {...register(`interests.${index}.value`, {
                                        required: "Value is required"
                                    })} />
                                    <RiDeleteBinLine onClick={() => interestRemove(index)} className='cursor-pointer text-red-600 shrink-0' />
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => interestAppend({ value: "" })}>Add Item</Button>
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

export default ContactAdminPage