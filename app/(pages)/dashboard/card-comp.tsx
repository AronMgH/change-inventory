import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function CardComp({
  title,
  content,
  children,
}: {
  title: string;
  content: string;
  children: React.ReactNode
}) {
  return (
    <Card className="m-2 w-1/4 p-0 rounded-sm">
      <CardHeader  className="m-0 py-4">
        <div className="flex justify-between">
            <div className="text-opacity-20">{title}</div>
            {children}
      </div>
      </CardHeader>
      {/* <Separator /> */}
      <CardContent className="">
      <div className="font-bolder">{content}</div>
      </CardContent>
    </Card>
  );
}
