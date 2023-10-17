"use client";

import { Button } from "@/components/ui/button";
import CardComp from "./card-comp";
import { Box, Boxes, PackageOpen, Workflow } from "lucide-react";

import DashChart from "./charts";
import { Card, CardContent } from "@/components/ui/card";
import { DatePickerWithRange } from "./date-filter";

export default function Dashboard() {
  // const [fres, setFres] = useState("")

  // async function makePostRequest(){
  //     const res = await fetch('/api/dashboard', {
  //         method: 'POST',
  //         body: JSON.stringify({text: 'hello world, this is next.js.'})
  //     }).then( async val => {
  //         let v = await val.json()
  //         setFres(JSON.stringify(v))
  //     } )

  // }
  function exportToPdf() {
    window.print();
  }

  return (
    <>
      <Card className="my-0 mx-2 rounded-sm">
        <CardContent className="flex gap-6 items-center justify-end py-2">
            <h3 className="mr-auto font-semibold">Dashboard</h3>
            <DatePickerWithRange></DatePickerWithRange>
          <Button>Export</Button>
        </CardContent>
      </Card>
      <div className="my-2 flex justify-around">
        <CardComp title="Total Items" content="256940">
          <Boxes size={20} strokeWidth={1} />
        </CardComp>
        <CardComp title="Functional Items" content="256940">
          <PackageOpen size={20} strokeWidth={1} />
        </CardComp>
        <CardComp title="Disfunctional Items" content="256940">
          <Box size={20} strokeWidth={1} />
        </CardComp>
        <CardComp title="Latest Activities" content="256940">
          <Workflow size={20} strokeWidth={1} />
        </CardComp>
      </div>

      <div className="w-full h-[400px]">
        <h4 className="font-bold text-center py-2 my-2">
          Bar Chart view of Inventory
        </h4>
        <DashChart />
      </div>
    </>
  );
}
