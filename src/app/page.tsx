"use client"
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react"

export default function Home () {
  
  const [input, setInput] = useState("");
  const router = useRouter();


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if(!input.trim()) return;
    router.push(`/user?search=${input}`)
    

  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-4xl font-bold mb-10 mt-10" >DevFinder: GitHub Profile Explorer</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-4xl">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 shadow-sm hover:shadow-md transition cursor-pointer ">
            <input 
             type="text" 
             value={input}
             onChange={(e) => setInput(e.target.value)}
             placeholder="Search Username or type a URL"
             
              className="flex-grow focus:outline-none px-2 py-2"
            />
          </div>
          <div className="flex item-center justify-center mt-8 gap-8">
            <button 
              type="submit"
              className="bg-gray-100 px-5 py-2 rounded-full text-md hover:ring-2 ring-gray-600 text-black cursor-pointer"
            >
              Search User
            </button>

          </div>
      </form>
    </div>
  )
}