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

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Loading from "./loading";
import { UserWithId } from "@/components/user_type";





export default function AccountPage() {
  

  const {data:session, status} =  useSession();

  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState({});

  
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      // Check if the session data is loaded and not null
      await session
      if ( session) {
        // Fetch the account data using the session id
        console.log('fetching user with id ', session.user)
        console.log('account id :', (session. user as UserWithId) . id)
        const response = await fetch(`/api/user?id=${(session. user as UserWithId) . id}`);
        const data = await response.json();
        setAccount(data);
        // form.(...account);
      }
      setIsLoading(false);
    };
    // console.log("fetching accounts", account);
    fetchData();
  }, [session]);
  
  const [formHeader, setFormHeader] = useState("Add New User")
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    // defaultValues: account,
  });

  const initializeForm = async (type:string) => {
    if(type === "add"){
      console.log('set form to add new user')
      form.reset()
      setFormHeader("Add New Usser")
    } else {
      console.log(account)
      console.log('set forrm to edit an existing user')
      form.reset({
        fullname: account.fullname,
        username: account.username,
        email: account.email,
        role: account.role,
        position: account.position
      })
      setFormHeader("Edit User")
    }
  }

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    console.log(values);
  };

  return (
    <>
    {
    session && account ?
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
                      <Button variant="link" className="mr-2" onMouseDown={()=>initializeForm('edit')}>
                        Edit User
                      </Button>
                      <Button variant="link" className="mr-2" onMouseDown={()=>initializeForm('add')}>
                        Add User
                      </Button>
                    </DialogTrigger>
                  </div>
                  <div className="flex justify-center">
                    <DialogContent className="w-1/2 ml-1/5 pt-6">
                      <DialogTitle>{formHeader}</DialogTitle>
                      <DialogDescription>
                        Fill the following form and submit it to add a new user.
                      </DialogDescription>
                      <Form {...form}>
                        <form className="mt-2">
                        <FormField
                            control={form.control}
                            name="fullname"
                            render={(field) => (
                              <FormItem>
                                <FormLabel>Full name:</FormLabel>
                                <FormControl>
                                  <Input {...field} type="text" />
                                </FormControl>
                                <FormDescription>
                                  Enter your fullname here
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
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
                            name="position"
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
                            {/* <FormField
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
                            /> */}
                          </div>
                          <FormField
                            control={form.control}
                            name="role"
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
                <h3>{account.fullname}</h3>
                <small className="">{account.position}</small>
                <Separator className="my-3"/>
                <h3 className="text-sm my-1 ">username: {account.username}</h3>
                <div className="text-sm my-1">Email: {account.email}</div>
                <small className="my-1">Role: {account.role}</small>
                <small>Total inventories you created: 1213</small>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    :
    <Loading />
  }
  </>
  );
}
