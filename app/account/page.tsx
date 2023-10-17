"use client";

import Image from "next/image";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui//form";
import { userSchema } from "@/prisma/zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Select } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export default function AccountPage() {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
  });
  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    console.log(values);
  };

  return (
    <div className="p-16">
      <div className="flex justify-center gap-12">
        <div className="w-2/3">
          <Card>
            <CardHeader>
              <div className="flex justify-between">
                <h4> Account Info</h4>
                <Dialog>
                  <div className="ml-auto">
                    <DialogTrigger>
                      <Button variant="link" className="mr-2">
                        Edit User
                      </Button>
                      <Button variant="link" className="mr-2">
                        Add User
                      </Button>
                    </DialogTrigger>
                  </div>
                  <div className="flex justify-center">
                    <DialogContent className="w-1/2 ml-1/5 pt-6">
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Fill the following form and submit it to add a new user.
                      </DialogDescription>
                      <Form {...form}>
                        <form className="mt-2">
                          <FormField
                            control={form.control}
                            name="username"
                            render={(field) => (
                              <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                  <Input {...field} type="text" />
                                </FormControl>
                                <FormDescription>
                                  Enter your username here
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={(field) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input {...field} type="email" />
                                </FormControl>
                                <FormDescription>
                                  Enter your email here
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="Position"
                            render={(field) => (
                              <FormItem>
                                <FormLabel>Position</FormLabel>
                                <FormControl>
                                  <Input {...field} type="text" />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                  Enter your postion in the company here
                                </FormDescription>
                              </FormItem>
                            )}
                          />
                          <div className="flex gap-5 ">
                            <FormField
                              control={form.control}
                              name="password"
                              render={(field) => (
                                <FormItem>
                                  <FormLabel>Password</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="password" />
                                  </FormControl>
                                  <FormDescription>
                                    Enter your password here
                                  </FormDescription>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name="password"
                              render={(field) => (
                                <FormItem>
                                  <FormLabel>Confirm Password</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="password" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue="STAFF"
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                    <SelectItem value="STAFF">Staff</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <div className="my-4 flex justify-end">
                            <Button type="submit">Submit</Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </div>
                </Dialog>
              </div>
              <CardDescription>Update your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-8">
                <div>
                <Image
                  src="/event.jpeg"
                  height={64}
                  width={64}
                  className="rounded-full"
                  alt="profile picture"
                />
                </div>

                <div className="flex flex-col justify-center">
                <h3>Bryan Adams</h3>
                <small className="">Secretary</small>
                <Separator className="my-3"/>
                <h3 className="text-sm my-1 ">username: @bryan</h3>
                <div className="text-sm my-1">Email: bryan.adma@gmail.com</div>
                <small className="my-1">Role: STAFF</small>
                <small>Total inventories you created: 1213</small>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
