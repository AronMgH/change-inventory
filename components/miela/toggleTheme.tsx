'use client'

import  * as React  from 'react';
import { useTheme } from 'next-themes';

import { Button } from '../ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
export default function ToggleThemeButton({...props}) {


    const { setTheme } = useTheme();

    return (
        <>
        <DropdownMenu {...props}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <SunIcon className='w-[1rem] h-[1rem] scale-100 dark:scale-0  transition-all  rotate-0 dark:-rotate-90 text-white border-0 hover:text-black'></SunIcon>
                    <MoonIcon className='absolute w-[1rem] h-[1rem] scale-0 dark:scale-100  transition-all  -rotate-90 dark:rotate-0'></MoonIcon>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        </>
    )
}