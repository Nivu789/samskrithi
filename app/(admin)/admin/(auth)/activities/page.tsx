"use client"

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect } from 'react'

import { useForm, useFieldArray, Controller, Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { Button } from '@/components/ui/button'
import { RiDeleteBinLine } from "react-icons/ri";
import { Textarea } from '@/components/ui/textarea'
import AdminItemContainer from '@/app/components/common/AdminItemContainer';
import { ImageUploader } from '@/components/ui/image-uploader';

export interface ActivitiesFormProps {
    bannerSection: {
        title: string;
        subTitle: string;
        description: string;
        items: {
            title: string;
        }[];
    };
    secondSection: {
        items: {
            title: string;
            subTitle: string;
            description: string;
            subItems: {
                value: string;
            }[];
            timing: string;
            days: string;
            venue: string;
            contact: string;
            tags: {
                value: string;
            }[];
            image:string;
            imageAlt:string;
            leader:string;
        }[];
    };
    ctaSection: {
        title: string;
        subTitle: string;
        description: string;
        buttonText: string;
        buttonLink: string;
    };
}

// ---------------------------------------------
// Sub component: a single "secondSection" item.
// Handles its own nested subItems + tags arrays.
// ---------------------------------------------
interface SecondSectionItemProps {
    index: number;
    control: Control<ActivitiesFormProps>;
    register: UseFormRegister<ActivitiesFormProps>;
    errors: FieldErrors<ActivitiesFormProps>;
    onRemove: (index: number) => void;
}

const SecondSectionItem = ({ index, control, register, errors, onRemove }: SecondSectionItemProps) => {

    const { fields: subItemFields, append: subItemAppend, remove: subItemRemove } = useFieldArray({
        control,
        name: `secondSection.items.${index}.subItems`
    });

    const { fields: tagFields, append: tagAppend, remove: tagRemove } = useFieldArray({
        control,
        name: `secondSection.items.${index}.tags`
    });

    const itemErrors = errors.secondSection?.items?.[index];

    return (
        <div className='grid grid-cols-2 gap-2 relative border-b border-black/20 pb-5 last:border-b-0'>
            <div className='absolute top-2 right-2'>
                <RiDeleteBinLine onClick={() => onRemove(index)} className='cursor-pointer text-red-600' />
            </div>

            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Title</Label>
                    <Input type='text' placeholder='Title' {...register(`secondSection.items.${index}.title`, {
                        required: "Title is required"
                    })} />
                    {itemErrors?.title && <p className='text-red-500'>{itemErrors.title.message}</p>}
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Image</Label>
                    <Controller
                        name={`secondSection.items.${index}.image`}
                        control={control}
                        rules={{ required: "Image is required" }}
                        render={({ field }) => (
                            <ImageUploader
                                value={field.value}
                                onChange={field.onChange}
                                recommendedDimension="Recommended: 742 x 439 (px)"
                            />
                        )}
                    />
                    {itemErrors?.image && (
                        <p className="text-red-500">{itemErrors.image.message}</p>
                    )}
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Image Alt</Label>
                    <Input type='text' placeholder='Image Alt' {...register(`secondSection.items.${index}.imageAlt`)} />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Sub Title</Label>
                    <Input type='text' placeholder='Sub Title' {...register(`secondSection.items.${index}.subTitle`, {
                        required: "Sub Title is required"
                    })} />
                    {itemErrors?.subTitle && <p className='text-red-500'>{itemErrors.subTitle.message}</p>}
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Description</Label>
                    <Controller name={`secondSection.items.${index}.description`} control={control} render={({ field }) => {
                        return <Textarea value={field.value} onChange={field.onChange} placeholder='Description' />
                    }} />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Timing</Label>
                    <Input type='text' placeholder='e.g. 6:00 AM - 8:00 AM' {...register(`secondSection.items.${index}.timing`)} />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Days</Label>
                    <Input type='text' placeholder='e.g. Mon, Wed, Fri' {...register(`secondSection.items.${index}.days`)} />
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Venue</Label>
                    <Input type='text' placeholder='Venue' {...register(`secondSection.items.${index}.venue`)} />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Leader</Label>
                    <Input type='text' placeholder='Leader' {...register(`secondSection.items.${index}.leader`)} />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Contact</Label>
                    <Input type='text' placeholder='Contact' {...register(`secondSection.items.${index}.contact`)} />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Sub Items</Label>
                    <div className='border border-black/20 p-2 rounded-md flex flex-col gap-2'>
                        {subItemFields.map((subField, subIndex) => (
                            <div key={subField.id} className='flex items-center gap-2'>
                                <Input
                                    type='text'
                                    placeholder='Sub item'
                                    {...register(`secondSection.items.${index}.subItems.${subIndex}.value`)}
                                />
                                <RiDeleteBinLine onClick={() => subItemRemove(subIndex)} className='cursor-pointer text-red-600 shrink-0' />
                            </div>
                        ))}
                        <div className='flex justify-end'>
                            <Button type='button' addItem onClick={() => subItemAppend({ value: "" })}>Add Sub Item</Button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <Label className='font-bold'>Tags</Label>
                    <div className='border border-black/20 p-2 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-wrap gap-2'>
                            {tagFields.map((tagField, tagIndex) => (
                                <div key={tagField.id} className='flex items-center gap-1 border border-black/20 rounded-md px-2 py-1'>
                                    <Input
                                        type='text'
                                        placeholder='Tag'
                                        className='border-none h-6 w-24 p-0 focus-visible:ring-0'
                                        {...register(`secondSection.items.${index}.tags.${tagIndex}.value`)}
                                    />
                                    <RiDeleteBinLine onClick={() => tagRemove(tagIndex)} className='cursor-pointer text-red-600 shrink-0' />
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-end'>
                            <Button type='button' addItem onClick={() => tagAppend({ value: "" })}>Add Tag</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const ActivitiesPage = () => {

    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<ActivitiesFormProps>();

    const { fields: bannerSectionItems, append: bannerSectionAppend, remove: bannerSectionRemove } = useFieldArray({
        control,
        name: "bannerSection.items"
    });

    const { fields: secondSectionItems, append: secondSectionAppend, remove: secondSectionRemove } = useFieldArray({
        control,
        name: "secondSection.items"
    });

    const handleAddActivities = async (data: ActivitiesFormProps) => {
        try {
            const response = await fetch(`/api/admin/activities`, {
                method: "PATCH",
                body: JSON.stringify(data),
            });
            if (response.ok) {
                const data = await response.json();
                alert(data.message);
                // router.push("/admin/activities");
            }
        } catch (error) {
            console.log("Error in adding activities", error);
        }
    }

    const fetchActivitiesData = async () => {
        try {
            const response = await fetch(`/api/admin/activities`);
            if (response.ok) {
                const data = await response.json();
                setValue("bannerSection", data.data.bannerSection);
                setValue("bannerSection.items", data.data.bannerSection.items);
                setValue("secondSection", data.data.secondSection);
                setValue("secondSection.items", data.data.secondSection.items);
                setValue("ctaSection", data.data.ctaSection);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.log("Error in fetching activities data", error);
        }
    }

    useEffect(() => {
        fetchActivitiesData();
    }, []);

    return (
        <div className='flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit(handleAddActivities)}>

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
                                    return <Textarea value={field.value} onChange={field.onChange} placeholder='Description' />
                                }} />
                            </div>
                        </div>

                        <div>
                            <Label className='font-bold'>Items</Label>
                            <div className='border border-black/20 p-2 rounded-md flex flex-col gap-2'>
                                {bannerSectionItems.map((field, index) => (
                                    <div key={field.id} className='flex items-center gap-2 relative'>
                                        <div className='flex-1 flex flex-col gap-1'>
                                            <Input type='text' placeholder='Title' {...register(`bannerSection.items.${index}.title`, {
                                                required: "Title is required"
                                            })} />
                                            {errors.bannerSection?.items?.[index]?.title && (
                                                <p className='text-red-500'>{errors.bannerSection?.items?.[index]?.title?.message}</p>
                                            )}
                                        </div>
                                        <RiDeleteBinLine onClick={() => bannerSectionRemove(index)} className='cursor-pointer text-red-600 shrink-0' />
                                    </div>
                                ))}
                            </div>
                            <div className='flex justify-end mt-2'>
                                <Button type='button' addItem onClick={() => bannerSectionAppend({ title: "" })}>Add Item</Button>
                            </div>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>Second Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <Label className='font-bold'>Items</Label>
                        <div className='border border-black/20 p-2 rounded-md flex flex-col gap-5'>
                            {secondSectionItems.map((field, index) => (
                                <SecondSectionItem
                                    key={field.id}
                                    index={index}
                                    control={control}
                                    register={register}
                                    errors={errors}
                                    onRemove={secondSectionRemove}
                                />
                            ))}
                        </div>
                        <div className='flex justify-end mt-2'>
                            <Button type='button' addItem onClick={() => secondSectionAppend({
                                title: "",
                                subTitle: "",
                                description: "",
                                subItems: [],
                                timing: "",
                                days: "",
                                venue: "",
                                contact: "",
                                tags: [],
                                image:"",
                                imageAlt:"",
                                leader:""
                            })}>Add Item</Button>
                        </div>
                    </div>
                </AdminItemContainer>

                <AdminItemContainer>
                    <Label main>CTA Section</Label>
                    <div className='p-5 rounded-md flex flex-col gap-2'>
                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Title</Label>
                            <Input type='text' placeholder='Title' {...register("ctaSection.title", {
                                required: "Title is required"
                            })} />
                            {errors.ctaSection?.title && <p className='text-red-500'>{errors.ctaSection?.title.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Sub Title</Label>
                            <Input type='text' placeholder='Sub Title' {...register("ctaSection.subTitle", {
                                required: "Sub Title is required"
                            })} />
                            {errors.ctaSection?.subTitle && <p className='text-red-500'>{errors.ctaSection?.subTitle.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Description</Label>
                            <Controller name="ctaSection.description" control={control} render={({ field }) => {
                                return <Textarea value={field.value} onChange={field.onChange} placeholder='Description' />
                            }} />
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Button Text</Label>
                            <Input type='text' placeholder='Button Text' {...register("ctaSection.buttonText", {
                                required: "Button Text is required"
                            })} />
                            {errors.ctaSection?.buttonText && <p className='text-red-500'>{errors.ctaSection?.buttonText.message}</p>}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <Label className='font-bold'>Button Link</Label>
                            <Input type='text' placeholder='Button Link' {...register("ctaSection.buttonLink", {
                                required: "Button Link is required"
                            })} />
                            {errors.ctaSection?.buttonLink && <p className='text-red-500'>{errors.ctaSection?.buttonLink.message}</p>}
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

export default ActivitiesPage