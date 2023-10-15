import { Item, columns} from './columns'
import { DataTable } from './data-table'

async function getData(): Promise<Item[]> {
    const items: Item[] = [
        {
          id: "1",
          name: "Smartphone",
          quantity: 5,
          functionalNo: 3,
          disfunctionalNo: 2,
          picture: "smartphone.jpg",
          remark: "Good condition"
        },
        {
          id: "2",
          name: "Laptop",
          quantity: 10,
          functionalNo: 8,
          disfunctionalNo: 2,
          picture: "laptop.jpg",
          remark: "Minor scratches"
        },
        {
          id: "3",
          name: "Headphones",
          quantity: 2,
          functionalNo: 1,
          disfunctionalNo: 1,
          picture: "headphones.jpg",
          remark: "Needs repair"
        },
        {
          id: "4",
          name: "Smartwatch",
          quantity: 7,
          functionalNo: 7,
          disfunctionalNo: 0,
          picture: "smartwatch.jpg",
          remark: "Excellent condition"
        },
        {
          id: "5",
          name: "Tablet",
          quantity: 3,
          functionalNo: 2,
          disfunctionalNo: 1,
          picture: "tablet.jpg",
          remark: "Missing parts"
        },
        {
          id: "6",
          name: "Camera",
          quantity: 1,
          functionalNo: 0,
          disfunctionalNo: 1,
          picture: "camera.jpg",
          remark: "Major damage"
        },
        {
          id: "7",
          name: "Gaming Console",
          quantity: 4,
          functionalNo: 4,
          disfunctionalNo: 0,
          picture: "console.jpg",
          remark: ""
        },
        {
          id: "8",
          name: "Bluetooth Speaker",
          quantity: 6,
          functionalNo: 6,
          disfunctionalNo: 0,
          picture: "speaker.jpg",
          remark: "Like new"
        },
        {
          id: "9",
          name: "Monitor",
          quantity: 10,
          functionalNo: 9,
          disfunctionalNo: 1,
          picture: "monitor.jpg",
          remark: "Small crack"
        },
        {
          id: "10",
          name: "Wireless Earbuds",
          quantity: 0,
          functionalNo: 0,
          disfunctionalNo: 0,
          picture: "earbuds.jpg",
          remark: "Out of stock"
        },
        {
        id: "11",
        name: "Tablet",
        quantity: 3,
        functionalNo: 2,
        disfunctionalNo: 1,
        picture: "tablet.jpg",
        remark: "Missing parts"
      },
      {
        id: "12",
        name: "Camera",
        quantity: 1,
        functionalNo: 0,
        disfunctionalNo: 1,
        picture: "camera.jpg",
        remark: "Major damage"
      },
      {
        id: "13",
        name: "Gaming Console",
        quantity: 4,
        functionalNo: 4,
        disfunctionalNo: 0,
        picture: "console.jpg",
        remark: ""
      },
      {
        id: "14",
        name: "Bluetooth Speaker",
        quantity: 6,
        functionalNo: 6,
        disfunctionalNo: 0,
        picture: "speaker.jpg",
        remark: "Like new"
      },
      {
        id: "15",
        name: "Monitor",
        quantity: 10,
        functionalNo: 9,
        disfunctionalNo: 1,
        picture: "monitor.jpg",
        remark: "Small crack"
      },
      {
        id: "16",
        name: "Wireless Earbuds",
        quantity: 0,
        functionalNo: 0,
        disfunctionalNo: 0,
        picture: "earbuds.jpg",
        remark: "Out of stock"
      }
      ];

      return new Promise((resolve, reject) => {
        resolve(items)
      })
}

export default async function InventoryPage() {
    const data = await getData()
    return (
       <div>
        <DataTable columns={columns} data={data} />            
       </div>
    )
}