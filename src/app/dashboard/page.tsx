import axios from 'axios'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default async function page() {
  const cookieStore = cookies()
  const tokenCookies = cookieStore.get('token')!.value
  const res = await axios.get('http://localhost:8080/me', {
    headers: {
      Authorization: `Bearer ${tokenCookies}`
    }
  })
 
  return (
    <div className='vh-100 d-flex align-items-center justify-content-center flex-column'>
      <h1>Hi {res.data.data[0].username}, Role {res.data.data[0].role} </h1>
      <h3>Select One</h3>
      <div className='d-flex gap-4'>
        <Link href={'/dashboard/employee'}>
          <div style={{ width: '150px' }} className="card cardHover">
            <div className="card-body d-flex gap-2 w align-items-center justify-content-center flex-column">
              <Image alt='employee' src={'/division.png'} width={100} height={100} />
              <h5 className="card-title">Employee Management</h5>
            </div>
          </div>
        </Link>
        <Link href={'/dashboard/user'}>
          <div style={{ width: '150px' }} className="card cardHover">
            <div className="card-body d-flex gap-2 w align-items-center justify-content-center flex-column">
              <Image alt='employee' src={'/profile.png'} width={100} height={100} />
              <h5 className="card-title">User Management</h5>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}