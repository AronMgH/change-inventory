'use client'
import { Suspense, useEffect, useState } from "react";
import { Item, columns } from "./columns";
import { DataTable } from "./data-table";
import Loading from "./loading";
import { useSession } from "next-auth/react";
import { UserWithId } from "@/components/user_type";

export default  function InventoryPage() {

  const [isLoading, setIsLoading] = useState(true)
  const [inventory, setInventory] = useState([])


  const {data:session, status} =  useSession();

  useEffect(() => {
    setIsLoading(true)
    if(session){

      const fetchData = async () =>{
        const response = await fetch(`/api/${(session. user as UserWithId) . id}/inventory`)
      const data = await response.json()
      setInventory(data)
      setIsLoading(false)
    }
    // console.log('fetching inventories',inventory)
    fetchData()
  }

  }, [session])
  
  return (
    <div>
      {
        !isLoading 
        ? <DataTable columns={columns} data={inventory} />
        : <Loading />
      }
    </div>
  );
}
