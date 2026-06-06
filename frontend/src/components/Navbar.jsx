import React from 'react'
import { Link } from 'react-router'
import { LucideApple, Plus, User } from 'lucide-react'
import { SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/react"
import ThemeSelector from './ThemeSelector'

function Navbar() {

    const { isSignedIn } = useAuth()

    return (
        <div className='navbar bg-base-300'>
            <div className='max-w-6xl mx-auto w-full px-4 flex justify-between items-center'>
                {/* left */}
                <div className='flex-1'>
                    <Link to="/" className='btn btn-ghost gap-2 normal-case text-xl'>
                        <LucideApple className='w-8 h-8' />
                        <span className='text-lg font-bold font-mono uppercase tracking-wider'>APPLE STORE</span>
                    </Link>
                </div>

                <div className='flex gap-2 items-center'>
                    <ThemeSelector />
                </div>
                {isSignedIn ? (
                    <>
                        <Link to="/create" className='btn btn-primary btn-sm gap-1'>
                            <Plus className='size-4' />
                            <span className='hidden sm:inline'>New Product</span>
                        </Link>
                        <Link to="/create" className='btn btn-primary btn-sm gap-1'>
                            <User className='size-4' />
                            <span className='hidden sm:inline'>Profile</span>
                        </Link>
                        <UserButton />
                    </>
                ) : (
                    <>
                        <SignInButton mode="modal">
                            <button className='btn btn-ghost btn-sm'>Sign In</button>
                        </SignInButton>

                        <SignUpButton mode="modal">
                            <button className='btn btn-primary btn-sm'>Get Started</button>
                        </SignUpButton>
                    </>

                )}
            </div>

        </div>
    )
}

export default Navbar