'use client'
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Loading from "./loading";
import { useSession } from "next-auth/react";
import { UserWithId } from "@/components/user_type";

export default  function HistoryPage() {

  const [isLoading, setIsLoading] = useState(true)
  const [history, setHistory] = useState([])


  const {data:session, status} =  useSession();

  useEffect(() => {
    if(session){

      setIsLoading(true)
      const fetchData = async () =>{
      const response = await fetch(`/api/${(session. user as UserWithId) . id}/history`)
      const data = await response.json()
      setHistory(data)
      setIsLoading(false)
    }
    // console.log('fetching history',history)
    fetchData()
  }
    
  }, [session])
  
  return (
    <div>
      {
        !isLoading 
        ? <DataTable columns={columns} data={history} />
        : <Loading />
      }
    </div>
  );
}