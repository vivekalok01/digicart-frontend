import React, { useEffect } from 'react'
import { assets } from '../src/assets/assets'
import { userAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'

const InputField = ({type, placeholder, name, handleChange, address}) => (

  <input className='w-full px-2 py-2.5 border border-gray-500/50 rounded outline-none text-gray-500 focus:border-primary transition' type={type} required placeholder={placeholder} onChange={handleChange} name={name} value={address[name]} ></input>
 
)


const AddAddress = () => {
  const {axios, navigate, user} = userAppContext()
  const [ address, setAddress ] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  
  })

  const onSubmitHandler = async(e) => {
    e.preventDefault()
      try {
        const { data } = await axios.post("/api/address/add", { address })
        if (data.success) {
          toast.success(data.message)
          navigate('/cart')
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
  }
  useEffect(() => {
    if (!user) {
      navigate('/cart')
    }
  }, [])
  const handleChange = (e) => { 
    const { name, value } = e.target
    
    setAddress((prev)=> ({...prev, [name]: value}))
  }
  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>Add Shipping <span className='font-semibold text-primary'>Address</span> </p>
      <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form className='space-y-3 mt-6 text-sm'  onSubmit={onSubmitHandler}>
            <div className='grid grid-cols-2 gap-4' >
              <InputField handleChange={handleChange} address={address} type="text" placeholder="First Name" name="firstName"></InputField>
              <InputField handleChange={handleChange} address={address} type="text" placeholder="Last Name" name="lastName"></InputField>
            </div>
           
            <InputField handleChange={handleChange} address={address} type="email" placeholder="Email" name="email"></InputField>
            
            <InputField handleChange={handleChange} address={address} type="text" placeholder="Street" name="street"></InputField>

            <div className='grid grid-cols-2 gap-4' >
              <InputField handleChange={handleChange} address={address} type="text" placeholder="City" name="city"></InputField>
              <InputField handleChange={handleChange} address={address} type="text" placeholder="State" name="state"></InputField>
            </div>

            <div className='grid grid-cols-2 gap-4' >
              <InputField handleChange={handleChange} address={address} type="text" placeholder="Zipcode" name="zipcode"></InputField>
              <InputField handleChange={handleChange} address={address} type="text" placeholder="Country" name="country"></InputField>
            </div>
            
            <InputField handleChange={handleChange} address={address} type="text" placeholder="Phone" name="phone"></InputField>
           <button type='submit' className='w-full mt-6 bg-primary text-white py-3 hover:bg-primary-dull transition cursor-pointer uppercase'>Save Address</button>
          </form>
        </div>
        <img className='md:mr-16 mb-16 md:mt-0' src={assets.add_address_iamge} alt="address" />
      </div>
    </div>
  )
}

export default AddAddress
