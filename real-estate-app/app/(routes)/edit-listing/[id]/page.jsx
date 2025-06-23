'use client';

import React, { useEffect, use } from 'react';
import { Label } from "../../../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { Input } from "../../../../components/ui/input";
import { Button } from '../../../../components/ui/button';
import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../../utils/supabase/client';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';

function EditListing({ params }) {
    const unwrappedParams = use(params); 
    const { user } = useUser();
    const router = useRouter();
    const [listing, setListing] =useState([]);

    const verifyUserRecord = async () => {
        const { data, error } = await supabase
            .from('listing')
            .select('*')
            .eq('created_by', user?.primaryEmailAddress.emailAddress)
            .eq('id', unwrappedParams.id);

        if(data){
            setListing(data[0])
        }    
        if (data?.length <= 0) {
            router.replace('/');
        }
    };

    useEffect(() => {
        if (user) {
            verifyUserRecord();
        }
    }, [user]);

    const onSubmitHandler = async (formValue) => {
        const { data, error } = await supabase
            .from('listing')
            .update(formValue)
            .eq('id', unwrappedParams.id)
            .select();

        if (data) {
            console.log(data);
            toast('Listing updated and Published');
        }
    };

    return (
        <div className='px-10 md:px-20'>
            <h2 className='font-bold text-2xl'> Enter some more details about your listing</h2>
            <Formik
                initialValues={{
                    type: '',
                    propertyType: ''
                }}
                onSubmit={(values) => {
                    console.log(values);
                    onSubmitHandler(values);
                }}
            >
                {({
                    values,
                    handleChange,
                    handleSubmit
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className='p-8 rounded-lg shadow-md'>
                            <div className='grid grid-cols-2 md:grid-cols-3'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='tex-lg text-slate-500'>Rent or Sell?</h2>
                                    <RadioGroup defaultValue="Sell" onValueChange={(e) => values.type = e}>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Rent" id="Rent" />
                                            <Label htmlFor="Rent">Rent</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Sell" id="Sell" />
                                            <Label htmlFor="Sell">Sell</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className='tex-lg text-slate-500'>Property Type</h2>
                                    <Select name='propertyType' onValueChange={(e) => values.propertyType = e}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select Property Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Single Family House">Single Family House</SelectItem>
                                            <SelectItem value="Town House">Town House</SelectItem>
                                            <SelectItem value="Condo">Condo</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 mt-5'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Bedroom</h2>
                                    <Input type='number' placeholder='Ex.2' name='bedroom' onChange={handleChange} defaultValue={listing?.bedroom}/>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Bathroom</h2>
                                    <Input type='number' placeholder='Ex.2' name='bathroom' onChange={handleChange} defaultValue={listing?.bathroom} />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Built In</h2>
                                    <Input type='number' placeholder='Ex.2' name='buildIn' onChange={handleChange} defaultValue={listing?.buildIn}/>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Parking</h2>
                                    <Input placeholder='Ex.2' name='parking' onChange={handleChange} defaultValue={listing?.parking} />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Lot Size </h2>
                                    <Input placeholder='Ex.2' name="lotSize" onChange={handleChange} defaultValue={listing?.lotSize}/>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Area</h2>
                                    <Input placeholder='Ex.2' name='area' onChange={handleChange} defaultValue={listing?.area}/>
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Selling Price</h2>
                                    <Input placeholder='Ex.2' name='price' onChange={handleChange} defaultValue={listing?.price} />
                                </div>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>HOA</h2>
                                    <Input placeholder='Ex.2' name='hoa' onChange={handleChange} defaultValue={listing?.hoa} />
                                </div>
                            </div>
                            <div className='grid grid-cols-1 gap-10 mt-5'>
                                <div className='flex gap-2 flex-col'>
                                    <h2 className='text-gray-500'>Descriptions</h2>
                                    <Input placeholder='' name='description' onChange={handleChange} defaultValue={listing?.description} />
                                </div>
                            </div>
                            <div className='flex justify-end mt-3 gap-3'>
                                <Button variant='outline' className="border-purple-500 text-purple-500">Save</Button>
                                <Button type="submit">Save & Publish</Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
}

export default EditListing;
