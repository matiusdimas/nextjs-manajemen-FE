"use client"
import Button from '@/app/components/Button'
import FormAddUser from '@/app/components/FormAddUser'
import Table from '@/app/components/Table'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function UserPage({ cookie }: { cookie: string }) {
    const arrayDesc = ['Password', 'Role', 'Created At', 'Updated At']
    const [add, setAdd] = useState(false)

    function handleAdd() {
        setAdd(!add)
    }

    const [checkUser, setCheckUser] = useState({ username: '', role: '' })

    useEffect(() => {
        async function handler() {
            const res = await axios.get('http://localhost:8080/me', { headers: { Authorization: `Bearer ${cookie}` } })
            console.log(res.data.data[0])
            setCheckUser({ ...res.data.data[0] })
            return res
        }
        handler()
    }, [cookie])
    
    async function Logout() {
        await axios.get('/api')
        window.location.href = '/';
    }
    return (
        <>
            <div className='container d-grid gap-4'>

                <div className='d-flex mt-5 container justify-content-between'>
                    <h1 className='fs-3'>{checkUser.username.length > 0 && (<>{checkUser.username}, {checkUser.role}</>)}</h1>
                    <div className='d-flex gap-2'>
                        <Link href={'/dashboard'}><Button title='Back To Dashoard' className='btn-primary' /></Link>
                        <Button title='Logout' className='btn-danger' onClick={() => Logout()} />
                    </div>
                </div>
                <div>
                    <Button title='Add New' className='btn-success' onClick={() => handleAdd()} />
                </div>
                <Table title='Username' arrayDesc={arrayDesc as []} cookie={cookie} />
            </div>
            {add && (
                <FormAddUser onClick={handleAdd} cookies={cookie} />
            )}
        </>
    )
}
