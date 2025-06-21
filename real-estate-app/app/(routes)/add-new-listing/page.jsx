'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Button } from '../../../components/ui/button';
import { supabase } from '../../../utils/supabase/client';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import {useRouter} from 'next/navigation'
import { Loader } from 'lucide-react';

const GoogleAddressSearch = dynamic(() => import('../../../app/_components/GoogleAddressSearch'), {
    ssr: false,
});

function AddNewListing() {
    const [selectedAddress, setSelectedAddress] = useState();
    const [coordinates, setCoordinates] = useState()
    const [loader, setLoader] = useState()
const router =useRouter()
    const {user}= useUser();
    const nextHandler = async () => {
        console.log(selectedAddress, coordinates)
        setLoader(true)
        const { data, error } = await supabase
            .from('listing')
            .insert([
                { address: selectedAddress, coordinates: coordinates, created_by:user?.primaryEmailAddress.emailAddress },
            ])
            .select()

            if(data) {
                setLoader(false)
                console.log('new data added:', data)
                toast("new address added for listing ")
                router.replace('/edit-listing/'+data[0].id)
            } if (error){
                setLoader(false)
                console.log('Error', error)
                toast("Server Side Error ")
            }

    }

    return (
        <div className='mt-10 md:mx-56 lg:mx-80'>
            <div className="p-10 flex flex-col gap-5 items-center justify-center">
                <h2 className="font-bold text-2xl">Add New Listing</h2>
                <div className='w-full p-5 rounded-lg border shadow-md flex flex-col gap-5'>
                    <h2 className="text-gray-500">Enter Address which you want to list</h2>
                    <GoogleAddressSearch
                        selectedAddress={(value) => { setSelectedAddress(value) }}
                        setCoordinates={(value) => { setCoordinates(value) }}
                    />
                    <Button
                        //  disable={!selectedAddress || !coordinates || loader}
                        onClick={nextHandler}
                    >{loader? <Loader className='animate-spin'/>:"Next"}</Button>
                </div>
            </div>
        </div>

    );
}

export default AddNewListing;
